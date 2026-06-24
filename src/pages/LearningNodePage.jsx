import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { createLearningNodeRegistry, mergeLearningNodeSources } from '../learning/registry/index.ts';
import { createGrade1EnglishActivitiesRegistrySource } from '../learning/academies/cbc/grade1/englishActivities.registry.ts';
import { createCbcGradesRegistrySource } from '../learning/academies/cbc/cbcGrades.registry.ts';
import { createQubitelAcademyPlatformRegistry, getAcademyRootNodes } from '../learning/academies/index.ts';
import { detectAcademyIdFromLocation } from '../config/detectAcademy.ts';
import { createNodeRoutePath } from '../learning/routing';
import LearningNodePageShell from '../components/LearningNodePageShell.jsx';

function normalize(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function getAttribute(node, key) {
  return node?.attributes?.find((attribute) => attribute.key === key)?.value;
}

function isGradeCodeMatch(node, gradeParam) {
  const gradeCode = getAttribute(node, 'gradeCode');
  const routeSegment = getAttribute(node, 'routeSegment');

  return (
    normalize(gradeCode) === normalize(gradeParam) ||
    normalize(routeSegment?.replace?.('grade-', 'gd')) === normalize(gradeParam)
  );
}

function createRequestedSemanticPath({ grade, learningArea, theme, contentType }) {
  return `/${[grade, learningArea, theme, contentType]
    .filter(Boolean)
    .map(normalize)
    .join('/')}`;
}

function resolveSemanticNodeIdByGeneratedPath(registry, params) {
  const requestedPath = createRequestedSemanticPath(params);

  const matchingNode = [...registry.nodesById.values()].find((node) => {
    return createNodeRoutePath(registry, node, { includeRoot: false }) === requestedPath;
  });

  return matchingNode?.id;
}

function resolveSemanticNodeIdByHierarchy(registry, params) {
  const { grade, learningArea, theme, contentType } = params;
  const nodes = Array.from(registry.nodesById.values());

  const gradeNode = nodes.find((node) => {
    return node.kind === 'grade' && isGradeCodeMatch(node, grade);
  });

  if (!gradeNode || !learningArea) {
    return gradeNode?.id;
  }

  const learningAreaNode = nodes.find((node) => {
    return (
      node.parentId === gradeNode.id &&
      node.kind === 'learningArea' &&
      (
        normalize(getAttribute(node, 'learningAreaCode')) === normalize(learningArea) ||
        normalize(getAttribute(node, 'routeSegment')) === normalize(learningArea)
      )
    );
  });

  if (!learningAreaNode || !theme) {
    return learningAreaNode?.id;
  }

  const themeNode = nodes.find((node) => {
    return (
      node.parentId === learningAreaNode.id &&
      node.kind === 'theme' &&
      normalize(getAttribute(node, 'routeSegment')) === normalize(theme)
    );
  });

  if (!themeNode || !contentType) {
    return themeNode?.id;
  }

  const contentNode = nodes.find((node) => {
    return (
      node.parentId === themeNode.id &&
      normalize(getAttribute(node, 'routeSegment')) === normalize(contentType)
    );
  });

  return contentNode?.id;
}

function resolveSemanticNodeId(registry, params) {
  return (
    resolveSemanticNodeIdByGeneratedPath(registry, params) ||
    resolveSemanticNodeIdByHierarchy(registry, params)
  );
}

export default function LearningNodePage({ nodeIdOverride, semanticRoute = false }) {
  const {
    nodeId: routeNodeId,
    grade,
    learningArea,
    theme,
    contentType
  } = useParams();
  const activeAcademyId = detectAcademyIdFromLocation();

  const registry = useMemo(() => {
    const grade1Source = createGrade1EnglishActivitiesRegistrySource();
    const cbcGradesSource = createCbcGradesRegistrySource();
    const platformRegistry = createQubitelAcademyPlatformRegistry();

    const platformNodes = Array.from(platformRegistry.nodesById.values());
    const grade1Nodes = grade1Source.nodes;
    const cbcGradesNodes = cbcGradesSource.nodes;

    // If a specific academy is active (e.g., CBC), filter to show only that academy's content
    if (activeAcademyId && activeAcademyId !== 'tech') {
      const academyRootNodes = getAcademyRootNodes();
      const activeAcademyNode = academyRootNodes.find(node => node.id === `${activeAcademyId}-academy`);
      
      if (activeAcademyNode) {
        // Include the active academy node and all its descendants, plus grade content
        const activeAcademyIdStr = activeAcademyNode.id;
        const filteredPlatformNodes = platformNodes.filter(node => {
          // Keep root platform node and the active academy
          if (node.id === 'qubitel-academy' || node.id === activeAcademyIdStr) return true;
          return false;
        });
        
        return createLearningNodeRegistry({
          nodes: [...filteredPlatformNodes, ...cbcGradesNodes]
        });
      }
    }

    return createLearningNodeRegistry({
      nodes: [...platformNodes, ...grade1Nodes]
    });
  }, [activeAcademyId]);

  const semanticNodeId = useMemo(() => {
    if (!semanticRoute) return undefined;

    const resolvedNodeId = resolveSemanticNodeId(registry, {
      grade,
      learningArea,
      theme,
      contentType
    });

    if (!resolvedNodeId && import.meta.env.DEV) {
      console.warn('Unable to resolve semantic learning route.', {
        grade,
        learningArea,
        theme,
        contentType
      });
    }

    return resolvedNodeId;
  }, [registry, semanticRoute, grade, learningArea, theme, contentType]);

  const nodeId = nodeIdOverride || (semanticRoute ? semanticNodeId || '__semantic-route-not-found__' : routeNodeId);

  if (!nodeId) {
    return (
      <section className="learning-node-page">
        <h1>No content selected</h1>
        <p>Please select a learning node to view.</p>
      </section>
    );
  }

  return (
    <LearningNodePageShell
      registry={registry}
      nodeId={nodeId}
      showSiblingNav={true}
    />
  );
}

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { createLearningNodeRegistry, mergeLearningNodeSources } from '../learning/registry/index.ts';
import { createGrade1EnglishActivitiesRegistrySource } from '../learning/academies/cbc/grade1/englishActivities.registry.ts';
import { createCbcGradesRegistrySource } from '../learning/academies/cbc/cbcGrades.registry.ts';
import { createQubitelAcademyPlatformRegistry, getAcademyRootNodes } from '../learning/academies/index.ts';
import { detectAcademyIdFromLocation } from '../config/detectAcademy.ts';
import LearningNodePageShell from '../components/LearningNodePageShell.jsx';

export default function LearningNodePage() {
  const { nodeId } = useParams();
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
      showJumpMenu={true}
      showSiblingNav={true}
    />
  );
}
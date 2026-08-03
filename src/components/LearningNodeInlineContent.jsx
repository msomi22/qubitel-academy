import { useMemo } from 'react';
import { getChildren } from '../learning/registry/index.ts';
import LearningNodeContentRenderer from './LearningNodeContentRenderer.jsx';

/**
 * Recursively renders all descendant content nodes inline
 * Used for themes that should display all their nested content directly
 */
export default function LearningNodeInlineContent({ registry, nodeId }) {
  const allContentNodes = useMemo(() => {
    const collectContentNodes = (currentNodeId, depth = 0) => {
      const children = getChildren(registry, currentNodeId);
      const contentNodes = [];

      for (const child of children) {
        // Add this node if it's a content type (notes, practice, revision, assessment)
        const isContentNode = ['notes', 'practice', 'revision', 'assessment', 'exam'].includes(child.kind);
        
        if (isContentNode) {
          contentNodes.push({ node: child, depth });
        }

        // Recursively collect from children
        const childContent = collectContentNodes(child.id, depth + 1);
        contentNodes.push(...childContent);
      }

      return contentNodes;
    };

    return collectContentNodes(nodeId);
  }, [registry, nodeId]);

  if (allContentNodes.length === 0) {
    return (
      <div className="inline-content-empty">
        <p>No content available yet. Content is being prepared.</p>
      </div>
    );
  }

  return (
    <div className="learning-node-inline-content">
      {allContentNodes.map(({ node, depth }) => (
        <div 
          key={node.id} 
          className={`inline-content-item inline-content-depth-${depth}`}
          style={{ marginBottom: '2rem' }}
        >
          <LearningNodeContentRenderer 
            registry={registry} 
            node={node} 
          />
        </div>
      ))}
    </div>
  );
}

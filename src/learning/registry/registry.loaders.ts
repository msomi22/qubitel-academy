import type { LearningNodeRegistry } from './registry.types.ts';
import type { LearningNodeRegistrySource, LearningNodeSourceLoader } from './registry.types.ts';
import { createLearningNodeRegistry, mergeLearningNodeSources } from './registry.utils.ts';

export async function loadLearningNodeSources(loader: LearningNodeSourceLoader): Promise<LearningNodeRegistrySource[]> {
  return loader();
}

export function createRegistryFromSources(sources: LearningNodeRegistrySource[]): LearningNodeRegistry {
  return createLearningNodeRegistry({
    nodes: mergeLearningNodeSources(sources)
  });
}

export async function loadLearningNodeRegistry(loader: LearningNodeSourceLoader): Promise<LearningNodeRegistry> {
  const sources = await loadLearningNodeSources(loader);
  return createRegistryFromSources(sources);
}

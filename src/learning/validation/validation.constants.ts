export const LEARNING_NODE_VALIDATION_SEVERITIES = {
  error: 'error',
  warning: 'warning'
} as const;

export const LEARNING_NODE_VALIDATION_CODES = {
  duplicateNodeId: 'DUPLICATE_NODE_ID',
  missingParent: 'MISSING_PARENT',
  missingChild: 'MISSING_CHILD',
  parentChildMismatch: 'PARENT_CHILD_MISMATCH',
  selfParent: 'SELF_PARENT',
  selfChild: 'SELF_CHILD',
  cycleDetected: 'CYCLE_DETECTED',
  invalidNode: 'INVALID_NODE',
  multipleRoots: 'MULTIPLE_ROOTS',
  orphanNode: 'ORPHAN_NODE'
} as const;

#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="${EKS_CLUSTER_NAME:-${CLUSTER_NAME:-kubetasker-ckad}}"
REGION="${AWS_REGION:-us-west-2}"
NODE_TYPE="${EKS_NODE_TYPE:-t3.small}"
NODES="${EKS_NODES:-1}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./eks-create-kubetasker-lab.sh [options]

Options:
  --cluster-name NAME     EKS cluster name. Default: EKS_CLUSTER_NAME, CLUSTER_NAME, or kubetasker-ckad
  --region REGION         AWS region. Default: AWS_REGION or us-west-2
  --node-type TYPE        EKS node type. Default: EKS_NODE_TYPE or t3.small
  --nodes COUNT           Number of worker nodes. Default: EKS_NODES or 1
  --dry-run               Print commands without creating resources.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cluster-name) CLUSTER_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --node-type) NODE_TYPE="$2"; shift 2 ;;
    --nodes) NODES="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

CREATE_CMD=(eksctl create cluster --name "$CLUSTER_NAME" --region "$REGION" --nodes "$NODES" --node-type "$NODE_TYPE" --managed)
VERIFY_CMD=(kubectl get nodes -o wide)

echo "EKS is optional and can cost more than the simple lab paths."
echo "Creating EKS cluster: $CLUSTER_NAME in $REGION"
echo "Node type: $NODE_TYPE"
echo "Nodes: $NODES"

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN create command:\n  %q' "${CREATE_CMD[@]}"
  printf '\n\nDRY RUN verify command:\n  %q' "${VERIFY_CMD[@]}"
  printf '\n'
  exit 0
fi

"${CREATE_CMD[@]}"

echo "Cluster created. Verify with:"
echo "  k get nodes -o wide"
echo "  k cluster-info"

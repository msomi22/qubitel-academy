#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="${CIVO_CLUSTER_NAME:-${CLUSTER_NAME:-kubetasker-ckad}}"
NODE_SIZE="${CIVO_NODE_SIZE:-g4s.kube.medium}"
NODE_COUNT="${CIVO_NODE_COUNT:-1}"
REGION="${CIVO_REGION:-}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./civo-create-kubetasker-lab.sh [options]

Options:
  --cluster-name NAME     Civo Kubernetes cluster name. Default: CIVO_CLUSTER_NAME, CLUSTER_NAME, or kubetasker-ckad
  --region REGION         Civo region. Default: CIVO_REGION or current civo CLI region
  --size SIZE             Node size. Default: CIVO_NODE_SIZE or g4s.kube.medium
  --node-count COUNT      Number of nodes. Default: CIVO_NODE_COUNT or 1
  --dry-run               Print commands without creating resources.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cluster-name) CLUSTER_NAME="$2"; shift 2 ;;
    --size) NODE_SIZE="$2"; shift 2 ;;
    --node-count) NODE_COUNT="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

REGION_ARG=()
if [[ -n "$REGION" ]]; then
  REGION_ARG=(--region "$REGION")
fi

CREATE_CMD=(civo kubernetes create "$CLUSTER_NAME" --nodes "$NODE_COUNT" --size "$NODE_SIZE" --wait "${REGION_ARG[@]}")
CONFIG_CMD=(civo kubernetes config "$CLUSTER_NAME" --save "${REGION_ARG[@]}")
VERIFY_CMD=(kubectl get nodes -o wide)

echo "Creating Civo Kubernetes cluster: $CLUSTER_NAME"
echo "Node size: $NODE_SIZE"
echo "Node count: $NODE_COUNT"
if [[ -n "$REGION" ]]; then echo "Region: $REGION"; fi

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN create command:\n  %q' "${CREATE_CMD[@]}"
  printf '\n\nDRY RUN kubeconfig command:\n  %q' "${CONFIG_CMD[@]}"
  printf '\n\nDRY RUN verify command:\n  %q' "${VERIFY_CMD[@]}"
  printf '\n'
  exit 0
fi

"${CREATE_CMD[@]}"

echo "Saving kubeconfig."
"${CONFIG_CMD[@]}"

echo "Cluster created. Verify with:"
echo "  k get nodes -o wide"
echo "  k cluster-info"

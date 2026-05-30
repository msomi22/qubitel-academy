#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="${DO_CLUSTER_NAME:-${CLUSTER_NAME:-kubetasker-ckad}}"
REGION="${DO_REGION:-nyc1}"
SIZE="${DO_NODE_SIZE:-${DO_SIZE:-s-2vcpu-4gb}}"
NODE_COUNT="${DO_NODE_COUNT:-1}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./do-create-kubetasker-lab.sh [options]

Options:
  --cluster-name NAME     DigitalOcean Kubernetes cluster name. Default: DO_CLUSTER_NAME, CLUSTER_NAME, or kubetasker-ckad
  --region REGION         DigitalOcean region. Default: DO_REGION or nyc1
  --size SIZE             Node size. Default: DO_NODE_SIZE, DO_SIZE, or s-2vcpu-4gb
  --node-count COUNT      Number of nodes. Default: DO_NODE_COUNT or 1
  --dry-run               Print commands without creating resources.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cluster-name) CLUSTER_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --size) SIZE="$2"; shift 2 ;;
    --node-count) NODE_COUNT="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

CREATE_CMD=(doctl kubernetes cluster create "$CLUSTER_NAME" --region "$REGION" --size "$SIZE" --count "$NODE_COUNT" --wait)
VERIFY_CMD=(kubectl get nodes -o wide)

echo "Creating DigitalOcean Kubernetes cluster: $CLUSTER_NAME"
echo "Region: $REGION"
echo "Size: $SIZE"
echo "Node count: $NODE_COUNT"

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

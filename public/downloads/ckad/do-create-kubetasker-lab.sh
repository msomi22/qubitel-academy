#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="${CLUSTER_NAME:-kubetasker-ckad}"
REGION="${DO_REGION:-nyc1}"
SIZE="${DO_SIZE:-s-1vcpu-2gb}"
NODE_COUNT="${DO_NODE_COUNT:-1}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cluster-name) CLUSTER_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --size) SIZE="$2"; shift 2 ;;
    --node-count) NODE_COUNT="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

echo "Creating DigitalOcean Kubernetes cluster: $CLUSTER_NAME"
echo "Region: $REGION"
echo "Size: $SIZE"
echo "Node count: $NODE_COUNT"

doctl kubernetes cluster create "$CLUSTER_NAME" \
  --region "$REGION" \
  --size "$SIZE" \
  --count "$NODE_COUNT" \
  --wait

echo "Cluster created. Verify with:"
echo "  k get nodes"
echo "  k cluster-info"
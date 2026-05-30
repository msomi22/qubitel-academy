#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="${EKS_CLUSTER_NAME:-${CLUSTER_NAME:-kubetasker-ckad}}"
REGION="${AWS_REGION:-us-west-2}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./eks-delete-kubetasker-lab.sh [options]

Options:
  --cluster-name NAME     EKS cluster name. Default: EKS_CLUSTER_NAME, CLUSTER_NAME, or kubetasker-ckad
  --region REGION         AWS region. Default: AWS_REGION or us-west-2
  --dry-run               Print the cleanup command without changing resources.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cluster-name) CLUSTER_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

CLEANUP_CMD=(eksctl delete cluster --name "$CLUSTER_NAME" --region "$REGION")

echo "WARNING: this removes the EKS cluster named $CLUSTER_NAME in $REGION."

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN cleanup command:\n  %q' "${CLEANUP_CMD[@]}"
  printf '\n'
  exit 0
fi

read -r -p "Type the cluster name to continue: " CONFIRM
if [[ "$CONFIRM" != "$CLUSTER_NAME" ]]; then
  echo "Confirmation did not match. Nothing changed."
  exit 1
fi

"${CLEANUP_CMD[@]}"

echo "Cluster cleanup requested. Confirm cleanup in AWS."

#!/usr/bin/env bash
set -euo pipefail

REGION="${AWS_REGION:-us-west-2}"
LAB_TAG="${LAB_TAG:-kubetasker-ckad}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./aws-stop-kubetasker-lab.sh [options]

Options:
  --region REGION         AWS region. Default: AWS_REGION or us-west-2
  --lab-tag TAG           EC2 Lab tag value. Default: LAB_TAG or kubetasker-ckad
  --dry-run               Print discovered instances and stop command without stopping them.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --region) REGION="$2"; shift 2 ;;
    --lab-tag) LAB_TAG="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

echo "Finding running EC2 instances tagged Lab=$LAB_TAG in $REGION"
INSTANCE_IDS=$(aws ec2 describe-instances \
  --filters "Name=tag:Lab,Values=$LAB_TAG" "Name=instance-state-name,Values=running" \
  --query "Reservations[].Instances[].InstanceId" \
  --output text \
  --region "$REGION")

if [[ -z "$INSTANCE_IDS" || "$INSTANCE_IDS" == "None" ]]; then
  echo "No running lab instances found."
  exit 0
fi

STOP_CMD=(aws ec2 stop-instances --instance-ids $INSTANCE_IDS --region "$REGION")

echo "Running lab instances: $INSTANCE_IDS"

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN stop command:\n  %q' "${STOP_CMD[@]}"
  printf '\n'
  exit 0
fi

"${STOP_CMD[@]}"
echo "Stop request submitted. Use aws-status-kubetasker-lab.sh to verify."

#!/usr/bin/env bash
set -euo pipefail

REGION="${AWS_REGION:-us-west-2}"
LAB_TAG="${LAB_TAG:-kubetasker-ckad}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --region) REGION="$2"; shift 2 ;;
    --lab-tag) LAB_TAG="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
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

echo "Stopping lab instances: $INSTANCE_IDS"
aws ec2 stop-instances --instance-ids $INSTANCE_IDS --region "$REGION"
echo "Stopped request submitted. Use aws-status-kubetasker-lab.sh to verify."
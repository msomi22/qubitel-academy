#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-kubetasker-ckad}"
REGION="${AWS_REGION:-us-west-2}"
LAB_TAG="${LAB_TAG:-kubetasker-ckad}"

usage() {
  cat <<'EOF'
Usage: ./aws-status-kubetasker-lab.sh [options]

Options:
  --stack-name NAME       CloudFormation stack name. Default: STACK_NAME or kubetasker-ckad
  --region REGION         AWS region. Default: AWS_REGION or us-west-2
  --lab-tag TAG           EC2 Lab tag value. Default: LAB_TAG or kubetasker-ckad
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack-name) STACK_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --lab-tag) LAB_TAG="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

echo "CloudFormation stack status for $STACK_NAME in $REGION"
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].StackStatus" \
  --output text

echo
echo "Stack outputs"
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "Stacks[0].Outputs" \
  --output table

echo
echo "Recent stack events"
aws cloudformation describe-stack-events \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --max-items 20 \
  --output table

echo
echo "Create failures, if any"
aws cloudformation describe-stack-events \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query "StackEvents[?ResourceStatus=='CREATE_FAILED']" \
  --output table

echo
echo "Lab EC2 instances tagged Lab=$LAB_TAG"
aws ec2 describe-instances \
  --filters "Name=tag:Lab,Values=$LAB_TAG" \
  --query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,Role:Tags[?Key=='Role']|[0].Value,PublicIP:PublicIpAddress,State:State.Name}" \
  --output table \
  --region "$REGION"

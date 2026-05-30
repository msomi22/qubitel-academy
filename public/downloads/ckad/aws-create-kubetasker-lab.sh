#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-kubetasker-ckad}"
REGION="${AWS_REGION:-us-west-2}"
TEMPLATE_FILE="${TEMPLATE_FILE:-./kubetasker-ckad-aws-cloudformation.yaml}"
LAB_TAG="${LAB_TAG:-kubetasker-ckad}"
KEY_NAME="${KEY_NAME:-}"
SSH_LOCATION="${SSH_LOCATION:-}"
INSTANCE_TYPE="${INSTANCE_TYPE:-t3.medium}"
WORKER_COUNT="${WORKER_COUNT:-1}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./aws-create-kubetasker-lab.sh [options]

Options:
  --stack-name NAME       CloudFormation stack name. Default: kubetasker-ckad
  --region REGION         AWS region. Default: AWS_REGION or us-west-2
  --template-file FILE    CloudFormation template file path.
  --key-name NAME         Existing EC2 key pair name. Required.
  --ssh-location CIDR     Allowed SSH CIDR, for example 203.0.113.10/32. Required.
  --instance-type TYPE    EC2 instance type. Default: t3.medium
  --worker-count COUNT    Worker node count. Default: 1
  --dry-run               Print the AWS commands without creating resources.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack-name) STACK_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --template-file) TEMPLATE_FILE="$2"; shift 2 ;;
    --key-name) KEY_NAME="$2"; shift 2 ;;
    --ssh-location) SSH_LOCATION="$2"; shift 2 ;;
    --instance-type) INSTANCE_TYPE="$2"; shift 2 ;;
    --worker-count) WORKER_COUNT="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ -z "$KEY_NAME" ]]; then
  echo "Missing --key-name or KEY_NAME. Use an existing EC2 key pair name." >&2
  exit 1
fi

if [[ -z "$SSH_LOCATION" ]]; then
  echo "Missing --ssh-location or SSH_LOCATION. Example: 203.0.113.10/32" >&2
  exit 1
fi

if [[ ! -f "$TEMPLATE_FILE" ]]; then
  echo "Template not found: $TEMPLATE_FILE" >&2
  exit 1
fi

CREATE_CMD=(
  aws cloudformation create-stack
  --stack-name "$STACK_NAME"
  --template-body "file://$TEMPLATE_FILE"
  --region "$REGION"
  --parameters
  "ParameterKey=KeyName,ParameterValue=$KEY_NAME"
  "ParameterKey=SSHLocation,ParameterValue=$SSH_LOCATION"
  "ParameterKey=InstanceType,ParameterValue=$INSTANCE_TYPE"
  "ParameterKey=WorkerCount,ParameterValue=$WORKER_COUNT"
  "ParameterKey=LabName,ParameterValue=$LAB_TAG"
)

WAIT_CMD=(aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME" --region "$REGION")

echo "Creating CloudFormation stack: $STACK_NAME"
echo "Region: $REGION"
echo "Lab tag: $LAB_TAG"
echo "Instance type: $INSTANCE_TYPE"
echo "Worker count: $WORKER_COUNT"

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN create command:\n  %q' "${CREATE_CMD[@]}"
  printf '\n\nDRY RUN wait command:\n  %q' "${WAIT_CMD[@]}"
  printf '\n'
  exit 0
fi

"${CREATE_CMD[@]}"

echo "Waiting for stack creation. This can take several minutes."
"${WAIT_CMD[@]}"

echo "Stack created. Run: ./aws-status-kubetasker-lab.sh --region $REGION"

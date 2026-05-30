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

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack-name) STACK_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --template-file) TEMPLATE_FILE="$2"; shift 2 ;;
    --key-name) KEY_NAME="$2"; shift 2 ;;
    --ssh-location) SSH_LOCATION="$2"; shift 2 ;;
    --instance-type) INSTANCE_TYPE="$2"; shift 2 ;;
    --worker-count) WORKER_COUNT="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
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

echo "Creating CloudFormation stack: $STACK_NAME"
echo "Region: $REGION"
echo "Lab tag: $LAB_TAG"
echo "Instance type: $INSTANCE_TYPE"
echo "Worker count: $WORKER_COUNT"

aws cloudformation create-stack \
  --stack-name "$STACK_NAME" \
  --template-body "file://$TEMPLATE_FILE" \
  --region "$REGION" \
  --parameters \
    "ParameterKey=KeyName,ParameterValue=$KEY_NAME" \
    "ParameterKey=SSHLocation,ParameterValue=$SSH_LOCATION" \
    "ParameterKey=InstanceType,ParameterValue=$INSTANCE_TYPE" \
    "ParameterKey=WorkerCount,ParameterValue=$WORKER_COUNT" \
    "ParameterKey=LabName,ParameterValue=$LAB_TAG"

echo "Waiting for stack creation. This can take several minutes."
aws cloudformation wait stack-create-complete --stack-name "$STACK_NAME" --region "$REGION"

echo "Stack created. Run: ./aws-status-kubetasker-lab.sh --region $REGION"
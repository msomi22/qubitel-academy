#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-kubetasker-ckad}"
REGION="${AWS_REGION:-us-west-2}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack-name) STACK_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

echo "WARNING: this deletes the full CloudFormation stack named $STACK_NAME in $REGION."
echo "This is the cleanest cleanup path for the AWS EC2 kubeadm lab."
read -r -p "Type the stack name to continue: " CONFIRM

if [[ "$CONFIRM" != "$STACK_NAME" ]]; then
  echo "Confirmation did not match. Nothing deleted."
  exit 1
fi

echo "Deleting stack: $STACK_NAME"
aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"

echo "Waiting for delete to complete."
aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$REGION"

echo "Stack deleted."
#!/usr/bin/env bash
set -euo pipefail

STACK_NAME="${STACK_NAME:-kubetasker-ckad}"
REGION="${AWS_REGION:-us-west-2}"
DRY_RUN="false"

usage() {
  cat <<'EOF'
Usage: ./aws-delete-kubetasker-lab.sh [options]

Options:
  --stack-name NAME       CloudFormation stack name. Default: STACK_NAME or kubetasker-ckad
  --region REGION         AWS region. Default: AWS_REGION or us-west-2
  --dry-run               Print cleanup commands without changing resources.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --stack-name) STACK_NAME="$2"; shift 2 ;;
    --region) REGION="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

CLEANUP_CMD=(aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION")
WAIT_CMD=(aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$REGION")

echo "WARNING: this removes the full CloudFormation stack named $STACK_NAME in $REGION."
echo "This is the cleanest cleanup path for the AWS EC2 kubeadm lab."

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN cleanup command:\n  %q' "${CLEANUP_CMD[@]}"
  printf '\n\nDRY RUN wait command:\n  %q' "${WAIT_CMD[@]}"
  printf '\n'
  exit 0
fi

read -r -p "Type the stack name to continue: " CONFIRM
if [[ "$CONFIRM" != "$STACK_NAME" ]]; then
  echo "Confirmation did not match. Nothing changed."
  exit 1
fi

"${CLEANUP_CMD[@]}"

echo "Waiting for cleanup to complete."
"${WAIT_CMD[@]}"

echo "Stack cleanup complete."

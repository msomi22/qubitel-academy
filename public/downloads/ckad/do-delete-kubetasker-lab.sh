#!/usr/bin/env bash
set -euo pipefail

CLUSTER_NAME="${DO_CLUSTER_NAME:-${CLUSTER_NAME:-kubetasker-ckad}}"
DRY_RUN="false"
YES="false"

usage() {
  cat <<'EOF'
Usage: ./do-delete-kubetasker-lab.sh [options]

Options:
  --cluster-name NAME     DigitalOcean Kubernetes cluster name. Default: DO_CLUSTER_NAME, CLUSTER_NAME, or kubetasker-ckad
  --dry-run               Print commands without deleting resources.
  --yes                   Skip interactive confirmation. Use carefully.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --cluster-name) CLUSTER_NAME="$2"; shift 2 ;;
    --dry-run) DRY_RUN="true"; shift ;;
    --yes) YES="true"; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

DELETE_CMD=(doctl kubernetes cluster delete "$CLUSTER_NAME" --force)

echo "WARNING: this deletes the DigitalOcean Kubernetes cluster named $CLUSTER_NAME."

if [[ "$DRY_RUN" == "true" ]]; then
  printf 'DRY RUN delete command:\n  %q' "${DELETE_CMD[@]}"
  printf '\n'
  exit 0
fi

if [[ "$YES" != "true" ]]; then
  read -r -p "Type the cluster name to continue: " CONFIRM
  if [[ "$CONFIRM" != "$CLUSTER_NAME" ]]; then
    echo "Confirmation did not match. Nothing deleted."
    exit 1
  fi
fi

"${DELETE_CMD[@]}"

echo "Delete request submitted. Confirm cleanup in the DigitalOcean dashboard."

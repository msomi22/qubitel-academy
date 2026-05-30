# Civo CKAD lab

Use this path when the learner wants a lightweight managed Kubernetes cluster and has access to Civo in a suitable region.

## Prerequisites

- Civo account
- `civo` CLI installed and authenticated
- `kubectl` installed

## Create

```bash
./civo-create-kubetasker-lab.sh
```

Optional environment variables:

```bash
export CIVO_CLUSTER_NAME=kubetasker-ckad
export CIVO_REGION=LON1
export CIVO_NODE_SIZE=g4s.kube.medium
export CIVO_NODE_COUNT=1
```

## Verify

```bash
k get nodes -o wide
k get pods -A
```

## Delete

```bash
./civo-delete-kubetasker-lab.sh
```

## Optional Terraform direction

Terraform can be added later, but the first preparation path should stay script-first so learners can start practicing quickly.
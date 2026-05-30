# DigitalOcean CKAD lab

Use this path when the learner wants a quick managed Kubernetes cluster and is comfortable using `doctl`.

## Prerequisites

- DigitalOcean account
- `doctl` installed and authenticated
- `kubectl` installed

## Create

```bash
./do-create-kubetasker-lab.sh
```

Optional environment variables:

```bash
export DO_CLUSTER_NAME=kubetasker-ckad
export DO_REGION=nyc1
export DO_NODE_SIZE=s-2vcpu-4gb
export DO_NODE_COUNT=1
```

## Verify

```bash
k get nodes -o wide
k get pods -A
```

## Delete

```bash
./do-delete-kubetasker-lab.sh
```

## Optional Terraform direction

Terraform can be added later for learners who want infrastructure-as-code practice. Keep the first CKAD path script-based so the setup remains simple and copy/paste friendly.
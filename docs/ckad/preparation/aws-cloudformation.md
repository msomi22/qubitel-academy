# AWS CloudFormation CKAD lab

This is the preferred preparation path for learners who want a small Linux VM running Kubernetes through `kubeadm`.

The lab uses **Cilium only** for Kubernetes networking. Do not use Flannel in this track.

## What it creates

The downloadable CloudFormation template creates:

- one Ubuntu EC2 control-plane instance;
- optional Ubuntu EC2 worker instances;
- kubeadm-based Kubernetes;
- containerd runtime;
- Cilium CLI and Cilium CNI;
- a `k=kubectl` alias for the `ubuntu` user;
- a lab tag named `Lab=kubetasker-ckad`.

## Prerequisites

You need:

- an AWS account;
- AWS CLI authenticated to the target account;
- permission to create CloudFormation and EC2 resources;
- an existing EC2 key pair in the target region;
- a narrow CIDR for remote access, preferably your current public IP with `/32`;
- budget awareness because cloud resources can cost money while the lab exists.

The EC2 instance installs `containerd`, `kubeadm`, `kubelet`, `kubectl`, Cilium CLI, and Cilium CNI automatically.

## Copy/paste AWS CloudShell path

Open AWS CloudShell in the target region, replace the placeholders, then paste this block.

```bash
export AWS_REGION=us-west-2
export KEY_NAME=YOUR_EXISTING_EC2_KEY_PAIR
export ACCESS_CIDR=YOUR_PUBLIC_IP/32
export STACK_NAME=kubetasker-ckad

mkdir -p ~/kubetasker-ckad-lab
cd ~/kubetasker-ckad-lab

curl -fsSLO https://senior-dev-accelerator.pages.dev/downloads/ckad/kubetasker-ckad-aws-cloudformation.yaml
curl -fsSLO https://senior-dev-accelerator.pages.dev/downloads/ckad/aws-create-kubetasker-lab.sh
curl -fsSLO https://senior-dev-accelerator.pages.dev/downloads/ckad/aws-status-kubetasker-lab.sh
curl -fsSLO https://senior-dev-accelerator.pages.dev/downloads/ckad/aws-delete-kubetasker-lab.sh
chmod +x aws-*-kubetasker-lab.sh

./aws-create-kubetasker-lab.sh \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --key-name "$KEY_NAME" \
  --ssh-location "$ACCESS_CIDR" \
  --instance-type t3.medium \
  --worker-count 0

./aws-status-kubetasker-lab.sh \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION"
```

## Copy/paste local terminal path

Download the template and scripts into one directory, replace the placeholders, then run:

```bash
chmod +x aws-*-kubetasker-lab.sh

./aws-create-kubetasker-lab.sh \
  --stack-name kubetasker-ckad \
  --region us-west-2 \
  --key-name YOUR_EXISTING_EC2_KEY_PAIR \
  --ssh-location YOUR_PUBLIC_IP/32 \
  --instance-type t3.medium \
  --worker-count 0
```

## Status

```bash
./aws-status-kubetasker-lab.sh \
  --stack-name kubetasker-ckad \
  --region us-west-2
```

## Verify after connecting to the EC2 instance

```bash
k get nodes -o wide
k get pods -A
cilium status --wait
k -n kube-system get pods -l k8s-app=cilium
```

## Stop and start

```bash
./aws-stop-kubetasker-lab.sh --region us-west-2
./aws-start-kubetasker-lab.sh --region us-west-2
```

After a start, verify again:

```bash
k get nodes -o wide
cilium status --wait
```

## Delete

Prefer delete when you are done:

```bash
./aws-delete-kubetasker-lab.sh \
  --stack-name kubetasker-ckad \
  --region us-west-2
```

## Notes

This path is intentionally simple. It is for CKAD command practice, not for production Kubernetes operations.

Cilium is installed to make the lab consistent with the rest of the track. Learners should still focus on CKAD object workflows: pods, deployments, services, config, probes, jobs, storage, security contexts, logs, events, describe, and exec.
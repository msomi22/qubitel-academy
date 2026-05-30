# CKAD Preparation: Create and destroy your cloud lab

This preparation section gives learners a practical Kubernetes lab before they begin the KubeTasker CKAD stages.

The goal is not to promise a guaranteed CKAD result. The goal is to remove infrastructure guesswork so learners can spend their practice time on Kubernetes commands, verification, debugging, and repetition.

The AWS EC2 kubeadm lab installs Cilium automatically as the Kubernetes networking layer.

## What the learner must already have

Before using these materials, the learner is expected to have:

- a cloud account for the provider they choose;
- credentials configured for that provider CLI;
- `kubectl` installed locally when using managed clusters;
- the shorthand alias `k` available or the habit of replacing `k` with `kubectl`;
- enough budget awareness to delete the lab when they finish practicing.

## Prerequisite checklist by path

Cost estimates are rough monthly figures for a small always-on practice lab. Actual cost varies by region, node size, storage, public IPs, load balancers, bandwidth, taxes, credits, and discounts.

| Path | Required CLI/tools | Required cloud setup | Estimated monthly cost |
|---|---|---|---|
| AWS EC2 + kubeadm + Cilium | `aws`, `bash`; `kubectl` is installed on the EC2 instance automatically | AWS account, EC2 key pair, permission to create CloudFormation/EC2/VPC/security group resources | ~USD 35-45/month for one `t3.medium` style single-node lab; more with worker nodes, EBS, public IPv4, and data transfer |
| DigitalOcean Kubernetes | `doctl`, `kubectl`, `bash` | DigitalOcean account and authenticated `doctl` | ~USD 24/month for one `s-2vcpu-4gb` node; storage and load balancers cost extra |
| Civo Kubernetes | `civo`, `kubectl`, `bash` | Civo account and authenticated `civo` CLI | ~USD 20-30/month for one small/medium node; exact cost depends on selected size and region |
| AWS EKS | `aws`, `eksctl`, `kubectl`, `bash` | AWS account and permission to create EKS, EC2, IAM, and VPC resources | ~USD 110-160/month or more: EKS control plane plus worker nodes, storage, public IPv4, and network charges |

## Recommended provider paths

| Path | Best for | Notes |
|---|---|---|
| AWS EC2 + kubeadm + Cilium | Linux Foundation-style VM practice | Preferred path for command fluency. Creates a small Kubernetes lab on EC2 and installs Cilium. |
| DigitalOcean Kubernetes | Fast managed-cluster setup | Easier to create/delete, but hides some node bootstrap details. |
| Civo Kubernetes | Lightweight managed-cluster setup | Good for quick practice when available in the learner's region. |
| AWS EKS | Optional only | Useful later, but not the main CKAD prep path because it adds more AWS-specific machinery. |

## Downloadable files

All downloadable files are served from `/downloads/ckad/` on `academy.qubitel.net`.

| File | Purpose |
|---|---|
| [`kubetasker-ckad-aws-cloudformation.yaml`](/downloads/ckad/kubetasker-ckad-aws-cloudformation.yaml) | AWS CloudFormation template for the kubeadm EC2 + Cilium lab. |
| [`aws-create-kubetasker-lab.sh`](/downloads/ckad/aws-create-kubetasker-lab.sh) | Creates the AWS stack. |
| [`aws-status-kubetasker-lab.sh`](/downloads/ckad/aws-status-kubetasker-lab.sh) | Shows stack status, outputs, and tagged EC2 instances. |
| [`aws-stop-kubetasker-lab.sh`](/downloads/ckad/aws-stop-kubetasker-lab.sh) | Stops the EC2 lab instance to pause compute cost. |
| [`aws-start-kubetasker-lab.sh`](/downloads/ckad/aws-start-kubetasker-lab.sh) | Starts the EC2 lab instance again. |
| [`aws-delete-kubetasker-lab.sh`](/downloads/ckad/aws-delete-kubetasker-lab.sh) | Deletes the AWS stack. |
| [`do-create-kubetasker-lab.sh`](/downloads/ckad/do-create-kubetasker-lab.sh) | Creates a small DigitalOcean Kubernetes cluster. |
| [`do-delete-kubetasker-lab.sh`](/downloads/ckad/do-delete-kubetasker-lab.sh) | Deletes the DigitalOcean cluster. |
| [`civo-create-kubetasker-lab.sh`](/downloads/ckad/civo-create-kubetasker-lab.sh) | Creates a small Civo Kubernetes cluster. |
| [`civo-delete-kubetasker-lab.sh`](/downloads/ckad/civo-delete-kubetasker-lab.sh) | Deletes the Civo cluster. |
| [`eks-create-kubetasker-lab.sh`](/downloads/ckad/eks-create-kubetasker-lab.sh) | Optional EKS cluster creation script. |
| [`eks-delete-kubetasker-lab.sh`](/downloads/ckad/eks-delete-kubetasker-lab.sh) | Optional EKS cluster deletion script. |
| [`k8s-stage-01-commands.sh`](/downloads/ckad/k8s-stage-01-commands.sh) | Copy/paste command reference for the first KubeTasker foundation deployment. |

## Copy/paste AWS CloudShell path

Replace the placeholder values, then paste this into AWS CloudShell:

```bash
export AWS_REGION=us-west-2
export KEY_NAME=YOUR_EXISTING_EC2_KEY_PAIR
export ACCESS_CIDR=YOUR_PUBLIC_IP/32
export STACK_NAME=kubetasker-ckad

mkdir -p ~/kubetasker-ckad-lab
cd ~/kubetasker-ckad-lab

curl -fsSLO https://academy.qubitel.net/downloads/ckad/kubetasker-ckad-aws-cloudformation.yaml
curl -fsSLO https://academy.qubitel.net/downloads/ckad/aws-create-kubetasker-lab.sh
curl -fsSLO https://academy.qubitel.net/downloads/ckad/aws-status-kubetasker-lab.sh
curl -fsSLO https://academy.qubitel.net/downloads/ckad/aws-delete-kubetasker-lab.sh
chmod +x aws-*-kubetasker-lab.sh

./aws-create-kubetasker-lab.sh \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --key-name "$KEY_NAME" \
  --ssh-location "$ACCESS_CIDR" \
  --worker-count 0

./aws-status-kubetasker-lab.sh \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION"
```

## Verify AWS Kubernetes on the EC2 instance

SSH to the public IP shown by the status script:

```bash
ssh ubuntu@PUBLIC_IP
```

Then run:

```bash
k get nodes -o wide
k get pods -A
cilium status --wait
k -n kube-system get pods -l k8s-app=cilium
```

## Managed cluster copy/paste examples

DigitalOcean:

```bash
export DO_CLUSTER_NAME=kubetasker-ckad
export DO_REGION=nyc1
export DO_NODE_SIZE=s-2vcpu-4gb
export DO_NODE_COUNT=1
./do-create-kubetasker-lab.sh
k get nodes -o wide
```

Civo:

```bash
export CIVO_CLUSTER_NAME=kubetasker-ckad
export CIVO_REGION=LON1
export CIVO_NODE_SIZE=g4s.kube.medium
export CIVO_NODE_COUNT=1
./civo-create-kubetasker-lab.sh
k get nodes -o wide
```

## How to choose

Use AWS EC2 + kubeadm + Cilium when the learner wants VM-based practice close to a hands-on Linux/Kubernetes environment.

Use DigitalOcean or Civo when the learner wants to start faster and focus mainly on `kubectl` practice.

Use EKS only after the learner already understands basic Kubernetes objects and wants provider-managed AWS experience.

## Safety reminder

Cloud labs can cost money while running. Stop or delete the environment whenever the practice session ends. Prefer delete when the learner does not need to keep cluster state.

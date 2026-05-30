import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const ACADEMY_DOWNLOADS_URL = 'https://academy.qubitel.net/downloads/ckad';
const prompt = 'Before starting the KubeTasker CKAD stages, how should a learner create, verify, use, and destroy a safe cloud Kubernetes practice lab?';

const problem = defineLearningProblem({
  id: 'ckad-preparation-cloud-lab-setup-001',
  category: 'kubernetes-ckad',
  topicId: 'ckad-preparation',
  title: 'CKAD Preparation: Create and Destroy Your Cloud Lab',
  difficulty: 'Easy',
  estimatedTimeSeconds: 420,
  tags: ['kubernetes-ckad', 'ckad-preparation', 'cloud-lab', 'kubectl', 'cilium', 'kube-tasker'],
  rendering: {
    variant: 'deep-dive',
    density: 'comfortable',
    accent: 'green'
  },
  prompt,
  question: prompt,
  body: [
    {
      type: 'section',
      title: 'Why this lab exists',
      content: 'CKAD practice works best when the learner can repeatedly create Kubernetes objects, inspect them, break them, fix them, and clean up without guessing the infrastructure setup. This preparation lesson gives ready-to-use cloud lab materials before Stage 1 starts.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'AWS lab networking',
      content: 'The AWS EC2 kubeadm lab installs Cilium automatically as the Kubernetes networking layer. Learners only need to verify that Cilium is healthy before continuing to Stage 1.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Cost cleanup warning',
      content: 'Do not leave cloud Kubernetes labs running after practice. Stop or delete the lab immediately when finished. For AWS EC2 kubeadm labs, stopping instances reduces compute cost, but storage and network resources may still incur cost. Deleting the CloudFormation stack is the cleanest cleanup path.'
    },
    {
      type: 'table',
      title: 'Prerequisite checklist by path',
      columns: ['Path', 'Required tools', 'Required cloud setup', 'Estimated monthly cost'],
      rows: [
        ['AWS EC2 + kubeadm + Cilium', 'aws and bash. kubectl is installed on the EC2 instance automatically.', 'AWS account, EC2 key pair, and permission to create CloudFormation, EC2, VPC, and security group resources.', '~USD 35-45/month for one t3.medium style single-node lab; more with worker nodes, EBS, public IPv4, and data transfer.'],
        ['DigitalOcean Kubernetes', 'doctl, kubectl, bash.', 'DigitalOcean account and authenticated doctl CLI.', '~USD 24/month for one s-2vcpu-4gb node; storage and load balancers cost extra.'],
        ['Civo Kubernetes', 'civo, kubectl, bash.', 'Civo account and authenticated civo CLI.', '~USD 20-30/month for one small/medium node; exact cost depends on selected size and region.'],
        ['AWS EKS', 'aws, eksctl, kubectl, bash.', 'AWS account and permission to create EKS, EC2, IAM, and VPC resources.', '~USD 110-160/month or more: EKS control plane plus worker nodes, storage, public IPv4, and network charges.']
      ]
    },
    {
      type: 'table',
      title: 'Choose a provider path',
      columns: ['Path', 'Use when', 'Cleanup'],
      rows: [
        ['AWS EC2 + kubeadm + Cilium using CloudFormation', 'Preferred Linux Foundation-style lab path for VM and kubectl fluency.', 'Use aws-delete-kubetasker-lab.sh when finished.'],
        ['DigitalOcean Kubernetes', 'Use when you want a fast managed cluster through doctl.', 'Use do-delete-kubetasker-lab.sh and confirm in the dashboard.'],
        ['Civo Kubernetes', 'Use when Civo is available and you want a lightweight managed cluster.', 'Use civo-delete-kubetasker-lab.sh and confirm in the dashboard.'],
        ['AWS EKS', 'Optional only. Useful later for AWS-managed Kubernetes experience and can cost more.', 'Use eks-delete-kubetasker-lab.sh and confirm cleanup in AWS.']
      ]
    },
    {
      type: 'checklist',
      title: 'General prerequisites',
      items: [
        'A cloud account for the selected provider.',
        'The provider CLI installed and authenticated: aws, doctl, civo, or eksctl.',
        'kubectl installed locally for managed clusters.',
        'For AWS EC2 kubeadm, kubectl is installed automatically on the EC2 instance.',
        'The shorthand alias configured: alias k=kubectl.',
        'An SSH key pair for the AWS EC2 kubeadm path.',
        'Docker is optional only for image pre-checks; Stage 1 uses the public image msomi22/kubetasker-api:0.1.1.'
      ]
    },
    {
      type: 'table',
      title: 'Cloud provider account setup',
      columns: ['Provider path', 'Account needed?', 'How to prepare the account', 'CLI authentication needed'],
      rows: [
        ['AWS EC2 + kubeadm + Cilium', 'Yes. Create or use an AWS account with billing enabled.', 'Create an EC2 key pair in the target region. Make sure the IAM user or role can create CloudFormation, EC2, VPC, subnet, route table, internet gateway, security group, and EBS resources.', 'Run aws configure locally or use AWS CloudShell where AWS authentication is already available.'],
        ['DigitalOcean Kubernetes', 'Yes. Create or use a DigitalOcean account with billing enabled.', 'Create a personal access token from the DigitalOcean dashboard. The token must allow cluster creation and deletion.', 'Install doctl, then authenticate it with the token before running the create script.'],
        ['Civo Kubernetes', 'Yes. Create or use a Civo account with billing enabled.', 'Create an API key from the Civo dashboard and choose a supported region and node size.', 'Install the civo CLI, save the API key, then select the region before running the create script.'],
        ['AWS EKS optional path', 'Yes. Use the same AWS account style as the EC2 path.', 'Make sure the IAM user or role can create EKS clusters, IAM roles, EC2 nodes, VPC resources, and security groups. This path can cost more.', 'Run aws configure and confirm eksctl is installed before running the EKS script.']
      ]
    },
    {
      type: 'section',
      title: 'Download the lab scripts below',
      content: 'The scripts are served from /downloads/ckad/. Download them into your terminal or cloud shell, then follow the instructions below before creating the lab. You can also open /downloads/ckad/ in the browser to view the download index and download files one by one. The exact script filenames are shown inside the copy/paste command blocks below.'
    },
    {
      type: 'code',
      title: 'AWS CloudShell: download and create the Cilium lab',
      language: 'bash',
      code: `export AWS_REGION=us-west-2
export KEY_NAME=YOUR_EXISTING_EC2_KEY_PAIR
export ACCESS_CIDR=YOUR_PUBLIC_IP/32
export STACK_NAME=kubetasker-ckad

mkdir -p ~/kubetasker-ckad-lab
cd ~/kubetasker-ckad-lab

curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/kubetasker-ckad-aws-cloudformation.yaml
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/aws-create-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/aws-status-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/aws-delete-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/k8s-stage-01-commands.sh
chmod +x *.sh

./aws-create-kubetasker-lab.sh \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --key-name "$KEY_NAME" \
  --ssh-location "$ACCESS_CIDR" \
  --worker-count 0

./aws-status-kubetasker-lab.sh \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION"`
    },
    {
      type: 'code',
      title: 'AWS: SSH and verify Kubernetes + Cilium',
      language: 'bash',
      code: 'ssh ubuntu@PUBLIC_IP\n\nk get nodes -o wide\nk get pods -A\ncilium status --wait\nk -n kube-system get pods -l k8s-app=cilium'
    },
    {
      type: 'code',
      title: 'DigitalOcean: create and verify a managed cluster',
      language: 'bash',
      code: `export DO_CLUSTER_NAME=kubetasker-ckad
export DO_REGION=nyc1
export DO_NODE_SIZE=s-2vcpu-4gb
export DO_NODE_COUNT=1

curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/do-create-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/do-delete-kubetasker-lab.sh
chmod +x do-*-kubetasker-lab.sh

./do-create-kubetasker-lab.sh
k get nodes -o wide`
    },
    {
      type: 'code',
      title: 'Civo: create and verify a managed cluster',
      language: 'bash',
      code: `export CIVO_CLUSTER_NAME=kubetasker-ckad
export CIVO_REGION=LON1
export CIVO_NODE_SIZE=g4s.kube.medium
export CIVO_NODE_COUNT=1

curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/civo-create-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/civo-delete-kubetasker-lab.sh
chmod +x civo-*-kubetasker-lab.sh

./civo-create-kubetasker-lab.sh
k get nodes -o wide`
    },
    {
      type: 'section',
      title: 'Stage 1: deploy KubeTasker API foundation',
      content: 'After the cluster is ready, use the Stage 1 command reference at /downloads/ckad/k8s-stage-01-commands.sh. It creates the kubetasker namespace, deploys the kube-tasker-api image, exposes the Service, starts a temporary client Pod, and checks the API through the Service.'
    },
    {
      type: 'code',
      title: 'Stage 1: download and inspect the command reference',
      language: 'bash',
      code: `curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/k8s-stage-01-commands.sh
chmod +x k8s-stage-01-commands.sh
less k8s-stage-01-commands.sh`
    },
    {
      type: 'code',
      title: 'Stage 1: core commands preview',
      language: 'bash',
      code: 'k create namespace kubetasker --dry-run=client -o yaml\nk create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker\nk expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker\nk -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600\nk -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health'
    },
    {
      type: 'code',
      title: 'Cleanup after practice',
      language: 'bash',
      code: '# App cleanup\nk delete namespace kubetasker --ignore-not-found\n\n# AWS full lab cleanup\n./aws-delete-kubetasker-lab.sh --stack-name kubetasker-ckad --region us-west-2\n\n# DigitalOcean cleanup\n./do-delete-kubetasker-lab.sh\n\n# Civo cleanup\n./civo-delete-kubetasker-lab.sh'
    }
  ],
  explanation: 'A good CKAD preparation lab starts with a clean provider choice, authenticated CLI, kubectl, the k alias, clear create and verify commands, a visible Stage 1 path, and a cleanup path. AWS EC2 with kubeadm and Cilium is the preferred Linux Foundation-style path. DigitalOcean and Civo are faster managed alternatives. EKS is optional and can cost more. The learner should verify the cluster, use the Stage 1 command reference, clean up the application namespace, and destroy the full cloud environment when practice ends.',
  starterThought: 'First decide which provider path you will use, then verify that the provider CLI and kubectl workflow are ready before creating the lab.',
  hints: [
    'Use k as shorthand for kubectl throughout the lessons.',
    'Every provider path must have a cleanup command.',
    'For the AWS kubeadm path, verify Cilium with cilium status --wait before continuing.',
    'Do not continue to Stage 1 until k get nodes works.',
    'Stage 1 commands are available at /downloads/ckad/k8s-stage-01-commands.sh.'
  ],
  relatedConcepts: ['kubectl', 'kubeadm', 'Cilium', 'CloudFormation', 'managed Kubernetes', 'cleanup', 'KubeTasker'],
  followUpQuestions: [
    'Which provider path is best for your current practice session?',
    'How will you confirm that the cluster and Cilium are ready before deploying KubeTasker?',
    'Which command destroys the full cloud environment when you finish?'
  ],
  finalTakeaway: 'The preparation lab exists to make CKAD practice repeatable: create the cluster, verify Cilium where applicable, practice Stage 1 with k, clean the namespace, and destroy the cloud environment when done.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 420
  }
});

export default problem;

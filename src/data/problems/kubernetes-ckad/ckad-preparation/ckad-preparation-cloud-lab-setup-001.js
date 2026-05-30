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
      content: 'CKAD practice works best when the learner can repeatedly create Kubernetes objects, inspect them, break them, fix them, and clean up without guessing the infrastructure setup. Pick one provider tab below, follow only that setup path, then continue to Stage 1.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Cost cleanup warning',
      content: 'Do not leave cloud Kubernetes labs running after practice. Stop or delete the lab immediately when finished. Deleting the cloud lab is the cleanest cleanup path because stopped instances, disks, public IPs, load balancers, and managed control planes may still cost money.'
    },
    {
      type: 'tabs',
      title: 'Choose your cloud lab path',
      description: 'Use one tab at a time. Each provider tab includes the account requirement, setup preparation, estimated cost, download commands, create command, verification command, and cleanup command.',
      tabs: [
        {
          id: 'aws-ec2-kubeadm',
          label: 'AWS EC2 + kubeadm + Cilium',
          body: [
            {
              type: 'section',
              title: 'When to use this path',
              content: 'Use this as the preferred CKAD practice path when you want VM-based Kubernetes practice with kubeadm and direct node access. The lab installs Cilium automatically as the Kubernetes networking layer.'
            },
            {
              type: 'checklist',
              title: 'Account and prerequisites',
              items: [
                'AWS account with billing enabled.',
                'AWS CloudShell access, or AWS CLI installed locally and authenticated with aws configure.',
                'Permission to create CloudFormation, EC2, VPC, subnet, route table, internet gateway, security group, and EBS resources.',
                'An existing EC2 key pair in the target AWS region.',
                'Your public IP address in CIDR format, for example 203.0.113.10/32.',
                'kubectl does not need to be installed locally for this path because it is installed automatically on the EC2 instance.'
              ]
            },
            {
              type: 'callout',
              tone: 'info',
              title: 'Estimated monthly cost',
              content: 'Approximate cost: USD 35-45/month for one t3.medium style single-node lab. Cost can increase with worker nodes, EBS storage, public IPv4, NAT, and data transfer. Delete the stack when finished.'
            },
            {
              type: 'code',
              title: 'Create the AWS EC2 kubeadm + Cilium lab',
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
              title: 'SSH and verify Kubernetes + Cilium',
              language: 'bash',
              code: 'ssh ubuntu@PUBLIC_IP\n\nk get nodes -o wide\nk get pods -A\ncilium status --wait\nk -n kube-system get pods -l k8s-app=cilium'
            },
            {
              type: 'code',
              title: 'Delete the AWS lab after practice',
              language: 'bash',
              code: './aws-delete-kubetasker-lab.sh --stack-name kubetasker-ckad --region us-west-2'
            }
          ]
        },
        {
          id: 'digitalocean',
          label: 'DigitalOcean',
          body: [
            {
              type: 'section',
              title: 'When to use this path',
              content: 'Use this path when you want a fast managed Kubernetes cluster and want to focus mainly on kubectl practice rather than node bootstrap details.'
            },
            {
              type: 'checklist',
              title: 'Account and prerequisites',
              items: [
                'DigitalOcean account with billing enabled.',
                'Personal access token created from the DigitalOcean dashboard.',
                'doctl installed and authenticated with the personal access token.',
                'kubectl installed locally.',
                'bash available in your terminal or cloud shell.'
              ]
            },
            {
              type: 'callout',
              tone: 'info',
              title: 'Estimated monthly cost',
              content: 'Approximate cost: USD 24/month for one s-2vcpu-4gb node. Storage and load balancers cost extra. Delete the cluster when finished.'
            },
            {
              type: 'code',
              title: 'Create the DigitalOcean Kubernetes lab',
              language: 'bash',
              code: `export DO_CLUSTER_NAME=kubetasker-ckad
export DO_REGION=nyc1
export DO_NODE_SIZE=s-2vcpu-4gb
export DO_NODE_COUNT=1

mkdir -p ~/kubetasker-ckad-lab
cd ~/kubetasker-ckad-lab

curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/do-create-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/do-delete-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/k8s-stage-01-commands.sh
chmod +x *.sh

./do-create-kubetasker-lab.sh
k get nodes -o wide`
            },
            {
              type: 'code',
              title: 'Delete the DigitalOcean lab after practice',
              language: 'bash',
              code: './do-delete-kubetasker-lab.sh'
            }
          ]
        },
        {
          id: 'civo',
          label: 'Civo',
          body: [
            {
              type: 'section',
              title: 'When to use this path',
              content: 'Use this path when Civo is available in your region and you want a lightweight managed Kubernetes setup for quick practice.'
            },
            {
              type: 'checklist',
              title: 'Account and prerequisites',
              items: [
                'Civo account with billing enabled.',
                'Civo API key created from the Civo dashboard.',
                'civo CLI installed and authenticated with the API key.',
                'A supported Civo region and node size selected.',
                'kubectl installed locally.',
                'bash available in your terminal or cloud shell.'
              ]
            },
            {
              type: 'callout',
              tone: 'info',
              title: 'Estimated monthly cost',
              content: 'Approximate cost: USD 20-30/month for one small or medium node. Exact cost depends on region and node size. Delete the cluster when finished.'
            },
            {
              type: 'code',
              title: 'Create the Civo Kubernetes lab',
              language: 'bash',
              code: `export CIVO_CLUSTER_NAME=kubetasker-ckad
export CIVO_REGION=LON1
export CIVO_NODE_SIZE=g4s.kube.medium
export CIVO_NODE_COUNT=1

mkdir -p ~/kubetasker-ckad-lab
cd ~/kubetasker-ckad-lab

curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/civo-create-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/civo-delete-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/k8s-stage-01-commands.sh
chmod +x *.sh

./civo-create-kubetasker-lab.sh
k get nodes -o wide`
            },
            {
              type: 'code',
              title: 'Delete the Civo lab after practice',
              language: 'bash',
              code: './civo-delete-kubetasker-lab.sh'
            }
          ]
        },
        {
          id: 'aws-eks',
          label: 'AWS EKS optional',
          body: [
            {
              type: 'section',
              title: 'When to use this path',
              content: 'Use EKS only when you specifically want AWS-managed Kubernetes experience. It is useful later, but it is not the main CKAD preparation path because it adds more AWS-specific machinery and normally costs more.'
            },
            {
              type: 'checklist',
              title: 'Account and prerequisites',
              items: [
                'AWS account with billing enabled.',
                'AWS CLI installed and authenticated, or AWS CloudShell access.',
                'eksctl installed.',
                'kubectl installed locally.',
                'Permission to create EKS clusters, IAM roles, EC2 nodes, VPC resources, and security groups.'
              ]
            },
            {
              type: 'callout',
              tone: 'warning',
              title: 'Estimated monthly cost',
              content: 'Approximate cost: USD 110-160/month or more because EKS includes a managed control plane plus worker nodes, storage, public IPv4, and network charges. Delete the cluster when finished.'
            },
            {
              type: 'code',
              title: 'Create the optional EKS lab',
              language: 'bash',
              code: `export EKS_CLUSTER_NAME=kubetasker-ckad
export AWS_REGION=us-west-2

mkdir -p ~/kubetasker-ckad-lab
cd ~/kubetasker-ckad-lab

curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/eks-create-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/eks-delete-kubetasker-lab.sh
curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/k8s-stage-01-commands.sh
chmod +x *.sh

./eks-create-kubetasker-lab.sh
k get nodes -o wide`
            },
            {
              type: 'code',
              title: 'Delete the EKS lab after practice',
              language: 'bash',
              code: './eks-delete-kubetasker-lab.sh'
            }
          ]
        },
        {
          id: 'stage-1',
          label: 'Stage 1',
          body: [
            {
              type: 'section',
              title: 'Deploy KubeTasker API foundation',
              content: 'After your selected cluster is ready, use the Stage 1 command reference. It creates the kubetasker namespace, deploys the kube-tasker-api image, exposes the Service, starts a temporary client Pod, and checks the API through the Service.'
            },
            {
              type: 'code',
              title: 'Download and inspect the Stage 1 command reference',
              language: 'bash',
              code: `curl -fsSLO ${ACADEMY_DOWNLOADS_URL}/k8s-stage-01-commands.sh
chmod +x k8s-stage-01-commands.sh
less k8s-stage-01-commands.sh`
            },
            {
              type: 'code',
              title: 'Stage 1 core commands preview',
              language: 'bash',
              code: 'k create namespace kubetasker --dry-run=client -o yaml\nk create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker\nk expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker\nk -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600\nk -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health'
            },
            {
              type: 'code',
              title: 'Clean up Stage 1 application resources',
              language: 'bash',
              code: 'k delete namespace kubetasker --ignore-not-found'
            }
          ]
        }
      ]
    }
  ],
  explanation: 'A good CKAD preparation lab starts with one clear provider choice, a ready cloud account, authenticated CLI, kubectl access, copy/paste creation commands, verification, Stage 1 practice, and cleanup. AWS EC2 with kubeadm and Cilium is the preferred VM-based path. DigitalOcean and Civo are faster managed alternatives. EKS is optional and can cost more.',
  starterThought: 'First choose one provider tab, prepare that account and CLI, create the lab, verify the cluster, then continue to Stage 1.',
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
    'How will you confirm that the cluster is ready before deploying KubeTasker?',
    'Which command destroys the full cloud environment when you finish?'
  ],
  finalTakeaway: 'Choose one provider path, create the lab with the provided commands, verify the cluster, practice Stage 1 with k, then clean up the application and delete the cloud environment when done.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 420
  }
});

export default problem;

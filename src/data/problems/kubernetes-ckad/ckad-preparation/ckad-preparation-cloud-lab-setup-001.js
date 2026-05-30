import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

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
      tone: 'warning',
      title: 'Use Cilium only',
      content: 'The self-managed AWS kubeadm lab uses Cilium only. Do not use Flannel in this track. This keeps the CKAD lab networking direction consistent and modern.'
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
      columns: ['Path', 'Required tools', 'Required cloud setup'],
      rows: [
        ['AWS EC2 + kubeadm + Cilium', 'aws and bash. kubectl is installed on the EC2 instance automatically.', 'AWS account, EC2 key pair, and permission to create CloudFormation, EC2, VPC, and security group resources.'],
        ['DigitalOcean Kubernetes', 'doctl, kubectl, bash.', 'DigitalOcean account and authenticated doctl CLI.'],
        ['Civo Kubernetes', 'civo, kubectl, bash.', 'Civo account and authenticated civo CLI.'],
        ['AWS EKS', 'aws, eksctl, kubectl, bash.', 'AWS account and permission to create EKS, EC2, IAM, and VPC resources.']
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
        'kubectl installed locally for managed clusters. The AWS EC2 kubeadm path installs kubectl on the EC2 instance.',
        'The shorthand alias configured: alias k=kubectl.',
        'An SSH key pair for the AWS EC2 kubeadm path.',
        'Docker is optional only for image pre-checks; Stage 1 uses the public image msomi22/kubetasker-api:0.1.1.'
      ]
    },
    {
      type: 'code',
      title: 'Verify AWS kubeadm + Cilium lab after SSH',
      language: 'bash',
      code: 'k get nodes -o wide\nk get pods -A\ncilium status --wait\nk -n kube-system get pods -l k8s-app=cilium'
    },
    {
      type: 'code',
      title: 'Stage 1 app namespace cleanup',
      language: 'bash',
      code: 'k delete pod kube-tasker-client -n kubetasker --ignore-not-found\nk delete svc kube-tasker-api -n kubetasker --ignore-not-found\nk delete deployment kube-tasker-api -n kubetasker --ignore-not-found\nk delete namespace kubetasker --ignore-not-found'
    },
    {
      type: 'section',
      title: 'Next step',
      content: 'After the cluster is reachable and k get nodes works, continue to Stage 1: Deploy KubeTasker API foundation. Kubernetes will pull the public Docker Hub image msomi22/kubetasker-api:0.1.1 automatically when the Pod is scheduled.'
    }
  ],
  explanation: 'A good CKAD preparation lab starts with a clean provider choice, authenticated CLI, kubectl, the k alias, clear create and verify commands, and a cleanup path. AWS EC2 with kubeadm and Cilium is the preferred Linux Foundation-style path. DigitalOcean and Civo are faster managed alternatives. EKS is optional and can cost more. The learner should verify the cluster, use the Stage 1 command reference, clean up the application namespace, and destroy the full cloud environment when practice ends.',
  starterThought: 'First decide which provider path you will use, then verify that the provider CLI and kubectl workflow are ready before creating the lab.',
  hints: [
    'Use k as shorthand for kubectl throughout the lessons.',
    'Every provider path must have a cleanup command.',
    'For the AWS kubeadm path, verify Cilium with cilium status --wait before continuing.',
    'Do not continue to Stage 1 until k get nodes works.'
  ],
  relatedConcepts: ['kubectl', 'kubeadm', 'Cilium', 'CloudFormation', 'managed Kubernetes', 'cleanup', 'KubeTasker'],
  followUpQuestions: [
    'Which provider path is best for your current practice session?',
    'How will you confirm that the cluster and Cilium are ready before deploying KubeTasker?',
    'Which command destroys the full cloud environment when you finish?'
  ],
  finalTakeaway: 'The preparation lab exists to make CKAD practice repeatable: create the cluster, verify Cilium where applicable, practice with k, clean the namespace, and destroy the cloud environment when done.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 420
  }
});

export default problem;

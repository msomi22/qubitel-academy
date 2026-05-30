import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Before starting the KubeTasker CKAD stages, how should a learner create, verify, use, and destroy a safe cloud Kubernetes practice lab?';

const awsCloudFormationTemplate = `AWSTemplateFormatVersion: '2010-09-09'
Description: KubeTasker CKAD single-node kubeadm lab using Cilium networking. This template does not create Elastic IPs.

Parameters:
  KeyName:
    Type: AWS::EC2::KeyPair::KeyName
    Description: Existing EC2 key pair used for SSH access.
  SSHLocation:
    Type: String
    Description: CIDR allowed to reach SSH, Kubernetes API, and NodePort practice. Prefer your public IP with /32.
  InstanceType:
    Type: String
    Default: t3.medium
    Description: EC2 instance type for the single-node CKAD lab.
  LabName:
    Type: String
    Default: kubetasker-ckad
    Description: Lab tag value and naming prefix.
  AmiId:
    Type: AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>
    Default: /aws/service/canonical/ubuntu/server/22.04/stable/current/amd64/hvm/ebs-gp2/ami-id
    Description: Ubuntu 22.04 LTS AMI from Canonical SSM public parameters.

Resources:
  KubeTaskerVpc:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.42.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub \${LabName}-vpc
        - Key: Lab
          Value: !Ref LabName

  KubeTaskerSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref KubeTaskerVpc
      CidrBlock: 10.42.1.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub \${LabName}-public-subnet
        - Key: Lab
          Value: !Ref LabName

  KubeTaskerInternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub \${LabName}-igw
        - Key: Lab
          Value: !Ref LabName

  KubeTaskerGatewayAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref KubeTaskerVpc
      InternetGatewayId: !Ref KubeTaskerInternetGateway

  KubeTaskerRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref KubeTaskerVpc
      Tags:
        - Key: Name
          Value: !Sub \${LabName}-route-table
        - Key: Lab
          Value: !Ref LabName

  KubeTaskerDefaultRoute:
    Type: AWS::EC2::Route
    DependsOn: KubeTaskerGatewayAttachment
    Properties:
      RouteTableId: !Ref KubeTaskerRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref KubeTaskerInternetGateway

  KubeTaskerSubnetRouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref KubeTaskerSubnet
      RouteTableId: !Ref KubeTaskerRouteTable

  KubeTaskerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: KubeTasker CKAD lab access
      VpcId: !Ref KubeTaskerVpc
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: !Ref SSHLocation
        - IpProtocol: tcp
          FromPort: 6443
          ToPort: 6443
          CidrIp: !Ref SSHLocation
        - IpProtocol: tcp
          FromPort: 30000
          ToPort: 32767
          CidrIp: !Ref SSHLocation
      SecurityGroupEgress:
        - IpProtocol: -1
          CidrIp: 0.0.0.0/0
      Tags:
        - Key: Name
          Value: !Sub \${LabName}-security-group
        - Key: Lab
          Value: !Ref LabName

  KubeTaskerInternalIngress:
    Type: AWS::EC2::SecurityGroupIngress
    Properties:
      GroupId: !Ref KubeTaskerSecurityGroup
      IpProtocol: -1
      SourceSecurityGroupId: !Ref KubeTaskerSecurityGroup

  ControlPlane:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref AmiId
      InstanceType: !Ref InstanceType
      KeyName: !Ref KeyName
      SubnetId: !Ref KubeTaskerSubnet
      SecurityGroupIds:
        - !Ref KubeTaskerSecurityGroup
      Tags:
        - Key: Name
          Value: !Sub \${LabName}-control-plane
        - Key: Lab
          Value: !Ref LabName
        - Key: Role
          Value: control-plane
      UserData:
        Fn::Base64: !Sub |
          #!/usr/bin/env bash
          set -euxo pipefail
          apt-get update
          apt-get install -y ca-certificates curl gnupg lsb-release apt-transport-https bash-completion jq
          swapoff -a
          sed -i '/ swap / s/^/#/' /etc/fstab
          modprobe overlay
          modprobe br_netfilter
          cat >/etc/modules-load.d/k8s.conf <<'MODULES'
          overlay
          br_netfilter
          MODULES
          cat >/etc/sysctl.d/k8s.conf <<'SYSCTL'
          net.bridge.bridge-nf-call-iptables = 1
          net.bridge.bridge-nf-call-ip6tables = 1
          net.ipv4.ip_forward = 1
          SYSCTL
          sysctl --system
          install -m 0755 -d /etc/apt/keyrings
          curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
          echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' >/etc/apt/sources.list.d/kubernetes.list
          curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
          echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" >/etc/apt/sources.list.d/docker.list
          apt-get update
          apt-get install -y containerd.io kubelet kubeadm kubectl
          apt-mark hold kubelet kubeadm kubectl
          mkdir -p /etc/containerd
          containerd config default >/etc/containerd/config.toml
          sed -i 's/SystemdCgroup = false/SystemdCgroup = true/' /etc/containerd/config.toml
          systemctl restart containerd
          systemctl enable containerd kubelet
          kubeadm init --pod-network-cidr=10.244.0.0/16 --node-name \${LabName}-control-plane
          mkdir -p /home/ubuntu/.kube
          cp /etc/kubernetes/admin.conf /home/ubuntu/.kube/config
          chown -R ubuntu:ubuntu /home/ubuntu/.kube
          echo 'alias k=kubectl' >>/home/ubuntu/.bashrc
          echo 'source <(kubectl completion bash)' >>/home/ubuntu/.bashrc
          echo 'complete -o default -F __start_kubectl k' >>/home/ubuntu/.bashrc
          CILIUM_CLI_VERSION=$(curl -fsSL https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
          CLI_ARCH=amd64
          if [ "$(uname -m)" = "aarch64" ]; then CLI_ARCH=arm64; fi
          curl -fsSLO "https://github.com/cilium/cilium-cli/releases/download/\${!CILIUM_CLI_VERSION}/cilium-linux-\${!CLI_ARCH}.tar.gz"
          tar xzvf "cilium-linux-\${!CLI_ARCH}.tar.gz" -C /usr/local/bin cilium
          rm "cilium-linux-\${!CLI_ARCH}.tar.gz"
          su - ubuntu -c 'cilium install --version 1.16.6 --wait'
          su - ubuntu -c 'cilium status --wait'
          su - ubuntu -c 'kubectl taint nodes --all node-role.kubernetes.io/control-plane- || true'

Outputs:
  ControlPlanePublicIp:
    Description: SSH target for the control-plane instance.
    Value: !GetAtt ControlPlane.PublicIp
  KubeConfigPath:
    Description: Kubeconfig location on the control-plane instance.
    Value: /home/ubuntu/.kube/config
  Cni:
    Description: Cluster networking implementation.
    Value: Cilium
`;

function command(title, explanation, code, language = 'bash') {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title, language, code }
  ];
}

function kubeTaskerCommandBlocks() {
  return [
    { type: 'section', title: 'What is KubeTasker?', content: 'KubeTasker is the demo learning application used throughout this CKAD course. It gives us a realistic API workload for practising deployments, Services, cluster DNS, logs, configuration, probes, troubleshooting, and cleanup. It is not a built-in Kubernetes component.' },
    ...command('Create KubeTasker namespace', 'Creates the kubetasker namespace. The dry-run plus apply style makes the command safe to run again.', 'k create namespace kubetasker --dry-run=client -o yaml | k apply -f -'),
    ...command('Create KubeTasker API deployment', 'Starts the KubeTasker API workload from the published practice image.', 'k create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker'),
    ...command('Expose KubeTasker API service', 'Creates an in-cluster Service on port 80 that forwards traffic to the container on port 8080.', 'k expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker'),
    ...command('Create a temporary test client pod', 'Runs a small BusyBox pod inside the same namespace so you can test the Service through cluster DNS.', 'k -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600'),
    ...command('Wait for the test client pod', 'Waits until the client pod is ready before using it to call the API.', 'k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s'),
    ...command('Call the KubeTasker health endpoint', 'Executes wget from inside the client pod and calls the API Service through Kubernetes DNS.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health')
  ];
}

const problem = defineLearningProblem({
  id: 'ckad-preparation-cloud-lab-setup-001',
  category: 'kubernetes-ckad',
  topicId: 'ckad-preparation',
  title: 'CKAD Preparation: Create and Destroy Your Cloud Lab',
  difficulty: 'Easy',
  estimatedTimeSeconds: 420,
  tags: ['kubernetes-ckad', 'ckad-preparation', 'cloud-lab', 'kubectl', 'cilium', 'kube-tasker'],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  body: [
    { type: 'section', title: 'Objective', content: '1. Choose the right cloud provider.\n2. Create a Kubernetes practice environment.\n3. Connect to the cluster with **kubectl**.\n4. Verify that the control-plane node is ready.\n5. Clean up the lab safely when done.' },
    { type: 'section', title: 'Why this lab exists', content: 'CKAD practice works best when the learner can repeatedly create Kubernetes objects, inspect them, break them, fix them, and clean up without guessing the infrastructure setup. Pick one provider tab below and follow only that setup path.' },
    { type: 'callout', tone: 'warning', title: 'Cost cleanup warning', content: 'Do not leave cloud Kubernetes labs running after practice. Delete the lab immediately when finished. This AWS EC2 path does not create Elastic IPs; it uses the normal auto-assigned EC2 public IPv4 from the public subnet.' },
    { type: 'callout', tone: 'info', title: 'Local Kubernetes option', content: 'You can also explore local Kubernetes setups such as Minikube, Kind, Docker Desktop Kubernetes, or k3d. This course provides cloud paths so learners can practise in a realistic disposable environment, but local clusters are useful for quick experiments.' },
    {
      type: 'tabs',
      title: 'Choose your cloud lab path',
      description: 'Use one tab at a time. Every runnable command below is explained first, then shown in its own copyable block.',
      tabs: [
        {
          id: 'aws-ec2-kubeadm',
          label: 'AWS EC2 + kubeadm + Cilium',
          body: [
            { type: 'section', title: 'When to use this path', content: 'Use this as the preferred CKAD practice path when you want VM-based Kubernetes practice with kubeadm and direct node access. The lab uses Cilium only as the Kubernetes networking layer.' },
            { type: 'section', title: 'Create an AWS account', content: 'Create or sign in to an AWS account. Click [here](https://signin.aws.amazon.com/signup?request_type=register) to create an account. After the account is ready, open AWS CloudShell or authenticate the AWS CLI locally.' },
            { type: 'checklist', title: 'Account and prerequisites', items: ['AWS account with billing enabled.', 'AWS CloudShell access, or AWS CLI installed locally and authenticated with aws configure.', 'Permission to create CloudFormation, EC2, VPC, subnet, route table, internet gateway, security group, and EBS resources.', 'An existing EC2 key pair in the target AWS region. In this guide, the AWS key pair name is demo-app-2026.', 'The matching private key file on your machine, for example demo-app-2026.pem.', 'Your public IP address in CIDR format, for example 203.0.113.10/32.', 'For this AWS EC2 path, run kubectl/k after SSH into the EC2 instance. kubectl is installed automatically on that instance; local kubectl is only needed if you choose to copy kubeconfig and manage the cluster from your own machine.'] },
            { type: 'callout', tone: 'info', title: 'Estimated monthly cost', content: 'Approximate cost: USD 35-45/month for one t3.medium style single-node lab. Cost can increase with EBS storage, AWS public IPv4 charges, NAT, and data transfer. This lab does not create Elastic IPs. Delete the stack when finished.' },
            ...command('Set AWS region', 'Sets Oregon as the AWS region where CloudFormation and EC2 resources will be created.', 'export AWS_REGION=us-west-2'),
            ...command('Set stack name', 'Gives the CloudFormation stack a predictable name that is reused by later commands.', 'export STACK_NAME=kubetasker-ckad'),
            ...command('Set EC2 key pair name', 'Sets the AWS EC2 key pair name. This is the key pair name in AWS and does not include the .pem extension.', 'export KEY_NAME=demo-app-2026'),
            ...command('Set private key path', 'Points SSH to the local private key file that matches the EC2 key pair. This file path must include the .pem extension.', 'export KEY_PATH=~/Downloads/demo-app-2026.pem'),
            ...command('Restrict private key permissions', 'Makes the private key acceptable to SSH on Linux and macOS. SSH commonly rejects keys that are too open.', 'chmod 400 "$KEY_PATH"'),
            ...command('Set SSH access CIDR', 'Detects your current public IP and restricts SSH, Kubernetes API, and NodePort access to that IP only.', 'export ACCESS_CIDR=$(curl -fsSL https://checkip.amazonaws.com)/32'),
            ...command('Create lab folder', 'Creates a local folder to keep the CloudFormation template for this lab.', 'mkdir -p ~/kubetasker-ckad-lab'),
            ...command('Enter lab folder', 'Moves your shell into the lab folder so the template file is created and used from the same location.', 'cd ~/kubetasker-ckad-lab'),
            ...command('Create CloudFormation template file', 'Writes the AWS infrastructure template into a local YAML file. This is one copy block because the heredoc is one file-creation command.', `cat > kubetasker-ckad-aws-cloudformation.yaml <<'CFN_YAML'\n${awsCloudFormationTemplate}CFN_YAML`),
            ...command('Create CloudFormation stack', 'Starts the AWS EC2 kubeadm + Cilium lab using the template file and the variables you already set. KEY_NAME is the AWS key pair name, not the .pem file path.', `aws cloudformation create-stack \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --template-body file://kubetasker-ckad-aws-cloudformation.yaml \
  --parameters \
    "ParameterKey=KeyName,ParameterValue=$KEY_NAME" \
    "ParameterKey=SSHLocation,ParameterValue=$ACCESS_CIDR" \
    "ParameterKey=InstanceType,ParameterValue=t3.medium" \
    "ParameterKey=LabName,ParameterValue=$STACK_NAME"`),
            ...command('Check stack status', 'Shows the current CloudFormation status. Re-run this command until it returns CREATE_COMPLETE before trying to SSH.', `aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].StackStatus" \
  --output text`),
            ...command('Save public IP variable', 'Reads the EC2 public IP from the CloudFormation outputs and stores it as PUBLIC_IP for the SSH command.', `PUBLIC_IP=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='ControlPlanePublicIp'].OutputValue" \
  --output text)`),
            ...command('Print SSH command', 'Prints the exact SSH command before connecting. KEY_PATH must point to the local .pem file, for example ~/Downloads/demo-app-2026.pem.', 'echo "ssh -i $KEY_PATH ubuntu@$PUBLIC_IP"'),
            ...command('SSH into the lab', 'Connects to the EC2 control-plane instance using the local .pem private key file. Run the Kubernetes commands after you are inside this SSH session.', 'ssh -i "$KEY_PATH" ubuntu@"$PUBLIC_IP"'),
            ...command('Enable kubectl shorthand', 'Defines k as a shortcut for kubectl in the current SSH session. Run this after SSH before using any k commands.', 'alias k=kubectl'),
            ...command('Verify nodes', 'Confirms the Kubernetes node is registered and shows its readiness status.', 'k get nodes -o wide'),
            ...command('Verify all pods', 'Lists pods across all namespaces so you can confirm the system components are coming up.', 'k get pods -A'),
            ...command('Verify Cilium status', 'Confirms Cilium is installed and healthy before continuing with application practice.', 'cilium status --wait'),
            ...command('Verify Cilium pods', 'Shows the Cilium pods running in kube-system.', 'k -n kube-system get pods -l k8s-app=cilium'),
            ...kubeTaskerCommandBlocks(),
            ...command('Clean up application resources', 'Deletes only the KubeTasker namespace and its practice resources, leaving the cluster running.', 'k delete namespace kubetasker --ignore-not-found'),
            ...command('Delete AWS lab', 'Before running this command, exit or log out from the EC2 SSH session and return to the terminal where your AWS CLI variables are set. Then delete the full CloudFormation stack when practice is finished. This is the main cost-control command.', `aws cloudformation delete-stack \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION"`),
            ...command('Check delete status', 'Checks the deletion progress. After deletion finishes, AWS may return a stack-not-found message, which means the stack is gone.', `aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].StackStatus" \
  --output text`)
          ]
        },
        {
          id: 'digitalocean',
          label: 'DigitalOcean',
          body: [
            { type: 'section', title: 'When to use this path', content: 'Use this path when you want a fast managed Kubernetes cluster and want to focus mainly on kubectl practice rather than node bootstrap details.' },
            { type: 'section', title: 'Create a DigitalOcean account', content: 'Create or sign in to a DigitalOcean account. Click [here](https://cloud.digitalocean.com/registrations/new) to create an account. After the account is ready, create a personal access token and authenticate doctl.' },
            { type: 'checklist', title: 'Account and prerequisites', items: ['DigitalOcean account with billing enabled.', 'Personal access token created from the DigitalOcean dashboard.', 'doctl installed and authenticated with the personal access token.', 'kubectl installed locally.', 'bash available in your terminal or cloud shell.'] },
            { type: 'callout', tone: 'info', title: 'Estimated monthly cost', content: 'Approximate cost: USD 24/month for one s-2vcpu-4gb node. Storage and load balancers cost extra. Delete the cluster when finished.' },
            ...command('Set DigitalOcean cluster name', 'Names the DigitalOcean Kubernetes cluster.', 'export DO_CLUSTER_NAME=kubetasker-ckad'),
            ...command('Set DigitalOcean region', 'Chooses the DigitalOcean region where the cluster will be created.', 'export DO_REGION=nyc1'),
            ...command('Set DigitalOcean node size', 'Chooses the node size for the managed Kubernetes worker node.', 'export DO_NODE_SIZE=s-2vcpu-4gb'),
            ...command('Set DigitalOcean node count', 'Creates a single-node practice cluster.', 'export DO_NODE_COUNT=1'),
            ...command('Create DigitalOcean Kubernetes lab', 'Creates the managed Kubernetes cluster using doctl and waits for creation to finish.', `doctl kubernetes cluster create "$DO_CLUSTER_NAME" \
  --region "$DO_REGION" \
  --size "$DO_NODE_SIZE" \
  --count "$DO_NODE_COUNT" \
  --wait`),
            ...command('Enable kubectl shorthand', 'Defines k as a shortcut for kubectl in the current terminal session before using any k commands.', 'alias k=kubectl'),
            ...command('Verify DigitalOcean nodes', 'Confirms kubectl can reach the cluster and shows node readiness.', 'k get nodes -o wide'),
            ...kubeTaskerCommandBlocks(),
            ...command('Clean up application resources', 'Deletes only the KubeTasker namespace and its practice resources.', 'k delete namespace kubetasker --ignore-not-found'),
            ...command('Delete DigitalOcean lab', 'Deletes the managed Kubernetes cluster after practice.', 'doctl kubernetes cluster delete "$DO_CLUSTER_NAME" --force')
          ]
        },
        {
          id: 'civo',
          label: 'Civo',
          body: [
            { type: 'section', title: 'When to use this path', content: 'Use this path when Civo is available in your region and you want a lightweight managed Kubernetes setup for quick practice.' },
            { type: 'section', title: 'Create a Civo account', content: 'Create or sign in to a Civo account. Click [here](https://dashboard.civo.com/signup) to create an account. After the account is ready, create an API key and authenticate the civo CLI.' },
            { type: 'checklist', title: 'Account and prerequisites', items: ['Civo account with billing enabled.', 'Civo API key created from the Civo dashboard.', 'civo CLI installed and authenticated with the API key.', 'A supported Civo region and node size selected.', 'kubectl installed locally.', 'bash available in your terminal or cloud shell.'] },
            { type: 'callout', tone: 'info', title: 'Estimated monthly cost', content: 'Approximate cost: USD 20-30/month for one small or medium node. Exact cost depends on region and node size. Delete the cluster when finished.' },
            ...command('Set Civo cluster name', 'Names the Civo Kubernetes cluster.', 'export CIVO_CLUSTER_NAME=kubetasker-ckad'),
            ...command('Set Civo region', 'Chooses the Civo region where the cluster will be created.', 'export CIVO_REGION=LON1'),
            ...command('Set Civo node size', 'Chooses the Civo worker node size.', 'export CIVO_NODE_SIZE=g4s.kube.medium'),
            ...command('Set Civo node count', 'Creates a single-node practice cluster.', 'export CIVO_NODE_COUNT=1'),
            ...command('Create Civo Kubernetes lab', 'Creates the managed Kubernetes cluster using the Civo CLI.', `civo kubernetes create "$CIVO_CLUSTER_NAME" \
  --region "$CIVO_REGION" \
  --nodes "$CIVO_NODE_COUNT" \
  --size "$CIVO_NODE_SIZE" \
  --wait`),
            ...command('Save Civo kubeconfig', 'Saves the Civo cluster kubeconfig so kubectl can target the new cluster.', 'civo kubernetes config "$CIVO_CLUSTER_NAME" --region "$CIVO_REGION" --save'),
            ...command('Enable kubectl shorthand', 'Defines k as a shortcut for kubectl in the current terminal session before using any k commands.', 'alias k=kubectl'),
            ...command('Verify Civo nodes', 'Confirms kubectl can reach the cluster and shows node readiness.', 'k get nodes -o wide'),
            ...kubeTaskerCommandBlocks(),
            ...command('Clean up application resources', 'Deletes only the KubeTasker namespace and its practice resources.', 'k delete namespace kubetasker --ignore-not-found'),
            ...command('Delete Civo lab', 'Deletes the managed Kubernetes cluster after practice.', 'civo kubernetes remove "$CIVO_CLUSTER_NAME" --region "$CIVO_REGION" --yes')
          ]
        },
        {
          id: 'aws-eks',
          label: 'AWS EKS optional',
          body: [
            { type: 'section', title: 'When to use this path', content: 'Use EKS only when you specifically want AWS-managed Kubernetes experience. It is useful later, but it is not the main CKAD preparation path because it adds more AWS-specific machinery and normally costs more.' },
            { type: 'section', title: 'Create an AWS account', content: 'Create or sign in to an AWS account. Click [here](https://signin.aws.amazon.com/signup?request_type=register) to create an account. After the account is ready, open AWS CloudShell or authenticate the AWS CLI locally.' },
            { type: 'checklist', title: 'Account and prerequisites', items: ['AWS account with billing enabled.', 'AWS CLI installed and authenticated, or AWS CloudShell access.', 'eksctl installed.', 'kubectl installed locally.', 'Permission to create EKS clusters, IAM roles, EC2 nodes, VPC resources, and security groups.'] },
            { type: 'callout', tone: 'warning', title: 'Estimated monthly cost', content: 'Approximate cost: USD 110-160/month or more because EKS includes a managed control plane plus worker nodes, storage, AWS public IPv4 charges, and network charges. Delete the cluster when finished.' },
            ...command('Set EKS cluster name', 'Names the optional EKS cluster.', 'export EKS_CLUSTER_NAME=kubetasker-ckad'),
            ...command('Set AWS region', 'Sets Oregon as the AWS region for the EKS cluster.', 'export AWS_REGION=us-west-2'),
            ...command('Create optional EKS lab', 'Creates an AWS-managed Kubernetes cluster with one managed worker node.', `eksctl create cluster \
  --name "$EKS_CLUSTER_NAME" \
  --region "$AWS_REGION" \
  --nodes 1 \
  --node-type t3.small \
  --managed`),
            ...command('Enable kubectl shorthand', 'Defines k as a shortcut for kubectl in the current terminal session before using any k commands.', 'alias k=kubectl'),
            ...command('Verify EKS nodes', 'Confirms kubectl can reach the EKS cluster and shows node readiness.', 'k get nodes -o wide'),
            ...kubeTaskerCommandBlocks(),
            ...command('Clean up application resources', 'Deletes only the KubeTasker namespace and its practice resources.', 'k delete namespace kubetasker --ignore-not-found'),
            ...command('Delete EKS lab', 'Deletes the EKS cluster after practice.', 'eksctl delete cluster --name "$EKS_CLUSTER_NAME" --region "$AWS_REGION"')
          ]
        }
      ]
    }
  ],
  explanation: 'A good CKAD preparation lab starts with one clear provider choice, a ready cloud account, authenticated CLI, kubectl access, copyable setup content, verification, KubeTasker API practice, and cleanup. AWS EC2 with kubeadm and Cilium is the preferred VM-based path. DigitalOcean and Civo are faster managed alternatives. EKS is optional and can cost more.',
  starterThought: 'First choose one provider tab, prepare that account and CLI, create the lab, verify the cluster, deploy KubeTasker API, then clean up.',
  hints: ['Use k as shorthand for kubectl throughout the lessons.', 'Every provider path must have a cleanup command.', 'For the AWS kubeadm path, verify Cilium with cilium status --wait before continuing.', 'Do not deploy KubeTasker until k get nodes works.'],
  relatedConcepts: ['kubectl', 'kubeadm', 'Cilium', 'CloudFormation', 'managed Kubernetes', 'cleanup', 'KubeTasker'],
  followUpQuestions: ['Which provider path is best for your current practice session?', 'How will you confirm that the cluster is ready before deploying KubeTasker?', 'Which command destroys the full cloud environment when you finish?'],
  finalTakeaway: 'Choose one provider path, read each command explanation, copy one command at a time, run it, then move to the next command. Delete the cloud environment when done.',
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], source: 'original', estimatedTimeSeconds: 420 }
});

export default problem;

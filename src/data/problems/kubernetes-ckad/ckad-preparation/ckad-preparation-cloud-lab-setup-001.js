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
    { type: 'section', title: 'Objective', content: 'I can create a Kubernetes practice environment, connect to it with `kubectl`, verify that the control-plane node is ready, choose the right provider path, and clean up the lab safely when I am done.' },
    { type: 'section', title: 'Why this lab exists', content: 'CKAD practice works best when the learner can repeatedly create Kubernetes objects, inspect them, break them, fix them, and clean up without guessing the infrastructure setup. Pick one provider tab below and follow only that setup path.' },
    { type: 'callout', tone: 'warning', title: 'Cost cleanup warning', content: 'Do not leave cloud Kubernetes labs running after practice. Delete the lab immediately when finished. This AWS EC2 path does not create Elastic IPs; it uses the normal auto-assigned EC2 public IPv4 from the public subnet.' },
    {
      type: 'tabs',
      title: 'Choose your cloud lab path',
      description: 'Use one tab at a time. Every runnable command below is explained first, then shown in its own copyable block.',
      tabs: []
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

import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'Explain how Kubernetes architecture turns a Deployment manifest into a running Pod and a reachable Service.';

const kubeconfigExample = `apiVersion: v1
kind: Config
current-context: kubetasker-lab
clusters:
  - name: kubetasker-lab
    cluster:
      server: https://api.example.k8s.local:6443
users:
  - name: learner
    user: {}
contexts:
  - name: kubetasker-lab
    context:
      cluster: kubetasker-lab
      user: learner
      namespace: kubetasker`;

const problem = defineLearningProblem({
  id: 'kubernetes-architecture-foundation-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'Step 3: Kubernetes Architecture Explained',
  difficulty: 'Easy',
  estimatedTime: '25 min',
  estimatedTimeSeconds: 1500,
  tags: [
    'kubernetes-ckad',
    'architecture',
    'control-plane',
    'worker-node',
    'kubeconfig',
    'kubectl',
    'api-server',
    'etcd',
    'scheduler',
    'controller-manager',
    'watch-loop',
    'kubelet',
    'container-runtime',
    'service',
    'coredns',
    'networking'
  ],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'You have already deployed KubeTasker with direct commands and then managed it with YAML files. Now slow down and understand what Kubernetes did behind the scenes when those actions became running Pods, Services, Endpoints, and DNS names.',
  starterThought: 'Architecture is easier when you follow one request from your terminal to the API server, then through control plane decisions, then down to the worker node that runs the Pod.',
  intuition: 'Kubernetes is a desired-state system. You describe what should exist. The control plane stores and compares that desired state. Worker nodes run the containers that make the state real.',
  mentalPicture: 'Think of Kubernetes as a coordinated operations office. kubectl sends the request, the API server receives it, etcd stores the official state, controllers and the scheduler react, and kubelets on worker nodes make the assigned work happen.',
  patternSignal: 'When a Kubernetes object exists but the app is not working, ask which part of the chain is broken: request, storage, reconciliation, scheduling, node execution, Service selection, DNS, or network path.',
  invariant: 'Every component reads or changes state through the API server. The API server is the coordination point, and etcd is the durable store behind it.',
  finalPattern: 'Step 3: Understand the architecture behind the KubeTasker workload and Service flow.',
  commonMistake: 'Do not memorize components as isolated definitions. Trace how a Deployment becomes ReplicaSet, Pod, node assignment, running container, Service endpoint, DNS name, and reachable application.',
  commonMistakes: [
    'Thinking kubectl talks directly to worker nodes.',
    'Thinking etcd runs application containers.',
    'Thinking the scheduler starts containers.',
    'Thinking a Service automatically works even when its selector does not match Pod labels.',
    'Thinking CoreDNS routes traffic instead of resolving Service names.',
    'Ignoring kubeconfig context and accidentally inspecting the wrong cluster or namespace.'
  ],
  edgeCases: [
    'A Deployment exists but no Pod is scheduled because resources or constraints prevent placement.',
    'A Pod is scheduled but not Running because image pull or container startup fails.',
    'A Service exists but Endpoints are empty because the selector does not match ready Pods.',
    'DNS resolves but the app still fails because the Service, NetworkPolicy, or application port is wrong.'
  ],
  complexityAnalysis: 'This is conceptual architecture complexity. The learner should be able to trace who receives a request, who stores desired state, who watches for changes, who reconciles differences, who schedules Pods, who runs containers, and who makes workloads reachable.',
  explanation: 'This lesson explains the Kubernetes architecture path behind work already practiced in earlier steps. It is not a command drill and does not repeat the YAML manifest practice. The focus is the flow from kubectl and local kubeconfig to the API server, etcd, controllers, scheduler, kubelet, runtime, Pod, Service, Endpoints, and CoreDNS.',
  stepByStepBreakdown: [
    'Start with the learner side: kubectl, local kubeconfig, and current context.',
    'Follow the request to the API server.',
    'Store desired state through etcd.',
    'Let controllers watch and reconcile desired state against actual state.',
    'Let the scheduler choose a node for unscheduled Pods.',
    'Let kubelet and the container runtime start containers on the worker node.',
    'Expose the workload through a Service and Endpoints.',
    'Resolve the Service name through CoreDNS.',
    'Use architecture clues to identify which part of the system is failing.'
  ],
  finalTakeaway: 'Kubernetes is not magic. It is a set of control loops around one source of truth. You submit desired state to the API server, Kubernetes stores it, controllers and nodes act on it, and you reason about failures by following the flow.',
  visualExplanation: 'Use the zoomable architecture image as the main visual. The highlights call out the critical flow to remember.',
  visualWalkthrough: {
    title: 'Critical highlights from the architecture image',
    summary: 'Use these highlights while reading the image.',
    steps: [
      { title: '1. kubectl starts from the learner machine', body: 'kubectl reads the local kubeconfig and sends the request to the API server. It does not talk directly to worker nodes.' },
      { title: '2. The API server is the front door', body: 'Cluster changes go through the API server. etcd stores the cluster state behind it.' },
      { title: '3. Controllers and scheduler react to desired state', body: 'Controllers create or update related objects. The scheduler chooses a worker node for Pods that do not yet have one.' },
      { title: '4. kubelet makes the Pod real on the node', body: 'The kubelet watches assigned Pods and asks the container runtime to pull images and start containers.' },
      { title: '5. Service, Endpoints, and DNS make access stable', body: 'The Service selects ready Pods, Endpoints hold backend addresses, and CoreDNS resolves the Service name.' }
    ]
  },
  body: [
    { type: 'checklist', title: 'Objective', items: ['I can explain how kubectl uses local kubeconfig and context to connect to a cluster.', 'I can explain the role of the API server, etcd, scheduler, controller manager, kubelet, and container runtime.', 'I can explain what watch loops are and how controllers reconcile desired state and actual state.', 'I can trace a Deployment from manifest file to running Pod and reachable Service.'] },
    { type: 'callout', tone: 'info', title: 'Where this fits in the CKAD learning path', content: 'This is Step 3 in the Workloads and Services topic. Step 1 showed direct commands. Step 2 showed YAML manifests. Step 3 explains the architecture behind those actions without repeating the earlier practical steps.' },
    { type: 'section', title: 'How to read the visual walkthrough diagram', content: 'In the visual walkthrough section, read the diagram from left to right: learner terminal and kubectl on the left, control plane components in the middle, worker node execution below, and Service/DNS/networking on the right. The API server is the main coordination point. Worker nodes run the Pods. Kubernetes objects describe what should exist.' },
    { type: 'image', title: 'Kubernetes architecture diagram', src: '/images/problems/kubernetes-ckad/kubernetes-architecture-foundation.png', alt: 'Kubernetes architecture diagram showing kubectl, kubeconfig, API server, etcd, controllers, scheduler, kubelet, runtime, Pods, Service, Endpoints, and CoreDNS', caption: 'Use this as the main visual for the lesson. Zoom in to follow the numbered flow from kubectl to a running workload and stable Service access.', zoomable: true, fullscreen: true },
    { type: 'section', title: 'Simple mental model', content: 'Kubernetes starts with desired state. You submit what you want. The API server receives it. etcd stores it. Controllers and schedulers react to it. Worker nodes run it. Services and DNS make it reachable.' },
    { type: 'section', title: 'Real-world analogy', content: 'Imagine a busy operations office. The front desk receives requests. The records room stores the approved plan. Supervisors notice gaps between the plan and reality. A dispatcher assigns work to a team. Workers complete the job and report back.' },
    { type: 'comparison', title: 'User side: kubectl, kubeconfig, contexts', items: [{ label: 'kubectl', content: 'The command-line client. It runs on your machine, reads your local kubeconfig, and sends requests to the API server. It does not start containers directly and it does not bypass the control plane.' }, { label: 'kubeconfig', content: 'A local configuration file on your machine, usually under your home directory. It stores cluster endpoint, user credentials, and contexts. It is not a Kubernetes object running inside the cluster.' }, { label: 'context', content: 'A named combination of cluster, user, and optional namespace selected from your local kubeconfig. Many mistakes come from using the wrong current context.' }] },
    { type: 'section', title: 'Sample local kubeconfig shape', content: 'This is an example of local client configuration, often stored at ~/.kube/config on the machine where kubectl runs. It is shown to explain the architecture flow only; do not apply this file to the Kubernetes cluster.' },
    { type: 'code', title: 'kubeconfig example', filename: 'kubeconfig-example.yaml', language: 'yaml', code: kubeconfigExample },
    { type: 'comparison', title: 'Control plane components', items: [{ label: 'API server', content: 'The central entry point for cluster state. kubectl and Kubernetes components talk to the API server, and the API server coordinates reads and writes.' }, { label: 'etcd', content: 'The durable store for cluster state. It records desired and observed state behind the API server.' }, { label: 'Scheduler', content: 'The placement decision maker. It watches for Pods without a node and chooses a suitable worker node.' }, { label: 'Controller manager', content: 'The home for many control loops. Controllers watch desired state and create, update, or clean up related objects.' }] },
    { type: 'section', title: 'Watch loops, controllers, and reconciliation', content: 'A watch loop is a long-running observation pattern. A controller watches the API server for changes, compares desired state with actual state, then takes action to reduce the difference. For example, when a Deployment wants two replicas and only one Pod exists, a controller creates or updates related objects until the actual state moves toward the desired state.' },
    { type: 'comparison', title: 'Worker node components', items: [{ label: 'kubelet', content: 'The node agent. It watches the API server for Pods assigned to its node, asks the runtime to run containers, and reports Pod status back.' }, { label: 'Container runtime', content: 'The component that pulls images and starts containers. Examples include containerd in many modern clusters.' }, { label: 'CNI networking', content: 'The plugin layer that gives Pods network connectivity. It makes Pod-to-Pod and Pod-to-Service communication possible according to the cluster network design.' }] },
    { type: 'comparison', title: 'Workload and access objects in this flow', items: [{ label: 'Deployment', content: 'The desired-state object that asks Kubernetes to run app replicas.' }, { label: 'ReplicaSet', content: 'The related object that keeps the requested number of matching Pods present.' }, { label: 'Pod', content: 'The smallest runnable unit. Containers run inside Pods on worker nodes.' }, { label: 'Service', content: 'A stable network access point that selects Pods by label and exposes a consistent name and virtual address.' }, { label: 'Endpoints', content: 'The selected backend addresses behind a Service. Empty Endpoints often point to a selector or readiness problem.' }, { label: 'CoreDNS', content: 'The cluster DNS system that resolves Service names for Pods inside the cluster.' }] },
    { type: 'section', title: 'Request flow from manifest apply to running Pod', content: 'When you apply a Deployment manifest, kubectl reads kubeconfig from your machine and sends the object to the API server. The API server validates and stores desired state through etcd. Controllers notice the Deployment and create related ReplicaSet and Pod state. The scheduler notices a Pod without a node and assigns it. The kubelet on that node starts the container through the runtime. The Pod reports status back through the API server.' },
    { type: 'section', title: 'How the Service becomes reachable', content: 'The Service selects Pods using labels. When the selector matches ready Pods, Kubernetes records backend addresses as Endpoints. CoreDNS resolves the Service name so other Pods can use a stable name instead of changing Pod IPs.' },
    { type: 'comparison', title: 'Failure and debugging interpretation', items: [{ label: 'kubectl cannot connect', content: 'Check current context, kubeconfig, network access, credentials, and API server endpoint on the machine where kubectl is running.' }, { label: 'Deployment exists but Pods are missing', content: 'Check ReplicaSet, events, quotas, selectors, and whether the Deployment controller has created related objects.' }, { label: 'Pod is Pending', content: 'Check scheduling events, node capacity, taints, tolerations, affinity, storage, and resource requests.' }, { label: 'Pod is not Running', content: 'Check image pull errors, container command, environment, Secret or ConfigMap references, and application startup logs.' }, { label: 'Service exists but Endpoints are empty', content: 'Check whether Service selector labels match ready Pod labels.' }, { label: 'DNS name fails', content: 'Check Service existence, namespace, CoreDNS Pods, and whether the client is using the correct Service name.' }] },
    { type: 'checklist', title: 'Summary checklist', items: ['kubectl runs on your machine and sends requests to the API server using kubeconfig and the active context.', 'kubeconfig is local client configuration, not a Kubernetes object applied inside the cluster.', 'The API server is the main coordination point for the cluster.', 'etcd stores cluster state behind the API server.', 'Controllers watch the API server and reconcile desired state with actual state.', 'The scheduler assigns unscheduled Pods to worker nodes.', 'kubelet starts assigned Pods through the container runtime and reports status.', 'Deployments, ReplicaSets, and Pods describe and run workload state.', 'Services, Endpoints, and CoreDNS make Pods easier to reach inside the cluster.'] },
    { type: 'callout', tone: 'success', title: 'Final takeaway', content: 'The safest way to understand Kubernetes is to trace one object through the system. Start with kubectl and local kubeconfig, follow the API server and etcd, watch controllers and the scheduler react, then reason through kubelet, runtime, Pod status, Service endpoints, DNS, and network paths.' }
  ],
  relatedConcepts: ['kubectl', 'kubeconfig', 'context', 'API server', 'etcd', 'scheduler', 'controller manager', 'watch loop', 'reconciliation', 'kubelet', 'container runtime', 'CNI', 'Service', 'CoreDNS', 'Deployment', 'ReplicaSet', 'Pod', 'Endpoints'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

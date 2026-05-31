import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Explain how Kubernetes architecture turns a Deployment manifest into a running Pod and a reachable Service.';

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
  visualExplanation: 'The visual walkthrough diagram below traces the life of one Deployment request from kubectl to the API server, into desired state, through controllers and scheduling, onto a worker node, and finally through Service DNS and networking.',
  visualWalkthrough: {
    title: 'Kubernetes architecture request flow',
    summary: 'Trace how one manifest request becomes a running Pod and a reachable Service.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'From kubectl to reachable workload',
      description: 'A focused architecture flow for KubeTasker.',
      nodes: [
        { id: 'learner', label: 'Learner\nterminal' },
        { id: 'kubectl', label: 'kubectl\nclient' },
        { id: 'kubeconfig', label: 'local kubeconfig\ncontext auth server' },
        { id: 'api-server', label: 'API server\ncoordination point' },
        { id: 'etcd', label: 'etcd\ncluster state store' },
        { id: 'controllers', label: 'Controllers\nwatch and reconcile' },
        { id: 'scheduler', label: 'Scheduler\nchooses node' },
        { id: 'objects', label: 'Objects\nDeployment ReplicaSet Pod' },
        { id: 'kubelet', label: 'kubelet\nnode agent' },
        { id: 'runtime', label: 'Container runtime\npull and start' },
        { id: 'pod', label: 'Pod\nKubeTasker API' },
        { id: 'service', label: 'Service and Endpoints\nstable access' },
        { id: 'dns', label: 'CoreDNS\nService name' }
      ],
      edges: [
        { from: 'learner', to: 'kubectl', label: 'runs command' },
        { from: 'kubectl', to: 'kubeconfig', label: 'reads local context' },
        { from: 'kubectl', to: 'api-server', label: 'sends request' },
        { from: 'api-server', to: 'etcd', label: 'stores state' },
        { from: 'controllers', to: 'api-server', label: 'watch changes' },
        { from: 'controllers', to: 'objects', label: 'create related objects' },
        { from: 'scheduler', to: 'api-server', label: 'watches unscheduled Pods' },
        { from: 'scheduler', to: 'objects', label: 'sets node assignment' },
        { from: 'kubelet', to: 'api-server', label: 'watches assigned Pods' },
        { from: 'kubelet', to: 'runtime', label: 'asks runtime to start' },
        { from: 'runtime', to: 'pod', label: 'runs containers' },
        { from: 'service', to: 'pod', label: 'selects ready Pods' },
        { from: 'dns', to: 'service', label: 'resolves Service name' }
      ],
      frames: [
        {
          title: 'Big picture',
          activeNodes: ['learner', 'kubectl', 'api-server', 'controllers', 'kubelet', 'service', 'dns'],
          visitedNodes: [],
          state: { label: 'Architecture map', values: { client: 'kubectl', controlPlane: 'API server and controllers', worker: 'kubelet and runtime', network: 'Service and DNS' }, helper: 'Read from the learner request toward the running workload and network access.' },
          description: 'The learner side sends desired state. The control plane coordinates it. Worker nodes run Pods. Services and DNS make Pods reachable.'
        },
        {
          title: 'User request',
          activeNodes: ['learner', 'kubectl', 'kubeconfig', 'api-server'],
          visitedNodes: [],
          state: { label: 'Request', values: { source: 'your machine', context: 'local kubeconfig', receiver: 'API server' }, helper: 'kubectl does not guess the cluster. It reads local kubeconfig to know where to send the request.' },
          description: 'The request starts in the terminal on the learner machine, kubectl reads kubeconfig, then sends an authenticated request to the API server.'
        },
        {
          title: 'API server and etcd',
          activeNodes: ['api-server', 'etcd', 'objects'],
          visitedNodes: ['learner', 'kubectl', 'kubeconfig'],
          state: { label: 'Storage', values: { validation: 'API server accepts valid object', storage: 'etcd records cluster state' }, helper: 'etcd stores cluster state. Normal clients and components talk through the API server.' },
          description: 'The API server validates the object and persists state through etcd.'
        },
        {
          title: 'Watch loops and controllers',
          activeNodes: ['controllers', 'api-server', 'objects'],
          visitedNodes: ['etcd'],
          state: { label: 'Reconciliation', values: { desired: 'Deployment wants replicas', actual: 'Pods currently running', action: 'create or update related objects' }, helper: 'Controllers repeatedly compare what should exist with what does exist.' },
          description: 'Controllers watch the API server, notice missing actual state, and reconcile the cluster toward desired state.'
        },
        {
          title: 'Scheduling',
          activeNodes: ['scheduler', 'api-server', 'objects'],
          visitedNodes: ['controllers'],
          state: { label: 'Placement', values: { input: 'Pod without node', decision: 'choose worker node', output: 'node assignment' }, helper: 'The scheduler chooses placement. It does not start containers itself.' },
          description: 'The scheduler watches for Pods that need a node, chooses a suitable worker node, and records the assignment.'
        },
        {
          title: 'Worker node execution',
          activeNodes: ['kubelet', 'runtime', 'pod'],
          visitedNodes: ['scheduler', 'api-server'],
          state: { label: 'Execution', values: { kubelet: 'watches assigned Pods', runtime: 'pulls and starts containers', pod: 'becomes Running' }, helper: 'kubelet is the node agent that makes the assigned Pod real on that node.' },
          description: 'The kubelet sees the assigned Pod, asks the container runtime to pull and start the image, and reports status back.'
        },
        {
          title: 'Service and DNS',
          activeNodes: ['service', 'dns', 'pod'],
          visitedNodes: ['api-server', 'kubelet', 'runtime'],
          state: { label: 'Reachability', values: { service: 'selects ready Pod labels', endpoints: 'backend Pod addresses', dns: 'resolves Service name' }, helper: 'A running Pod is useful only when the right Service and DNS path can reach it.' },
          description: 'Services select ready Pods, Endpoints point to backend Pod addresses, and CoreDNS resolves the Service name.'
        }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can explain how kubectl uses local kubeconfig and context to connect to a cluster.',
        'I can explain the role of the API server, etcd, scheduler, controller manager, kubelet, and container runtime.',
        'I can explain what watch loops are and how controllers reconcile desired state and actual state.',
        'I can trace a Deployment from manifest file to running Pod and reachable Service.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Where this fits in the CKAD learning path',
      content: 'This is Step 3 in the Workloads and Services topic. Step 1 showed direct commands. Step 2 showed YAML manifests. Step 3 explains the architecture behind those actions without repeating the earlier practical steps.'
    },
    {
      type: 'section',
      title: 'How to read the visual walkthrough diagram',
      content: 'In the visual walkthrough section, read the diagram from left to right: learner terminal and kubectl on the left, control plane components in the middle, worker node execution below, and Service/DNS/networking on the right. The API server is the main coordination point. Worker nodes run the Pods. Kubernetes objects describe what should exist.'
    },
    {
      type: 'section',
      title: 'Simple mental model',
      content: 'Kubernetes starts with desired state. You submit what you want. The API server receives it. etcd stores it. Controllers and schedulers react to it. Worker nodes run it. Services and DNS make it reachable.'
    },
    {
      type: 'section',
      title: 'Real-world analogy',
      content: 'Imagine a busy operations office. The front desk receives requests. The records room stores the approved plan. Supervisors notice gaps between the plan and reality. A dispatcher assigns work to a team. Workers complete the job and report back.'
    },
    {
      type: 'comparison',
      title: 'User side: kubectl, kubeconfig, contexts',
      items: [
        { label: 'kubectl', content: 'The command-line client. It runs on your machine, reads your local kubeconfig, and sends requests to the API server. It does not start containers directly and it does not bypass the control plane.' },
        { label: 'kubeconfig', content: 'A local configuration file on your machine, usually under your home directory. It stores cluster endpoint, user credentials, and contexts. It is not a Kubernetes object running inside the cluster.' },
        { label: 'context', content: 'A named combination of cluster, user, and optional namespace selected from your local kubeconfig. Many mistakes come from using the wrong current context.' }
      ]
    },
    {
      type: 'comparison',
      title: 'Control plane components',
      items: [
        { label: 'API server', content: 'The central entry point for cluster state. kubectl and Kubernetes components talk to the API server, and the API server coordinates reads and writes.' },
        { label: 'etcd', content: 'The durable store for cluster state. It records desired and observed state behind the API server.' },
        { label: 'Scheduler', content: 'The placement decision maker. It watches for Pods without a node and chooses a suitable worker node.' },
        { label: 'Controller manager', content: 'The home for many control loops. Controllers watch desired state and create, update, or clean up related objects.' }
      ]
    },
    {
      type: 'section',
      title: 'Watch loops, controllers, and reconciliation',
      content: 'A watch loop is a long-running observation pattern. A controller watches the API server for changes, compares desired state with actual state, then takes action to reduce the difference. For example, when a Deployment wants two replicas and only one Pod exists, a controller creates or updates related objects until the actual state moves toward the desired state.'
    },
    {
      type: 'comparison',
      title: 'Worker node components',
      items: [
        { label: 'kubelet', content: 'The node agent. It watches the API server for Pods assigned to its node, asks the runtime to run containers, and reports Pod status back.' },
        { label: 'Container runtime', content: 'The component that pulls images and starts containers. Examples include containerd in many modern clusters.' },
        { label: 'CNI networking', content: 'The plugin layer that gives Pods network connectivity. It makes Pod-to-Pod and Pod-to-Service communication possible according to the cluster network design.' }
      ]
    },
    {
      type: 'comparison',
      title: 'Workload and access objects in this flow',
      items: [
        { label: 'Deployment', content: 'The desired-state object that asks Kubernetes to run app replicas.' },
        { label: 'ReplicaSet', content: 'The related object that keeps the requested number of matching Pods present.' },
        { label: 'Pod', content: 'The smallest runnable unit. Containers run inside Pods on worker nodes.' },
        { label: 'Service', content: 'A stable network access point that selects Pods by label and exposes a consistent name and virtual address.' },
        { label: 'Endpoints', content: 'The selected backend addresses behind a Service. Empty Endpoints often point to a selector or readiness problem.' },
        { label: 'CoreDNS', content: 'The cluster DNS system that resolves Service names for Pods inside the cluster.' }
      ]
    },
    {
      type: 'section',
      title: 'Request flow from manifest apply to running Pod',
      content: 'When you apply a Deployment manifest, kubectl reads kubeconfig from your machine and sends the object to the API server. The API server validates and stores desired state through etcd. Controllers notice the Deployment and create related ReplicaSet and Pod state. The scheduler notices a Pod without a node and assigns it. The kubelet on that node starts the container through the runtime. The Pod reports status back through the API server.'
    },
    {
      type: 'section',
      title: 'How the Service becomes reachable',
      content: 'The Service selects Pods using labels. When the selector matches ready Pods, Kubernetes records backend addresses as Endpoints. CoreDNS resolves the Service name so other Pods can use a stable name instead of changing Pod IPs.'
    },
    {
      type: 'comparison',
      title: 'Failure and debugging interpretation',
      items: [
        { label: 'kubectl cannot connect', content: 'Check current context, kubeconfig, network access, credentials, and API server endpoint on the machine where kubectl is running.' },
        { label: 'Deployment exists but Pods are missing', content: 'Check ReplicaSet, events, quotas, selectors, and whether the Deployment controller has created related objects.' },
        { label: 'Pod is Pending', content: 'Check scheduling events, node capacity, taints, tolerations, affinity, storage, and resource requests.' },
        { label: 'Pod is not Running', content: 'Check image pull errors, container command, environment, Secret or ConfigMap references, and application startup logs.' },
        { label: 'Service exists but Endpoints are empty', content: 'Check whether Service selector labels match ready Pod labels.' },
        { label: 'DNS name fails', content: 'Check Service existence, namespace, CoreDNS Pods, and whether the client is using the correct Service name.' }
      ]
    },
    {
      type: 'checklist',
      title: 'Summary checklist',
      items: [
        'kubectl runs on your machine and sends requests to the API server using kubeconfig and the active context.',
        'kubeconfig is local client configuration, not a Kubernetes object applied inside the cluster.',
        'The API server is the main coordination point for the cluster.',
        'etcd stores cluster state behind the API server.',
        'Controllers watch the API server and reconcile desired state with actual state.',
        'The scheduler assigns unscheduled Pods to worker nodes.',
        'kubelet starts assigned Pods through the container runtime and reports status.',
        'Deployments, ReplicaSets, and Pods describe and run workload state.',
        'Services, Endpoints, and CoreDNS make Pods easier to reach inside the cluster.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Final takeaway',
      content: 'The safest way to understand Kubernetes is to trace one object through the system. Start with kubectl and local kubeconfig, follow the API server and etcd, watch controllers and the scheduler react, then reason through kubelet, runtime, Pod status, Service endpoints, DNS, and network paths.'
    }
  ],
  relatedConcepts: [
    'kubectl',
    'kubeconfig',
    'context',
    'API server',
    'etcd',
    'scheduler',
    'controller manager',
    'watch loop',
    'reconciliation',
    'kubelet',
    'container runtime',
    'CNI',
    'Service',
    'CoreDNS',
    'Deployment',
    'ReplicaSet',
    'Pod',
    'Endpoints'
  ],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

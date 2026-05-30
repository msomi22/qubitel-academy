import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Explain how Kubernetes architecture turns a Deployment manifest into a running Pod and a reachable Service.';

function command(title, explanation, code, language = 'bash') {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title, language, code }
  ];
}

function yamlExample(title, explanation, filename, code) {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title: filename, filename, language: 'yaml', code }
  ];
}

const kubeconfigExample = `apiVersion: v1
kind: Config
current-context: kubetasker-lab
clusters:
  - name: kubetasker-lab
    cluster:
      server: https://api.example.k8s.local:6443
users:
  - name: learner
    user:
      client-certificate-data: REDACTED
      client-key-data: REDACTED
contexts:
  - name: kubetasker-lab
    context:
      cluster: kubetasker-lab
      user: learner
      namespace: kubetasker`;

const deploymentExample = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  replicas: 2
  selector:
    matchLabels:
      app: kube-tasker-api
  template:
    metadata:
      labels:
        app: kube-tasker-api
    spec:
      containers:
        - name: api
          image: msomi22/kubetasker-api:0.1.1
          ports:
            - containerPort: 8080`;

const serviceExample = `apiVersion: v1
kind: Service
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  type: ClusterIP
  selector:
    app: kube-tasker-api
  ports:
    - name: http
      port: 80
      targetPort: 8080`;

const networkPolicyExample = `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-client-to-api
  namespace: kubetasker
spec:
  podSelector:
    matchLabels:
      app: kube-tasker-api
  ingress:
    - from:
        - podSelector:
            matchLabels:
              role: client
      ports:
        - protocol: TCP
          port: 8080`;

const configMapExample = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-api-config
  namespace: kubetasker
data:
  LOG_LEVEL: info
  FEATURE_FLAGS: basic-tasks`;

const secretExample = `apiVersion: v1
kind: Secret
metadata:
  name: kube-tasker-api-secret
  namespace: kubetasker
type: Opaque
stringData:
  API_TOKEN: replace-me-in-real-labs`;

const jobExample = `apiVersion: batch/v1
kind: Job
metadata:
  name: kube-tasker-backfill
  namespace: kubetasker
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: backfill
          image: busybox:1.36
          command: ['sh', '-c', 'echo backfill complete']`;

const cronJobExample = `apiVersion: batch/v1
kind: CronJob
metadata:
  name: kube-tasker-daily-summary
  namespace: kubetasker
spec:
  schedule: '0 6 * * *'
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: summary
              image: busybox:1.36
              command: ['sh', '-c', 'echo daily summary complete']`;

const problem = defineLearningProblem({
  id: 'kubernetes-architecture-foundation-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'Step 3: Kubernetes Architecture Explained',
  difficulty: 'Easy',
  estimatedTime: '35 min',
  estimatedTimeSeconds: 2100,
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
    'ingress',
    'egress',
    'networking',
    'kubernetes-objects'
  ],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'You have already deployed KubeTasker with direct commands and then managed it with YAML files. Now slow down and understand what Kubernetes did behind the scenes when those commands and files became running Pods, Services, Endpoints, and DNS names.',
  starterThought: 'Architecture is easier when you follow one request from your terminal to the API server, then through control plane decisions, then down to the worker node that runs the Pod.',
  intuition: 'Kubernetes is a desired-state system. You describe what should exist. The control plane stores and compares that desired state. Worker nodes run the containers that make the state real.',
  mentalPicture: 'Think of Kubernetes as a coordinated operations center. kubectl is your radio, the API server is the front desk, etcd is the official notebook, controllers are supervisors, the scheduler assigns work, and kubelets on worker nodes make the assigned work happen.',
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
    'Thinking Ingress is the same thing as a Service.',
    'Ignoring kubeconfig context and accidentally inspecting the wrong cluster or namespace.'
  ],
  edgeCases: [
    'A Deployment exists but no Pod is scheduled because resources or constraints prevent placement.',
    'A Pod is scheduled but not Running because image pull or container startup fails.',
    'A Service exists but Endpoints are empty because the selector does not match ready Pods.',
    'DNS resolves but the app still fails because the Service, NetworkPolicy, or application port is wrong.'
  ],
  complexityAnalysis: 'This is conceptual architecture complexity. The learner should be able to trace who receives a request, who stores desired state, who watches for changes, who reconciles differences, who schedules Pods, who runs containers, and who makes workloads reachable.',
  explanation: 'This lesson explains Kubernetes as one connected system. It covers kubectl, kubeconfig, the API server, etcd, scheduler, controller managers, cloud controller manager, watch loops, kubelet, container runtime, CNI, Services, CoreDNS, Ingress, egress, NetworkPolicy, and common workload objects.',
  stepByStepBreakdown: [
    'Start with the learner side: kubectl, kubeconfig, and current context.',
    'Follow the request to the API server.',
    'Store desired state through etcd.',
    'Let controllers watch and reconcile desired state against actual state.',
    'Let the scheduler choose a node for unscheduled Pods.',
    'Let kubelet and the container runtime start containers on the worker node.',
    'Connect the Pod to the network through CNI.',
    'Expose the workload through a Service and Endpoints.',
    'Resolve the Service name through CoreDNS.',
    'Understand Ingress for inbound HTTP and egress for outbound traffic.',
    'Use read-only commands to inspect each part of the system safely.'
  ],
  finalTakeaway: 'Kubernetes is not magic. It is a set of control loops around one source of truth. You submit desired state to the API server, Kubernetes stores it, controllers and nodes act on it, and you verify the actual state with read-only commands.',
  visualExplanation: 'The static diagram gives the big picture. The walkthrough traces the life of one Deployment request from kubectl to the API server, into desired state, through controllers and scheduling, onto a worker node, and finally through Service DNS and networking.',
  visualWalkthrough: {
    title: 'Kubernetes architecture request flow',
    summary: 'Trace how one manifest request becomes a running Pod and a reachable Service.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'From kubectl to reachable workload',
      description: 'A beginner-friendly architecture flow for KubeTasker.',
      nodes: [
        { id: 'learner', label: 'Learner\nterminal' },
        { id: 'kubectl', label: 'kubectl\nclient' },
        { id: 'kubeconfig', label: 'kubeconfig\ncontext auth server' },
        { id: 'api-server', label: 'API server\ncoordination point' },
        { id: 'etcd', label: 'etcd\ndesired state store' },
        { id: 'controllers', label: 'Controllers\nwatch and reconcile' },
        { id: 'scheduler', label: 'Scheduler\nchooses node' },
        { id: 'objects', label: 'Objects\nDeployment Service Pod' },
        { id: 'kubelet', label: 'kubelet\nnode agent' },
        { id: 'runtime', label: 'Container runtime\npull and start' },
        { id: 'pod', label: 'Pod\nKubeTasker API' },
        { id: 'service', label: 'Service and Endpoints\nstable access' },
        { id: 'dns', label: 'CoreDNS\nService name' },
        { id: 'ingress', label: 'Ingress\nexternal HTTP' },
        { id: 'egress', label: 'Egress\noutbound calls' }
      ],
      edges: [
        { from: 'learner', to: 'kubectl', label: 'runs command' },
        { from: 'kubectl', to: 'kubeconfig', label: 'reads active context' },
        { from: 'kubectl', to: 'api-server', label: 'sends request' },
        { from: 'api-server', to: 'etcd', label: 'stores desired state' },
        { from: 'controllers', to: 'api-server', label: 'watch changes' },
        { from: 'controllers', to: 'objects', label: 'create related objects' },
        { from: 'scheduler', to: 'api-server', label: 'watches unscheduled Pods' },
        { from: 'scheduler', to: 'objects', label: 'sets node assignment' },
        { from: 'kubelet', to: 'api-server', label: 'watches assigned Pods' },
        { from: 'kubelet', to: 'runtime', label: 'asks runtime to start' },
        { from: 'runtime', to: 'pod', label: 'runs containers' },
        { from: 'service', to: 'pod', label: 'selects ready Pod' },
        { from: 'dns', to: 'service', label: 'resolves Service name' },
        { from: 'ingress', to: 'service', label: 'routes inbound HTTP' },
        { from: 'pod', to: 'egress', label: 'outbound traffic' }
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
          state: { label: 'Request', values: { command: 'k apply -f deployment.yaml', context: 'active kubeconfig context', receiver: 'API server' }, helper: 'kubectl does not guess the cluster. It reads kubeconfig to know where to send the request.' },
          description: 'The request starts in the terminal, kubectl reads kubeconfig, then sends an authenticated request to the API server.'
        },
        {
          title: 'API server and etcd',
          activeNodes: ['api-server', 'etcd', 'objects'],
          visitedNodes: ['learner', 'kubectl', 'kubeconfig'],
          state: { label: 'Storage', values: { validation: 'API server accepts valid object', storage: 'etcd records desired state' }, helper: 'etcd stores cluster state. Normal clients and components talk through the API server.' },
          description: 'The API server validates the object and persists desired state through etcd.'
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
          title: 'Service, DNS, and traffic',
          activeNodes: ['service', 'dns', 'pod', 'ingress', 'egress'],
          visitedNodes: ['api-server', 'kubelet', 'runtime'],
          state: { label: 'Reachability', values: { service: 'selects Pod labels', dns: 'resolves Service name', ingress: 'optional external HTTP', egress: 'outbound path from Pod' }, helper: 'A running Pod is useful only when the right network path can reach it.' },
          description: 'Services select ready Pods, CoreDNS resolves Service names, Ingress can route inbound HTTP, and egress covers outbound calls.'
        }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can explain how kubectl uses kubeconfig and context to connect to a cluster.',
        'I can explain the role of the API server, etcd, scheduler, controller manager, and cloud controller manager.',
        'I can explain what watch loops are and how controllers reconcile desired state and actual state.',
        'I can explain how kubelet and the container runtime start Pods on worker nodes.',
        'I can explain how Deployments, ReplicaSets, Pods, Services, Endpoints, ConfigMaps, Secrets, Jobs, CronJobs, Ingress, and NetworkPolicies fit into the architecture.',
        'I can trace a Deployment from manifest file to running Pod and reachable Service.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Where this fits in the CKAD learning path',
      content: 'This is Step 3 in the Workloads and Services topic. Step 1 showed direct commands. Step 2 showed YAML manifests. Step 3 explains the architecture behind those actions so future CKAD tasks feel connected instead of random.'
    },
    {
      type: 'section',
      title: 'How to read the diagram',
      content: 'Read the diagram from left to right: user and kubectl on the left, control plane in the middle, worker nodes at the bottom, and networking paths on the right. The API server is the main coordination point. Worker nodes run the Pods. Kubernetes objects describe what should exist.'
    },
    {
      type: 'section',
      title: 'Simple mental model',
      content: 'Kubernetes starts with desired state. You submit what you want. The API server receives it. etcd stores it. Controllers and schedulers react to it. Worker nodes run it. Services, DNS, and networking make it reachable.'
    },
    {
      type: 'section',
      title: 'Real-world analogy',
      content: 'Imagine a busy operations office. The front desk receives all requests. The records room stores the approved plan. Supervisors notice gaps between the plan and reality. A dispatcher assigns work to a team. Workers complete the job and report back. Kubernetes follows the same pattern with API server, etcd, controllers, scheduler, kubelet, and worker nodes.'
    },
    {
      type: 'image',
      title: 'Big architecture diagram',
      src: '/images/problems/kubernetes-ckad/kubernetes-architecture-foundation.png',
      alt: 'Kubernetes architecture showing kubectl, control plane, worker nodes, Services, DNS, Ingress, egress, and workload objects',
      caption: 'Use this as the big-picture map for the lesson. The static image is the main architecture diagram; the interactive walkthrough below traces one request through it.'
    },
    {
      type: 'comparison',
      title: 'User side: kubectl, kubeconfig, contexts',
      items: [
        { label: 'kubectl', content: 'The command-line client. It sends requests to the API server. It does not start containers directly and it does not bypass the control plane.' },
        { label: 'kubeconfig', content: 'The local configuration file that stores cluster endpoint, user credentials, and contexts. It tells kubectl which API server and identity to use.' },
        { label: 'context', content: 'A named combination of cluster, user, and optional namespace. Many mistakes come from using the wrong current context.' }
      ]
    },
    ...yamlExample('Example kubeconfig shape', 'This example shows why context matters. The current context points kubectl to a cluster, user identity, and default namespace. In real clusters, credentials are sensitive and should not be shared.', 'kubeconfig-example.yaml', kubeconfigExample),
    {
      type: 'comparison',
      title: 'Control plane components',
      items: [
        { label: 'API server', content: 'The central entry point for cluster state. kubectl and Kubernetes components talk to the API server, and the API server coordinates reads and writes.' },
        { label: 'etcd', content: 'The durable store for cluster state. It records desired and observed state behind the API server.' },
        { label: 'Scheduler', content: 'The placement decision maker. It watches for Pods without a node and chooses a suitable worker node.' },
        { label: 'Controller manager', content: 'The home for many control loops. Controllers watch desired state and create, update, or clean up related objects.' },
        { label: 'Cloud controller manager', content: 'The cloud integration layer. In supported cloud environments it connects Kubernetes intent to provider resources such as load balancers or node information.' }
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
        { label: 'CNI networking', content: 'The plugin layer that gives Pods network connectivity. It makes Pod-to-Pod communication possible according to the cluster network design.' },
        { label: 'kube-proxy or service dataplane', content: 'The node-level service routing layer in many clusters. Some clusters use different implementations, but the learner-facing idea is that Service traffic reaches selected Pods.' }
      ]
    },
    {
      type: 'comparison',
      title: 'Kubernetes objects and how they fit',
      items: [
        { label: 'Deployment', content: 'A desired-state object for running stateless app replicas. It creates and manages ReplicaSets.' },
        { label: 'ReplicaSet', content: 'The object that keeps the requested number of matching Pods present.' },
        { label: 'Pod', content: 'The smallest runnable unit. Containers run inside Pods on worker nodes.' },
        { label: 'Service', content: 'A stable network access point that selects Pods by label and exposes a consistent name and virtual address.' },
        { label: 'Endpoints', content: 'The selected backend addresses behind a Service. Empty Endpoints often point to a selector or readiness problem.' },
        { label: 'ConfigMap', content: 'Non-sensitive configuration for Pods, such as feature flags or environment settings.' },
        { label: 'Secret', content: 'Sensitive configuration for Pods, such as tokens or credentials. Treat these carefully even in practice labs.' },
        { label: 'Job and CronJob', content: 'Objects for finite work. A Job runs to completion. A CronJob creates Jobs on a schedule.' },
        { label: 'Ingress', content: 'A rule object for inbound HTTP or HTTPS routing into Services when an Ingress controller exists.' },
        { label: 'NetworkPolicy', content: 'A policy object that can restrict Pod ingress or egress traffic when supported by the cluster network plugin.' }
      ]
    },
    ...yamlExample('Deployment manifest example', 'This manifest describes the KubeTasker API desired state. The Deployment asks for two replicas, creates Pod labels, and defines the container image and port.', 'deployment.yaml', deploymentExample),
    ...yamlExample('Service manifest example', 'This Service manifest gives the API a stable internal name. The selector must match the Pod label from the Deployment template.', 'service.yaml', serviceExample),
    {
      type: 'section',
      title: 'Request flow from manifest apply to running Pod',
      content: 'When you apply a Deployment manifest, kubectl reads kubeconfig and sends the object to the API server. The API server validates and stores desired state through etcd. Controllers notice the Deployment and create related ReplicaSet and Pod state. The scheduler notices a Pod without a node and assigns it. The kubelet on that node starts the container through the runtime. The Pod reports status back through the API server.'
    },
    {
      type: 'comparison',
      title: 'Networking: Service, CoreDNS, CNI, Ingress, egress',
      items: [
        { label: 'Service', content: 'A stable internal access point. It selects ready Pods and lets clients avoid changing Pod IPs.' },
        { label: 'CoreDNS', content: 'The cluster DNS system. It resolves names such as kube-tasker-api to the Service address.' },
        { label: 'CNI', content: 'The networking plugin layer. It gives Pods network connectivity and may enforce NetworkPolicy.' },
        { label: 'Ingress', content: 'An HTTP routing object for traffic entering the cluster through an Ingress controller.' },
        { label: 'Egress', content: 'Outbound traffic from Pods to other services, the internet, databases, or provider APIs. Policies and infrastructure can allow or restrict it.' }
      ]
    },
    ...yamlExample('NetworkPolicy example', 'This example shows the idea of controlling ingress to the API Pods. Whether it is enforced depends on the network plugin used by the cluster.', 'network-policy.yaml', networkPolicyExample),
    ...yamlExample('ConfigMap example', 'This object carries non-sensitive app configuration that a Pod can consume as environment variables or files.', 'configmap.yaml', configMapExample),
    ...yamlExample('Secret example', 'This object carries sensitive values. In real work, avoid committing real credentials to Git and avoid exposing Secret contents in logs.', 'secret.yaml', secretExample),
    ...yamlExample('Job example', 'This object runs finite work until completion. It is useful for tasks such as one-time backfills or migrations in a lab.', 'job.yaml', jobExample),
    ...yamlExample('CronJob example', 'This object creates Jobs on a schedule. It is useful for recurring work such as periodic summaries or cleanup tasks.', 'cronjob.yaml', cronJobExample),
    ...command('Beginner-safe command: show current context', 'This command checks which context kubectl is using. Run it before changing resources so you know which cluster your terminal is targeting.', 'k config current-context'),
    ...command('Beginner-safe command: show the selected kubeconfig view', 'This command prints the active kubeconfig view without modifying the cluster. It helps you confirm the cluster, user, and namespace selected by the current context.', 'k config view --minify'),
    ...command('Beginner-safe command: list nodes', 'This command asks the API server for node information. It proves your client can reach the cluster and shows the worker nodes available for scheduling.', 'k get nodes -o wide'),
    ...command('Beginner-safe command: list system Pods', 'This command shows control-plane and system workloads in the kube-system namespace. It helps you notice components such as CoreDNS and networking Pods in many clusters.', 'k -n kube-system get pods -o wide'),
    ...command('Beginner-safe command: list Deployments', 'This command reads Deployment objects in the KubeTasker namespace. It is safe because it only inspects state.', 'k -n kubetasker get deploy'),
    ...command('Beginner-safe command: describe the API Deployment', 'This command gives detailed Deployment events, selectors, rollout status, and related state. Use it when the workload does not look available.', 'k -n kubetasker describe deploy kube-tasker-api'),
    ...command('Beginner-safe command: list Pods with labels', 'This command shows Pod names, node placement, IPs, and labels. It helps connect Deployment labels to Service selectors.', 'k -n kubetasker get pods -o wide --show-labels'),
    ...command('Beginner-safe command: list Services', 'This command shows Service names, types, cluster IPs, and ports. It helps you confirm the stable internal access point exists.', 'k -n kubetasker get svc -o wide'),
    ...command('Beginner-safe command: inspect Endpoints', 'This command checks which backend Pod IPs are currently behind the Service. Empty output is a strong signal that selector matching or readiness is wrong.', 'k -n kubetasker get endpoints kube-tasker-api -o wide'),
    ...command('Beginner-safe command: inspect CoreDNS', 'This command checks whether CoreDNS Pods are present. If Service names do not resolve, CoreDNS health is one useful clue.', 'k -n kube-system get pods -l k8s-app=kube-dns -o wide'),
    {
      type: 'comparison',
      title: 'Failure and debugging interpretation',
      items: [
        { label: 'kubectl cannot connect', content: 'Check current context, kubeconfig, network access, credentials, and API server endpoint.' },
        { label: 'Deployment exists but Pods are missing', content: 'Check ReplicaSet, events, quotas, selectors, and whether the Deployment controller has created related objects.' },
        { label: 'Pod is Pending', content: 'Check scheduling events, node capacity, taints, tolerations, affinity, storage, and resource requests.' },
        { label: 'Pod is not Running', content: 'Check image pull errors, container command, environment, Secret or ConfigMap references, and application startup logs.' },
        { label: 'Service exists but Endpoints are empty', content: 'Check whether Service selector labels match ready Pod labels.' },
        { label: 'DNS name fails', content: 'Check Service existence, namespace, CoreDNS Pods, and whether the client is using the correct Service name.' },
        { label: 'Ingress fails', content: 'Check whether an Ingress controller exists, whether rules point to the right Service, and whether external routing reaches the controller.' },
        { label: 'Egress fails', content: 'Check NetworkPolicy, cloud firewall or route settings, DNS, proxy settings, and the remote dependency.' }
      ]
    },
    {
      type: 'checklist',
      title: 'Summary checklist',
      items: [
        'kubectl sends requests to the API server using kubeconfig and the active context.',
        'The API server is the main coordination point for the cluster.',
        'etcd stores cluster state behind the API server.',
        'Controllers watch the API server and reconcile desired state with actual state.',
        'The scheduler assigns unscheduled Pods to worker nodes.',
        'kubelet starts assigned Pods through the container runtime and reports status.',
        'Deployments, ReplicaSets, and Pods describe and run workload state.',
        'Services, Endpoints, and CoreDNS make Pods easier to reach inside the cluster.',
        'Ingress handles inbound HTTP routing when a controller is installed.',
        'Egress is outbound Pod traffic and may be controlled by policy or infrastructure.',
        'Read-only commands help locate which part of the architecture is failing.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Final takeaway',
      content: 'The safest way to understand Kubernetes is to trace one object through the system. Start with kubectl and kubeconfig, follow the API server and etcd, watch controllers and the scheduler react, then verify kubelet, runtime, Pod status, Service endpoints, DNS, and network paths.'
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
    'cloud controller manager',
    'watch loop',
    'reconciliation',
    'kubelet',
    'container runtime',
    'CNI',
    'Service',
    'CoreDNS',
    'Ingress',
    'egress',
    'NetworkPolicy',
    'Deployment',
    'ReplicaSet',
    'Pod',
    'ConfigMap',
    'Secret',
    'Job',
    'CronJob'
  ],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

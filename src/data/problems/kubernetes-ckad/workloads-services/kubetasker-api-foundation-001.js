import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Deploy the KubeTasker API, expose it with an internal Service, and verify it from a temporary client pod using Kubernetes DNS.';

function command(title, explanation, code, language = 'bash') {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title, language, code }
  ];
}

const problem = defineLearningProblem({
  id: 'kubetasker-api-foundation-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'KubeTasker API Foundation: Workloads and Services',
  difficulty: 'Easy',
  estimatedTimeSeconds: 1200,
  estimatedTime: '20 min',
  tags: ['kubernetes-ckad', 'workloads-services', 'kubetasker', 'deployment', 'replicaset', 'pod', 'service', 'dns', 'endpoints'],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'You are onboarding KubeTasker, a lightweight task-management API used for CKAD practice. Deploy the API into Kubernetes and prove that another pod inside the cluster can reach it through a Service.',
  starterThought: 'Start small: one namespace, one Deployment, one ClusterIP Service, and one temporary client pod.',
  intuition: 'The Deployment keeps the API Pod running. The Service gives that Pod a stable in-cluster name. The client pod proves the same access path another workload would use.',
  mentalPicture: 'Namespace is the practice room. Deployment is the manager. ReplicaSet is the assistant that keeps one Pod alive. Pod is the running API. Service is the stable front desk name. Endpoints show which Pod IPs the Service currently sends traffic to.',
  patternSignal: 'Use Deployment plus ClusterIP Service when a workload should be reachable by other pods inside the cluster.',
  invariant: 'The Service selector must match the Pod label app=kube-tasker-api, otherwise the Service will have no endpoints.',
  finalPattern: 'Deploy an internal Kubernetes workload and verify it through Service DNS from another Pod.',
  commonMistake: 'Using localhost from the client pod. localhost means the client pod itself, not the KubeTasker API Pod.',
  commonMistakes: [
    'Forgetting -n kubetasker.',
    'Creating the Service with a selector that does not match the Pod labels.',
    'Using the wrong Service targetPort. The API container listens on 8080.',
    'Creating the client pod in another namespace.',
    'Thinking KubeTasker is a Kubernetes system component. It is only the course demo app.',
    'Repeating the cloud lab setup instead of using the existing prepared cluster.'
  ],
  edgeCases: ['Image pull takes a moment on a fresh node', 'Service exists but endpoints are empty', 'Client pod is not Ready before exec', 'Namespace typo causes objects to be created elsewhere'],
  complexityAnalysis: 'This is a Kubernetes operations task. The useful complexity is relationship complexity: Namespace contains the lab, Deployment creates ReplicaSet, ReplicaSet creates Pod, Service selects Pod, Endpoints expose selected Pod IPs, and client pod verifies Service DNS.',
  explanation: 'In this lesson, you create the first workload foundation: Namespace, Deployment, ReplicaSet, Pod, ClusterIP Service, Service selector, Endpoints, temporary client pod, and in-cluster DNS verification. ConfigMaps, Secrets, probes, volumes, Ingress, NetworkPolicy, Jobs, CronJobs, scaling, rollout strategy, and HPA come later.',
  stepByStepBreakdown: [
    'Confirm the prepared cluster is reachable.',
    'Create namespace kubetasker.',
    'Create Deployment kube-tasker-api using msomi22/kubetasker-api:0.1.1.',
    'Inspect Deployment and ReplicaSet together.',
    'Inspect the Pod separately because it is the actual running unit.',
    'Expose the Deployment with a ClusterIP Service.',
    'Inspect Service and Endpoints.',
    'Run temporary BusyBox client pod in the same namespace.',
    'Call /health, /, and /tasks/stats through the Service DNS name.',
    'Clean up only the workload namespace/resources.'
  ],
  finalTakeaway: 'For CKAD, creation is not enough. Verify the object chain: Deployment available, Pod Ready, Service has Endpoints, and another pod can call the Service DNS name.',
  visualExplanation: 'The visual shows how Deployment, ReplicaSet, Pod, Service, Endpoints, DNS, and a client pod connect in the first KubeTasker workload.',
  visualWalkthrough: {
    title: 'KubeTasker workload and service flow',
    summary: 'Follow the path from desired workload to in-cluster verification.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'Deployment, Service, and client pod flow',
      description: 'A beginner-friendly map of the Kubernetes objects used in this workload and service lesson.',
      nodes: [
        { id: 'namespace', label: 'Namespace\nkubetasker' },
        { id: 'deployment', label: 'Deployment\nkube-tasker-api' },
        { id: 'replicaset', label: 'ReplicaSet\ncreated by Deployment' },
        { id: 'api-pod', label: 'Pod\nAPI container :8080' },
        { id: 'service', label: 'Service\nClusterIP :80' },
        { id: 'endpoints', label: 'Endpoints\nAPI Pod IP' },
        { id: 'client', label: 'Client Pod\nbusybox' },
        { id: 'dns', label: 'DNS name\nkube-tasker-api' }
      ],
      edges: [
        { from: 'namespace', to: 'deployment', label: 'contains' },
        { from: 'deployment', to: 'replicaset', label: 'creates' },
        { from: 'replicaset', to: 'api-pod', label: 'keeps 1 Pod running' },
        { from: 'service', to: 'api-pod', label: 'selector: app=kube-tasker-api' },
        { from: 'service', to: 'endpoints', label: 'publishes backing Pod IP' },
        { from: 'client', to: 'dns', label: 'calls' },
        { from: 'dns', to: 'service', label: 'resolves to Service' },
        { from: 'service', to: 'api-pod', label: 'forwards to targetPort 8080' }
      ],
      frames: [
        {
          title: 'Create an isolated practice space',
          activeNodes: ['namespace'],
          visitedNodes: [],
          state: { label: 'Namespace', values: { name: 'kubetasker', purpose: 'group lesson resources' }, helper: 'A namespace keeps the course app separate from system and unrelated objects.' },
          description: 'Everything in this lesson is created inside the kubetasker namespace.'
        },
        {
          title: 'Deployment creates the running API path',
          activeNodes: ['deployment', 'replicaset', 'api-pod'],
          visitedNodes: ['namespace'],
          state: { label: 'Workload', values: { replicas: 1, image: 'msomi22/kubetasker-api:0.1.1', containerPort: 8080 }, helper: 'You create the Deployment. Kubernetes creates the ReplicaSet and Pod from that desired state.' },
          description: 'The API actually runs inside the Pod. The Deployment and ReplicaSet help keep that Pod running.'
        },
        {
          title: 'Service finds the API Pod by label',
          activeNodes: ['service', 'api-pod', 'endpoints'],
          visitedNodes: ['namespace', 'deployment', 'replicaset'],
          state: { label: 'Service selector', values: { selector: 'app=kube-tasker-api', servicePort: 80, targetPort: 8080 }, helper: 'If the selector does not match the Pod label, the Service will have no endpoints.' },
          description: 'The Service gives a stable in-cluster access point and forwards traffic to the selected API Pod.'
        },
        {
          title: 'Client pod verifies the Service through DNS',
          activeNodes: ['client', 'dns', 'service', 'api-pod'],
          visitedNodes: ['namespace', 'deployment', 'replicaset', 'endpoints'],
          state: { label: 'Verification', values: { url: 'http://kube-tasker-api/health', expected: 'API health response' }, helper: 'Inside the same namespace, kube-tasker-api resolves to the Service.' },
          description: 'The client pod calls the Service DNS name, and Kubernetes routes the request to the API Pod.'
        }
      ]
    }
  },
  body: [
    { type: 'section', title: 'Objective', content: '1. Create a dedicated namespace for the KubeTasker demo API.\n2. Deploy KubeTasker as the first application workload.\n3. Expose it inside the cluster using a ClusterIP Service.\n4. Run a temporary client/debug pod in the same namespace.\n5. Verify the API through Kubernetes DNS.\n6. Inspect Deployment, ReplicaSet, Pod, Service, and Endpoints.' },
    { type: 'section', title: 'Builds on the preparation quiz', content: 'The preparation quiz helped you create a repeatable Kubernetes lab and may have shown some KubeTasker commands as a smoke test. This lesson now teaches those actions properly and explains the Kubernetes objects behind them. Use `k` as shorthand for `kubectl` after the alias has been introduced.' },
    { type: 'callout', tone: 'info', title: 'Image pull behavior', content: 'The Deployment uses the public image `msomi22/kubetasker-api:0.1.1`. Kubernetes pulls this image automatically when the Pod is scheduled. You do not need to manually pull it on managed Kubernetes nodes.' },
    ...command('1. Confirm cluster access', 'Before creating application objects, prove that your kubectl context points to the practice cluster and that at least one node is Ready.', 'k get nodes -o wide'),
    ...command('2. Create the namespace', 'A Namespace is like a named workspace inside the cluster. Here it isolates the course app resources from system namespaces and unrelated practice work.', 'k create namespace kubetasker --dry-run=client -o yaml | k apply -f -'),
    ...command('3. Deploy the KubeTasker API', 'A Deployment declares the application workload you want Kubernetes to run. This command asks Kubernetes to run one KubeTasker API Pod using the published practice image.', 'k create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker'),
    ...command('4. Verify Deployment and ReplicaSet', 'Deployment and ReplicaSet are closely related, so inspect them together. The Deployment owns the rollout intent; the ReplicaSet keeps the requested number of Pods alive.', 'k -n kubetasker get deploy,rs'),
    ...command('5. Verify the API Pod', 'Inspect the Pod separately because this is the actual running unit that contains the KubeTasker API container.', 'k -n kubetasker get pods -o wide'),
    ...command('6. Expose the Deployment with a ClusterIP Service', 'A Service is a stable in-cluster access point. The Service port is 80, and it forwards to the API container target port 8080.', 'k expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker'),
    ...command('7. Verify Service and Endpoints', 'Service and Endpoints belong together. The Service is the stable name, and the Endpoints show the selected Pod IPs currently backing that Service.', 'k -n kubetasker get svc,endpoints'),
    ...command('8. Describe the Service selector', 'Describe the Service when you want to confirm the selector, port, target port, and routing details. Empty endpoints usually mean the selector does not match the Pod labels.', 'k -n kubetasker describe svc kube-tasker-api'),
    ...command('9. Create a temporary client pod', 'A client pod is a small temporary test pod. It lets you test the Service from inside the cluster, which is the correct place to verify ClusterIP networking and DNS.', 'k -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600'),
    ...command('10. Wait for the client pod', 'Wait until the client pod is Ready before using exec. This avoids testing from a pod that has not started yet.', 'k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s'),
    ...command('11. Verify the health endpoint through DNS', 'Inside the same namespace, the DNS name `kube-tasker-api` resolves to the Service. Do not use localhost here because localhost would mean the client pod itself.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health'),
    ...command('12. Verify the root endpoint through DNS', 'This confirms that the same Service DNS name can reach the API landing route.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/'),
    ...command('13. Verify the task statistics endpoint through DNS', 'This confirms that an application endpoint is reachable, not only the health endpoint.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/tasks/stats'),
    ...command('14. Inspect all created objects together', 'This command gives you one final picture of the objects created in the namespace: Deployment, ReplicaSet, Pod, Service, and Endpoints.', 'k -n kubetasker get deploy,rs,pod,svc,endpoints -o wide'),
    { type: 'section', title: 'Beginner explanation of each Kubernetes object', content: '**Namespace**: a named workspace for this exercise. It keeps KubeTasker away from `default`, `kube-system`, and other labs.\n\n**Deployment**: the instruction that says, “Kubernetes, keep this app running.” You create this instead of manually managing a long-lived Pod.\n\n**ReplicaSet**: the helper object created by the Deployment. It keeps the requested number of Pods alive. Here the count is one.\n\n**Pod**: the actual running unit. The KubeTasker API container runs inside the Pod and listens on port 8080.\n\n**ClusterIP Service**: the stable internal access point. Pods can be replaced, but the Service name stays stable.\n\n**Service selector**: the label rule used by the Service to find Pods. Here it must match `app=kube-tasker-api`.\n\n**Endpoints**: the current Pod IPs behind the Service. Empty endpoints usually mean the selector does not match the Pod labels.\n\n**Temporary client/debug pod**: a small test pod used to verify networking from inside the cluster.\n\n**Kubernetes DNS**: inside the same namespace, `kube-tasker-api` resolves to the Service.' },
    { type: 'section', title: 'Expected behavior', content: '- Namespace `kubetasker` exists.\n- Deployment `kube-tasker-api` is available.\n- The API Pod is Running or Ready.\n- Service `kube-tasker-api` exists.\n- Endpoints exist for the Service.\n- Client pod can reach `http://kube-tasker-api/health`.\n- `/tasks/stats` returns task statistics.\n- `/` returns the KubeTasker API landing response.' },
    ...command('Cleanup lesson resources', 'Remove only the lesson resources. Do not delete the whole cloud cluster here unless you are done with the lab. Use the preparation quiz cleanup steps when destroying the full environment.', 'k delete namespace kubetasker --ignore-not-found')
  ],
  relatedConcepts: ['Namespace', 'Deployment', 'ReplicaSet', 'Pod', 'ClusterIP Service', 'selector', 'Endpoints', 'Kubernetes DNS', 'kubectl exec'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

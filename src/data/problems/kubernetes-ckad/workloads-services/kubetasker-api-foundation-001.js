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
  scenario: 'You are onboarding KubeTasker, a small task-management API used for CKAD practice. Your job is to run the API in Kubernetes, give it a stable internal name, and prove that another pod can call it through that name.',
  starterThought: 'Do not rush to commands. First understand the chain: Deployment creates the Pod, Service finds the Pod, DNS gives the Service a name, and a client pod proves the path works.',
  intuition: 'A Pod is temporary. A Service gives other pods a stable way to reach it. A Deployment keeps the Pod alive when Kubernetes has to replace it.',
  mentalPicture: 'Think of the namespace as a practice room, the Deployment as the manager, the ReplicaSet as the assistant that keeps one worker present, the Pod as the worker running the API, and the Service as the front desk name that other workers use.',
  patternSignal: 'Use a Deployment plus a ClusterIP Service when one application inside the cluster must call another application inside the same cluster.',
  invariant: 'The Service selector must match the Pod label app=kube-tasker-api. If it does not match, the Service exists but has no backend Pod to send traffic to.',
  finalPattern: 'Run an internal Kubernetes workload and verify it through Service DNS from another Pod.',
  commonMistake: 'Do not use localhost from the client pod. localhost means the client pod itself, not the API Pod.',
  commonMistakes: [
    'Forgetting -n kubetasker and accidentally checking the default namespace.',
    'Creating a Service whose selector does not match the Pod label.',
    'Using port 8080 as the Service port without understanding that the Service port and container targetPort can be different.',
    'Running the client pod in a different namespace and expecting the short DNS name to work the same way.',
    'Checking that the Service exists but forgetting to check whether it has Endpoints.',
    'Thinking KubeTasker is part of Kubernetes. It is only the course demo application.'
  ],
  edgeCases: ['Image pull takes a moment on a fresh node', 'Service exists but endpoints are empty', 'Client pod is not Ready before exec', 'Namespace typo causes objects to be created elsewhere'],
  complexityAnalysis: 'This is a Kubernetes operations task. The important complexity is object relationship complexity: Namespace groups resources, Deployment creates ReplicaSet, ReplicaSet keeps Pod count, Service selects Pods, Endpoints reveal selected Pod IPs, and the client pod verifies Service DNS.',
  explanation: 'In this lesson, you create the first useful KubeTasker workload path: Namespace, Deployment, ReplicaSet, Pod, ClusterIP Service, Endpoints, temporary client pod, and DNS verification. More advanced topics like ConfigMaps, Secrets, probes, Ingress, Jobs, NetworkPolicy, scaling, and rollout strategy come later.',
  stepByStepBreakdown: [
    'Confirm the prepared cluster is reachable.',
    'Create namespace kubetasker.',
    'Create Deployment kube-tasker-api using msomi22/kubetasker-api:0.1.1.',
    'Inspect Deployment and ReplicaSet together.',
    'Inspect the Pod separately because it is the actual running unit.',
    'Expose the Deployment with a ClusterIP Service.',
    'Inspect Service and Endpoints together.',
    'Run a temporary BusyBox client pod in the same namespace.',
    'Call /health, /, and /tasks/stats through the Service DNS name.',
    'Clean up only the lesson namespace when finished.'
  ],
  finalTakeaway: 'In CKAD, creating the object is only half the work. The better habit is to verify the full chain: Deployment available, Pod Ready, Service has Endpoints, and another pod can call the Service DNS name.',
  visualExplanation: 'The visual shows the path from desired state to network access: Deployment creates a ReplicaSet, ReplicaSet keeps the API Pod alive, Service selects the Pod, Endpoints show the selected Pod IP, and the client pod reaches the API through DNS.',
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
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'Create a dedicated namespace for the KubeTasker demo API.',
        'Deploy KubeTasker as the first application workload.',
        'Expose the API inside the cluster using a ClusterIP Service.',
        'Run a temporary client pod in the same namespace.',
        'Verify the API through Kubernetes DNS.',
        'Inspect the Deployment, ReplicaSet, Pod, Service, and Endpoints.'
      ]
    },
    {
      type: 'section',
      title: 'Builds on the preparation quiz',
      content: 'The preparation quiz created the lab environment. This lesson uses that cluster to teach the first real application path. We are not provisioning cloud resources again; we are learning how a Kubernetes workload becomes reachable inside the cluster.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Image pull behavior',
      content: 'The Deployment uses the public image `msomi22/kubetasker-api:0.1.1`. Kubernetes pulls this image automatically when the Pod is scheduled. You do not manually pull the image on a managed Kubernetes node.'
    },
    ...command('1. Confirm cluster access', 'Start by proving that kubectl is connected to the prepared practice cluster and that at least one node is Ready.', 'k get nodes -o wide'),
    ...command('2. Create the namespace', 'Create a clean workspace for this lesson. Keeping the app in its own namespace makes inspection and cleanup much safer.', 'k create namespace kubetasker --dry-run=client -o yaml | k apply -f -'),
    ...command('3. Deploy the KubeTasker API', 'Create the first application workload. Kubernetes will create a Deployment, then a ReplicaSet, then a Pod running the API container.', 'k create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker'),
    ...command('4. Verify Deployment and ReplicaSet', 'Inspect the controller objects together. The Deployment manages rollout intent. The ReplicaSet keeps the requested number of matching Pods alive.', 'k -n kubetasker get deploy,rs'),
    ...command('5. Verify the API Pod', 'Now inspect the actual running unit. The Pod is where the KubeTasker API container is running.', 'k -n kubetasker get pods -o wide'),
    ...command('6. Expose the Deployment with a ClusterIP Service', 'Create an internal Service. Other pods will call the Service on port 80, and the Service will forward traffic to the API container on port 8080.', 'k expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker'),
    ...command('7. Verify Service and Endpoints', 'Check the stable access point and the backing Pod IPs together. A Service without Endpoints is like a front desk with nobody behind it.', 'k -n kubetasker get svc,endpoints'),
    ...command('8. Describe the Service selector', 'Use describe when you need the full routing story: selector, port, target port, and endpoint details.', 'k -n kubetasker describe svc kube-tasker-api'),
    ...command('9. Create a temporary client pod', 'Create a small test pod. This pod acts like another application inside the cluster and proves whether internal Service networking works.', 'k -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600'),
    ...command('10. Wait for the client pod', 'Wait until the client pod is Ready before running commands inside it.', 'k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s'),
    ...command('11. Verify the health endpoint through DNS', 'Call the API through the Service name. Inside the same namespace, kube-tasker-api resolves to the Service.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health'),
    ...command('12. Verify the root endpoint through DNS', 'Call the root route through the same Service name to confirm normal API traffic also works.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/'),
    ...command('13. Verify the task statistics endpoint through DNS', 'Call a simple application endpoint, not only the health endpoint. This proves the demo API is reachable through the Service.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/tasks/stats'),
    ...command('14. Inspect all created objects together', 'Finish by viewing the whole chain in one command: controller objects, running Pod, Service, and Endpoints.', 'k -n kubetasker get deploy,rs,pod,svc,endpoints -o wide'),
    {
      type: 'comparison',
      title: 'What each Kubernetes object means',
      items: [
        { label: 'Namespace', content: 'A named workspace for the lesson. It keeps KubeTasker resources away from default, kube-system, and other practice work.' },
        { label: 'Deployment', content: 'The desired-state instruction for the app. It tells Kubernetes to keep the KubeTasker API running.' },
        { label: 'ReplicaSet', content: 'The helper created by the Deployment. It keeps the requested number of API Pods alive.' },
        { label: 'Pod', content: 'The actual running unit. The KubeTasker API container runs inside this Pod and listens on port 8080.' },
        { label: 'ClusterIP Service', content: 'The stable internal access point. Pods may be replaced, but the Service name remains stable.' },
        { label: 'Service selector', content: 'The label rule used by the Service to find the API Pod. In this lesson it matches app=kube-tasker-api.' },
        { label: 'Endpoints', content: 'The current Pod IPs behind the Service. Empty Endpoints usually mean the Service selector does not match any ready Pod.' },
        { label: 'Client pod', content: 'A temporary test pod used to check the API from inside the cluster, the same way another application would call it.' },
        { label: 'Kubernetes DNS', content: 'The naming system that lets the client pod call kube-tasker-api instead of chasing changing Pod IPs.' }
      ]
    },
    {
      type: 'checklist',
      title: 'Expected behavior',
      items: [
        'Namespace kubetasker exists.',
        'Deployment kube-tasker-api is available.',
        'The API Pod is Running or Ready.',
        'Service kube-tasker-api exists.',
        'Endpoints exist for the Service.',
        'The client pod can reach http://kube-tasker-api/health.',
        'The /tasks/stats endpoint returns task statistics.',
        'The / endpoint returns the KubeTasker API landing response.'
      ]
    },
    ...command('Cleanup lesson resources', 'Remove only the resources created in this lesson. Do not delete the whole cloud cluster here unless you are finished with the lab.', 'k delete namespace kubetasker --ignore-not-found')
  ],
  relatedConcepts: ['Namespace', 'Deployment', 'ReplicaSet', 'Pod', 'ClusterIP Service', 'selector', 'Endpoints', 'Kubernetes DNS', 'kubectl exec'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

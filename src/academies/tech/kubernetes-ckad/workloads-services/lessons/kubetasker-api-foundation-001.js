import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

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
  title: 'Step 1: KubeTasker API Foundation',
  difficulty: 'Easy',
  estimatedTimeSeconds: 1200,
  estimatedTime: '20 min',
  tags: ['kubernetes-ckad', 'workloads-services', 'kubetasker', 'deployment', 'replicaset', 'pod', 'service', 'dns', 'endpoints'],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'Start here. You are onboarding KubeTasker, a small task-management API used for CKAD practice. Your job is to run the API in Kubernetes, give it a stable internal name, and prove that another pod can call it through that name.',
  starterThought: 'Do not rush to commands. First understand the chain: Deployment creates the Pod, Service finds the Pod, DNS gives the Service a name, and a client pod proves the path works.',
  intuition: 'A Pod is temporary. A Service gives other pods a stable way to reach it. A Deployment keeps the Pod alive when Kubernetes has to replace it.',
  mentalPicture: 'Think of the namespace as a practice room, the Deployment as the manager, the ReplicaSet as the assistant that keeps one worker present, the Pod as the worker running the API, and the Service as the front desk name that other workers use.',
  patternSignal: 'Use a Deployment plus a ClusterIP Service when one application inside the cluster must call another application inside the same cluster.',
  invariant: 'The Service selector must match the Pod label app=kube-tasker-api. If it does not match, the Service exists but has no backend Pod to send traffic to.',
  finalPattern: 'Step 1 of 2: Run the API with direct Kubernetes commands and verify Service DNS.',
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
    'Inspect the Deployment.',
    'Inspect the ReplicaSet.',
    'Inspect the Pod because it is the actual running unit.',
    'Expose the Deployment with a ClusterIP Service.',
    'Inspect the Service.',
    'Inspect the Endpoints.',
    'Describe the Service selector and ports.',
    'Run a temporary BusyBox client pod in the same namespace.',
    'Wait for the client pod to become Ready.',
    'Call /health through the Service DNS name.',
    'Call / through the Service DNS name.',
    'Call /tasks/stats through the Service DNS name.',
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
        'Start the Workloads and Services learning path with direct Kubernetes commands.',
        'Create a dedicated namespace for the KubeTasker demo API.',
        'Deploy KubeTasker as the first application workload.',
        'Expose the API inside the cluster using a ClusterIP Service.',
        'Run a temporary client pod in the same namespace.',
        'Verify the API through Kubernetes DNS.',
        'Inspect the Deployment, ReplicaSet, Pod, Service, and Endpoints.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Learning order',
      content: 'This is Step 1 of 2 in this topic. Complete this lesson before opening the YAML files lesson, because the next lesson modifies the same workload using manifest files.'
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
    ...command('1. Confirm cluster access', 'This command asks the cluster for its nodes. Before deploying an app, you need to prove that your terminal is pointing to the correct Kubernetes cluster and that the node is Ready.', 'k get nodes -o wide'),
    ...command('2. Create the lesson namespace', 'This creates a clean workspace named kubetasker. Using a namespace keeps this lesson separate from system resources and makes cleanup simple.', 'k create namespace kubetasker'),
    ...command('3. Create the API Deployment', 'This creates the desired workload. You are telling Kubernetes to run the KubeTasker API image and manage it as a Deployment named kube-tasker-api.', 'k create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker'),
    ...command('4. Inspect the Deployment', 'This confirms that the Deployment exists and shows whether Kubernetes has accepted the desired app rollout.', 'k -n kubetasker get deploy'),
    ...command('5. Inspect the ReplicaSet', 'This shows the ReplicaSet created by the Deployment. The ReplicaSet is the controller that keeps the requested number of Pods alive.', 'k -n kubetasker get rs'),
    ...command('6. Inspect the API Pod', 'This shows the actual running unit. The Pod is where the API container runs, so this is where you confirm that Kubernetes has started the workload.', 'k -n kubetasker get pods -o wide'),
    ...command('7. Create the internal Service', 'This creates a stable in-cluster access point. Other pods will call port 80 on the Service, and the Service forwards traffic to port 8080 inside the API Pod.', 'k expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker'),
    ...command('8. Inspect the Service', 'This confirms that the Service exists. The Service is the stable name and virtual IP used by other pods inside the cluster.', 'k -n kubetasker get svc kube-tasker-api'),
    ...command('9. Inspect the Endpoints', 'This confirms that the Service has found a backing Pod. If this command shows no endpoints, the Service selector is not connected to a ready Pod.', 'k -n kubetasker get endpoints kube-tasker-api'),
    ...command('10. Describe the Service', 'This gives the full routing detail: selector, Service port, target port, and endpoint information. Use this when debugging Service-to-Pod routing.', 'k -n kubetasker describe svc kube-tasker-api'),
    ...command('11. Create a temporary client pod', 'This creates a small BusyBox pod that stays alive for testing. It acts like another app inside the cluster.', 'k -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600'),
    ...command('12. Wait for the client pod', 'This waits until the client pod is Ready. Do this before running exec so you are not testing from a pod that has not started.', 'k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s'),
    ...command('13. Verify the health endpoint through DNS', 'This runs wget inside the client pod. The name kube-tasker-api resolves to the Service because the client pod is in the same namespace.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health'),
    ...command('14. Verify the root endpoint through DNS', 'This calls the API landing route through the same Service name. It proves normal app traffic can use the Service path.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/'),
    ...command('15. Verify the task statistics endpoint through DNS', 'This calls a simple application endpoint through the Service. It proves the app route is reachable, not only the health route.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/tasks/stats'),
    ...command('16. Review the Deployment at the end', 'This final check confirms the Deployment still exists after the Service and client verification work.', 'k -n kubetasker get deploy -o wide'),
    ...command('17. Review the ReplicaSet at the end', 'This final check confirms the Deployment still has a ReplicaSet maintaining the API Pod count.', 'k -n kubetasker get rs -o wide'),
    ...command('18. Review the Pods at the end', 'This final check shows both the API Pod and the temporary client pod in the namespace.', 'k -n kubetasker get pods -o wide'),
    ...command('19. Review the Service at the end', 'This final check confirms the Service is still present and exposing the internal access point.', 'k -n kubetasker get svc kube-tasker-api -o wide'),
    ...command('20. Review the Endpoints at the end', 'This final check confirms that the Service still points to a backing API Pod.', 'k -n kubetasker get endpoints kube-tasker-api -o wide'),
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
    ...command('Cleanup lesson resources', 'This deletes the namespace and everything created inside it for this lesson. It does not delete the cloud cluster itself.', 'k delete namespace kubetasker --ignore-not-found')
  ],
  relatedConcepts: ['Namespace', 'Deployment', 'ReplicaSet', 'Pod', 'ClusterIP Service', 'selector', 'Endpoints', 'Kubernetes DNS', 'kubectl exec'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

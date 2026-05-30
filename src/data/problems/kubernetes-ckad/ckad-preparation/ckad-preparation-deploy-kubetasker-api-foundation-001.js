import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'ckad-preparation-deploy-kubetasker-api-foundation-001',
  category: 'kubernetes-ckad',
  topicId: 'ckad-preparation',
  title: 'CKAD Stage 1: Deploy KubeTasker API Foundation',
  difficulty: 'Easy',
  estimatedTimeSeconds: 1200,
  estimatedTime: '20 min',
  tags: ['kubernetes-ckad', 'stage-1', 'kubetasker', 'namespace', 'deployment', 'replicaset', 'pod', 'service', 'endpoints', 'dns'],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt: 'Deploy the KubeTasker API into Kubernetes, expose it with an internal ClusterIP Service, and verify it from a temporary client pod using Kubernetes DNS.',
  question: 'Deploy the KubeTasker API into the kubetasker namespace, expose it internally, and prove that another pod can reach /health, /, and /tasks/stats through the Service DNS name.',
  scenario: 'You are onboarding KubeTasker, a lightweight demo task-management API used for CKAD practice. Your first task is to deploy the API into Kubernetes and verify it from inside the cluster.',
  starterThought: 'Use the cluster created in the preparation quiz. Do not repeat cloud provisioning unless the cluster was deleted.',
  intuition: 'The Deployment keeps the API Pod running. The Service gives that Pod a stable internal name. The client pod proves the same access path another application would use.',
  mentalPicture: 'Namespace is the practice room. Deployment is the manager. ReplicaSet is the assistant that keeps one Pod alive. Pod is the running API. Service is the stable front desk name. Endpoints show which Pod IPs the Service currently sends traffic to.',
  patternSignal: 'Use Deployment plus ClusterIP Service when a workload should be reachable by other pods inside the cluster.',
  invariant: 'The Service selector must match the Pod label app=kube-tasker-api, otherwise the Service will have no endpoints.',
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
  explanation: 'In this stage, you create only the first workload foundation: Namespace, Deployment, ReplicaSet, Pod, ClusterIP Service, Service selector, Endpoints, temporary client pod, and in-cluster DNS verification. ConfigMaps, Secrets, probes, volumes, Ingress, NetworkPolicy, Jobs, CronJobs, scaling, rollout strategy, and HPA come later.',
  stepByStepBreakdown: [
    'Confirm the prepared cluster is reachable.',
    'Create namespace kubetasker.',
    'Create Deployment kube-tasker-api using msomi22/kubetasker-api:0.1.1.',
    'Inspect Deployment, ReplicaSet, and Pod.',
    'Expose the Deployment with a ClusterIP Service.',
    'Inspect Service and Endpoints.',
    'Run temporary BusyBox client pod in the same namespace.',
    'Call /health, /, and /tasks/stats through the Service DNS name.',
    'Clean up only the Stage 1 application namespace/resources.'
  ],
  finalPattern: 'Deploy an internal Kubernetes workload and verify it through Service DNS from another Pod.',
  finalTakeaway: 'For CKAD, creation is not enough. Verify the object chain: Deployment available, Pod Ready, Service has Endpoints, and another pod can call the Service DNS name.',
  body: [
    { type: 'section', title: 'Objective', content: '1. Create a dedicated namespace for the KubeTasker demo API.\n2. Deploy KubeTasker as the first application workload.\n3. Expose it inside the cluster using a ClusterIP Service.\n4. Run a temporary client/debug pod in the same namespace.\n5. Verify the API through Kubernetes DNS.\n6. Inspect Deployment, ReplicaSet, Pod, Service, and Endpoints.' },
    { type: 'section', title: 'Builds on the preparation quiz', content: 'The preparation quiz helped you create a repeatable Kubernetes lab and may have shown some KubeTasker commands as a smoke test. This Stage 1 problem now teaches those actions properly and explains the Kubernetes objects behind them. Use `k` as shorthand for `kubectl` after the alias has been introduced.' },
    { type: 'callout', tone: 'info', title: 'Image pull behavior', content: 'The Deployment uses the public image `msomi22/kubetasker-api:0.1.1`. Kubernetes pulls this image automatically when the Pod is scheduled. You do not need to manually pull it on managed Kubernetes nodes.' },
    { type: 'section', title: 'Commands', content: 'Run these commands in order:\n\n```bash\nk get nodes -o wide\nk create namespace kubetasker --dry-run=client -o yaml | k apply -f -\nk create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker\nk -n kubetasker get deploy\nk -n kubetasker get rs\nk -n kubetasker get pods -o wide\nk expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker\nk -n kubetasker get svc\nk -n kubetasker describe svc kube-tasker-api\nk -n kubetasker get endpoints kube-tasker-api\nk -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600\nk -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s\nk -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health\nk -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/\nk -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/tasks/stats\nk -n kubetasker get deployment,rs,pod,svc,endpoints -o wide\n```' },
    { type: 'section', title: 'Beginner explanation of each Kubernetes object', content: '**Namespace**: a named workspace for this exercise. It keeps KubeTasker away from `default`, `kube-system`, and other labs.\n\n**Deployment**: the instruction that says, “Kubernetes, keep this app running.” You create this instead of manually managing a long-lived Pod.\n\n**ReplicaSet**: the helper object created by the Deployment. It keeps the requested number of Pods alive. Here the count is one.\n\n**Pod**: the actual running unit. The KubeTasker API container runs inside the Pod and listens on port 8080.\n\n**ClusterIP Service**: the stable internal access point. Pods can be replaced, but the Service name stays stable.\n\n**Service selector**: the label rule used by the Service to find Pods. Here it must match `app=kube-tasker-api`.\n\n**Endpoints**: the current Pod IPs behind the Service. Empty endpoints usually mean the selector does not match the Pod labels.\n\n**Temporary client/debug pod**: a small test pod used to verify networking from inside the cluster.\n\n**Kubernetes DNS**: inside the same namespace, `kube-tasker-api` resolves to the Service.' },
    { type: 'section', title: 'Expected behavior', content: '- Namespace `kubetasker` exists.\n- Deployment `kube-tasker-api` is available.\n- The API Pod is Running or Ready.\n- Service `kube-tasker-api` exists.\n- Endpoints exist for the Service.\n- Client pod can reach `http://kube-tasker-api/health`.\n- `/tasks/stats` returns task statistics.\n- `/` returns the KubeTasker API landing response.' },
    { type: 'section', title: 'Cleanup', content: 'Remove only the Stage 1 app resources:\n\n```bash\nk delete namespace kubetasker --ignore-not-found\n```\n\nDo not delete the whole cloud cluster here unless you are done with the lab. Use the preparation quiz cleanup steps when destroying the full environment.' }
  ],
  relatedConcepts: ['Namespace', 'Deployment', 'ReplicaSet', 'Pod', 'ClusterIP Service', 'selector', 'Endpoints', 'Kubernetes DNS', 'kubectl exec'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

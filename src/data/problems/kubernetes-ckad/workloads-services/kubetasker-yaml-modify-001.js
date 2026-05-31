import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Create Kubernetes YAML files for KubeTasker, apply them, modify them, and verify how file changes affect live cluster objects.';

function command(title, explanation, code, language = 'bash') {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title, language, code }
  ];
}

function fileBlock(title, explanation, filename, code) {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', filename, language: 'yaml', code }
  ];
}

function vimCommand(step, filename, action = 'create or edit') {
  return command(
    `${step}. Open ${filename} with vim`,
    `Run this command to ${action} ${filename} inside the kubetasker-manifests folder. Press i to enter insert mode, paste the YAML shown in the next block, then save using :wq as explained above.`,
    `vim ${filename}`
  );
}

const namespaceYaml = `apiVersion: v1
kind: Namespace
metadata:
  name: kubetasker`;

const deploymentYamlV1 = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  replicas: 1
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

const deploymentYamlV2 = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  replicas: 2 # changed here
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

const serviceYaml = `apiVersion: v1
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

const brokenServiceYaml = `apiVersion: v1
kind: Service
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  type: ClusterIP
  selector:
    app: wrong-label # changed here
  ports:
    - name: http
      port: 80
      targetPort: 8080`;

const clientPodYaml = `apiVersion: v1
kind: Pod
metadata:
  name: kube-tasker-client
  namespace: kubetasker
spec:
  restartPolicy: Never
  containers:
    - name: client
      image: busybox:1.36
      command: ['sleep', '3600']`;

const problem = defineLearningProblem({
  id: 'kubetasker-yaml-modify-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'Step 2: KubeTasker YAML Files',
  difficulty: 'Easy',
  estimatedTimeSeconds: 1800,
  estimatedTime: '30 min',
  tags: ['kubernetes-ckad', 'workloads-services', 'yaml', 'manifest', 'apply', 'deployment', 'service', 'selector', 'endpoints'],
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'Complete Step 1 first. You already deployed KubeTasker using direct kubectl commands. Now you will manage the same application using YAML files so you can see exactly what Kubernetes objects look like and how file changes update the cluster.',
  starterThought: 'Commands are useful for speed, but YAML files teach ownership. A file shows the desired state clearly, can be reviewed, can be changed, and can be applied again.',
  intuition: 'A Kubernetes manifest is a saved desired-state instruction. When you apply it, Kubernetes compares the file with the live object and moves the cluster toward what the file says.',
  mentalPicture: 'Think of each YAML file as a written instruction card: one card creates the workspace, one card describes the API workload, one card describes the stable Service, and one card creates a temporary client for verification.',
  patternSignal: 'Use YAML manifests when the learner must understand, review, modify, repeat, or version-control Kubernetes configuration.',
  invariant: 'For this lesson, the Deployment Pod label and the Service selector must both use app=kube-tasker-api. If they differ, the Service will have no useful Endpoints.',
  finalPattern: 'Step 2 of 2: Manage the same API using YAML files, apply changes, and verify live state.',
  commonMistake: 'Changing a Service selector without checking Endpoints. The Service may still exist while routing to no Pods.',
  commonMistakes: [
    'Editing the YAML but forgetting to run k apply -f again.',
    'Changing labels in the Pod template but not changing the Service selector carefully.',
    'Confusing port with targetPort.',
    'Putting namespace in the command but forgetting namespace inside the YAML metadata.',
    'Using k create repeatedly for existing objects instead of k apply for file-managed objects.',
    'Assuming a Service is healthy just because k get svc shows it.'
  ],
  edgeCases: ['Selector mismatch causes empty Endpoints', 'Replica count changes take a few seconds to settle', 'Image pull may delay Pod readiness', 'A YAML indentation mistake can make the file invalid'],
  complexityAnalysis: 'This is an operational configuration task. The complexity is understanding the relationship between file desired state and live cluster state.',
  explanation: 'This lesson moves from imperative commands to manifest-based Kubernetes work. You will create files, apply them, inspect the created objects, change replicas, deliberately break a Service selector, observe the failure through Endpoints, fix the selector, and verify DNS access from a client pod.',
  stepByStepBreakdown: [
    'Create a local folder for KubeTasker manifests.',
    'Write namespace.yaml.',
    'Write deployment.yaml with one replica.',
    'Write service.yaml with a selector matching the Pod label.',
    'Write client-pod.yaml.',
    'Apply each file independently.',
    'Inspect each created object independently.',
    'Modify deployment.yaml to use two replicas.',
    'Apply the Deployment file again.',
    'Verify two API Pods exist.',
    'Break service.yaml by changing the selector.',
    'Apply the broken Service file.',
    'Verify Endpoints become empty or incorrect.',
    'Fix service.yaml by restoring the selector.',
    'Apply the fixed Service file.',
    'Verify DNS access from the client pod.',
    'Clean up the lesson resources.'
  ],
  finalTakeaway: 'YAML is not decoration. It is the readable desired state that Kubernetes uses to create and update objects. A good CKAD learner can edit a manifest, apply it, and prove what changed.',
  visualExplanation: 'The visual shows a file-driven loop: edit YAML, apply YAML, Kubernetes updates objects, inspect live state, then repeat.',
  visualWalkthrough: {
    title: 'Manifest-driven Kubernetes workflow',
    summary: 'See how YAML changes become live Kubernetes object changes.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'YAML to live object feedback loop',
      description: 'A beginner-friendly map of the apply, inspect, modify, and verify loop.',
      nodes: [
        { id: 'files', label: 'YAML files\nnamespace deployment service client' },
        { id: 'apply', label: 'kubectl apply\nfile by file' },
        { id: 'objects', label: 'Live objects\nin the cluster' },
        { id: 'inspect', label: 'Inspect\nget describe endpoints' },
        { id: 'modify', label: 'Modify files\nreplicas selector ports' },
        { id: 'verify', label: 'Verify DNS\nfrom client pod' }
      ],
      edges: [
        { from: 'files', to: 'apply', label: 'submitted as desired state' },
        { from: 'apply', to: 'objects', label: 'creates or updates' },
        { from: 'objects', to: 'inspect', label: 'observe live state' },
        { from: 'inspect', to: 'modify', label: 'decide what to change' },
        { from: 'modify', to: 'files', label: 'edit manifest' },
        { from: 'objects', to: 'verify', label: 'prove app access' }
      ],
      frames: [
        {
          title: 'Start with files',
          activeNodes: ['files'],
          visitedNodes: [],
          state: { label: 'Files', values: { count: '4 manifests', purpose: 'save desired state' }, helper: 'Each file describes one Kubernetes object clearly.' },
          description: 'The learner writes the namespace, Deployment, Service, and client pod manifests.'
        },
        {
          title: 'Apply one file at a time',
          activeNodes: ['apply', 'objects'],
          visitedNodes: ['files'],
          state: { label: 'Apply', values: { command: 'k apply -f <file>', result: 'live object created or updated' }, helper: 'Applying one file at a time makes cause and effect easier to see.' },
          description: 'The cluster creates or updates objects based on each file.'
        },
        {
          title: 'Modify and re-apply',
          activeNodes: ['modify', 'files', 'apply'],
          visitedNodes: ['objects', 'inspect'],
          state: { label: 'Change', values: { example: 'replicas 1 to 2', verification: 'two API Pods' }, helper: 'The file is edited first, then applied again.' },
          description: 'The learner changes the manifest and verifies the live cluster follows the new desired state.'
        },
        {
          title: 'Break and fix selector matching',
          activeNodes: ['modify', 'objects', 'verify'],
          visitedNodes: ['files', 'apply', 'inspect'],
          state: { label: 'Selector invariant', values: { PodLabel: 'app=kube-tasker-api', ServiceSelector: 'app=kube-tasker-api' }, helper: 'A Service without matching Pods has no useful Endpoints.' },
          description: 'The learner sees why label and selector matching is central to Kubernetes Services.'
        }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'Continue after completing Step 1 in the Workloads and Services topic.',
        'Create Kubernetes YAML manifest files for KubeTasker.',
        'Apply each manifest file independently.',
        'Inspect the live objects created from each file.',
        'Modify a Deployment manifest and verify the cluster changes.',
        'Break and fix a Service selector to understand Endpoints.',
        'Verify the API through Service DNS from a client pod.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Prerequisite',
      content: 'Complete Step 1 first. This lesson assumes you already understand the basic KubeTasker workload, Service, Endpoints, and client-pod verification flow.'
    },
    {
      type: 'section',
      title: 'Why this lesson comes before architecture',
      content: 'Architecture becomes easier when the learner has already touched the real object files. This lesson makes the core objects concrete before we explain the larger control plane and worker-node architecture.'
    },
    ...command('1. Create a manifest folder', 'Create a small folder to keep the files for this lesson together. The files are normal text files that describe Kubernetes desired state.', 'mkdir -p kubetasker-manifests'),
    ...command('2. Enter the manifest folder', 'Move into the folder so each file you create belongs to this lesson.', 'cd kubetasker-manifests'),
    {
      type: 'section',
      title: 'How to create and save YAML files in this lesson',
      content: 'For each YAML file, run the vim command shown, press i to enter insert mode, copy the YAML content from the next block, paste it into the file, press Esc, type :wq, and press Enter to save and close the file. You only need to learn this save pattern once; the later steps reuse it.'
    },
    ...vimCommand('3', 'namespace.yaml', 'create'),
    ...fileBlock('4. Paste the namespace manifest', 'Paste this content into namespace.yaml. This file describes the workspace where the KubeTasker resources will live.', 'namespace.yaml', namespaceYaml),
    ...vimCommand('5', 'deployment.yaml', 'create'),
    ...fileBlock('6. Paste the Deployment manifest', 'Paste this content into deployment.yaml. This file describes the API workload and asks Kubernetes to run one KubeTasker API Pod using the course image.', 'deployment.yaml', deploymentYamlV1),
    ...vimCommand('7', 'service.yaml', 'create'),
    ...fileBlock('8. Paste the Service manifest', 'Paste this content into service.yaml. This file gives the API a stable internal name. The selector must match the Pod label created by the Deployment template.', 'service.yaml', serviceYaml),
    ...vimCommand('9', 'client-pod.yaml', 'create'),
    ...fileBlock('10. Paste the client pod manifest', 'Paste this content into client-pod.yaml. This file creates a temporary BusyBox pod that stays alive so you can test the Service from inside the cluster.', 'client-pod.yaml', clientPodYaml),
    ...command('11. Apply the namespace file', 'Apply the namespace first because the other files place objects inside that namespace.', 'k apply -f namespace.yaml'),
    ...command('12. Apply the Deployment file', 'Apply the Deployment so Kubernetes creates the ReplicaSet and API Pod.', 'k apply -f deployment.yaml'),
    ...command('13. Apply the Service file', 'Apply the Service so the API gets a stable internal name.', 'k apply -f service.yaml'),
    ...command('14. Apply the client pod file', 'Apply the client pod so you have a small pod available for DNS and HTTP testing.', 'k apply -f client-pod.yaml'),
    ...command('15. Inspect the namespace', 'This confirms the workspace exists before you inspect namespaced resources.', 'k get namespace kubetasker'),
    ...command('16. Inspect the Deployment', 'This confirms the workload object exists and shows its rollout status.', 'k -n kubetasker get deploy kube-tasker-api'),
    ...command('17. Inspect the ReplicaSet', 'This confirms the Deployment created a ReplicaSet to maintain the API Pod count.', 'k -n kubetasker get rs'),
    ...command('18. Inspect the Pods', 'This confirms the API Pod and client pod exist inside the lesson namespace.', 'k -n kubetasker get pods -o wide'),
    ...command('19. Inspect the Service', 'This confirms the stable internal Service exists.', 'k -n kubetasker get svc kube-tasker-api'),
    ...command('20. Inspect the Endpoints', 'This confirms the Service has found matching backend Pod IPs.', 'k -n kubetasker get endpoints kube-tasker-api'),
    ...vimCommand('21', 'deployment.yaml', 'edit'),
    ...fileBlock('22. Modify the Deployment to use two replicas', 'Replace the existing deployment.yaml content with this version so replicas changes from one to two. The changed line is marked in the YAML comment.', 'deployment.yaml', deploymentYamlV2),
    ...command('23. Apply the modified Deployment file', 'Apply the file again. Kubernetes compares the new desired state with the live Deployment and scales the workload.', 'k apply -f deployment.yaml'),
    ...command('24. Verify two API Pods', 'This confirms the replica change affected the live cluster.', 'k -n kubetasker get pods -l app=kube-tasker-api -o wide'),
    ...vimCommand('25', 'service.yaml', 'edit'),
    ...fileBlock('26. Break the Service selector deliberately', 'Replace the existing service.yaml content with this version so the selector intentionally uses a wrong label. The changed line is marked in the YAML comment so the failure point is obvious.', 'service.yaml', brokenServiceYaml),
    ...command('27. Apply the broken Service file', 'Apply the broken file so the live Service selector no longer matches the API Pod labels.', 'k apply -f service.yaml'),
    ...command('28. Inspect Endpoints after the broken selector', 'This should show no useful backend Pod IPs. The Service still exists, but it cannot find matching Pods.', 'k -n kubetasker get endpoints kube-tasker-api'),
    ...vimCommand('29', 'service.yaml', 'edit'),
    ...fileBlock('30. Fix the Service selector', 'Replace the existing service.yaml content with this corrected version so the Service can find the API Pods again.', 'service.yaml', serviceYaml),
    ...command('31. Apply the fixed Service file', 'Apply the corrected file so the live Service selector matches the API Pod labels again.', 'k apply -f service.yaml'),
    ...command('32. Verify Endpoints after the fix', 'This confirms the Service has reconnected to the API Pods.', 'k -n kubetasker get endpoints kube-tasker-api'),
    ...command('33. Wait for the client pod', 'Wait until the client pod is Ready before running the DNS verification command inside it.', 'k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s'),
    ...command('34. Verify Service DNS from the client pod', 'This proves the client pod can reach the API through the Service name inside the namespace.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health'),
    {
      type: 'comparison',
      title: 'File changes and what they affect',
      items: [
        { label: 'namespace.yaml', content: 'Creates the named workspace for the lesson resources.' },
        { label: 'deployment.yaml', content: 'Controls the desired API workload, including replica count, Pod labels, container image, and container port.' },
        { label: 'service.yaml', content: 'Controls the stable internal access point, selector, Service port, and target port.' },
        { label: 'client-pod.yaml', content: 'Creates the temporary test pod used to verify Service DNS and in-cluster access.' },
        { label: 'replicas', content: 'Changing replicas changes how many API Pods Kubernetes should keep running.' },
        { label: 'selector', content: 'Changing the selector changes which Pods the Service sends traffic to.' },
        { label: 'endpoints', content: 'Endpoints are the quickest proof that the Service is or is not connected to matching Pods.' }
      ]
    },
    {
      type: 'checklist',
      title: 'Expected behavior',
      items: [
        'The namespace file creates namespace kubetasker.',
        'The Deployment file creates the API Deployment, ReplicaSet, and Pod.',
        'The Service file creates a stable internal Service.',
        'The client pod file creates a BusyBox verification pod.',
        'Changing replicas to two creates two API Pods.',
        'Breaking the Service selector removes useful Endpoints.',
        'Fixing the selector restores Endpoints.',
        'The client pod can reach http://kube-tasker-api/health after the Service is fixed.'
      ]
    },
    ...command('Cleanup lesson resources', 'Delete the namespace to remove all resources created in this lesson. The manifest files remain on your machine for review.', 'k delete namespace kubetasker --ignore-not-found')
  ],
  relatedConcepts: ['YAML manifest', 'kubectl apply', 'desired state', 'Deployment', 'replicas', 'Service selector', 'Endpoints', 'ClusterIP Service', 'Kubernetes DNS'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;

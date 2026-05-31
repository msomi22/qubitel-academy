import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Configure KubeTasker at runtime using ConfigMaps, Secrets, environment variables, mounted files, command, and args.';

function command(title, explanation, code, language = 'bash') {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title, language, code }
  ];
}

function createFileWithVim(title, explanation, filename, code) {
  return [
    { type: 'section', title: `${title}: open ${filename} with vim`, content: `Run this command first to create ${filename}. Paste the content shown in the next block, then save with :wq.` },
    { type: 'code', title: `${title}: open ${filename} with vim`, language: 'bash', code: `vim ${filename}` },
    { type: 'section', title: `${title}: copy this content into ${filename}`, content: explanation },
    { type: 'code', title: filename, filename, language: 'yaml', code }
  ];
}

function editFileWithVim(title, explanation, filename, code, blockTitle = 'Changed snippet') {
  return [
    { type: 'section', title: `${title}: open ${filename} with vim`, content: `Run this command first to edit ${filename}. Make only the change described in the next block, then save with :wq.` },
    { type: 'code', title: `${title}: open ${filename} with vim`, language: 'bash', code: `vim ${filename}` },
    { type: 'section', title: `${title}: what to change in ${filename}`, content: explanation },
    { type: 'code', title: blockTitle, filename, language: 'yaml', code }
  ];
}

function jsonExample(title, explanation, filename, code) {
  return [
    { type: 'section', title, content: explanation },
    { type: 'code', title: filename, filename, language: 'json', code }
  ];
}

const configMapYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-api-config
  namespace: kubetasker
data:
  LOG_LEVEL: info
  APP_MODE: learning
  TASK_MODE: learning
  ENABLE_SAMPLE_TASKS: 'true'
  WELCOME_MESSAGE: Welcome to KubeTasker Runtime Configuration`;

const secretYaml = `apiVersion: v1
kind: Secret
metadata:
  name: kube-tasker-api-secret
  namespace: kubetasker
type: Opaque
stringData:
  API_TOKEN: replace-me-in-real-labs`;

const mountedConfigFileYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-file-config
  namespace: kubetasker
data:
  app-config.yaml: |
    taskMode: mounted-file-learning
    welcomeMessage: Mounted config is active
    requireRuntimeConfig: false`;

const imageUpdateSnippet = `# In deployment.yaml, find the existing api container image:
image: msomi22/kubetasker-api:0.1.1

# Change only that image line to:
image: msomi22/kubetasker-api:0.2.0`;

const envConfigSnippet = `# In deployment.yaml, add this env block under the existing api container.
# It must be aligned with image and ports, not placed under metadata or spec.template.spec.
env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: kube-tasker-api-config
        key: LOG_LEVEL
  - name: APP_MODE
    valueFrom:
      configMapKeyRef:
        name: kube-tasker-api-config
        key: APP_MODE
  - name: TASK_MODE
    valueFrom:
      configMapKeyRef:
        name: kube-tasker-api-config
        key: TASK_MODE
  - name: ENABLE_SAMPLE_TASKS
    valueFrom:
      configMapKeyRef:
        name: kube-tasker-api-config
        key: ENABLE_SAMPLE_TASKS
  - name: WELCOME_MESSAGE
    valueFrom:
      configMapKeyRef:
        name: kube-tasker-api-config
        key: WELCOME_MESSAGE
  - name: API_TOKEN
    valueFrom:
      secretKeyRef:
        name: kube-tasker-api-secret
        key: API_TOKEN`;

const mountedConfigSnippet = `# In deployment.yaml, keep the image as msomi22/kubetasker-api:0.2.0.
# Add this volumeMounts block under the existing api container.
# It must be aligned with image, ports, and env.
volumeMounts:
  - name: app-config-file
    mountPath: /etc/kubetasker
    readOnly: true

# Add this volumes block under spec.template.spec.
# It must be aligned with containers.
volumes:
  - name: app-config-file
    configMap:
      name: kube-tasker-file-config`;

const commandArgsPatchYaml = `# Optional: add this under the existing api container only if the question asks for command/args.
# Keep the rest of deployment.yaml unchanged.
command: ['python']
args: ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080']`;

const envConfigStatusJson = `{
  "appMode": "learning",
  "taskMode": "learning",
  "logLevel": "info",
  "sampleTasksEnabled": true,
  "welcomeMessage": "Welcome to KubeTasker Runtime Configuration",
  "apiTokenConfigured": true,
  "mountedConfigLoaded": false,
  "ready": true
}`;

const mountedConfigStatusJson = `{
  "appMode": "learning",
  "taskMode": "mounted-file-learning",
  "logLevel": "info",
  "sampleTasksEnabled": true,
  "welcomeMessage": "Mounted config is active",
  "apiTokenConfigured": true,
  "mountedConfigLoaded": true,
  "ready": true
}`;

const previousQuestionLink = '[previous question](https://academy.qubitel.net/problem/kubetasker-yaml-modify-001)';

const problem = defineLearningProblem({
  id: 'workloads-services-runtime-configuration-introduction-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'Step 4: Runtime Configuration Introduction',
  difficulty: 'Easy',
  estimatedTime: '30 min',
  estimatedTimeSeconds: 1800,
  type: 'learning',
  tags: [
    'kubernetes-ckad',
    'runtime-configuration',
    'configmap',
    'secret',
    'environment-variables',
    'volume-mounts',
    'command-args',
    'readiness',
    'debugging',
    'workloads-services',
    'kubetasker'
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  },
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'In this lesson, you test how msomi22/kubetasker-api:0.2.0 consumes runtime configuration in separate scenarios: first ConfigMap and Secret values through environment variables, then ConfigMap data mounted as a file.',
  starterThought: 'Runtime configuration is easier to understand when each mechanism is tested separately. First prove env-based config works, then prove mounted-file config works.',
  intuition: 'Runtime configuration changes app behavior without rebuilding the image. Kubernetes can inject simple values as environment variables or mount structured config as files inside the container.',
  mentalPicture: 'Think of the app image as the same packaged application. ConfigMaps, Secrets, env, and mounted files are the runtime inputs that change how that application behaves when the Pod starts.',
  patternSignal: 'Use this sequence: update the image to the runtime-config version, test ConfigMap and Secret env injection, then test mounted ConfigMap file injection.',
  invariant: 'Do not replace whole manifests when only one part changes. In CKAD-style work, careful targeted edits are part of the skill.',
  commonMistake: 'Mixing every runtime configuration mechanism into one large edit before proving each mechanism works independently.',
  explanation: 'This lesson introduces ConfigMaps, Secrets, environment variables, mounted config files, command, and args. The Deployment changes because this step uses a KubeTasker app version that supports runtime configuration.',
  stepByStepBreakdown: [
    'Apply namespace.yaml if the kubetasker namespace is missing.',
    'Update deployment.yaml from image msomi22/kubetasker-api:0.1.1 to msomi22/kubetasker-api:0.2.0.',
    'Scenario 1: create configmap.yaml and secret.yaml, inject their keys as environment variables, then verify /config/status.',
    'Scenario 2: create file-config-configmap.yaml, mount it as a file, then verify /config/status again.',
    'Use the existing Service and client Pod only for verification access.',
    'Avoid printing Secret values while still proving the app received the Secret.'
  ],
  finalTakeaway: 'A good CKAD runtime configuration answer changes only the required fields and proves each configuration mechanism from the running app.',
  visualExplanation: 'The flow is image update, env-based ConfigMap and Secret verification, then mounted-file ConfigMap verification.',
  visualWalkthrough: {
    title: 'Runtime configuration scenarios',
    summary: 'Test each runtime configuration mechanism separately with KubeTasker 0.2.0.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'Runtime config scenarios',
      nodes: [
        { id: 'image', label: 'KubeTasker 0.2.0\nruntime-config capable app' },
        { id: 'env', label: 'Scenario 1\nConfigMap + Secret as env' },
        { id: 'mounted', label: 'Scenario 2\nConfigMap mounted as file' },
        { id: 'service', label: 'Existing Service/client Pod\nverification path' },
        { id: 'status', label: '/config/status\nproof from running app' }
      ],
      edges: [
        { from: 'image', to: 'env', label: 'first test env injection' },
        { from: 'env', to: 'status', label: 'verify env values' },
        { from: 'image', to: 'mounted', label: 'then test file mount' },
        { from: 'mounted', to: 'status', label: 'verify mounted file' },
        { from: 'service', to: 'status', label: 'call app endpoint' }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can update an existing Deployment to use msomi22/kubetasker-api:0.2.0.',
        'I can test ConfigMap values injected as environment variables.',
        'I can test Secret values injected as environment variables without printing the Secret value.',
        'I can test ConfigMap data mounted as a file inside the container.',
        'I can verify each runtime configuration mechanism separately from /config/status.',
        'I can edit only the required Deployment fields instead of replacing the whole manifest.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'What you will do next',
      content: `Use KubeTasker 0.2.0 to test runtime configuration in two scenarios: ConfigMap and Secret as environment variables, then ConfigMap as a mounted file. Need the earlier base files? Open the ${previousQuestionLink}.`
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'How to save files in this lesson',
      content: 'For each file, run the vim command shown, press i to enter insert mode, paste or edit the content from the next block, press Esc, type :wq, and press Enter. The same save pattern applies to every file in this lesson.'
    },

    ...command('0. Ensure the namespace exists', 'Start with namespace.yaml only. If you do not have this file yet, open the previous question from the link above and create it there first.', `k apply -f namespace.yaml
k get ns kubetasker`),

    ...editFileWithVim('1. Update the app image for runtime configuration', 'Open deployment.yaml. Find the existing image line from the earlier Deployment and change only that line to msomi22/kubetasker-api:0.2.0. This version is the app build used to test runtime configuration.', 'deployment.yaml', imageUpdateSnippet, 'image change in deployment.yaml'),
    ...command('Apply the image update', 'Apply deployment.yaml after changing only the image line.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 1: ConfigMap and Secret as environment variables',
      content: 'In this scenario, you test simple runtime values passed to KubeTasker through environment variables. Non-sensitive values come from a ConfigMap. The token comes from a Secret. The app should confirm that it received the values without exposing the Secret.'
    },
    ...createFileWithVim('2. Create the ConfigMap manifest', 'This file stores non-sensitive runtime settings that KubeTasker will read through environment variables.', 'configmap.yaml', configMapYaml),
    ...command('Apply the ConfigMap', 'Create or update the non-sensitive runtime settings.', 'k apply -f configmap.yaml'),
    ...command('Verify the ConfigMap exists', 'Confirm the object and keys exist in the correct namespace.', 'k -n kubetasker describe configmap kube-tasker-api-config'),

    ...createFileWithVim('3. Create the Secret manifest', 'This file stores a sensitive runtime value. Verify that the Secret exists, but do not print the token value.', 'secret.yaml', secretYaml),
    ...command('Apply the Secret', 'Create or update the sensitive runtime value.', 'k apply -f secret.yaml'),
    ...command('Verify the Secret exists without printing it', 'Confirm the Secret exists and has data without revealing the value.', `k -n kubetasker get secret kube-tasker-api-secret
k -n kubetasker describe secret kube-tasker-api-secret`),

    ...editFileWithVim('4. Add ConfigMap and Secret env refs to the Deployment', 'Open deployment.yaml again. Add the env block under the existing api container. Keep the image, ports, labels, selector, replicas, and metadata unchanged.', 'deployment.yaml', envConfigSnippet, 'env change in deployment.yaml'),
    ...command('Apply and verify env-based runtime config', 'Apply deployment.yaml, wait for rollout, then use the app endpoint to prove ConfigMap and Secret env injection worked.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k apply -f service.yaml
k apply -f client-pod.yaml
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after Scenario 1', 'At this point the app should show ConfigMap values and confirm the Secret is configured. The mounted config file is not expected yet.', 'config-status-env-response.json', envConfigStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 2: ConfigMap mounted as a file',
      content: 'In this scenario, you test file-based runtime configuration. The ConfigMap key becomes a file inside the container, and KubeTasker reads the mounted file separately from the env values tested in Scenario 1.'
    },
    ...createFileWithVim('5. Create the mounted config file manifest', 'This file becomes /etc/kubetasker/app-config.yaml inside the KubeTasker container.', 'file-config-configmap.yaml', mountedConfigFileYaml),
    ...command('Apply the mounted file ConfigMap', 'Create or update the ConfigMap that will later be mounted as /etc/kubetasker/app-config.yaml.', 'k apply -f file-config-configmap.yaml'),
    ...command('Verify the file ConfigMap exists', 'Confirm the ConfigMap contains app-config.yaml.', 'k -n kubetasker describe configmap kube-tasker-file-config'),

    ...editFileWithVim('6. Add the mounted config file to the Deployment', 'Open deployment.yaml. Keep the image and env refs from Scenario 1. Add only the volumeMounts block under the api container and the volumes block under spec.template.spec.', 'deployment.yaml', mountedConfigSnippet, 'mounted file change in deployment.yaml'),
    ...command('Apply and verify mounted-file runtime config', 'Apply deployment.yaml, wait for rollout, then call /config/status again. This time the app should confirm that the mounted config file was loaded.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker logs deploy/kube-tasker-api`),
    ...jsonExample('Expected /config/status after Scenario 2', 'After the mount is added, the app should still have env-based values and should also confirm that the mounted file was loaded.', 'config-status-mounted-response.json', mountedConfigStatusJson),

    { type: 'divider' },
    ...editFileWithVim('7. Optional command and args amendment', 'Use this only when a question asks you to override the container startup command. Do not replace the Deployment. Add only these fields under the existing api container.', 'deployment.yaml', commandArgsPatchYaml, 'command and args change in deployment.yaml'),
    ...command('Apply and verify command/args amendment', 'If command or args are wrong, /health and /ready will fail and logs will show startup errors.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker logs deploy/kube-tasker-api`),

    {
      type: 'comparison',
      title: 'Debugging pattern',
      items: [
        { label: 'If /config/status does not show env values', content: 'Check the ConfigMap name, Secret name, key names, and env indentation under the api container.' },
        { label: 'If the Secret exists but app says token is missing', content: 'Check secretKeyRef name and key. Do not print the token value.' },
        { label: 'If mountedConfigLoaded is false', content: 'Check the ConfigMap key, volume name, mountPath, and volumes indentation.' },
        { label: 'If the app still shows old values', content: 'Confirm the Deployment rolled out and the Pod was recreated after the manifest change.' },
        { label: 'If the client Pod cannot reach the app', content: 'Check the Service, Endpoints, and client Pod from the previous question.' }
      ]
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Runtime configuration work should be tested one mechanism at a time. First prove env-based ConfigMap and Secret injection, then prove mounted-file configuration, and only change the Deployment fields required for that scenario.'
    }
  ]
});

export default problem;

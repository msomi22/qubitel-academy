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
  TASK_MODE: configmap-env-learning
  ENABLE_SAMPLE_TASKS: 'true'
  WELCOME_MESSAGE: Welcome from ConfigMap env`;

const updatedConfigMapYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-api-config
  namespace: kubetasker
data:
  LOG_LEVEL: debug
  APP_MODE: learning
  TASK_MODE: configmap-env-updated
  ENABLE_SAMPLE_TASKS: 'true'
  WELCOME_MESSAGE: Updated ConfigMap value is active`;

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

const updatedMountedConfigFileYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-file-config
  namespace: kubetasker
data:
  app-config.yaml: |
    taskMode: mounted-file-updated
    welcomeMessage: Mounted config update is active
    requireRuntimeConfig: false`;

const mountedSecretYaml = `apiVersion: v1
kind: Secret
metadata:
  name: kube-tasker-file-secret
  namespace: kubetasker
type: Opaque
stringData:
  api-token.txt: mounted-secret-token-for-lab`;

const imageUpdateSnippet = `# This is the deployment.yaml file from the previous question.
# Change only the image line marked below.
apiVersion: apps/v1
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
          image: msomi22/kubetasker-api:0.2.0 # changed here: v0.2.0 runtime-config app
          ports:
            - containerPort: 8080`;

const directEnvSnippet = `# Find the existing api container in deployment.yaml.
# Add env under the same container, aligned with image and ports.
containers:
  - name: api
    image: msomi22/kubetasker-api:0.2.0
    ports:
      - containerPort: 8080
    env:
      - name: DIRECT_MESSAGE
        value: Direct environment variable is active`;

const updatedDirectEnvSnippet = `# In the same env list, change only DIRECT_MESSAGE.
# Do not move the env block and do not recreate the Deployment.
env:
  - name: DIRECT_MESSAGE
    value: Direct environment variable was updated`;

const configMapEnvSnippet = `# Keep the DIRECT_MESSAGE entry from Scenario 1.
# Append these entries under the same env list.
# Do not create a second env block.
env:
  - name: DIRECT_MESSAGE
    value: Direct environment variable was updated
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
        key: WELCOME_MESSAGE`;

const secretEnvSnippet = `# Keep the existing env entries.
# Append this Secret entry under the same env list.
# Do not print the Secret value during verification.
env:
  - name: API_TOKEN
    valueFrom:
      secretKeyRef:
        name: kube-tasker-api-secret
        key: API_TOKEN`;

const mountedConfigSnippet = `# Find the existing api container in deployment.yaml.
# Add volumeMounts under the same container, aligned with image, ports, and env.
containers:
  - name: api
    image: msomi22/kubetasker-api:0.2.0
    volumeMounts:
      - name: app-config-file
        mountPath: /etc/kubetasker
        readOnly: true

# Then find spec.template.spec and add volumes aligned with containers.
spec:
  template:
    spec:
      containers:
        - name: api
          image: msomi22/kubetasker-api:0.2.0
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config`;

const mountedSecretSnippet = `# Append this item under the existing volumeMounts list.
# Do not create a second volumeMounts block.
volumeMounts:
  - name: app-config-file
    mountPath: /etc/kubetasker
    readOnly: true
  - name: api-secret-file
    mountPath: /etc/kubetasker-secret
    readOnly: true

# Append this item under the existing volumes list.
# Do not print the mounted Secret file content during verification.
volumes:
  - name: app-config-file
    configMap:
      name: kube-tasker-file-config
  - name: api-secret-file
    secret:
      secretName: kube-tasker-file-secret`;

const downwardApiSnippet = `# Append these entries under the existing env list.
# These values come from the Pod metadata/status at runtime.
env:
  - name: POD_NAME
    valueFrom:
      fieldRef:
        fieldPath: metadata.name
  - name: POD_NAMESPACE
    valueFrom:
      fieldRef:
        fieldPath: metadata.namespace
  - name: POD_IP
    valueFrom:
      fieldRef:
        fieldPath: status.podIP
  - name: NODE_NAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName`;

const resourcesAndResourceFieldSnippet = `# Add resources under the existing api container.
# It must be aligned with image, ports, env, and volumeMounts.
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 256Mi

# Then append these entries under the existing env list.
env:
  - name: CPU_LIMIT
    valueFrom:
      resourceFieldRef:
        resource: limits.cpu
  - name: MEMORY_LIMIT
    valueFrom:
      resourceFieldRef:
        resource: limits.memory`;

const commandArgsPatchYaml = `# Add this under the existing api container only if the question asks for command/args.
# Keep the rest of deployment.yaml unchanged.
command: ['python']
args: ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080']`;

const directEnvStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "directMessage": "Direct environment variable is active",
  "ready": true
}`;

const updatedDirectEnvStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "directMessage": "Direct environment variable was updated",
  "ready": true
}`;

const configMapEnvStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "appMode": "learning",
  "taskMode": "configmap-env-learning",
  "logLevel": "info",
  "sampleTasksEnabled": true,
  "welcomeMessage": "Welcome from ConfigMap env",
  "ready": true
}`;

const updatedConfigMapEnvStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "taskMode": "configmap-env-updated",
  "logLevel": "debug",
  "welcomeMessage": "Updated ConfigMap value is active",
  "ready": true
}`;

const secretEnvStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "apiTokenConfigured": true,
  "apiTokenValueExposed": false,
  "ready": true
}`;

const mountedConfigStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "mountedConfigLoaded": true,
  "taskMode": "mounted-file-learning",
  "welcomeMessage": "Mounted config is active",
  "ready": true
}`;

const updatedMountedConfigStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "mountedConfigLoaded": true,
  "taskMode": "mounted-file-updated",
  "welcomeMessage": "Mounted config update is active",
  "ready": true
}`;

const mountedSecretStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "mountedSecretLoaded": true,
  "mountedSecretValueExposed": false,
  "ready": true
}`;

const downwardApiStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "podNameConfigured": true,
  "podNamespace": "kubetasker",
  "podIpConfigured": true,
  "nodeNameConfigured": true
}`;

const resourceFieldStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "cpuLimitConfigured": true,
  "memoryLimitConfigured": true,
  "ready": true
}`;

const previousQuestionLink = '[previous question](https://academy.qubitel.net/problem/kubetasker-yaml-modify-001)';

const problem = defineLearningProblem({
  id: 'workloads-services-runtime-configuration-introduction-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'Step 4: Runtime Configuration Introduction',
  difficulty: 'Easy',
  estimatedTime: '55 min',
  estimatedTimeSeconds: 3300,
  type: 'learning',
  tags: [
    'kubernetes-ckad',
    'runtime-configuration',
    'configmap',
    'secret',
    'environment-variables',
    'volume-mounts',
    'downward-api',
    'resourcefieldref',
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
  scenario: 'In this lesson, you move step by step through the main ways Kubernetes can provide runtime configuration to an application. You start with a direct environment variable, verify it, update it, then build toward ConfigMaps, Secrets, mounted files, Downward API values, resource values, and command/args using KubeTasker v0.2.0.',
  starterThought: 'Change one thing, apply it, wait for rollout, then verify what the running app received. Each scenario builds on the previous one.',
  intuition: 'Runtime configuration changes app behavior without rebuilding the image. Kubernetes can inject values as environment variables, mount data as files, expose Pod metadata, expose resource settings, or override startup command and args.',
  mentalPicture: 'Think of the app image as the packaged application. Runtime configuration is the set of values Kubernetes supplies when the Pod starts.',
  patternSignal: 'Use this sequence for each scenario: prepare any required object, edit only the required part of deployment.yaml, apply, wait for rollout, then verify from the running app.',
  invariant: 'Do not replace whole manifests when only one part changes. In CKAD-style work, careful targeted edits are part of the skill.',
  commonMistake: 'Jumping to ConfigMaps, Secrets, and volumes before first understanding where a simple env value belongs in the Deployment.',
  explanation: 'This lesson introduces Kubernetes runtime configuration mechanisms incrementally. Service and client Pod setup is done only when first needed for verification; later scenarios reuse them unless they are missing.',
  stepByStepBreakdown: [
    'Apply namespace.yaml if the kubetasker namespace is missing.',
    'Update deployment.yaml to the v0.2.0 image.',
    'Scenario 1: add a direct environment variable, create the Service/client verification path, verify it, update it, and verify the change.',
    'Scenario 2: create a ConfigMap, inject keys as environment variables, verify them, update the ConfigMap, restart the Deployment, and verify the new values.',
    'Scenario 3: create a Secret, inject one key as an environment variable, and verify only that it is configured.',
    'Scenario 4: mount ConfigMap data as a file, verify the app loaded it, update the file config, and verify the new mounted-file values.',
    'Scenario 5: mount Secret data as a file and verify only that it is loaded.',
    'Scenario 6: inject Pod metadata using the Downward API.',
    'Scenario 7: inject resource values using resourceFieldRef.',
    'Scenario 8: review command and args as startup configuration.'
  ],
  finalTakeaway: 'A good CKAD runtime configuration answer changes only the required fields and proves each configuration mechanism from the running app.',
  visualExplanation: 'The flow is a guided sequence: start with direct env, then externalize values using ConfigMap and Secret, then move to mounted files and Kubernetes-provided runtime metadata.',
  visualWalkthrough: {
    title: 'Incremental runtime configuration journey',
    summary: 'Each scenario builds on the previous one and reuses the same Service/client verification path after it is created.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'Runtime config learning sequence',
      nodes: [
        { id: 'image', label: 'KubeTasker v0.2.0\nverification-ready app' },
        { id: 'direct', label: '1 Direct env\nvalue in Deployment' },
        { id: 'service', label: 'Service + client Pod\ncreate once for checks' },
        { id: 'cmEnv', label: '2 ConfigMap\nenv values' },
        { id: 'secretEnv', label: '3 Secret\nenv value' },
        { id: 'mountedCm', label: '4 ConfigMap\nmounted file' },
        { id: 'mountedSecret', label: '5 Secret\nmounted file' },
        { id: 'downward', label: '6 Downward API\nPod metadata' },
        { id: 'resources', label: '7 resourceFieldRef\nCPU and memory' },
        { id: 'status', label: '/config/status\nproof from app' }
      ],
      edges: [
        { from: 'image', to: 'direct', label: 'start simple' },
        { from: 'direct', to: 'service', label: 'first app verification' },
        { from: 'service', to: 'cmEnv', label: 'reuse checks' },
        { from: 'cmEnv', to: 'secretEnv', label: 'add sensitive env' },
        { from: 'secretEnv', to: 'mountedCm', label: 'move to files' },
        { from: 'mountedCm', to: 'mountedSecret', label: 'sensitive files' },
        { from: 'mountedSecret', to: 'downward', label: 'Pod identity' },
        { from: 'downward', to: 'resources', label: 'resource values' },
        { from: 'resources', to: 'status', label: 'verify each step' }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can follow a natural runtime-configuration sequence without jumping between unrelated features.',
        'I can update an existing Deployment to use KubeTasker v0.2.0.',
        'I can add, verify, update, and re-verify a direct environment variable.',
        'I can move non-sensitive values into a ConfigMap and verify changes after rollout.',
        'I can use a Secret as an environment variable without printing the Secret value.',
        'I can mount ConfigMap and Secret data as files and verify them safely.',
        'I can inject Pod metadata through the Downward API.',
        'I can inject CPU and memory values through resourceFieldRef.',
        'I can understand command and args as startup configuration.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'What you will do next',
      content: `Build runtime configuration knowledge step by step. Start with one direct env value, verify it from the app, then externalize values using ConfigMaps, Secrets, mounted files, and Kubernetes-provided metadata. Need the earlier base files? Open the ${previousQuestionLink}.`
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'How to save files in this lesson',
      content: 'For each file, run the vim command shown, press i to enter insert mode, paste or edit the content from the next block, press Esc, type :wq, and press Enter. The same save pattern applies to every file in this lesson.'
    },

    ...command('0. Ensure the namespace exists', 'Start with namespace.yaml only. If you do not have this file yet, open the previous question from the link above and create it there first.', `k apply -f namespace.yaml
k get ns kubetasker`),

    ...editFileWithVim('1. Update the app image for runtime configuration', 'Open deployment.yaml. Replace the existing file with the same content, but change only the image line marked with changed here to use v0.2.0. This prepares the app for all verification steps in this lesson.', 'deployment.yaml', imageUpdateSnippet, 'deployment.yaml with image update'),
    ...command('Apply the image update', 'Apply deployment.yaml after changing only the image line.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 1: Direct environment variable',
      content: 'Start with the simplest configuration method. The value lives directly in deployment.yaml, so no ConfigMap or Secret is needed yet.'
    },
    ...editFileWithVim('2. Add a direct env value to the Deployment', 'Open deployment.yaml. Find the api container. Add env under that same container, aligned with image and ports. This shows the exact place where environment variables belong.', 'deployment.yaml', directEnvSnippet, 'direct env change in deployment.yaml'),
    ...command('Apply the direct env change', 'Apply deployment.yaml and wait for the new Pod to roll out.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),
    ...command('Create the verification path once', 'Create or refresh the existing Service and client Pod from the previous question. This is done here because this is the first time the lesson verifies the app through the cluster. Later scenarios reuse this path unless it is missing.', `k apply -f service.yaml
k apply -f client-pod.yaml
k -n kubetasker get svc kube-tasker-api
k -n kubetasker get endpoints kube-tasker-api
k -n kubetasker get pod kube-tasker-client`),
    ...command('Verify the direct env value from the app', 'Call the app through the existing Service/client path and confirm the direct env value reached KubeTasker.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status'),
    ...jsonExample('Expected /config/status after adding direct env', 'The app should show that the direct environment variable was received.', 'config-status-direct-env-response.json', directEnvStatusJson),
    ...editFileWithVim('3. Update the direct env value', 'Open deployment.yaml again. Change only the DIRECT_MESSAGE value. This proves that Deployment env changes require a rollout before the app sees the new value.', 'deployment.yaml', updatedDirectEnvSnippet, 'direct env update in deployment.yaml'),
    ...command('Apply and verify the updated direct env value', 'Apply deployment.yaml again, wait for rollout, then call the same endpoint. The Service and client Pod are not changed, so do not recreate their YAML.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after updating direct env', 'The app should now show the updated direct value.', 'config-status-direct-env-updated-response.json', updatedDirectEnvStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 2: ConfigMap as environment variables',
      content: 'Now externalize non-sensitive values. Instead of writing every value directly inside the Deployment, store them in a ConfigMap and reference those keys from env.'
    },
    ...createFileWithVim('4. Create the ConfigMap manifest', 'This file stores non-sensitive runtime settings that KubeTasker will read through environment variables.', 'configmap.yaml', configMapYaml),
    ...command('Apply and inspect the ConfigMap', 'Create the ConfigMap and confirm the keys exist in the kubetasker namespace.', `k apply -f configmap.yaml
k -n kubetasker describe configmap kube-tasker-api-config`),
    ...editFileWithVim('5. Add ConfigMap env refs to the Deployment', 'Open deployment.yaml. Keep DIRECT_MESSAGE from Scenario 1. Append the ConfigMap entries under the same env list. Do not create a second env block.', 'deployment.yaml', configMapEnvSnippet, 'ConfigMap env change in deployment.yaml'),
    ...command('Apply and verify ConfigMap env values', 'Apply deployment.yaml, wait for rollout, then verify the ConfigMap values from the app. The Service and client Pod are reused.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after ConfigMap env', 'The app should show the non-sensitive values from the ConfigMap.', 'config-status-configmap-env-response.json', configMapEnvStatusJson),
    ...createFileWithVim('6. Update the ConfigMap values', 'Edit configmap.yaml and change only the values shown here. This proves that the source object can change independently from the Deployment.', 'configmap.yaml', updatedConfigMapYaml),
    ...command('Apply the ConfigMap update and restart the app Pods', 'Environment variables are set when the Pod starts. After changing a ConfigMap used as env, restart the Deployment so the app receives the new values.', `k apply -f configmap.yaml
k -n kubetasker rollout restart deploy/kube-tasker-api
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after ConfigMap update', 'The app should show the updated ConfigMap values after the Deployment restart.', 'config-status-configmap-env-updated-response.json', updatedConfigMapEnvStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 3: Secret as environment variable',
      content: 'Use a Secret when the value is sensitive. The app can prove the value exists, but the lesson must not print the Secret value.'
    },
    ...createFileWithVim('7. Create the Secret manifest', 'This file stores a sensitive runtime value. Verify that the Secret exists, but do not print or decode the token value.', 'secret.yaml', secretYaml),
    ...command('Apply and inspect the Secret safely', 'Create the Secret and confirm it exists without revealing the value.', `k apply -f secret.yaml
k -n kubetasker get secret kube-tasker-api-secret
k -n kubetasker describe secret kube-tasker-api-secret`),
    ...editFileWithVim('8. Add the Secret env ref to the Deployment', 'Open deployment.yaml. Append the Secret entry under the existing env list. Keep the direct env and ConfigMap env entries.', 'deployment.yaml', secretEnvSnippet, 'Secret env change in deployment.yaml'),
    ...command('Apply and verify Secret env value safely', 'Apply deployment.yaml, wait for rollout, then verify only that the app received a token. Do not print the Secret value.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after Secret env', 'The app should confirm that the token is configured without exposing the token itself.', 'config-status-secret-env-response.json', secretEnvStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 4: ConfigMap mounted as a file',
      content: 'Some apps read config from files instead of env vars. Here, a ConfigMap key becomes a file inside the container.'
    },
    ...createFileWithVim('9. Create the mounted ConfigMap manifest', 'This file becomes /etc/kubetasker/app-config.yaml inside the KubeTasker container.', 'file-config-configmap.yaml', mountedConfigFileYaml),
    ...command('Apply and inspect the mounted ConfigMap', 'Create the ConfigMap and confirm it contains app-config.yaml.', `k apply -f file-config-configmap.yaml
k -n kubetasker describe configmap kube-tasker-file-config`),
    ...editFileWithVim('10. Add the mounted ConfigMap file to the Deployment', 'Open deployment.yaml. Add volumeMounts under the api container, then add volumes under spec.template.spec. Keep the existing env list unchanged.', 'deployment.yaml', mountedConfigSnippet, 'mounted ConfigMap change in deployment.yaml'),
    ...command('Apply and verify mounted ConfigMap config', 'Apply deployment.yaml, wait for rollout, then confirm the app loaded the mounted config file.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready`),
    ...jsonExample('Expected /config/status after mounted ConfigMap', 'The app should confirm that the mounted ConfigMap file was loaded.', 'config-status-mounted-configmap-response.json', mountedConfigStatusJson),
    ...createFileWithVim('11. Update the mounted ConfigMap file', 'Edit file-config-configmap.yaml and change only the file content. This shows how file-based config can change separately from the Deployment.', 'file-config-configmap.yaml', updatedMountedConfigFileYaml),
    ...command('Apply and verify the mounted ConfigMap update', 'Apply the ConfigMap update. Then restart the Deployment to make the app reload the mounted-file settings for this lesson.', `k apply -f file-config-configmap.yaml
k -n kubetasker rollout restart deploy/kube-tasker-api
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after mounted ConfigMap update', 'The app should show the updated mounted-file values after the restart.', 'config-status-mounted-configmap-updated-response.json', updatedMountedConfigStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 5: Secret mounted as a file',
      content: 'Secrets can also be mounted as files. This is common for tokens, certificates, keys, and credentials.'
    },
    ...createFileWithVim('12. Create the mounted Secret manifest', 'This Secret will be mounted as a file inside the container. The Secret value should not be printed during verification.', 'file-secret.yaml', mountedSecretYaml),
    ...command('Apply and inspect the mounted Secret safely', 'Create the Secret and confirm it exists. Do not decode or print the Secret value.', `k apply -f file-secret.yaml
k -n kubetasker get secret kube-tasker-file-secret
k -n kubetasker describe secret kube-tasker-file-secret`),
    ...editFileWithVim('13. Add the mounted Secret file to the Deployment', 'Open deployment.yaml. Append one item under the existing volumeMounts list and one item under the existing volumes list. Do not create duplicate blocks.', 'deployment.yaml', mountedSecretSnippet, 'mounted Secret change in deployment.yaml'),
    ...command('Apply and verify mounted Secret config safely', 'Apply deployment.yaml, wait for rollout, then verify only that the Secret file was loaded.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after mounted Secret', 'The app should confirm that the mounted Secret file was loaded without exposing the Secret content.', 'config-status-mounted-secret-response.json', mountedSecretStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 6: Downward API values',
      content: 'The Downward API lets the app receive information about its own Pod, such as Pod name, namespace, Pod IP, and node name.'
    },
    ...editFileWithVim('14. Add Downward API env values to the Deployment', 'Open deployment.yaml. Append these entries under the existing env list. These values are filled by Kubernetes when the Pod starts.', 'deployment.yaml', downwardApiSnippet, 'Downward API change in deployment.yaml'),
    ...command('Apply and verify Downward API values', 'Apply deployment.yaml, wait for rollout, then verify that the app received Pod metadata.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after Downward API', 'The app should confirm that Pod metadata was injected.', 'config-status-downward-api-response.json', downwardApiStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 7: Resource field references',
      content: 'resourceFieldRef lets the app receive selected CPU or memory request/limit values. This is useful when apps tune behavior based on assigned resources.'
    },
    ...editFileWithVim('15. Add resources and resourceFieldRef values', 'Open deployment.yaml. Add resources under the api container, then append CPU_LIMIT and MEMORY_LIMIT under the existing env list.', 'deployment.yaml', resourcesAndResourceFieldSnippet, 'resourceFieldRef change in deployment.yaml'),
    ...command('Apply and verify resource field values', 'Apply deployment.yaml, wait for rollout, then verify that resource values are available to the app.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
    ...jsonExample('Expected /config/status after resourceFieldRef', 'The app should confirm that CPU and memory values are configured.', 'config-status-resourcefield-response.json', resourceFieldStatusJson),

    { type: 'divider' },
    {
      type: 'section',
      title: 'Scenario 8: Command and args',
      content: 'command and args are startup configuration. They do not inject values like ConfigMaps or Secrets, but they change how the container process starts.'
    },
    ...editFileWithVim('16. Optional command and args amendment', 'Use this only when a question asks you to override the container startup command. Do not replace the Deployment. Add only these fields under the existing api container.', 'deployment.yaml', commandArgsPatchYaml, 'command and args change in deployment.yaml'),
    ...command('Apply and verify command/args amendment', 'If command or args are wrong, /health and /ready will fail and logs will show startup errors.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker logs deploy/kube-tasker-api`),

    {
      type: 'comparison',
      title: 'Debugging pattern',
      items: [
        { label: 'If direct env is missing', content: 'Check that env is under the api container, aligned with image and ports.' },
        { label: 'If ConfigMap values do not change', content: 'Remember that env values are captured when the Pod starts. Restart or roll the Deployment after changing the ConfigMap.' },
        { label: 'If the Secret exists but app says token is missing', content: 'Check secretKeyRef name and key. Do not print the token value.' },
        { label: 'If mounted config is not loaded', content: 'Check the ConfigMap key, volume name, mountPath, and volumes indentation.' },
        { label: 'If Downward API values are missing', content: 'Check fieldPath spelling and make sure the entries are under env.' },
        { label: 'If resource values are missing', content: 'Check that resources are set on the same container and resourceFieldRef points to the correct resource.' }
      ]
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Kubernetes runtime configuration is easiest to learn in sequence. Start with direct env, then move to ConfigMap env, Secret env, mounted ConfigMap files, mounted Secret files, Downward API, resourceFieldRef, and command/args. Reuse Service and client verification unless those resources change.'
    }
  ]
});

export default problem;

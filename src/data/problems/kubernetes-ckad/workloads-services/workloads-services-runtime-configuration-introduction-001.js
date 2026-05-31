import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Configure KubeTasker at runtime using ConfigMaps, Secrets, environment variables, mounted files, command, and args.';

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
    taskMode: learning
    welcomeMessage: Mounted config is active
    requireRuntimeConfig: false`;

const deploymentRuntimeConfigPatchYaml = `# In deployment.yaml, update the existing api container.
# Keep metadata, selector, labels, replicas, and ports unchanged.
# First, update the image so the app version supports runtime configuration:
image: msomi22/kubetasker-api:0.2.0

# Then add this env block under the same api container:
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
        key: API_TOKEN

# Add this volumeMounts block under the same api container:
volumeMounts:
  - name: app-config-file
    mountPath: /etc/kubetasker
    readOnly: true

# Add this volumes block under spec.template.spec:
volumes:
  - name: app-config-file
    configMap:
      name: kube-tasker-file-config`;

const commandArgsPatchYaml = `# Optional: add this under the existing api container only if the question asks for command/args.
# Keep the rest of deployment.yaml unchanged.
command: ['python']
args: ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080']`;

const configStatusJson = `{
  "appMode": "learning",
  "taskMode": "learning",
  "logLevel": "info",
  "sampleTasksEnabled": true,
  "welcomeMessage": "Welcome to KubeTasker Runtime Configuration",
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
  starterThought: 'Runtime configuration is a controlled change to how the app starts and behaves. Update only the fields that change, then verify the app from inside the cluster.',
  intuition: 'Runtime configuration changes app behavior without rebuilding the image. Kubernetes stores, injects, or mounts values; KubeTasker proves those values are active through /config/status, /ready, /tasks/stats, root output, and logs.',
  mentalPicture: 'Think of runtime configuration as app settings supplied at Pod startup. ConfigMaps hold non-sensitive values, Secrets hold sensitive values, environment variables inject simple values, and mounted files inject structured config.',
  patternSignal: 'Use this sequence: keep the namespace, create configuration objects, update the Deployment image and runtime fields, then verify through the existing Service and client Pod.',
  invariant: 'Do not replace whole manifests when only one part changes. In CKAD-style work, careful targeted edits are part of the skill.',
  commonMistake: 'Replacing the whole Deployment or recreating unchanged manifests instead of updating only the image and runtime-configuration fields.',
  explanation: 'This lesson introduces ConfigMaps, Secrets, environment variables, mounted config files, command, and args. The Deployment changes because this step uses a KubeTasker app version that supports runtime configuration.',
  stepByStepBreakdown: [
    'Apply namespace.yaml if the kubetasker namespace is missing.',
    'Create the new runtime-configuration files: configmap.yaml, secret.yaml, and file-config-configmap.yaml.',
    'Update only the required parts of deployment.yaml: the image, env, volumeMounts, and volumes.',
    'Apply the new config objects and the amended Deployment.',
    'Use the existing Service and client Pod to verify app behavior after the Deployment is updated.',
    'Avoid printing Secret values while still proving the app received the Secret.'
  ],
  finalTakeaway: 'A good CKAD runtime configuration answer is not just valid YAML. It changes only the required fields and proves from the running app that configuration was consumed safely.',
  visualExplanation: 'The flow is namespace, new config objects, targeted Deployment amendment, then app verification through Service and client Pod.',
  visualWalkthrough: {
    title: 'Runtime configuration verification loop',
    summary: 'Create config objects, amend the Deployment, then verify from KubeTasker.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'Runtime config to verified app behavior',
      nodes: [
        { id: 'namespace', label: 'Existing namespace\napply namespace.yaml if missing' },
        { id: 'config', label: 'New config objects\nConfigMap Secret file config' },
        { id: 'deploy', label: 'Amended deployment.yaml\nimage env volumeMounts volumes' },
        { id: 'service', label: 'Service and client Pod\nverify access path' },
        { id: 'app', label: 'KubeTasker endpoint\napp consumed config' },
        { id: 'logs', label: 'KubeTasker logs\nsafe startup evidence' }
      ],
      edges: [
        { from: 'namespace', to: 'config', label: 'namespace must exist first' },
        { from: 'config', to: 'deploy', label: 'referenced by Pod template' },
        { from: 'deploy', to: 'service', label: 'Service routes to updated Pods' },
        { from: 'service', to: 'app', label: 'call app endpoints' },
        { from: 'deploy', to: 'logs', label: 'debug startup' }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can create runtime configuration objects with ConfigMap and Secret.',
        'I can update only the required Deployment fields instead of replacing the whole manifest.',
        'I can inject non-sensitive values using env from ConfigMap keys.',
        'I can inject sensitive values using env from Secret keys without printing the Secret value.',
        'I can mount ConfigMap data as a file inside the container.',
        'I can verify app behavior from /config/status, /ready, /tasks/stats, /, and logs.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'What you will do next',
      content: `Create runtime configuration, update the KubeTasker Deployment to the runtime-config version, then verify the app from inside the cluster. Need the earlier base files? Open the ${previousQuestionLink}.`
    },

    ...command('0. Ensure the namespace exists', 'Start with namespace.yaml only. If you do not have this file yet, open the previous question from the link above and create it there first.', `k apply -f namespace.yaml
k get ns kubetasker`),

    ...yamlExample('1. Create the ConfigMap manifest', 'Create configmap.yaml. This file stores non-sensitive runtime settings that KubeTasker will read through environment variables.', 'configmap.yaml', configMapYaml),
    ...command('Apply the ConfigMap', 'Create or update the non-sensitive runtime settings.', 'k apply -f configmap.yaml'),
    ...command('Verify the ConfigMap exists', 'Confirm the object and keys exist in the correct namespace.', 'k -n kubetasker describe configmap kube-tasker-api-config'),

    ...yamlExample('2. Create the Secret manifest', 'Create secret.yaml. This file stores a sensitive runtime value. Verify that the Secret exists, but do not print the token value.', 'secret.yaml', secretYaml),
    ...command('Apply the Secret', 'Create or update the sensitive runtime value.', 'k apply -f secret.yaml'),
    ...command('Verify the Secret exists without printing it', 'Confirm the Secret exists and has data without revealing the value.', `k -n kubetasker get secret kube-tasker-api-secret
k -n kubetasker describe secret kube-tasker-api-secret`),

    ...yamlExample('3. Create the mounted config file manifest', 'Create file-config-configmap.yaml. This file becomes a config file mounted inside the KubeTasker container.', 'file-config-configmap.yaml', mountedConfigFileYaml),
    ...command('Apply the mounted file ConfigMap', 'Create or update the ConfigMap that will later be mounted as /etc/kubetasker/app-config.yaml.', 'k apply -f file-config-configmap.yaml'),
    ...command('Verify the file ConfigMap exists', 'Confirm the ConfigMap contains app-config.yaml.', 'k -n kubetasker describe configmap kube-tasker-file-config'),

    ...yamlExample('4. Update the existing Deployment manifest', 'Open deployment.yaml. Do not replace the whole file. Update the image, then add only the env, volumeMounts, and volumes blocks shown here in the correct YAML locations.', 'deployment-runtime-config-snippet.yaml', deploymentRuntimeConfigPatchYaml),
    ...command('Apply the updated Deployment', 'Apply deployment.yaml after adding only the runtime-configuration fields shown above.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),
    ...command('Verify the Deployment wiring', 'Confirm the Deployment has the new image, expected env refs, Secret ref, volume, and mount.', `k -n kubetasker describe deploy kube-tasker-api
k -n kubetasker get pods -l app=kube-tasker-api -o wide`),

    ...command('Ensure Service and client Pod exist for verification', `Use service.yaml and client-pod.yaml from the ${previousQuestionLink} only if those resources are missing. Their YAML does not change in this lesson.`, `k apply -f service.yaml
k apply -f client-pod.yaml
k -n kubetasker get svc kube-tasker-api
k -n kubetasker get endpoints kube-tasker-api
k -n kubetasker get pod kube-tasker-client`),
    ...command('Verify KubeTasker from the client Pod', 'Use the client Pod to call the KubeTasker Service DNS name and confirm runtime configuration was consumed.', `k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/tasks/stats
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/`),
    ...command('Verify KubeTasker startup logs', 'Logs should safely confirm runtime config loading without exposing Secret values.', 'k -n kubetasker logs deploy/kube-tasker-api'),

    ...jsonExample('Expected /config/status response', 'This is the kind of safe app-level proof expected after the Deployment is updated and the Service/client path is working. Secret values are never shown.', 'config-status-response.json', configStatusJson),

    ...command('Later: apply config changes to the confirmed app', 'Use rollout restart only after the Deployment is already confirmed and the app consumes runtime configuration.', `k apply -f configmap.yaml
k -n kubetasker rollout restart deploy/kube-tasker-api
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),

    ...yamlExample('5. Optional command and args amendment', 'Use this only when the question asks for command/args. Do not replace the Deployment. Add only these fields under the existing api container.', 'command-args-snippet.yaml', commandArgsPatchYaml),
    ...command('Apply and verify command/args amendment', 'If command or args are wrong, /health and /ready will fail and logs will show startup errors.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker logs deploy/kube-tasker-api`),

    {
      type: 'comparison',
      title: 'Debugging pattern',
      items: [
        { label: 'If app verification endpoints are missing', content: 'First confirm the Deployment was updated and rolled out.' },
        { label: 'If a config object is missing', content: 'Use get/describe first, then re-apply the new YAML in the correct namespace.' },
        { label: 'If the object exists but the app shows old values', content: 'Restart or roll the Deployment, then call /config/status again.' },
        { label: 'If Secret exists but app says token is missing', content: 'Check secretKeyRef name/key in the Deployment. Do not print the token value.' },
        { label: 'If mountedConfigLoaded is false', content: 'Check the ConfigMap key, volume name, mountPath, and the path KubeTasker reads.' },
        { label: 'If Pod runs but /ready fails', content: 'Use /config/status and logs to find which required runtime configuration is invalid.' }
      ]
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Runtime configuration work should preserve what already works. Create the new config files, update only the required Deployment fields, then verify from the running app without leaking Secret values.'
    }
  ]
});

export default problem;

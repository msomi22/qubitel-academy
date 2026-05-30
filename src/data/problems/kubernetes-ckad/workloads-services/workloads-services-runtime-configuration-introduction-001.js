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

const namespaceYaml = `apiVersion: v1
kind: Namespace
metadata:
  name: kubetasker
  # KubeTasker resources in this quiz live in one namespace so Service DNS,
  # ConfigMap references, Secret references, and Pod lookup commands all match.`;

const configMapYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-api-config
  namespace: kubetasker
data:
  # Used by KubeTasker to set runtime log verbosity.
  # Verify from app: /config/status should show logLevel: info.
  LOG_LEVEL: info

  # Used by KubeTasker to enable learning-mode behavior for this quiz.
  # Verify from app: /config/status should show appMode: learning.
  APP_MODE: learning

  # Used by KubeTasker to select task behavior for this quiz.
  # Verify from app: /config/status should show taskMode: learning.
  TASK_MODE: learning

  # Used by KubeTasker to decide whether sample/demo tasks are loaded.
  # Verify from app: /tasks/stats should show sample task behavior.
  ENABLE_SAMPLE_TASKS: 'true'

  # Used by KubeTasker as visible runtime output.
  # Verify from app: /config/status or / should show this message.
  WELCOME_MESSAGE: Welcome to KubeTasker Runtime Configuration`;

const secretYaml = `apiVersion: v1
kind: Secret
metadata:
  name: kube-tasker-api-secret
  namespace: kubetasker
type: Opaque
stringData:
  # Used by KubeTasker for token-aware/protected demo behavior.
  # Verify from app: /config/status should show apiTokenConfigured: true.
  # Do not verify by printing this value from the Secret or container env.
  API_TOKEN: replace-me-in-real-labs`;

const mountedConfigFileYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-file-config
  namespace: kubetasker
data:
  # Mounted into the container as /etc/kubetasker/app-config.yaml.
  # Used by KubeTasker when it needs structured file-based runtime config.
  # Verify from app: /config/status should show mountedConfigLoaded: true.
  app-config.yaml: |
    taskMode: learning
    welcomeMessage: Mounted config is active
    requireRuntimeConfig: false`;

const deploymentYaml = `apiVersion: apps/v1
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
          image: msomi22/kubetasker-api:0.2.0
          ports:
            - containerPort: 8080
          env:
            # KubeTasker reads this from the process environment.
            # Verify from app: /config/status.logLevel.
            - name: LOG_LEVEL
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: LOG_LEVEL

            # KubeTasker reads this to enable learning behavior.
            # Verify from app: /config/status.appMode.
            - name: APP_MODE
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: APP_MODE

            # KubeTasker reads this to choose task behavior.
            # Verify from app: /config/status.taskMode.
            - name: TASK_MODE
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: TASK_MODE

            # KubeTasker reads this to decide whether sample tasks should load.
            # Verify from app: /config/status.sampleTasksEnabled and /tasks/stats.
            - name: ENABLE_SAMPLE_TASKS
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: ENABLE_SAMPLE_TASKS

            # KubeTasker reads this as visible runtime output.
            # Verify from app: /config/status.welcomeMessage or /.
            - name: WELCOME_MESSAGE
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: WELCOME_MESSAGE

            # KubeTasker reads this as a sensitive token.
            # Verify from app: /config/status.apiTokenConfigured only.
            # Never print the token value.
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN
          volumeMounts:
            # KubeTasker reads /etc/kubetasker/app-config.yaml from this mount.
            # Verify from app: /config/status.mountedConfigLoaded.
            - name: app-config-file
              mountPath: /etc/kubetasker
              readOnly: true
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config`;

const serviceYaml = `apiVersion: v1
kind: Service
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  selector:
    app: kube-tasker-api
  ports:
    - name: http
      port: 80
      targetPort: 8080
  # Used by the verification client to reach KubeTasker by DNS name.
  # Verify from app: wget http://kube-tasker-api/config/status from inside the namespace.`;

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
      command: ['sh', '-c', 'sleep 3600']
  # Used only as a simple in-cluster client for app verification commands.
  # Verify from app: exec into this Pod and call the KubeTasker Service.`;

const commandArgsYaml = `apiVersion: apps/v1
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
          image: msomi22/kubetasker-api:0.2.0
          # Overrides the image startup command.
          # Used by KubeTasker only when this is the supported app startup shape.
          # Verify from app: /health and /ready should still respond.
          command: ['python']
          args: ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080']
          ports:
            - containerPort: 8080
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
          volumeMounts:
            - name: app-config-file
              mountPath: /etc/kubetasker
              readOnly: true
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config`;

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
  scenario: 'KubeTasker now runs as a workload and is reachable through a Service. This quiz uses runtime configuration to change app behavior, then verifies the result from the running app.',
  starterThought: 'Do not only check that a Kubernetes object exists. Apply the manifests, confirm the Deployment uses the image shown in the YAML, then verify behavior from KubeTasker endpoints and logs.',
  intuition: 'Runtime configuration is useful only when the app consumes it. Kubernetes stores, injects, or mounts values; KubeTasker proves those values are active through /config/status, /ready, /tasks/stats, root output, and logs.',
  mentalPicture: 'Think of each manifest as a contract: comments say what KubeTasker expects, kubectl applies the contract, and app endpoints prove the contract is working.',
  patternSignal: 'Use this sequence: create config objects, deploy the app, expose the Service, then verify from KubeTasker.',
  invariant: 'For this quiz, runnable KubeTasker examples use the image shown in the Deployment manifest unless a step explicitly marks a comparison that does not require newly added runtime-configuration features.',
  commonMistake: 'Restarting or copying an older KubeTasker Deployment for this quiz, then wondering why runtime-config behavior is missing.',
  explanation: 'This quiz uses YAML comments plus kubectl apply and verification commands to show how KubeTasker consumes ConfigMaps, Secrets, environment variables, mounted files, command, args, Services, and readiness configuration.',
  stepByStepBreakdown: [
    'Read the comments inside the YAML to see which KubeTasker behavior depends on each field.',
    'Apply ConfigMap, Secret, and mounted-file ConfigMap resources first.',
    'Apply the KubeTasker Deployment with the image shown in the manifest.',
    'Apply the Service and verification client Pod.',
    'Verify from KubeTasker endpoints or logs that the app consumed the configuration.',
    'Only use rollout restart later when the Deployment image has already been confirmed.'
  ],
  finalTakeaway: 'A good CKAD runtime configuration answer is not just valid YAML. It is valid YAML plus proof from the running app that the configuration was consumed safely.',
  visualExplanation: 'The flow is config objects, Deployment, Service/client, then app verification.',
  visualWalkthrough: {
    title: 'Runtime configuration verification loop',
    summary: 'Apply config objects first, run the app, then verify from KubeTasker.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'YAML to verified app behavior',
      nodes: [
        { id: 'config', label: 'Config objects\nConfigMap Secret files' },
        { id: 'deploy', label: 'Deployment\nKubeTasker app' },
        { id: 'service', label: 'Service and client\ncluster access' },
        { id: 'app', label: 'KubeTasker endpoint\napp consumed config' },
        { id: 'logs', label: 'KubeTasker logs\nsafe startup evidence' }
      ],
      edges: [
        { from: 'config', to: 'deploy', label: 'referenced by Pod template' },
        { from: 'deploy', to: 'service', label: 'selected by labels' },
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
        'I can read YAML comments to understand what KubeTasker uses from each manifest.',
        'I can apply each manifest with kubectl.',
        'I can verify Kubernetes wiring with get and describe commands.',
        'I can verify the Deployment is using the image shown in the manifest.',
        'I can verify app behavior from /config/status, /ready, /tasks/stats, /, and logs.',
        'I can avoid leaking Secret values while still proving the app received a Secret.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Quiz image rule',
      content: 'Use the image shown in the Deployment manifest for runnable KubeTasker examples in this quiz. Only use another image if a step explicitly says it is a comparison and the comparison does not require the newly added runtime-configuration features.'
    },
    ...yamlExample('1. Namespace manifest', 'The namespace keeps all KubeTasker runtime configuration resources together. Read the YAML comments, then apply it.', 'namespace.yaml', namespaceYaml),
    ...command('Apply the namespace', 'Create the namespace used by all later manifests.', 'k apply -f namespace.yaml'),
    ...command('Verify the namespace', 'Kubernetes proof: the namespace exists and later objects should be created inside it.', 'k get ns kubetasker'),

    ...yamlExample('2. ConfigMap manifest', 'The comments inside this YAML show which values KubeTasker uses.', 'configmap.yaml', configMapYaml),
    ...command('Apply the ConfigMap', 'Create or update the non-sensitive runtime settings. At this stage, only verify the Kubernetes object; app verification comes after the Deployment is running.', 'k apply -f configmap.yaml'),
    ...command('Verify the ConfigMap exists', 'Kubernetes proof: confirm the object and keys exist in the correct namespace.', 'k -n kubetasker describe configmap kube-tasker-api-config'),

    ...yamlExample('3. Secret manifest', 'The Secret provides sensitive runtime input. The YAML comments show how KubeTasker uses it and how to verify it later without printing the token.', 'secret.yaml', secretYaml),
    ...command('Apply the Secret', 'Create or update the sensitive value. At this stage, only verify the Kubernetes object; app verification comes after the Deployment is running.', 'k apply -f secret.yaml'),
    ...command('Verify the Secret exists without printing it', 'Kubernetes proof: confirm the Secret exists and has data without revealing the value.', `k -n kubetasker get secret kube-tasker-api-secret
k -n kubetasker describe secret kube-tasker-api-secret`),

    ...yamlExample('4. Mounted config file manifest', 'This ConfigMap becomes a file inside the container. KubeTasker reads it after the Deployment mounts it.', 'file-config-configmap.yaml', mountedConfigFileYaml),
    ...command('Apply the mounted file ConfigMap', 'Create or update the ConfigMap that will later be mounted as /etc/kubetasker/app-config.yaml.', 'k apply -f file-config-configmap.yaml'),
    ...command('Verify the file ConfigMap exists', 'Kubernetes proof: confirm the ConfigMap contains app-config.yaml.', 'k -n kubetasker describe configmap kube-tasker-file-config'),

    ...yamlExample('5. Deployment manifest', 'The Deployment is the point where app verification becomes valid because it wires the image, ConfigMap values, Secret values, and mounted config file into the Pod.', 'deployment.yaml', deploymentYaml),
    ...command('Apply the Deployment', 'Create or update the KubeTasker API Deployment.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),
    ...command('Verify the Deployment image and wiring', 'Kubernetes proof: confirm the Deployment uses the expected image and has the expected selector, labels, env refs, Secret refs, volume, and mount.', `k -n kubetasker get deploy kube-tasker-api -o=jsonpath='{.spec.template.spec.containers[0].image}{"\\n"}'
k -n kubetasker describe deploy kube-tasker-api
k -n kubetasker get pods -l app=kube-tasker-api -o wide`),

    ...yamlExample('6. Service manifest', 'The Service gives in-cluster clients a stable DNS name for KubeTasker. The comments show how the verification client will use it.', 'service.yaml', serviceYaml),
    ...command('Apply the Service', 'Create the stable in-cluster access point for KubeTasker.', 'k apply -f service.yaml'),
    ...command('Verify the Service selects the Pod', 'Kubernetes proof: endpoints should point to the KubeTasker Pod created by the Deployment.', `k -n kubetasker get svc kube-tasker-api
k -n kubetasker get endpoints kube-tasker-api`),

    ...yamlExample('7. Verification client manifest', 'The client Pod exists only so learners can call the KubeTasker Service from inside the cluster.', 'client-pod.yaml', clientPodYaml),
    ...command('Apply the verification client', 'Create a simple client Pod for in-cluster app verification.', `k apply -f client-pod.yaml
k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s`),
    ...command('Verify KubeTasker from the client Pod', 'App proof: now that the Service and app are running, use the Service DNS name to verify runtime config behavior.', `k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/tasks/stats
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/`),
    ...command('Verify KubeTasker startup logs', 'App proof: logs should safely confirm runtime config loading without exposing Secret values.', 'k -n kubetasker logs deploy/kube-tasker-api'),

    ...jsonExample('Expected /config/status response', 'This is the kind of safe app-level proof expected after the Deployment, Service, and client Pod are applied. Secret values are never shown.', 'config-status-response.json', configStatusJson),

    ...command('Later: apply config changes to the confirmed app', 'Use rollout restart only after the Deployment image is already confirmed. This prevents restarting an older app image that cannot prove the runtime-config behavior required by this quiz.', `k apply -f configmap.yaml
k -n kubetasker get deploy kube-tasker-api -o=jsonpath='{.spec.template.spec.containers[0].image}{"\\n"}'
k -n kubetasker rollout restart deploy/kube-tasker-api
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),

    ...yamlExample('8. Optional command and args override', 'Use this only when the app image supports the startup shape. The manifest is a full Deployment so it remains valid if copied.', 'command-args-deployment.yaml', commandArgsYaml),
    ...command('Apply the command/args Deployment', 'Replace the Deployment with the supported command/args startup form while keeping the required image for this quiz.', `k apply -f command-args-deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),
    ...command('Verify command/args from the app', 'App proof: the API must still start. If command or args are wrong, /health and /ready will fail and logs will show startup errors.', `k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker logs deploy/kube-tasker-api`),

    {
      type: 'comparison',
      title: 'Debugging pattern',
      items: [
        { label: 'If app verification endpoints are missing', content: 'First confirm the Deployment image matches the image shown in the manifest.' },
        { label: 'If Kubernetes object is missing', content: 'Use get/describe first, then re-apply the YAML in the correct namespace.' },
        { label: 'If the object exists but the app shows old values', content: 'Confirm the Deployment image, restart or roll the Deployment, then call /config/status again.' },
        { label: 'If Secret exists but app says token is missing', content: 'Check secretKeyRef name/key in the Deployment. Do not print the token value.' },
        { label: 'If mountedConfigLoaded is false', content: 'Check the ConfigMap key, volume name, mountPath, and the path KubeTasker reads.' },
        { label: 'If Pod runs but /ready fails', content: 'Use /config/status and logs to find which required runtime configuration is invalid.' }
      ]
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'For this quiz style, the YAML carries its own explanation through comments. Apply the config objects, run the Deployment using the image shown in the manifest, then verify from the app. Only use another image for an explicit comparison that does not depend on newly added runtime-configuration features.'
    }
  ]
});

export default problem;

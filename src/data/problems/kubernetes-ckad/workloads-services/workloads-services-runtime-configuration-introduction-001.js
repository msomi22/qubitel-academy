import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'Explain how KubeTasker uses Kubernetes runtime configuration through ConfigMaps, Secrets, environment variables, mounted files, command, and args.';

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

const configMapYaml = `apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-tasker-api-config
  namespace: kubetasker
data:
  LOG_LEVEL: info
  TASK_MODE: learning`;

const secretYaml = `apiVersion: v1
kind: Secret
metadata:
  name: kube-tasker-api-secret
  namespace: kubetasker
type: Opaque
stringData:
  API_TOKEN: replace-me-in-real-labs`;

const configMapEnvYaml = `env:
  - name: LOG_LEVEL
    valueFrom:
      configMapKeyRef:
        name: kube-tasker-api-config
        key: LOG_LEVEL`;

const secretEnvYaml = `env:
  - name: API_TOKEN
    valueFrom:
      secretKeyRef:
        name: kube-tasker-api-secret
        key: API_TOKEN`;

const configFileMountYaml = `volumeMounts:
  - name: app-config
    mountPath: /etc/kubetasker
    readOnly: true
volumes:
  - name: app-config
    configMap:
      name: kube-tasker-api-config`;

const commandArgsYaml = `command: ['python']
args: ['-m', 'uvicorn', 'app.main:app', '--host', '0.0.0.0', '--port', '8080']`;

const deploymentSnippetYaml = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: kube-tasker-api
  namespace: kubetasker
spec:
  template:
    spec:
      containers:
        - name: api
          image: msomi22/kubetasker-api:0.1.1
          env:
            - name: LOG_LEVEL
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: LOG_LEVEL
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN
          volumeMounts:
            - name: app-config
              mountPath: /etc/kubetasker
              readOnly: true
      volumes:
        - name: app-config
          configMap:
            name: kube-tasker-api-config`;

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
  scenario: 'KubeTasker now runs as a workload and is reachable through a Service. The next CKAD skill is learning how the same container image can behave correctly in different environments by receiving configuration at runtime.',
  starterThought: 'Do not rebuild an image just because the environment changed. Keep the image stable, then provide environment-specific values through Kubernetes objects and Pod configuration.',
  intuition: 'Runtime configuration is the bridge between a reusable container image and the real environment where the app runs. The image contains the app. Kubernetes provides the values, files, and startup arguments that tell the app how to behave now.',
  mentalPicture: 'Think of the container image as a sealed appliance. ConfigMaps, Secrets, environment variables, mounted files, command, and args are the switches and setup instructions applied when the appliance is started in a specific room.',
  patternSignal: 'Use runtime configuration when the app image is correct but the behavior depends on environment, feature mode, log level, endpoint names, credentials, file paths, or startup flags.',
  invariant: 'The container image should stay stable while environment-specific behavior comes from Kubernetes runtime configuration.',
  finalPattern: 'Step 4: Prepare for the runtime configuration mini-project by learning the moving parts before fixing broken config in a live lab.',
  commonMistake: 'Do not print secret values while debugging. Prove the Secret exists and is referenced correctly without exposing its sensitive content.',
  commonMistakes: [
    'Creating the ConfigMap in the default namespace while the Deployment runs in kubetasker.',
    'Using a key name in the Deployment that does not exist in the ConfigMap or Secret.',
    'Referencing the wrong Secret name from the Pod template.',
    'Mounting a config file at one path while the app reads a different path.',
    'Overriding command or args in a way that prevents the app from starting.',
    'Changing configuration but forgetting that existing Pods may need a rollout restart or replacement to pick up the reference.',
    'Debugging by printing secret values instead of inspecting object names, keys, references, events, and logs.'
  ],
  edgeCases: [
    'A missing ConfigMap key can prevent Pod creation when the reference is required.',
    'A wrong mounted-file path can let the Pod start but make the app fail at runtime.',
    'A wrong command can replace the image default startup process and make the container exit immediately.',
    'Secret data may exist but still be unusable if the Deployment references the wrong key.'
  ],
  complexityAnalysis: 'This is application configuration complexity. The learner should understand where values come from, how they enter the Pod, how the app reads them, and how Kubernetes exposes mistakes through Pod state, events, and logs.',
  explanation: 'This introduction explains ConfigMaps, Secrets, environment variables, mounted config files, command, args, and the common ways runtime configuration mistakes appear in Kubernetes workloads.',
  stepByStepBreakdown: [
    'Separate application code from environment-specific configuration.',
    'Use ConfigMaps for non-sensitive values such as log level and feature mode.',
    'Use Secrets for sensitive values such as tokens and credentials.',
    'Inject small values as environment variables when the app expects environment input.',
    'Mount configuration as files when the app expects a file or directory.',
    'Use command and args carefully because they can replace the image startup behavior.',
    'Inspect ConfigMaps, Secrets, Deployments, Pods, events, and logs without exposing secret values.',
    'Prepare for a later CKAD mini-project where runtime configuration is missing or mounted incorrectly.'
  ],
  finalTakeaway: 'Runtime configuration lets one trusted image run safely in many environments. In CKAD practice, the job is to create the right configuration objects, reference them correctly, mount or inject them correctly, and verify the app behavior without leaking secrets.',
  visualExplanation: 'The visual shows a stable image receiving environment-specific runtime configuration from a Deployment, ConfigMap, Secret, env vars, mounted files, command, and args before the app reaches a healthy running state.',
  visualWalkthrough: {
    title: 'Runtime configuration flow',
    summary: 'See how a stable image receives Kubernetes runtime configuration and becomes a correctly started Pod.',
    diagram: {
      type: 'graph',
      variant: 'kubernetes-object-relationship',
      title: 'Image to configured running Pod',
      description: 'A beginner-friendly map for ConfigMaps, Secrets, env vars, mounted files, command, args, and failure signals.',
      nodes: [
        { id: 'image', label: 'Container image\napp code and defaults' },
        { id: 'deployment', label: 'Deployment\nPod template references config' },
        { id: 'configmap', label: 'ConfigMap\nnon-sensitive values' },
        { id: 'secret', label: 'Secret\nsensitive values' },
        { id: 'env', label: 'Environment vars\nsmall runtime values' },
        { id: 'files', label: 'Mounted files\nconfig directory' },
        { id: 'commandargs', label: 'command and args\nstartup behavior' },
        { id: 'pod', label: 'Pod\nconfigured container starts' },
        { id: 'app', label: 'KubeTasker app\nreads runtime config' },
        { id: 'failure', label: 'Failure signal\nevents logs restart state' }
      ],
      edges: [
        { from: 'image', to: 'deployment', label: 'image selected' },
        { from: 'configmap', to: 'deployment', label: 'referenced by name and key' },
        { from: 'secret', to: 'deployment', label: 'referenced safely' },
        { from: 'deployment', to: 'env', label: 'injects values' },
        { from: 'deployment', to: 'files', label: 'mounts files' },
        { from: 'deployment', to: 'commandargs', label: 'sets startup inputs' },
        { from: 'env', to: 'pod', label: 'available at start' },
        { from: 'files', to: 'pod', label: 'available as paths' },
        { from: 'commandargs', to: 'pod', label: 'controls process start' },
        { from: 'pod', to: 'app', label: 'app reads configuration' },
        { from: 'deployment', to: 'failure', label: 'bad reference or path' },
        { from: 'pod', to: 'failure', label: 'startup or readiness issue' }
      ],
      frames: [
        {
          title: 'Stable image first',
          activeNodes: ['image'],
          visitedNodes: [],
          state: { label: 'Invariant', values: { image: 'app code and safe defaults', environment: 'provided later' }, helper: 'The image should not be rebuilt just to change log level, feature mode, or endpoint names.' },
          description: 'The container image carries the reusable application. Environment-specific behavior should be supplied at runtime.'
        },
        {
          title: 'Deployment wires configuration',
          activeNodes: ['deployment', 'configmap', 'secret'],
          visitedNodes: ['image'],
          state: { label: 'References', values: { ConfigMap: 'non-sensitive values', Secret: 'sensitive values', Deployment: 'Pod template wiring' }, helper: 'The Deployment does not store every value directly. It points the Pod template to configuration objects.' },
          description: 'The Pod template references ConfigMaps and Secrets by name and key so values can enter the container at startup.'
        },
        {
          title: 'Values enter the Pod',
          activeNodes: ['env', 'files', 'commandargs', 'pod'],
          visitedNodes: ['deployment', 'configmap', 'secret'],
          state: { label: 'Runtime inputs', values: { env: 'small values', files: 'config documents', commandArgs: 'startup behavior' }, helper: 'Choose the input shape that matches how the app expects to read configuration.' },
          description: 'Configuration can appear as environment variables, mounted files, or startup command and args.'
        },
        {
          title: 'Application reads configuration',
          activeNodes: ['pod', 'app'],
          visitedNodes: ['image', 'deployment', 'env', 'files'],
          state: { label: 'Healthy path', values: { app: 'reads expected values', pod: 'starts and becomes Ready' }, helper: 'Correct references and paths let the app start with the expected behavior.' },
          description: 'KubeTasker starts, reads runtime configuration, and reaches a healthy state when the configuration is valid.'
        },
        {
          title: 'Bad configuration creates symptoms',
          activeNodes: ['failure', 'deployment', 'pod'],
          visitedNodes: ['configmap', 'secret', 'env', 'files', 'commandargs'],
          state: { label: 'Debug signal', values: { events: 'missing object or key', logs: 'app startup error', status: 'CrashLoopBackOff or not Ready' }, helper: 'Use read-only inspection first. Do not expose secret values while debugging.' },
          description: 'Wrong names, missing keys, wrong paths, or bad startup overrides usually appear in Pod events, status, and application logs.'
        }
      ]
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can explain why runtime configuration should not be baked into a container image.',
        'I can choose when to use a ConfigMap, Secret, environment variable, or mounted file.',
        'I can explain how command and args affect container startup behavior.',
        'I can use Kubernetes inspection commands to identify common configuration mistakes.',
        'I can prepare for a CKAD-style task where an app fails because runtime config is missing or mounted incorrectly.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Why this lesson exists',
      content: 'The first three lessons taught workload creation, YAML-driven changes, and Kubernetes architecture. This lesson explains the configuration layer that makes the same KubeTasker image usable in different environments without rebuilding it.'
    },
    {
      type: 'section',
      title: 'KubeTasker scenario',
      content: 'KubeTasker needs small runtime decisions such as log level, learning mode, feature behavior, and token-based access to protected operations. These values should come from Kubernetes at startup, not from a new image for every environment.'
    },
    {
      type: 'section',
      title: 'Runtime configuration mental model',
      content: 'The image answers what application code should run. Runtime configuration answers how that application should behave in this namespace, cluster, or environment. Kubernetes connects the two through the Pod template.'
    },
    {
      type: 'comparison',
      title: 'Configuration choices',
      items: [
        { label: 'Container image', content: 'Use it for application code, dependencies, and safe defaults that should stay the same across environments.' },
        { label: 'ConfigMap', content: 'Use it for non-sensitive configuration such as log level, feature mode, display names, and ordinary app settings.' },
        { label: 'Secret', content: 'Use it for sensitive configuration such as tokens, passwords, and credentials. Verify references without printing values.' },
        { label: 'Environment variable', content: 'Use it for small values that the app expects to read from the process environment.' },
        { label: 'Mounted file', content: 'Use it when the app expects a file, a directory of config files, or a config document at a known path.' }
      ]
    },
    {
      type: 'section',
      title: 'Command and args explanation',
      content: 'command and args control how the container process starts. They are powerful because they can override the image default startup behavior. In CKAD tasks, use them carefully and verify the container still starts the intended application process.'
    },
    ...yamlExample('ConfigMap example', 'This ConfigMap stores non-sensitive KubeTasker values. It is safe for learning values such as log level and task mode, but it should not store tokens or passwords.', 'configmap.yaml', configMapYaml),
    ...yamlExample('Secret example', 'This Secret stores a placeholder token for the learning lab. The example uses stringData for readability, but the learner should still treat Secret values carefully.', 'secret.yaml', secretYaml),
    ...yamlExample('ConfigMap value as an environment variable', 'This snippet injects one ConfigMap key into the container environment. The Deployment must reference the correct ConfigMap name and key.', 'configmap-env-snippet.yaml', configMapEnvYaml),
    ...yamlExample('Secret value as an environment variable', 'This snippet injects one Secret key into the container environment. Debug the reference and object metadata without printing the sensitive value.', 'secret-env-snippet.yaml', secretEnvYaml),
    ...yamlExample('ConfigMap mounted as files', 'This snippet mounts ConfigMap data as files under a directory. This is useful when the app reads configuration from a file path instead of environment variables.', 'configmap-file-mount-snippet.yaml', configFileMountYaml),
    ...yamlExample('Command and args startup snippet', 'This snippet shows the shape of command and args. Only override startup behavior when the lab or application requires it, because a wrong override can stop the container from starting.', 'command-args-snippet.yaml', commandArgsYaml),
    ...yamlExample('Small Deployment wiring example', 'This compact example shows how the Pod template can reference the image, ConfigMap, Secret, and mounted config directory together. It is intentionally small so the configuration relationships stay visible.', 'deployment-runtime-config-snippet.yaml', deploymentSnippetYaml),
    {
      type: 'callout',
      tone: 'warning',
      title: 'Do not expose secret values while debugging',
      content: 'For CKAD practice, prove that a Secret exists, has the expected key, and is referenced by the Deployment. Avoid commands that print sensitive values from the Secret or from the running container environment.'
    },
    ...command('1. Show ConfigMaps in the namespace', 'This checks whether the namespace contains ConfigMap objects. Run it first when you expect non-sensitive configuration to exist and want to confirm you are looking in the right namespace.', 'k -n kubetasker get configmaps'),
    ...command('2. Describe the app ConfigMap', 'This checks the ConfigMap metadata and keys without requiring you to open every value. Notice whether the expected key names exist.', 'k -n kubetasker describe configmap kube-tasker-api-config'),
    ...command('3. Show Secrets safely', 'This confirms Secret objects exist in the namespace without printing secret values. Notice the Secret name and type, then compare the name with the Deployment reference.', 'k -n kubetasker get secrets'),
    ...command('4. Describe the Deployment', 'This checks how the Pod template references configuration. Look for environment variables, ConfigMap references, Secret references, volumes, volume mounts, command, args, and recent events.', 'k -n kubetasker describe deploy kube-tasker-api'),
    ...command('5. Show Pods', 'This checks whether Pods were created and whether they are Running, Pending, not Ready, or restarting. Configuration problems often appear as waiting, crash, or readiness symptoms.', 'k -n kubetasker get pods -o wide'),
    ...command('6. Inspect Pod events', 'This checks detailed Pod events and container state. Replace the placeholder with the real Pod name from the previous command, then look for missing ConfigMap, missing Secret, missing key, mount, or startup errors.', 'k -n kubetasker describe pod <pod-name>'),
    ...command('7. Read application logs', 'This checks what the app reported during startup. Replace the placeholder with the real Pod name and look for configuration parsing, missing file, or invalid startup argument messages.', 'k -n kubetasker logs <pod-name>'),
    ...command('8. Inspect a non-sensitive environment value', 'This checks one safe environment variable from inside the Pod. Only use this approach for non-sensitive values such as log level, never for tokens or passwords.', 'k -n kubetasker exec <pod-name> -- printenv LOG_LEVEL'),
    {
      type: 'comparison',
      title: 'Failure interpretation',
      items: [
        { label: 'ConfigMap not found', content: 'The object may be missing, named differently, or created in another namespace.' },
        { label: 'Key not found', content: 'The object exists, but the Deployment references a key that the ConfigMap or Secret does not contain.' },
        { label: 'Mount path wrong', content: 'The file may be mounted successfully, but the app reads a different directory or filename.' },
        { label: 'Container exits quickly', content: 'The app may reject a required config value, or command and args may have replaced the normal startup process incorrectly.' },
        { label: 'Pod Running but not Ready', content: 'The app process may be alive but failing readiness because configuration makes the service unhealthy.' }
      ]
    },
    {
      type: 'checklist',
      title: 'Common mistakes to avoid',
      items: [
        'ConfigMap exists in the wrong namespace.',
        'Deployment key name does not match the ConfigMap or Secret key.',
        'Secret exists but the Deployment references the wrong Secret name.',
        'Mounted file path is different from what the app expects.',
        'command or args override the image startup behavior incorrectly.',
        'Existing Pods are not restarted after a configuration reference changes.',
        'Learner prints secret values while debugging.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'How this prepares you for the mini-project',
      content: 'The later runtime configuration mini-project will be hands-on. You will fix an app that fails because configuration is missing, referenced incorrectly, injected in the wrong shape, or mounted at the wrong path. This lesson gives the mental model before the broken lab.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'A good CKAD answer does not only create a ConfigMap or Secret. It proves the object is in the right namespace, the Pod template references the right names and keys, the app receives the value in the expected shape, and debugging avoids exposing sensitive data.'
    }
  ]
});

export default problem;

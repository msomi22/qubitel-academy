import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

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

function editFileWithVim(title, explanation, filename, code, blockTitle = 'Changed file') {
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

const previousQuestionLink = '[previous question](https://academy.qubitel.net/problem/kubetasker-yaml-modify-001)';

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

const imageUpdateSnippet = `# Current deployment.yaml after this change.
# Only the image line changes from the previous question.
apiVersion: apps/v1
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
          image: msomi22/kubetasker-api:0.2.0 # changed here: v0.2.0 runtime-config app
          ports:
            - containerPort: 8080`;

const directEnvSnippet = `# Current deployment.yaml after adding the first direct env value.
# New part in this step: env with DIRECT_MESSAGE under the api container.
apiVersion: apps/v1
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
          env: # added here
            - name: DIRECT_MESSAGE
              value: Direct environment variable is active`;

const updatedDirectEnvSnippet = `# Current deployment.yaml after updating the direct env value.
# New part in this step: only the DIRECT_MESSAGE value changes.
apiVersion: apps/v1
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
            - name: DIRECT_MESSAGE
              value: Direct environment variable was updated # changed here`;

const configMapEnvSnippet = `# Current deployment.yaml after moving runtime values to ConfigMap env references.
# Keep DIRECT_MESSAGE direct. Move the other non-sensitive values to ConfigMap references.
apiVersion: apps/v1
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
            - name: DIRECT_MESSAGE
              value: Direct environment variable was updated
            - name: LOG_LEVEL # changed here: value now comes from ConfigMap
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: LOG_LEVEL
            - name: APP_MODE # changed here: value now comes from ConfigMap
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: APP_MODE
            - name: TASK_MODE # changed here: value now comes from ConfigMap
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: TASK_MODE
            - name: ENABLE_SAMPLE_TASKS # changed here: value now comes from ConfigMap
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: ENABLE_SAMPLE_TASKS
            - name: WELCOME_MESSAGE # changed here: value now comes from ConfigMap
              valueFrom:
                configMapKeyRef:
                  name: kube-tasker-api-config
                  key: WELCOME_MESSAGE`;

const secretEnvSnippet = `# Current deployment.yaml after adding a Secret env reference.
# Previous direct env and ConfigMap env remain. New part: API_TOKEN from Secret.
apiVersion: apps/v1
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
                  key: WELCOME_MESSAGE
            - name: API_TOKEN # added here
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN`;

const mountedConfigSnippet = `# Current deployment.yaml after mounting ConfigMap data as a file.
# Previous env values remain. New parts: volumeMounts and volumes for kube-tasker-file-config.
apiVersion: apps/v1
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
                  key: WELCOME_MESSAGE
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN
          volumeMounts: # added here
            - name: app-config-file
              mountPath: /etc/kubetasker
              readOnly: true
      volumes: # added here
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config`;

const mountedSecretSnippet = `# Current deployment.yaml after mounting Secret data as a file.
# Previous env values and ConfigMap mount remain. New parts: api-secret-file mount and volume.
apiVersion: apps/v1
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
            - name: api-secret-file # added here
              mountPath: /etc/kubetasker-secret
              readOnly: true
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config
        - name: api-secret-file # added here
          secret:
            secretName: kube-tasker-file-secret`;

const downwardApiSnippet = `# Current deployment.yaml after adding Downward API env values.
# Previous env and mounted files remain. New part: Pod metadata values under env.
apiVersion: apps/v1
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
                  key: WELCOME_MESSAGE
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN
            - name: POD_NAME # added here
              valueFrom:
                fieldRef:
                  fieldPath: metadata.name
            - name: POD_NAMESPACE # added here
              valueFrom:
                fieldRef:
                  fieldPath: metadata.namespace
            - name: POD_IP # added here
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP
            - name: NODE_NAME # added here
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
          volumeMounts:
            - name: app-config-file
              mountPath: /etc/kubetasker
              readOnly: true
            - name: api-secret-file
              mountPath: /etc/kubetasker-secret
              readOnly: true
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config
        - name: api-secret-file
          secret:
            secretName: kube-tasker-file-secret`;

const resourcesAndResourceFieldSnippet = `# Current deployment.yaml after adding resources and resourceFieldRef env values.
# Previous env and mounted files remain. New parts: CPU_LIMIT, MEMORY_LIMIT, and resources.
apiVersion: apps/v1
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
                  key: WELCOME_MESSAGE
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN
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
                  fieldPath: spec.nodeName
            - name: CPU_LIMIT # added here
              valueFrom:
                resourceFieldRef:
                  resource: limits.cpu
            - name: MEMORY_LIMIT # added here
              valueFrom:
                resourceFieldRef:
                  resource: limits.memory
          resources: # added here
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
          volumeMounts:
            - name: app-config-file
              mountPath: /etc/kubetasker
              readOnly: true
            - name: api-secret-file
              mountPath: /etc/kubetasker-secret
              readOnly: true
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config
        - name: api-secret-file
          secret:
            secretName: kube-tasker-file-secret`;

const commandArgsPatchYaml = `# Current deployment.yaml after adding command and args.
# Previous env, resources, and mounted files remain. New part: command and args under the api container.
apiVersion: apps/v1
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
          command: ["python"] # added here
          args: ["-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"] # added here
          ports:
            - containerPort: 8080
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
                  key: WELCOME_MESSAGE
            - name: API_TOKEN
              valueFrom:
                secretKeyRef:
                  name: kube-tasker-api-secret
                  key: API_TOKEN
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
                  fieldPath: spec.nodeName
            - name: CPU_LIMIT
              valueFrom:
                resourceFieldRef:
                  resource: limits.cpu
            - name: MEMORY_LIMIT
              valueFrom:
                resourceFieldRef:
                  resource: limits.memory
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
          volumeMounts:
            - name: app-config-file
              mountPath: /etc/kubetasker
              readOnly: true
            - name: api-secret-file
              mountPath: /etc/kubetasker-secret
              readOnly: true
      volumes:
        - name: app-config-file
          configMap:
            name: kube-tasker-file-config
        - name: api-secret-file
          secret:
            secretName: kube-tasker-file-secret`;

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

const moreDirectEnvStatusJson = `{
  "runtimeConfigVersion": "v0.2.0",
  "directMessage": "Direct environment variable was updated",
  "appMode": "direct-env-learning",
  "taskMode": "direct-env-practice",
  "sampleTasksEnabled": true,
  "welcomeMessage": "Direct env values are active",
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

const setupBody = [
  ...command('0. Ensure the namespace exists', 'Start with namespace.yaml only. If you do not have this file yet, open the previous question from the link above and create it there first.', `k apply -f namespace.yaml
k get ns kubetasker`),
  ...editFileWithVim('1. Update the app image for runtime configuration', 'Open deployment.yaml. Keep the file structure from the previous question, set replicas to 1 for this focused lab, and change only the image line marked below to use v0.2.0.', 'deployment.yaml', imageUpdateSnippet, 'deployment.yaml after image update'),
  ...command('Apply the image update', 'Apply deployment.yaml after changing only the image line.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`)
];

const directEnvBody = [
  { type: 'section', title: 'Direct environment variable', content: 'Start with the simplest configuration method. The value lives directly in deployment.yaml, so no ConfigMap or Secret is needed yet.' },
  ...editFileWithVim('2. Add a direct env value to the Deployment', 'Open deployment.yaml. Build on the image-updated file from Setup. Add only the env block shown under the api container; the full file below shows exactly where it belongs.', 'deployment.yaml', directEnvSnippet, 'deployment.yaml after direct env'),
  ...command('Apply the direct env change', 'Apply deployment.yaml and wait for the new Pod to roll out.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api`),
  ...command('Create the verification path', 'Create or refresh the existing Service and client Pod from the previous question. This is done here because this is the first time the lesson verifies the app through the cluster. Later scenarios reuse this path unless it is missing.', `k apply -f service.yaml
k apply -f client-pod.yaml
k -n kubetasker get svc kube-tasker-api
k -n kubetasker get endpoints kube-tasker-api
k -n kubetasker get pod kube-tasker-client`),
  ...command('Verify the direct env value from the app', 'Call the app through the existing Service/client path and confirm the direct env value reached KubeTasker.', 'k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status'),
  ...jsonExample('Expected /config/status after adding direct env', 'The app should show that the direct environment variable was received.', 'config-status-direct-env-response.json', directEnvStatusJson),
  ...editFileWithVim('3. Update the direct env value', 'Open deployment.yaml again. Build on the previous file in this tab. Change only the DIRECT_MESSAGE value marked below.', 'deployment.yaml', updatedDirectEnvSnippet, 'deployment.yaml after direct env update'),
  ...command('Apply and verify the updated direct env value', 'Apply deployment.yaml again, wait for rollout, then call the same endpoint. The Service and client Pod are not changed, so do not recreate their YAML.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after updating direct env', 'The app should now show the updated direct value.', 'config-status-direct-env-updated-response.json', updatedDirectEnvStatusJson),
  { type: 'section', title: '4. Practice with other direct env values', content: 'Open deployment.yaml with vim and add these direct env values using the same env pattern you already used: APP_MODE=direct-env-learning, TASK_MODE=direct-env-practice, ENABLE_SAMPLE_TASKS=true, and WELCOME_MESSAGE=Direct env values are active. Do not replace the whole file; update only the env list.' },
  { type: 'code', title: 'Open deployment.yaml with vim', language: 'bash', code: 'vim deployment.yaml' },
  ...command('Apply and verify the extra direct env values', 'Apply deployment.yaml again and confirm the app receives each direct value. The Service and client Pod are still reused.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after adding more direct env values', 'The app should show each non-sensitive value supplied directly from deployment.yaml.', 'config-status-direct-env-more-values-response.json', moreDirectEnvStatusJson)
];

const configMapEnvBody = [
  { type: 'section', title: 'ConfigMap as environment variables', content: 'Now externalize non-sensitive values. You already tested these as direct env values; next, store them in a ConfigMap and reference the ConfigMap keys from deployment.yaml.' },
  ...createFileWithVim('5. Create the ConfigMap manifest', 'This file stores non-sensitive runtime settings that KubeTasker will read through environment variables.', 'configmap.yaml', configMapYaml),
  ...command('Apply and inspect the ConfigMap', 'Create the ConfigMap and confirm the keys exist in the kubetasker namespace.', `k apply -f configmap.yaml
k -n kubetasker describe configmap kube-tasker-api-config`),
  ...editFileWithVim('6. Move non-sensitive env values to ConfigMap refs', 'Open deployment.yaml. Build on the direct-env file. Replace the direct APP_MODE, TASK_MODE, ENABLE_SAMPLE_TASKS, and WELCOME_MESSAGE values with ConfigMap references, then add LOG_LEVEL from the same ConfigMap. Keep DIRECT_MESSAGE as a direct env value.', 'deployment.yaml', configMapEnvSnippet, 'deployment.yaml after ConfigMap env'),
  ...command('Apply and verify ConfigMap env values', 'Apply deployment.yaml, wait for rollout, then verify the ConfigMap values from the app. The Service and client Pod are reused.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after ConfigMap env', 'The app should show the non-sensitive values from the ConfigMap.', 'config-status-configmap-env-response.json', configMapEnvStatusJson),
  ...createFileWithVim('7. Update the ConfigMap values', 'Edit configmap.yaml and change only the values shown here. This proves that the source object can change independently from the Deployment.', 'configmap.yaml', updatedConfigMapYaml),
  ...command('Apply the ConfigMap update and restart the app Pods', 'Environment variables are set when the Pod starts. After changing a ConfigMap used as env, restart the Deployment so the app receives the new values.', `k apply -f configmap.yaml
k -n kubetasker rollout restart deploy/kube-tasker-api
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after ConfigMap update', 'The app should show the updated ConfigMap values after the Deployment restart.', 'config-status-configmap-env-updated-response.json', updatedConfigMapEnvStatusJson)
];

const secretEnvBody = [
  { type: 'section', title: 'Secret as environment variable', content: 'Use a Secret when the value is sensitive. The app can prove the value exists, but the lesson must not print the Secret value.' },
  ...createFileWithVim('8. Create the Secret manifest', 'This file stores a sensitive runtime value. Verify that the Secret exists, but do not print or decode the token value.', 'secret.yaml', secretYaml),
  ...command('Apply and inspect the Secret safely', 'Create the Secret and confirm it exists without revealing the value.', `k apply -f secret.yaml
k -n kubetasker get secret kube-tasker-api-secret
k -n kubetasker describe secret kube-tasker-api-secret`),
  ...editFileWithVim('9. Add the Secret env ref to the Deployment', 'Open deployment.yaml. Build on the ConfigMap-env file. Append the Secret entry under the existing env list. Keep the direct env and ConfigMap env entries.', 'deployment.yaml', secretEnvSnippet, 'deployment.yaml after Secret env'),
  ...command('Apply and verify Secret env value safely', 'Apply deployment.yaml, wait for rollout, then verify only that the app received a token. Do not print the Secret value.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after Secret env', 'The app should confirm that the token is configured without exposing the token itself.', 'config-status-secret-env-response.json', secretEnvStatusJson)
];

const configMapFileBody = [
  { type: 'section', title: 'ConfigMap mounted as a file', content: 'Some apps read config from files instead of env vars. Here, a ConfigMap key becomes a file inside the container.' },
  ...createFileWithVim('10. Create the mounted ConfigMap manifest', 'This file becomes /etc/kubetasker/app-config.yaml inside the KubeTasker container.', 'file-config-configmap.yaml', mountedConfigFileYaml),
  ...command('Apply and inspect the mounted ConfigMap', 'Create the ConfigMap and confirm it contains app-config.yaml.', `k apply -f file-config-configmap.yaml
k -n kubetasker describe configmap kube-tasker-file-config`),
  ...editFileWithVim('11. Add the mounted ConfigMap file to the Deployment', 'Open deployment.yaml. Build on the Secret-env file. Keep the existing env list unchanged, then add volumeMounts under the api container and volumes under spec.template.spec.', 'deployment.yaml', mountedConfigSnippet, 'deployment.yaml after mounted ConfigMap'),
  ...command('Apply and verify mounted ConfigMap config', 'Apply deployment.yaml, wait for rollout, then confirm the app loaded the mounted config file.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready`),
  ...jsonExample('Expected /config/status after mounted ConfigMap', 'The app should confirm that the mounted ConfigMap file was loaded.', 'config-status-mounted-configmap-response.json', mountedConfigStatusJson),
  ...createFileWithVim('12. Update the mounted ConfigMap file', 'Edit file-config-configmap.yaml and change only the file content. This shows how file-based config can change separately from the Deployment.', 'file-config-configmap.yaml', updatedMountedConfigFileYaml),
  ...command('Apply and verify the mounted ConfigMap update', 'Apply the ConfigMap update. Then restart the Deployment to make the app reload the mounted-file settings for this lesson.', `k apply -f file-config-configmap.yaml
k -n kubetasker rollout restart deploy/kube-tasker-api
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after mounted ConfigMap update', 'The app should show the updated mounted-file values after the restart.', 'config-status-mounted-configmap-updated-response.json', updatedMountedConfigStatusJson)
];

const secretFileBody = [
  { type: 'section', title: 'Secret mounted as a file', content: 'Secrets can also be mounted as files. This is common for tokens, certificates, keys, and credentials.' },
  ...createFileWithVim('13. Create the mounted Secret manifest', 'This Secret will be mounted as a file inside the container. The Secret value should not be printed during verification.', 'file-secret.yaml', mountedSecretYaml),
  ...command('Apply and inspect the mounted Secret safely', 'Create the Secret and confirm it exists. Do not decode or print the Secret value.', `k apply -f file-secret.yaml
k -n kubetasker get secret kube-tasker-file-secret
k -n kubetasker describe secret kube-tasker-file-secret`),
  ...editFileWithVim('14. Add the mounted Secret file to the Deployment', 'Open deployment.yaml. Build on the mounted-ConfigMap file. Append one item under the existing volumeMounts list and one item under the existing volumes list. Do not create duplicate blocks.', 'deployment.yaml', mountedSecretSnippet, 'deployment.yaml after mounted Secret'),
  ...command('Apply and verify mounted Secret config safely', 'Apply deployment.yaml, wait for rollout, then verify only that the Secret file was loaded.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after mounted Secret', 'The app should confirm that the mounted Secret file was loaded without exposing the Secret content.', 'config-status-mounted-secret-response.json', mountedSecretStatusJson)
];

const downwardApiBody = [
  { type: 'section', title: 'Downward API values', content: 'The Downward API lets the app receive information about its own Pod, such as Pod name, namespace, Pod IP, and node name.' },
  ...editFileWithVim('15. Add Downward API env values to the Deployment', 'Open deployment.yaml. Build on the mounted-Secret file. Append the Pod metadata entries under the existing env list. These values are filled by Kubernetes when the Pod starts.', 'deployment.yaml', downwardApiSnippet, 'deployment.yaml after Downward API env'),
  ...command('Apply and verify Downward API values', 'Apply deployment.yaml, wait for rollout, then verify that the app received Pod metadata.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after Downward API', 'The app should confirm that Pod metadata was injected.', 'config-status-downward-api-response.json', downwardApiStatusJson)
];

const resourcesBody = [
  { type: 'section', title: 'Resource field references', content: 'resourceFieldRef lets the app receive selected CPU or memory request/limit values. This is useful when apps tune behavior based on assigned resources.' },
  ...editFileWithVim('16. Add resources and resourceFieldRef values', 'Open deployment.yaml. Build on the Downward API file. Add resources under the api container, then append CPU_LIMIT and MEMORY_LIMIT under the existing env list.', 'deployment.yaml', resourcesAndResourceFieldSnippet, 'deployment.yaml after resourceFieldRef'),
  ...command('Apply and verify resource field values', 'Apply deployment.yaml, wait for rollout, then verify that resource values are available to the app.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/config/status`),
  ...jsonExample('Expected /config/status after resourceFieldRef', 'The app should confirm that CPU and memory values are configured.', 'config-status-resourcefield-response.json', resourceFieldStatusJson)
];

const commandArgsBody = [
  { type: 'section', title: 'Command and args', content: 'command and args are startup configuration. They do not inject values like ConfigMaps or Secrets, but they change how the container process starts.' },
  ...editFileWithVim('17. Optional command and args amendment', 'Use this only when a question asks you to override the container startup command. Build on the resourceFieldRef file and add only command and args under the existing api container.', 'deployment.yaml', commandArgsPatchYaml, 'deployment.yaml after command and args'),
  ...command('Apply and verify command/args amendment', 'If command or args are wrong, /health and /ready will fail and logs will show startup errors.', `k apply -f deployment.yaml
k -n kubetasker rollout status deploy/kube-tasker-api
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api/ready
k -n kubetasker logs deploy/kube-tasker-api`)
];

const problem = defineLearningProblem({
  id: 'workloads-services-runtime-configuration-introduction-001',
  category: 'kubernetes-ckad',
  topicId: 'workloads-services',
  title: 'Step 4: Runtime Configuration Introduction',
  difficulty: 'Easy',
  estimatedTime: '55 min',
  estimatedTimeSeconds: 3300,
  type: 'learning',
  tags: ['kubernetes-ckad', 'runtime-configuration', 'configmap', 'secret', 'environment-variables', 'volume-mounts', 'downward-api', 'resourcefieldref', 'command-args', 'readiness', 'debugging', 'workloads-services', 'kubetasker'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] },
  rendering: { variant: 'deep-dive', density: 'comfortable', accent: 'green' },
  prompt,
  question: prompt,
  scenario: 'In this lesson, you move step by step through the main ways Kubernetes can provide runtime configuration to an application. You start with direct environment variables, verify them, update them, then move the same kind of values into ConfigMaps, Secrets, mounted files, Downward API values, resource values, and command/args using KubeTasker v0.2.0.',
  starterThought: 'Change one thing, apply it, wait for rollout, then verify what the running app received. Each scenario builds on the previous one.',
  intuition: 'Runtime configuration changes app behavior without rebuilding the image. Kubernetes can inject values as environment variables, mount data as files, expose Pod metadata, expose resource settings, or override startup command and args.',
  mentalPicture: 'Think of the app image as the packaged application. Runtime configuration is the set of values Kubernetes supplies when the Pod starts.',
  patternSignal: 'Use this sequence for each scenario: prepare any required object, edit only the required part of deployment.yaml, apply, wait for rollout, then verify from the running app.',
  invariant: 'Do not replace whole manifests when only one part changes. In CKAD-style work, careful targeted edits are part of the skill.',
  commonMistake: 'Jumping to ConfigMaps, Secrets, and volumes before first understanding where simple env values belong in the Deployment.',
  explanation: 'This lesson introduces Kubernetes runtime configuration mechanisms incrementally. Service and client Pod setup is done only when first needed for verification; later scenarios reuse them unless they are missing.',
  stepByStepBreakdown: [
    'Apply namespace.yaml if the kubetasker namespace is missing.',
    'Update deployment.yaml to the v0.2.0 image.',
    'Direct env: add a direct environment variable, create the Service/client verification path, verify it, update it, add more direct env values, and verify again.',
    'ConfigMap env: create a ConfigMap, move non-sensitive values from direct env into ConfigMap-backed env, update the ConfigMap, restart the Deployment, and verify the new values.',
    'Secret env: create a Secret, inject one key as an environment variable, and verify only that it is configured.',
    'ConfigMap file: mount ConfigMap data as a file, verify the app loaded it, update the file config, and verify the new mounted-file values.',
    'Secret file: mount Secret data as a file and verify only that it is loaded.',
    'Downward API: inject Pod metadata into the app.',
    'Resources: inject resource values using resourceFieldRef.',
    'Command and args: review startup configuration.'
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
        { id: 'direct', label: '1 Direct env\nvalues in Deployment' },
        { id: 'service', label: 'Service + client Pod\ncreate for checks' },
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
    { type: 'checklist', title: 'Objective', items: [
      'I can follow a natural runtime-configuration sequence without jumping between unrelated features.',
      'I can update an existing Deployment to use KubeTasker v0.2.0.',
      'I can add, verify, update, and re-verify direct environment variables.',
      'I can move non-sensitive values into a ConfigMap and verify changes after rollout.',
      'I can use a Secret as an environment variable without printing the Secret value.',
      'I can mount ConfigMap and Secret data as files and verify them safely.',
      'I can inject Pod metadata through the Downward API.',
      'I can inject CPU and memory values through resourceFieldRef.',
      'I can understand command and args as startup configuration.'
    ] },
    { type: 'callout', tone: 'info', title: 'What you will do next', content: `Build runtime configuration knowledge step by step. Start with direct env values, verify them from the app, then externalize values using ConfigMaps, Secrets, mounted files, and Kubernetes-provided metadata. Need the earlier base files? Open the ${previousQuestionLink}.` },
    { type: 'callout', tone: 'info', title: 'How to save files in this lesson', content: 'For each file, run the vim command shown, press i to enter insert mode, paste or edit the content from the next block, press Esc, type :wq, and press Enter. The same save pattern applies to every file in this lesson.' },
    {
      type: 'tabs',
      title: 'Choose one runtime configuration scenario',
      description: 'Use one tab at a time. Each scenario contains only the instructions, YAML changes, apply commands, and verification commands needed for that part of the journey.',
      tabs: [
        { id: 'setup', label: 'Setup', body: setupBody },
        { id: 'direct-env', label: 'Direct env', body: directEnvBody },
        { id: 'configmap-env', label: 'ConfigMap env', body: configMapEnvBody },
        { id: 'secret-env', label: 'Secret env', body: secretEnvBody },
        { id: 'configmap-file', label: 'ConfigMap file', body: configMapFileBody },
        { id: 'secret-file', label: 'Secret file', body: secretFileBody },
        { id: 'downward-api', label: 'Downward API', body: downwardApiBody },
        { id: 'resources', label: 'Resources', body: resourcesBody },
        { id: 'command-args', label: 'Command & args', body: commandArgsBody }
      ]
    },
    { type: 'comparison', title: 'Debugging pattern', items: [
      { label: 'If direct env is missing', content: 'Check that env is under the api container, aligned with image and ports.' },
      { label: 'If ConfigMap values do not change', content: 'Remember that env values are captured when the Pod starts. Restart or roll the Deployment after changing the ConfigMap.' },
      { label: 'If the Secret exists but app says token is missing', content: 'Check secretKeyRef name and key. Do not print the token value.' },
      { label: 'If mounted config is not loaded', content: 'Check the ConfigMap key, volume name, mountPath, and volumes indentation.' },
      { label: 'If Downward API values are missing', content: 'Check fieldPath spelling and make sure the entries are under env.' },
      { label: 'If resource values are missing', content: 'Check that resources are set on the same container and resourceFieldRef points to the correct resource.' }
    ] },
    { type: 'section', title: 'Final takeaway', content: 'Kubernetes runtime configuration is easiest to learn in sequence. Start with direct env, then move to ConfigMap env, Secret env, mounted ConfigMap files, mounted Secret files, Downward API, resourceFieldRef, and command/args. Reuse Service and client verification unless those resources change.' }
  ]
});

export default problem;

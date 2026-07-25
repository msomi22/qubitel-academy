import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-ckad-kubernetes-application-developer-masterclass',
  category: 'kubernetes-ckad',
  topicId: 'ckad-preparation',
  title: 'Certified Kubernetes Application Developer (CKAD): Comprehensive Masterclass',
  difficulty: 'Easy',
  prompt: 'A rigorous, production-grade masterclass covering the full Certified Kubernetes Application Developer (CKAD) curriculum (2025), aligned to the five official exam domains: Application Design and Build (20%), Application Deployment (20%), Application Observability and Maintenance (15%), Application Environment, Configuration and Security (25%), and Services and Networking (20%). Deep dives include StorageClasses, PV/PVC access modes, Labels/Annotations, ClusterRoles, IngressClass, NetworkPolicy Egress, and multi-container patterns.',
  tags: ['kubernetes', 'ckad', 'devops', 'containers', 'architecture', 'orchestration', 'helm', 'kustomize', 'security', 'networking'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    {
      type: 'section',
      title: 'Architectural Introduction: The Cloud-Native Paradigm',
      content: 'Modern enterprise applications, especially high-throughput Java microservices, are increasingly containerized and orchestrated via Kubernetes. The Certified Kubernetes Application Developer (CKAD) certification validates an engineer\'s ability to design, build, configure, and expose cloud-native applications in production Kubernetes clusters. This masterclass spans the five official CKAD exam domains, covering core API primitives, multi-container architectural patterns, deployment strategies, observability, state persistence (PV/PVC/StorageClasses), configuration, security (RBAC, ServiceAccounts, SecurityContexts), services, and network isolation.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'CKAD 2025 Exam Blueprint',
      content: 'The CKAD exam is a 2-hour, hands-on, performance-based assessment conducted in a live Kubernetes cluster. The five domains and their weightings are: Application Design and Build (20%), Application Deployment (20%), Application Observability and Maintenance (15%), Application Environment, Configuration and Security (25%), and Services and Networking (20%). Candidates may use the official Kubernetes documentation during the exam, but speed and accuracy with imperative commands (kubectl run, create, expose, label, annotate) and YAML authoring are essential for success.'
    },
    {
      type: 'section',
      title: 'Domain 1 — Application Design and Build (20%)',
      content: 'This domain validates the ability to define, build, and modify container images, choose the right workload resource (Deployment, StatefulSet, DaemonSet, Job, CronJob), understand multi-container Pod design patterns (sidecar, init, adapter, ambassador), and utilize both persistent (PV/PVC with StorageClasses) and ephemeral (emptyDir, hostPath) volumes. The Pod is the smallest deployable computing unit, representing one or more containers sharing storage, network namespaces, and a shared lifecycle.'
    },
    {
      type: 'section',
      title: '1.1 Pods, Namespaces, Labels, Annotations & Imperative Commands',
      content: 'Namespaces provide logical isolation within a single cluster. While declarative YAML manifests are mandatory for production GitOps workflows, mastering rapid imperative commands is vital for speed during the timed CKAD environment. Labels are key-value pairs used for organization and selection, while Annotations store non-identifying metadata (e.g., build IDs, contact info) that tools can read.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Rapid imperative generation of a pod YAML manifest without deploying\nkubectl run nginx-pod --image=nginx:alpine --dry-run=client -o yaml > pod.yaml\n\n# Imperatively creating a deployment with scaling parameters\nkubectl create deployment java-api --image=java-backend:latest --replicas=3 -n production\n\n# Generate a Job YAML for a batch task\nkubectl create job pi-compute --image=java-batch:latest --dry-run=client -o yaml > job.yaml\n\n# Generate a CronJob YAML for a scheduled task\nkubectl create cronjob nightly-report --image=java-report:latest --schedule="0 2 * * *" --dry-run=client -o yaml > cronjob.yaml\n\n# Managing Labels and Annotations imperatively\nkubectl label pod nginx-pod environment=production version=v1.2\nkubectl annotate pod nginx-pod team=backend-gamma build-timestamp=2025-07-25\n\n# Creating a namespace and switching context\nkubectl create namespace staging\nkubectl config set-context --current --namespace=staging'
    },
    {
      type: 'section',
      title: '1.2 Choosing the Right Workload Resource',
      content: 'Kubernetes provides several workload resources, each suited to a different application pattern. Selecting the correct resource is a core CKAD competency. The \'selector\' field is critical—it defines how the controller finds and manages its underlying Pods via label queries.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Deployment',
          content: 'Stateless, scalable applications with declarative rolling updates, rollbacks, and replica scaling. The default choice for web services and APIs. Supports maxSurge/maxUnavailable strategy tuning.'
        },
        {
          label: 'StatefulSet',
          content: 'Stateful applications requiring stable, unique network identities (pod-0, pod-1) and persistent storage with ordered, graceful startup/teardown. Ideal for databases, message brokers (Kafka, Zookeeper), and clustered caches.'
        },
        {
          label: 'DaemonSet',
          content: 'Runs a copy of a Pod on every (or selected) node in the cluster. Automatically added to new nodes. Ideal for log collectors (Fluentd), node monitors (Prometheus Node Exporter), and storage daemons (CSI drivers).'
        },
        {
          label: 'Job / CronJob',
          content: 'Runs a Pod to successful completion (Job) or on a fixed schedule (CronJob). Jobs handle parallel or sequential batch processing, while CronJobs handle backups, report generation, and periodic database maintenance.'
        }
      ]
    },
    {
      type: 'section',
      title: '1.3 Multi-Container Pod Design Patterns',
      content: 'A single Pod can house multiple containers that share localhost networking, the same IPC namespace, and storage volumes. Kubernetes defines several classic multi-container design patterns to solve tightly coupled software orchestration challenges. Init containers run to completion sequentially before any app containers start, making them perfect for dependency-wait logic, schema migrations, or secret bootstrapping.'
    },
    {
      type: 'checklist',
      title: 'Multi-Container Design Patterns',
      items: [
        'Sidecar Pattern: Extends or enhances the main application container (e.g., a logging agent streaming app logs, or a service mesh proxy intercepting traffic).',
        'Adapter Pattern: Standardizes or transforms output from the primary container so external monitoring or logging systems can ingest it uniformly (e.g., converting logs to JSON format).',
        'Ambassador Pattern: Acts as a local proxy intermediary, routing outbound traffic from the main container to external databases, caching layers, or legacy services with automatic retry logic.',
        'Init Container Pattern: Runs one or more preparatory containers to completion before the main app containers start—ideal for database migration, waiting for a dependent service, or setting file permissions on shared volumes.'
      ]
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: java-sidecar-pod\n  labels:\n    app: java-sidecar-demo\nspec:\n  initContainers:\n  - name: init-db-wait\n    image: busybox:latest\n    command: [\'sh\', \'-c\', \'until nslookup postgres.database; do echo "Waiting for DB..."; sleep 2; done;\']\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    ports:\n    - containerPort: 8080\n    volumeMounts:\n    - name: shared-logs\n      mountPath: /var/log/app\n  - name: log-forwarder\n    image: fluent-bit:latest\n    volumeMounts:\n    - name: shared-logs\n      mountPath: /var/log/app\n      readOnly: true\n  volumes:\n  - name: shared-logs\n    emptyDir: {}'
    },
    {
      type: 'section',
      title: '1.4 Persistent and Ephemeral Volumes with StorageClasses',
      content: 'Pods are inherently ephemeral; data written to container filesystems is lost upon pod termination. PersistentVolumes (PV) represent cluster-wide storage resources provisioned by administrators, while PersistentVolumeClaims (PVC) represent user requests for specific storage capacity and access modes. StorageClasses enable dynamic provisioning, automatically creating PVs when a PVC references them. Key access modes include ReadWriteOnce (single node), ReadOnlyMany (multiple nodes, read-only), and ReadWriteMany (multiple nodes, read-write). Ephemeral volumes like emptyDir are tied to the pod lifetime and are useful for sharing temporary data between co-located containers.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: fast-ssd\nprovisioner: kubernetes.io/aws-ebs  # or kubernetes.io/gce-pd, csi-hostpath-sc etc.\nparameters:\n  type: gp3\n  fsType: ext4\nreclaimPolicy: Retain  # Keep the disk even if PVC is deleted\n---\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: database-pvc\nspec:\n  storageClassName: fast-ssd\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 10Gi\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: postgres-pod\nspec:\n  containers:\n  - name: postgres\n    image: postgres:16\n    volumeMounts:\n    - name: db-storage\n      mountPath: /var/lib/postgresql/data\n  volumes:\n  - name: db-storage\n    persistentVolumeClaim:\n      claimName: database-pvc'
    },
    {
      type: 'section',
      title: 'Domain 2 — Application Deployment (20%)',
      content: 'This domain covers using Kubernetes primitives to implement common deployment strategies (blue/green, canary), understanding Deployments, rolling updates and rollbacks, using the Helm package manager to deploy existing packages, and Kustomize for template-free, overlay-based customization. Understanding how to use the \'--record\' flag (historically) and inspecting revisions is essential for auditability.'
    },
    {
      type: 'section',
      title: '2.1 Deployments, Rolling Updates, Rollbacks, Labels & Selectors',
      content: 'Labels are key-value pairs attached to objects, while Selectors are the querying engine used by controllers (like Deployments and ReplicaSets) to target and manage specific pods. Deployments handle declarative updates, enabling zero-downtime rolling updates. When a new ReplicaSet is created, it gradually scales up while the old one scales down. Rollbacks revert the deployment to a previous revision, which is vital for incident response.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: java-backend-deployment\n  annotations:\n    kubernetes.io/change-cause: "Initial deployment of v2"\nspec:\n  replicas: 4\n  selector:\n    matchLabels:\n      app: java-backend\n      tier: api\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1        # How many pods above desired count we can spin up\n      maxUnavailable: 0  # Ensure zero pods are unavailable during update\n  template:\n    metadata:\n      labels:\n        app: java-backend\n        tier: api\n        version: v2.0.0\n    spec:\n      containers:\n      - name: app\n        image: java-app:v2'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Trigger a rolling update by changing the image\nkubectl set image deployment/java-backend-deployment app=java-app:v3\n\n# Check rollout status and pause/resume\nkubectl rollout status deployment/java-backend-deployment\nkubectl rollout pause deployment/java-backend-deployment  # Freeze the rollout\nkubectl rollout resume deployment/java-backend-deployment\n\n# Roll back to the previous revision\nkubectl rollout undo deployment/java-backend-deployment\n\n# Roll back to a specific revision (e.g., revision 2)\nkubectl rollout undo deployment/java-backend-deployment --to-revision=2\n\n# View rollout history with change causes\nkubectl rollout history deployment/java-backend-deployment'
    },
    {
      type: 'section',
      title: '2.2 Deployment Strategies: Blue/Green & Canary',
      content: 'Blue/green deployments run two identical environments (blue = current, green = new) and switch traffic instantly by updating a Service\'s pod selector. Canary deployments route a small fraction of traffic to the new version (e.g., 1 out of 10 replicas), often using labels and multiple Deployments with different replica counts, then progressively scale up after validation. This reduces the blast radius of a faulty release.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: '# Canary: two Deployments sharing a common label, different track labels\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: java-api-stable\nspec:\n  replicas: 9\n  selector:\n    matchLabels:\n      app: java-api\n      track: stable\n  template:\n    metadata:\n      labels:\n        app: java-api\n        track: stable\n    spec:\n      containers:\n      - name: app\n        image: java-api:v2\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: java-api-canary\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: java-api\n      track: canary\n  template:\n    metadata:\n      labels:\n        app: java-api\n        track: canary\n    spec:\n      containers:\n      - name: app\n        image: java-api:v3'
    },
    {
      type: 'section',
      title: '2.3 Helm Package Manager',
      content: 'Helm is the package manager for Kubernetes. A Helm Chart bundles YAML manifests into a reusable, parameterized package with Go templating. The CKAD expects familiarity with installing existing charts, overriding values via --set or values files, managing releases (install, upgrade, rollback, uninstall), and understanding the difference between a Chart, a Release, and a Repository.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Add a public Helm repository\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\n\n# Search for an existing chart\nhelm search repo postgres\n\n# Install a chart release with custom values\nhelm install my-postgres bitnami/postgresql \\\n  --set auth.postgresPassword=enterprisePass \\\n  --set primary.persistence.size=20Gi \\\n  --set primary.persistence.storageClass=fast-ssd\n\n# List installed releases\nhelm list --all-namespaces\n\n# Upgrade a release with new values (or rollback if it fails)\nhelm upgrade my-postgres bitnami/postgresql --set primary.persistence.size=50Gi\nhelm history my-postgres\nhelm rollback my-postgres 1  # Rollback to revision 1\n\n# Uninstall a release (keeping history for possible rollback)\nhelm uninstall my-postgres --keep-history'
    },
    {
      type: 'section',
      title: '2.4 Kustomize',
      content: 'Kustomize provides template-free, overlay-based configuration customization using a Kubernetes-native patching mechanism. A base directory holds common manifests, while overlays patch in environment-specific differences (e.g., dev, staging, prod). It is built directly into kubectl via the -k flag and supports strategic merge patches, JSON patches, and patches for specific resources.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Apply a Kustomize directory\nkubectl apply -k overlays/production\n\n# Dry-run and view the fully rendered output\nkubectl kustomize overlays/production\n\n# Diff the changes against the live cluster\nkubectl diff -k overlays/production'
    },
    {
      type: 'code',
      language: 'yaml',
      code: '# overlays/production/kustomization.yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n- ../../base\n\n# Strategic merge patch to change replicas and add a new label\npatches:\n- target:\n    kind: Deployment\n    name: java-backend-deployment\n  patch: |-\n    - op: replace\n      path: /spec/replicas\n      value: 6\n    - op: add\n      path: /spec/template/metadata/labels/environment\n      value: production'
    },
    {
      type: 'section',
      title: 'Domain 3 — Application Observability and Maintenance (15%)',
      content: 'This domain covers understanding API deprecations, implementing probes and health checks, using built-in CLI tools to monitor Kubernetes applications, utilizing container logs, and debugging in Kubernetes. Probes must be carefully tuned to avoid cascade failures (e.g., setting initialDelaySeconds appropriately for Java\'s JVM startup).'
    },
    {
      type: 'section',
      title: '3.1 Liveness, Readiness, and Startup Probes',
      content: 'Kubernetes relies on health probes to automatically manage application lifecycle and traffic routing. A failing liveness probe restarts the container; a failing readiness probe removes the pod from service endpoints so traffic is never routed to an unready instance. A startup probe (ideal for slow-starting Java apps with heavy classpath scanning) gates liveness/readiness checks until the app has fully booted, preventing premature restarts.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'livenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080\n  initialDelaySeconds: 30\n  periodSeconds: 10\n  timeoutSeconds: 2\n  failureThreshold: 3\nreadinessProbe:\n  httpGet:\n    path: /actuator/health/readiness\n    port: 8080\n  initialDelaySeconds: 15\n  periodSeconds: 5\n  failureThreshold: 3\nstartupProbe:\n  httpGet:\n    path: /actuator/health\n    port: 8080\n  failureThreshold: 30\n  periodSeconds: 10\n# Alternative tcpSocket probe for non-HTTP services\n# tcpSocket:\n#   port: 9090'
    },
    {
      type: 'section',
      title: '3.2 Logging, Monitoring & Debugging',
      content: 'The CKAD expects fluency with kubectl built-in monitoring tools: viewing pod logs (including multi-container selection), following log streams, executing into containers for live debugging, port-forwarding for local service access, inspecting events, and describing resources to diagnose failures. Modern debugging also leverages kubectl debug to spawn ephemeral troubleshooting containers alongside the target pod without restarting it.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Stream logs from a specific container in a multi-container pod\nkubectl logs -f java-backend-pod -c java-app\n\n# Show logs from a crashed (previous) container instance\nkubectl logs java-backend-pod --previous\n\n# Execute an interactive shell inside a running container\nkubectl exec -it java-backend-pod -- /bin/sh\n\n# Forward a local port to a pod for direct testing\nkubectl port-forward pod/java-backend-pod 8080:8080\n\n# Spawn a debug container alongside the pod (without restarting)\nkubectl debug java-backend-pod -it --image=nicolaka/netshoot -- /bin/bash\n\n# Inspect cluster events sorted by timestamp\nkubectl get events --sort-by=.lastTimestamp --all-namespaces\n\n# Describe a pod to inspect its status, events, and probe failures\nkubectl describe pod java-backend-pod\n\n# Check resource usage across the cluster (Metrics Server required)\nkubectl top pod --all-namespaces\nkubectl top nodes'
    },
    {
        type: 'section',
        title: '3.3 API Deprecations',
        content: 'Kubernetes evolves its API surface across versions. The CKAD tests awareness of how to detect and respond to deprecated APIs, for example migrating from extensions/v1beta1 Ingress to networking.k8s.io/v1, or batch/v1beta1 CronJob to batch/v1. Use third-party scanners such as kube-no-trouble (kubent) or Pluto to scan live clusters and static manifests for deprecated APIs before upgrading a cluster. Always check the "Warning" header when applying manifests.'
    },
    {
      type: 'section',
      title: 'Domain 4 — Application Environment, Configuration and Security (25%)',
      content: 'The largest-weighted domain. Covers discovering and using resources that extend Kubernetes (CRDs, Operators), understanding authentication, authorization (RBAC), admission control, resource requests/limits/quotas, ConfigMaps, Secrets, ServiceAccounts (including image pull secrets), and application-level security (SecurityContexts, dropping Linux capabilities, and making filesystems read-only).'
    },
    {
      type: 'section',
      title: '4.1 Configuration Management: ConfigMaps & Secrets',
      content: 'To maintain twelve-factor application compliance, configuration data and sensitive credentials must be decoupled from container images. ConfigMaps store non-confidential configuration key-values, while Secrets safely store base64-encoded credentials, tokens, or TLS keys, which can be injected into pods as environment variables or mounted as files. Secrets can also be used for pulling images from private registries via imagePullSecrets.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Creating a ConfigMap imperatively from literal values\nkubectl create configmap app-config \\\n  --from-literal=DB_HOST=postgres.internal \\\n  --from-literal=DB_PORT=5432 \\\n  --from-literal=LOG_LEVEL=INFO\n\n# Creating a ConfigMap from a file\nkubectl create configmap app-properties --from-file=application.properties\n\n# Creating a Secret for database credentials\nkubectl create secret generic db-secret \\\n  --from-literal=PASSWORD=enterpriseSecurePass\n\n# Creating a TLS Secret for an Ingress\nkubectl create secret tls app-tls \\\n  --cert=app.crt --key=app.key\n\n# Creating a Docker registry secret for imagePullSecrets\nkubectl create secret docker-registry regcred \\\n  --docker-server=myregistry.io \\\n  --docker-username=appuser \\\n  --docker-password=apppass \\\n  --docker-email=dev@example.com'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: java-config-pod\nspec:\n  imagePullSecrets:\n  - name: regcred\n  containers:\n  - name: java-app\n    image: myregistry.io/java-backend:latest\n    envFrom:\n    - configMapRef:\n        name: app-config\n    env:\n    - name: DB_PASSWORD\n      valueFrom:\n        secretKeyRef:\n          name: db-secret\n          key: PASSWORD\n    volumeMounts:\n    - name: secret-volume\n      mountPath: /etc/secrets\n      readOnly: true\n  volumes:\n  - name: secret-volume\n    secret:\n      secretName: db-secret'
    },
    {
      type: 'section',
      title: '4.2 Resource Requests, Limits & Quotas',
      content: 'Requests define the minimum resources a container needs (used for scheduling decisions); Limits define the maximum it may consume. Exceeding limits triggers OOM-kill (memory) or CPU throttling. ResourceQuotas constrain aggregate consumption at the namespace level, while LimitRanges set per-resource defaults and bounds when a pod doesn\'t specify them. Proper sizing is essential for stable, multi-tenant clusters and cluster autoscaling behavior.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: java-sized-pod\nspec:\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    resources:\n      requests:\n        cpu: "250m"\n        memory: "512Mi"\n      limits:\n        cpu: "500m"\n        memory: "1Gi"\n---\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: production-quota\n  namespace: production\nspec:\n  hard:\n    requests.cpu: "4"\n    requests.memory: "8Gi"\n    limits.cpu: "8"\n    limits.memory: "16Gi"\n    persistentvolumeclaims: "10"\n    pods: "20"\n---\napiVersion: v1\nkind: LimitRange\nmetadata:\n  name: core-defaults\n  namespace: production\nspec:\n  limits:\n  - default:\n      cpu: 500m\n      memory: 1Gi\n    defaultRequest:\n      cpu: 200m\n      memory: 256Mi\n    type: Container'
    },
    {
      type: 'section',
      title: '4.3 ServiceAccounts, RBAC & SecurityContexts',
      content: 'ServiceAccounts provide an identity for pods to interact with the Kubernetes API. RBAC (Role, RoleBinding, ClusterRole, ClusterRoleBinding) governs what that identity may do across namespaces or cluster-wide. SecurityContexts and Linux capabilities let you run least-privilege workloads — dropping all capabilities, running as a non-root user, using a read-only root filesystem, and enforcing seccomp profiles. Namespace-scoped roles limit access to resources within a specific namespace, while ClusterRoles permit access to cluster-scoped resources (nodes, persistent volumes) or across all namespaces.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: java-app-sa\n  namespace: production\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: production\nrules:\n- apiGroups: [""]\n  resources: ["pods", "pods/log"]\n  verbs: ["get", "list", "watch"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: ClusterRole\nmetadata:\n  name: cluster-node-viewer\nrules:\n- apiGroups: [""]\n  resources: ["nodes", "persistentvolumes"]\n  verbs: ["get", "list"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: java-app-pod-reader\n  namespace: production\nsubjects:\n- kind: ServiceAccount\n  name: java-app-sa\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: hardened-java-pod\nspec:\n  serviceAccountName: java-app-sa\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 1000\n    fsGroup: 2000\n    supplementalGroups: [3000, 4000]\n    seccompProfile:\n      type: RuntimeDefault\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    securityContext:\n      allowPrivilegeEscalation: false\n      readOnlyRootFilesystem: true\n      capabilities:\n        drop: ["ALL"]\n        # Optionally add only what is strictly necessary: add: ["NET_BIND_SERVICE"]\n    volumeMounts:\n    - name: tmp-writable\n      mountPath: /tmp\n  volumes:\n  - name: tmp-writable\n    emptyDir: {}'
    },
    {
      type: 'section',
      title: '4.4 Custom Resource Definitions (CRDs) & Operators',
      content: 'CRDs extend the Kubernetes API with custom resources, enabling platform engineers to model domain-specific concepts. Operators are controllers that manage the lifecycle of those custom resources, often encapsulating Day-2 operations like backup, upgrade, and scaling. The CKAD expects you to discover and consume existing CRDs and Operators (e.g., installing a database Operator and creating an instance of its custom resource), not to author new controllers from scratch. Use \'kubectl explain\' to understand the schema of a CRD.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# List all custom resource definitions installed in the cluster\nkubectl get crds\n\n# Inspect a specific CRD to discover its schema, versions, and scope\nkubectl explain postgresqlclusters.acid.zalan.do --recursive | less\n\n# View all custom resources of a specific kind across namespaces\nkubectl get postgresqlclusters --all-namespaces\n\n# Create an instance of a custom resource from a manifest\nkubectl apply -f my-postgres-cluster.yaml\n\n# Debug a custom resource status and events\nkubectl describe postgresqlclusters my-postgres-cluster'
    },
    {
      type: 'section',
      title: 'Domain 5 — Services and Networking (20%)',
      content: 'This domain covers demonstrating a basic understanding of NetworkPolicies (both ingress and egress), providing and troubleshooting access to applications via Services (ClusterIP, NodePort, LoadBalancer, Headless), and using Ingress rules (with IngressClass) to expose applications externally. Pods have dynamic, short-lived IP addresses; Services and Ingress provide stable, routable abstractions on top of them, enabling service discovery via DNS.'
    },
    {
      type: 'section',
      title: '5.1 Service Types: ClusterIP, NodePort, LoadBalancer, Headless',
      content: 'Services provide stable network abstraction layers in front of pod groups. ClusterIP exposes pods internally via a virtual IP; NodePort exposes services on a static port (30000-32767) across every cluster node; LoadBalancer integrates with cloud provider load balancers for external ingress (AWS NLB, GCP L7 LB). Headless services (clusterIP: None) return pod IPs directly via DNS, which is essential for StatefulSet workloads requiring stable network identities. EndpointSlices are a scalable way to track network endpoints behind a service.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: java-backend-svc\nspec:\n  type: ClusterIP\n  selector:\n    app: java-backend\n    tier: api\n  ports:\n  - port: 8080\n    targetPort: 8080\n    protocol: TCP\n  sessionAffinity: ClientIP\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: java-frontend-svc\nspec:\n  type: NodePort\n  selector:\n    app: java-frontend\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: java-headless-svc\nspec:\n  clusterIP: None\n  selector:\n    app: stateful-db\n  ports:\n  - port: 5432\n    targetPort: 5432'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'ClusterIP',
          content: 'Internal-only virtual IP address. Default service type used for intra-cluster microservice communication. Supports session affinity.'
        },
        {
          label: 'NodePort',
          content: 'Exposes the service on a static port (30000-32767) across every cluster node. Suitable for dev/test external access or on-prem bare-metal setups without cloud LBs.'
        },
        {
          label: 'LoadBalancer',
          content: 'Provisions an external cloud-provider load balancer that routes traffic into the cluster. The standard production choice for external exposure on AWS, GCP, Azure, etc.'
        },
        {
          label: 'Headless (clusterIP: None)',
          content: 'No cluster IP is allocated; DNS returns individual pod IPs (A records) rather than a single virtual IP. Used by StatefulSets for stable per-pod DNS names (pod-0.headless-svc.ns.svc.cluster.local).'
        }
      ]
    },
    {
      type: 'section',
      title: '5.2 Ingress with IngressClass',
      content: 'Ingress manages external HTTP/HTTPS access to services within a cluster, providing name-based virtual hosting, TLS termination, and path-based routing. An Ingress controller (e.g., NGINX Ingress, Traefik, AWS ALB Ingress Controller) must be running in the cluster to satisfy Ingress rules. The IngressClass resource defines which controller and configuration to use, allowing multiple ingress controllers in a single cluster.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: java-app-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\n    nginx.ingress.kubernetes.io/ssl-redirect: "true"\nspec:\n  ingressClassName: nginx  # Explicitly references the IngressClass\n  tls:\n  - hosts:\n    - api.example.com\n    secretName: app-tls\n  rules:\n  - host: api.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service:\n            name: java-backend-svc\n            port:\n              number: 8080\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: java-frontend-svc\n            port:\n              number: 80'
    },
    {
      type: 'section',
      title: '5.3 Network Policies for Pod Security (Ingress & Egress)',
      content: 'By default, all pods in a Kubernetes cluster can communicate with all other pods freely (flat networking). NetworkPolicies act as virtual firewall rules applied at the pod level, restricting ingress (incoming) and egress (outgoing) traffic based on namespaces, pod selectors, or CIDR IP blocks. A NetworkPolicy is additive: once any policy selects a pod, it is isolated from all traffic not explicitly allowed. Applying both ingress and egress policies enforces a zero-trust network model within the cluster.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-isolation-policy\nspec:\n  podSelector:\n    matchLabels:\n      role: database\n  policyTypes:\n    - Ingress\n    - Egress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          role: backend\n      namespaceSelector:\n        matchLabels:\n          kubernetes.io/metadata.name: production\n    ports:\n    - protocol: TCP\n      port: 5432\n  egress:\n  - to:\n    - ipBlock:\n        cidr: 10.0.0.0/8\n        except:\n        - 10.0.1.0/24\n    ports:\n    - protocol: TCP\n      port: 53  # DNS resolution for internal services\n    - protocol: UDP\n      port: 53'
    },
    {
      type: 'table',
      columns: ['CKAD Domain (2025)', 'Weight', 'Core Objects / Tools', 'Primary Architectural Focus'],
      rows: [
        ['Application Design and Build', '20%', 'Pods, Deployments, StatefulSets, Jobs, CronJobs, DaemonSets, multi-container patterns, PV/PVC/StorageClasses', 'Building container images, choosing workloads, multi-container design, persistent storage access modes and dynamic provisioning.'],
        ['Application Deployment', '20%', 'Deployments (RollingUpdate/Recreate), Helm, Kustomize, Blue/Green & Canary', 'Deployment strategies, zero-downtime rolling updates, rollback to revisions, package management (Helm), overlay customization (Kustomize).'],
        ['Application Observability and Maintenance', '15%', 'Liveness/Readiness/Startup Probes, kubectl logs/exec/top/port-forward/debug, describe, events, API deprecations', 'Health checks, container logging, live debugging, performance monitoring, API migration awareness.'],
        ['Application Environment, Configuration and Security', '25%', 'ConfigMaps, Secrets, ServiceAccounts, RBAC (ClusterRoles), ResourceQuotas, LimitRanges, SecurityContexts, CRDs/Operators', 'Configuration injection, secret management, identity & authorization, resource governance, application hardening (drop caps, read-only FS), extending the API.'],
        ['Services and Networking', '20%', 'ClusterIP, NodePort, LoadBalancer, Headless, Ingress (IngressClass), NetworkPolicy (Ingress/Egress)', 'Service discovery, internal/external exposure, L7 HTTP routing with TLS, traffic isolation and zero-trust network policies.']
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Mastering the CKAD curriculum requires deep familiarity with declarative YAML manifests, container health instrumentation, secure configuration management, resilient storage claims (including StorageClasses and access modes), Helm and Kustomize deployment workflows, ClusterRole-based RBAC, SecurityContext hardening (non-root, read-only FS), and strict network isolation policies (ingress and egress). Speed with imperative kubectl commands (create, label, annotate, set image, rollout undo, expose) and YAML authoring is as important as conceptual understanding in the timed exam environment.'
    }
  ],
  explanation: 'A comprehensive, enterprise-grade masterclass aligned to the 2025 Certified Kubernetes Application Developer (CKAD) exam blueprint, covering all five domains: Application Design and Build (20%), Application Deployment (20%), Application Observability and Maintenance (15%), Application Environment, Configuration and Security (25%), and Services and Networking (20%). Includes multi-container design patterns, deployment strategies (blue/green, canary), Helm/Kustomize, probes (liveness/readiness/startup), logging/debugging, ConfigMaps/Secrets, RBAC (Roles/ClusterRoles), SecurityContexts, CRDs/Operators, Services (ClusterIP/NodePort/LoadBalancer/Headless), Ingress with IngressClass, and NetworkPolicies (Ingress & Egress).',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
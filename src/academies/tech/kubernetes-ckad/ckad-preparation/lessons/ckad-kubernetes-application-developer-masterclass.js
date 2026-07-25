import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-ckad-kubernetes-application-developer-masterclass',
  category: 'kubernetes-ckad',
  topicId: 'ckad-preparation',
  title: 'Certified Kubernetes Application Developer (CKAD): Comprehensive Masterclass',
  difficulty: 'Easy',
  prompt: 'A rigorous, production-grade masterclass covering the full Certified Kubernetes Application Developer (CKAD) curriculum (2025), aligned to the five official exam domains: Application Design and Build (20%), Application Deployment (20%), Application Observability and Maintenance (15%), Application Environment, Configuration and Security (25%), and Services and Networking (20%).',
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
      content: 'Modern enterprise applications, especially high-throughput Java microservices, are increasingly containerized and orchestrated via Kubernetes. The Certified Kubernetes Application Developer (CKAD) certification validates an engineer\'s ability to design, build, configure, and expose cloud-native applications in production Kubernetes clusters. This masterclass spans the five official CKAD exam domains, covering core primitives, multi-container architectural patterns, deployment strategies, observability, state persistence, configuration, security, services, and networking.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'CKAD 2025 Exam Blueprint',
      content: 'The CKAD exam is a 2-hour, hands-on, performance-based assessment conducted in a live Kubernetes cluster. The five domains and their weightings are: Application Design and Build (20%), Application Deployment (20%), Application Observability and Maintenance (15%), Application Environment, Configuration and Security (25%), and Services and Networking (20%). Candidates may use the official Kubernetes documentation during the exam, but speed and accuracy with imperative commands and YAML authoring are essential.'
    },
    {
      type: 'section',
      title: 'Domain 1 — Application Design and Build (20%)',
      content: 'This domain validates the ability to define, build, and modify container images, choose the right workload resource (Deployment, DaemonSet, CronJob, Job), understand multi-container Pod design patterns (sidecar, init, adapter, ambassador), and utilize persistent and ephemeral volumes. The Pod is the smallest deployable computing unit, representing one or more containers sharing storage and network namespaces.'
    },
    {
      type: 'section',
      title: '1.1 Pods, Namespaces & Imperative Commands',
      content: 'Namespaces provide logical isolation within a single cluster. While declarative YAML manifests are mandatory for production GitOps workflows, mastering rapid imperative commands is vital for speed during the timed CKAD environment.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Rapid imperative generation of a pod YAML manifest without deploying\nkubectl run nginx-pod --image=nginx:alpine --dry-run=client -o yaml > pod.yaml\n\n# Imperatively creating a deployment with scaling parameters\nkubectl create deployment java-api --image=java-backend:latest --replicas=3 -n production\n\n# Generate a Job YAML for a batch task\nkubectl create job pi-compute --image=java-batch:latest --dry-run=client -o yaml > job.yaml\n\n# Generate a CronJob YAML for a scheduled task\nkubectl create cronjob nightly-report --image=java-report:latest --schedule="0 2 * * *" --dry-run=client -o yaml > cronjob.yaml'
    },
    {
      type: 'section',
      title: '1.2 Choosing the Right Workload Resource',
      content: 'Kubernetes provides several workload resources, each suited to a different application pattern. Selecting the correct resource is a core CKAD competency.'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'Deployment',
          content: 'Stateless, scalable applications with rolling updates and rollbacks. The default choice for web services and APIs.'
        },
        {
          label: 'StatefulSet',
          content: 'Stateful applications requiring stable network identities and persistent storage ordered startup (e.g., databases, message brokers).'
        },
        {
          label: 'DaemonSet',
          content: 'Runs a copy of a Pod on every (or selected) node in the cluster. Ideal for log collectors, node monitors, and storage daemons.'
        },
        {
          label: 'Job / CronJob',
          content: 'Runs a Pod to completion (Job) or on a schedule (CronJob). Used for batch processing, backups, and periodic reports.'
        }
      ]
    },
    {
      type: 'section',
      title: '1.3 Multi-Container Pod Design Patterns',
      content: 'A single Pod can house multiple containers that share localhost networking and storage volumes. Kubernetes defines several classic multi-container design patterns to solve tightly coupled software orchestration challenges. Init containers run to completion before app containers start, useful for setup and dependency-wait logic.'
    },
    {
      type: 'checklist',
      title: 'Multi-Container Design Patterns',
      items: [
        'Sidecar Pattern: Extends or enhances the main application container (e.g., a logging agent or mesh proxy streaming app logs).',
        'Adapter Pattern: Standardizes or transforms output from the primary container so external systems can ingest it uniformly.',
        'Ambassador Pattern: Acts as a proxying intermediary routing local application traffic out to external databases or services.',
        'Init Container Pattern: Runs a preparatory container to completion before the main app starts (e.g., waiting for a DB, seeding data).'
      ]
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: java-sidecar-pod\nspec:\n  initContainers:\n  - name: init-db-wait\n    image: busybox:latest\n    command: [\'sh\', \'-c\', \'until nslookup postgres; do sleep 2; done;\']\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    ports:\n    - containerPort: 8080\n  - name: log-forwarder\n    image: fluent-bit:latest\n    volumeMounts:\n    - name: shared-logs\n      mountPath: /var/log/app\n  volumes:\n  - name: shared-logs\n    emptyDir: {}'
    },
    {
      type: 'section',
      title: '1.4 Persistent and Ephemeral Volumes',
      content: 'Pods are inherently ephemeral; data written to container local filesystems is lost upon pod termination. PersistentVolumes (PV) represent cluster-wide storage provisioned by administrators, while PersistentVolumeClaims (PVC) represent user requests for storage resources. Ephemeral volumes like emptyDir are tied to the pod lifetime and are useful for sharing data between co-located containers.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: PersistentVolumeClaim\nmetadata:\n  name: database-pvc\nspec:\n  accessModes:\n    - ReadWriteOnce\n  resources:\n    requests:\n      storage: 10Gi\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: postgres-pod\nspec:\n  containers:\n  - name: postgres\n    image: postgres:16\n    volumeMounts:\n    - name: db-storage\n      mountPath: /var/lib/postgresql/data\n  volumes:\n  - name: db-storage\n    persistentVolumeClaim:\n      claimName: database-pvc'
    },
    {
      type: 'section',
      title: 'Domain 2 — Application Deployment (20%)',
      content: 'This domain covers using Kubernetes primitives to implement common deployment strategies (blue/green, canary), understanding Deployments and rolling updates, using the Helm package manager to deploy existing packages, and Kustomize for template-free, overlay-based customization.'
    },
    {
      type: 'section',
      title: '2.1 Deployments, Rolling Updates & Rollbacks',
      content: 'Labels are key-value pairs attached to objects, while Selectors are the querying engine used by controllers (like Deployments and ReplicaSets) to target and manage specific pods. Deployments handle declarative updates, enabling zero-downtime rolling updates and rollbacks.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: java-backend-deployment\nspec:\n  replicas: 4\n  selector:\n    matchLabels:\n      app: java-backend\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  template:\n    metadata:\n      labels:\n        app: java-backend\n    spec:\n      containers:\n      - name: app\n        image: java-app:v2'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Trigger a rolling update by changing the image\nkubectl set image deployment/java-backend-deployment app=java-app:v3\n\n# Check rollout status\nkubectl rollout status deployment/java-backend-deployment\n\n# Roll back to the previous revision\nkubectl rollout undo deployment/java-backend-deployment\n\n# View rollout history\nkubectl rollout history deployment/java-backend-deployment'
    },
    {
      type: 'section',
      title: '2.2 Deployment Strategies: Blue/Green & Canary',
      content: 'Blue/green deployments run two identical environments (blue = current, green = new) and switch traffic by updating a Service selector. Canary deployments route a small fraction of traffic to the new version, often using labels and multiple Deployments with different replica counts, then progressively scale up after validation.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: '# Canary: two Deployments sharing a common label, different track labels\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: java-api-stable\nspec:\n  replicas: 9\n  selector:\n    matchLabels:\n      app: java-api\n      track: stable\n  template:\n    metadata:\n      labels:\n        app: java-api\n        track: stable\n    spec:\n      containers:\n      - name: app\n        image: java-api:v2\n---\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: java-api-canary\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: java-api\n      track: canary\n  template:\n    metadata:\n      labels:\n        app: java-api\n        track: canary\n    spec:\n      containers:\n      - name: app\n        image: java-api:v3'
    },
    {
      type: 'section',
      title: '2.3 Helm Package Manager',
      content: 'Helm is the package manager for Kubernetes. A Helm Chart bundles YAML manifests into a reusable, parameterized package. The CKAD expects familiarity with installing existing charts, overriding values, and managing releases.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Add a public Helm repository\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\n\n# Search for an existing chart\nhelm search repo postgres\n\n# Install a chart release with custom values\nhelm install my-postgres bitnami/postgresql \\\n  --set auth.postgresPassword=enterprisePass \\\n  --set primary.persistence.size=20Gi\n\n# List installed releases\nhelm list\n\n# Upgrade a release with new values\nhelm upgrade my-postgres bitnami/postgresql --set primary.persistence.size=50Gi\n\n# Uninstall a release\nhelm uninstall my-postgres'
    },
    {
      type: 'section',
      title: '2.4 Kustomize',
      content: 'Kustomize provides template-free, overlay-based configuration customization. A base directory holds common manifests, while overlays patch in environment-specific differences (e.g., dev vs. prod). It is built into kubectl via the -k flag.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Apply a Kustomize directory\nkubectl apply -k overlays/production\n\n# Dry-run and view the rendered output\nkubectl kustomize overlays/production'
    },
    {
      type: 'code',
      language: 'yaml',
      code: '# overlays/production/kustomization.yaml\napiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n- ../../base\npatches:\n- target:\n    kind: Deployment\n    name: java-backend-deployment\n  patch: |-\n    - op: replace\n      path: /spec/replicas\n      value: 6'
    },
    {
      type: 'section',
      title: 'Domain 3 — Application Observability and Maintenance (15%)',
      content: 'This domain covers understanding API deprecations, implementing probes and health checks, using built-in CLI tools to monitor Kubernetes applications, utilizing container logs, and debugging in Kubernetes.'
    },
    {
      type: 'section',
      title: '3.1 Liveness, Readiness, and Startup Probes',
      content: 'Kubernetes relies on health probes to automatically manage application lifecycle and traffic routing. A failing liveness probe restarts the container; a failing readiness probe removes the pod from service endpoints so traffic is never routed to a warming or crashing instance. A startup probe (ideal for slow-startting Java apps) gates liveness/readiness checks until the app has booted.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'livenessProbe:\n  httpGet:\n    path: /actuator/health/liveness\n    port: 8080\n  initialDelaySeconds: 30\n  periodSeconds: 10\nreadinessProbe:\n  httpGet:\n    path: /actuator/health/readiness\n    port: 8080\n  initialDelaySeconds: 15\n  periodSeconds: 5\nstartupProbe:\n  httpGet:\n    path: /actuator/health\n    port: 8080\n  failureThreshold: 30\n  periodSeconds: 10'
    },
    {
      type: 'section',
      title: '3.2 Logging, Monitoring & Debugging',
      content: 'The CKAD expects fluency with kubectl built-in monitoring tools: viewing pod logs, following log streams, executing into containers, inspecting events, and describing resources to diagnose failures.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Stream logs from a pod\nkubectl logs -f java-backend-pod -c java-app\n\n# Show logs from a crashed (previous) container instance\nkubectl logs java-backend-pod --previous\n\n# Execute an interactive shell inside a running container\nkubectl exec -it java-backend-pod -- /bin/sh\n\n# Inspect cluster events sorted by timestamp\nkubectl get events --sort-by=.lastTimestamp\n\n# Describe a pod to inspect its status, events, and probe failures\nkubectl describe pod java-backend-pod\n\n# Check resource usage across the cluster\nkubectl top pod --all-namespaces\nkubectl top nodes'
    },
    {
        type: 'section',
        title: '3.3 API Deprecations',
        content: 'Kubernetes evolves its API surface across versions. The CKAD tests awareness of how to detect and respond to deprecated APIs, for example migrating from extensions/v1beta1 Ingress to networking.k8s.io/v1, or batch/v1beta1 CronJob to batch/v1. Use third-party scanners such as kube-no-trouble (kubent) or Pluto to scan live clusters and static manifests for deprecated APIs before upgrading a cluster.'
    },
    {
      type: 'section',
      title: 'Domain 4 — Application Environment, Configuration and Security (25%)',
      content: 'The largest-weighted domain. Covers discovering and using resources that extend Kubernetes (CRDs, Operators), understanding authentication, authorization, and admission control, requests/limits/quotas, ConfigMaps, Secrets, ServiceAccounts, and application security (SecurityContexts, capabilities).'
    },
    {
      type: 'section',
      title: '4.1 Configuration Management: ConfigMaps & Secrets',
      content: 'To maintain twelve-factor application compliance, configuration data and sensitive credentials must be decoupled from container images. ConfigMaps store non-confidential configuration key-values, while Secrets safely store base64-encoded credentials, tokens, or TLS keys, which can be injected into pods as environment variables or mounted files.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Creating a ConfigMap imperatively from literal values\nkubectl create configmap app-config \\\n  --from-literal=DB_HOST=postgres.internal \\\n  --from-literal=DB_PORT=5432\n\n# Creating a ConfigMap from a file\nkubectl create configmap app-properties --from-file=application.properties\n\n# Creating a Secret for database credentials\nkubectl create secret generic db-secret \\\n  --from-literal=PASSWORD=enterpriseSecurePass\n\n# Creating a TLS Secret for an Ingress\nkubectl create secret tls app-tls \\\n  --cert=app.crt --key=app.key'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: java-config-pod\nspec:\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    envFrom:\n    - configMapRef:\n        name: app-config\n    env:\n    - name: DB_PASSWORD\n      valueFrom:\n        secretKeyRef:\n          name: db-secret\n          key: PASSWORD\n    volumeMounts:\n    - name: secret-volume\n      mountPath: /etc/secrets\n      readOnly: true\n  volumes:\n  - name: secret-volume\n    secret:\n      secretName: db-secret'
    },
    {
      type: 'section',
      title: '4.2 Resource Requests, Limits & Quotas',
      content: 'Requests define the minimum resources a container needs (used for scheduling); Limits define the maximum it may consume. ResourceQuotas constrain aggregate consumption at the namespace level, while LimitRanges set per-resource defaults and bounds. Proper sizing is essential for stable, multi-tenant clusters.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: java-sized-pod\nspec:\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    resources:\n      requests:\n        cpu: "250m"\n        memory: "512Mi"\n      limits:\n        cpu: "500m"\n        memory: "1Gi"\n---\napiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: production-quota\n  namespace: production\nspec:\n  hard:\n    requests.cpu: "4"\n    requests.memory: "8Gi"\n    limits.cpu: "8"\n    limits.memory: "16Gi"\n    pods: "20"'
    },
    {
      type: 'section',
      title: '4.3 ServiceAccounts, RBAC & SecurityContexts',
      content: 'ServiceAccounts provide an identity for pods to interact with the Kubernetes API. RBAC (Role, RoleBinding, ClusterRole, ClusterRoleBinding) governs what that identity may do. SecurityContexts and Linux capabilities let you run least-privilege workloads — dropping capabilities, running as non-root, and making filesystems read-only.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: ServiceAccount\nmetadata:\n  name: java-app-sa\n  namespace: production\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: pod-reader\n  namespace: production\nrules:\n- apiGroups: [""]\n  resources: ["pods", "pods/log"]\n  verbs: ["get", "list", "watch"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: java-app-pod-reader\n  namespace: production\nsubjects:\n- kind: ServiceAccount\n  name: java-app-sa\nroleRef:\n  kind: Role\n  name: pod-reader\n  apiGroup: rbac.authorization.k8s.io\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: hardened-java-pod\nspec:\n  serviceAccountName: java-app-sa\n  securityContext:\n    runAsNonRoot: true\n    runAsUser: 1000\n    fsGroup: 2000\n  containers:\n  - name: java-app\n    image: java-backend:latest\n    securityContext:\n      allowPrivilegeEscalation: false\n      readOnlyRootFilesystem: true\n      capabilities:\n        drop: ["ALL"]'
    },
    {
      type: 'section',
      title: '4.4 Custom Resource Definitions (CRDs) & Operators',
      content: 'CRDs extend the Kubernetes API with custom resources, while Operators are controllers that manage the lifecycle of those custom resources. The CKAD expects you to discover and consume existing CRDs and Operators (e.g., installing a database Operator and creating an instance of its custom resource), not to author new ones from scratch.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# List all custom resource definitions installed in the cluster\nkubectl get crds\n\n# Inspect a specific CRD to discover its schema and verbs\nkubectl explain postgresqlclusters.acid.zalan.do --recursive | less\n\n# Create an instance of a custom resource\nkubectl apply -f my-postgres-cluster.yaml'
    },
    {
      type: 'section',
      title: 'Domain 5 — Services and Networking (20%)',
      content: 'This domain covers demonstrating a basic understanding of NetworkPolicies, providing and troubleshooting access to applications via Services, and using Ingress rules to expose applications. Pods have dynamic, short-lived IP addresses; Services and Ingress provide stable, routable abstractions on top of them.'
    },
    {
      type: 'section',
      title: '5.1 Service Types: ClusterIP, NodePort, LoadBalancer',
      content: 'Services provide stable network abstraction layers in front of pod groups. ClusterIP exposes pods internally; NodePort exposes services on a static port across every cluster node; LoadBalancer integrates with cloud provider load balancers for external ingress. Headless services (clusterIP: None) return pod IPs directly for stateful workloads.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: java-backend-svc\nspec:\n  type: ClusterIP\n  selector:\n    app: java-backend\n  ports:\n  - port: 8080\n    targetPort: 8080\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: java-frontend-svc\nspec:\n  type: NodePort\n  selector:\n    app: java-frontend\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080'
    },
    {
      type: 'comparison',
      items: [
        {
          label: 'ClusterIP',
          content: 'Internal-only virtual IP address. Default service type used for intra-cluster microservice communication.'
        },
        {
          label: 'NodePort',
          content: 'Exposes the service on a static port (30000-32767) across every cluster node. Suitable for dev/test external access.'
        },
        {
          label: 'LoadBalancer',
          content: 'Provisions an external cloud-provider load balancer that routes traffic into the cluster. The standard production choice for external exposure.'
        },
        {
          label: 'Headless (clusterIP: None)',
          content: 'No cluster IP is allocated; DNS returns individual pod IPs. Used by StatefulSets for stable per-pod DNS names.'
        }
      ]
    },
    {
      type: 'section',
      title: '5.2 Ingress',
      content: 'Ingress manages external HTTP/HTTPS access to services within a cluster, providing name-based virtual hosting, TLS termination, and path-based routing. An Ingress controller (e.g., NGINX Ingress, Traefik) must be running in the cluster to satisfy Ingress rules.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: java-app-ingress\n  annotations:\n    nginx.ingress.kubernetes.io/rewrite-target: /\nspec:\n  tls:\n  - hosts:\n    - api.example.com\n    secretName: app-tls\n  rules:\n  - host: api.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service:\n            name: java-backend-svc\n            port:\n              number: 8080\n      - path: /\n        pathType: Prefix\n        backend:\n          service:\n            name: java-frontend-svc\n            port:\n              number: 80'
    },
    {
      type: 'section',
      title: '5.3 Network Policies for Pod Security',
      content: 'By default, all pods in a Kubernetes cluster can communicate with all other pods freely (flat networking). NetworkPolicies act as virtual firewall rules applied at the pod level, restricting ingress and egress traffic based on namespaces, pod selectors, or CIDR IP blocks. A NetworkPolicy is additive: once any policy selects a pod, it is isolated from all traffic not explicitly allowed.'
    },
    {
      type: 'code',
      language: 'yaml',
      code: 'apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-isolation-policy\nspec:\n  podSelector:\n    matchLabels:\n      role: database\n  policyTypes:\n    - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          role: backend\n    ports:\n    - protocol: TCP\n      port: 5432'
    },
    {
      type: 'table',
      columns: ['CKAD Domain (2025)', 'Weight', 'Core Objects / Tools', 'Primary Architectural Focus'],
      rows: [
        ['Application Design and Build', '20%', 'Pods, Deployments, Jobs, CronJobs, DaemonSets, multi-container patterns, volumes', 'Building container images, choosing workloads, multi-container design, persistent/ephemeral storage.'],
        ['Application Deployment', '20%', 'Deployments, RollingUpdates, Helm, Kustomize', 'Deployment strategies (blue/green, canary), rolling updates, package management, overlay customization.'],
        ['Application Observability and Maintenance', '15%', 'Probes, kubectl logs/exec/top, describe, events, API deprecations', 'Health checks, logging, monitoring, debugging, API migration awareness.'],
        ['Application Environment, Configuration and Security', '25%', 'ConfigMaps, Secrets, ServiceAccounts, RBAC, ResourceQuotas, SecurityContexts, CRDs, Operators', 'Configuration, identity, authorization, resource governance, application hardening, cluster extension.'],
        ['Services and Networking', '20%', 'ClusterIP, NodePort, LoadBalancer, Ingress, NetworkPolicy', 'Service discovery, external exposure, L7 routing, traffic security isolation.']
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Mastering the CKAD curriculum requires deep familiarity with declarative YAML manifests, container health instrumentation, secure configuration management, resilient storage claims, Helm and Kustomize deployment workflows, RBAC and SecurityContext hardening, and strict network isolation policies. Speed with imperative kubectl commands and YAML authoring is as important as conceptual understanding in the timed exam environment.'
    }
  ],
  explanation: 'A comprehensive, enterprise-grade masterclass aligned to the 2025 Certified Kubernetes Application Developer (CKAD) exam blueprint, covering all five domains: Application Design and Build (20%), Application Deployment (20%), Application Observability and Maintenance (15%), Application Environment, Configuration and Security (25%), and Services and Networking (20%). Includes multi-container design patterns, deployment strategies, Helm/Kustomize, probes, logging, ConfigMaps, Secrets, RBAC, SecurityContexts, CRDs/Operators, Services, Ingress, and NetworkPolicies.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;

# KubeTasker: CKAD Incremental Project Design

## Purpose

KubeTasker is the reference practical project for the Kubernetes CKAD learning track in Senior Dev Accelerator.

The goal is to create one small but realistic application that learners build, deploy, configure, expose, debug, secure, and operate incrementally. Each stage of the CKAD category should add one meaningful Kubernetes layer to the same project instead of using unrelated toy examples.

This project is exam-pass-oriented, but it should not promise a guaranteed certification result. The content should prepare learners through repeated practical execution, timed drills, verification habits, and weak-area correction.

## Technology choice

Use **Python FastAPI** for the first implementation.

Reasons:

- Small container images compared to a typical Spring Boot app.
- Fast startup, which is helpful for probes, rollouts, restarts, and CKAD-style drills.
- Simple endpoint implementation for health, readiness, storage, config, security, metrics, and simulation behavior.
- Easy for learners to understand even when their main goal is Kubernetes, not application development.
- Good fit for lightweight local clusters such as kind, minikube, or Docker Desktop Kubernetes.

Spring Boot can be added later as an alternative implementation, but the first CKAD training version should use Python to reduce friction.

## Project story

KubeTasker is a small task/order processing platform.

The learner gradually deploys and operates the following pieces:

```text
client pod / frontend simulator
        |
        v
kube-tasker-api
        |
        +--> kube-tasker-worker
        |
        +--> config maps and secrets
        |
        +--> mounted config and secret files
        |
        +--> emptyDir / PVC-backed task storage
        |
        +--> reporter CronJob
```

The project should remain intentionally simple, but it must be designed to expose the most important CKAD learning areas.

## Components

### 1. kube-tasker-api

Main FastAPI application.

Responsibilities:

- Accept and list tasks.
- Expose health, liveness, readiness, and startup endpoints.
- Read configuration from environment variables.
- Read configuration from mounted ConfigMap files.
- Read secret values from environment variables and mounted Secret files.
- Write and read task data from memory or file storage.
- Support intentional failure simulation.
- Expose basic metrics.
- Provide security/runtime status.

Suggested endpoints:

```text
GET  /health
GET  /livez
GET  /readyz
GET  /startupz
GET  /version
GET  /config
GET  /secret-status
GET  /storage/status
GET  /security/status
GET  /metrics
POST /tasks
GET  /tasks
POST /simulate/readiness-failure
POST /simulate/liveness-failure
POST /simulate/slow-startup
POST /simulate/storage-failure
POST /simulate/high-memory
POST /simulate/reset
```

### 2. kube-tasker-worker

Background worker process.

Responsibilities:

- Read API URL from config.
- Poll the API or read shared task storage.
- Process pending tasks.
- Log processed task ids.
- Fail clearly when required config or secret is missing.
- Demonstrate Deployment, logs, environment variables, resources, and debugging.

### 3. kube-tasker-client

Simple test client pod.

Responsibilities:

- Run curl/wget/nslookup commands from inside the cluster.
- Verify Kubernetes DNS and Service routing.
- Help learners debug networking problems.

This can be based on a lightweight image such as curlimages/curl or busybox, depending on the lab requirement.

### 4. kube-tasker-reporter

CronJob-based reporting component.

Responsibilities:

- Run on a schedule.
- Read task data or call the API.
- Write a summary report to a mounted path.
- Demonstrate Jobs, CronJobs, logs, completion status, and troubleshooting failed runs.

## Configuration model

KubeTasker should support both environment-based and file-based configuration.

Example environment variables:

```text
APP_NAME=KubeTasker
APP_MODE=training
APP_VERSION=1.0.0
TASK_LIMIT=100
REQUIRE_SECRET=true
REQUIRE_CONFIG_FILE=true
STORAGE_MODE=memory
TASK_STORAGE_PATH=/data/tasks.json
STARTUP_DELAY_SECONDS=0
READINESS_MODE=normal
LIVENESS_MODE=normal
METRICS_ENABLED=true
```

Example mounted config file path:

```text
/etc/kubetasker/config/app.properties
```

Example mounted secret file path:

```text
/etc/kubetasker/secret/api-token
```

The app should expose `/config` and `/secret-status` so learners can verify whether configuration and secrets were injected correctly without exposing raw secret values.

## Health and probe behavior

### `/livez`

Returns 200 when the process is alive.

Can be forced to fail by simulation mode, for example:

```text
LIVENESS_MODE=fail
```

or by a simulation endpoint.

### `/readyz`

Returns 200 only when the app is ready to receive traffic.

Readiness should depend on checks such as:

- required environment variables are present;
- required config file exists when `REQUIRE_CONFIG_FILE=true`;
- required secret exists when `REQUIRE_SECRET=true`;
- storage path is writable when `STORAGE_MODE=file`;
- startup delay has completed;
- readiness failure simulation is not active.

### `/startupz`

Returns 200 only after the configured startup delay has passed.

This allows learners to practice startup probes and slow-starting applications.

## Storage behavior

KubeTasker should support at least two storage modes.

### Memory mode

```text
STORAGE_MODE=memory
```

Tasks are kept in memory and disappear when the pod restarts.

### File mode

```text
STORAGE_MODE=file
TASK_STORAGE_PATH=/data/tasks.json
```

Tasks are written to a file.

This enables labs for:

- emptyDir;
- PVC;
- missing volume mounts;
- read-only filesystem issues;
- persistence verification after pod restart.

## Security behavior

KubeTasker should be compatible with hardened pod security settings.

Target securityContext example:

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 10001
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
```

Because `readOnlyRootFilesystem` may break apps that write to default paths, KubeTasker should support explicit writable paths such as:

```text
/tmp
/data
```

The `/security/status` endpoint should report non-sensitive runtime details such as:

```json
{
  "uid": 10001,
  "canWriteTmp": true,
  "canWriteData": true,
  "storagePathWritable": true,
  "readOnlyRootFilesystemCompatible": true
}
```

## Metrics behavior

Expose a simple text-based `/metrics` endpoint.

Example output:

```text
kubetasker_tasks_created_total 10
kubetasker_tasks_processed_total 8
kubetasker_readiness_failures_total 1
kubetasker_storage_writes_total 5
kubetasker_liveness_failures_total 0
```

This does not need a full Prometheus setup for the first version. The goal is to teach learners to verify application behavior and observe useful counters.

## Failure simulation

KubeTasker should intentionally support failure modes that are useful for CKAD practice.

Suggested failure scenarios:

| Scenario | Trigger | Learning purpose |
|---|---|---|
| Missing ConfigMap | remove required env/config file | debug env and mounted config |
| Missing Secret | remove required secret | debug secret injection |
| Bad readiness | wrong path/port or readiness simulation | readiness probe troubleshooting |
| Bad liveness | liveness simulation | restart behavior |
| Slow startup | startup delay | startupProbe practice |
| Bad service selector | manifest issue | Service/endpoints debugging |
| Wrong targetPort | manifest issue | Service networking debugging |
| Storage not writable | missing mount/read-only FS | volume/security debugging |
| Worker cannot reach API | wrong API URL/service name | DNS and networking practice |
| CronJob failure | wrong command/env | Job/CronJob troubleshooting |

## Incremental CKAD stages

Each stage should be implemented as one practice item in the CKAD category while continuing the same KubeTasker story.

| Stage | Focus | KubeTasker change |
|---:|---|---|
| 1 | Foundation deployment | Deploy namespace, API Deployment, API Service, and client pod |
| 2 | Runtime config | Add ConfigMap, Secret, env vars, and mounted config files |
| 3 | Health and rollout | Add startup, readiness, and liveness probes |
| 4 | Networking | Connect client/API/worker with Services and selectors |
| 5 | Batch workloads | Add reporter Job/CronJob |
| 6 | Storage | Add emptyDir first, then PVC-backed file storage |
| 7 | Security | Add non-root user, read-only root filesystem, dropped capabilities |
| 8 | Observability/debugging | Diagnose broken integrated manifests using logs/events/describe/exec |
| 9 | Reliability/resources | Add requests, limits, replicas, rollout checks, and scheduling constraints where appropriate |
| 10 | Capstone | Rebuild and fix the full system under timed CKAD-style conditions |

## Suggested repository layout

```text
kubetasker/
  api/
    app/
      main.py
      config.py
      storage.py
      simulation.py
      metrics.py
    requirements.txt
    Dockerfile
  worker/
    worker.py
    requirements.txt
    Dockerfile
  manifests/
    base/
    stages/
      01-foundation/
      02-config-secrets/
      03-probes/
      04-networking/
      05-jobs-cronjobs/
      06-storage/
      07-security/
      08-debugging/
      09-reliability/
      10-capstone/
```

The actual training problems can live in the existing Senior Dev Accelerator problem structure, but this layout describes the reference app and manifest assets.

## CKAD learning goals covered

KubeTasker should cover:

- Pods
- Deployments
- ReplicaSets
- Services
- ConfigMaps
- Secrets
- Environment variables
- Volume mounts
- emptyDir
- PVC usage
- Jobs
- CronJobs
- Probes
- Logs
- Events
- exec/debugging
- Resource requests and limits
- SecurityContext
- ServiceAccounts where useful
- Rollout status and rollout debugging
- Kubernetes DNS and Service discovery

## Readiness standard for learners

A learner should be considered ready for the capstone when they can repeatedly:

- deploy KubeTasker from manifests;
- fix broken manifests quickly;
- inspect pods, services, events, logs, and rollout state;
- verify app behavior through the client pod;
- explain why each Kubernetes object exists;
- complete stage-level tasks under time pressure;
- identify which CKAD domain a failure belongs to.

## First implementation recommendation

Start with only the API component and minimal manifests.

Initial milestone:

1. Create FastAPI app with `/health`, `/livez`, `/readyz`, `/startupz`, `/version`, `/config`, `/tasks`, and `/metrics`.
2. Add memory storage only.
3. Add Dockerfile.
4. Add base Deployment and Service manifests.
5. Add one client pod manifest for curl-based verification.
6. Add the first CKAD practice item for stage 1.

After that, add config/secrets, storage, worker, reporter CronJob, security, debugging, and capstone stages incrementally.
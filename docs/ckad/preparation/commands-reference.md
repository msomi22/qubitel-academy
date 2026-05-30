# CKAD preparation command reference

Use this as a copy/paste reference while preparing for the KubeTasker CKAD stages.

The examples use `k` as shorthand for `kubectl`.

## Cluster checks

```bash
k version --client
k cluster-info
k get nodes -o wide
k get pods -A
```

## Namespace workflow

```bash
k create namespace kubetasker
k get namespaces
k config set-context --current --namespace=kubetasker
k config view --minify | grep namespace
```

## Deployment workflow

```bash
k create deployment kube-tasker-api \
  --image=msomi22/kubetasker-api:0.1.1 \
  --replicas=1 \
  -n kubetasker

k get deployments -n kubetasker
k rollout status deployment/kube-tasker-api -n kubetasker
k get rs -n kubetasker
k get pods -n kubetasker -o wide --show-labels
```

## Service workflow

```bash
k expose deployment kube-tasker-api \
  --name=kube-tasker-api \
  --port=80 \
  --target-port=8080 \
  --type=ClusterIP \
  -n kubetasker

k get svc -n kubetasker
k get endpoints kube-tasker-api -n kubetasker
k describe svc kube-tasker-api -n kubetasker
```

## In-cluster client checks

```bash
k run curl-client \
  --image=curlimages/curl:8.10.1 \
  --restart=Never \
  -n kubetasker \
  --command -- sleep 3600

k wait --for=condition=Ready pod/curl-client -n kubetasker --timeout=90s

k exec -n kubetasker curl-client -- curl -sS http://kube-tasker-api
k exec -n kubetasker curl-client -- curl -sS http://kube-tasker-api/health
k exec -n kubetasker curl-client -- curl -sS http://kube-tasker-api/version
```

## Debugging checklist

```bash
k describe pod -n kubetasker -l app=kube-tasker-api
k logs -n kubetasker -l app=kube-tasker-api --tail=80
k get events -n kubetasker --sort-by=.lastTimestamp
k get endpoints kube-tasker-api -n kubetasker
```

If Service endpoints are empty, check that the Service selector matches the Pod labels:

```bash
k get svc kube-tasker-api -n kubetasker -o yaml
k get pods -n kubetasker --show-labels
```

## Cleanup

```bash
k delete pod curl-client -n kubetasker --ignore-not-found
k delete svc kube-tasker-api -n kubetasker --ignore-not-found
k delete deployment kube-tasker-api -n kubetasker --ignore-not-found
k delete namespace kubetasker --ignore-not-found
```

## Speed habit

Practice typing commands from memory, but verify carefully. CKAD-style work rewards speed plus inspection, not blind copy/paste.
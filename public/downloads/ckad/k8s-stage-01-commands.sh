#!/usr/bin/env bash
set -euo pipefail

# CKAD Stage 1 command reference for KubeTasker.
# This file is meant for copy/paste practice. Do not run it blindly from top to bottom.

# Optional shell helpers
sudo apt-get install bash-completion -y
alias k=kubectl

# Cluster checks
k version --client
k cluster-info
k get nodes -o wide
k get pods -A

# Namespace
k create namespace kubetasker --dry-run=client -o yaml
k get namespaces
k config set-context --current --namespace=kubetasker

# Create the API deployment YAML without applying it yet
k create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 --dry-run=client -o yaml

# Apply from imperative commands during early practice
k create deployment kube-tasker-api --image=msomi22/kubetasker-api:0.1.1 -n kubetasker
k expose deployment kube-tasker-api --name=kube-tasker-api --port=80 --target-port=8080 -n kubetasker

# Inspect workload and networking objects
k get deployment,rs,po,svc,ep -n kubetasker
k -n kubetasker get pods --show-labels
k -n kubetasker get pods -o wide
k -n kubetasker get pods -l app=kube-tasker-api
k -n kubetasker describe deploy kube-tasker-api
k -n kubetasker describe svc kube-tasker-api
k -n kubetasker logs deploy/kube-tasker-api
k -n kubetasker get events --sort-by=.lastTimestamp

# Client pod examples
k -n kubetasker run kube-tasker-client --image=busybox:1.36 --restart=Never --command -- sleep 3600
k -n kubetasker wait --for=condition=Ready pod/kube-tasker-client --timeout=90s
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api:8080/
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api:8080/health
k -n kubetasker exec kube-tasker-client -- wget -qO- http://kube-tasker-api:8080/tasks/stats

# Useful object generation practice for later stages
k create configmap example-config --from-literal=APP_MODE=training --dry-run=client -o yaml
k create secret generic example-secret --from-literal=API_TOKEN=change-me --dry-run=client -o yaml
k create cronjob example-cron --image=busybox --schedule="*/3 * * * *" -- /bin/sh -c "date"
k get cronjob
k delete cronjob example-cron --ignore-not-found

# Restart behavior practice
k delete pods -n kubetasker -l app=kube-tasker-api
k get pods -n kubetasker -w

# Cleanup app namespace
k delete pod kube-tasker-client -n kubetasker --ignore-not-found
k delete svc kube-tasker-api -n kubetasker --ignore-not-found
k delete deployment kube-tasker-api -n kubetasker --ignore-not-found
k delete ns kubetasker --ignore-not-found
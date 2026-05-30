# Optional AWS EKS path

EKS is useful for AWS-managed Kubernetes experience, but it is not the main CKAD preparation path for this track.

Use EKS later when the learner already understands:

- namespaces;
- Deployments and ReplicaSets;
- Services and selectors;
- ConfigMaps and Secrets;
- probes;
- Jobs and CronJobs;
- volumes;
- logs, events, describe, and exec workflows.

For first-pass CKAD command fluency, prefer the AWS EC2 + kubeadm path or one of the small managed clusters from DigitalOcean or Civo.

A future EKS script can use `eksctl`, but it should remain optional and should not block Stage 1.
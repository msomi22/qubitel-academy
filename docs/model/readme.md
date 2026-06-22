# Deploy Ollama Coding Server on AWS EC2

This guide deploys the CloudFormation stack for an Ollama-based coding server using a GPU EC2 instance in **AWS Oregon (`us-west-2`)**.

The setup uses:

```text
Model: qwen2.5-coder:14b
Instance type: g5.2xlarge
Region: us-west-2 / Oregon
Key pair: demo-app-2026
```

---

## 1. Get Your Public IP

Before deploying the stack, get your current public IP address:

```bash
curl -s https://checkip.amazonaws.com
```

Example output:

```text
102.219.xxx.xxx
```

You will use it as:

```text
AllowedSshCidr=102.219.xxx.xxx/32
```

> Avoid using `0.0.0.0/0` unless it is only for a short temporary test.
> For better security, restrict SSH access to your own IP address.

---

## 2. Deploy the CloudFormation Stack

Use a region with GPU availability. For Oregon, use:

```bash
aws cloudformation deploy \
  --stack-name ollama-coder \
  --template-file ollama-coder-ec2.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-west-2 \
  --parameter-overrides \
    KeyName=demo-app-2026 \
    InstanceType=g5.2xlarge \
    VolumeSizeGb=100 \
    ModelName=qwen2.5-coder:14b \
    AllowedSshCidr=41.90.185.174/32
```

Example:

```bash
aws cloudformation deploy \
  --stack-name ollama-coder \
  --template-file ollama-coder-ec2.yml \
  --capabilities CAPABILITY_NAMED_IAM \
  --region us-west-2 \
  --parameter-overrides \
    KeyName=demo-app-2026 \
    InstanceType=g5.2xlarge \
    VolumeSizeGb=100 \
    ModelName=qwen2.5-coder:14b \
    AllowedSshCidr=102.219.100.100/32
```

---

## 3. Check Stack Outputs

After deployment, check the stack outputs:

```bash
aws cloudformation describe-stacks \
  --stack-name ollama-coder \
  --region us-west-2 \
  --query "Stacks[0].Outputs"
```

Look for these output values:

```text
ClineTunnelCommand
PublicIp
PublicDnsName
```

---

## 4. SSH Into the EC2 Instance

Use the `PublicDnsName` from the stack outputs.

```bash
ssh -i demo-app-2026.pem ubuntu@34.222.53.239
```

Example:

```bash
ssh -i demo-app-2026.pem ubuntu@ec2-xx-xx-xx-xx.us-west-2.compute.amazonaws.com
```

---

## 5. Check the Ollama Installation Log

After connecting to the instance, check the bootstrap log:

```bash
sudo tail -f /var/log/ollama-bootstrap.log
```

This log shows the installation progress for:

```text
Ollama installation
GPU check
Model download
Model test
```

---

## 6. Verify GPU Access

Run:

```bash
nvidia-smi
```

You should see the NVIDIA GPU details.

---

## 7. Check Ollama Models

Run:

```bash
ollama list
```

You should see:

```text
qwen2.5-coder:14b
```

---

## 8. Test the Model

Run:

```bash
ollama run qwen2.5-coder:14b
```

Try a test prompt:

```text
Write a simple Java Spring Boot REST controller.
```

To exit Ollama chat mode:

```text
/bye
```

---

## 9. Connect Cline Safely Using SSH Tunnel

On your laptop, run:

```bash
ssh -i demo-app-2026.pem -L 11434:localhost:11434 ubuntu@34.222.53.239

ssh -i demo-app-2026.pem -N -L 11434:localhost:11434 ubuntu@34.222.53.239
```

Keep this terminal open.

This exposes the EC2 Ollama server to your laptop as:

```text
http://localhost:11434
```

without opening Ollama publicly to the internet.

---

## 10. Configure Cline in VS Code

Open **VS Code → Cline → Settings** and configure:

```text
Provider: Ollama
Base URL: http://localhost:11434
Model: qwen2.5-coder:14b
Context Window: 32768
```

Recommended context window:

```text
32768 or higher
```

sudo journalctl -u ollama -f


Test through the Ollama API


curl -s http://127.0.0.1:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen2.5-coder:14b",
    "prompt": "Reply with exactly: Ollama is working.",
    "stream": false,
    "options": {
      "num_predict": 20,
      "temperature": 0
    }
  }' | jq -r '.response'

---

## 11. Stop the Instance When Done

GPU instances can become expensive if left running.

First, get the instance ID from the stack outputs or AWS Console.

Then stop the instance:

```bash
aws ec2 stop-instances \
  --instance-ids 34.222.53.239 \
  --region us-west-2
```

Example:

```bash
aws ec2 stop-instances \
  --instance-ids i-0123456789abcdef0 \
  --region us-west-2
```

---

## 12. Delete Everything When No Longer Needed

To remove all resources created by the stack:

```bash
aws cloudformation delete-stack \
  --stack-name ollama-coder \
  --region us-west-2
```

---

## Notes

* Make sure the key pair `demo-app-2026` exists in **Oregon (`us-west-2`)**.
* Do not expose port `11434` publicly.
* Always access Ollama through SSH tunneling.
* Stop the GPU instance immediately after use to avoid unnecessary cost.

# Autoscaling With HPA

## Goal

Let Kubernetes change the number of API pods automatically based on CPU usage.

## New Vocabulary

HPA means Horizontal Pod Autoscaler.

Horizontal means Kubernetes adds or removes pod replicas. It does not make one pod bigger.

## Why This Matters

Manual scaling works, but a human must notice traffic and run a command. HPA watches metrics and adjusts replicas for you.

## Before You Start

The API Deployment must have CPU requests. This lab already sets:

```yaml
resources:
  requests:
    cpu: 50m
```

HPA uses that request as the baseline for CPU utilization.

## Command 1: Enable Metrics Server

```bash
minikube addons enable metrics-server
```

## What This Command Does

Metrics Server collects CPU and memory usage from pods and nodes. HPA needs those metrics to make scaling decisions.

## Expected Result

```bash
kubectl get pods -n kube-system | grep metrics-server
```

The metrics-server pod should become `Running`.

Metrics can take a minute or two to appear.

## Command 2: Create The HPA

```bash
kubectl apply -f k8s/07-autoscaling/
```

## What This Command Does

It creates an HPA for the `beginner-api` Deployment.

The HPA keeps at least 1 pod, can scale up to 5 pods, and targets 50 percent CPU utilization.

## Expected Result

```bash
kubectl get hpa -n beginner-lab
```

You should see an HPA named `beginner-api`.

## Command 3: Watch Autoscaling

```bash
kubectl get hpa -n beginner-lab --watch
```

Open another terminal and generate traffic:

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

Open one more terminal:

```bash
while true; do curl -s http://localhost:8080/work >/dev/null; done
```

## What You Should Learn

HPA does not scale instantly. It waits for metrics and makes gradual decisions.

If CPU usage rises enough, HPA increases the number of API pods.

Verify:

```bash
kubectl get pods -n beginner-lab -l app=beginner-api
```

## Common Errors

- `unknown` metrics: wait a minute, then run `kubectl top pods -n beginner-lab`.
- `kubectl top` fails: Metrics Server is not ready yet.
- No scaling happens: wait a few minutes, keep the `/work` traffic loop running, and check `kubectl top pods -n beginner-lab`.

## Cleanup

Stop the traffic loop with `Ctrl+C`.

To remove the HPA:

```bash
kubectl delete -f k8s/07-autoscaling/
```

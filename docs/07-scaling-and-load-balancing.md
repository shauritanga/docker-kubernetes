# Scaling And Load Balancing

## Goal

Run multiple API pods and see how a Service sends traffic to them.

## Why This Matters

One pod is one running copy of the API. More pods can handle more traffic and survive one pod failing. A Service gives clients one stable address while Kubernetes sends traffic to the matching pods.

## Before You Start

The API Deployment and Service must already exist:

```bash
kubectl get deployment beginner-api -n beginner-lab
kubectl get service beginner-api -n beginner-lab
```

## Command 1: Scale The API

```bash
kubectl scale deployment beginner-api --replicas=3 -n beginner-lab
```

## What This Command Does

It changes the Deployment from one API pod to three API pods.

## Expected Result

```bash
kubectl get pods -n beginner-lab -l app=beginner-api
```

You should see three `beginner-api` pods. Each pod name is different.

## Command 2: Send Traffic Through The Service

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

Open another terminal:

```bash
for i in 1 2 3 4 5 6 7 8 9 10; do curl -s http://localhost:8080/; echo; done
```

## What This Shows

The API response includes:

```json
"podName": "beginner-api-..."
```

If you see different `podName` values across requests, you are seeing the Service distribute traffic across multiple pods.

## Common Errors

- Only one pod appears: check that the scale command used `--replicas=3`.
- Curl returns connection errors: confirm `kubectl port-forward` is still running.
- Same pod appears every time: this can happen in a small local cluster. The Service still has multiple endpoints; verify them with:

```bash
kubectl get endpoints beginner-api -n beginner-lab
```

## Scale Back Down

```bash
kubectl scale deployment beginner-api --replicas=1 -n beginner-lab
```

This returns the lab to one API pod.

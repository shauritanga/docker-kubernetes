# Expose With A Service

## Goal

Give the API a stable network name inside the cluster.

## Why This Matters

Pods can be replaced. Their IP addresses are not stable. A Service gives other workloads a stable name and port.

## Command

```bash
kubectl apply -f k8s/05-service/
```

## What The Command Does

It creates a Service named `beginner-api` in the `beginner-lab` namespace.

## Expected Result

```bash
kubectl get svc -n beginner-lab
```

You should see a `beginner-api` Service on port `80`.

## Test From Your Machine

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

Open another terminal:

```bash
curl http://localhost:8080/
```

## Common Errors

- `service not found`: apply the Service manifest first.
- `connection refused`: check that the API pod is running and ready.

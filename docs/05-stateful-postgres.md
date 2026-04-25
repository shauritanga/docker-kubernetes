# Stateful PostgreSQL

## Goal

Run a simple PostgreSQL dependency in Kubernetes.

## Why This Matters

Many APIs need a database. This lesson introduces a stateful workload before production storage concerns.

## Command

```bash
kubectl apply -f k8s/03-postgres/
```

## What The Command Does

It creates:

- a `postgres` Deployment
- a `postgres` Service on port `5432`

## Expected Result

```bash
kubectl get pods,svc -n beginner-lab
```

The Postgres pod should become `Running`, and the Service should be named `postgres`.

## Important Teaching Note

This lab uses `emptyDir` storage. Data is lost when the pod is deleted or moved. Production databases need managed database services or persistent storage.

## Common Errors

- `secret "postgres-secret" not found`: apply `k8s/02-config-and-secret/` first.
- Pod stays unready: inspect with `kubectl logs -l app=postgres -n beginner-lab`.

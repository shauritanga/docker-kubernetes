# Production PostgreSQL Storage

## Goal

Learn why the beginner PostgreSQL manifest is not production-grade and how a PersistentVolumeClaim improves it.

## Beginner Version

The first Postgres lesson uses `emptyDir`.

That is simple, but temporary. Data is lost when the pod is deleted or moved.

## Production-Oriented Version

This lab includes:

```text
k8s/09-postgres-persistent/
```

It adds a `PersistentVolumeClaim` named `postgres-data` and updates the PostgreSQL Deployment to mount that claim.

## Commands

```bash
kubectl apply -f k8s/09-postgres-persistent/
kubectl get pvc -n beginner-lab
kubectl rollout status deployment/postgres -n beginner-lab
```

## What This Teaches

- A PVC asks the cluster for durable storage.
- The exact storage implementation depends on the cluster.
- In Minikube, dynamic provisioning usually works out of the box.
- In production, teams often use managed PostgreSQL instead of running databases directly in Kubernetes.

## Common Errors

- PVC stays `Pending`: your cluster has no default StorageClass.
- Postgres restarts: inspect logs with `kubectl logs -l app=postgres -n beginner-lab`.

# Debugging

## Goal

Learn the first commands to run when something does not work.

## Commands

```bash
kubectl get pods -n beginner-lab
kubectl describe pod -l app=beginner-api -n beginner-lab
kubectl logs -l app=beginner-api -n beginner-lab
kubectl get events -n beginner-lab --sort-by=.lastTimestamp
```

## What These Commands Do

- `get pods` shows current pod status.
- `describe pod` shows scheduling, image pull, probe, and event details.
- `logs` shows application output.
- `get events` shows recent cluster events in time order.

## Common Statuses

- `Pending`: Kubernetes has not scheduled the pod yet.
- `ImagePullBackOff`: Kubernetes cannot pull the image.
- `CrashLoopBackOff`: the container starts and crashes repeatedly.
- `Running` but not ready: readiness probe is failing.

# Cleanup

## Goal

Remove all resources created by the lab.

## Command

```bash
kubectl delete namespace beginner-lab
```

## What The Command Does

Deleting the namespace deletes all objects inside it.

## Expected Result

```text
namespace "beginner-lab" deleted
```

## Verify

```bash
kubectl get namespace beginner-lab
```

Kubernetes should report that the namespace is not found.

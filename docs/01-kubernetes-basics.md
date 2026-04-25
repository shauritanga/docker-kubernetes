# Kubernetes Basics

## Goal

Learn the first Kubernetes object in this lab: a Namespace.

## What You Will Create

`k8s/01-namespace/namespace.yaml` creates a namespace called `beginner-lab`.

## Why This Matters

A Namespace is a named area inside a cluster. It keeps this lab separate from other workloads.

## Command

```bash
kubectl apply -f k8s/01-namespace/namespace.yaml
```

## What The Command Does

`kubectl apply` sends the YAML file to the Kubernetes API. Kubernetes then creates or updates the object described in the file.

## Expected Result

```text
namespace/beginner-lab created
```

Verify:

```bash
kubectl get namespace beginner-lab
```

## Common Errors

- `AlreadyExists`: the namespace already exists; this is safe.
- `Forbidden`: your user does not have permission to create namespaces.

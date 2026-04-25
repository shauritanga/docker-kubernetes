# Setup

## Goal

Confirm your machine can run the local app, Docker, and Kubernetes commands.

If any tool is missing, use [Tool Installation Guide](../TOOLS-INSTALL.md).

## Commands

```bash
node --version
docker --version
docker compose version
minikube version
kubectl version --client
kubectl get nodes
```

## What These Commands Do

- `node --version` checks that Node.js is installed.
- `docker --version` checks that Docker is installed.
- `docker compose version` checks that Compose is available.
- `minikube version` checks that Minikube is installed.
- `kubectl version --client` checks that the Kubernetes CLI is installed.
- `kubectl get nodes` checks that `kubectl` can reach your cluster.

## Expected Result

Versions should print successfully. After `minikube start`, `kubectl get nodes` should show at least one node.

## Common Errors

- `command not found`: install the missing tool.
- `connection refused`: `kubectl` is not connected to a cluster.
- `Unauthorized`: your kubeconfig does not have permission for the cluster.

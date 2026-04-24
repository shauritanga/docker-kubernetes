# Kubernetes Layout

This directory is organized for teaching progression rather than only final deployment.

## Structure

- `base/`: the minimum Kubernetes resources needed to run the claims API
- `overlays/production/`: production-oriented additions such as HPA, PDB, NetworkPolicy, and stronger runtime settings
- `secrets/`: local teaching examples for secret creation in Minikube-style labs

## Typical Commands

Render manifests:

```bash
kubectl kustomize k8s/base
kubectl kustomize k8s/overlays/production
```

Apply manifests:

```bash
kubectl apply -f k8s/secrets/claims-api-secrets.local.yaml
kubectl apply -k k8s/base
kubectl apply -k k8s/overlays/production
```

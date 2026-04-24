# Kubernetes Layout

This directory is organized for teaching progression rather than only final deployment.

## Structure

- `base/`: the minimum Kubernetes resources needed to run the claims API
- `overlays/production/`: production-oriented additions such as HPA, PDB, NetworkPolicy, and stronger runtime settings
- `overlays/kubeadm/`: kubeadm-friendly image settings for clusters that pull from a registry
- `secrets/`: local teaching examples for secret creation in kubeadm labs

## Typical Commands

Render manifests:

```bash
kubectl kustomize k8s/base
kubectl kustomize k8s/overlays/kubeadm
kubectl kustomize k8s/overlays/production
```

Apply manifests:

```bash
kubectl apply -f k8s/secrets/claims-api-secrets.local.yaml
kubectl apply -k k8s/overlays/kubeadm
kubectl apply -k k8s/overlays/production
```

The kubeadm overlay rewrites the teaching image `claims-api:local` to `ghcr.io/shauritanga/claims-api:local`. Change `newName` and `newTag` in `k8s/overlays/kubeadm/kustomization.yaml` to match the registry image you build and push for your cluster.

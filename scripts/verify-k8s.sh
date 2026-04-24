#!/usr/bin/env bash
set -euo pipefail

kubectl kustomize k8s/base >/tmp/claims-api-base.yaml
kubectl kustomize k8s/overlays/kubeadm >/tmp/claims-api-kubeadm.yaml
kubectl kustomize k8s/overlays/production >/tmp/claims-api-production.yaml

echo "Rendered base, kubeadm, and production overlays successfully."

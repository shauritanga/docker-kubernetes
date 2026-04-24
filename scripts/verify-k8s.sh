#!/usr/bin/env bash
set -euo pipefail

kubectl kustomize k8s/base >/tmp/claims-api-base.yaml
kubectl kustomize k8s/overlays/production >/tmp/claims-api-production.yaml

echo "Rendered base and production overlays successfully."

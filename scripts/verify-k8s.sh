#!/usr/bin/env bash
set -euo pipefail

for file in k8s/*/*.yaml; do
  kubectl create --dry-run=client --validate=false -f "$file" >/dev/null
done

kubectl kustomize --load-restrictor=LoadRestrictionsNone k8s/kustomize/base >/dev/null
kubectl kustomize --load-restrictor=LoadRestrictionsNone k8s/kustomize/overlays/networked >/dev/null

if command -v helm >/dev/null 2>&1; then
  helm template beginner-api helm/beginner-api >/dev/null
else
  echo "Helm is not installed; skipped Helm template validation."
fi

echo "All Kubernetes tutorial manifests passed local validation."

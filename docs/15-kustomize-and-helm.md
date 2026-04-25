# Kustomize And Helm

## Goal

Understand two common ways teams package Kubernetes YAML.

## Kustomize

Kustomize combines existing YAML files without templates.

This lab includes:

```text
k8s/kustomize/base
k8s/kustomize/overlays/networked
```

Render the base:

```bash
kubectl kustomize --load-restrictor=LoadRestrictionsNone k8s/kustomize/base
```

Render the networked overlay:

```bash
kubectl kustomize --load-restrictor=LoadRestrictionsNone k8s/kustomize/overlays/networked
```

Apply the networked overlay:

```bash
kubectl apply -k k8s/kustomize/overlays/networked
```

This lab uses numbered lesson folders, so the Kustomize examples reference YAML outside the kustomization folder. The `--load-restrictor=LoadRestrictionsNone` flag allows that for rendering.

## Helm

Helm is a Kubernetes package manager. It uses templates and values.

This lab includes:

```text
helm/beginner-api
```

Render the chart:

```bash
helm template beginner-api helm/beginner-api
```

Install or upgrade it:

```bash
helm upgrade --install beginner-api helm/beginner-api
```

## Which One Should Beginners Learn First?

Learn plain YAML first. Then learn Kustomize. Learn Helm after you understand the objects Helm is generating.

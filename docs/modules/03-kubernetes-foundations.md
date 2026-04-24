# Module 3: Kubernetes Foundations With Minikube

## Goal

Deploy the claims API to Minikube and map Docker/Compose concepts into Kubernetes primitives.

## The Developer Pain Before Kubernetes

Once teams moved beyond one machine or one container, they ran into harder problems:

- where should each container run
- how do failed instances restart
- how do services find each other
- how do you roll out changes without dropping traffic
- how do you manage many environments consistently

Kubernetes exists because container runtime alone was not enough for distributed backend systems.

## What This Module Solves

This module teaches the foundational Kubernetes objects that turn containers into an operable application platform.

## Tradeoffs To Understand

- Kubernetes solves real operational pain, but it adds abstraction and vocabulary
- small services can be overcomplicated by using features without understanding their purpose
- teams need to learn desired state rather than host-by-host management

## Concepts

- Namespace
- Deployment
- Service
- ConfigMap
- Secret
- Ingress
- declarative deployment

## Why Each Concept Exists

- `Namespace`: solves environment and team isolation problems inside a shared cluster
- `Deployment`: solves manual replica management and unsafe app updates
- `Service`: solves unstable pod addresses and service discovery pain
- `ConfigMap`: solves image rebuilding just to change non-secret configuration
- `Secret`: solves unsafe handling of credentials in code or plain config
- `Ingress`: solves direct exposure of every service and centralizes HTTP routing
- `declarative deployment`: solves snowflake infrastructure and undocumented manual changes

## Tasks

1. Start Minikube:

```bash
minikube start
minikube addons enable ingress
```

2. Build the image into Minikube:

```bash
minikube image build -t claims-api:local .
```

3. Review the base manifests under [`k8s/base`](/home/mcb0168e/Development/docker-example/k8s/base).
4. Apply the base manifests:

```bash
kubectl apply -k k8s/base
```

5. Create a real secret from the example:

```bash
kubectl apply -f k8s/secrets/claims-api-secrets.local.yaml
```

6. Verify rollout:

```bash
kubectl get pods -n claims-platform
kubectl get svc -n claims-platform
kubectl get ingress -n claims-platform
```

## Checkpoints

- You can map Compose services to Deployments and Services.
- You can explain why Secrets are not committed with live credentials.
- You can identify the pod labels that connect the Deployment and Service.

## Failure Exercise

Apply the Deployment before the secret exists and inspect the pod failure. Then create the secret and recover the rollout.

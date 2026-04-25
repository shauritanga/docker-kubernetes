# Deploy An App

## Goal

Run the API in Kubernetes using a Deployment.

## Before You Start

Start Minikube and build the image inside it:

```bash
minikube start
minikube image build -t beginner-api:local .
```

Why this matters: Kubernetes in Minikube needs access to the image. `minikube image build` makes `beginner-api:local` available to the Minikube cluster.

## Commands

```bash
kubectl apply -f k8s/01-namespace/namespace.yaml
kubectl apply -f k8s/02-config-and-secret/
kubectl apply -f k8s/04-api-deployment/
```

## What These Commands Do

- The namespace command creates the lab area.
- The config command creates values the API reads as environment variables.
- The deployment command asks Kubernetes to run one API pod.

## Expected Result

```bash
kubectl get pods -n beginner-lab
```

The API pod should become `Running`.

## Common Errors

- `ImagePullBackOff`: Minikube cannot find the image. Run `minikube image build -t beginner-api:local .` again and confirm the Deployment image name is `beginner-api:local`.
- `configmap not found`: apply `k8s/02-config-and-secret/` before the Deployment.

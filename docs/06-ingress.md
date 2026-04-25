# Ingress

## Goal

Route browser traffic to the API through an Ingress.

## Before You Start

Your cluster needs an ingress controller. Minikube can install one as an addon.

Enable it:

```bash
minikube addons enable ingress
```

## Command

```bash
kubectl apply -f k8s/06-ingress/
```

## What The Command Does

It creates an Ingress for the host `beginner.local` that routes to the `beginner-api` Service.

## Expected Result

```bash
kubectl get ingress -n beginner-lab
```

You should see an Ingress named `beginner-api`.

## Common Errors

- Ingress exists but traffic does not work: check whether an ingress controller is installed.
- Host does not resolve: add a local hosts file entry or use port-forwarding while learning.

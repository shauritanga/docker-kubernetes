# Kubernetes Vocabulary For This Lab

Read this before running the Kubernetes commands. The goal is not to memorize every term. The goal is to understand what each word means in this project.

## Cluster

A cluster is the Kubernetes environment where your containers run.

In this lab, Minikube creates the cluster where the API and PostgreSQL pods will run.

Command to check it:

```bash
kubectl get nodes
```

If this command fails, `kubectl` is not connected to your cluster yet.

## Node

A node is a machine inside the cluster.

Kubernetes schedules containers onto nodes. A node can be a VM, a physical server, or a local learning machine.

In this lab, your API container runs on one of the cluster nodes.

## kubectl

`kubectl` is the command-line tool used to talk to Kubernetes.

Examples:

```bash
kubectl apply -f k8s/01-namespace/namespace.yaml
kubectl get pods -n beginner-lab
kubectl logs -l app=beginner-api -n beginner-lab
```

Think of `kubectl` as the remote control for the cluster.

## Manifest

A manifest is a YAML file that describes what you want Kubernetes to create.

Example:

```text
k8s/04-api-deployment/deployment.yaml
```

That file tells Kubernetes how to run the API.

## YAML

YAML is the text format used by Kubernetes manifests.

Example:

```yaml
kind: Service
metadata:
  name: beginner-api
```

Spacing matters in YAML. If indentation is wrong, Kubernetes may reject the file.

## Namespace

A Namespace is a named area inside the cluster.

This lab uses:

```text
beginner-lab
```

Why it matters: all lab objects are grouped together, and cleanup is easy:

```bash
kubectl delete namespace beginner-lab
```

## Pod

A Pod is the smallest runnable unit in Kubernetes.

A Pod usually runs one container. In this lab:

- the API Deployment creates API pods
- the PostgreSQL Deployment creates a PostgreSQL pod

You inspect pods with:

```bash
kubectl get pods -n beginner-lab
```

## Container

A container is a running instance of an image.

Docker runs containers locally. Kubernetes also runs containers, but it manages them through Pods and Deployments.

## Image

An image is the packaged version of your app.

This lab builds:

```bash
minikube image build -t beginner-api:local .
```

Kubernetes pulls that image when creating the API pod.

## Minikube Image Build

`minikube image build` builds the Docker image inside Minikube.

Why it matters: normal `docker build` puts the image on your laptop. Minikube runs Kubernetes in its own environment, so the image must be available there too.

For this beginner lab, Minikube image build is simpler than pushing to a registry.

## Deployment

A Deployment tells Kubernetes how to run and maintain pods.

In this lab:

```text
k8s/04-api-deployment/deployment.yaml
```

creates the API Deployment.

Why it matters: if an API pod dies, the Deployment creates another one.

## Label

A label is a small key/value tag attached to a Kubernetes object.

Example from this lab:

```yaml
labels:
  app: beginner-api
```

Labels help Kubernetes group related objects.

## Selector

A selector finds objects by label.

Example:

```yaml
selector:
  app: beginner-api
```

In this lab, the Service uses a selector to find the API pods.

If labels and selectors do not match, the Service cannot send traffic to the pods.

## Service

A Service gives pods a stable network name and port.

Pods can be replaced, so their IP addresses are not reliable. A Service stays stable.

In this lab:

- `postgres` Service lets the API find PostgreSQL
- `beginner-api` Service lets other traffic reach the API pods

A Service also load balances across all matching ready pods. If the API Deployment has three ready pods, the Service can send traffic to all three.

## Port, targetPort, and containerPort

These words describe how traffic moves.

In this lab:

- `containerPort: 8080` means the API listens inside its container on port 8080
- `port: 80` means the Service exposes port 80 inside the cluster
- `targetPort: 8080` means the Service forwards traffic to the API container port

Simple flow:

```text
Service port 80 -> API container port 8080
```

## ConfigMap

A ConfigMap stores normal configuration.

In this lab, the ConfigMap stores:

- app name
- message
- database hostname

These are not secret values.

## Secret

A Secret stores sensitive configuration.

In this lab, the Secret stores PostgreSQL username, password, and database name.

The values are simple for teaching. Do not use real production passwords in committed files.

## Readiness Probe

A readiness probe tells Kubernetes whether a pod is ready to receive traffic.

In this lab, the API readiness probe checks:

```text
/readyz
```

If readiness fails, Kubernetes keeps the pod running but does not send Service traffic to it.

## Liveness Probe

A liveness probe tells Kubernetes whether a pod should be restarted.

In this lab, the API liveness probe checks:

```text
/healthz
```

If liveness keeps failing, Kubernetes restarts the container.

## Ingress

An Ingress defines HTTP routing from outside the cluster to a Service.

In this lab, the Ingress routes:

```text
beginner.local -> beginner-api Service
```

## Ingress Controller

An Ingress object is only a rule. An ingress controller is the software that actually implements the rule.

Minikube can install an ingress controller with:

```bash
minikube addons enable ingress
```

If the Ingress exists but traffic does not work, check whether an ingress controller is installed.

## imagePullPolicy

`imagePullPolicy` tells Kubernetes when to look for a container image.

This lab uses:

```yaml
imagePullPolicy: IfNotPresent
```

That tells Kubernetes to use the local Minikube image if it is already present.

## emptyDir

`emptyDir` is temporary pod storage.

This lab uses `emptyDir` for PostgreSQL to keep the lesson simple.

Important: data is lost when the PostgreSQL pod is deleted or moved. Production databases need proper persistent storage or a managed database service.

## Resource Requests And Limits

Resource requests tell Kubernetes how much CPU or memory a pod expects to need.

Resource limits tell Kubernetes the maximum CPU or memory a pod should use.

This lab gives the API a small CPU request so HPA can calculate CPU utilization.

## HPA

HPA means Horizontal Pod Autoscaler.

It watches metrics, such as CPU usage, and changes the number of pod replicas automatically.

In this lab, HPA targets the `beginner-api` Deployment.

## Why Command Order Matters

Kubernetes objects depend on each other.

Use this order:

1. Namespace
2. ConfigMap and Secret
3. PostgreSQL
4. API Deployment
5. API Service
6. Ingress
7. HPA

Why:

- ConfigMaps and Secrets need the Namespace to exist first.
- PostgreSQL needs the Secret.
- The API needs the ConfigMap and PostgreSQL Service.
- The Service needs API pod labels to match.
- The Ingress needs the API Service.
- HPA needs the API Deployment and Metrics Server.

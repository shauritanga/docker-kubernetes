# Beginner Docker And Kubernetes Lab

This project is a beginner-friendly tutorial for learning how a small web API moves from local code to Docker, Docker Compose, and Kubernetes.

The structure is inspired by the official Kubernetes tutorials:

- Kubernetes Tutorials: https://kubernetes.io/docs/tutorials/
- Kubernetes Basics: https://kubernetes.io/docs/tutorials/kubernetes-basics/
- Stateless Applications: https://kubernetes.io/docs/tutorials/stateless-application/
- Stateful Applications: https://kubernetes.io/docs/tutorials/stateful-application/

## What You Will Learn

- build and run a container image
- run an API with PostgreSQL using Docker Compose
- create Kubernetes objects one step at a time
- understand Namespace, ConfigMap, Secret, Deployment, Service, Ingress, and probes
- scale an API to multiple pods and observe Service load balancing
- add a Horizontal Pod Autoscaler for automatic scaling
- explore optional production topics: CI, persistent storage, NetworkPolicy, TLS, Kustomize, Helm, and database connectivity
- troubleshoot common beginner errors
- clean up everything safely

## Start Here

Install tools first with [TOOLS-INSTALL.md](./TOOLS-INSTALL.md).

Use [START-HERE.md](./START-HERE.md) as the main path.

Read [Kubernetes Vocabulary For This Lab](./docs/00-vocabulary.md) before the Kubernetes commands if the words are new.

Use [LAB-CHECKLIST.md](./LAB-CHECKLIST.md) when facilitating or tracking progress.

## Requirements

- Node.js 22+
- Docker with Docker Compose
- Minikube
- `kubectl`

## Project Layout

- `src/`: small Express API used by the Docker and Kubernetes lessons
- `k8s/`: numbered Kubernetes lessons
- `docs/`: tutorial chapters
- `scripts/verify-k8s.sh`: validates Kubernetes YAML with `kubectl`

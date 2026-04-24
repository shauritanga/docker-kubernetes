# Enterprise Backend Docker And Kubernetes Lab

This repository teaches backend developers how to take a real REST API from source code to container, local stack, Kubernetes deployment, rollout safety, and CI/CD validation.

The teaching application is a Node/Express claims API with `members`, `hospitals`, and `claims`, backed by PostgreSQL and packaged for Docker, Docker Compose, and Kubernetes.

## What Learners Practice

- build and inspect production-oriented container images
- run a multi-service local backend stack with Docker Compose
- deploy the service to Minikube with Kubernetes manifests
- work with probes, Services, Ingress, ConfigMaps, and Secrets
- understand safer production patterns such as HPA, PDB, and NetworkPolicy
- practice rollout debugging, rollback, and basic scaling checks
- connect local delivery steps to GitHub Actions CI

## Quick Start

### Prerequisites

- Node.js 22+
- Docker with `docker compose`
- Minikube
- `kubectl`

### Local Development Stack

```bash
npm install
docker compose up --build
```

### Unit Tests

```bash
npm test
```

### Render Kubernetes Assets

```bash
kubectl kustomize k8s/base
kubectl kustomize k8s/overlays/production
```

## Learning Modules

Start with [docs/README.md](/home/mcb0168e/Development/docker-example/docs/README.md).

For a linear progress tracker, use [LAB-CHECKLIST.md](/home/mcb0168e/Development/docker-example/LAB-CHECKLIST.md).
For instructor-led delivery, use [TRAINER-NOTES.md](/home/mcb0168e/Development/docker-example/TRAINER-NOTES.md).
For a short workshop visual, use [docs/architecture-diagram.md](/home/mcb0168e/Development/docker-example/docs/architecture-diagram.md).

1. [Container foundations](/home/mcb0168e/Development/docker-example/docs/modules/01-container-foundations.md)
2. [Docker Compose local stack](/home/mcb0168e/Development/docker-example/docs/modules/02-compose-local-stack.md)
3. [Kubernetes foundations with Minikube](/home/mcb0168e/Development/docker-example/docs/modules/03-kubernetes-foundations.md)
4. [Production-oriented Kubernetes patterns](/home/mcb0168e/Development/docker-example/docs/modules/04-kubernetes-production-patterns.md)
5. [Rollouts, failures, scaling, and rollback](/home/mcb0168e/Development/docker-example/docs/modules/05-kubernetes-rollout-operations.md)
6. [CI/CD with GitHub Actions](/home/mcb0168e/Development/docker-example/docs/modules/06-cicd-github-actions.md)

## Application Summary

### Health Endpoints

- `GET /`
- `GET /health/live`
- `GET /health/ready`

### Resource Endpoints

- `GET|POST|PUT /api/members`
- `GET|POST|PUT /api/hospitals`
- `GET|POST|PUT /api/claims`

### Default Local Environment

```bash
PORT=8080
DATABASE_URL=postgres://claims_app:claims_app@localhost:5432/claims_db
SHUTDOWN_TIMEOUT_MS=10000
```

## Repository Layout

- [src](/home/mcb0168e/Development/docker-example/src): application code
- [docs/modules](/home/mcb0168e/Development/docker-example/docs/modules): guided labs
- [k8s/base](/home/mcb0168e/Development/docker-example/k8s/base): foundational manifests
- [k8s/overlays/production](/home/mcb0168e/Development/docker-example/k8s/overlays/production): production-oriented additions
- [.github/workflows](/home/mcb0168e/Development/docker-example/.github/workflows): CI/CD teaching assets

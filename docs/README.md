# Learning Path

This project teaches backend developers how to take a real service from local code to a production-style container and Kubernetes deployment.

## Audience

- Backend developers with limited operations experience
- Engineers who know REST APIs but want practical Docker and Kubernetes experience
- Teams that need a guided path instead of isolated snippets

## Module Order

1. [Container foundations](./modules/01-container-foundations.md)
2. [Local multi-service development with Docker Compose](./modules/02-compose-local-stack.md)
3. [Kubernetes foundations with kubeadm](./modules/03-kubernetes-foundations.md)
4. [Production-oriented Kubernetes configuration](./modules/04-kubernetes-production-patterns.md)
5. [Rollouts, failures, scaling, and rollback](./modules/05-kubernetes-rollout-operations.md)
6. [CI/CD with GitHub Actions](./modules/06-cicd-github-actions.md)

## Prerequisites

- Node.js 22+
- Docker Engine with `docker compose`
- `kubectl`
- access to a kubeadm cluster
- an image registry reachable from the kubeadm nodes

## Learning Approach

Each module contains:

- goals
- the developer pain that existed before the tool
- why the concept was introduced
- what problem it solves
- tradeoffs it adds
- concepts to learn
- hands-on tasks
- checkpoints
- failure scenarios

Keep a shell open in the repo root for all exercises.

## Start With The "Why"

Before diving into commands, read [Concept glossary](./concept-glossary.md). It connects Docker and Kubernetes features to the real engineering pain they were created to reduce.

Then use [LAB-CHECKLIST.md](/home/mcb0168e/Development/docker-example/LAB-CHECKLIST.md) as the main step-by-step tracker while moving through the modules.

If you are running this for a group, use [TRAINER-NOTES.md](/home/mcb0168e/Development/docker-example/TRAINER-NOTES.md) to guide pacing, emphasis, and discussion.

For a short visual summary of the system used in the workshop, use [architecture-diagram.md](./architecture-diagram.md).

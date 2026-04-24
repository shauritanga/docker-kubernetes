# Module 6: CI/CD With GitHub Actions

## Goal

Understand how the same service is validated automatically before reaching a cluster.

## The Developer Pain Before CI/CD

Before CI/CD, teams often discovered basic delivery issues too late:

- tests failed only after merge
- container images were broken when someone tried to deploy
- manifest mistakes reached shared environments
- delivery quality depended too much on manual discipline

CI/CD exists because teams needed repeatable validation, not heroics.

## What This Module Solves

This module teaches how a backend team turns manual release checks into an automated pipeline that catches obvious failures earlier.

## Tradeoffs To Understand

- pipelines improve consistency but require maintenance
- too many checks can make feedback slow
- too few checks let bad artifacts move forward
- CI should reduce human error, not become an opaque black box

## Concepts

- pull request validation
- build pipeline stages
- container image verification
- manifest rendering checks
- why CI should catch obvious delivery errors early

## Why Each Concept Exists

- `pull request validation`: solves late discovery of broken code
- `build pipeline stages`: solve release steps being tribal knowledge
- `container image verification`: solves deploy-time surprises from broken images
- `manifest rendering checks`: solve syntax and structure errors before cluster interaction
- `early failure detection`: solves the cost of discovering mistakes only after deployment

## Tasks

1. Read [`.github/workflows/ci.yml`](/home/mcb0168e/Development/docker-example/.github/workflows/ci.yml).
2. Identify the pipeline stages:
  install, test, Compose validation, Kubernetes validation, image build
3. Run the equivalent commands locally:

```bash
npm ci
npm test
docker compose config
kubectl kustomize k8s/base
kubectl kustomize k8s/overlays/production
docker build -t claims-api:ci .
```

4. Explain which failures should be caught in CI versus at runtime in Kubernetes.

## Checkpoints

- You can explain why the repo validates both app code and deployment artifacts.
- You can explain why image builds belong in CI even if deployment happens elsewhere.
- You can describe how this path would evolve into a fuller enterprise delivery pipeline.

## Failure Exercise

Break one Kubernetes manifest field and confirm the overlay render or deployment checks fail before a human tries to deploy.

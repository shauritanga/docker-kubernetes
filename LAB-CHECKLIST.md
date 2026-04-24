# Lab Checklist

Use this file as the main step-by-step tracker while working through the training repo.

For concept background, start with [docs/concept-glossary.md](/home/mcb0168e/Development/docker-example/docs/concept-glossary.md).  
For full explanations, use the module docs in [docs/modules](/home/mcb0168e/Development/docker-example/docs/modules).

## Before You Start

Check that the required tools are available:

- [ ] `node --version`
- [ ] `docker --version`
- [ ] `docker compose version`
- [ ] `minikube version`
- [ ] `kubectl version --client`

Install project dependencies:

```bash
npm install
```

- [ ] `npm install`

## Module 0: Why These Tools Exist

Read first:

- [ ] [docs/concept-glossary.md](/home/mcb0168e/Development/docker-example/docs/concept-glossary.md)

You should be able to explain:

- [ ] why Docker was created
- [ ] why Docker Compose was created
- [ ] why Kubernetes was created
- [ ] why probes, Services, HPA, PDB, and CI/CD exist

## Module 1: Container Foundations

Reference: [docs/modules/01-container-foundations.md](/home/mcb0168e/Development/docker-example/docs/modules/01-container-foundations.md)

Commands:

```bash
docker build -t claims-api:lab .
docker history claims-api:lab
```

- [ ] Read the Dockerfile and identify each layer
- [ ] Read `.dockerignore`
- [ ] Build the image
- [ ] Inspect the image history
- [ ] Explain why `npm ci --omit=dev` is used
- [ ] Explain why the container runs as a non-root user
- [ ] Explain why `DATABASE_URL` is required

Failure exercise:

```bash
docker run --rm -p 8080:8080 \
  -e DATABASE_URL=postgres://invalid:invalid@localhost:5432/invalid \
  claims-api:lab
```

- [ ] Observe the startup failure and explain why fail-fast startup is useful

## Module 2: Docker Compose Local Stack

Reference: [docs/modules/02-compose-local-stack.md](/home/mcb0168e/Development/docker-example/docs/modules/02-compose-local-stack.md)

Commands:

```bash
docker compose up --build
curl http://localhost:8080/health/live
curl http://localhost:8080/health/ready
curl http://localhost:8080/
```

- [ ] Read `docker-compose.yml`
- [ ] Start the stack
- [ ] Verify live endpoint
- [ ] Verify ready endpoint
- [ ] Verify root endpoint

Create a member:

```bash
curl -X POST http://localhost:8080/api/members \
  -H "Content-Type: application/json" \
  -d '{"member_number":"MBR-1001","first_name":"Amina","last_name":"Otieno","status":"active"}'
```

- [ ] Create a member successfully
- [ ] Restart the stack and confirm Postgres data persistence
- [ ] Explain why the app uses `postgres` instead of `localhost`
- [ ] Explain the Postgres health check
- [ ] Explain the local role of Redis

Failure exercise:

- [ ] Stop Postgres while the app is running
- [ ] Observe readiness behavior
- [ ] Restart Postgres and confirm recovery

## Module 3: Kubernetes Foundations With Minikube

Reference: [docs/modules/03-kubernetes-foundations.md](/home/mcb0168e/Development/docker-example/docs/modules/03-kubernetes-foundations.md)

Commands:

```bash
minikube start
minikube addons enable ingress
minikube image build -t claims-api:local .
kubectl apply -f k8s/secrets/claims-api-secrets.local.yaml
kubectl apply -k k8s/base
kubectl get pods -n claims-platform
kubectl get svc -n claims-platform
kubectl get ingress -n claims-platform
```

- [ ] Start Minikube
- [ ] Enable ingress addon
- [ ] Build the image inside Minikube
- [ ] Review `k8s/base`
- [ ] Create the local secret
- [ ] Apply the base manifests
- [ ] Verify pods
- [ ] Verify service
- [ ] Verify ingress
- [ ] Explain how Deployment differs from a container
- [ ] Explain what Service solves
- [ ] Explain why Secrets are externalized

Failure exercise:

```bash
kubectl delete secret claims-api-secrets -n claims-platform
kubectl rollout restart deployment/claims-api -n claims-platform
kubectl get pods -n claims-platform
kubectl apply -f k8s/secrets/claims-api-secrets.local.yaml
```

- [ ] Observe the failure without the secret
- [ ] Restore the secret
- [ ] Confirm the rollout recovers

## Module 4: Production-Oriented Kubernetes Patterns

Reference: [docs/modules/04-kubernetes-production-patterns.md](/home/mcb0168e/Development/docker-example/docs/modules/04-kubernetes-production-patterns.md)

Commands:

```bash
kubectl kustomize k8s/overlays/production
kubectl apply -k k8s/overlays/production
kubectl get deploy,hpa,pdb,networkpolicy -n claims-platform
```

- [ ] Review `k8s/overlays/production`
- [ ] Render the production overlay
- [ ] Apply the production overlay
- [ ] Inspect Deployment, HPA, PDB, and NetworkPolicy
- [ ] Explain readiness vs liveness
- [ ] Explain requests vs limits
- [ ] Explain what HPA solves
- [ ] Explain what PDB protects against
- [ ] Explain why NetworkPolicy exists

Failure exercise:

- [ ] Break readiness temporarily
- [ ] Observe how Kubernetes keeps the pod out of service traffic
- [ ] Restore readiness behavior

## Module 5: Rollouts, Failures, Scaling, And Rollback

Reference: [docs/modules/05-kubernetes-rollout-operations.md](/home/mcb0168e/Development/docker-example/docs/modules/05-kubernetes-rollout-operations.md)

Commands:

```bash
kubectl rollout status deployment/claims-api -n claims-platform
kubectl logs -l app=claims-api -n claims-platform --tail=100
kubectl describe deployment claims-api -n claims-platform
kubectl rollout undo deployment/claims-api -n claims-platform
```

- [ ] Check rollout status
- [ ] Read recent pod logs
- [ ] Inspect the Deployment description
- [ ] Explain what rollout history and rollback solve

Broken rollout exercise:

- [ ] Change the image tag to an invalid tag
- [ ] Apply the change
- [ ] Detect the failed rollout
- [ ] Roll back safely
- [ ] Confirm service recovery

Scaling exercise:

- [ ] Generate load
- [ ] Inspect HPA behavior
- [ ] Explain why scaling is only one part of performance

## Module 6: CI/CD With GitHub Actions

Reference: [docs/modules/06-cicd-github-actions.md](/home/mcb0168e/Development/docker-example/docs/modules/06-cicd-github-actions.md)

Commands:

```bash
npm ci
npm test
docker compose config
npm run verify:k8s
docker build -t claims-api:ci .
```

- [ ] Read `.github/workflows/ci.yml`
- [ ] Explain each CI stage
- [ ] Run local test validation
- [ ] Run Compose validation
- [ ] Run Kubernetes render validation
- [ ] Build the CI image locally
- [ ] Explain which failures CI should catch before deployment

Failure exercise:

- [ ] Break one manifest intentionally
- [ ] Re-run validation
- [ ] Confirm the failure is caught before deployment
- [ ] Restore the manifest

## Optional Integration Test

This requires a running PostgreSQL database compatible with `DATABASE_URL`.

```bash
RUN_INTEGRATION_TESTS=1 node --test test/integration.api.test.js
```

- [ ] Run the integration test against a real database
- [ ] Explain the difference between unit tests and integration tests

## Completion Criteria

You are done when you can:

- [ ] explain the pain Docker solves
- [ ] explain the pain Kubernetes solves
- [ ] build and run the API in Docker
- [ ] run the local stack with Compose
- [ ] deploy the app to Minikube
- [ ] explain each core Kubernetes object used in the repo
- [ ] observe a failed rollout and recover with rollback
- [ ] explain the purpose of HPA, PDB, and NetworkPolicy
- [ ] explain how CI prevents obvious delivery mistakes
- [ ] describe the difference between local development tooling and production orchestration

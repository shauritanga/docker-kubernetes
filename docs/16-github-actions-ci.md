# GitHub Actions CI

## Goal

Validate the app and Kubernetes files automatically on push or pull request.

## Workflow File

This lab includes:

```text
.github/workflows/ci.yml
```

## What CI Runs

- checkout the repository
- install Node.js 22
- run `npm ci`
- run `npm test`
- run `npm run verify:k8s`
- build the Docker image

## Why This Matters

CI catches common mistakes before a learner or teammate tries to deploy:

- broken app tests
- invalid Kubernetes YAML
- Docker image build failures

## Local Equivalent

```bash
npm ci
npm test
npm run verify:k8s
docker build -t beginner-api:ci .
```

# Module 1: Container Foundations

## Goal

Understand how the claims API is packaged as a production-oriented container and why the Dockerfile is written that way.

## The Developer Pain Before Containers

Before containers, backend teams repeatedly hit the same issues:

- "works on my machine" runtime drift
- long onboarding because every laptop needed hand-built setup
- inconsistent Node, OS package, and dependency versions
- brittle deployments where production did not resemble development

Docker became popular because teams needed one portable runtime artifact instead of many slightly different machine setups.

## What This Module Solves

This module teaches how containers reduce environment drift by packaging the app, runtime, and startup behavior into one image.

## Tradeoffs To Understand

- containers reduce setup pain but add image, networking, and filesystem concepts
- a bad Dockerfile can still produce slow, insecure, or oversized images
- containerization improves consistency, not application correctness by itself

## Concepts

- image layering
- `.dockerignore`
- reproducible dependency installation
- non-root runtime users
- environment-based configuration
- why health endpoints matter for containers

## Why Each Concept Exists

- `image layering`: solves slow rebuilds and duplicated filesystem content
- `.dockerignore`: solves accidental large build contexts and leaking local junk into images
- `reproducible dependency installation`: solves dependency drift between machines and builds
- `non-root runtime users`: solves a class of avoidable container privilege risks
- `environment-based configuration`: solves hardcoded values that break between environments
- `health endpoints`: solve the gap between "process started" and "service is actually usable"

## Tasks

1. Read [Dockerfile](/home/mcb0168e/Development/docker-example/Dockerfile) and identify each layer's purpose.
2. Read [.dockerignore](/home/mcb0168e/Development/docker-example/.dockerignore) and explain why `node_modules` is excluded.
3. Build the image:

```bash
docker build -t claims-api:lab .
```

4. Inspect the image history:

```bash
docker history claims-api:lab
```

5. Run the container against a database provided later by Compose:

```bash
docker run --rm -p 8080:8080 \
  -e DATABASE_URL=postgres://claims_app:claims_app@host.docker.internal:5432/claims_db \
  claims-api:lab
```

## Checkpoints

- You can explain why `npm ci --omit=dev` is used.
- You can explain why the container does not run as root.
- You can identify which environment variable is mandatory for startup.

## Failure Exercise

Set an invalid `DATABASE_URL` and observe startup failure. The expected lesson is that containers should fail fast on bad dependencies rather than start in a broken state.

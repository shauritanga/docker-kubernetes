# Module 2: Local Multi-Service Development With Docker Compose

## Goal

Learn how a backend service, database, and cache run together locally with predictable service discovery and startup behavior.

## The Developer Pain Before Compose

Before Compose, developers often started local systems by memory:

- open one terminal for the API
- another for the database
- another for the cache
- manually export environment variables
- hope ports, credentials, and startup order match

This wasted time and made onboarding fragile. Compose exists because local multi-service development needed one repeatable command.

## What This Module Solves

This module teaches how Compose removes manual local orchestration pain by declaring app dependencies, networking, ports, and startup behavior in one file.

## Tradeoffs To Understand

- Compose is excellent for local learning and team onboarding
- it does not solve cluster scheduling, self-healing, or enterprise rollout concerns
- relying on Compose alone can hide production-only problems

## Concepts

- service networking by name
- health-based startup ordering
- local dependency orchestration
- config injection through environment variables
- why Compose is for local development, not production orchestration

## Why Each Concept Exists

- `service networking by name`: solves the pain of hardcoding IPs or editing host files
- `health-based startup ordering`: solves app boot failures caused by dependencies starting too late
- `local dependency orchestration`: solves multi-terminal startup rituals
- `environment injection`: solves machine-specific configuration drift
- `local-only positioning`: solves the common mistake of treating local orchestration as production scheduling

## Tasks

1. Read [docker-compose.yml](/home/mcb0168e/Development/docker-example/docker-compose.yml).
2. Start the stack:

```bash
docker compose up --build
```

3. Verify the app:

```bash
curl http://localhost:8080/health/live
curl http://localhost:8080/health/ready
curl http://localhost:8080/
```

4. Create a member:

```bash
curl -X POST http://localhost:8080/api/members \
  -H "Content-Type: application/json" \
  -d '{"member_number":"MBR-1001","first_name":"Amina","last_name":"Otieno","status":"active"}'
```

5. Stop and restart the stack and confirm Postgres data persists through the volume.

## Checkpoints

- You can explain why the app talks to `postgres` instead of `localhost`.
- You can explain what the Postgres health check is doing.
- You can describe the role of Redis in the local topology even though the app does not depend on it yet.

## Failure Exercise

Stop the `postgres` service while the app is running and observe readiness behavior. Restart it and confirm the service becomes ready again.

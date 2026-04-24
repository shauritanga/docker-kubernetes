# Concept Glossary: Why These Tools Exist

This glossary is here to stop Docker and Kubernetes from feeling like random complexity.

Most of these tools were introduced because backend teams kept suffering through the same problems:

- code ran differently across laptops, CI, and servers
- onboarding a new developer took too long
- local dependency setup was fragile
- deployments were manual and risky
- app instances died or hung without a safe recovery mechanism
- infrastructure changes were hard to reproduce
- secrets leaked into repos or config files
- scaling up and down required human intervention at the worst possible time

## Docker

### Problem Before Docker

Applications depended on machine-specific runtime versions, OS packages, and local quirks. Teams spent time debugging environment drift instead of product behavior.

### What Docker Solves

Docker packages the app and its runtime into a portable image so the same artifact can run in development, CI, and production with far less variation.

### Tradeoff

You gain consistency, but now you also need to understand images, layers, networking, volumes, and container debugging.

## Docker Compose

### Problem Before Compose

Running an app plus database, cache, queue, and other dependencies locally required a long list of manual startup steps and ad hoc scripts.

### What Compose Solves

Compose gives local teams a repeatable way to run multi-service stacks with named services, shared networks, environment variables, and volumes.

### Tradeoff

It is great for local development, but it is not a substitute for production orchestration.

## Kubernetes

### Problem Before Kubernetes

Running many containers across multiple machines became operationally painful. Teams had to place workloads, restart failures, wire networking, and manage rollouts manually or with inconsistent tooling.

### What Kubernetes Solves

Kubernetes provides a declarative platform that schedules containers, restarts failures, offers service discovery, and manages rolling updates and scaling.

### Tradeoff

It solves real platform problems, but it introduces many concepts. Teams must learn which pieces matter for their service and which are optional.

## Deployment

### Problem Before Deployments

Updating live application instances by hand was fragile. Teams killed processes manually, copied files to servers, and hoped enough instances stayed alive.

### What It Solves

A Deployment manages replica count and rollout strategy so you can update application versions more safely and recover from pod failure automatically.

### Tradeoff

You stop managing individual instances directly and instead describe desired state.

## Service

### Problem Before Services

Pods are replaceable and their IPs change. Other applications cannot reliably connect to changing pod addresses.

### What It Solves

A Service gives a stable virtual endpoint and load-balances traffic across matching pods.

### Tradeoff

You need labels and selectors to be correct, and debugging traffic flow now includes another abstraction layer.

## ConfigMap And Secret

### Problem Before Config Separation

Configuration and credentials were often hardcoded, copied into scripts, or committed to repos.

### What They Solve

ConfigMaps separate non-sensitive configuration from the image. Secrets provide a safer way to inject sensitive values at runtime.

### Tradeoff

You must manage externalized configuration carefully across environments and avoid treating Secrets as magically secure just because Kubernetes stores them.

## Readiness Probe

### Problem Before Readiness

An app process could be "running" but still unable to serve traffic because startup tasks, migrations, or database connections were not ready.

### What It Solves

Readiness tells Kubernetes when a pod should start receiving traffic.

### Tradeoff

If you define readiness badly, healthy traffic can be delayed or unhealthy pods can still receive requests.

## Liveness Probe

### Problem Before Liveness

Some processes get stuck, deadlock, or stop responding while still remaining alive at the OS level.

### What It Solves

Liveness gives Kubernetes a way to restart containers that are alive but unhealthy.

### Tradeoff

If the probe is too aggressive, Kubernetes can restart healthy-but-slow containers and make stability worse.

## HorizontalPodAutoscaler

### Problem Before HPA

Scaling was often manual. Traffic spikes arrived faster than humans could react.

### What It Solves

HPA adjusts replica count based on metrics such as CPU or memory usage.

### Tradeoff

Autoscaling helps only when metrics are meaningful, the app is stateless enough to scale, and the rest of the system can absorb the extra load.

## PodDisruptionBudget

### Problem Before PDB

Voluntary disruptions such as node drains or maintenance could take down too many replicas at once.

### What It Solves

PDB tells Kubernetes how many replicas must remain available during voluntary disruption.

### Tradeoff

A strict PDB improves availability but can slow maintenance or cluster operations.

## NetworkPolicy

### Problem Before Network Policies

Many clusters default to open east-west traffic. That makes lateral movement too easy once one workload is compromised.

### What It Solves

NetworkPolicy limits which pods or namespaces can talk to each other.

### Tradeoff

Security improves, but network debugging becomes more intentional and policy mistakes can block valid traffic.

## CI/CD

### Problem Before CI/CD

Broken builds, broken tests, or broken manifests were often discovered late, sometimes after a human already tried to deploy them.

### What It Solves

CI/CD automates repeatable validation and packaging so obvious failures are caught earlier and delivery is more consistent.

### Tradeoff

Pipelines need maintenance, and poor pipelines can become slow, flaky, or too opaque if teams treat them as magic.

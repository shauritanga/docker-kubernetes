# Module 4: Production-Oriented Kubernetes Configuration

## Goal

Learn the Kubernetes features that make a backend service safer to operate under real load and during disruption.

## The Developer Pain Before These Production Patterns

Even after basic deployment works, teams still suffer from:

- traffic reaching pods before they are ready
- dead or stuck processes staying in rotation too long
- noisy neighbors consuming too many node resources
- manual scaling that reacts too slowly
- maintenance taking down too many replicas
- overly open cluster networking

These patterns were adopted because "it runs in Kubernetes" is still not the same as "it is safe to operate."

## What This Module Solves

This module teaches the controls that make backend services more predictable during load changes, restarts, and cluster disruption.

## Tradeoffs To Understand

- safety features improve resilience but add more configuration to reason about
- aggressive probe or resource settings can create failures instead of preventing them
- autoscaling helps only when the rest of the architecture can scale too

## Concepts

- readiness and liveness probes
- resource requests and limits
- HorizontalPodAutoscaler
- PodDisruptionBudget
- NetworkPolicy
- overlay-based configuration

## Why Each Concept Exists

- `readiness probes`: solve the problem of sending traffic to pods too early
- `liveness probes`: solve the problem of stuck processes that never recover on their own
- `requests and limits`: solve unfair resource contention and scheduling ambiguity
- `HorizontalPodAutoscaler`: solves slow manual reaction to load changes
- `PodDisruptionBudget`: solves avoidable availability loss during voluntary maintenance
- `NetworkPolicy`: solves flat-trust networking inside the cluster
- `overlay-based configuration`: solves duplication between simple and production-oriented manifest sets

## Tasks

1. Review [`k8s/overlays/production`](/home/mcb0168e/Development/docker-example/k8s/overlays/production).
2. Render the production overlay:

```bash
kubectl kustomize k8s/overlays/production
```

3. Compare base and production settings:
  replicas, resource limits, HPA, and network restrictions
4. Apply the overlay:

```bash
kubectl apply -k k8s/overlays/production
```

5. Inspect the resulting objects:

```bash
kubectl get deploy,hpa,pdb,networkpolicy -n claims-platform
```

## Checkpoints

- You can explain the difference between liveness and readiness.
- You can explain why HPA alone does not guarantee performance.
- You can describe what PodDisruptionBudget protects against.

## Failure Exercise

Temporarily break the readiness path and observe how Kubernetes keeps unhealthy pods out of service traffic.

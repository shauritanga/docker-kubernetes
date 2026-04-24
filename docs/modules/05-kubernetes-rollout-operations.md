# Module 5: Rollouts, Failures, Scaling, And Rollback

## Goal

Practice the operational workflows backend developers need when a deployment goes wrong or traffic changes unexpectedly.

## The Developer Pain Before Safe Rollout Workflows

Before controlled rollout tooling, bad deployments often meant:

- manual SSH access to fix live systems
- partial downtime during restarts
- poor visibility into what changed
- slow recovery when a release failed

Kubernetes rollout tooling matters because failure is normal. The real skill is recovery without panic.

## What This Module Solves

This module teaches how to inspect deployments, recognize rollout failure quickly, and restore service safely with rollback-oriented workflows.

## Tradeoffs To Understand

- automation helps, but teams still need to read rollout state correctly
- rollback is easier when releases are small and observability is clear
- scaling can mask symptoms temporarily without fixing a deeper dependency issue

## Concepts

- rollout status
- rollout history
- rollback
- scaling behavior
- log inspection
- safe recovery

## Why Each Concept Exists

- `rollout status`: solves uncertainty during a live deployment
- `rollout history`: solves poor change visibility and weak recovery context
- `rollback`: solves the need for a fast, low-risk recovery path
- `scaling behavior`: solves the need to absorb higher traffic without immediate manual action
- `log inspection`: solves blind debugging during failures
- `safe recovery`: solves the instinct to make rushed, destructive changes under pressure

## Tasks

1. Deploy the production overlay.
2. Watch rollout status:

```bash
kubectl rollout status deployment/claims-api -n claims-platform
```

3. View logs:

```bash
kubectl logs -l app=claims-api -n claims-platform --tail=100
```

4. Trigger a broken rollout by changing the image tag to a non-existent one.
5. Observe failed rollout behavior:

```bash
kubectl describe deployment claims-api -n claims-platform
kubectl get pods -n claims-platform
```

6. Roll back:

```bash
kubectl rollout undo deployment/claims-api -n claims-platform
```

7. Generate load with a simple loop or load tool and inspect HPA behavior.

## Checkpoints

- You can detect a failed rollout from `kubectl` output.
- You can recover with rollback without deleting the deployment.
- You can explain why readiness is critical during rolling updates.

## Failure Exercise

Set the image to a broken tag and document:

- what failed
- which command exposed it fastest
- how rollback restored availability

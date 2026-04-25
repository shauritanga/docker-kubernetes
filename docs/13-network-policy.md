# NetworkPolicy

## Goal

Limit which pods can connect to PostgreSQL.

## Why This Matters

Many Kubernetes clusters allow broad pod-to-pod communication by default. NetworkPolicy lets you reduce that trust.

## What This Lab Adds

```text
k8s/08-network-policy/networkpolicy.yaml
```

It allows only pods labeled `app=beginner-api` to connect to pods labeled `app=postgres` on TCP port `5432`.

## Command

```bash
kubectl apply -f k8s/08-network-policy/
```

## Expected Result

```bash
kubectl get networkpolicy -n beginner-lab
```

You should see `api-to-postgres-only`.

## Important Note

NetworkPolicy only works if your cluster network plugin supports it. Some local clusters may accept the object but not enforce it.

## Common Errors

- Policy exists but behavior does not change: your network plugin may not enforce NetworkPolicy.
- App loses database access: check that the API pod label is `app=beginner-api`.

# Config And Secrets

## Goal

Separate normal configuration from sensitive values.

## What You Will Create

- `ConfigMap`: app name, message, and database hostname
- `Secret`: PostgreSQL username, password, and database name

## Command

```bash
kubectl apply -f k8s/02-config-and-secret/
```

## What The Command Does

Kubernetes stores the ConfigMap and Secret so pods can read them as environment variables.

## Expected Result

```bash
kubectl get configmap,secret -n beginner-lab
```

You should see `api-config` and `postgres-secret`.

## Common Errors

- `namespaces "beginner-lab" not found`: create the namespace first.
- Secret values in this lab are simple teaching values. Do not commit real production passwords.

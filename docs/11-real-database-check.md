# Real Database Connectivity

## Goal

Show that the API pod can reach the PostgreSQL Service in the cluster.

## Why This Matters

Earlier lessons deploy PostgreSQL, but beginners also need to prove the API can talk to it over the cluster network.

This lab uses the Node `pg` package in the `/db-check` endpoint. It connects to PostgreSQL through the `postgres` Service and runs a small SQL query:

```sql
SELECT NOW() AS database_time;
```

## Command

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

Open another terminal:

```bash
curl http://localhost:8080/db-check
```

## Expected Result

```json
{
  "ok": true,
  "status": "query-succeeded",
  "databaseTime": "2026-04-25T...",
  "databaseHost": "postgres",
  "databasePort": 5432
}
```

## Common Errors

- `query-failed`: the API reached the endpoint but PostgreSQL rejected or failed the query.
- `ECONNREFUSED`: the Service exists, but Postgres is not accepting connections.
- `ENOTFOUND`: the API cannot resolve the database host name.

Check:

```bash
kubectl get pods,svc -n beginner-lab
kubectl logs -l app=postgres -n beginner-lab
```

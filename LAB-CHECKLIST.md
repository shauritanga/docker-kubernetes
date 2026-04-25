# Lab Checklist

Use this as a facilitator checklist. The deeper explanations are in `docs/`.

## Local App

- [ ] `npm install`
- [ ] `npm test`
- [ ] `npm start`
- [ ] `curl http://localhost:8080/`

## Docker

- [ ] `docker build -t beginner-api:local .`
- [ ] `docker run --rm -p 8080:8080 beginner-api:local`
- [ ] Explain what an image is.
- [ ] Explain what a container is.

## Docker Compose

- [ ] `docker compose up --build`
- [ ] `curl http://localhost:8080/`
- [ ] Explain why the API can use `postgres` as a hostname.
- [ ] Explain why Compose is local development orchestration, not Kubernetes.

## Kubernetes With Minikube

- [ ] Read `docs/00-vocabulary.md`
- [ ] Explain Namespace, Pod, Deployment, Service, ConfigMap, Secret, Ingress, label, selector, and probe in simple words.

- [ ] Start Minikube and enable ingress:

```bash
minikube start
minikube addons enable ingress
```

- [ ] Build the image inside Minikube:

```bash
minikube image build -t beginner-api:local .
```

- [ ] Create the namespace:

```bash
kubectl apply -f k8s/01-namespace/namespace.yaml
```

- [ ] Create config and secret:

```bash
kubectl apply -f k8s/02-config-and-secret/
```

- [ ] Create PostgreSQL:

```bash
kubectl apply -f k8s/03-postgres/
```

- [ ] Deploy the API:

```bash
kubectl apply -f k8s/04-api-deployment/
```

- [ ] Expose the API inside the cluster:

```bash
kubectl apply -f k8s/05-service/
```

- [ ] Add ingress:

```bash
kubectl apply -f k8s/06-ingress/
```

- [ ] Verify everything:

```bash
kubectl get all -n beginner-lab
kubectl get ingress -n beginner-lab
```

- [ ] Scale the API to three pods:

```bash
kubectl scale deployment beginner-api --replicas=3 -n beginner-lab
kubectl get pods -n beginner-lab -l app=beginner-api
```

- [ ] Send traffic through the Service and observe `podName` values:

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

```bash
for i in 1 2 3 4 5; do curl -s http://localhost:8080/; echo; done
```

- [ ] Explain that the Service load balances across pods selected by `app=beginner-api`.

- [ ] Enable Metrics Server:

```bash
minikube addons enable metrics-server
```

- [ ] Create the HPA:

```bash
kubectl apply -f k8s/07-autoscaling/
kubectl get hpa -n beginner-lab
```

- [ ] Generate CPU work and watch HPA:

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

```bash
while true; do curl -s http://localhost:8080/work >/dev/null; done
```

- [ ] Explain that HPA automatically changes replica count based on metrics, and that CPU requests are required for CPU-based autoscaling.

## Optional Advanced Topics

- [ ] Run `curl http://localhost:8080/db-check` through port-forward and explain database connectivity.
- [ ] Apply `k8s/09-postgres-persistent/` and explain PVC storage.
- [ ] Apply `k8s/08-network-policy/` and explain allowed API-to-Postgres traffic.
- [ ] Create a TLS Secret and apply `k8s/10-ingress-tls/`.
- [ ] Render `kubectl kustomize --load-restrictor=LoadRestrictionsNone k8s/kustomize/base`.
- [ ] Render `helm template beginner-api helm/beginner-api` if Helm is installed.
- [ ] Review `.github/workflows/ci.yml`.

## Cleanup

- [ ] `kubectl delete namespace beginner-lab`

# Start Here

Follow the lessons in order. Each lesson introduces one idea before adding the next one.

If your machine is not ready yet, install the required tools with [TOOLS-INSTALL.md](./TOOLS-INSTALL.md).

Before the Kubernetes section, read [Kubernetes Vocabulary For This Lab](./docs/00-vocabulary.md). It explains the new words used by the commands, including Pod, Deployment, Service, ConfigMap, Secret, Ingress, label, selector, and probe.

## 1. Run The App Locally

```bash
npm install
npm test
npm start
```

Open another terminal:

```bash
curl http://localhost:8080/
curl http://localhost:8080/healthz
```

## 2. Build A Docker Image

```bash
docker build -t beginner-api:local .
docker run --rm -p 8080:8080 beginner-api:local
```

## 3. Run API And PostgreSQL With Compose

```bash
docker compose up --build
```

Open another terminal:

```bash
curl http://localhost:8080/
```

## 4. Start Minikube And Build The Image

Minikube gives beginners a local Kubernetes cluster. The app image must be available inside Minikube, so use `minikube image build` instead of `docker push`.

```bash
minikube start
minikube addons enable ingress
minikube image build -t beginner-api:local .
```

The Deployment already uses `image: beginner-api:local`, so Kubernetes can use the image built inside Minikube.

## 5. Deploy To Kubernetes In Small Steps

```bash
kubectl apply -f k8s/01-namespace/namespace.yaml
kubectl apply -f k8s/02-config-and-secret/
kubectl apply -f k8s/03-postgres/
kubectl apply -f k8s/04-api-deployment/
kubectl apply -f k8s/05-service/
kubectl apply -f k8s/06-ingress/
```

Verify:

```bash
kubectl get all -n beginner-lab
kubectl get ingress -n beginner-lab
```

## 6. Try Scaling And Load Balancing

```bash
kubectl scale deployment beginner-api --replicas=3 -n beginner-lab
kubectl get pods -n beginner-lab -l app=beginner-api
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

Open another terminal:

```bash
for i in 1 2 3 4 5; do curl -s http://localhost:8080/; echo; done
```

Look for different `podName` values in the responses. That shows the Service sending traffic to different API pods.

## 7. Try Automatic Scaling With HPA

```bash
minikube addons enable metrics-server
kubectl apply -f k8s/07-autoscaling/
kubectl get hpa -n beginner-lab
```

Watch the HPA:

```bash
kubectl get hpa -n beginner-lab --watch
```

To generate CPU work, port-forward the Service and run repeated requests to `/work` from another terminal:

```bash
kubectl port-forward svc/beginner-api 8080:80 -n beginner-lab
```

```bash
while true; do curl -s http://localhost:8080/work >/dev/null; done
```

HPA needs metrics and CPU requests before it can make scaling decisions. Read the full lesson before facilitating this section.

## 8. Read The Lessons

The commands above are the short path. For explanations, read:

1. [Setup](./docs/00-setup.md)
2. [Kubernetes Vocabulary](./docs/00-vocabulary.md)
3. [Kubernetes Basics](./docs/01-kubernetes-basics.md)
4. [Deploy An App](./docs/02-deploy-an-app.md)
5. [Expose With A Service](./docs/03-expose-with-service.md)
6. [Config And Secrets](./docs/04-config-and-secrets.md)
7. [Stateful PostgreSQL](./docs/05-stateful-postgres.md)
8. [Ingress](./docs/06-ingress.md)
9. [Scaling And Load Balancing](./docs/07-scaling-and-load-balancing.md)
10. [Autoscaling With HPA](./docs/08-autoscaling-with-hpa.md)
11. [Debugging](./docs/09-debugging.md)
12. [Cleanup](./docs/10-cleanup.md)

## 9. Optional Advanced Lessons

These are useful after learners understand the beginner path:

1. [Real Database Connectivity](./docs/11-real-database-check.md)
2. [Production PostgreSQL Storage](./docs/12-production-postgres-storage.md)
3. [NetworkPolicy](./docs/13-network-policy.md)
4. [TLS For Ingress](./docs/14-ingress-tls.md)
5. [Kustomize And Helm](./docs/15-kustomize-and-helm.md)
6. [GitHub Actions CI](./docs/16-github-actions-ci.md)

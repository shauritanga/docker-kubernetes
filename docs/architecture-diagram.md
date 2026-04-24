# Workshop Architecture Diagram

Use this diagram during the workshop to explain how the same backend moves through local development, container packaging, Kubernetes deployment, and CI validation.

```mermaid
flowchart LR
    Dev[Developer]
    Repo[Claims API Repo]
    Docker[Docker Image]
    Compose[Docker Compose]
    Kubeadm[kubeadm Cluster]
    Ingress[Ingress]
    API[Claims API Pod]
    Service[Service]
    Postgres[(PostgreSQL)]
    Redis[(Redis)]
    CI[GitHub Actions CI]

    Dev --> Repo
    Repo --> Docker
    Repo --> CI
    Docker --> Compose
    Docker --> Kubeadm

    Compose --> API
    Compose --> Postgres
    Compose --> Redis

    Kubeadm --> Ingress
    Ingress --> Service
    Service --> API
    API --> Postgres
    API --> Redis

    CI --> Docker
    CI --> Kubeadm
```

## How To Explain It

- The developer writes code in the claims API repo.
- Docker turns that code into a portable image.
- Docker Compose is the local learning step for running the app with Postgres and Redis.
- kubeadm is the Kubernetes learning step for running the same app with cluster primitives like Deployment, Service, and Ingress.
- GitHub Actions validates code, container build, and Kubernetes configuration before delivery.

## Workshop Talking Points

- Docker solves packaging and environment consistency.
- Compose solves local multi-service startup pain.
- Kubernetes solves orchestration, service discovery, rollout, and scaling problems.
- CI catches obvious delivery failures before a human tries to deploy.

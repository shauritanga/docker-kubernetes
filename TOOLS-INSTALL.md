# Tool Installation Guide

Use this page before the lab. Every learner should install these tools and run the verification commands before starting `START-HERE.md`.

## Tools Needed

- Node.js 22+
- Docker with Docker Compose
- kubectl
- Minikube
- Git
- curl

## Verify Everything

Run these after installing:

```bash
node --version
npm --version
git --version
curl --version
docker --version
docker compose version
kubectl version --client
minikube version
```

Start Minikube:

```bash
minikube start --driver=docker
minikube addons enable ingress
kubectl get nodes
```

Expected result:

```text
minikube   Ready
```

## Linux: Ubuntu Or Debian

### 1. Install Basic Tools

```bash
sudo apt update
sudo apt install -y curl ca-certificates git
```

### 2. Install Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### 3. Install Docker

```bash
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and log back in so your user can run Docker without `sudo`.

Verify:

```bash
docker --version
docker compose version
docker run hello-world
```

### 4. Install kubectl

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl
kubectl version --client
```

### 5. Install Minikube

```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64
minikube version
```

### 6. Start Minikube

```bash
minikube start --driver=docker
minikube addons enable ingress
kubectl get nodes
```

## macOS

### 1. Install Homebrew

If Homebrew is not installed, install it from:

```text
https://brew.sh/
```

### 2. Install Tools

```bash
brew install node@22 git curl kubectl minikube
```

### 3. Install Docker Desktop

Download and install Docker Desktop for Mac:

```text
https://www.docker.com/products/docker-desktop/
```

Open Docker Desktop before running Docker or Minikube commands.

### 4. Verify

```bash
node --version
npm --version
git --version
docker --version
docker compose version
kubectl version --client
minikube version
```

### 5. Start Minikube

```bash
minikube start --driver=docker
minikube addons enable ingress
kubectl get nodes
```

## Windows Recommended Path: WSL2 + Docker Desktop

Use WSL2 because the lab commands are Linux-style and work best in a Linux shell.

### 1. Install WSL2 With Ubuntu

Open PowerShell as Administrator:

```powershell
wsl --install -d Ubuntu
```

Restart if Windows asks you to.

Open Ubuntu from the Start menu and create your Linux username/password.

### 2. Install Docker Desktop

Download and install Docker Desktop for Windows:

```text
https://www.docker.com/products/docker-desktop/
```

In Docker Desktop:

1. Open Settings.
2. Go to Resources.
3. Go to WSL Integration.
4. Enable integration for Ubuntu.
5. Apply and restart Docker Desktop if prompted.

### 3. Install Tools Inside Ubuntu WSL

Run these in the Ubuntu terminal:

```bash
sudo apt update
sudo apt install -y curl ca-certificates git
```

Install Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Install kubectl:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl
```

Install Minikube:

```bash
curl -LO https://github.com/kubernetes/minikube/releases/latest/download/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64
```

### 4. Verify Inside Ubuntu WSL

```bash
node --version
npm --version
git --version
docker --version
docker compose version
kubectl version --client
minikube version
```

### 5. Start Minikube Inside Ubuntu WSL

Make sure Docker Desktop is running, then:

```bash
minikube start --driver=docker
minikube addons enable ingress
kubectl get nodes
```

## Windows Alternative: Native PowerShell

This is possible, but WSL2 is recommended for this lab.

Install with winget:

```powershell
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install Docker.DockerDesktop
winget install Kubernetes.kubectl
winget install Kubernetes.minikube
```

Restart PowerShell, open Docker Desktop, then verify:

```powershell
node --version
npm --version
git --version
docker --version
docker compose version
kubectl version --client
minikube version
```

Start Minikube:

```powershell
minikube start --driver=docker
minikube addons enable ingress
kubectl get nodes
```

## Project-Specific First Commands

After tools are installed, clone or open the project and run:

```bash
npm install
npm test
docker compose up --build
```

For Kubernetes:

```bash
minikube image build -t beginner-api:local .
kubectl apply -f k8s/01-namespace/namespace.yaml
kubectl apply -f k8s/02-config-and-secret/
kubectl apply -f k8s/03-postgres/
kubectl apply -f k8s/04-api-deployment/
kubectl apply -f k8s/05-service/
kubectl apply -f k8s/06-ingress/
```

## Common Problems

### Docker Permission Denied On Linux

If Docker works only with `sudo`, run:

```bash
sudo usermod -aG docker "$USER"
```

Then log out and log back in.

### Minikube Cannot Start

Check Docker is running:

```bash
docker ps
```

Then retry:

```bash
minikube start --driver=docker
```

### kubectl Cannot Find Nodes

Start Minikube first:

```bash
minikube start --driver=docker
kubectl get nodes
```

### ImagePullBackOff For beginner-api

Build the image inside Minikube:

```bash
minikube image build -t beginner-api:local .
```

Then restart the Deployment:

```bash
kubectl rollout restart deployment beginner-api -n beginner-lab
```

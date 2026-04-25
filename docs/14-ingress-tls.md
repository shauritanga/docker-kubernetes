# TLS For Ingress

## Goal

Add HTTPS-style TLS configuration to the Ingress.

## Why This Matters

Production HTTP traffic should use TLS. In Kubernetes, Ingress TLS usually references a Secret containing a certificate and private key.

## Create A Local Teaching Certificate

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout beginner.local.key \
  -out beginner.local.crt \
  -subj "/CN=beginner.local/O=beginner.local"
```

Create the Kubernetes TLS Secret:

```bash
kubectl create secret tls beginner-api-tls \
  --cert=beginner.local.crt \
  --key=beginner.local.key \
  -n beginner-lab
```

Apply the TLS Ingress:

```bash
kubectl apply -f k8s/10-ingress-tls/
kubectl get ingress -n beginner-lab
```

## Important Note

This is a self-signed certificate for learning. Browsers will not trust it automatically.

Production teams normally use cert-manager or a platform-managed certificate process.

## Cleanup Local Certificate Files

```bash
rm beginner.local.key beginner.local.crt
```

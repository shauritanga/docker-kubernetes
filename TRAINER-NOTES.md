# Trainer Notes

Use this file if you are leading the lab for a team instead of having learners work through it alone.

This repo is designed to teach backend developers why Docker and Kubernetes exist, what pain they solve, and how to use them safely in an enterprise backend context.

## Workshop Outcome

By the end of the workshop, learners should be able to:

- explain why Docker exists beyond "packaging apps"
- explain why Kubernetes exists beyond "running containers"
- run a backend service with Docker and Docker Compose
- deploy that service to Minikube
- explain the purpose of Deployment, Service, ConfigMap, Secret, Ingress, probes, HPA, PDB, and NetworkPolicy
- detect and recover from a failed rollout
- explain how CI/CD reduces delivery risk

## Recommended Audience

- backend developers with limited operations experience
- teams moving from local-only development into containerized delivery
- developers who know APIs well but do not yet understand platform tooling deeply

## Recommended Format

Run the material as a guided workshop in six sessions or one extended bootcamp.

Suggested pacing:

- Session 1: Concepts and Module 1
- Session 2: Module 2
- Session 3: Module 3
- Session 4: Module 4
- Session 5: Module 5
- Session 6: Module 6 and recap

For a one-day workshop, compress it into:

- Part 1: glossary + Docker + Compose
- Part 2: Kubernetes foundations + production patterns
- Part 3: rollout failure + rollback + CI/CD

## Teaching Flow

Always teach in this order:

1. pain first
2. concept second
3. command third
4. failure mode fourth
5. tradeoff last

Do not begin with syntax. Backend developers learn these tools faster when they understand what pain each abstraction removes.

## Pre-Workshop Setup

Ask learners to complete these before the session:

- install Node.js 22+
- install Docker with `docker compose`
- install `kubectl`
- install Minikube
- clone the repository
- run:

```bash
npm install
docker compose config
kubectl version --client
```

If time is limited, pre-warm Minikube for learners.

## How To Use The Repo During Teaching

The flow should be:

1. Start with [docs/concept-glossary.md](/home/mcb0168e/Development/docker-example/docs/concept-glossary.md)
2. Use [LAB-CHECKLIST.md](/home/mcb0168e/Development/docker-example/LAB-CHECKLIST.md) as the operational guide
3. Use the module docs for deeper explanation
4. Use this file to decide what to emphasize verbally

## Module Guidance

### Module 0: Concept Glossary

Primary teaching goal:

- remove the feeling that Docker and Kubernetes are random complexity

What to emphasize:

- tools are responses to pain, not inventions for their own sake
- most platform abstractions exist because manual workflows kept failing

Questions to ask learners:

- what does "works on my machine" really mean in your current team
- what manual deployment pain have you seen before
- where does configuration drift show up today

### Module 1: Container Foundations

Primary teaching goal:

- show that Docker solves environment consistency and packaging problems

What to emphasize:

- the Docker image is the deliverable artifact
- image layering matters because rebuild speed matters
- non-root containers are not "extra security theater"; they reduce avoidable privilege

Common learner mistakes:

- thinking Docker is just a way to run Linux commands
- not understanding the difference between image build time and container runtime
- assuming containerization automatically makes an app production-ready

Trainer prompt:

- ask learners what used to break when a new developer joined the team

### Module 2: Docker Compose

Primary teaching goal:

- show why local multi-service development needs orchestration even before Kubernetes

What to emphasize:

- Compose solves developer workflow pain, not cluster scheduling
- service naming is a major improvement over ad hoc localhost assumptions
- health-based startup sequencing reduces fragile boot timing problems

Common learner mistakes:

- treating Compose as a production strategy
- confusing host networking with container-to-container networking
- assuming `localhost` always means the same thing

Trainer prompt:

- ask learners how many manual steps they currently use to start their local stack

### Module 3: Kubernetes Foundations

Primary teaching goal:

- map from container concepts into cluster concepts

What to emphasize:

- Kubernetes is about desired state and orchestration
- a pod is not the same as a VM
- Deployments manage change over time; Services manage stable access

Common learner mistakes:

- thinking a pod is a permanent machine
- not understanding selectors and labels
- applying resources without understanding dependencies like Secrets

Trainer prompt:

- ask learners why a Service is necessary if the pod is already running

### Module 4: Production-Oriented Patterns

Primary teaching goal:

- show the difference between "deployed" and "safely operable"

What to emphasize:

- readiness protects users
- liveness protects recovery
- requests and limits affect both performance and scheduling
- HPA is not a magic performance button

Common learner mistakes:

- confusing liveness and readiness
- setting resource limits without understanding real workload behavior
- assuming autoscaling fixes slow databases or bad application design

Trainer prompt:

- ask learners what happens if a process is alive but cannot actually serve requests

### Module 5: Rollouts And Recovery

Primary teaching goal:

- normalize failure and teach calm recovery

What to emphasize:

- the most important operational skill is safe diagnosis under pressure
- rollout status and logs are the first tools, not random guesswork
- rollback is a safety feature, not an admission of incompetence

Common learner mistakes:

- making multiple changes at once during failure
- deleting resources too early
- treating scaling as a substitute for debugging

Trainer prompt:

- ask learners what they would do first if a deployment failed on a Friday evening

### Module 6: CI/CD

Primary teaching goal:

- connect local quality checks to team-scale delivery

What to emphasize:

- CI exists to catch boring failure early
- Docker, tests, and manifest validation belong together
- pipelines reduce reliance on memory and heroics

Common learner mistakes:

- treating CI as separate from application engineering
- assuming passing CI means production is guaranteed safe
- overvaluing pipeline complexity instead of feedback quality

Trainer prompt:

- ask learners which failures in their team are still discovered too late

## Good Questions To Ask Throughout

- what problem was this concept introduced to solve
- what pain would you feel without it
- what tradeoff did we accept by introducing it
- what would fail if this part were removed
- which issues should be caught locally, in CI, or in Kubernetes

## Common Misconceptions To Correct

- Docker and Kubernetes are not the same thing
- a container is not a VM
- Compose is not a production orchestrator
- Kubernetes does not remove the need for application design
- autoscaling does not fix inefficient code or weak databases
- CI/CD does not replace thinking; it makes validation repeatable

## Suggested Assessment

Ask each learner to explain, without reading notes:

- why Docker was needed
- why Kubernetes was needed
- what a Deployment solves
- what a Service solves
- the difference between readiness and liveness
- why HPA helps and where it falls short
- what rollback solves
- what CI should catch before deployment

Then ask them to perform:

- a local Compose startup
- a Minikube deployment
- a broken rollout detection
- a rollback recovery

## Signs Learners Really Understand The Material

- they explain problems before naming tools
- they can distinguish local developer convenience from production safety
- they use Kubernetes terminology accurately without sounding memorized
- they can recover from a failure without random trial-and-error
- they can describe tradeoffs, not just benefits

## Signs They Need More Help

- they memorize commands but cannot explain why the command matters
- they use "container", "pod", and "server" interchangeably
- they think a healthy process is the same as a ready service
- they assume scaling solves all production issues
- they treat CI as a checkbox instead of a risk-reduction system

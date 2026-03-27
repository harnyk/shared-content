---
tags: CV
---

# Mark Harnyk

**Senior Backend Engineer**
Building scalable cloud-native systems for high-load and revenue-critical platforms.
10+ years across PropTech, Event Tech, and Domain infrastructure.

**B2B contract** only · **Remote-first** (worldwide) · Hybrid/on-site available in Poznań

## Contacts

Poznań, Poland
+48788540819
markharnyk@gmail.com
https://www.linkedin.com/in/lets-do-it
https://t.me/StateMachineUA

## Languages

`English` — C1 · `Ukrainian` — native · `Russian` — native · `Polish` — A2

---

## Core Stack

 - **Languages:** `Node.js`, `TypeScript`, `Go`
 - **Cloud & Architecture:** `AWS` (`Lambda`, `SQS`, `SNS`, `Step Functions`, `API Gateway`), `Serverless Framework`, `Microservices`, `Event-Driven Architecture`
 - **API:** `REST API`, `GraphQL`
 - **Data:** `MongoDB`, `PostgreSQL`, `MySQL`, `Redis`, `DynamoDB`, `OpenSearch`, `pgvector`
 - **DevOps & Delivery:** `Docker`, `Kubernetes`, `CI/CD` (`GitHub Actions`, `CircleCI`, `Jenkins`)
 - **AI:** `OpenAI API`, `MCP`, `Vector Search`, `Keras`

---

## Recent impact

- Built customer-facing AI agent for domain lifecycle management (Namecheap)
- Delivered fault-tolerant publishing pipeline processing 10k+ listings/day (SweepBright)
- Designed cross-platform property data DSL adopted across web, mobile, and server (SweepBright)
- Built client onboarding import system for enterprise migrations — CLI tooling, GraphQL ingestion API, queue architecture (SweepBright)

---


## Work Experience

### Namecheap — Senior Backend Engineer
*Sep 2024 – Dec 2025*
Domain: Domain Registration

Contributed to scaling a customer-facing AI agent (v1 → v2) covering the full domain lifecycle — purchase, DNS, SSL, and email configuration — reducing friction for non-technical users and deflecting routine requests from support.

- Contributed to core agent infrastructure: RAG pipeline on pgvector, conversation orchestration via SQS worker, router-based sub-agent switching with dynamic system prompts and tool subsets
- Implemented integrations with internal enterprise APIs as agent tools
- Built an internal admin panel for conversation review, powered by a secondary LLM evaluator that tagged topics, products, goal achievement, and customer sentiment
- Developed agent evaluation framework for integration tests, including token usage and cost tracking per test run

Tech: `TypeScript`, `Node.js`, `Express.js`, `PostgreSQL`, `pgvector`, `OpenSearch`, `AWS SQS/SNS`, `AWS Lambda`, `Docker`, `Kubernetes`, `Jenkins`, `Jest`, `REST API`, `OpenAI API`, `MCP`

---

### SweepBright — Senior Backend Engineer
*Feb 2020 – Aug 2024*
Domain: PropTech

**Integration & Publication Platform**

Took full ownership of a legacy Go codebase — abandoned, undocumented, built by an engineer who had left — and rewrote it from scratch under deadline pressure to support a partner marketplace's new asynchronous API. Delivered a fault-tolerant publishing pipeline processing tens of thousands of listings per day.

- Architected the new pipeline around AWS Step Functions and Go Lambdas, replacing ad-hoc SNS/SQS orchestration
- Implemented async polling, image upload sequencing, rate-limit handling, retry policies, and structured logging via DataDog
- Became the team's de facto Go resource — others adopted the language through bug fixes and extensions on this codebase

**Property Data Standards (DSL)**

Identified and solved a systemic problem: business rules and validation logic for 450+ property parameters across Belgium, Netherlands, and France were hardcoded and duplicated across web app, PHP monolith, Node.js microservices, and iOS. Proposed and sold the solution to CTO.

- Designed a DSL combining JSON Schema and JSON Logic to dynamically compute per-combination validation schemas (country × property type × transaction type × ~3 other axes)
- Generated platform-specific libraries from a single source of truth: TypeScript, PHP, Swift, Kotlin
- Enabled dynamic form rendering on web and mobile, centralised server-side validation, and eliminated cross-platform inconsistency

**ML-based Property Recommendations**

Initiated and built a recommendation system for real estate agents — first ML project for the team.

- Hypothesised that properties visited by the same buyer share latent similarity; assembled a dataset of visit sequences and trained a triplet-loss neural network (Keras) to produce property embeddings
- Stored and queried embeddings in Qdrant; surfaced similar listings inside the CRM for agents to recommend in real time

**Node.js Microservices & Platform Work**

- Built a search indexing pipeline: an event-driven worker consumed domain events (create/update/delete) and maintained a MongoDB Atlas Search index as a queryable replica of the primary MySQL database
- Delivered a client onboarding import system — CLI tool distributed to client-side IT integrators, GraphQL ingestion API, worker queue architecture to smooth peak load within Lambda provisioned concurrency limits, and developer-facing documentation site
- Used Serverless Framework as the foundation for the entire microservices deployment workflow — wrote service configurations and contributed custom plugins
- Delivered feature work across the Node.js/TypeScript microservices platform as the primary day-to-day stack

Tech: `TypeScript`, `Node.js`, `Go`, `Serverless Framework`, `GraphQL`, `REST API`, `Microservices`, `Event-Driven Architecture`, `MongoDB`, `MongoDB Atlas Search`, `MySQL`, `DynamoDB`, `AWS Lambda`, `AWS API Gateway`, `AWS Step Functions`, `SQS`, `SNS`, `Kinesis`, `S3`, `Redis`, `DataDog`, `Docker`, `CI/CD`, `Keras`, `Qdrant`, `Jest`

---

### Bizzabo — Senior Fullstack Engineer
*Oct 2016 – Feb 2020*
Domain: Event Management

- Delivered custom domain support for white-label event sites: owned BFF (Node.js SSR) and frontend layers, solved resulting CORS, cross-domain cookie sharing, and iframe/postMessage auth issues
- Implemented passwordless authentication flow for event attendees; handled OAuth token refresh race conditions via distributed lock on Redis across BFF instances
- Worked in a Kubernetes-first engineering culture — owned Helm chart configuration for personal services, used Telepresence for local development against a shared bare-metal cluster

Tech: `TypeScript`, `Node.js`, `Express.js`, `React`, `Redux`, `CSS Modules`, `JSS`, `Material UI`, `MySQL`, `Redis`, `Docker`, `Kubernetes`, `Nginx`, `JWT`, `SSO`, `REST API`, `Microservices`, `Multi-tenant`, `Cypress`, `Karma`

---

## Earlier Career

**Plarium — Frontend Lead** *2013 – 2016*
Initiated and led migration of internal BI dashboards from server-rendered jQuery to a client-side Angular architecture with REST API, establishing the company's first dedicated frontend team and engineering practices.

**TOA Technologies — Fullstack Engineer** *2011 – 2013*
Built geospatial dashboards and backend services for spatial queries.

**Meta.ua — Fullstack Engineer** *2010 – 2011*
Developed large-scale webmail system with API-first design — Perl backend, JavaScript frontend — departing from the prevailing server-rendered jQuery approach of the era.
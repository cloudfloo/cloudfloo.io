# System Overview

CloudFloo.io is built around a Next.js frontend served via Docker containers. The application relies on server components and streaming to deliver fast initial loads. Static exports are created for SEO friendly pages while dynamic content leverages server-side rendering.

```
+------------+       +------------+
|   Client   | <---> | Next.js App|
+------------+       +------------+
        |                 |
        v                 v
  CDN / Edge         Kubernetes
```

The infrastructure is deployed using Helm charts and runs inside Kubernetes clusters. Continuous integration validates code quality, runs accessibility tests, and measures Lighthouse scores before publishing Docker images.

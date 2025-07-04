-- Sample Categories
INSERT INTO blog_categories (name, slug, description, color) VALUES
('Cloud Computing', 'cloud', 'Articles about cloud infrastructure and services', '#06b6d4'),
('AI & Machine Learning', 'ai', 'Insights into AI and ML technologies', '#8b5cf6'),
('DevOps', 'devops', 'DevOps practices and automation', '#10b981'),
('Security', 'security', 'Cybersecurity and best practices', '#ef4444'),
('Tutorials', 'tutorials', 'Step-by-step guides and tutorials', '#f59e0b');

-- Sample Authors
INSERT INTO blog_authors (name, bio, avatar_url, social_links) VALUES
('Sarah Rodriguez', 'Cloud Architecture Expert with 10+ years experience in AWS and Azure', 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=100', '{"linkedin": "sarah-rodriguez", "twitter": "sarah_cloud"}'),
('Alex Chen', 'AI/ML Engineer specializing in production ML systems', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100', '{"linkedin": "alex-chen-ml", "github": "alexchen"}'),
('David Kim', 'Security Consultant and Kubernetes expert', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=100', '{"linkedin": "david-kim-security"}'),
('Maria Santos', 'DevOps Engineer and GitOps advocate', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100', '{"linkedin": "maria-santos-devops"}'),
('James Wilson', 'Edge Computing Specialist', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=100', '{"linkedin": "james-wilson-edge"}'
);

-- Sample Tags
INSERT INTO blog_tags (name, slug) VALUES
('serverless', 'serverless'),
('aws', 'aws'),
('architecture', 'architecture'),
('machine-learning', 'machine-learning'),
('mlops', 'mlops'),
('production', 'production'),
('kubernetes', 'kubernetes'),
('security', 'security'),
('containers', 'containers'),
('gitops', 'gitops'),
('ci-cd', 'ci-cd'),
('automation', 'automation'),
('edge-computing', 'edge-computing'),
('performance', 'performance'),
('cdn', 'cdn');

-- Sample Blog Posts
INSERT INTO blog_posts (
  slug, title, excerpt, content, featured_image_url, 
  category_id, author_id, status, published_at, 
  read_time_minutes, featured, meta_title, meta_description
) VALUES
(
  'future-of-serverless-computing',
  'The Future of Serverless Computing: Trends and Predictions for 2024',
  'Explore the latest developments in serverless architecture and what they mean for modern application development.',
  'Serverless computing has revolutionized how we build and deploy applications. In this comprehensive guide, we explore the latest trends shaping the serverless landscape in 2024.

## The Evolution of Serverless

Serverless computing has come a long way since its inception. What started as simple function-as-a-service (FaaS) offerings has evolved into comprehensive platforms that support complex, stateful applications.

### Key Trends for 2024

1. **Enhanced Cold Start Performance**: Major cloud providers are investing heavily in reducing cold start times
2. **Better Observability**: New tools for monitoring and debugging serverless applications
3. **Multi-Cloud Serverless**: Solutions that work across different cloud providers

## Best Practices

When implementing serverless solutions, consider these best practices:

- Design for statelessness
- Optimize function size and dependencies
- Implement proper error handling
- Use appropriate timeout settings

## Conclusion

The future of serverless computing looks bright, with continuous improvements in performance, tooling, and developer experience.',
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
  (SELECT id FROM blog_categories WHERE slug = 'cloud'),
  (SELECT id FROM blog_authors WHERE name = 'Sarah Rodriguez'),
  'published',
  '2024-01-15T10:00:00Z',
  8,
  true,
  'The Future of Serverless Computing - CloudFloo',
  'Discover serverless computing trends and predictions for 2024'
),
(
  'building-resilient-ai-systems',
  'Building Resilient AI Systems: Best Practices for Production ML',
  'Learn how to design and implement machine learning systems that can handle real-world challenges.',
  'Production machine learning systems face unique challenges that go beyond what we encounter in development environments. This article explores best practices for building resilient AI systems.

## The Challenge of Production ML

Moving from proof-of-concept to production is often where ML projects fail. The requirements change dramatically:

- **Scale**: Handling thousands or millions of requests
- **Reliability**: 99.9% uptime requirements
- **Monitoring**: Real-time performance tracking
- **Security**: Protecting sensitive data and models

## Key Principles

### 1. Model Versioning and Rollback

Implement proper model versioning to enable quick rollbacks when issues arise:

```python
# Example model versioning strategy
model_registry = {
    "v1.0": "stable_model_2024_01_15.pkl",
    "v1.1": "enhanced_model_2024_01_20.pkl",
    "canary": "experimental_model_2024_01_22.pkl"
}
```

### 2. Comprehensive Monitoring

Monitor both technical metrics and business metrics:

- Model drift detection
- Prediction accuracy over time
- Response latency
- Resource utilization

## Conclusion

Building resilient AI systems requires careful planning and implementation of robust monitoring, testing, and deployment practices.',
  'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
  (SELECT id FROM blog_categories WHERE slug = 'ai'),
  (SELECT id FROM blog_authors WHERE name = 'Alex Chen'),
  'published',
  '2024-01-12T14:30:00Z',
  12,
  true,
  'Building Resilient AI Systems - CloudFloo',
  'Best practices for production machine learning systems'
),
(
  'kubernetes-security-guide',
  'Kubernetes Security: A Comprehensive Guide to Container Orchestration',
  'Deep dive into Kubernetes security best practices and how to protect your containerized applications.',
  'Container security is more critical than ever as organizations adopt Kubernetes for production workloads. This comprehensive guide covers essential security practices.

## Security Fundamentals

Kubernetes security operates on multiple layers:

1. **Cluster Security**: Securing the control plane and nodes
2. **Network Security**: Implementing network policies
3. **Pod Security**: Securing individual containers
4. **RBAC**: Role-based access control

## Best Practices

### Cluster Hardening

- Keep Kubernetes updated
- Secure the etcd datastore
- Enable audit logging
- Use network policies

### Pod Security Standards

Implement pod security standards to prevent privilege escalation:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      capabilities:
        drop:
        - ALL
      readOnlyRootFilesystem: true
```

## Monitoring and Compliance

Regular security audits and monitoring are essential for maintaining a secure Kubernetes environment.',
  'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
  (SELECT id FROM blog_categories WHERE slug = 'security'),
  (SELECT id FROM blog_authors WHERE name = 'David Kim'),
  'published',
  '2024-01-10T09:15:00Z',
  15,
  false,
  'Kubernetes Security Guide - CloudFloo',
  'Comprehensive guide to securing Kubernetes clusters and applications'
);

-- Link posts to tags
INSERT INTO blog_post_tags (post_id, tag_id) VALUES
-- Serverless post tags
((SELECT id FROM blog_posts WHERE slug = 'future-of-serverless-computing'), (SELECT id FROM blog_tags WHERE slug = 'serverless')),
((SELECT id FROM blog_posts WHERE slug = 'future-of-serverless-computing'), (SELECT id FROM blog_tags WHERE slug = 'aws')),
((SELECT id FROM blog_posts WHERE slug = 'future-of-serverless-computing'), (SELECT id FROM blog_tags WHERE slug = 'architecture')),
-- AI post tags
((SELECT id FROM blog_posts WHERE slug = 'building-resilient-ai-systems'), (SELECT id FROM blog_tags WHERE slug = 'machine-learning')),
((SELECT id FROM blog_posts WHERE slug = 'building-resilient-ai-systems'), (SELECT id FROM blog_tags WHERE slug = 'mlops')),
((SELECT id FROM blog_posts WHERE slug = 'building-resilient-ai-systems'), (SELECT id FROM blog_tags WHERE slug = 'production')),
-- Security post tags
((SELECT id FROM blog_posts WHERE slug = 'kubernetes-security-guide'), (SELECT id FROM blog_tags WHERE slug = 'kubernetes')),
((SELECT id FROM blog_posts WHERE slug = 'kubernetes-security-guide'), (SELECT id FROM blog_tags WHERE slug = 'security')),
((SELECT id FROM blog_posts WHERE slug = 'kubernetes-security-guide'), (SELECT id FROM blog_tags WHERE slug = 'containers'));

-- Sample translations (English - already in main table, Polish examples)
INSERT INTO blog_post_translations (post_id, locale, title, excerpt, content, slug, meta_title, meta_description) VALUES
-- Polish translations
(
  (SELECT id FROM blog_posts WHERE slug = 'future-of-serverless-computing'),
  'pl',
  'Przyszłość Serverless Computing: Trendy i Prognozy na 2024',
  'Poznaj najnowsze osiągnięcia w architekturze serverless i ich znaczenie dla nowoczesnego rozwoju aplikacji.',
  'Serverless computing zrewolucjonizował sposób, w jaki budujemy i wdrażamy aplikacje...',
  'przyszlosc-serverless-computing',
  'Przyszłość Serverless Computing - CloudFloo',
  'Odkryj trendy i prognozy dotyczące serverless computing na 2024 rok'
),
(
  (SELECT id FROM blog_posts WHERE slug = 'building-resilient-ai-systems'),
  'pl',
  'Budowanie Odpornych Systemów AI: Najlepsze Praktyki dla Produkcyjnego ML',
  'Dowiedz się, jak projektować i implementować systemy uczenia maszynowego, które poradzą sobie z rzeczywistymi wyzwaniami.',
  'Produkcyjne systemy uczenia maszynowego stoją przed unikalnymi wyzwaniami...',
  'budowanie-odpornych-systemow-ai',
  'Budowanie Odpornych Systemów AI - CloudFloo',
  'Najlepsze praktyki dla produkcyjnych systemów uczenia maszynowego'
); 
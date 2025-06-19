# README.md

# CloudFloo.io

[![Build Status](https://github.com/cloudfloo/cloudfloo.io/actions/workflows/main.yml/badge.svg)](https://github.com/cloudfloo/cloudfloo.io/actions/workflows/main.yml)

CloudFloo is a senior team of Polish engineers building cloud-native, micro-service, and DevOps solutions in NestJS, React, and Kubernetes.

## Features

- **Modern Tech Stack**: Next.js, React, TypeScript, and Tailwind CSS
- **Immersive UI**: Dynamic cloud visualization and interactive components
- **Fully Responsive**: Optimized for all device sizes
- **Accessibility**: WCAG 2.1 AA compliant
- **Internationalization**: Supports multiple languages (English, Polish)
- **SEO Optimized**: Meta tags, structured data, and optimized performance
- **Dark Mode**: Modern dark theme with neon accents
- **Docker Ready**: Containerized for easy deployment
- **CI/CD Pipeline**: Automated testing and deployment

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/cloudfloo/cloudfloo.io.git
cd cloudfloo.io

# Install dependencies
npm ci
```

### Development

```bash
# Start the development server
npm run dev

# Run linting
npm run lint

# Run tests
npm test

# Run accessibility tests
npm run test:e2e
```

### Building for Production

```bash
# Build the application
npm run build

# Generate static export
npm run static

# Start the production server
npm start
```

### Docker

```bash
# Build the Docker image
docker build -t cloudfloo.io .

# Run the Docker container
docker run -p 3000:3000 cloudfloo.io
```

## Architecture
The project follows the Next.js App Router architecture with:

* App Directory: Page components and routes
* Components: Reusable UI components
* Contexts: React context providers
* Data: Static data and placeholders
* Public: Static assets and translations
* Utils: Utility functions
* Tests: End-to-end and unit tests

## CI/CD Pipeline
The project uses GitHub Actions for continuous integration and deployment:

1. Lighthouse Testing: Performance, accessibility, and best practices
2. Accessibility Testing: Automated WCAG compliance checks
3. Docker Build: Creates and publishes Docker images to GitHub Container Registry

## Tech Stack Details

### Frontend
- **Next.js**: App Router architecture for server components, streaming, and enhanced SEO
- **React**: Component-based UI with hooks for state management
- **TypeScript**: Static typing for better developer experience and fewer runtime errors
- **Tailwind CSS**: Utility-first CSS framework with custom theming
- **Three.js**: Powers the immersive cloud visualizations with WebGL
- **React Query**: Data fetching and state management for server state

### Infrastructure
- **Docker**: Multi-stage builds optimized for production
- **Kubernetes**: Orchestration with custom Helm charts
- **GitHub Actions**: Automated workflows for testing, building, and deployment

## Code Quality Standards

### Linting and Formatting
- ESLint with custom rule configuration
- Prettier for consistent code formatting
- TypeScript strict mode enabled

### Testing Strategy
- Jest for unit and component testing
- React Testing Library for component interactions
- Playwright for end-to-end testing
- Lighthouse CI for performance monitoring

### Security Practices
- Dependency scanning with Dependabot
- Security headers with CSP
- Regular dependency updates
- Input sanitization and validation

## Contributing

We welcome contributions from the team! Please follow these guidelines:

1. Fork the repository and create a feature branch
2. Follow the coding standards and conventions
3. Write or update tests for your changes
4. Ensure all tests pass locally
5. Submit a pull request with a clear description
6. Request review from at least one team member

## Performance Optimization

- Optimized image loading with Next.js Image component
- Code splitting and lazy loading
- Server components to reduce client-side JavaScript
- Edge caching strategies
- Web Workers for intensive calculations
- Preloading critical resources

# Project Agents.md Guide for CloudFloo.io

This Agents.md file provides comprehensive guidance for AI agents working with the CloudFloo.io codebase.

## Project Structure

```bash
.
├── Dockerfile
├── app
│   ├── company
│   │   ├── blog
│   │   ├── careers
│   │   ├── press
│   │   └── team
│   ├── globals.css
│   ├── layout.tsx
│   ├── legal
│   │   ├── cookies
│   │   ├── gdpr
│   │   ├── privacy
│   │   └── terms
│   ├── page.tsx
│   ├── services
│   │   ├── ai-ml
│   │   ├── app-development
│   │   ├── cloud-solutions
│   │   ├── data-engineering
│   │   ├── devops
│   │   ├── edge-computing
│   │   └── page.tsx
│   └── team
│       ├── [slug]
│       └── page.tsx
├── components
│   ├── Analytics.tsx
│   ├── CloudSceneImpl.tsx
│   ├── LanguageSwitcher.tsx
│   ├── LongBio.tsx
│   ├── SEO.tsx
│   ├── TeamCard.tsx
│   ├── about.tsx
│   ├── animations
│   ├── cloud-worker.ts
│   ├── contact.tsx
│   ├── enhanced-about.tsx
│   ├── enhanced-contact.tsx
│   ├── enhanced-header-fixed.tsx
│   ├── enhanced-projects.tsx
│   ├── enhanced-services.tsx
│   ├── faq-section.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero.tsx
│   ├── immersive-cloud-visualization.tsx
│   ├── layout
│   ├── projects.tsx
│   ├── services.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── image-carousel.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── modal.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
├── components.json
├── contexts
│   └── LanguageContext.tsx
├── data
│   ├── placeholders.ts
│   └── team.ts
├── deployment
│   └── helm
│       ├── Chart.yaml
│       ├── templates
│       └── values.yaml
├── hooks
│   ├── use-scroll-animation.ts
│   └── use-toast.ts
├── jest.config.js
├── lib
│   └── utils.ts
├── lighthouserc.js
├── next-env.d.ts
├── next-sitemap.config.js
├── next.config.js
├── nginx.conf
├── package-lock.json
├── package.json
├── pages
│   └── _document.tsx
├── playwright.config.ts
├── postcss.config.js
├── public
│   ├── InterVariable-Italic.woff2
│   ├── InterVariable.woff2
│   ├── favicon.ico
│   ├── hsk.png
│   ├── images
│   │   └── team
│   ├── logo.avif
│   ├── logo.png
│   ├── logo.webp
│   ├── styles.css
│   └── translations
│       ├── en.json
│       └── pl.json
├── tailwind.config.ts
├── tests
│   ├── a11y.spec.ts
│   ├── cloud-worker.test.ts
│   ├── headers.spec.ts
│   └── immersive.spec.ts
├── tsconfig.json
└── utils
```

38 directories, 112 files
mike@WGFFNKR3:~/proj/cloudfloo.io$ 

## Coding Conventions

### General Conventions

- Use TypeScript for all new code
- Follow the existing code style in each file
- Use meaningful variable and function names
- Add comments for complex logic
- Follow Next.js 13+ App Router conventions

### React Components Guidelines

- Use functional components with hooks
- Keep components small and focused
- Ensure proper prop typing
- Follow the file naming convention: PascalCase.tsx
- Use the UI components from `/components/ui` when possible

### Cloud-Related Components

- Understand the cloud visualization components in `CloudSceneImpl.tsx` and `immersive-cloud-visualization.tsx`
- The `cloud-worker.ts` handles background processing for cloud visualizations

### CSS/Styling Standards

- Use Tailwind CSS for styling
- Follow utility-first approach
- Use the utility functions in `lib/utils.ts` for class name merging
- Use custom CSS only when necessary

### Internationalization

- The project supports multiple languages through the `LanguageContext`
- Translations are stored in `/public/translations/`
- Use the `LanguageSwitcher` component to allow users to change languages

## Testing Requirements

Run tests with the following commands:

```bash
# Run all tests
npm test

# Run Playwright end-to-end tests
npm run test:e2e

# Run accessibility tests
npm run test:a11y

# Run specific test file
npm test -- path/to/test-file.test.ts
```

The project uses both Jest and Playwright for testing:
- Jest for unit and component tests
- Playwright for end-to-end testing
- Specific tests for accessibility compliance

## Pull Request Guidelines

When creating a PR, please ensure it:

1. Includes a clear description of the changes
2. References any related issues
3. Ensures all tests pass
4. Includes screenshots for UI changes
5. Keeps PRs focused on a single concern
6. Follows the existing architectural patterns

## Programmatic Checks

Before submitting changes, run:

```bash
# Lint check
npm run lint

# Type check
npm run type-check

# Build check
npm run build

# Lighthouse checks
npm run lighthouse
```

All checks must pass before code can be merged.

## Performance Considerations

- The project includes immersive visualizations that can be performance-intensive
- Lazy load components when appropriate
- Optimize image assets using Next.js Image component
- Consider the implications of cloud visualizations on mobile devices

## Advanced Codebase Best Practices

### Component Architecture

- **Atomic Design Principles**: Follow the atomic design methodology
  - Atoms: Basic UI components (buttons, inputs)
  - Molecules: Groups of atoms (form fields with labels)
  - Organisms: Complex UI sections (navigation bars)
  - Templates: Page layouts
  - Pages: Complete views with data

- **Component Composition**: Prefer composition over inheritance
  - Use render props and higher-order components judiciously
  - Utilize React Context for state that needs to be accessed by many components
  - Implement compound components for related UI elements

### State Management

- **Local vs. Global State**: 
  - Use local state for UI-specific concerns
  - Use React Context for theme, language, and other app-wide state
  - Consider Zustand for more complex state requirements

- **Server State Management**:
  - Use React Query for fetching, caching, and updating server data
  - Implement optimistic updates for better UX
  - Handle loading and error states consistently

### Code Organization

- **Feature-Based Structure**:
  - Group related components, hooks, and utilities by feature
  - Create index files to export public API of each feature
  - Maintain clear boundaries between features

- **Path Aliases**:
  - Use the configured path aliases in tsconfig.json for cleaner imports
  - Example: `import { Button } from '@/components/ui'` instead of relative paths

### Error Handling

- **Graceful Degradation**:
  - Implement error boundaries at strategic locations
  - Provide fallback UI for component failures
  - Log errors to monitoring services

- **Structured Error Responses**:
  - Use consistent error formats across the application
  - Include helpful error messages for developers and users

### Security Best Practices

- **Content Security Policy (CSP)**:
  - Understand and maintain the CSP headers in `next.config.js`
  - Only add trusted domains to CSP directives

- **Authentication & Authorization**:
  - Use HttpOnly cookies for authentication tokens
  - Implement proper role-based access control
  - Never trust client-side data for authorization decisions

- **Data Validation**:
  - Validate all inputs on both client and server
  - Use Zod or Yup for schema validation
  - Sanitize data to prevent XSS attacks

### Accessibility Standards

- **Component Accessibility**:
  - Ensure all UI components meet WCAG 2.1 AA standards
  - Implement proper ARIA attributes where needed
  - Maintain correct heading hierarchy
  - Support keyboard navigation

- **Testing Accessibility**:
  - Use axe-core in tests to catch accessibility issues
  - Perform manual testing with screen readers
  - Verify color contrast meets requirements

### Performance Optimization Techniques

- **Rendering Strategies**:
  - Use React Server Components for data-fetching components
  - Implement streaming for improved TTFB
  - Apply the `"use client"` directive only when necessary

- **Code Splitting**:
  - Use dynamic imports for large component trees
  - Split code by routes and features
  - Implement import on visibility for below-the-fold content

- **Resource Optimization**:
  - Use the `<Image>` component with appropriate sizing
  - Implement resource hints (preload, prefetch) for critical assets
  - Optimize web fonts with font-display swap

### Debugging Tips

- **Browser DevTools**:
  - Use React DevTools for component inspection
  - Leverage Performance tab for identifying bottlenecks
  - Set up source maps correctly for production debugging

- **Server-Side Debugging**:
  - Use the `DEBUG=*` environment variable for detailed Next.js logs
  - Implement structured logging for server components
  - Set up proper error monitoring with Sentry or similar services

### Documentation Standards

- **Component Documentation**:
  - Document props with TypeScript and JSDoc comments
  - Create usage examples for complex components
  - Explain any non-obvious behavior or side effects

- **Architecture Documentation**:
  - Maintain up-to-date diagrams of the application architecture
  - Document integration points with external services
  - Keep decision records for major architectural choices

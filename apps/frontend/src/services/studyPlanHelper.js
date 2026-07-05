// Technical Course Database & Exact Study Plan Generator

export const SKILL_COURSES_DB = {
  // Frontend & UI
  'html': {
    resource: "freeCodeCamp: 'Responsive Web Design Certification' & MDN Web Docs",
    tasks: [
      "Study HTML5 semantic tags (header, nav, main, section, article) to improve page structure and SEO accessibility.",
      "Master CSS Flexbox and Grid layouts to create complex, fluid layouts for all viewport sizes.",
      "Implement CSS variables (custom properties) and media queries to enable dynamic styling like dark mode.",
      "Build a responsive mock landing page from a mobile-first approach and check screen alignment."
    ]
  },
  'css': {
    resource: "freeCodeCamp: 'Responsive Web Design Certification' & CSS-Tricks Guides",
    tasks: [
      "Master layout styling techniques utilizing CSS Grid layouts and flex properties.",
      "Learn modern features: custom properties (variables), calc() operations, keyframe animations, and custom transitions.",
      "Incorporate responsive media query breakpoints, verifying correct display from mobile up to desktop widths.",
      "Audit page styling issues using Chrome DevTools to locate visual defects and optimize rendering performance."
    ]
  },
  'javascript': {
    resource: "Udemy: 'JavaScript: The Advanced Concepts' by Andrei Neagoie",
    tasks: [
      "Master asynchronous JavaScript: study the Event Loop, Promises, Async/Await syntax, and catch handling.",
      "Understand core concepts: prototypical inheritance, closures, lexical scope, and Execution Context.",
      "Use modern ECMAScript features (ES2022-ES2025): optional chaining, nullish coalescing, array methods, and modules.",
      "Build a vanilla JS application utilizing module encapsulation and async API data fetching."
    ]
  },
  'react': {
    resource: "Udemy: 'React 19 - The Complete Guide' by Academind (Maximilian Schwarzmüller)",
    tasks: [
      "Master basic hooks: useState, useEffect, useMemo, and useCallback; learn React 19's new 'use' hook for resource loading.",
      "Understand Server Components (RSC) vs Client Components and define clean data loading boundaries.",
      "Implement React 19 Actions API for form submission, using useActionState and useTransition to handle pending states.",
      "Build a multi-page app with Next.js 15 App Router using dynamic routing and layout nesting."
    ]
  },
  'typescript': {
    resource: "basarat.gitbook.io: 'TypeScript Deep Dive' & Udemy: 'Understanding TypeScript'",
    tasks: [
      "Configure TypeScript compiler (tsconfig.json) for strict compilation settings and modern ES targets.",
      "Learn basic typing: interfaces, type aliases, union & intersection types, enums, and tuple declarations.",
      "Implement advanced type utilities: generics, type guards, conditional types, and utility types (Omit, Pick, Record).",
      "Refactor a JavaScript component file to TypeScript, ensuring all types compile cleanly without using 'any'."
    ]
  },
  'tailwind': {
    resource: "Tailwind CSS Official Documentation & freeCodeCamp Tailwind CSS Tutorial",
    tasks: [
      "Configure tailwind.config.js to define custom theme colors, utility spacing, font sizes, and screens breakpoints.",
      "Build fully responsive layouts using Tailwind utility classes (flex, grid, hover states, active states).",
      "Integrate Tailwind CSS style configurations with accessible UI kits like Radix UI or Shadcn UI primitives.",
      "Optimize production build asset sizes using standard CSS pruning configurations."
    ]
  },
  'git': {
    resource: "GitHub Skills (skills.github.com) & YouTube: 'Git and GitHub for Beginners' by freeCodeCamp",
    tasks: [
      "Learn git branching strategies (Trunk-Based Development, GitFlow) and practice resolving complex merge conflicts.",
      "Master CLI operations: git rebase (interactive), git cherry-pick, git stash, and checking history via git reflog.",
      "Configure pull request templates, repository code review rules, and branch protection blocks.",
      "Set up automated pre-commit check scripts (e.g. running linters and formatters) utilizing Husky hooks."
    ]
  },
  'ui/ux': {
    resource: "Coursera: 'UI/UX Design Specialization' by CalArts",
    tasks: [
      "Learn wireframing, high-fidelity mockups, and interactive prototype creations in Figma.",
      "Configure design systems in Figma using variables/tokens for uniform colors, sizes, and fonts.",
      "Implement responsive mobile-first views supporting touch gestures, button sizing, and standard gutters.",
      "Audit interface layouts against WCAG guidelines for color contrast, sizing, and logical tab sequences."
    ]
  },
  'next.js': {
    resource: "Next.js Learning Portal (nextjs.org/learn) & Vercel Documentation",
    tasks: [
      "Build dynamic pages using App Router, nested layout structures, and loading/error boundary UI wrappers.",
      "Implement data fetching strategies: Server-Side Rendering (SSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR).",
      "Build Server Actions to handle mutations with optimistic UI updates and proper validation.",
      "Audit and optimize Next.js rendering speeds using next/image, next/font, and bundle analysis tools."
    ]
  },
  'ai sdk': {
    resource: "DeepLearning.AI: 'LangChain for JavaScript/Python Developers' & Vercel AI SDK Guides",
    tasks: [
      "Integrate OpenAI or Google Gemini LLMs into web backends using Vercel AI SDK / LangChain.",
      "Build streaming user interfaces displaying real-time text generations, citations, and status markers.",
      "Configure model parameters (temperature, top_p, max_tokens) and manage chat history memory states.",
      "Implement schema validations using Pydantic or Zod to output structured JSON data from AI models."
    ]
  },
  'websocket': {
    resource: "Udemy: 'WebSockets - Complete Guide' by Hussein Nasser",
    tasks: [
      "Create a WebSocket server connection handler in Node.js (Socket.io) or Spring Boot (Stomp/WebSockets).",
      "Write frontend listeners supporting automatic reconnection, exponential backoff retries, and network status warnings.",
      "Build a real-time streaming view (e.g. chat or stock tickers) utilizing web sockets.",
      "Scale WebSockets horizontally using Redis Pub/Sub adapter to sync connections across server instances."
    ]
  },
  'state management': {
    resource: "YouTube: 'Zustand & Jotai State Management Guide' by Jack Herrington",
    tasks: [
      "Compare centralized state stores (Zustand) with atomic state (Jotai) and traditional Context API patterns.",
      "Build a Zustand store slice, utilizing persistent middleware to sync state with localStorage.",
      "Optimize rendering performance by writing target selectors to retrieve only modified store states.",
      "Integrate Zustand store hooks within complex, nested React components to streamline data flow."
    ]
  },
  'performance': {
    resource: "Frontend Masters: 'Web Performance & Core Web Vitals'",
    tasks: [
      "Profile Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).",
      "Configure code splitting (dynamic imports), image lazy-loading, and optimizing critical CSS styles.",
      "Analyze client bundle sizes using Vite Visualizer or Webpack Bundle Analyzer to eliminate heavy libraries.",
      "Set up cache control headers (Cache-Control), content delivery networks (CDNs), and asset compression (Brotli)."
    ]
  },
  'playwright': {
    resource: "Test Automation University: 'Playwright Course' & Official Playwright Docs",
    tasks: [
      "Write automated end-to-end browser workflows (e.g. login, form submit, data verification) in Playwright.",
      "Configure Playwright config files for multi-browser execution, retries, and artifact exports (screenshots, video, traces).",
      "Mock network requests and HTTP endpoints to run frontend testing in isolation.",
      "Integrate Playwright test runs into automated CI/CD pipeline steps (e.g., GitHub Actions)."
    ]
  },
  'micro-frontend': {
    resource: "Udemy: 'Microfrontends with React: A Complete Guide' by Stephen Grider",
    tasks: [
      "Configure Vite/Webpack Module Federation to expose sub-modules and load remote micro-frontends.",
      "Implement cross-micro-frontend communications using Custom Events or shared global state stores.",
      "Configure fallback loader layouts and Error Boundaries to handle remote server downtimes safely.",
      "Implement isolated CI/CD pipelines to build and deploy micro-frontends independently."
    ]
  },
  'accessibility': {
    resource: "W3Cx: 'Introduction to Web Accessibility' on edX",
    tasks: [
      "Audit pages against WCAG 2.2 accessibility standards using axe-core and Lighthouse tools.",
      "Implement correct semantic HTML5 tags and descriptive ARIA roles/attributes for custom components.",
      "Ensure logical keyboard navigation sequences, proper focus trapping inside modals, and visible focus rings.",
      "Verify screen reader support (NVDA, VoiceOver) over complex stateful menus."
    ]
  },
  'webassembly': {
    resource: "Frontend Masters: 'WebAssembly (Wasm) Fundamentals'",
    tasks: [
      "Write performance-critical logic in Rust and compile to a WebAssembly module using wasm-pack.",
      "Import the compiled Wasm binary into a React/TypeScript web app and invoke exported functions.",
      "Optimize data passing (arrays, strings) between JS runtime and Wasm memory buffers.",
      "Benchmark calculation speeds between JS implementations and the WebAssembly module."
    ]
  },
  'security': {
    resource: "Coursera: 'Web Security Fundamentals' & OWASP Secure Coding Cheat Sheets",
    tasks: [
      "Set up Content Security Policy (CSP) headers to restrict unauthorized script execution and prevent XSS.",
      "Implement secure browser cookie attributes (HttpOnly, Secure, SameSite) for storing sensitive user tokens.",
      "Configure Cross-Origin Resource Sharing (CORS) configurations correctly on the backend API gateways.",
      "Run automated vulnerability scanning on dependencies using `npm audit` or Snyk."
    ]
  },
  'state machine': {
    resource: "XState Official Documentation (stately.ai/docs) & Tutorials",
    tasks: [
      "Design complex user flows (e.g., multi-step forms) as finite state machines using XState.",
      "Model states, transitions, actions, and side effects within a declarative machine schema.",
      "Connect the state machine to React components to manage UI rendering states consistently.",
      "Visualize and debug state transitions using the Stately visual editor tool."
    ]
  },
  'edge rendering': {
    resource: "Next.js Documentation: 'Rendering & Edge Middleware'",
    tasks: [
      "Deploy lightweight middleware functions to run on cloud Edge runtime nodes.",
      "Implement dynamic geo-location routing, user redirects, and header rewrites on the Edge.",
      "Configure Edge Side Includes (ESI) or partial pre-rendering strategies to speed up page delivery.",
      "Benchmark TTFB (Time to First Byte) between standard SSR servers and Edge functions."
    ]
  },
  'java': {
    resource: "Udemy: 'Java 21/25 Developer Course' & Baeldung Advanced Java Guides",
    tasks: [
      "Study modern Java features: pattern matching, record classes, sealed classes, and virtual threads.",
      "Use Virtual Thread executors (Project Loom) to run high-concurrency background operations.",
      "Write clean asynchronous operations using Java's CompletableFuture API.",
      "Monitor application heap allocations, garbage collection logs, and thread locks."
    ]
  },
  'spring boot': {
    resource: "Udemy: 'Spring Boot 3 & Spring Cloud Microservices' by John Thompson",
    tasks: [
      "Create microservices using Spring Initializr, utilizing Spring Boot 3.4+ HTTP interfaces.",
      "Build REST controllers using @RestController, handle exceptions with @ControllerAdvice, and document APIs with Swagger.",
      "Integrate Spring Data JPA with PostgreSQL, configuring connection pools and JPQL queries.",
      "Configure Spring Security filter chains for JWT authentication and authorization."
    ]
  },
  'spring cloud': {
    resource: "Udemy: 'Spring Boot 3 & Spring Cloud Microservices' by John Thompson",
    tasks: [
      "Configure Spring Cloud Eureka Server for service registry and discovery.",
      "Set up Spring Cloud Gateway, configuring custom routing rules, filters, and rate limiting.",
      "Integrate Resilience4j for circuit breaking, fallback states, and bulkheads.",
      "Implement distributed configuration management using Spring Cloud Config Server."
    ]
  },
  'kafka': {
    resource: "Confluent Developer Library (developer.confluent.io) & Udemy: 'Apache Kafka' by Stephane Maarek",
    tasks: [
      "Spin up local Kafka brokers and KRaft controller nodes using Docker-Compose configurations.",
      "Write producers and consumers in Java/Python, managing partition offsets and consumer groups.",
      "Configure Schema Registry using Apache Avro schemas to govern message formats.",
      "Implement microservice transaction patterns (Saga or Transactional Outbox) using Kafka events."
    ]
  },
  'postgresql': {
    resource: "Coursera: 'PostgreSQL for Everybody' by Dr. Chuck & PostgreSQL Manuals",
    tasks: [
      "Design normalized relational database schemas with primary/foreign keys and constraints.",
      "Write complex SQL queries utilizing window functions, CTEs, and recursive patterns.",
      "Analyze query execution bottlenecks using EXPLAIN ANALYZE commands.",
      "Create index strategies (B-Tree, GIN) to optimize read speeds for slow queries."
    ]
  },
  'redis': {
    resource: "Redis University (university.redis.io) & Baeldung Redis Guides",
    tasks: [
      "Master Redis command structures via CLI (Strings, Hashes, Lists, Sets, Sorted Sets).",
      "Implement distributed caching in Spring Boot/Node, configuring TTL policies.",
      "Write rate limiters or distributed locking scripts using Redis (Redlock/Redisson).",
      "Configure Redis cluster failovers and analyze cache hit/miss statistics."
    ]
  },
  'microservices': {
    resource: "Coursera: 'Microservices Architecture' & Baeldung Microservices Guides",
    tasks: [
      "Apply Domain-Driven Design (DDD) to identify bounded contexts and split database domains.",
      "Implement Saga Pattern (Choreography/Orchestration) to achieve eventual consistency across services.",
      "Design resilient API Gateways, CQRS models, and Event Sourcing models.",
      "Configure distributed tracing across microservices using OpenTelemetry headers."
    ]
  },
  'kubernetes': {
    resource: "KodeKloud: 'Certified Kubernetes Administrator (CKA)' & K8s Docs",
    tasks: [
      "Write declarative Kubernetes YAML files for Deployments, Services, ConfigMaps, and Secrets.",
      "Deploy apps to a local cluster (Minikube/Kind) and check resource limits.",
      "Configure Helm charts to package and parameterize multi-environment releases (Dev, Staging, Prod).",
      "Set up Kubernetes Ingress controllers and test Horizontal Pod Autoscaler configurations."
    ]
  },
  'golang': {
    resource: "Udemy: 'Go: The Complete Developer's Guide' by Stephen Grider & Go Tour",
    tasks: [
      "Master Go syntax: variables, pointers, structs, interfaces, and custom package patterns.",
      "Implement high-concurrency tasks using Goroutines, sync.WaitGroup, channels, and select.",
      "Audit race conditions in concurrent scripts using `go test -race`.",
      "Build high-throughput HTTP servers using Gin or Fiber frameworks, implementing graceful shutdowns."
    ]
  },
  'grpc': {
    resource: "Udemy: 'gRPC [Node/Go/Java] Complete Guide' by Stephane Maarek",
    tasks: [
      "Write protocol buffer (.proto) schemas defining message payloads and service RPC methods.",
      "Compile proto definitions into target project code using protoc compilers.",
      "Implement gRPC server handlers: Unary, Client-Streaming, Server-Streaming, and Bidirectional-Streaming.",
      "Configure client connection pooling, TLS encryptions, and interceptor hooks."
    ]
  },
  'consensus': {
    resource: "MIT 6.824: 'Distributed Systems' (Lectures) & Raft.github.io Guides",
    tasks: [
      "Understand distributed consensus theory (Raft/Paxos) and leader election phases.",
      "Build a simplified Raft consensus controller in Go/Rust, managing heartbeats.",
      "Simulate network partitions and verify cluster recovery and data consistency features.",
      "Review etcd, Consul, and ZooKeeper architecture patterns in production stacks."
    ]
  },
  'system design': {
    resource: "System Design Interview book by Alex Xu & High Scalability Blog",
    tasks: [
      "Design large-scale systems supporting millions of concurrent users.",
      "Integrate rate limiters, load balancers, database replication, and CDN networks.",
      "Create detailed system architecture blueprints, evaluating CAP theorem tradeoff choices.",
      "Run load testing scripts using k6 or Apache JMeter to analyze bottleneck thresholds."
    ]
  },
  'python': {
    resource: "Coursera: 'Python for Everybody' by Dr. Chuck & Real Python Tutorials",
    tasks: [
      "Master Python 3.12+ fundamentals: async/await structure, list comprehensions, and generators.",
      "Build async REST endpoints using FastAPI, utilizing Pydantic V2 schemas.",
      "Configure SQLAlchemy (async mode) or Tortoise ORM to execute SQL queries on database pools.",
      "Implement celery task worker queues to process heavy tasks asynchronously in background."
    ]
  },
  'fastapi': {
    resource: "FastAPI Official Documentation & freeCodeCamp FastAPI Tutorials",
    tasks: [
      "Build REST endpoints with FastAPI, defining input validation schemas with Pydantic V2.",
      "Configure dependency injection frameworks to manage database sessions and OAuth2 states.",
      "Generate automated interactive Swagger documentation and test endpoints.",
      "Write integration tests using TestClient and pytest-asyncio frameworks."
    ]
  },
  'vector db': {
    resource: "Pinecone University & Qdrant Developer Documentation",
    tasks: [
      "Understand vector space mappings, similarity measures (Cosine, Euclidean), and indexing topologies (HNSW).",
      "Spin up a local vector database instance (Qdrant) or use a cloud database (Pinecone).",
      "Generate embeddings using OpenAI or Gemini Embeddings API and upsert vectors to database index.",
      "Query vector indexes with metadata filtering rules to output hybrid search matches."
    ]
  },
  'serverless': {
    resource: "Udemy: 'AWS Serverless APIs & Apps - A Complete Guide'",
    tasks: [
      "Deploy serverless backend logic using AWS Lambda functions or GCP Cloud Functions.",
      "Expose serverless backend endpoints through API Gateway wrappers with authorization layers.",
      "Configure event-driven executions triggered by database changes or cloud storage uploads.",
      "Monitor cold-start latency levels, configuring provisioned concurrency settings."
    ]
  },
  'rust': {
    resource: "The Rust Programming Language Book (doc.rust-lang.org/book)",
    tasks: [
      "Master Rust core: ownership rules, borrowing checker, lifetime metrics, and smart pointer classes.",
      "Build async applications using Tokio runtime frameworks, writing non-blocking tasks.",
      "Write multi-threaded code safely, utilizing Send and Sync traits and channels.",
      "Optimize data serialization logic using Serde package configurations."
    ]
  },
  'axum': {
    resource: "Axum Web Framework Documentation & Tutorials",
    tasks: [
      "Build HTTP APIs in Rust with Axum, implementing routes, extracts, and state handlers.",
      "Configure middleware chains for logging, CORS controls, and authorization checks.",
      "Connect database handlers using SQLx compiler-checked async queries.",
      "Benchmark API request throughput, comparing memory footprint against other runtimes."
    ]
  },
  'cloud native': {
    resource: "Adrian Cantrill's AWS Solutions Architect Courses & Cloud Docs",
    tasks: [
      "Design fault-tolerant cloud network infrastructures (VPCs, ALB setups, auto-scaling groups).",
      "Deploy containerized microservices into AWS ECS/EKS clusters.",
      "Configure cloud database instances with multi-AZ failovers and read replicas.",
      "Manage Cloud Security rules (Security Groups, IAM Roles, IAM Policies)."
    ]
  },
  'terraform': {
    resource: "HashiCorp Learn Portal & freeCodeCamp Terraform Associate Course",
    tasks: [
      "Write declarative infrastructure code configurations (.tf) utilizing providers (AWS, GCP).",
      "Manage remote state configuration backends safely (e.g. S3 with DynamoDB lockings).",
      "Design reusable Terraform modules for standard networks and database clusters.",
      "Integrate Terraform linting and security scans (tfsec) into build pipelines."
    ]
  },
  'argocd': {
    resource: "Codefresh GitOps Certification & ArgoCD User Documentation",
    tasks: [
      "Set up ArgoCD controller within your Kubernetes development clusters.",
      "Connect ArgoCD application loops to git repositories containing environment manifest files.",
      "Configure automated synchronization, self-healing thresholds, and configuration drift detections.",
      "Implement blue-green or canary release deployments using Argo Rollouts."
    ]
  },
  'opentelemetry': {
    resource: "OpenTelemetry.io Documentation & Grafana Observability Tutorials",
    tasks: [
      "Instrument applications with OpenTelemetry SDK to collect metrics, logs, and traces.",
      "Configure OpenTelemetry Collectors to aggregate and route signals to Jaeger/Prometheus.",
      "Ensure context propagation across network calls to construct end-to-end trace maps.",
      "Review span latencies on dashboard maps to locate backend blockings."
    ]
  },
  'monitoring': {
    resource: "Udemy: 'Prometheus & Grafana Complete Guide'",
    tasks: [
      "Configure Prometheus scrapers to collect application performance metric streams.",
      "Build Grafana dashboard graphs tracking CPU loads, memory traces, and error counts.",
      "Write Prometheus alerting rules to trigger notifications (e.g., Slack, PagerDuty) on error peaks.",
      "Implement system health check paths (/health, Actuator) inside api services."
    ]
  },
  'zero-trust': {
    resource: "Zero Trust Architecture Essentials (NIST SP 800-207) & Cloud Security Guides",
    tasks: [
      "Understand Zero-Trust principles: verify explicitly, use least privilege, assume breach.",
      "Enforce micro-segmentation, requiring credentials and TLS certificates for every node hop.",
      "Configure single sign-on (SSO) and multi-factor auth (MFA) across portal entries.",
      "Implement continuous security audits and logging over all network operations."
    ]
  },
  'playwright': {
    resource: "Test Automation University: 'Playwright Course' & Playwright Docs",
    tasks: [
      "Write browser test suites in TypeScript using Playwright page-object models.",
      "Configure parallel execution loops and compile test traces on test script failures.",
      "Mock API endpoints to execute frontend unit testing in isolated viewports.",
      "Integrate Playwright test runs into continuous deployment workflow pipelines."
    ]
  },
  'flutter': {
    resource: "Udemy: 'Flutter & Dart - The Complete Guide' by Academind",
    tasks: [
      "Build cross-platform mobile apps with Flutter, utilizing Dart async features.",
      "Implement state management systems (BLoC, Provider) to handle UI syncs.",
      "Integrate local SQLite or Hive databases to support offline data caching.",
      "Configure mobile build setups for Android (Gradle) and iOS (CocoaPods)."
    ]
  },
  'react native': {
    resource: "React Native Official Documentation & Tutorials",
    tasks: [
      "Create mobile views in React Native, styling views with CSS-in-JS style configurations.",
      "Configure navigation routers using React Navigation hooks.",
      "Write native modules in Swift/Kotlin to interface with mobile camera and GPS sensors.",
      "Optimize list rendering speeds, avoiding redraw bottlenecks."
    ]
  },
  'testing': {
    resource: "Test Automation University & Udemy: 'Unit Testing Complete Guide'",
    tasks: [
      "Write structured unit and integration tests using frameworks like JUnit, PyTest, or Jest.",
      "Configure test mocks (Mockito/Jest mocks) to isolate code logic dependencies.",
      "Verify code test coverages, aiming for 80%+ line coverages across files.",
      "Analyze pipeline test run results, fixing flaky tests and assertions."
    ]
  }
};

const lookupSkill = (skillName) => {
  const clean = skillName.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
  
  // Try direct keyword matching
  for (const [key, data] of Object.entries(SKILL_COURSES_DB)) {
    if (clean === key || clean.includes(key) || key.includes(clean)) {
      return data;
    }
  }
  
  // Try word by word matching
  const words = clean.split(/\s+/).filter(w => w.length > 2);
  for (const word of words) {
    for (const [key, data] of Object.entries(SKILL_COURSES_DB)) {
      if (key.includes(word) || word.includes(key)) {
        return data;
      }
    }
  }
  
  // Fallback default
  return {
    resource: `Official Documentation and Advanced Guides for ${skillName}`,
    tasks: [
      `Read the official documentation, specifications, and architecture whitepapers for ${skillName}.`,
      `Create a local sandbox application implementing the core functionalities and API endpoints of ${skillName}.`,
      `Write unit tests to assert the correctness of configurations and business logic using ${skillName}.`,
      `Perform tradeoff analysis (e.g., latency, cost, scalability) of ${skillName} within your tech stack.`
    ]
  };
};

export const generateStudyPlan = (missing, role) => {
  if (!missing || missing.length === 0) {
    return [
      {
        phase: "Phase 1: Mastery & Leadership",
        duration: "Weeks 1-2",
        title: `Advanced Architecture for ${role}`,
        tasks: [
          { id: "t1", text: "Design a high-concurrency distributed system simulation", completed: false },
          { id: "t2", text: "Conduct open-source code reviews and document architectural tradeoffs", completed: false },
          { id: "t3", text: "Optimize database query execution plans and caching layers", completed: false }
        ],
        resource: "High Scalability Blog & Martin Fowler's Architecture Guides"
      }
    ];
  }

  // Build a plan covering all missing skills (or up to 4 major phases if there are many missing skills)
  const phases = [];
  const maxPhases = Math.min(Math.ceil(missing.length / 2) + 1, 4); // Max 4 phases, dynamic sizing
  
  for (let i = 0; i < maxPhases - 1; i++) {
    // Collect 1 or 2 skills for this phase
    const skillIndex1 = i * 2;
    const skillIndex2 = i * 2 + 1;
    
    if (skillIndex1 >= missing.length) break;
    
    const skill1 = missing[skillIndex1];
    const skill2 = missing[skillIndex2] || null;
    
    const lookup1 = lookupSkill(skill1);
    const lookup2 = skill2 ? lookupSkill(skill2) : null;
    
    const phaseName = `Phase ${i + 1}: ${skill2 ? `Mastering ${skill1} & ${skill2}` : `Mastering ${skill1}`}`;
    const duration = `Weeks ${i * 2 + 1}-${i * 2 + 2}`;
    
    const tasks = [];
    // Take first 2 tasks from lookup1 and first 2 from lookup2
    lookup1.tasks.slice(0, 2).forEach((taskText, idx) => {
      tasks.push({ id: `p${i + 1}_s1_${idx}`, text: taskText, completed: false });
    });
    
    if (lookup2) {
      lookup2.tasks.slice(0, 2).forEach((taskText, idx) => {
        tasks.push({ id: `p${i + 1}_s2_${idx}`, text: taskText, completed: false });
      });
    } else {
      // If only one skill, grab 2 more tasks from lookup1
      lookup1.tasks.slice(2, 4).forEach((taskText, idx) => {
        tasks.push({ id: `p${i + 1}_s1_extra_${idx}`, text: taskText, completed: false });
      });
    }
    
    const resourcesList = [lookup1.resource];
    if (lookup2 && lookup2.resource !== lookup1.resource) {
      resourcesList.push(lookup2.resource);
    }
    
    phases.push({
      phase: `Phase ${i + 1}: Technical Core`,
      duration,
      title: phaseName,
      tasks,
      resource: resourcesList.join(" | ")
    });
  }
  
  // Add Capstone & Interview Readiness phase at the end
  const capstoneIndex = phases.length;
  const startWeek = capstoneIndex * 2 + 1;
  const duration = `Weeks ${startWeek}-${startWeek + 1}`;
  
  // Custom capstone based on first 2 missing skills
  const skill1 = missing[0] || "Core Fundamentals";
  const skill2 = missing[1] || missing[0] || "Advanced Systems";
  
  phases.push({
    phase: `Phase ${capstoneIndex + 1}: Capstone & Readiness`,
    duration,
    title: `Portfolio Capstone & Interview Mastery for ${role}`,
    tasks: [
      { id: `p_cap_1`, text: `Develop and containerize an integrated project utilizing ${skill1} and ${skill2} patterns.`, completed: false },
      { id: `p_cap_2`, text: `Deploy your project in a local cluster or cloud container environment with CI/CD checks.`, completed: false },
      { id: `p_cap_3`, text: `Add quantifiable achievements to your resume (e.g. 'Engineered high-throughput service using ${skill1} reducing latency by 35%').`, completed: false },
      { id: `p_cap_4`, text: `Practice system design mock interviews focusing on high-level ${role} architectures and tradeoffs.`, completed: false }
    ],
    resource: "Tech Interview Handbook (techinterviewhandbook.org) & System Design Primer Guides"
  });
  
  return phases;
};

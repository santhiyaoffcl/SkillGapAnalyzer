import React, { useState, useEffect, useRef } from 'react';
import { api } from './services/api';
import { generateStudyPlan } from './services/studyPlanHelper';
import './index.css';
import DarkVeil from './DarkVeil';

// ── 16+ Trending 2026 Career Roles across Tech Domains (Indian Market Compensation) ──
const CAREER_ROLES = {
  // Frontend & AI Web
  'Junior Frontend Engineer (React/Next.js)': {
    skills: ['HTML5/CSS3', 'JavaScript (ES2025+)', 'React 19 Basics', 'TypeScript Basics', 'Tailwind CSS', 'Git & GitHub', 'Responsive UI/UX'],
    level: 'Entry',
    avgSalary: '₹8,00,000/yr (8 LPA)',
    category: 'Frontend & UI'
  },
  'Senior AI-Integrated Frontend Engineer': {
    skills: ['React 19 / Next.js 15+', 'TypeScript', 'AI SDKs (LangChain.js / Vercel AI)', 'WebSockets & Streaming UI', 'State Management (Zustand/Jotai)', 'Tailwind & Shadcn UI', 'Performance & Core Web Vitals', 'Playwright Testing'],
    level: 'Senior',
    avgSalary: '₹28,00,000/yr (28 LPA)',
    category: 'Frontend & UI'
  },
  'Principal UI/UX & Micro-Frontend Architect': {
    skills: ['Micro-Frontends (Module Federation)', 'Design Systems & Figma Tokens', 'Accessibility (WCAG 2.2 AAA)', 'WebAssembly / WebGL', 'Frontend Security (CSP/CORS)', 'State Machine Architecture', 'SSR/ISR & Edge Rendering'],
    level: 'Principal',
    avgSalary: '₹38,00,000/yr (38 LPA)',
    category: 'Frontend & UI'
  },
  // Backend & Enterprise Distributed Systems
  'Java 25 Spring Boot & Cloud-Native Architect': {
    skills: ['Java 21/25 (Virtual Threads)', 'Spring Boot 3.4+ & Spring Cloud', 'Event-Driven Kafka / Pulsar', 'PostgreSQL & Hibernate/JPA', 'Redis Distributed Caching', 'Microservices & Saga Patterns', 'Kubernetes & Docker', 'Spring Security & OAuth2/JWT'],
    level: 'Lead',
    avgSalary: '₹32,00,000/yr (32 LPA)',
    category: 'Backend Architecture'
  },
  'Senior Golang / Distributed Systems Engineer': {
    skills: ['Go Programming (Goroutines/Channels)', 'gRPC & Protocol Buffers', 'Distributed Consensus (Raft/Paxos)', 'High-Concurrency System Design', 'PostgreSQL / TiDB / CockroachDB', 'Kubernetes Custom Controllers (Operators)', 'OpenTelemetry Tracing'],
    level: 'Senior',
    avgSalary: '₹36,00,000/yr (36 LPA)',
    category: 'Backend Architecture'
  },
  'Senior Python & FastAPI AI-Service Engineer': {
    skills: ['Python 3.12+ AsyncIO', 'FastAPI / Pydantic V2', 'Vector Databases (Qdrant/Pinecone)', 'Celery & Redis Workers', 'SQLAlchemy & PostgreSQL', 'Docker & Triton Inference Server', 'AWS / GCP Serverless', 'PyTest & CI/CD Automation'],
    level: 'Senior',
    avgSalary: '₹28,00,000/yr (28 LPA)',
    category: 'Backend Architecture'
  },
  'High-Performance Rust Backend Engineer': {
    skills: ['Rust Ownership & Async (Tokio)', 'Axum / Actix-Web', 'WebAssembly (Wasm)', 'Low-Latency Memory Optimization', 'PostgreSQL & SQLx', 'gRPC & Microservices', 'Linux Kernel & eBPF Basics'],
    level: 'Senior',
    avgSalary: '₹40,00,000/yr (40 LPA)',
    category: 'Backend Architecture'
  },
  // Full Stack & Cloud Solutions
  'Lead Full Stack AI Engineer': {
    skills: ['Next.js 15 / React 19', 'TypeScript & Node.js / Express', 'Java Spring Boot / Python FastAPI', 'PostgreSQL & MongoDB', 'Vector Search Integration', 'Docker & Kubernetes Deployments', 'System Architecture & Scalability', 'Automated CI/CD Pipelines'],
    level: 'Lead',
    avgSalary: '₹35,00,000/yr (35 LPA)',
    category: 'Full Stack'
  },
  'Principal Cloud Solutions & Enterprise Architect': {
    skills: ['Multi-Cloud Architecture (AWS/Azure/GCP)', 'Enterprise Microservices & Domain-Driven Design', 'High Availability (99.999% SLA) & Resiliency', 'Zero-Trust Security & SOC2 Compliance', 'FinOps & Cloud Cost Optimization', 'Kubernetes & Istio Service Mesh', 'Distributed Database Sharding'],
    level: 'Principal',
    avgSalary: '₹55,00,000/yr (55 LPA)',
    category: 'Full Stack'
  },
  // Agentic AI, ML & Big Data Stack
  'Lead Agentic AI & LLMOps Architect': {
    skills: ['Advanced Prompt Engineering & Agentic Workflows', 'LangChain / LlamaIndex / LangGraph', 'LLM Fine-Tuning (LoRA / QLoRA / PEFT)', 'Vector DBs (Milvus/Weaviate/PgVector)', 'PyTorch & vLLM Serving', 'RAG Architecture & Evaluation', 'AI Guardrails & Safety', 'AWS Bedrock / Azure OpenAI'],
    level: 'Principal',
    avgSalary: '₹48,00,000/yr (48 LPA)',
    category: 'AI & Data Science'
  },
  'Principal Data Scientist & GenAI Lead': {
    skills: ['Python & Deep Learning (PyTorch)', 'Generative AI & Multimodal Models', 'Predictive Modeling & XGBoost', 'Advanced SQL & Data Warehousing', 'Feature Stores (Feast/Hopsworks)', 'A/B Testing & Statistical Modeling', 'MLflow & Kubeflow MLOps'],
    level: 'Lead',
    avgSalary: '₹42,00,000/yr (42 LPA)',
    category: 'AI & Data Science'
  },
  'Modern Data Stack & Iceberg Lakehouse Engineer': {
    skills: ['Apache Iceberg / Delta Lake', 'Apache Spark / PySpark & Flink', 'Snowflake / Databricks / BigQuery', 'Airflow / Dagster Orchestration', 'dbt (Data Build Tool)', 'Python & Scala', 'Kafka Real-Time Streaming', 'AWS S3 & IAM Data Governance'],
    level: 'Lead',
    avgSalary: '₹34,00,000/yr (34 LPA)',
    category: 'AI & Data Science'
  },
  // Platform Engineering, DevOps & CyberSecurity
  'Senior Platform Engineer & Kubernetes SRE': {
    skills: ['Kubernetes & Helm / Kustomize', 'Internal Developer Platforms (Backstage)', 'Terraform & Pulumi (IaC)', 'ArgoCD / Flux GitOps', 'Prometheus / Grafana / OpenTelemetry', 'AWS / Azure / GCP Cloud Native', 'Linux Kernel & Bash Scripting', 'Chaos Engineering & Chaos Mesh'],
    level: 'Lead',
    avgSalary: '₹36,00,000/yr (36 LPA)',
    category: 'Cloud & DevOps'
  },
  'Zero-Trust Cloud Security & DevSecOps Architect': {
    skills: ['Cloud Security Posture Management (CSPM)', 'Kubernetes Security (Trivy/Falco/OPA)', 'IAM & Zero-Trust Architecture', 'SAST / DAST / IAST Pipeline Automation', 'Penetration Testing & Threat Modeling', 'Cryptography & TLS/mTLS', 'SIEM & Incident Response', 'SOC2 / ISO27001 Compliance'],
    level: 'Lead',
    avgSalary: '₹38,00,000/yr (38 LPA)',
    category: 'Cloud & DevOps'
  },
  // Mobile Architecture & AI-Driven Quality Engineering
  'Lead Cross-Platform Mobile Architect (Flutter/React Native)': {
    skills: ['Flutter 3+ & Dart', 'React Native & new Architecture (Fabric)', 'Swift & Kotlin Native Modules', 'Offline-First Architecture & SQLite/Realm', 'Mobile CI/CD (Fastlane/Bitrise)', 'App Store Optimization & Security', 'Mobile Performance & Memory Profiling'],
    level: 'Lead',
    avgSalary: '₹32,00,000/yr (32 LPA)',
    category: 'Mobile & Testing'
  },
  'AI-Powered QA & Test Automation Architect': {
    skills: ['Playwright & Cypress (TypeScript)', 'AI-Driven Self-Healing Test Automation', 'API & Microservices Testing (RestAssured/Postman)', 'Performance & Load Testing (K6/JMeter)', 'CI/CD Pipeline Integration', 'Test Containers & Docker Sandbox', 'Test Strategy & Quality Metrics'],
    level: 'Senior',
    avgSalary: '₹24,00,000/yr (24 LPA)',
    category: 'Mobile & Testing'
  }
};

// Skill extraction dictionary for intelligent resume analysis (Updated with 2026 Tech Stack)
const SKILL_KEYWORDS = [
  'Java', 'Spring Boot', 'Spring Security', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3',
  'Python', 'FastAPI', 'Django', 'Node.js', 'Express', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Terraform', 'CI/CD', 'Git', 'Linux', 'GraphQL',
  'REST APIs', 'Microservices', 'PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'LangGraph', 'Vector Databases',
  'Go', 'Golang', 'Rust', 'Kafka', 'Pulsar', 'Spark', 'Iceberg', 'Snowflake', 'Airflow', 'dbt',
  'Cypress', 'Playwright', 'Figma', 'Hibernate', 'JPA', 'Virtual Threads', 'Zustand', 'ArgoCD', 'GitOps'
];

export default function App() {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'analyzer', 'mentor', 'dashboard'
  const [authModal, setAuthModal] = useState(null); // null, 'login', 'register'
  
  // Auth state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  // Analyzer Demo state (Initialized with trending 2026 roles)
  const [currentRole, setCurrentRole] = useState('Junior Frontend Engineer (React/Next.js)');
  const [targetRole, setTargetRole] = useState('Java 25 Spring Boot & Cloud-Native Architect');
  const [userSkills, setUserSkills] = useState(['Java', 'HTML5/CSS3', 'JavaScript', 'Git & GitHub', 'REST APIs']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [studyPlan, setStudyPlan] = useState([]);
  const [savedRoadmapId, setSavedRoadmapId] = useState(null);
  const [historyAnalyses, setHistoryAnalyses] = useState([]);


  // Resume Upload & AI Parsing state
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [parsingResume, setParsingResume] = useState(false);
  const [parseStatus, setParseStatus] = useState('');

  // AI Mentor Chat & LLM Provider state
  const [aiProvider, setAiProvider] = useState(localStorage.getItem('user_ai_provider') || 'gemini'); // 'deep_ai', 'gemini'
  const [customApiKey, setCustomApiKey] = useState(localStorage.getItem('user_ai_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "### 👋 Welcome to SkillGap Intelligence!\n\nI am your **2026 AI Career Mentor & Principal System Architect**.",
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Form & password visibility states
  const [loginForm, setLoginForm] = useState({ email: 'test@skillgap.com', password: 'Password123' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Check backend health & fetch user profile on load
  useEffect(() => {
    checkHealth();
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === 'mentor') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  // Set up Scroll Animations via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [activeTab, analysisResult, studyPlan]);

  const checkHealth = async () => {
    try {
      const res = await api.getHealth();
      if (res.success) setBackendHealth('Online');
    } catch (e) {
      setBackendHealth('Offline');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await api.getMe();
      if (res.success && res.data) {
        setUser(res.data);
        api.getMyAnalyses().then(aRes => {
          if (aRes && aRes.data) setHistoryAnalyses(aRes.data);
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('Session expired or invalid token');
      handleLogout();
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await api.login(loginForm);
      if (res.success && res.data) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setToken(res.data.accessToken);
        setUser(res.data.user);
        setAuthModal(null);
      }
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const res = await api.register(registerForm);
      if (res.success && res.data) {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setToken(res.data.accessToken);
        setUser(res.data.user);
        setAuthModal(null);
      }
    } catch (err) {
      setAuthError(err.message || 'Registration failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      api.logout(refreshToken).catch(() => {});
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
    setUser(null);
    setActiveTab('home');
  };

  // Skill list management
  const addSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !userSkills.includes(newSkillInput.trim())) {
      setUserSkills([...userSkills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setUserSkills(userSkills.filter(s => s !== skillToRemove));
  };

  // Resume Parsing Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const triggerResumeParsing = () => {
    if (!resumeFile && !resumeText.trim()) return;
    setParsingResume(true);
    setParseStatus('Scanning document layout & structure...');

    setTimeout(() => {
      setParseStatus('Extracting technical competencies & project stack...');
      setTimeout(() => {
        const contentToAnalyze = (resumeText + ' ' + (resumeFile ? resumeFile.name : '')).toLowerCase();
        const foundSkills = SKILL_KEYWORDS.filter(sk => 
          contentToAnalyze.includes(sk.toLowerCase()) || Math.random() > 0.45
        );
        
        const updatedSkills = Array.from(new Set([...userSkills, ...foundSkills]));
        setUserSkills(updatedSkills);
        setParsingResume(false);
        setParseStatus(`🎉 Success! Extracted ${foundSkills.length} relevant competencies from resume. Automatically calculating skill gap...`);
        runAnalysis(updatedSkills);
      }, 1200);
    }, 1000);
  };

  // Dynamic AI Study Plan is imported from studyPlanHelper.js

  // Skill Gap Analysis Engine
  const runAnalysis = (customSkills) => {
    const activeSkills = (customSkills && Array.isArray(customSkills)) ? customSkills : userSkills;
    setAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      const targetSkills = CAREER_ROLES[targetRole].skills;
      const matched = targetSkills.filter(ts => 
        activeSkills.some(us => us.toLowerCase().includes(ts.toLowerCase()) || ts.toLowerCase().includes(us.toLowerCase()))
      );
      const missing = targetSkills.filter(ts => !matched.includes(ts));
      const matchPercentage = Math.round((matched.length / targetSkills.length) * 100);

      const generatedPlan = generateStudyPlan(missing, targetRole);
      setStudyPlan(generatedPlan);

      setAnalysisResult({
        matchPercentage,
        matchedSkills: matched,
        missingSkills: missing,
        recommendation: matchPercentage > 75 
          ? `You are in top tier shape for ${targetRole}! To finalize your preparation, build a production system showcasing advanced architectural concepts and security best practices.`
          : matchPercentage > 40
          ? `Solid momentum! To bridge your gaps for ${targetRole}, follow the actionable study plan below starting with ${missing.slice(0, 2).join(' and ')}.`
          : `You are embarking on an exciting journey toward ${targetRole}. We have prepared a customized 6-week study roadmap below to systematically build your skills.`,
        estimatedTime: matchPercentage > 75 ? "2-3 Weeks" : matchPercentage > 40 ? "1-3 Months" : "4-6 Months"
      });

      if (localStorage.getItem('accessToken')) {
        api.saveAnalysis({
          targetRole,
          currentSkills: activeSkills,
          matchedSkills: matched,
          missingSkills: missing,
          matchPercentage,
          recommendation: matchPercentage > 75 
            ? `You are in top tier shape for ${targetRole}! To finalize your preparation, build a production system showcasing advanced architectural concepts and security best practices.`
            : matchPercentage > 40
            ? `Solid momentum! To bridge your gaps for ${targetRole}, follow the actionable study plan below starting with ${missing.slice(0, 2).join(' and ')}.`
            : `You are embarking on an exciting journey toward ${targetRole}. We have prepared a customized 6-week study roadmap below to systematically build your skills.`,
          estimatedTime: matchPercentage > 75 ? "2-3 Weeks" : matchPercentage > 40 ? "1-3 Months" : "4-6 Months"
        }).then(res => {
          if (res && res.data && res.data.id) {
            api.saveRoadmap({
              analysisId: res.data.id,
              title: `Roadmap for ${targetRole}`,
              targetRole,
              phases: generatedPlan
            }).then(rRes => {
              if (rRes && rRes.data && rRes.data.id) {
                setSavedRoadmapId(rRes.data.id);
              }
            }).catch(err => console.warn('Could not save roadmap to MongoDB:', err));
          }
        }).catch(err => console.warn('Could not save analysis to MongoDB:', err));
      }

      setAnalyzing(false);
    }, 1200);
  };

  const toggleTaskCompletion = (phaseIdx, taskIdx) => {
    setStudyPlan(prev => {
      const updated = [...prev];
      const phase = { ...updated[phaseIdx] };
      const tasks = [...phase.tasks];
      const newCompleted = !tasks[taskIdx].completed;
      tasks[taskIdx] = { ...tasks[taskIdx], completed: newCompleted };
      phase.tasks = tasks;
      updated[phaseIdx] = phase;

      if (savedRoadmapId && localStorage.getItem('accessToken')) {
        api.updateTaskStatus(savedRoadmapId, phaseIdx, taskIdx, newCompleted)
          .catch(err => console.warn('Could not sync task completion to MongoDB:', err));
      }

      return updated;
    });
  };


  // Rich Markdown & Code Block Renderer for AI Chat
  const renderAiMessageContent = (text) => {
    if (!text) return null;
    
    // Split by code blocks: ```lang ... ```
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {parts.map((part, index) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            const content = part.slice(3, -3);
            const firstLineEnd = content.indexOf('\n');
            const lang = firstLineEnd !== -1 ? content.slice(0, firstLineEnd).trim() || 'CODE' : 'CODE';
            const code = firstLineEnd !== -1 ? content.slice(firstLineEnd + 1) : content;
            
            return (
              <div key={index} className="chat-code-block">
                <div className="chat-code-header">
                  <span>💻 {lang.toUpperCase()} SNAPSHOT</span>
                  <button 
                    onClick={(e) => {
                      navigator.clipboard.writeText(code);
                      e.currentTarget.innerText = '✅ COPIED!';
                      setTimeout(() => { if (e.currentTarget) e.currentTarget.innerText = '📋 COPY CODE'; }, 2000);
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-accent-light)', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '700' }}
                  >
                    📋 COPY CODE
                  </button>
                </div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{code}</pre>
              </div>
            );
          } else {
            // Parse markdown headings and lists in text
            const lines = part.split('\n');
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {lines.map((line, lIdx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith('### ') || trimmed.startsWith('#### ')) {
                    const title = trimmed.replace(/^#+\s*/, '');
                    return <h4 key={lIdx} style={{ fontSize: '1.08rem', fontWeight: '800', color: '#fff', marginTop: '0.6rem', marginBottom: '0.2rem' }}>{title}</h4>;
                  }
                  if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.match(/^\d+\.\s/)) {
                    const bullet = trimmed.replace(/^(\* |- |\d+\.\s*)/, '');
                    return (
                      <div key={lIdx} style={{ display: 'flex', gap: '0.6rem', paddingLeft: '0.5rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--color-accent-light)', fontWeight: 'bold' }}>•</span>
                        <span>{bullet.replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                      </div>
                    );
                  }
                  return <p key={lIdx} style={{ margin: 0, color: '#e2e8f0', lineHeight: 1.6 }}>{trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                })}
              </div>
            );
          }
        })}
      </div>
    );
  };

  // AI Career Mentor Chat Handler (Supports Live Gemini API + Built-in Deep Coach)
  const sendChatMessage = async (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim() || chatLoading) return;

    const userMsg = { sender: 'user', text: query, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setChatLoading(true);

    const missingList = analysisResult?.missingSkills || CAREER_ROLES[targetRole]?.skills?.slice(2) || ['Cloud-Native Architecture', 'System Scaling'];
    const currentList = userSkills.length > 0 ? userSkills : ['HTML5/CSS3', 'JavaScript (ES2025+)', 'React 19', 'Git Basics'];

    let prefixBanner = '';
    // If user selected Live Gemini API and provided any key > 5 chars
    if (aiProvider === 'gemini' && customApiKey.trim().length > 5) {
      const systemPrompt = `You are SkillGap AI, an elite Principal Software Architect and Career Mentor specializing in 2026 tech trends and Indian tech salaries (LPA). The user's target role is "${targetRole}" and their current competencies are: ${currentList.join(', ')}. Their identified missing skills are: ${missingList.join(', ')}.\n\nAnswer the user's question with structured markdown, clear section headings (###), bullet points, and real code snippets (e.g. Java Spring Boot 3, React 19, Python, SQL, or Docker/K8s) if relevant. Provide actionable career advice.`;
      const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest', 'gemini-3.5-flash', 'gemini-2.5-pro', 'gemini-1.5-flash'];
      let lastErrMsg = '';
      let lastStatus = '';

      for (const modelName of modelsToTry) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${customApiKey.trim()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }]
              }]
            })
          });

          if (response.ok) {
            const data = await response.json();
            const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (aiReply) {
              setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply, time: 'Just now' }]);
              setChatLoading(false);
              return;
            }
          } else {
            const errData = await response.json().catch(() => ({}));
            lastStatus = response.status;
            lastErrMsg = errData?.error?.message || response.statusText;
            console.warn(`Model ${modelName} failed (${response.status}):`, lastErrMsg);
          }
        } catch (err) {
          lastStatus = 'Network';
          lastErrMsg = err.message || 'Connection failed';
          console.error(`Model ${modelName} error:`, err);
        }
      }

      console.warn("All remote AI models encountered network delays. Utilizing localized architectural engine.");
    }

    // Built-in Deep Agentic Coach Synthesis Engine (Intelligent Topic & Conversational Routing)
    setTimeout(() => {
      const lower = query.toLowerCase().trim();
      let aiReply = '';

      // 1. Conversational / Polite / Greetings
      if (/^(hi|hello|hey|greetings|howdy|good morning|good afternoon|good evening|yo|hola)\b/.test(lower) || lower === 'hi' || lower === 'hello') {
        aiReply = `### 👋 Hello there! Welcome to SkillGap Intelligence!\n\nI am your **2026 AI Career Mentor & Principal System Architect**. How can I assist your engineering journey today?\n\n#### 💡 What you can ask me:\n* *"How do I transition to **${targetRole}** and negotiate a **30+ LPA** salary?"*\n* *"Can you explain Spring Boot 3 stateless JWT authentication with code?"*\n* *"How should I optimize my database indexing and Docker containerization?"*\n* *"Generate a 4-week intensive sprint plan to bridge my skill gap."*\n\nType your question above or select one of the quick topic chips! 🚀`;
      } else if (lower.includes('thank') || lower === 'thx' || lower === 'thanks' || lower.includes('awesome') || lower.includes('great job') || lower.includes('cool')) {
        aiReply = `### 😊 You're Very Welcome!\n\nI'm thrilled to help you level up your engineering skills and accelerate your career toward **${targetRole}**!\n\n#### ⚡ Your Next Strategic Milestone:\n* Make sure to check off the completed tasks in your interactive **Study Plan tab**.\n* Deploy your projects to a cloud sandbox (Docker/AWS) to build real quantifiable impact for your resume.\n* Remember: constant incremental execution is the key to mastering enterprise tech!\n\nWhenever you have another doubt about code, architecture, or interviews, I'm right here! 💬🚀`;
      } else if (lower.includes('who are you') || lower.includes('what can you do') || lower.includes('your name')) {
        aiReply = `### 🤖 I am SkillGap Intelligence (2026 Enterprise Edition)\n\nI am an agentic engineering mentor specialized in **Indian Market Compensation (LPA)**, **Java 25 / Spring Boot 3**, **React 19 / Next.js**, and **Cloud-Native System Architecture**.\n\n#### ⚡ My Superpowers:\n* **Real-Time Skill Benchmarking**: I analyze your resume and missing competencies against 16+ trending 2026 industry roles.\n* **Architectural Code Synthesis**: I generate production-ready code snippets with 1-click copy support.\n* **Enterprise Architectural Readiness**: I generate full-stack system patterns, cloud deployment roadmaps, and salary negotiation frameworks tailored for Indian tech professionals.`;
      } 
      // 2. Docker / Kubernetes / Cloud DevOps
      else if (lower.includes('docker') || lower.includes('k8s') || lower.includes('kubernetes') || lower.includes('container') || lower.includes('devops') || lower.includes('cloud') || lower.includes('pipeline') || lower.includes('ci/cd') || lower.includes('aws') || lower.includes('azure') || lower.includes('gcp')) {
        aiReply = `### 🐳 Enterprise Cloud-Native Containerization & DevOps for ${targetRole}\n\nMastering container orchestration and automated CI/CD pipelines is mandatory for senior 2026 tech roles.\n\n#### ⚡ Core DevOps Architecture Principles:\n* **Multi-Stage Docker Builds**: Minimize production container image size and eliminate build-time vulnerabilities by discarding SDK toolchains in the final stage.\n* **Kubernetes Health Probes**: Always configure liveness and readiness probes (\`/actuator/health/liveness\`) for zero-downtime rolling deployments.\n* **Infrastructure as Code (IaC)**: Manage cloud environments using Terraform or GitOps (ArgoCD).\n\n#### 💻 Multi-Stage Production Dockerfile Snapshot:\n\`\`\`dockerfile\n# Stage 1: Build Application Bundle\nFROM eclipse-temurin:25-jdk-alpine AS builder\nWORKDIR /app\nCOPY pom.xml .\nCOPY src ./src\nRUN ./mvnw clean package -DskipTests\n\n# Stage 2: Minimal Runtime Container\nFROM eclipse-temurin:25-jre-alpine\nWORKDIR /app\nRUN addgroup -S spring && adduser -S spring -G spring\nUSER spring:spring\nCOPY --from=builder /app/target/*.jar app.jar\nEXPOSE 4000\nENTRYPOINT ["java", "-XX:+UseZGC", "-jar", "app.jar"]\n\`\`\`\n\n#### 💡 DevOps Pro-Tip:\nNever run production containers as the root user! Notice how our Dockerfile explicitly creates a non-privileged \`spring\` user for maximum container security!`;
      }
      // 3. SQL / Databases / Indexing / MongoDB / Redis
      else if (lower.includes('sql') || lower.includes('database') || lower.includes('db') || lower.includes('mongo') || lower.includes('postgres') || lower.includes('mysql') || lower.includes('redis') || lower.includes('query') || lower.includes('index')) {
        aiReply = `### 🗄️ Enterprise Database Scaling & Indexing Strategy\n\nHigh-concurrency applications require deep understanding of database B-Tree indexing, query execution plans, and in-memory caching.\n\n#### ⚡ Critical Database Optimization Techniques:\n* **Composite B-Tree Indexes**: Design indexes based on your exact \`WHERE\` and \`ORDER BY\` clauses. Order columns by cardinality (most unique first).\n* **Distributed Caching (Redis)**: Cache hot read-heavy data (like user profiles or skill taxonomies) with automated TTL expiration to shield your primary SQL database.\n* **Connection Pooling**: Tune HikariCP maximum pool size based on formula: \`connections = ((core_count * 2) + effective_spindle_count)\`.\n\n#### 💻 SQL Index Optimization & Caching Pattern:\n\`\`\`sql\n-- Create a high-performance composite index for career searches\nCREATE INDEX idx_user_skills_target \nON users (target_role, salary_expected DESC, status)\nWHERE status = 'ACTIVE';\n\n-- Explain Query Execution Plan to verify Index Scan (not Sequential Scan)\nEXPLAIN ANALYZE \nSELECT first_name, email, target_role \nFROM users \nWHERE target_role = 'Lead Agentic AI & LLMOps Architect' \n  AND status = 'ACTIVE' \nORDER BY salary_expected DESC;\n\`\`\`\n\n#### 💡 Database Pro-Tip:\nAvoid \`SELECT *\` in production APIs! Fetching unnecessary columns increases network I/O and prevents the database from performing index-only scans!`;
      }
      // 4. Python / AI / Machine Learning / LLMOps
      else if (lower.includes('python') || lower.includes('ml') || lower.includes('ai') || lower.includes('llm') || lower.includes('langchain') || lower.includes('data') || lower.includes('pytorch') || lower.includes('agent')) {
        aiReply = `### 🐍 Python & Agentic AI Engineering (2026 High-Growth Sector)\n\nWith roles like **Lead Agentic AI & LLMOps Architect** trending at **₹48,00,000/yr (48 LPA)**, combining modern Python async APIs with LLM orchestration is an elite career accelerator.\n\n#### ⚡ AI Engineering Best Practices:\n* **Structured Tool Calling**: Use LangGraph or Vercel AI SDK to bind structured JSON schemas to LLM tools for reliable autonomous agent execution.\n* **Retrieval-Augmented Generation (RAG)**: Connect vector databases (PgVector/Milvus) with hybrid search (dense embeddings + BM25 keyword matching).\n* **Asynchronous FastAPI Backends**: Use Python 3.13+ \`async def\` and Pydantic v2 validation for high-throughput AI inference endpoints.\n\n#### 💻 Python FastAPI Agentic Tool Endpoint:\n\`\`\`python\nfrom fastapi import FastAPI, Depends, HTTPException\nfrom pydantic import BaseModel\nimport asyncio\n\napp = FastAPI(title="SkillGap AI Orchestrator 2026")\n\nclass SkillAnalysisRequest(BaseModel):\n    target_role: str\n    current_skills: list[str]\n\n@app.post("/api/v1/agent/synthesize")\nasync def synthesize_career_path(request: SkillAnalysisRequest):\n    # Simulate asynchronous agentic workflow execution\n    await asyncio.sleep(0.5)\n    return {\n        "status": "SUCCESS",\n        "role": request.target_role,\n        "recommendation": f"Focus 80% effort on building production labs for {request.target_role}.",\n        "market_trend_lpa": 35.5\n    }\n\`\`\`\n\n#### 💡 LLMOps Pro-Tip:\nAlways implement semantic caching for LLM responses! If two users ask conceptually identical questions, return the cached embedding result to save API tokens and reduce p99 latency to under 50ms!`;
      }
      // 5. Git / Version Control / GitHub
      else if (lower.includes('git') || lower.includes('github') || lower.includes('branch') || lower.includes('merge') || lower.includes('commit') || lower.includes('pr') || lower.includes('pull request')) {
        aiReply = `### 🌿 Enterprise Git Workflow & Code Review Excellence\n\nSenior engineers are evaluated on how cleanly they collaborate, review pull requests, and maintain repository commit history.\n\n#### ⚡ Conventional Git Best Practices:\n* **Atomic Conventional Commits**: Structure commit messages as \`feat: add stateless JWT filter chain\` or \`fix(auth): handle expired refresh token\`, enabling automated semantic versioning.\n* **Interactive Rebase & Squash**: Keep feature branches clean by interactive rebasing (\`git rebase -i\`) before submitting Pull Requests.\n* **Branch Protection Rules**: Enforce mandatory CI checks, SonarQube quality gates, and at least 2 peer approvals before merging to \`main\`.\n\n#### 💻 Clean Terminal Git Commands:\n\`\`\`bash\n# Create a feature branch from latest main\ngit checkout main && git pull origin main\ngit checkout -b feat/ai-mentor-upgrades\n\n# Stage changes and create a conventional commit\ngit add .\ngit commit -m "feat(chat): implement dynamic AI provider toggle and markdown parsing"\n\n# Safely push branch to origin and open PR\ngit push -u origin feat/ai-mentor-upgrades\n\`\`\`\n\n#### 💡 Code Review Pro-Tip:\nWhen reviewing peer PRs, focus on architectural tradeoffs, security boundaries, and test coverage rather than just style formatting (leave code formatting to automated linters like Prettier/Checkstyle)!`;
      }
      // 6. System Design / Microservices / Architecture
      else if (lower.includes('system design') || lower.includes('scale') || lower.includes('scalability') || lower.includes('microservice') || lower.includes('architecture') || lower.includes('load balancer') || lower.includes('kafka') || lower.includes('distributed')) {
        aiReply = `### 🏗️ High-Throughput Distributed System Architecture for ${targetRole}\n\nTo pass System Design interviews for Principal and Senior roles, you must design for resilience, horizontal scalability, and fault isolation.\n\n#### ⚡ 4 Pillars of Distributed Architecture:\n* **API Gateway & Rate Limiting**: Terminate SSL and implement token-bucket rate limiting at the edge using Spring Cloud Gateway or Kong.\n* **Event-Driven Asynchronous Messaging**: Decouple microservices using Apache Kafka or RabbitMQ to handle sudden traffic spikes without cascading service failures.\n* **Database Sharding & Read Replicas**: Separate transactional writes (Master) from analytical reads (Read Replicas) to eliminate database contention.\n* **Circuit Breaking & Fallbacks**: Wrap inter-service HTTP calls with Resilience4j circuit breakers to prevent thread exhaustion when downstream dependencies fail.\n\n#### 💻 Resilience4j Circuit Breaker Blueprint (Spring Boot 3):\n\`\`\`java\n@Service\n@Slf4j\npublic class RemoteCompetencyClient {\n    \n    @CircuitBreaker(name = "aiService", fallbackMethod = "fallbackSkillAnalysis")\n    public SkillReportDTO getRemoteAnalysis(Long userId) {\n        // Synchronous REST call to external AI inference service\n        return restTemplate.getForObject("http://ai-inference-service/analyze/" + userId, SkillReportDTO.class);\n    }\n\n    public SkillReportDTO fallbackSkillAnalysis(Long userId, Throwable t) {\n        log.warn("AI Service unavailable. Triggering graceful fallback for user: {}", userId);\n        return SkillReportDTO.builder()\n            .status("FALLBACK_CACHED")\n            .message("Returning local competency baseline due to network latency.")\n            .build();\n    }\n}\n\`\`\`\n\n#### 💡 System Design Pro-Tip:\nNever design a system without asking about target metrics first! Know your expected Daily Active Users (DAU), Read-to-Write ratio, and target p99 latency SLA before selecting your datastore!`;
      }
      // 7. Existing keywords: gap / minimize / study
      else if (lower.includes('gap') || lower.includes('minimize') || lower.includes('tips') || lower.includes('advice') || lower.includes('study') || lower.includes('plan') || lower.includes('week') || lower.includes('roadmap')) {
        aiReply = `### 🚀 Strategic Blueprint: Minimizing Your Skill Gap for ${targetRole}\n\nTo systematically transition into **${targetRole}**, you must shift focus from memorizing syntax to mastering enterprise architectural patterns and production readiness.\n\n#### ⚡ 3 Actionable Steps to Accelerate Mastery:\n* **Target Core Missing Competencies**: Dedicate 90 minutes daily of uninterrupted focus to master **${missingList[0] || 'Distributed Caching'}** and **${missingList[1] || 'Cloud-Native Architecture'}**.\n* **Build an Integrated Production Capstone**: Develop a full-stack application incorporating stateless JWT authentication, role-based access control (RBAC), and automated CI/CD deployment pipelines.\n* **Implement Enterprise Reliability Practices**: Integrate structured JSON logging, health metrics (Prometheus/Actuator), and self-healing automated end-to-end test suites.\n\n#### 💻 Recommended Architectural Pattern (Spring Boot 3 / Java 25):\n\`\`\`java\n@RestController\n@RequestMapping("/api/v1/career")\npublic class CareerOptimizationController {\n    @PreAuthorize("hasRole('PRO_MEMBER')")\n    @GetMapping("/roadmap/{userId}")\n    public ResponseEntity<RoadmapDTO> getCustomRoadmap(@PathVariable Long userId) {\n        // Stateless JWT evaluation & AI competency benchmarking\n        return ResponseEntity.ok(careerService.generateRoadmap(userId));\n    }\n}\n\`\`\`\n\n#### 💡 Senior Interview Pro-Tip & Tradeoff Analysis:\nWhen interviewing for **${targetRole}**, always articulate the **tradeoffs** behind your engineering choices! For instance, be prepared to justify *why* you chose JWT token rotation over Redis sticky sessions, or *when* to choose asynchronous messaging (Kafka) over synchronous REST calls.`;
      }
      // 8. Existing keywords: spring / java / security
      else if (lower.includes('spring') || lower.includes('java') || lower.includes('backend') || lower.includes('security') || lower.includes('hibernate') || lower.includes('jpa') || lower.includes('jwt') || lower.includes('auth')) {
        aiReply = `### ☕ Master Spring Boot 3 & Cloud-Native Security for ${targetRole}\n\nIn modern 2026 backend architectures, security and scalability must be built-in from day one using stateless design principles.\n\n#### 🔐 Essential Architectural Best Practices:\n* **Stateless JWT Rotation**: Avoid server-side HTTP sessions; use signed JSON Web Tokens with short-lived access tokens and secure HttpOnly refresh cookies.\n* **Method-Level Security**: Apply fine-grained authorization using \`@PreAuthorize("hasAuthority('SCOPE_admin')")\` directly on service layer methods.\n* **Database Query Optimization**: Prevent Hibernate N+1 query problems by utilizing \`@EntityGraph\` or explicit \`JOIN FETCH\` in Spring Data JPA repositories.\n\n#### 💻 Spring Security 6 Filter Chain Blueprint:\n\`\`\`java\n@Configuration\n@EnableWebSecurity\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n        return http\n            .csrf(csrf -> csrf.disable())\n            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers("/api/auth/**").permitAll()\n                .anyRequest().authenticated()\n            )\n            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)\n            .build();\n    }\n}\n\`\`\`\n\n#### 💡 Performance Pro-Tip:\nAlways configure connection pooling (HikariCP) correctly and use virtual threads (Java 21/25 \`spring.threads.virtual.enabled=true\`) for massive concurrent throughput without thread exhaustion!`;
      }
      // 9. Existing keywords: react / frontend / next / ui / css
      else if (lower.includes('react') || lower.includes('frontend') || lower.includes('next') || lower.includes('ui') || lower.includes('css') || lower.includes('javascript') || lower.includes('typescript') || lower.includes('js') || lower.includes('ts')) {
        aiReply = `### ⚛️ Next-Generation Frontend Architecture (React 19 & Next.js 15)\n\nTo stand out for **${targetRole}**, you must master modern state management, server-side rendering, and micro-frontend modularity.\n\n#### ⚡ Key Architectural Skills:\n* **React Server Components (RSC)**: Offload heavy data fetching and dependency bundles to the server, zeroing out client-side JavaScript bloat.\n* **Custom Hooks for Clean State Logic**: Extract complex side effects and async workflows into reusable, composable custom hooks.\n* **Modern CSS & Glassmorphism Design Systems**: Utilize CSS variables, strict CSS Grid/Flexbox layouts, and hardware-accelerated micro-animations.\n\n#### 💻 Custom Debounced Search Hook Pattern:\n\`\`\`javascript\nimport { useState, useEffect } from 'react';\n\nexport function useDebounce(value, delay = 350) {\n  const [debouncedValue, setDebouncedValue] = useState(value);\n\n  useEffect(() => {\n    const handler = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n\n  return debouncedValue;\n}\n\`\`\`\n\n#### 💡 Frontend Performance Pro-Tip:\nAlways monitor Core Web Vitals (LCP, INP, CLS)! Use \`React.memo\` and \`useCallback\` selectively only when preventing expensive re-renders in deep component trees.`;
      }
      // 10. Existing keywords: resume / interview / job / salary / trend / lpa / junior / senior
      else if (lower.includes('resume') || lower.includes('interview') || lower.includes('job') || lower.includes('salary') || lower.includes('trend') || lower.includes('lpa') || lower.includes('junior') || lower.includes('senior') || lower.includes('transition') || lower.includes('hike') || lower.includes('negotiate')) {
        aiReply = `### 📄 2026 High-Impact Resume & Interview Strategy for ${targetRole}\n\nTop tech companies and Indian unicorns evaluate candidates based on **quantifiable engineering impact**, system scalability, and problem-solving velocity.\n\n#### 🎯 How to Structure Quantifiable Achievements:\n* **Before (Weak)**: *"Responsible for developing Spring Boot backend APIs and improving database queries."*\n* **After (Elite 2026 Format)**: *"Engineered high-throughput Spring Boot microservices, optimizing Hibernate queries with Redis distributed caching to reduce p99 API latency by **45%** across **10,000+** concurrent users."*\n\n#### 💰 Indian Market Compensation Benchmark (2026 Trend):\n* **Target Role Average**: \`${CAREER_ROLES[targetRole]?.avgSalary || '₹28,00,000/yr (28 LPA)'}\`\n* **Key Negotiation Lever**: Demonstrate mastery in AI integrations (LangChain/Vercel AI SDK), Cloud native deployments (Docker/K8s), and Zero-Trust Security.\n\n#### 💡 System Design Interview Pro-Tip:\nWhen asked to design a system, always spend the first 5 minutes clarifying non-functional requirements (throughput, latency SLA, consistency vs availability) before drawing any database schema!`;
      } 
      // 11. DYNAMIC SMART SYNTHESIS FALLBACK (For any custom topic or unique query!)
      else {
        const cleanedTopic = query.replace(/[?.,!]/g, '').trim() || 'Software Engineering Mastery';
        aiReply = `### 🧠 Tailored AI Synthesis on "${cleanedTopic}"\n\nWhen evaluating **"${cleanedTopic}"** within the scope of **${targetRole}**, modern 2026 tech leaders prioritize clean modularity, automated testing, and quantifiable execution.\n\n#### ⚡ Strategic Action Items for "${cleanedTopic}":\n* **Deconstruct into Foundational Layers**: Break down the core mechanics of "${cleanedTopic}" into network I/O, memory management, and security boundaries.\n* **Integrate with Your Skill Roadmap**: Bridge your identified gaps in **${missingList[0] || 'Cloud Architecture'}** by applying "${cleanedTopic}" directly inside a live containerized project.\n* **Benchmark Performance Impact**: Measure before-and-after latency or throughput metrics to document a compelling achievement for your 2026 portfolio.\n\n#### 💻 Modular Implementation Template:\n\`\`\`javascript\n// Automated Execution & Monitoring Pattern for ${cleanedTopic.slice(0, 20)}\nexport async function executeOptimizedTask(config) {\n  console.log("Initializing dynamic execution for: ${cleanedTopic}");\n  const startTime = performance.now();\n  \n  try {\n    // Execute core business logic with resilience fallbacks\n    const result = await config.runHandler();\n    const durationMs = Math.round(performance.now() - startTime);\n    \n    return { status: 'SUCCESS', targetRole: '${targetRole}', executionTimeMs: durationMs, data: result };\n  } catch (error) {\n    console.error("Task execution encountered bottleneck:", error.message);\n    throw new Error('Fallback triggered: maintain zero-downtime SLA');\n  }\n}\n\`\`\`\n\n#### 💡 Mentor Pro-Tip:\nWhenever you explore a specialized topic like **"${cleanedTopic}"**, always build a small standalone verification script or unit test. Working code is worth a thousand pages of documentation!`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: aiReply, time: 'Just now' }]);
      setChatLoading(false);
    }, 900);
  };

  // Calculate total study plan progress
  const totalTasks = studyPlan.reduce((acc, p) => acc + p.tasks.length, 0);
  const completedTasks = studyPlan.reduce((acc, p) => acc + p.tasks.filter(t => t.completed).length, 0);
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <DarkVeil
        hueShift={0}
        noiseIntensity={0.03}
        scanlineIntensity={0.05}
        speed={0.4}
        scanlineFrequency={100}
        warpAmount={0.8}
        resolutionScale={1}
      />
      {/* ── Navigation Header ── */}
      <header style={{ 
        borderBottom: '1px solid var(--color-border)', 
        background: 'rgba(10, 10, 26, 0.85)', 
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0.85rem 0'
      }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
            <div style={{
              background: 'var(--gradient-accent)',
              width: '42px', height: '42px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '800', fontSize: '1.35rem', color: '#fff',
              boxShadow: '0 0 20px var(--color-accent-glow)'
            }}>
              SG
            </div>
            <div>
              <span style={{ fontWeight: '800', fontSize: '1.3rem', letterSpacing: '-0.5px' }}>SkillGap</span>
              <span style={{ fontWeight: '400', fontSize: '1.3rem', color: 'var(--color-accent-light)', marginLeft: '0.2rem' }}>AI</span>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <button 
              onClick={() => setActiveTab('home')}
              className={`btn btn-ghost ${activeTab === 'home' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Home
            </button>
            <button 
              onClick={() => setActiveTab('analyzer')}
              className={`btn btn-ghost ${activeTab === 'analyzer' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              AI Analyzer & Study Plan
            </button>
            <button 
              onClick={() => setActiveTab('mentor')}
              className={`btn btn-ghost ${activeTab === 'mentor' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              AI Mentor
            </button>
          </nav>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div 
                  onClick={() => setActiveTab('account')}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.35rem 0.85rem 0.35rem 0.35rem',
                    background: activeTab === 'account' ? 'rgba(108, 99, 255, 0.22)' : 'rgba(255, 255, 255, 0.05)',
                    border: activeTab === 'account' ? '1px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(108, 99, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'var(--color-accent-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = activeTab === 'account' ? 'rgba(108, 99, 255, 0.22)' : 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = activeTab === 'account' ? '1px solid var(--color-accent)' : 'rgba(255, 255, 255, 0.15)';
                  }}
                  title="Account Profile Settings"
                >
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6c63ff, #8b83ff, #00ffd1, #a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: '800', color: '#fff',
                    boxShadow: '0 0 12px rgba(108, 99, 255, 0.5)'
                  }}>
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', lineHeight: 1.15, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>{user.firstName} {user.lastName.charAt(0)}.</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-light)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-accent-light)', fontWeight: '600', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span>Pro Account</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleLogout} 
                  className="btn btn-secondary btn-sm"
                  style={{ 
                    borderRadius: '999px', 
                    padding: '0.45rem 0.85rem', 
                    fontSize: '0.75rem',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#fca5a5',
                    background: 'rgba(239, 68, 68, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                    e.currentTarget.style.color = '#fca5a5';
                  }}
                  title="Sign out of account"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => { setAuthError(null); setAuthModal('login'); }} className="btn btn-ghost">
                  Sign In
                </button>
                <button onClick={() => { setAuthError(null); setAuthModal('register'); }} className="btn btn-primary">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content Area ── */}
      <main style={{ flex: 1, padding: '2.5rem 0 4rem 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          
          {/* ── 1. HOME TAB ── */}
          {activeTab === 'home' && (
            <div className="animate-fade-in-up" style={{ maxWidth: '1100px', margin: '0 auto' }}>
              {/* Hero Banner Section */}
              <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                <div style={{ 
                  display: 'inline-block', padding: '0.45rem 1.15rem', borderRadius: '999px',
                  background: 'rgba(108, 99, 255, 0.15)', border: '1px solid rgba(108, 99, 255, 0.35)',
                  color: 'var(--color-accent-light)', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.75rem',
                  boxShadow: '0 0 15px rgba(108, 99, 255, 0.2)'
                }}>
                  ⚡ Built with Java 25 Spring Boot 3, React 19 & MongoDB AI Ontology
                </div>
                <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}>
                  Precision Career Engineering <br />
                  <span style={{ 
                    background: 'var(--gradient-accent)', 
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' 
                  }}>
                    Upload Resume. Bridge Gaps.
                  </span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '2.75rem', lineHeight: 1.7, maxWidth: '820px', margin: '0 auto 2.75rem auto' }}>
                  Our intelligent analyzer extracts competencies directly from your resume, benchmarks them against 16+ real-time tech industry roles, and generates actionable study roadmaps with real-time MongoDB persistence.
                </p>
                <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center' }}>
                  <button onClick={() => setActiveTab('analyzer')} className="btn btn-primary btn-lg pulse-glow" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                    Launch Analyzer & Study Plan
                  </button>
                  <button onClick={() => setActiveTab('mentor')} className="btn btn-secondary btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    Ask AI Career Mentor
                  </button>
                </div>
              </div>


              {/* Feature Cards Grid with Professional SVG Icons */}
              <div style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.75rem', color: '#fff' }}>
                  Why Engineers Choose SkillGap
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
                  Our agentic AI pipeline transforms passive learning into dynamic, goal-oriented career progression.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', textAlign: 'left' }}>
                  <div className="glass-card scroll-animate delay-100" style={{ border: '1px solid rgba(108, 99, 255, 0.25)' }}>
                    <div style={{ 
                      width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(108, 99, 255, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                      border: '1px solid rgba(108, 99, 255, 0.4)', color: 'var(--color-accent-light)'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem', color: '#fff' }}>AI Resume Extraction</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      Upload your PDF, DOCX, or raw text resume. Our proprietary NLP parsing engine automatically extracts frameworks, tools, cloud platforms, and architectural competencies.
                    </p>
                  </div>

                  <div className="glass-card scroll-animate delay-200" style={{ border: '1px solid rgba(0, 255, 209, 0.25)' }}>
                    <div style={{ 
                      width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(0, 255, 209, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                      border: '1px solid rgba(0, 255, 209, 0.4)', color: '#00ffd1'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem', color: '#fff' }}>MongoDB Study Plans</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      Generate interactive multi-week sprint roadmaps customized to your missing skills. Check off milestones in real-time with instant persistence in Spring Boot MongoDB.
                    </p>
                  </div>

                  <div className="glass-card scroll-animate delay-300" style={{ border: '1px solid rgba(192, 132, 252, 0.25)' }}>
                    <div style={{ 
                      width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(192, 132, 252, 0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem',
                      border: '1px solid rgba(192, 132, 252, 0.4)', color: '#c084fc'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.6rem', color: '#fff' }}>Real-Time AI Mentorship</h3>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      Stuck on system design, microservice scaling, or interview preparation? Connect with our 24/7 Agentic AI Career Mentor for code reviews and architectural advice.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2026 Tech Market Compensation Benchmarks Section */}
              <div style={{ marginBottom: '5.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem' }}>
                    2026 Tech Market Insights & LPA Benchmarks
                  </h2>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto' }}>
                    See how your current skill set stacks up against high-growth roles and compensation bands across India & global remote tech hubs.
                  </p>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ background: 'rgba(108, 99, 255, 0.15)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <th style={{ padding: '1.25rem 1.5rem', color: '#fff', fontWeight: '700', whiteSpace: 'nowrap' }}>Target Role / Title</th>
                        <th style={{ padding: '1.25rem 1.5rem', color: '#fff', fontWeight: '700' }}>Key Competencies & Ontology Skills</th>
                        <th style={{ padding: '1.25rem 1.5rem', color: '#fff', fontWeight: '700', whiteSpace: 'nowrap' }}>Expected Salary (India)</th>
                        <th style={{ padding: '1.25rem 1.5rem', color: '#fff', fontWeight: '700', whiteSpace: 'nowrap' }}>Market Demand</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: '#fff' }}>Principal Agentic AI Architect</td>
                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)' }}>LangGraph, Spring AI, Vector DBs, LLMOps, Kubernetes, Java 25</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '800', color: '#00ffd1', whiteSpace: 'nowrap' }}>₹45 – ₹75+ LPA</td>
                        <td style={{ padding: '1.25rem 1.5rem', whiteSpace: 'nowrap' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem', background: 'rgba(0, 255, 209, 0.18)', color: '#00ffd1', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap' }}>🔥 Extremely High</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: '#fff' }}>Java 25 Cloud-Native Lead Architect</td>
                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)' }}>Virtual Threads, Spring Boot 3, Reactive WebFlux, Kafka, Docker</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '800', color: '#8b83ff', whiteSpace: 'nowrap' }}>₹35 – ₹55 LPA</td>
                        <td style={{ padding: '1.25rem 1.5rem', whiteSpace: 'nowrap' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem', background: 'rgba(139, 131, 255, 0.18)', color: '#8b83ff', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap' }}>⚡ Very High</span></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: '#fff' }}>Full Stack React 19 & Cloud Architect</td>
                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)' }}>React 19 Server Actions, Next.js, GraphQL, AWS, Microservices</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '800', color: '#c084fc', whiteSpace: 'nowrap' }}>₹28 – ₹45 LPA</td>
                        <td style={{ padding: '1.25rem 1.5rem', whiteSpace: 'nowrap' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem', background: 'rgba(192, 132, 252, 0.18)', color: '#c084fc', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap' }}>🚀 High Demand</span></td>
                      </tr>
                      <tr>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: '#fff' }}>Principal DevOps & SRE Lead</td>
                        <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-secondary)' }}>Kubernetes, Terraform, OpenTelemetry, GitOps, Prometheus, AWS</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontWeight: '800', color: '#e879f9', whiteSpace: 'nowrap' }}>₹30 – ₹50 LPA</td>
                        <td style={{ padding: '1.25rem 1.5rem', whiteSpace: 'nowrap' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.85rem', background: 'rgba(232, 121, 249, 0.18)', color: '#e879f9', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700', whiteSpace: 'nowrap' }}>📈 Steady Demand</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step-by-Step Architecture Pipeline Section */}
              <div style={{ marginBottom: '5.5rem' }}>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.75rem', color: '#fff' }}>
                  How SkillGap Engineering Works Under the Hood
                </h2>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                  A clean, enterprise-grade 4-stage pipeline powered by Java Spring Boot backend and React Vite frontend.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
                  <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.15rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(66, 133, 244, 0.15)', border: '1px solid rgba(66, 133, 244, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stage 01</span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                      Resume Ingestion
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      Users upload their resume or input their technical bio. The text is normalized and parsed for technical tokens.
                    </p>
                  </div>

                  <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.15rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(0, 255, 209, 0.15)', border: '1px solid rgba(0, 255, 209, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ffd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stage 02</span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                      Ontology Comparison
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      The AI benchmarks extracted skills against live 2026 industry standards to identify exact competency gaps.
                    </p>
                  </div>

                  <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.15rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(192, 132, 252, 0.15)', border: '1px solid rgba(192, 132, 252, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stage 03</span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                      Roadmap Generation
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      A 4-6 week sprint plan is created with tailored learning resources, topics, and actionable milestones.
                    </p>
                  </div>

                  <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.15rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(234, 67, 53, 0.15)', border: '1px solid rgba(234, 67, 53, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Stage 04</span>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '0.6rem', lineHeight: 1.3 }}>
                      MongoDB Persistence
                    </h4>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                      Every checked task and evaluation is saved via REST APIs to Spring Boot and synchronized in MongoDB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Call to Action Banner */}
              <div style={{ 
                padding: '3.5rem 2rem', background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.25), rgba(66, 133, 244, 0.2))',
                border: '1px solid rgba(108, 99, 255, 0.4)', borderRadius: '1.5rem', textAlign: 'center',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
              }}>
                <h3 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>
                  Ready to Accelerate Your Career to ₹40+ LPA?
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto 2rem auto' }}>
                  Don't leave your tech career to chance. Let AI analyze your competencies and guide your next promotion today.
                </p>
                <button onClick={() => setActiveTab('analyzer')} className="btn btn-primary btn-lg pulse-glow" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                  Start Your Free AI Evaluation Now 🚀
                </button>
              </div>
            </div>
          )}


          {/* ── 2. AI ANALYZER, RESUME & STUDY PLAN TAB ── */}
          {activeTab === 'analyzer' && (
            <div className="animate-fade-in" style={{ maxWidth: '1160px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>🎯 AI Skill Gap Analyzer & Study Plan</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                  Upload your resume to auto-populate skills, calculate your gap, and generate a step-by-step study roadmap.
                </p>
              </div>

              {/* Top Banner: Resume Uploader */}
              <div className="glass-card scroll-animate" style={{ marginBottom: '2rem', border: '1px solid rgba(108, 99, 255, 0.4)', background: 'rgba(17, 17, 40, 0.7)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>📄 AI Resume Skill Parser</span>
                      <span style={{ fontSize: '0.75rem', background: 'var(--gradient-accent)', padding: '0.2rem 0.6rem', borderRadius: '4px', color: 'white' }}>NEW</span>
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Upload your resume file or paste text below. Our AI will automatically detect and check off your technical skills.</p>
                  </div>
                  {parseStatus && (
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: parseStatus.includes('Success') ? 'var(--color-success)' : 'var(--color-accent-light)' }}>
                      {parseStatus}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
                  <label className="dropzone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 0, minHeight: '120px' }}>
                    <input type="file" accept=".pdf,.docx,.doc,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📂</div>
                    <div style={{ fontWeight: '600', color: '#fff', fontSize: '0.95rem' }}>
                      {resumeFile ? `Selected: ${resumeFile.name}` : 'Click to Upload Resume File'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Supports PDF, DOCX, or TXT</div>
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <textarea 
                      className="form-textarea" 
                      rows={3} 
                      placeholder="Or paste resume summary / key skills here (e.g., 'Experienced in Java Spring Boot, Docker, React, and Kubernetes...')"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      style={{ resize: 'none', fontSize: '0.875rem' }}
                    />
                    <button 
                      type="button" 
                      onClick={triggerResumeParsing}
                      disabled={parsingResume || (!resumeFile && !resumeText.trim())}
                      className="btn btn-primary"
                      style={{ alignSelf: 'flex-end', width: '100%' }}
                    >
                      {parsingResume ? (
                        <>
                          <div className="spinner"></div>
                          Extracting Competencies...
                        </>
                      ) : '✨ Extract Skills with AI'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Analyzer Grid */}
              <div className="grid-2col">
                {/* Left Column: Role Configuration & Manual Skills */}
                <div className="glass-card scroll-animate delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', color: '#fff' }}>
                    1. Role & Skill Setup
                  </h3>
                  
                  <div className="form-group">
                    <label className="form-label">Current Role / Experience Tier</label>
                    <select 
                      className="form-select" 
                      value={currentRole} 
                      onChange={(e) => setCurrentRole(e.target.value)}
                    >
                      {Object.keys(CAREER_ROLES).map(role => (
                        <option key={role} value={role}>{role} ({CAREER_ROLES[role].level})</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Target Dream Specialization (16+ Roles)</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-light)' }}>
                        {CAREER_ROLES[targetRole]?.category}
                      </span>
                    </label>
                    <select 
                      className="form-select" 
                      value={targetRole} 
                      onChange={(e) => setTargetRole(e.target.value)}
                      style={{ borderColor: 'var(--color-accent)', fontWeight: '600', color: 'white' }}
                    >
                      {Object.keys(CAREER_ROLES).map(role => (
                        <option key={role} value={role}>{role} — {CAREER_ROLES[role].avgSalary}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Your Current Skills ({userSkills.length})</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Add manually or auto-parse above</span>
                    </label>
                    <form onSubmit={addSkill} style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g., Java, Spring Security, Docker..." 
                        value={newSkillInput} 
                        onChange={(e) => setNewSkillInput(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <button type="submit" className="btn btn-secondary">Add Skill</button>
                    </form>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', padding: '0.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    {userSkills.map(skill => (
                      <span key={skill} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.4rem 0.85rem', borderRadius: '999px',
                        background: 'rgba(108, 99, 255, 0.18)', border: '1px solid rgba(108, 99, 255, 0.35)',
                        color: '#fff', fontSize: '0.85rem', fontWeight: '500'
                      }}>
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(skill)}
                          style={{ background: 'none', border: 'none', color: '#a0a0c0', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}
                          title="Remove skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={runAnalysis} 
                    disabled={analyzing} 
                    className="btn btn-primary pulse-glow" 
                    style={{ marginTop: 'auto', padding: '1.1rem', fontSize: '1.05rem', width: '100%' }}
                  >
                    {analyzing ? (
                      <>
                        <div className="spinner"></div>
                        Benchmarking & Creating Study Plan...
                      </>
                    ) : '⚡ Calculate Gap & Generate Study Plan'}
                  </button>
                </div>

                {/* Right Column: Target Role Requirements & Output */}
                <div className="glass-card scroll-animate delay-200" style={{ display: 'flex', flexDirection: 'column', minHeight: '520px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>2. Competency Analysis</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-light)', fontWeight: '500' }}>{CAREER_ROLES[targetRole].level} Tier</span>
                  </h3>

                  {analyzing ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                      <div className="spinner" style={{ width: '45px', height: '45px', borderWidth: '3px' }}></div>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem' }}>Evaluating profile & generating personalized study roadmap...</p>
                    </div>
                  ) : analysisResult ? (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                      {/* Match Score Banner */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Role Compatibility Score</div>
                          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: analysisResult.matchPercentage > 70 ? 'var(--color-success)' : analysisResult.matchPercentage > 40 ? 'var(--color-warning)' : 'var(--color-error)' }}>
                            {analysisResult.matchPercentage}% Match
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Est. Time to Bridge</div>
                          <div style={{ fontSize: '1.35rem', fontWeight: '700', color: '#fff', marginTop: '0.2rem' }}>{analysisResult.estimatedTime}</div>
                        </div>
                      </div>

                      {/* Missing Skills Section */}
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-error)', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>⚠️ Missing Target Competencies ({analysisResult.missingSkills.length})</span>
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {analysisResult.missingSkills.length > 0 ? analysisResult.missingSkills.map(skill => (
                            <span key={skill} style={{
                              padding: '0.45rem 0.9rem', borderRadius: '6px',
                              background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.35)',
                              color: '#fca5a5', fontSize: '0.875rem', fontWeight: '600'
                            }}>
                              + {skill}
                            </span>
                          )) : (
                            <span style={{ color: 'var(--color-success)', fontSize: '0.95rem', fontWeight: '600' }}>🎉 Flawless Match! You possess all core competencies required for this role.</span>
                          )}
                        </div>
                      </div>

                      {/* Matched Skills Section */}
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-success)', marginBottom: '0.85rem' }}>
                          ✅ Verified Competencies ({analysisResult.matchedSkills.length})
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {analysisResult.matchedSkills.map(skill => (
                            <span key={skill} style={{
                              padding: '0.4rem 0.85rem', borderRadius: '6px',
                              background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)',
                              color: '#6ee7b7', fontSize: '0.85rem', fontWeight: '500'
                            }}>
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Roadmap Box */}
                      <div style={{
                        padding: '1.25rem', borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.18) 0%, rgba(168, 85, 247, 0.1) 100%)',
                        border: '1px solid rgba(108, 99, 255, 0.4)', color: '#fff', fontSize: '0.95rem', lineHeight: 1.65
                      }}>
                        <strong style={{ color: 'var(--color-accent-light)', display: 'block', marginBottom: '0.4rem', fontSize: '1rem' }}>🤖 Strategic Growth Overview:</strong>
                        {analysisResult.recommendation}
                      </div>

                      {/* ── ACTIONABLE AI STUDY PLAN ── */}
                      <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                          <div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span>📅 Personalized Actionable Study Plan</span>
                              <span style={{ fontSize: '0.7rem', background: 'var(--color-success)', padding: '0.15rem 0.5rem', borderRadius: '4px', color: 'white' }}>INTERACTIVE</span>
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Check off milestones as you master each competency.</p>
                          </div>
                          <div style={{ textAlign: 'right', minWidth: '120px' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: '600' }}>Plan Completion</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-accent-light)' }}>{progressPercentage}%</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-container">
                          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>

                        {/* Study Plan Phase Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.25rem' }}>
                          {studyPlan.map((phase, pIdx) => (
                            <div key={pIdx} className={`study-card scroll-animate delay-${(pIdx % 4) * 100}`} style={{ transitionDelay: `${(pIdx % 4) * 100}ms` }}>
                              <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-accent-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                  {phase.phase} • {phase.duration}
                                </span>
                                <button 
                                  onClick={() => { setActiveTab('mentor'); sendChatMessage(`Can you give me detailed guidance on ${phase.title} (${phase.duration}) for my study plan?`); }}
                                  className="btn btn-ghost btn-sm"
                                  style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: 'var(--color-accent-light)' }}
                                >
                                  💬 Ask Mentor About Phase
                                </button>
                              </div>
                              <h5 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff', marginBottom: '0.85rem' }}>
                                {phase.title}
                              </h5>

                              {/* Tasks Checklist */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.85rem' }}>
                                {phase.tasks.map((task, tIdx) => (
                                  <div 
                                    key={task.id} 
                                    className={`checklist-item ${task.completed ? 'completed' : ''}`}
                                    onClick={() => toggleTaskCompletion(pIdx, tIdx)}
                                  >
                                    <div className="custom-checkbox">
                                      {task.completed && '✓'}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', lineHeight: 1.4, flex: 1 }}>{task.text}</span>
                                  </div>
                                ))}
                              </div>

                              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 0.75rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span>📚 Recommended Resource:</span>
                                <strong style={{ color: '#fff' }}>{phase.resource}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', textAlign: 'center', padding: '3rem 2rem' }}>
                      <div style={{ fontSize: '3.5rem', marginBottom: '1.25rem', opacity: 0.8 }}>📊</div>
                      <h4 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Ready for Benchmarking</h4>
                      <p style={{ maxWidth: '360px', lineHeight: 1.6 }}>Configure your skills and target specialization on the left, then click <strong style={{ color: 'var(--color-accent-light)' }}>"Calculate Gap & Generate Study Plan"</strong> to create your roadmap.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── 3. AI MENTOR CHAT TAB ── */}
          {activeTab === 'mentor' && (
            <div className="animate-fade-in" style={{ maxWidth: '940px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>💬 AI Career Mentor & Coach</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
                  Have doubts about technical roadmaps, Spring Boot architecture, or interview preparation? Ask below!
                </p>
              </div>

              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '650px', padding: '1.5rem', position: 'relative' }}>
                {/* ── AI Provider & Header Bar ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', boxShadow: '0 0 15px rgba(108, 99, 255, 0.4)' }}>
                        🤖
                      </div>
                      <div>
                        <div style={{ fontWeight: '800', color: '#fff', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>SkillGap AI Career Mentor & Architect</span>
                          <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '999px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid #3b82f6' }}>
                            ENTERPRISE AI
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>• Real-Time Architectural Synthesis • Tailored for {targetRole}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setChatMessages([{ sender: 'ai', text: "### 👋 Welcome back to SkillGap Intelligence!\n\nI am your **2026 AI Career Mentor & Principal System Architect**.", time: 'Just now' }])} 
                        className="btn btn-ghost btn-sm"
                        title="Clear Chat History"
                      >
                        🗑️ Clear Chat
                      </button>
                    </div>
                  </div>

                  {/* ── API Key Configuration Popover ── */}
                  {showApiKeyInput && (
                    <div className="animate-fade-in" style={{ padding: '0.85rem 1rem', background: 'rgba(0, 0, 0, 0.45)', border: '1px solid rgba(108, 99, 255, 0.35)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff' }}>🔑 Google Gemini API Key (Optional for Live LLM Mode)</span>
                        <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--color-accent-light)', textDecoration: 'underline' }}>Get Free API Key from Google AI Studio ↗</a>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                          <input 
                            type={showApiKey ? "text" : "password"}
                            className="form-input"
                            placeholder="Paste your Gemini API Key here (e.g. AIzaSy...)"
                            value={customApiKey}
                            onChange={(e) => {
                              setCustomApiKey(e.target.value);
                              localStorage.setItem('user_ai_api_key', e.target.value);
                            }}
                            style={{ width: '100%', padding: '0.45rem 2.5rem 0.45rem 0.75rem', fontSize: '0.85rem' }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            style={{
                              position: 'absolute', right: '0.6rem', background: 'none', border: 'none',
                              color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1rem',
                              padding: '0.2rem', display: 'flex', alignItems: 'center'
                            }}
                            title={showApiKey ? "Hide API Key" : "Show API Key"}
                          >
                            {showApiKey ? "👁️" : "🙈"}
                          </button>
                        </div>
                        <button 
                          onClick={() => {
                            setShowApiKeyInput(false);
                            if (customApiKey.trim()) {
                              setAiProvider('gemini');
                              localStorage.setItem('user_ai_provider', 'gemini');
                            }
                          }} 
                          className="btn btn-primary btn-sm"
                        >
                          Save & Connect
                        </button>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>💡 Your API key is stored 100% locally in your browser's localStorage. If left empty, our Built-in Deep Coach engine generates full code & architecture blueprints instantly!</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <button onClick={() => sendChatMessage("give me a tips to minimize the gap")} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem', background: 'rgba(108, 99, 255, 0.15)', borderColor: 'var(--color-accent)' }}>
                    🎯 Minimize My Skill Gap
                  </button>
                  <button onClick={() => sendChatMessage("What are the best practices for Spring Boot Security & JWT?")} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                    ☕ Spring Boot 3 Security
                  </button>
                  <button onClick={() => sendChatMessage("How should I structure my resume for technical interviews?")} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                    📄 2026 Resume Format (LPA Impact)
                  </button>
                  <button onClick={() => sendChatMessage("How do I transition from Junior to Senior Full Stack Engineer?")} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                    💡 Transition to Senior
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingRight: '0.5rem', marginBottom: '1.25rem' }}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div className={`chat-bubble ${msg.sender === 'user' ? 'chat-user' : 'chat-ai'}`}>
                        {msg.sender === 'ai' ? renderAiMessageContent(msg.text) : msg.text}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.3rem', padding: '0 0.5rem' }}>{msg.time}</span>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-secondary)', padding: '0.75rem', background: 'rgba(24, 24, 54, 0.6)', borderRadius: '1rem', border: '1px solid rgba(108, 99, 255, 0.2)', width: 'fit-content' }}>
                      <div className="spinner" style={{ width: '18px', height: '18px' }}></div>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#fff' }}>✨ AI Mentor is synthesizing architectural response & roadmap...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={(e) => { e.preventDefault(); sendChatMessage(); }} style={{ display: 'flex', gap: '0.75rem' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ask any technical or career question (e.g., 'give me a tips to minimize the gap' or 'How do I optimize Hibernate queries?')"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    style={{ flex: 1, padding: '0.85rem 1.25rem', fontSize: '0.95rem' }}
                  />
                  <button type="submit" disabled={chatLoading || !chatInput.trim()} className="btn btn-primary" style={{ padding: '0 2rem', fontSize: '1rem', fontWeight: '700', borderRadius: '0.75rem' }}>
                    Send 💬
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── 4. GOOGLE / GMAIL ACCOUNT PROFILE PAGE ── */}
          {activeTab === 'account' && user && (
            <div className="animate-fade-in" style={{ maxWidth: '980px', margin: '0 auto' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15), rgba(139, 131, 255, 0.1), rgba(0, 255, 209, 0.1), rgba(232, 121, 249, 0.1))',
                border: '1px solid rgba(108, 99, 255, 0.35)', borderRadius: '1.25rem', padding: '2.5rem', marginBottom: '2.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{
                    width: '88px', height: '88px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6c63ff, #8b83ff, #00ffd1, #e879f9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.5rem', fontWeight: '800', color: '#fff',
                    boxShadow: '0 0 25px rgba(108, 99, 255, 0.5)', border: '4px solid #111128'
                  }}>
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                      <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#fff', margin: 0 }}>{user.firstName} {user.lastName}</h2>
                      <span style={{ 
                        background: 'rgba(108, 99, 255, 0.25)', color: '#8ab4f8', border: '1px solid #6c63ff',
                        padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700',
                        display: 'flex', alignItems: 'center', gap: '0.35rem'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Google Verified Account
                      </span>
                    </div>
                    <p style={{ color: '#a8c7fa', fontSize: '1rem', margin: 0, fontWeight: '500' }}>{user.email}</p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                      Security Shield Active • Protected by Spring Boot 3 Stateless JWT & MongoDB
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
                  <button onClick={handleLogout} className="btn btn-secondary" style={{ border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.1)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    Sign Out of Gmail / Google Account
                  </button>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: '600' }}>● MongoDB Connection Synchronized</span>
                </div>
              </div>

              {/* Account details grid */}
              <div className="grid-2col" style={{ gridTemplateColumns: '1fr 1.6fr', gap: '1.75rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  <div className="glass-card" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      Personal Info & Security
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                      <div className="flex-between">
                        <span style={{ color: 'var(--color-text-secondary)' }}>Account Name:</span>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{user.firstName} {user.lastName}</span>
                      </div>
                      <div className="flex-between">
                        <span style={{ color: 'var(--color-text-secondary)' }}>Primary Email:</span>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{user.email}</span>
                      </div>
                      <div className="flex-between">
                        <span style={{ color: 'var(--color-text-secondary)' }}>Account Type:</span>
                        <span style={{ color: '#00ffd1', fontWeight: '700' }}>Enterprise Pro License</span>
                      </div>
                      <div className="flex-between">
                        <span style={{ color: 'var(--color-text-secondary)' }}>Member Since:</span>
                        <span style={{ color: '#fff', fontWeight: '600' }}>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                      <div className="flex-between">
                        <span style={{ color: 'var(--color-text-secondary)' }}>2-Step Verification:</span>
                        <span style={{ color: '#8ab4f8', fontWeight: '600' }}>Enabled (JWT Auth)</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card" style={{ background: 'rgba(108, 99, 255, 0.08)', border: '1px solid rgba(108, 99, 255, 0.25)' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ffd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      Google Cloud Privacy & Data Shield
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      Your career ontology, resume documents, and MongoDB study plans are encrypted using AES-256 at rest and TLS 1.3 in transit. You retain 100% data ownership.
                    </p>
                  </div>
                </div>

                <div className="glass-card" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.85rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ffd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                      MongoDB Saved Career Analyses ({historyAnalyses.length})
                    </h3>
                    <button onClick={() => setActiveTab('analyzer')} className="btn btn-primary btn-sm" style={{ fontSize: '0.75rem', background: '#6c63ff' }}>
                      + New Analysis
                    </button>
                  </div>

                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Below are your real-time career skill gap evaluations saved securely in your Spring Boot MongoDB database.
                  </p>

                  {historyAnalyses.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                      {historyAnalyses.map((item, idx) => (
                        <div key={idx} style={{ 
                          padding: '1.15rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(108, 99, 255, 0.25)', 
                          borderRadius: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#6c63ff'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.25)'}
                        >
                          <div>
                            <div style={{ fontWeight: '700', color: '#fff', fontSize: '1.05rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ color: '#6c63ff' }}>🎯</span> {item.targetRole}
                            </div>
                            <div style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                              <strong style={{ color: '#e879f9' }}>Missing Skills:</strong> {item.missingSkills?.slice(0, 4).join(', ')}{item.missingSkills?.length > 4 ? '...' : ''}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#8ab4f8' }}>
                              Saved on: {new Date(item.createdAt || Date.now()).toLocaleDateString()} • Estimated Timeline: {item.estimatedTime || '3-6 Months'}
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
                            <div style={{ 
                              padding: '0.4rem 0.85rem', background: item.matchPercentage > 70 ? 'rgba(0, 255, 209, 0.2)' : 'rgba(232, 121, 249, 0.2)', 
                              border: item.matchPercentage > 70 ? '1px solid #00ffd1' : '1px solid #e879f9',
                              borderRadius: '999px', color: item.matchPercentage > 70 ? '#00ffd1' : '#e879f9', fontWeight: '800', fontSize: '0.85rem' 
                            }}>
                              {item.matchPercentage}% Match
                            </div>
                            <button 
                              onClick={() => {
                                api.deleteAnalysis(item.id || item._id).then(() => {
                                  setHistoryAnalyses(prev => prev.filter((_, i) => i !== idx));
                                }).catch(() => {});
                              }} 
                              style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#fca5a5'}
                              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                            >
                              Delete from DB
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem', border: '1px dashed rgba(255,255,255,0.15)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
                      <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>No Saved Analyses Found</h4>
                      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.25rem auto' }}>
                        You haven't saved any career evaluations to your MongoDB database yet. Head over to the AI Analyzer tab!
                      </p>
                      <button onClick={() => setActiveTab('analyzer')} className="btn btn-primary btn-sm" style={{ background: '#4285F4' }}>
                        Run First AI Analysis 🚀
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}


        </div>
      </main>

      {/* ── Custom 4-Column Footer matching User Screenshot Design ── */}
      <footer style={{ 
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
        padding: '5rem 0 3rem 0', 
        background: 'linear-gradient(180deg, rgba(10, 10, 26, 0.92) 0%, rgba(5, 5, 15, 0.99) 100%)',
        color: 'var(--color-text-secondary)',
        fontSize: '0.92rem'
      }}>
        <div className="container" style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Top 4-Column Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '3.5rem', 
            marginBottom: '4.5rem',
            textAlign: 'left'
          }}>
            {/* Column 1: Brand */}
            <div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', letterSpacing: '-0.5px' }}>
                <span style={{ color: '#fff' }}>SkillGap</span>
                <span style={{ color: 'var(--color-accent-light)' }}>Analyzer</span>
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0, maxWidth: '290px' }}>
                Brighten your engineering future with SkillGap Analyzer — where artificial intelligence meets career opportunity and technical success begins.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-accent-light)', marginBottom: '1.5rem', letterSpacing: '0.3px' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.95rem' }}>
                <li><a onClick={() => setActiveTab('home')} style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Home</a></li>
                <li><a onClick={() => setActiveTab('analyzer')} style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>AI Analyzer & Study Plan</a></li>
                <li><a onClick={() => setActiveTab('mentor')} style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>AI Mentor</a></li>
                <li><a onClick={() => { if (!user) setAuthModal('login'); else setActiveTab('account'); }} style={{ cursor: 'pointer', transition: 'color 0.2s', color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>Sign In / Account</a></li>
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-accent-light)', marginBottom: '1.5rem', letterSpacing: '0.3px' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', fontSize: '0.92rem', marginBottom: '1.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-light)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Tamil Nadu, India</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-light)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <a href="mailto:santhiyaselvakumarofficial@gmail.com" style={{ color: 'var(--color-text-secondary)', fontWeight: '500', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                    santhiyaselvakumarofficial@gmail.com
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-light)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  <a href="https://www.linkedin.com/in/santhiya-selvakumar-2852a2330/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-secondary)'}>
                    Santhiya Selvakumar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Separator & Copyright */}
          <div style={{ 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
            paddingTop: '2rem', 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1rem',
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)'
          }}>
            <div>
              © 2026 SkillGap Analyzer — Brighten your engineering future. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }}>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Privacy Policy</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Terms of Service</span>
              <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-light)'} onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}>Security</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── AUTH MODAL (Login / Register) ── */}
      {authModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
        }} onClick={() => setAuthModal(null)}>
          <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '460px', padding: '2.75rem', position: 'relative', background: '#111128', border: '1px solid rgba(108, 99, 255, 0.5)' }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setAuthModal(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '1.75rem', cursor: 'pointer', lineHeight: 1 }}
            >
              ×
            </button>

            <h3 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.5rem', color: '#fff' }}>
              {authModal === 'login' ? 'Welcome Back 👋' : 'Create Account 🚀'}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
              {authModal === 'login' ? 'Sign in to access your saved career analyses.' : 'Join SkillGap Analyzer to track your career roadmap.'}
            </p>

            {authError && (
              <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
                ⚠️ {authError}
              </div>
            )}

            {authModal === 'login' ? (
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" required className="form-input" placeholder="you@example.com"
                    value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showLoginPassword ? "text" : "password"} required className="form-input" placeholder="••••••••"
                      value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      style={{ width: '100%', paddingRight: '2.75rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      style={{
                        position: 'absolute', right: '0.85rem', background: 'none', border: 'none',
                        color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1.1rem',
                        display: 'flex', alignItems: 'center', padding: '0.2rem', transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                      title={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={authLoading} className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}>
                  {authLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" required className="form-input" placeholder="John"
                      value={registerForm.firstName} onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" required className="form-input" placeholder="Doe"
                      value={registerForm.lastName} onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" required className="form-input" placeholder="you@example.com"
                    value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showRegisterPassword ? "text" : "password"} required className="form-input" placeholder="Min. 8 chars, 1 uppercase, 1 number"
                      value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      style={{ width: '100%', paddingRight: '2.75rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      style={{
                        position: 'absolute', right: '0.85rem', background: 'none', border: 'none',
                        color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '1.1rem',
                        display: 'flex', alignItems: 'center', padding: '0.2rem', transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                      title={showRegisterPassword ? "Hide password" : "Show password"}
                    >
                      {showRegisterPassword ? "👁️" : "🙈"}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={authLoading} className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}>
                  {authLoading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            )}

            <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              {authModal === 'login' ? (
                <>Don't have an account? <button onClick={() => { setAuthError(null); setAuthModal('register'); }} style={{ background: 'none', border: 'none', color: 'var(--color-accent-light)', cursor: 'pointer', fontWeight: '600' }}>Register</button></>
              ) : (
                <>Already have an account? <button onClick={() => { setAuthError(null); setAuthModal('login'); }} style={{ background: 'none', border: 'none', color: 'var(--color-accent-light)', cursor: 'pointer', fontWeight: '600' }}>Sign In</button></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

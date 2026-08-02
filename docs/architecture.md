# Architecture: AI-Powered Discovery Engine — Blinkit Category Exploration

This document describes the end-to-end system architecture for the **Blinkit AI Discovery Engine Graduation Project**. It is derived directly from [context.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/context.md), [problemstatement.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/problemstatement.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md).

---

## 1. Executive Architecture Summary & Design Goals

The platform is designed as a multi-tier intelligence architecture for customer insight synthesis:

* **AI Discovery Engine (Backend Intelligence):** Scrapes 10 customer feedback channels (157,630 raw feedback corpus), normalizes and vectorizes records into a local ChromaDB vector index, executes a **6-Agent AI Analysis Layer**, constructs an interconnected **Behavior Graph**, and enforces a **4-Tier Quality Validation Engine** (Groq Llama-3.1 + HuggingFace Llama-3.2 Multi-LLM Consensus 2/3 Rule, statistical confidence scoring, 200-review human audit benchmark, 20 user interviews).
* **Executive Intelligence Dashboard (Frontend Application):** Interactive React dashboard displaying validated insights, behavior graphs, research question filters, and live single-inference sandbox analysis.

---

## 2. End-to-End System Architecture

```mermaid
graph TD
    %% INGESTION & DATA PROCESSING
    subgraph Ingestion [10 Feedback Ingestion Channels]
        PlayStore[Play Store Reviews] --> RawStore[(Local Data Lake / JSONL Store)]
        AppStore[App Store Reviews] --> RawStore
        Reddit[Reddit API] --> RawStore
        Twitter[Twitter/X Scraper] --> RawStore
        YouTube[YouTube Comments] --> RawStore
        Quora[Quora Answers] --> RawStore
        Forums[Consumer Forums] --> RawStore
        Blinkit[Blinkit App Reviews] --> RawStore
        Zepto[Zepto Competitor Reviews] --> RawStore
        Instamart[Instamart Competitor Reviews] --> RawStore
    end

    subgraph Pipeline [Data Pipeline & Vectorization]
        RawStore --> Cleaner[Text Normalizer & PII Stripper]
        Cleaner --> Deduplicator[SHA-256 & Jaccard Deduplicator]
        Deduplicator --> Embeddings[Sentence-Transformers MiniLM-L6-v2]
        Embeddings --> VectorDB[(Local Vector DB: ChromaDB)]
    end

    %% 6-AGENT AI ENGINE & CONSENSUS
    subgraph Agents [6-Agent AI Analysis Engine]
        VectorDB --> Agent1[Agent 1: Theme Extraction]
        VectorDB --> Agent2[Agent 2: Emotion Agent]
        VectorDB --> Agent3[Agent 3: Habit Loop Detector]
        VectorDB --> Agent4[Agent 4: JTBD Need Agent]
        VectorDB --> Agent5[Agent 5: Segment Archetype]
        VectorDB --> Agent6[Agent 6: Contradiction Agent]
    end

    subgraph Validation [Behavior Graph & Consensus Validation]
        Agent1 & Agent2 & Agent3 & Agent4 & Agent5 & Agent6 --> BehaviorGraph[Behavior Graph Builder]
        BehaviorGraph --> MultiLLM[Multi-LLM Consensus 2/3 Rule: Groq Llama-3.1 + HF Llama-3.2]
        MultiLLM --> ValidationStore[(Validated Insights Store)]
    end

    %% FRONTEND PRESENTATION LAYER
    subgraph Frontend_App [Frontend Presentation Layer: Vite + React]
        InsightsDashboard[Executive Insights Dashboard]
        SandboxUI[Interactive Sandbox UI]
        ThemesUI[AI Themes Explorer UI]
        BehaviorGraphUI[Behavior Graph Visualizer UI]

        ValidationStore --> InsightsDashboard
        ValidationStore --> ThemesUI
        BehaviorGraph --> BehaviorGraphUI
    end

    subgraph FastAPIBackend [FastAPI Backend Service: Railway / Render]
        BackendRoutes[FastAPI REST API /api/v1/*]
    end

    FastAPIBackend <--> InsightsDashboard
    FastAPIBackend <--> SandboxUI

    subgraph LiveLink [Vercel Deployment]
        DeploymentApp[blinkit-discovery-engine.vercel.app]
    end
```

---

## 3. Core System Components

### 3.1 AI Discovery Engine Backend
- **Ingestion & Vector DB:** Python async scrapers parsing 10 feedback channels $\rightarrow$ ChromaDB vector collection (`src/app/api/data_loader.py`).
- **6-Agent Intelligence Layer:** Theme, Emotion, Habit Loop, JTBD, Segment Archetype, Contradiction detection (`src/app/agents/`).
- **Consensus & Graph:** 30-Node Behavior Graph $\rightarrow$ Multi-LLM 2/3 Consensus Validation (`src/app/analysis/`).

### 3.2 Executive Intelligence Dashboard
- Interactive React dashboard (`frontend/src/components/ExecutiveSummary.jsx`, `BehaviorGraphView.jsx`, `ConsensusReportModal.jsx`).

---

## 4. Production Deployment & Live Platform

> **Live Production Platform:** [https://blinkit-discovery-engine.vercel.app/](https://blinkit-discovery-engine.vercel.app/)

---

*Derived from [context.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/context.md), [problemstatement.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/problemstatement.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md)*




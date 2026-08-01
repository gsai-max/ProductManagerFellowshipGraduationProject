# Phase-Wise Detailed Implementation Plan: AI-Powered Discovery Engine & AI-Native MVP

This implementation plan outlines the step-by-step engineering roadmap for building the **Blinkit Category Exploration Graduation Project**. It translates the core requirements, architecture blueprints, data flows, and component designs defined in [context.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/context.md), [problemstatement.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/problemstatement.md), [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md) into concrete actionable engineering phases.

---

## 1. Requirements Traceability Matrix

| Req ID | Requirement Description | Domain | Component / Module | Live Deployment Link Target |
|---|---|---|---|---|
| **REQ-01 – REQ-10** | 10 Feedback Ingestion Channels (App Store, Play Store, Reddit, Twitter, YouTube, Quora, Forums, Blinkit App, Zepto, Instamart) | Part 1 | `src/app/api/data_loader.py` | **Part 1 Link (Preserved):** `https://product-manager-fellowship-graduati.vercel.app/` |
| **REQ-11 – REQ-16** | 6 Specialized AI Analysis Agents (Theme, Emotion, Habit, JTBD, Segment, Contradiction) | Part 1 | `src/app/models/domain.py` & Agent Engine | **Part 1 Link (Preserved):** `https://product-manager-fellowship-graduati.vercel.app/` |
| **REQ-17 – REQ-25** | 30-Node Behavior Graph, 4-Tier Validation Engine (Multi-LLM 2/3 Consensus), Part 1 Intelligence Dashboard | Part 1 | `frontend/src/components/ExecutiveSummary.jsx` | **Part 1 Link (Preserved):** `https://product-manager-fellowship-graduati.vercel.app/` |
| **REQ-26 – REQ-30** | HMW Opportunity Matrix (6 Frames) & RICE Solution Prioritization Engine (4 Candidates) | Part 2 | `src/app/strategy/hmw_generator.py` & `rice_evaluator.py` | **Part 2 Link (Separate Deployment):** `https://blinkit-discovery-engine.vercel.app/` |
| **REQ-31 – REQ-34** | AI Category Discovery Assistant MVP Widget & Mission Intelligence Platform (MIP) | Part 2 | `AICategoryAssistantWidget.jsx` & `MissionIntelligencePlatform.jsx` | **Part 2 Link (Separate Deployment):** `https://blinkit-discovery-engine.vercel.app/` |
| **REQ-35 – REQ-36** | MVP Telemetry & A/B Experiment Engine, 3-Phase GTM Strategy Memos & Edge Case Matrix | Part 2 | `src/app/mvp/telemetry.py` & `MVPTelemetryDashboard.jsx` | **Part 2 Link (Separate Deployment):** `https://blinkit-discovery-engine.vercel.app/` |

---

## 2. Dual-Link Isolation Deployment Policy

> [!IMPORTANT]
> **Deployment Policy:**
> - **Part 1 Live Link (Preserved):** `https://product-manager-fellowship-graduati.vercel.app/` remains untouched and preserved for evaluating Part 1 intelligence insights.
> - **Part 2 Live MVP Link (Dedicated Separate Vercel Project):** `https://blinkit-discovery-engine.vercel.app/` is deployed independently for the AI-Native MVP feature, strategy tables, and A/B telemetry.

---

## 3. Phase-by-Phase Implementation Roadmap

### Phase 1: Environment & Foundation Setup
- Initialize Python FastAPI backend environment (`src/app/`) and Vite React frontend (`frontend/`).
- Set up domain data models, schemas, and logging infrastructure (`src/app/models/`).

### Phase 2: Multi-Source Data Collection & Vector Ingestion
- Implement data loader (`src/app/api/data_loader.py`) for parsing 157,630 raw customer feedback records across 10 channels.
- Build sentence vectorization pipeline (`MiniLM-L6-v2`) and local ChromaDB index.

### Phase 3: 6-Agent AI Analysis Engine & Behavior Graph
- Implement 6 specialized AI agents (Theme Extraction, Emotion, Habit Loop, JTBD Need, Segment Archetype, Contradiction).
- Construct 30-node interconnected Behavior Graph linking habit loops to friction nodes.

### Phase 4: 4-Tier Quality Validation Engine
- Implement Multi-LLM 2/3 Consensus Engine (Groq Llama-3.1 + HuggingFace Llama-3.2).
- Integrate statistical confidence scoring, 200-review human audit benchmark, and 20 user interview validations.

### Phase 5: Pattern Detection, Hypothesis & Closed-Loop Learning Engine
- Build continuous pattern detection and automated hypothesis generation (`hypotheses.json`, `experiments.json`).
- Implement closed-loop confidence score updates based on empirical outcome feedback.

### Phase 6: Part 1 Core API Server & Executive Intelligence Dashboard
- Build REST API endpoints serving insights, behavior graph, and research question filters.
- Deploy Part 1 Intelligence Dashboard to Vercel (`https://product-manager-fellowship-graduati.vercel.app/`).

### Phase 6.5: Part 2 Product Strategy & Prioritization Domain (`src/app/strategy/`)
- **HMW Generator (`hmw_generator.py`)**: Generate 6 HMW opportunity categories mapped to habit friction points.
- **RICE Evaluator (`rice_evaluator.py`)**: Prioritize candidate solutions (AI Assistant, Trial Bundles, Contextual Nudges, Social Badges) and score AI Assistant as #1 MVP candidate (RICE score: 720.0).
- **Strategy Documentation**: Publish `docs/category-expansion-strategy-memo.md` and `docs/solution-prioritization-strategy.md`.

### Phase 7: Part 2 Production AI-Native MVP & A/B Telemetry Engine
- **AI Category Assistant Widget (`AICategoryAssistantWidget.jsx`)**: Interactive widget offering cross-category recommendations, dynamic trial discounts, and interactive prompt suggestions (`src/app/strategy/assistant_engine.py`).
- **Mission Intelligence Platform (`MissionIntelligencePlatform.jsx`)**: Real-time strategic intelligence dashboard (`src/app/strategy/mip_engine.py`).
- **MVP Telemetry Engine (`src/app/mvp/telemetry.py` & `MVPTelemetryDashboard.jsx`)**: Real-time telemetry tracking for North Star Metric, secondary metrics, guardrail metrics, and live A/B experiment variants.
- **GTM Report & Edge Cases**: Publish `docs/strategic-analysis-report.md` and `docs/edge-case.md`.

### Phase 8: Production Deployment & Verification
- Deploy backend service to Railway/Render exposing `/api/v1/*`, `/api/v1/strategy/*`, and `/api/v1/mvp/*`.
- Deploy Part 2 Frontend to dedicated Vercel project (`https://blinkit-discovery-engine.vercel.app/`).
- Execute full verification suite (`pytest tests/ -v`).

---

## 4. Milestones & Expected Deliverables Summary

| Milestone | Deliverable File/Path | Expected Outcome | Verification Metric |
|---|---|---|---|
| **Milestone 1** | `src/app/models/domain.py` & `strategy_domain.py` | Core domain & strategy data models | `pytest` test suite passes cleanly |
| **Milestone 2** | `src/app/api/data_loader.py` | 10-channel feedback ingestion pipeline | 157,630 raw records parsed into vector DB |
| **Milestone 3** | `src/app/strategy/rice_evaluator.py` | RICE evaluation matrix for 4 solutions | AI Category Assistant scored #1 (720.0) |
| **Milestone 4** | `src/app/strategy/hmw_generator.py` | 6 HMW opportunity framing statements | HMW opportunity matrix rendered in UI |
| **Milestone 5** | `AICategoryAssistantWidget.jsx` | AI-Native MVP Category Assistant Widget | Contextual recommendations & discounts functional |
| **Milestone 6** | `src/app/mvp/telemetry.py` | Telemetry & live A/B experimentation engine | Real-time tracking of North Star & guardrail metrics |
| **Milestone 7** | `tests/test_*.py` (7 test modules) | Full backend & strategy engine test suite | `pytest` 100% test pass rate |
| **Milestone 8** | Production Deployments | Dual-link isolated Vercel deployments | Part 1 & Part 2 live URLs returning healthy status |

---

## 5. Automated & Manual Verification Plan

### Automated Tests
```powershell
# Execute complete backend and strategy domain test suite
.venv\Scripts\pytest tests/ -v
```

### Manual Verification
1. **Part 1 Dashboard Verification:** Verify 10-channel feedback insights, research question filters, and behavior graph rendering at `https://product-manager-fellowship-graduati.vercel.app/`.
2. **Part 2 MVP Widget & Strategy Verification:** Test AI Assistant recommendations, HMW matrix, RICE strategy table, and live A/B telemetry dashboard at `https://blinkit-discovery-engine.vercel.app/`.
3. **API Endpoint Verification:** Confirm `/api/v1/strategy/*` and `/api/v1/mvp/*` endpoints return valid JSON response structures.

---

*Derived from [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md), [context.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/context.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md)*


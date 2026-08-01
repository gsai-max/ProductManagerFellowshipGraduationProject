# Context Document — Blinkit Category Exploration Project

## 1. Role & Ownership

| Field | Detail |
|---|---|
| **Role** | Product Manager, Growth Team |
| **Company** | Blinkit (quick-commerce platform) |
| **Fellowship** | NextLeap Product Manager Fellowship — Graduation Project |

---

## 2. Platform & Q-Commerce Domain Context

- **Industry:** Quick commerce (Q-commerce) — ultra-fast delivery of groceries and daily essentials.
- **Platform:** Blinkit — India's premier quick-commerce platform delivering groceries, snacks, household items, electronics, and personal care in minutes.
- **Current State:** Deep product-market fit established for routine/habitual purchases (groceries, dairy, beverages). However, user shopping patterns are hyper-repetitive: 85.8% of MAC stick strictly to 1–2 familiar categories.

---

## 3. Core Problem & Strategic Goal

> **Core Problem:** Users' shopping behavior on Blinkit has become **highly repetitive**. They repeatedly buy from the same familiar categories and **rarely explore new categories** available on the platform due to habit loops, risk aversion, lack of contextual discovery, and trust friction.

### Strategic Goal (North Star)
> **Increase the percentage of Monthly Active Customers (MAC) who purchase products from at least one new category every month.**
> - **Baseline:** 14.2% MAC
> - **MVP Target:** 22.5% MAC (+8.3% expansion)

---

## 4. Graduation Project Mandate & Dual-Link Deployment Policy

The project is structured into two core parts in accordance with [docs/problemstatement.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/problemstatement.md) and [docs/deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md):

* **Part 1:** Build an AI-Powered Discovery Engine (Data Scraping, 6 AI Agents, Behavior Graph, Quality Validation).  
  🔗 **Live Link (UNTOUCHED / PRESERVED):** [https://product-manager-fellowship-graduati.vercel.app/](https://product-manager-fellowship-graduati.vercel.app/)
* **Part 2:** Product Strategy, Solutions & Production AI-Native MVP Deployment.  
  🔗 **Live Link (SEPARATE DEDICATED MVP DEPLOYMENT):** [https://blinkit-discovery-engine.vercel.app/](https://blinkit-discovery-engine.vercel.app/) (Separate dedicated Vercel deployment).

---

## 5. Part 1 Mandate — Multi-Agent AI Discovery Engine

- **Data Corpus:** 10 feedback ingestion channels (Play Store, App Store, Reddit, Twitter/X, YouTube, Quora, Forums, Blinkit App Reviews, Zepto Reviews, Instamart Reviews).
- **6 Specialized AI Agents:** Theme Extraction, Emotion Agent, Habit Loop Detector, JTBD Need Agent, Segment Archetype, Contradiction Agent.
- **Behavior Graph:** 30-Node interconnected knowledge graph mapping habits, friction points, and category affinities.
- **4-Tier Quality Validation Engine:** Groq Llama-3.1 + HuggingFace Llama-3.2 Multi-LLM 2/3 Consensus Rule, statistical confidence scoring, 200-review human audit benchmark, 20 user interviews.

---

## 6. Part 2 Mandate — Product Strategy, AI-Native MVP Build & Telemetry

- **Opportunity Identification & HMW Framing:** 6 structured HMW opportunity areas (`src/app/strategy/hmw_generator.py`, `HMWOpportunityMatrix.jsx`).
- **RICE Strategy & Solution Prioritization:** Prioritization of 4 product solutions (`src/app/strategy/rice_evaluator.py`, `RICEStrategyTable.jsx`), selecting **AI Category Discovery Assistant** as #1 MVP candidate.
- **AI-Native MVP Feature Build:** Interactive AI Category Assistant widget (`AICategoryAssistantWidget.jsx`), contextual trial recommendations, dynamic discount nudges, and smart trial bundles.
- **Mission Intelligence Platform (MIP):** Real-time strategic intelligence dashboard (`MissionIntelligencePlatform.jsx`, `src/app/strategy/mip_engine.py`).
- **MVP Telemetry & A/B Experimentation Engine:** Real-time tracking of North Star Metric, secondary metrics, guardrail metrics, and live A/B variant performance (`src/app/mvp/telemetry.py`, `MVPTelemetryDashboard.jsx`).
- **Design System Integration:** High-fidelity UI mockups and design tokens (`designsystem/screen.png`, `screen1.png`, `screen2.png`, `screen3.png`).

---

## 7. Repository Codebase & Strategy Artifact Map

- **Strategy Domain Backend Modules:** [`src/app/models/strategy_domain.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/models/strategy_domain.py), [`src/app/strategy/rice_evaluator.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/strategy/rice_evaluator.py), [`src/app/strategy/hmw_generator.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/strategy/hmw_generator.py), [`src/app/strategy/mip_engine.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/strategy/mip_engine.py), [`src/app/strategy/assistant_engine.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/strategy/assistant_engine.py).
- **MVP Telemetry Backend:** [`src/app/mvp/telemetry.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/mvp/telemetry.py).
- **Frontend UI Components:** [`frontend/src/components/HMWOpportunityMatrix.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/HMWOpportunityMatrix.jsx), [`frontend/src/components/RICEStrategyTable.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/RICEStrategyTable.jsx), [`frontend/src/components/AICategoryAssistantWidget.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/AICategoryAssistantWidget.jsx), [`frontend/src/components/MVPTelemetryDashboard.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/MVPTelemetryDashboard.jsx), [`frontend/src/components/MissionIntelligencePlatform.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/MissionIntelligencePlatform.jsx).
- **Strategy & Analysis Documents:** [`docs/category-expansion-strategy-memo.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/category-expansion-strategy-memo.md), [`docs/solution-prioritization-strategy.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/solution-prioritization-strategy.md), [`docs/strategic-analysis-report.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/strategic-analysis-report.md), [`docs/edge-case.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/edge-case.md).

---

*Document updated for NextLeap Product Manager Fellowship — Graduation Project*


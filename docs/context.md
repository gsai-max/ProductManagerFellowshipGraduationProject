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

## 4. Graduation Project Mandate & Live Deployment

The project is structured as an end-to-end product initiative in accordance with [docs/problemstatement.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/problemstatement.md) and [docs/deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md):

* **Live Deployment Platform:**  
  🔗 **Live Link:** [https://blinkit-discovery-engine.vercel.app/](https://blinkit-discovery-engine.vercel.app/)

---

## 5. Multi-Agent AI Discovery Engine

- **Data Corpus:** 10 feedback ingestion channels (Play Store, App Store, Reddit, Twitter/X, YouTube, Quora, Forums, Blinkit App Reviews, Zepto Reviews, Instamart Reviews).
- **6 Specialized AI Agents:** Theme Extraction, Emotion Agent, Habit Loop Detector, JTBD Need Agent, Segment Archetype, Contradiction Agent.
- **Behavior Graph:** 30-Node interconnected knowledge graph mapping habits, friction points, and category affinities.
- **4-Tier Quality Validation Engine:** Groq Llama-3.1 + HuggingFace Llama-3.2 Multi-LLM 2/3 Consensus Rule, statistical confidence scoring, 200-review human audit benchmark, 20 user interviews.

---

---

## 6. Repository Codebase & Artifact Map

- **AI Engine Backend Modules:** [`src/app/api/data_loader.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/api/data_loader.py), [`src/app/analysis/closed_loop_learner.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/analysis/closed_loop_learner.py), [`src/app/services/orchestrator.py`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/src/app/services/orchestrator.py).
- **Frontend UI Components:** [`frontend/src/components/ExecutiveSummary.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/ExecutiveSummary.jsx), [`frontend/src/components/BehaviorGraphView.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/BehaviorGraphView.jsx), [`frontend/src/components/ConsensusReportModal.jsx`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/frontend/src/components/ConsensusReportModal.jsx).
- **Documentation:** [`docs/problemstatement.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/problemstatement.md), [`docs/architecture.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md), [`docs/implementation-plan.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/implementation-plan.md), [`docs/edge-case.md`](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/edge-case.md).

---

*Document updated for NextLeap Product Manager Fellowship — Graduation Project*



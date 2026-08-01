# Blinkit Discovery Engine & AI-Native MVP — Edge Cases and Failure Modes

This document catalogs the corner cases, failure modes, and mitigation strategies across every layer of the Blinkit Category Exploration project. It is organized by system layer as defined in [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md) and covers both **Part 1 (AI Discovery Engine)** and **Part 2 (Product Strategy & Production AI-Native MVP)**.

---

## 1. Data Collection Layer — Scrapers (Part 1)

This offline layer scrapes public reviews, discussions, and social media posts from 10 platforms.

### 1.1 Play Store Scraper
* **Rate Limits:** Throttled batching (batches of 200 with 2–5s sleep delays).
* **Null Reviews:** Skip records with `len(text) < 5`.
* **Encoding:** Force UTF-8 encoding.

### 1.2 App Store Scraper
* **Region Limits:** Query India (`in`) store first; fallback to `us`/`gb` stores if volume < 500.
* **Library Instability:** Retry loop with exponential backoff (max 3 attempts).

### 1.3 Reddit Scraper
* **OAuth Expiry:** Use PRAW auto-refresh token.
* **Rate Limits:** 1.5-second sleep delays between subreddits.
* **Noise:** Post-scrape relevance filter (discard score < 0.3).

### 1.4 Twitter/X Scraper
* **API Restrictions:** Multi-fallback strategy (snscrape $\rightarrow$ API v2 $\rightarrow$ curated dataset).
* **Hinglish Code-Switching:** Hinglish-aware LLM prompts for native multi-lingual processing.

### 1.5 Forum & Blog Crawler
* **Robots.txt:** Strict ethical compliance; skip blocked domains.
* **Domain Parsers:** Dedicated parsing functions per target domain.

---

## 2. Data Processing Layer — Clean, Deduplicate, Enrich (Part 1)

### 2.1 Text Cleaning & Normalization
* **Mixed Scripts:** Preserve currency (₹), ratings (★), and transliterated Hinglish words; remove URLs and HTML.
* **Short Reviews:** Filter < 5 words; tag 5–10 word reviews as `low_signal = true`.
* **Spam Detection:** Filter repetitive non-specific praise tags (`is_spam = true`).

### 2.2 Deduplication
* **Near-Duplicates:** Jaccard similarity $\ge 85\%$ deduplication.
* **Temporal Updates:** Retain latest review version per user.

### 2.3 Sentiment & Tagging
* **Sarcasm Handling:** LLM-based sentiment classification with explicit sarcasm instructions.
* **Multi-Label Tagging:** Open multi-label JSON array taxonomy.

---

## 3. LLM Analysis Layer — Theme Extraction & Insight Synthesis (Part 1)

### 3.1 Theme Extraction
* **Hallucination Prevention:** **Quote Grounding Assertion** — themes must map to verifiable `record_id` substrings.
* **Research Question Mapping:** Explicit mapping to Q1–Q8; flag unmapped themes.

### 3.2 Multi-LLM Consensus & Validation
* **2/3 Majority Rule:** Consensus enforced across Groq Llama-3.1, HuggingFace Llama-3.2, and Open Models.
* **Human Audit Benchmark:** 200-review manual audit ($\ge 90\%$ target agreement).

---

## 4. FastAPI Backend & API Layer (Part 1 & Part 2)

* **Startup Readiness:** Validate `LLM_API_KEY` on startup via `pydantic-settings`.
* **Graceful Fallback:** Serve static pre-computed cache (`data/insights/`) if pipeline is offline.
* **CORS Middleware:** Configure CORS `allow_origin_regex` to support both Part 1 and Part 2 Vercel domains.

---

## 5. React Frontend Dashboard & Design System (Part 1 & Part 2)

* **Design System Assets:** UI components anchored in `designsystem/` (`screen.png`, `screen1.png`, `screen2.png`, `screen3.png`).
* **Empty/Loading States:** Animated shimmer skeletons and designed empty state components.
* **Sample Data Fallback:** Fallback to bundled `sample_insights.json` if live API is unreachable after 2 retries.

---

## 6. Part 2 Edge Cases: Product Strategy & Opportunity Engine

This layer translates validated Part 1 behavioral insights into structured opportunity frames and prioritized product features.

### 6.1 HMW Opportunity Framing Engine

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **Disconnection** | Friction Node Has Zero HMW Templates | A behavior graph friction node does not match pre-defined HMW generation rules. | **MEDIUM** | **Fallback HMW Template:** Apply general cross-category trial frame: `"How might we lower risk perception for [User Archetype] when exploring non-grocery categories?"` |
| **Scope Creep** | Overly Broad HMW Statement | HMW statement is too generic (e.g., "How might we make Blinkit better?"). | **HIGH** | **Strict HMW Grammar Schema:** Enforce structure: `How might we [action] for [archetype] so that [desired outcome]?` Validator rejects invalid schemas. |

### 6.2 RICE Prioritization Matrix Engine

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **Division by Zero** | Effort Set to 0 | A user or model inputs 0 person-weeks for effort. | **CRITICAL** | **Minimum Effort Bound:** Enforce `effort = max(0.5, input_effort)` to prevent zero-division runtime errors. |
| **Subjective Bias** | Unjustified High Impact Score | Feature assigned an Impact of 5.0 without supporting confidence evidence. | **HIGH** | **Confidence Scaling:** Multiply Confidence score (%) directly into the numerator: $\text{RICE} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}$. Low confidence automatically penalizes inflated impact scores. |
| **Score Ties** | Identical RICE Scores | Two features yield the exact same RICE score (e.g. 850 vs 850). | **LOW** | **Multi-Tier Tie Breaker:** Secondary sort by **Reach** (higher reach wins), tertiary sort by **Effort** (lower effort wins). |

---

## 7. Part 2 Edge Cases: Production AI-Native MVP Feature (AI Category Assistant)

This section details edge cases for the user-facing **AI Category Discovery Assistant** widget and dynamic trial recommendation engine.

### 7.1 Cold-Start & Inventory Availability

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **Empty Cart** | Cold-Start Cart Experience | User opens the AI Assistant widget with an empty shopping cart. | **MEDIUM** | **Trending Category Baseline:** Serve top non-grocery trending discovery items based on universal Habit Loop data (e.g., "Popular Personal Care items for 10-min delivery"). |
| **Out-of-Stock** | Recommended SKU Not in Local Dark Store | AI assistant recommends a pet treat or beauty item that is out of stock in the user's specific dark store (local warehouse). | **HIGH** | **Real-Time Inventory Pre-Check:** Query dark store stock status before rendering nudge cards. Filter out any SKU with inventory count $= 0$. |
| **Irrelevant Nudges** | Inappropriate Category Recommendation | Recommending pet supplies to non-pet owners, or baby products to single users. | **HIGH** | **Social Proof & Risk-Free Tagging:** Tag recommendations with social proof ("92% of grocery buyers also tried this") and include an explicit "Not interested in this category" dismiss option. |

### 7.2 Nudge Fatigue & UX Controls

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **Nudge Blindness** | User Frequently Dismisses Assistant | User closes the AI Category Assistant widget repeatedly across sessions. | **MEDIUM** | **Automated Backoff Suppressor:** If a user closes the assistant 3 consecutive times without clicking a recommendation, auto-suppress the widget for 7 days. Track dismiss count in `localStorage`. |
| **Checkout Friction** | Discovery Nudge Delays Order Placement | Assistant modal pops up at checkout, increasing cart abandonment rate. | **CRITICAL** | **Contextual Placement Rules:** Render assistant as an inline non-intrusive card *below* cart items, never as a blocking modal popup. Monitor guardrail metric (Cart Abandonment $\le 2\%$). |

---

## 8. Dual-Link Deployment & Isolation Edge Cases

This section details edge cases related to preserving the **Part 1 Live Link** while deploying **Part 2** independently.

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **CORS Block** | New Part 2 Vercel URL Blocked by Backend | The newly deployed Part 2 Vercel frontend URL returns `403 Forbidden` from the Render FastAPI backend due to strict CORS. | **HIGH** | **Regex CORS Middleware:** In `src/app/api_server.py`, set `allow_origin_regex=r"https://.*\.vercel\.app"` so all legitimate Vercel subdomains (both Part 1 and Part 2) can connect. |
| **Link Overwrite** | Accidental Override of Part 1 Live URL | Developer deploys Part 2 code directly to the existing Vercel project (`product-manager-fellowship-graduati`), breaking the live Part 1 link. | **CRITICAL** | **Strict Vercel Project Separation:** Maintain two distinct Vercel projects: Project 1 (`product-manager-fellowship-graduati`) for Part 1, and Project 2 (`blinkit-category-discovery-mvp`) for Part 2. |
| **Stale Cache** | Browser Serves Stale Frontend Build | User visits Part 2 link but browser serves cached asset files from earlier builds. | **LOW** | **Vercel Cache Headers:** Ensure `vercel.json` contains `Cache-Control: public, max-age=0, must-revalidate` for `index.html`. |

---

## 9. A/B Experimentation & Telemetry Edge Cases

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **Sample Size** | Insignificant Variant Traffic | Early rollout phase has < 100 users, leading to misleading conversion percentages. | **HIGH** | **Minimum Sample Threshold:** Require $N \ge 1,000$ active users per variant before calculating statistical significance ($p < 0.05$). Display "Sample size accumulating" badge until threshold is reached. |
| **Novelty Effect** | Initial Spike in Clicks | Click-through rate spikes during day 1 due to widget novelty, then decays. | **MEDIUM** | **14-Day Observation Window:** Measure North Star Metric (`% MAC purchasing from ≥ 1 new category/month`) over a minimum 14-day rolling window to smooth out initial novelty bias. |

---

## 10. Security & Compliance

* **API Key Leak Prevention:** `.gitignore` excludes `.env`; `config.py` enforces runtime checks.
* **PII Sanitization:** Regex scrubber redacts phone numbers, emails, and order IDs before sending text to LLMs.
* **Stateless SPA:** No cookies, no user tracking, pure static frontend.

---

*Document derived from [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md), [implementation-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/implementation-plan.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md) · Updated for NextLeap PM Fellowship Graduation Project*

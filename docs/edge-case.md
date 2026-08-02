# Blinkit Discovery Engine & AI-Native MVP — Edge Cases and Failure Modes

This document catalogs the corner cases, failure modes, and mitigation strategies across every layer of the Blinkit Category Exploration project. It is organized by system layer as defined in [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md).

---

## 1. Data Collection Layer — Scrapers

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

## 2. Data Processing Layer — Clean, Deduplicate, Enrich

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

## 3. LLM Analysis Layer — Theme Extraction & Insight Synthesis

### 3.1 Theme Extraction
* **Hallucination Prevention:** **Quote Grounding Assertion** — themes must map to verifiable `record_id` substrings.
* **Research Question Mapping:** Explicit mapping to Q1–Q8; flag unmapped themes.

### 3.2 Multi-LLM Consensus & Validation
* **2/3 Majority Rule:** Consensus enforced across Groq Llama-3.1, HuggingFace Llama-3.2, and Open Models.
* **Human Audit Benchmark:** 200-review manual audit ($\ge 90\%$ target agreement).

---

## 4. FastAPI Backend & API Layer

* **Startup Readiness:** Validate `LLM_API_KEY` on startup via `pydantic-settings`.
* **Graceful Fallback:** Serve static pre-computed cache (`data/insights/`) if pipeline is offline.
* **CORS Middleware:** Configure CORS `allow_origin_regex` to support legitimate Vercel domains.

---

## 5. React Frontend Dashboard & Design System

* **Design System Assets:** UI components anchored in `designsystem/` (`screen.png`, `screen1.png`, `screen2.png`, `screen3.png`).
* **Empty/Loading States:** Animated shimmer skeletons and designed empty state components.
* **Sample Data Fallback:** Fallback to bundled `sample_insights.json` if live API is unreachable after 2 retries.

---

## 6. Deployment & Hosting Edge Cases

| Category | Edge Case | Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **CORS Block** | Vercel URL Blocked by Backend | The deployed Vercel frontend URL returns `403 Forbidden` from the Render FastAPI backend due to strict CORS. | **HIGH** | **Regex CORS Middleware:** In `src/app/api_server.py`, set `allow_origin_regex=r"https://.*\.vercel\.app"` so all legitimate Vercel subdomains can connect. |
| **Stale Cache** | Browser Serves Stale Frontend Build | User visits the link but browser serves cached asset files from earlier builds. | **LOW** | **Vercel Cache Headers:** Ensure `vercel.json` contains `Cache-Control: public, max-age=0, must-revalidate` for `index.html`. |

---

*Derived from [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md), [context.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/context.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md)*


---

## 10. Security & Compliance

* **API Key Leak Prevention:** `.gitignore` excludes `.env`; `config.py` enforces runtime checks.
* **PII Sanitization:** Regex scrubber redacts phone numbers, emails, and order IDs before sending text to LLMs.
* **Stateless SPA:** No cookies, no user tracking, pure static frontend.

---

*Document derived from [architecture.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/architecture.md), [implementation-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/implementation-plan.md), and [deployment-plan.md](file:///c:/Nextleap%20Projects%20Git/ProductManagerFellowshipGraduationProject/docs/deployment-plan.md) · Updated for NextLeap PM Fellowship Graduation Project*

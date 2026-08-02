# Problem Statement: Blinkit Category Exploration Project

You are a Product Manager on the Growth Team at Blinkit.

Quick commerce platforms have successfully become a part of users' weekly routines. Many users place recurring orders for Groceries, snacks & beverages and household essentials.

Over time, however, shopping behavior becomes highly repetitive. Users often purchase the same set of products repeatedly and rarely explore new categories available on the platform.

---

### Strategic Goal (North Star)
Increase the percentage of Monthly Active Customers (MAC) who purchase products from at least one new category every month.

**Examples:**
- A user who buys groceries starts buying pet supplies.
- A user who buys snacks starts buying personal care products.
- A user who buys household essentials starts buying baby products.

---

### AI-Powered Discovery Engine Mandate

Build an AI-powered system that analyzes user feedback at scale to decode habit loops and friction points.

* **Data Sources Ingested (10 Channels):**
  * App Store reviews & Play Store reviews
  * Reddit discussions & Community forums
  * Social media conversations (Twitter/X, YouTube, Quora)
  * Blinkit App reviews & Competitor reviews (Zepto, Instamart)

* **Key Questions Addressed by Discovery Engine:**
  1. Why do users repeatedly buy from the same categories?
  2. What prevents users from exploring new categories?
  3. How do users discover products today?
  4. What role do habits play in shopping behavior?
  5. What information do users need before trying a new category?
  6. What frustrations emerge repeatedly?
  7. Which user segments are more likely to experiment?
  8. What unmet needs emerge consistently across discussions?

* **Engine Capabilities & Fulfillment:**
  - Multi-source feedback scraping & text normalization (`src/app/api/data_loader.py`)
  - Vector embeddings & ChromaDB indexing
  - 6-Agent AI Analysis (Theme, Emotion, Habit Loop, JTBD Need, Segment Archetype, Contradiction Agent)
  - 30-Node Interconnected Behavior Graph
  - 4-Tier Quality Validation Engine (Multi-LLM 2/3 Consensus: Groq Llama-3.1 + HF Llama-3.2)
  - Multi-Bucket Quality & Bias Audit (Platform Skew Flags + Data Integrity & Hygiene Buckets)
  - Live Single-Inference Sandbox with explicit Sentiment Scoring (e.g. `POSITIVE (+0.88)`)
  - Executive Intelligence Dashboard (`frontend/src/components/ExecutiveSummary.jsx`)





# Blinkit AI Discovery Engine — Category Exploration

[![Python Version](https://img.shields.io/badge/python-3.12-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-1.0.0-emerald.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2-cyan.svg)](https://reactjs.org/)
[![Test Suite](https://img.shields.io/badge/tests-76%20passed-brightgreen.svg)]()
[![Deployment](https://img.shields.io/badge/Render%20%2B%20Vercel-live-purple.svg)](https://render.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

> **NextLeap Product Manager Fellowship — Graduation Project**  
> An AI-native customer intelligence engine that ingests multi-channel feedback across 10 sources, runs a 6-Agent AI pipeline with Multi-LLM Consensus validation, and presents executive insights via an interactive dashboard.

---

## Live Deployment Platform

* **Live Intelligence Dashboard:**  
  👉 [https://blinkit-discovery-engine.vercel.app/](https://blinkit-discovery-engine.vercel.app/)

---

## Executive Overview & North Star Metric

Shopping behavior on quick-commerce platforms like **Blinkit** has become highly repetitive — users purchase the same 3 to 5 grocery staples habitually and rarely explore non-grocery categories (pet supplies, personal care, baby products, electronics, etc.).

### North Star Metric
> **Increase the percentage of Monthly Active Customers (MAC) who purchase products from at least one new category every month.**

The **Blinkit AI Discovery Engine** automates customer research by ingesting public reviews and discussions from 10 channels (157,630 raw feedback corpus), normalizing raw data, running **6 specialized AI Agents**, building an interconnected **Behavior Graph**, validating evidence via a **Multi-LLM Consensus Engine (2/3 Majority Rule)**, and delivering an Executive Intelligence Dashboard.

---

## Project Structure

```
├── data/
│   ├── raw/                        # Raw JSONL payloads across 10 channels
│   ├── processed/                  # Normalized reviews & ChromaDB vector store
│   └── insights/                   # Validated Agent outputs, Behavior Graph & Consensus
├── designsystem/                   # Design System Assets & UI Screen Specifications
├── docs/                           # Architecture, Context, Implementation Plan, Deployment Plan
├── frontend/                       # React + Vite Glassmorphism Dashboard
├── render.yaml                     # Render Blueprint specification
├── railway.json                    # Railway deployment manifest
├── Dockerfile                      # Container build definition for Render/Docker
├── scripts/                        # CLI pipeline scripts
├── src/
│   └── app/
│       ├── agents/                 # 6 Specialized AI Agents
│       ├── analysis/               # BehaviorGraph & MultiLLMConsensus
│       ├── api/                    # FastAPI routes & data schemas
│       └── api_server.py           # FastAPI application entrypoint
└── tests/                          # Automated unit and integration test suite
```

---

## License

MIT License · Project developed for **NextLeap Product Manager Fellowship Graduation Project**.

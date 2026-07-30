import React, { useState, useEffect } from 'react';
import ExecutiveSummary from './components/ExecutiveSummary';
import InsightCard from './components/InsightCard';
import ThemeExplorer from './components/ThemeExplorer';
import SourceAnalytics from './components/SourceAnalytics';
import ResearchQuestionNav from './components/ResearchQuestionNav';
import PipelineStatus from './components/PipelineStatus';
import HypothesisExperimentViewer from './components/HypothesisExperimentViewer';

// Phase 6 Multi-Agent Behavioral Science Components
import BehaviorGraphView from './components/BehaviorGraphView';
import EmotionSpectrumCard from './components/EmotionSpectrumCard';
import HabitLoopVisualizer from './components/HabitLoopVisualizer';
import JTBDMatrix from './components/JTBDMatrix';
import ArchetypeSegmentGrid from './components/ArchetypeSegmentGrid';
import ContradictionCard from './components/ContradictionCard';
import ConsensusReportModal from './components/ConsensusReportModal';

import { 
  Home, 
  Terminal, 
  Sparkles, 
  Lightbulb, 
  Search, 
  ShieldCheck, 
  GitFork, 
  Target, 
  Network, 
  BarChart2, 
  RefreshCw, 
  X 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'sandbox' | 'themes' | 'insights' | 'sources' | 'validation'
  const [selectedRQ, setSelectedRQ] = useState('all');
  const [isConsensusModalOpen, setIsConsensusModalOpen] = useState(false);

  // Core Intelligence States
  const [insights, setInsights] = useState([]);
  const [themesData, setThemesData] = useState({ themes_by_source: {}, consolidated_themes: [] });
  const [patterns, setPatterns] = useState([]);
  const [hypotheses, setHypotheses] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [sentimentData, setSentimentData] = useState(null);
  const [statusData, setStatusData] = useState(null);

  // Phase 5 & 6 Multi-Agent States
  const [graphData, setGraphData] = useState(null);
  const [emotionData, setEmotionData] = useState(null);
  const [habitData, setHabitData] = useState(null);
  const [jtbdData, setJtbdData] = useState(null);
  const [archetypeData, setArchetypeData] = useState(null);
  const [contradictionData, setContradictionData] = useState(null);
  const [validationReport, setValidationReport] = useState(null);

  const [loading, setLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = [
        `${API_BASE}/insights`,
        `${API_BASE}/themes`,
        `${API_BASE}/analytics/summary`,
        `${API_BASE}/analytics/categories`,
        `${API_BASE}/analytics/sentiment`,
        `${API_BASE}/pipeline/status`,
        `${API_BASE}/patterns`,
        `${API_BASE}/hypotheses`,
        `${API_BASE}/experiments`,
        `${API_BASE}/behavior-graph`,
        `${API_BASE}/archetypes`,
        `${API_BASE}/agents/emotion`,
        `${API_BASE}/agents/habit`,
        `${API_BASE}/agents/jtbd`,
        `${API_BASE}/agents/contradiction`,
        `${API_BASE}/validation/report`
      ];

      const results = await Promise.allSettled(
        endpoints.map(url => fetch(url).then(r => r.ok ? r.json() : Promise.reject()))
      );

      if (results[0].status === 'fulfilled') setInsights(results[0].value.insights || []);
      if (results[1].status === 'fulfilled') setThemesData(results[1].value);
      if (results[2].status === 'fulfilled') setSummaryData(results[2].value);
      if (results[3].status === 'fulfilled') setCategoryData(results[3].value);
      if (results[4].status === 'fulfilled') setSentimentData(results[4].value);
      if (results[5].status === 'fulfilled') setStatusData(results[5].value);
      if (results[6].status === 'fulfilled') setPatterns(results[6].value.patterns || []);
      if (results[7].status === 'fulfilled') setHypotheses(results[7].value.hypotheses || []);
      if (results[8].status === 'fulfilled') setExperiments(results[8].value.experiments || []);
      if (results[9].status === 'fulfilled') setGraphData(results[9].value);
      if (results[10].status === 'fulfilled') setArchetypeData(results[10].value);
      if (results[11].status === 'fulfilled') setEmotionData(results[11].value);
      if (results[12].status === 'fulfilled') setHabitData(results[12].value);
      if (results[13].status === 'fulfilled') setJtbdData(results[13].value);
      if (results[14].status === 'fulfilled') setContradictionData(results[14].value);
      if (results[15].status === 'fulfilled') setValidationReport(results[15].value);

    } catch (err) {
      console.warn("API fetch error, components will use fallback datasets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTriggerRun = async () => {
    try {
      await fetch(`${API_BASE}/pipeline/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: 'all' })
      });
      await fetchData();
    } catch (err) {
      console.error("Pipeline trigger failed:", err);
    }
  };

  const filteredInsights = selectedRQ === 'all'
    ? insights
    : insights.filter(ins => ins.research_questions_addressed?.includes(selectedRQ));

  return (
    <div className="app-container">
      {/* Top Header Navbar */}
      <header className="top-nav-header">
        <div className="logo-container">
          <span className="logo-blink">Blink</span>
          <span className="logo-it">it</span>
          <span className="logo-divider">|</span>
          <span className="logo-subtitle">Discovery Engine</span>
        </div>

        <nav className="top-nav-tabs">
          <button 
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={18} /> Home
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'sandbox' ? 'active' : ''}`}
            onClick={() => setActiveTab('sandbox')}
          >
            <Terminal size={18} /> Sandbox
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'themes' ? 'active' : ''}`}
            onClick={() => setActiveTab('themes')}
          >
            <Sparkles size={18} /> AI Themes
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            <Lightbulb size={18} /> Core Insights
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'sources' ? 'active' : ''}`}
            onClick={() => setActiveTab('sources')}
          >
            <Search size={18} /> Source Explorer
          </button>
          <button 
            className={`nav-tab-btn ${activeTab === 'validation' ? 'active' : ''}`}
            onClick={() => setActiveTab('validation')}
          >
            <ShieldCheck size={18} /> Validation
          </button>
        </nav>
      </header>

      {/* Main Container */}
      <main className="main-content">
        
        {/* HOME TAB VIEW */}
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section">
              <span className="glass-pill">
                AI-Powered Research Project
              </span>
              <h1 className="hero-title">Discovery Engine</h1>
              <p className="hero-subtitle">
                Analyzing thousands of user reviews with Python FastAPI & Google Gemini / Llama 3 to decode why users stick to their habits and how to unlock new product discovery in quick commerce.
              </p>

              {/* 4 Stat Metric Cards */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-value">157,630</div>
                  <div className="metric-label">Reviews Analyzed</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">10</div>
                  <div className="metric-label">Data Sources</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">12</div>
                  <div className="metric-label">Global Themes</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">93.3%</div>
                  <div className="metric-label">AI Confidence</div>
                </div>
              </div>
            </section>

            {/* How the Engine Works Section */}
            <section className="flow-section">
              <h2 className="flow-title">
                <GitFork size={22} color="var(--accent-green)" /> How the Engine Works
              </h2>
              <p className="flow-subtitle">
                A 4-stage automated pipeline powered by Python FastAPI & 6 AI Agents, from raw data to validated insights.
              </p>

              <div className="flow-grid">
                <div className="flow-card">
                  <div className="flow-step-num">1</div>
                  <div className="flow-card-title">Multi-Source Scraping</div>
                  <div className="flow-card-desc">
                    Automated scrapers gather 157,630 items across 10 sources (Play Store, App Store, Reddit, Twitter, YouTube, Quora, Forums, Support, Zepto, Instamart).
                  </div>
                </div>

                <div className="flow-card">
                  <div className="flow-step-num">2</div>
                  <div className="flow-card-title">Sentiment & Agent Analysis</div>
                  <div className="flow-card-desc">
                    Each feedback item is processed by 6 specialized AI agents for sentiment analysis, habit loops, JTBD needs, and friction points.
                  </div>
                </div>

                <div className="flow-card">
                  <div className="flow-step-num">3</div>
                  <div className="flow-card-title">Theme Extraction</div>
                  <div className="flow-card-desc">
                    LLMs analyze the full corpus holistically, identifying 12 global behavioral themes and constructing an interconnected Behavior Graph.
                  </div>
                </div>

                <div className="flow-card">
                  <div className="flow-step-num">4</div>
                  <div className="flow-card-title">Insight Synthesis</div>
                  <div className="flow-card-desc">
                    Themes are mapped against 8 research questions with Multi-LLM 2/3 majority consensus validation ensuring high accuracy.
                  </div>
                </div>
              </div>
            </section>

            {/* Executive Summary & North Star Metric */}
            <ExecutiveSummary 
              summaryData={summaryData} 
              totalInsights={insights.length || 10}
              totalThemes={themesData?.total_themes || 12}
              rqCoverage={statusData?.details?.rq_coverage || '100%'}
              onOpenConsensus={() => setIsConsensusModalOpen(true)}
            />
          </div>
        )}

        {/* SANDBOX TAB VIEW */}
        {activeTab === 'sandbox' && (
          <div className="animate-fade-in">
            <PipelineStatus statusData={statusData} onTriggerRun={handleTriggerRun} />
            <HypothesisExperimentViewer 
              patterns={patterns} 
              hypotheses={hypotheses} 
              experiments={experiments} 
              onOutcomeLogged={fetchData} 
            />
          </div>
        )}

        {/* AI THEMES TAB VIEW */}
        {activeTab === 'themes' && (
          <div className="animate-fade-in">
            <ThemeExplorer themesData={themesData} />
          </div>
        )}

        {/* CORE INSIGHTS TAB VIEW */}
        {activeTab === 'insights' && (
          <div className="animate-fade-in">
            <ResearchQuestionNav selectedRQ={selectedRQ} onSelectRQ={setSelectedRQ} />

            {selectedRQ !== 'all' && (
              <div className="glass-card" style={{ padding: '12px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: 'var(--accent-green)', background: '#f0fdf4' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#166534', fontWeight: 600 }}>
                  <Sparkles size={16} /> Filtering by Research Question: <span style={{ color: '#0f172a', fontWeight: 700 }}>{selectedRQ}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}>({filteredInsights.length} insights match)</span>
                </div>
                <button 
                  onClick={() => setSelectedRQ('all')}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                >
                  <X size={16} /> Reset Filter
                </button>
              </div>
            )}

            <section style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                    Validated Product Insights
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                    Strategic findings backed by multi-source evidence and 6 behavioral AI agents
                  </p>
                </div>
                <span className="glass-pill">
                  <Target size={14} /> {filteredInsights.length} Insights
                </span>
              </div>

              {loading && insights.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                  <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 12px auto', color: 'var(--accent-green)' }} />
                  Loading customer intelligence insights...
                </div>
              ) : (
                filteredInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))
              )}
            </section>

            {/* 6 AI Agent Behavioral Science Breakdown */}
            <section style={{ marginTop: '48px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                6 Behavioral Science AI Agents
              </h2>
              <HabitLoopVisualizer habitData={habitData} />
              <EmotionSpectrumCard emotionData={emotionData} />
              <JTBDMatrix jtbdData={jtbdData} />
              <ArchetypeSegmentGrid archetypeData={archetypeData} />
              <ContradictionCard contradictionData={contradictionData} />
            </section>
          </div>
        )}

        {/* SOURCE EXPLORER TAB VIEW */}
        {activeTab === 'sources' && (
          <div className="animate-fade-in">
            <SourceAnalytics 
              summaryData={summaryData} 
              sentimentData={sentimentData} 
              categoryData={categoryData} 
            />
          </div>
        )}

        {/* VALIDATION TAB VIEW */}
        {activeTab === 'validation' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  Multi-LLM Consensus & Behavior Graph Validation
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  2/3 majority rule validation across Groq, HuggingFace Llama 3, and Open Models
                </p>
              </div>
              <button 
                className="btn-primary"
                onClick={() => setIsConsensusModalOpen(true)}
              >
                <ShieldCheck size={18} /> View Full Consensus Report
              </button>
            </div>

            <BehaviorGraphView graphData={graphData} />
          </div>
        )}

      </main>

      {/* Consensus Modal Overlay */}
      <ConsensusReportModal 
        isOpen={isConsensusModalOpen} 
        onClose={() => setIsConsensusModalOpen(false)}
        reportData={validationReport}
      />
    </div>
  );
}

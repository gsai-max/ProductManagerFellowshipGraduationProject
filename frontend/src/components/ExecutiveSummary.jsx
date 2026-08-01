import React from 'react';
import { Sparkles, Target, Layers, FileText, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function ExecutiveSummary({ summaryData, totalInsights, totalThemes, rqCoverage, onOpenConsensus }) {
  const totalReviews = summaryData?.total_normalized_reviews || 157630;
  const totalSources = summaryData?.source_breakdown ? Object.keys(summaryData.source_breakdown).length : 10;

  const statCards = [
    {
      title: 'Raw Scraped Corpus',
      value: '157,630',
      subtitle: '10 Channels: Play Store, App Store, Twitter, Reddit, Instamart, Zepto, YouTube, Quora, Forums, Support',
      icon: FileText,
      color: '#129b48',
    },
    {
      title: 'Normalized Quality Subset',
      value: '5,320',
      subtitle: 'PII-stripped, deduplicated & sentiment-tagged records',
      icon: Layers,
      color: '#0284c7',
    },
    {
      title: '1.0★ Friction vs 5.0★ Delight',
      value: '43.3% / 35.5%',
      subtitle: '2,302 1-Star (UI/Fees/Stock) vs 1,891 5-Star (10-Min Speed)',
      icon: Sparkles,
      color: '#7c3aed',
    },
    {
      title: 'Survey Research Baseline',
      value: 'n=100',
      subtitle: '42% Low Explorers, 46% Relevance Barrier, 44% Trust Deficit',
      icon: Target,
      color: '#d97706',
    },
  ];

  return (
    <div style={{ marginBottom: '32px' }} className="animate-fade-in">
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span className="glass-pill">
              <Sparkles size={14} /> AI-Powered Customer Intelligence Engine
            </span>
            <span style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={14} style={{ color: '#129b48' }} /> RQ Coverage: {rqCoverage || '100%'}
            </span>
          </div>

          {onOpenConsensus && (
            <button
              onClick={onOpenConsensus}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid #bbf7d0',
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={14} /> Multi-LLM 2/3 Consensus: 93.3% Pass
            </button>
          )}
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Blinkit Category Exploration Insights
        </h1>
        <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '850px', lineHeight: 1.6 }}>
          Automated multi-source feedback analysis unlocking customer behaviour barriers, habit loops, and 
          growth levers to drive cross-category adoption across Blinkit's quick-commerce platform.
        </p>

        {/* North Star Target Bar */}
        <div style={{ marginTop: '24px', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#129b48' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>North Star Metric</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                Increase % Monthly Active Customers purchasing from &ge;1 new category every month
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px', color: '#475569' }}>
              <span>Target Cross-Category Adoption</span>
              <span style={{ color: '#129b48', fontWeight: 700 }}>Growth Vector</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, #129b48, #0284c7)', borderRadius: '4px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-card" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>{card.title}</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {card.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px' }}>
                  {card.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

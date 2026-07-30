import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Quote, Lightbulb, Users, ShieldCheck, Tag } from 'lucide-react';

export default function InsightCard({ insight }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getEvidenceBadgeClass = (strength) => {
    switch (strength?.toLowerCase()) {
      case 'strong': return 'badge-strong';
      case 'moderate': return 'badge-moderate';
      case 'weak': return 'badge-weak';
      default: return 'badge-moderate';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high': return '#129b48';
      case 'medium': return '#b45309';
      case 'low': return '#64748b';
      default: return '#129b48';
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '16px', overflow: 'hidden', transition: 'all 0.3s ease', background: '#ffffff' }}>
      {/* Card Header (Always Visible) */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
          {/* Priority Rank Badge */}
          <div style={{ 
            minWidth: '36px', height: '36px', borderRadius: '10px', 
            background: '#dcfce7',
            border: '1px solid #bbf7d0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 800, color: '#15803d'
          }}>
            #{insight.priority_rank}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className={`glass-pill ${getEvidenceBadgeClass(insight.evidence_strength)}`}>
                <ShieldCheck size={12} /> {insight.evidence_strength?.toUpperCase()} EVIDENCE
              </span>
              <span className="glass-pill" style={{ color: getImpactColor(insight.impact_potential), background: '#f8fafc' }}>
                IMPACT: {insight.impact_potential?.toUpperCase()}
              </span>
              <span className="glass-pill" style={{ color: '#475569', background: '#f1f5f9' }}>
                {insight.source_count || insight.sources_corroborating?.length || 2} SOURCES
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '6px', lineHeight: 1.35 }}>
              {insight.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#475569', display: '-webkit-box', WebkitLineClamp: isExpanded ? 'none' : 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5 }}>
              {insight.statement}
            </p>
          </div>
        </div>

        {/* Expand Toggle Button */}
        <button 
          style={{ background: '#f1f5f9', border: '1px solid var(--border-color)', width: '32px', height: '32px', borderRadius: '8px', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Expanded Content View */}
      {isExpanded && (
        <div style={{ padding: '0 24px 24px 24px', borderTop: '1px solid var(--border-color)', background: '#f8fafc', paddingTop: '20px' }} className="animate-fade-in">
          
          {/* Action & Segment Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#15803d', marginBottom: '6px' }}>
                <Lightbulb size={16} /> RECOMMENDED PM ACTION
              </div>
              <p style={{ fontSize: '0.88rem', color: '#0f172a', lineHeight: 1.4 }}>
                {insight.recommended_action}
              </p>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius-md)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700, color: '#0369a1', marginBottom: '6px' }}>
                <Users size={16} /> TARGET USER SEGMENT
              </div>
              <p style={{ fontSize: '0.88rem', color: '#0f172a', lineHeight: 1.4 }}>
                {insight.user_segment}
              </p>
            </div>
          </div>

          {/* Representative Quotes */}
          {insight.representative_quotes && insight.representative_quotes.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Quote size={14} /> Representative Customer Quotes
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {insight.representative_quotes.map((quote, qIdx) => (
                  <div key={qIdx} style={{ background: '#ffffff', borderLeft: '4px solid #129b48', padding: '10px 14px', borderRadius: '0 8px 8px 0', fontSize: '0.88rem', color: '#334155', fontStyle: 'italic', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                    "{quote.text}"
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b', fontStyle: 'normal', marginTop: '4px', fontWeight: 600 }}>
                      — Record ID: <code style={{ color: '#129b48' }}>{quote.record_id}</code> ({quote.source?.replace('_', ' ')})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Research Questions & Sources Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Research Questions:</span>
              {insight.research_questions_addressed?.map((rq, rIdx) => (
                <span key={rIdx} className="glass-pill" style={{ background: '#f3e8ff', color: '#6b21a8', borderColor: '#e9d5ff', padding: '2px 8px' }}>
                  <Tag size={10} /> {rq}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#475569', fontWeight: 600 }}>
              Corroborated by: 
              {insight.sources_corroborating?.map((src, sIdx) => (
                <span key={sIdx} className="glass-pill" style={{ textTransform: 'capitalize', background: '#ffffff' }}>
                  {src.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

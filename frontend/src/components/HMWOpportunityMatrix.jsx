import React, { useState } from 'react';
import { Target, Lightbulb, ShieldCheck, Tag, ArrowUpRight, Filter, Sparkles, AlertCircle } from 'lucide-react';

const DEFAULT_HMW_ITEMS = [
  {
    hmw_id: "hmw_relevance_01",
    friction_node_id: "node_relevance_barrier_46",
    opportunity_area: "Mission-Anchored Relevance (46% Barrier)",
    hmw_statement: "How might we predict the user's active shopping mission so that non-grocery recommendations feel immediately relevant rather than unneeded?",
    target_archetype: "Routine Loyalists",
    underlying_friction: "46% report 'do not need' other categories due to recommendation-mission mismatch",
    potential_impact_level: "high",
    solution_link: "Mission-Anchored Discovery",
  },
  {
    hmw_id: "hmw_trust_02",
    friction_node_id: "node_trust_barrier_44",
    opportunity_area: "Trust & Reversibility Layer (44% Barrier)",
    hmw_statement: "How might we lower risk perception for unfamiliar products by surfacing verified peer proof and first-trial return promises so that users trust non-grocery items?",
    target_archetype: "Proof-Seeking Risk Avoiders",
    underlying_friction: "44% distrust unfamiliar products and 33% feel they lack sufficient product information",
    potential_impact_level: "high",
    solution_link: "First-Trial Confidence Layer",
  },
  {
    hmw_id: "hmw_economic_03",
    friction_node_id: "node_economic_risk_43",
    opportunity_area: "Risk-Free Micro-Sampling (43% Barrier)",
    hmw_statement: "How might we offer risk-free trial sizes and checkout sample bundles so that basket expansion occurs without fear of financial regret?",
    target_archetype: "Deal-Activated Samplers",
    underlying_friction: "43% fear wasting money on unknown category trials and 38% perceive non-grocery prices as high",
    potential_impact_level: "high",
    solution_link: "Checkout Sampling System",
  },
  {
    hmw_id: "hmw_execution_04",
    friction_node_id: "node_execution_cost_31",
    opportunity_area: "One-Choice Checkout Discovery (31% Barrier)",
    hmw_statement: "How might we surface a single, high-confidence trial recommendation at cart checkout with 1-tap add so that discovery preserves speed and avoids choice fatigue?",
    target_archetype: "Mission-First Speed Shoppers",
    underlying_friction: "31% prioritize quick checkout and 28% experience cognitive fatigue from choice overload",
    potential_impact_level: "medium",
    solution_link: "One-Choice Policy",
  },
  {
    hmw_id: "hmw_habit_05",
    friction_node_id: "node_habit_memory_loop",
    opportunity_area: "Exploration Memory & Habit Loop",
    hmw_statement: "How might we convert a successful first trial into a permanent familiar default so that repeat cross-category orders occur organically?",
    target_archetype: "Contextual Explorers",
    underlying_friction: "Reorder habit loops trap users in grocery staples, preventing trial-to-repeat conversion",
    potential_impact_level: "high",
    solution_link: "Exploration Memory",
  },
];

export default function HMWOpportunityMatrix({ hmwData = null, onSelectOpportunity }) {
  const [activeArea, setActiveArea] = useState('all');
  const items = (hmwData && hmwData.length > 0) ? hmwData : DEFAULT_HMW_ITEMS;

  const categories = ['all', ...new Set(items.map(i => i.opportunity_area))];

  const filteredItems = activeArea === 'all' 
    ? items 
    : items.filter(i => i.opportunity_area === activeArea);

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '24px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="glass-pill">
            <Target size={14} /> Part 2 Strategy Engine
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            Behavior Graph to Opportunity Framing
          </span>
        </div>
        <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700 }}>
          How Might We (HMW) Opportunity Matrix
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, maxWidth: '800px' }}>
          Translates validated Part 1 friction nodes, habit loops, and JTBD gaps into structured opportunity frames for product solutioning.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Filter size={14} /> Area:
        </span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveArea(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: activeArea === cat ? '1px solid #129b48' : '1px solid #e2e8f0',
              background: activeArea === cat ? '#129b48' : '#ffffff',
              color: activeArea === cat ? '#ffffff' : '#334155',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {cat === 'all' ? 'All Areas' : cat}
          </button>
        ))}
      </div>

      {/* Grid of HMW Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredItems.map((item, idx) => (
          <div
            key={item.hmw_id || idx}
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              position: 'relative',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: '#f1f5f9',
                  color: '#475569',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'monospace'
                }}>
                  {item.hmw_id}
                </span>

                <span style={{
                  padding: '3px 8px',
                  borderRadius: '10px',
                  background: item.potential_impact_level === 'high' ? '#fef3c7' : '#e0f2fe',
                  color: item.potential_impact_level === 'high' ? '#92400e' : '#075985',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {item.potential_impact_level || 'high'} Impact
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#129b48', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                {item.opportunity_area}
              </div>

              <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 600, lineHeight: 1.4, margin: '0 0 14px 0' }}>
                "{item.hmw_statement}"
              </h4>

              <div style={{ padding: '12px', borderRadius: '8px', background: '#f8fafc', borderLeft: '3px solid #64748b', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={12} /> Target Friction Node:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#334155' }}>
                  {item.underlying_friction}
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={12} /> {item.target_archetype}
                </span>

                {item.solution_link && (
                  <span style={{ fontSize: '0.78rem', color: '#129b48', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Sparkles size={12} /> {item.solution_link}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

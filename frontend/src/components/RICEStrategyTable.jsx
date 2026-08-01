import React, { useState } from 'react';
import { Award, Calculator, CheckCircle2, Sliders, Sparkles, TrendingUp, AlertTriangle, Layers, Cpu, Compass, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const SOLUTION_EXPLORATION = [
  {
    painPoint: "Users open Blinkit with a fixed shopping mission and ignore other categories.",
    solution: "AI Mission Intelligence Platform (MIP)",
    whatItSolves: "Identifies shopping mission, predicts adjacent intent and orchestrates personalized interventions",
    pros: "Solves the root cause (confidence + context), scalable across all touchpoints",
    limitations: "Higher initial AI investment & vector pipeline setup",
    whyThis: "#1 Winning Solution: Solves the root cause by understanding why the customer is shopping before deciding what to recommend.",
    isSelected: true,
  },
  {
    painPoint: "Users rarely discover adjacent categories naturally.",
    solution: "Checkout Cross-Category Prompts",
    whatItSolves: "Encourages add-on purchases at high-intent checkout",
    pros: "High conversion surface, preserves 31% checkout speed priority",
    limitations: "Limited to existing carts and dependent on strong recommendations",
    whyThis: "Reduces cognitive load by showing one contextual recommendation rather than many irrelevant options.",
    isSelected: false,
  },
  {
    painPoint: "Users don't trust unfamiliar categories.",
    solution: "Dynamic Homepage Personalization",
    whatItSolves: "Improves visibility of non-grocery categories",
    pros: "Better discovery and merchandising visibility",
    limitations: "Doesn't address trust or purchase confidence (awareness alone is insufficient)",
    whyThis: "Research showed trust (44%) is a stronger barrier than awareness.",
    isSelected: false,
  },
  {
    painPoint: "Users hesitate to spend on unfamiliar products.",
    solution: "Discovery Trial Packs (₹49 Explorer Kits)",
    whatItSolves: "Reduces experimentation risk for first-time trials",
    pros: "Encourages first-time trials with low financial commitment",
    limitations: "Limited category applicability and merchandising complexity",
    whyThis: "Lowers financial and psychological risk for first-time purchases.",
    isSelected: false,
  },
  {
    painPoint: "Discovery happens only during checkout.",
    solution: "Discount & Voucher Engine",
    whatItSolves: "Addresses price sensitivity and reduces first-purchase friction",
    pros: "Converts price-sensitive users quickly",
    limitations: "Risks promotion dependency without changing underlying habit loops",
    whyThis: "Converts existing purchase intent into cross-category adoption without interrupting shopping flow.",
    isSelected: false,
  },
];

const DEFAULT_RICE_ITEMS_SCALE = [
  {
    solution_id: "sol_mip_01",
    title: "AI Mission Intelligence Platform (MIP)",
    description: "Central intelligence layer identifying shopping mission, predicting adjacent intent, and orchestrating personalized interventions across all touchpoints.",
    reach: 9,
    impact: 10,
    confidence: 9,
    effort: 5,
    is_selected_mvp: true,
    justification: "#1 Selected Winning Platform: Solves root cause by understanding why customer is shopping before deciding what to recommend.",
  },
  {
    solution_id: "sol_checkout_02",
    title: "Checkout Cross-Category Prompts",
    description: "Single contextual 1-tap add-on recommendation card presented at cart checkout with 100% risk-free guarantee.",
    reach: 8,
    impact: 8,
    confidence: 8,
    effort: 4,
    is_selected_mvp: false,
    justification: "#2 Ranked Activation Channel: High conversion activation surface for Mission Intelligence recommendations.",
  },
  {
    solution_id: "sol_homepage_03",
    title: "Dynamic Homepage Personalization",
    description: "Replaces static promotional banners with dynamic personalized Category Discovery Ribbons on top fold.",
    reach: 8,
    impact: 7,
    confidence: 8,
    effort: 4,
    is_selected_mvp: false,
    justification: "#3 Ranked Activation Channel: Enhances top-of-funnel category exposure.",
  },
  {
    solution_id: "sol_trial_packs_04",
    title: "Explorer Trial Packs (₹49 Kits)",
    description: "Low-cost ₹49 micro-sampling trial kits across beauty, pet treats, and personal care bundled with grocery orders.",
    reach: 6,
    impact: 7,
    confidence: 7,
    effort: 3,
    is_selected_mvp: false,
    justification: "#4 Ranked Activation Channel: Effective trial converter for high-risk categories.",
  },
  {
    solution_id: "sol_incentive_05",
    title: "Dynamic Incentive Engine",
    description: "Zero Handling Fee vouchers and targeted first-try cashback for non-grocery orders.",
    reach: 7,
    impact: 6,
    confidence: 7,
    effort: 4,
    is_selected_mvp: false,
    justification: "#5 Ranked Activation Channel: Tactical price friction remover.",
  },
];

const SENSITIVITY_TRIGGERS = [
  {
    id: "trig_default",
    label: "Default Strategy (Balanced)",
    trigger: "Long-term platform investment is prioritized",
    shift: "Mission Intelligence Engine Remains #1 (Score: 162)",
    override: null,
  },
  {
    id: "trig_new_users",
    label: "Scenario A: New User Growth Focus",
    trigger: "New users become the primary growth objective",
    shift: "Dynamic Homepage Personalization ↑ (Shift to #1)",
    override: { sol_homepage_03: { reach: 10, impact: 9, confidence: 9, effort: 3 } },
  },
  {
    id: "trig_low_conv",
    label: "Scenario B: Conversion Below Target",
    trigger: "Cross-category conversion is below target despite good discovery",
    shift: "Checkout Cross-Category Prompts ↑ (Shift to #1)",
    override: { sol_checkout_02: { reach: 10, impact: 10, confidence: 9, effort: 3 } },
  },
  {
    id: "trig_price_trust",
    label: "Scenario C: Price/Trust Friction Peak",
    trigger: "High price sensitivity or low trust is identified in a specific category",
    shift: "Dynamic Incentive Engine & Confidence Layer ↑",
    override: { sol_incentive_05: { reach: 9, impact: 9, confidence: 8, effort: 3 } },
  },
  {
    id: "trig_new_cats",
    label: "Scenario D: Launching New Strategic Categories",
    trigger: "Launching new categories (Beauty, Pet Care, Electronics)",
    shift: "Explorer Trial Packs (₹49 Kits) ↑",
    override: { sol_trial_packs_04: { reach: 9, impact: 9, confidence: 8, effort: 2 } },
  },
];

export default function RICEStrategyTable({ riceData = null }) {
  const [activeTabSection, setActiveTabSection] = useState('exploration'); // 'exploration' | 'mip' | 'rice' | 'triggers'
  const [activeTriggerId, setActiveTriggerId] = useState('trig_default');
  const [items, setItems] = useState(DEFAULT_RICE_ITEMS_SCALE);

  const activeTriggerObj = SENSITIVITY_TRIGGERS.find(t => t.id === activeTriggerId);

  // Compute RICE Score = (Reach * Impact * Confidence) / Effort
  const getItemsWithScores = () => {
    let currentItems = items.map(i => ({ ...i }));
    if (activeTriggerObj && activeTriggerObj.override) {
      currentItems = currentItems.map(i => {
        if (activeTriggerObj.override[i.solution_id]) {
          return { ...i, ...activeTriggerObj.override[i.solution_id] };
        }
        return i;
      });
    }

    return currentItems.map(item => {
      const safeEffort = Math.max(0.5, item.effort);
      const score = Math.round(((item.reach * item.impact * item.confidence) / safeEffort) * 10) / 10;
      return { ...item, rice_score: score };
    }).sort((a, b) => b.rice_score - a.rice_score);
  };

  const rankedItems = getItemsWithScores();

  const handleValueChange = (id, field, val) => {
    setItems(prev => prev.map(item => {
      if (item.solution_id === id) {
        return { ...item, [field]: parseFloat(val) || 0 };
      }
      return item;
    }));
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '24px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="glass-pill">
            <Calculator size={14} /> Part 2 Product Strategy
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            Solution Trade-Off Exploration, MIP Platform & 1–10 Scale RICE Prioritization
          </span>
        </div>
        <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700 }}>
          Solution Exploration & RICE Prioritization Strategy
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, maxWidth: '850px' }}>
          Root-cause solution trade-offs, AI Mission Intelligence Platform architecture, and 1–10 RICE prioritization with dynamic sensitivity triggers.
        </p>
      </div>

      {/* Internal Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', pb: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTabSection('exploration')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: activeTabSection === 'exploration' ? '1px solid #129b48' : '1px solid #e2e8f0',
            background: activeTabSection === 'exploration' ? '#129b48' : '#ffffff',
            color: activeTabSection === 'exploration' ? '#ffffff' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          1. Solution Trade-Off Matrix
        </button>
        <button
          onClick={() => setActiveTabSection('mip')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: activeTabSection === 'mip' ? '1px solid #129b48' : '1px solid #e2e8f0',
            background: activeTabSection === 'mip' ? '#129b48' : '#ffffff',
            color: activeTabSection === 'mip' ? '#ffffff' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          2. AI Mission Intelligence Deep-Dive
        </button>
        <button
          onClick={() => setActiveTabSection('rice')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: activeTabSection === 'rice' ? '1px solid #129b48' : '1px solid #e2e8f0',
            background: activeTabSection === 'rice' ? '#129b48' : '#ffffff',
            color: activeTabSection === 'rice' ? '#ffffff' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          3. RICE 1–10 Scale Matrix
        </button>
        <button
          onClick={() => setActiveTabSection('triggers')}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: activeTabSection === 'triggers' ? '1px solid #129b48' : '1px solid #e2e8f0',
            background: activeTabSection === 'triggers' ? '#129b48' : '#ffffff',
            color: activeTabSection === 'triggers' ? '#ffffff' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          4. RICE Sensitivity Triggers
        </button>
      </div>

      {/* ==================== TAB 1: SOLUTION TRADE-OFF MATRIX ==================== */}
      {activeTabSection === 'exploration' && (
        <div className="glass-panel" style={{ padding: '0', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ padding: '18px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>
              Solution Exploration & Pain Point Trade-Off Analysis
            </h4>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: '#64748b' }}>
              Evaluates candidate solutions against research findings, pros, limitations, and strategic fit.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 16px', minWidth: '180px' }}>Pain Point (Research Finding)</th>
                  <th style={{ padding: '12px 16px', minWidth: '180px' }}>Solution</th>
                  <th style={{ padding: '12px 16px', minWidth: '180px' }}>What it Solves</th>
                  <th style={{ padding: '12px 16px', minWidth: '160px' }}>Pros</th>
                  <th style={{ padding: '12px 16px', minWidth: '160px' }}>Limitation</th>
                  <th style={{ padding: '12px 16px', minWidth: '220px' }}>Why This Solution?</th>
                </tr>
              </thead>
              <tbody>
                {SOLUTION_EXPLORATION.map((item, idx) => (
                  <tr 
                    key={idx}
                    style={{ 
                      borderBottom: '1px solid #f1f5f9',
                      background: item.isSelected ? '#f0fdf4' : '#ffffff',
                    }}
                  >
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                      {item.painPoint}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                      {item.solution}
                      {item.isSelected && (
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#15803d', fontWeight: 800, marginTop: '2px' }}>
                          ★ SELECTED WINNER
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#475569' }}>
                      {item.whatItSolves}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#15803d', fontWeight: 600 }}>
                      ✓ {item.pros}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#b91c1c' }}>
                      ⚠ {item.limitations}
                    </td>
                    <td style={{ padding: '14px 16px', color: '#0f172a', fontSize: '0.82rem', lineHeight: 1.3 }}>
                      {item.whyThis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: AI MISSION INTELLIGENCE PLATFORM DEEP-DIVE ==================== */}
      {activeTabSection === 'mip' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Cpu size={24} style={{ color: '#38bdf8' }} />
              <div>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  #1 Selected Product Strategy
                </span>
                <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>
                  AI Mission Intelligence Platform (MIP)
                </h3>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              Rather than recommending products based only on static purchase history, the platform first understands the customer's active shopping intent before determining what to surface.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>1. Shopping Mission</div>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc' }}>Why is the user here today? (Replenishment, emergency, late night)</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>2. Household Context</div>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc' }}>Family, pet owner, bachelor, busy professional</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>3. Basket & Temporal Intent</div>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc' }}>Real-time cart tokens, weekend, festival, late night</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700 }}>4. Confidence Score</div>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc' }}>Estimated willingness & trust to try a new category</div>
              </div>
            </div>
          </div>

          {/* Touchpoints Architecture & Expected Outcomes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} style={{ color: '#129b48' }} /> Activation Touchpoints Architecture
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6 }}>
                <li><strong>Homepage:</strong> Dynamic Category Discovery Ribbon on top fold</li>
                <li><strong>Search:</strong> Contextual synonym & cross-category recommendation boost</li>
                <li><strong>Checkout:</strong> 1-tap micro-trial add-on prompt (#1 conversion step)</li>
                <li><strong>Push Notifications & CRM:</strong> Occasion-led personalized nudges</li>
                <li><strong>Future AI Shopping Assistant:</strong> Conversational cross-category discovery</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={16} style={{ color: '#0284c7' }} /> Expected Strategic Outcomes
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '8px', color: '#14532d' }}>
                  <strong>Product Outcomes:</strong>
                  <div>↑ Adjacent Category Discovery</div>
                  <div>↑ Recommendation Acceptance</div>
                  <div>↑ First-Time Purchase & Repeat</div>
                </div>
                <div style={{ padding: '10px', background: '#f0f9ff', borderRadius: '8px', color: '#0369a1' }}>
                  <strong>Business Outcomes:</strong>
                  <div>↑ Cross-Category GMV</div>
                  <div>↑ Average Basket Value (AOV)</div>
                  <div>↑ Monthly Active Explorers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: RICE 1-10 SCALE MATRIX ==================== */}
      {activeTabSection === 'rice' && (
        <div className="glass-panel" style={{ padding: '0', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#ffffff' }}>
          <div style={{ padding: '16px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={16} /> RICE 1–10 Scale Prioritization Matrix
            </h4>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              Formula: (Reach × Impact × Confidence) / Effort
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '14px 18px', width: '60px' }}>Rank</th>
                  <th style={{ padding: '14px 18px', minWidth: '240px' }}>Solution Name</th>
                  <th style={{ padding: '14px 18px', width: '110px' }}>Reach (1-10)</th>
                  <th style={{ padding: '14px 18px', width: '110px' }}>Impact (1-10)</th>
                  <th style={{ padding: '14px 18px', width: '110px' }}>Confidence (1-10)</th>
                  <th style={{ padding: '14px 18px', width: '110px' }}>Effort (1-10)</th>
                  <th style={{ padding: '14px 18px', width: '120px', textAlign: 'right' }}>RICE Score</th>
                </tr>
              </thead>
              <tbody>
                {rankedItems.map((item, rankIdx) => {
                  const isTop = rankIdx === 0;
                  return (
                    <tr 
                      key={item.solution_id}
                      style={{ 
                        borderBottom: '1px solid #f1f5f9',
                        background: isTop ? '#f0fdf4' : '#ffffff',
                      }}
                    >
                      <td style={{ padding: '16px 18px', fontWeight: 700 }}>
                        <span style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justify: 'center',
                          background: isTop ? '#129b48' : '#e2e8f0',
                          color: isTop ? '#ffffff' : '#475569',
                          fontSize: '0.8rem'
                        }}>
                          #{rankIdx + 1}
                        </span>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                          {item.title}
                          {isTop && (
                            <span style={{ marginLeft: '8px', padding: '2px 6px', borderRadius: '6px', background: '#dcfce7', color: '#15803d', fontSize: '0.7rem', fontWeight: 800 }}>
                              ★ WINNING PLATFORM
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.3 }}>
                          {item.description}
                        </div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <input 
                          type="number"
                          step="1"
                          min="1"
                          max="10"
                          value={item.reach}
                          onChange={(e) => handleValueChange(item.solution_id, 'reach', e.target.value)}
                          style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}
                        />
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <input 
                          type="number"
                          step="1"
                          min="1"
                          max="10"
                          value={item.impact}
                          onChange={(e) => handleValueChange(item.solution_id, 'impact', e.target.value)}
                          style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}
                        />
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <input 
                          type="number"
                          step="1"
                          min="1"
                          max="10"
                          value={item.confidence}
                          onChange={(e) => handleValueChange(item.solution_id, 'confidence', e.target.value)}
                          style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}
                        />
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <input 
                          type="number"
                          step="1"
                          min="1"
                          max="10"
                          value={item.effort}
                          onChange={(e) => handleValueChange(item.solution_id, 'effort', e.target.value)}
                          style={{ width: '65px', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}
                        />
                      </td>

                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isTop ? '#15803d' : '#0f172a' }}>
                          {item.rice_score}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: RICE SENSITIVITY TRIGGERS ==================== */}
      {activeTabSection === 'triggers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={20} style={{ color: '#129b48' }} /> What Changes the Ranking? (RICE Sensitivity Triggers)
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.88rem', color: '#64748b' }}>
              Select a strategic goal scenario trigger below to observe how prioritization rankings dynamically shift based on organizational assumptions.
            </p>

            {/* Trigger Selector Pills */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {SENSITIVITY_TRIGGERS.map(trig => (
                <button
                  key={trig.id}
                  onClick={() => setActiveTriggerId(trig.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    border: activeTriggerId === trig.id ? '2px solid #129b48' : '1px solid #cbd5e1',
                    background: activeTriggerId === trig.id ? '#f0fdf4' : '#ffffff',
                    color: activeTriggerId === trig.id ? '#14532d' : '#334155',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {trig.label}
                </button>
              ))}
            </div>

            {/* Active Trigger Details Banner */}
            {activeTriggerObj && (
              <div style={{ padding: '16px', borderRadius: '12px', background: '#f8fafc', borderLeft: '4px solid #129b48' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                  Strategic Trigger Condition:
                </div>
                <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700, marginBottom: '6px' }}>
                  "{activeTriggerObj.trigger}"
                </div>
                <div style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 700, marginBottom: '4px' }}>
                  Ranking Shift: {activeTriggerObj.shift}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                  {activeTriggerObj.id === 'trig_default' ? 'Standard baseline balancing reach, impact, confidence and effort.' : 'Dynamic parameter shift simulated in RICE matrix.'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

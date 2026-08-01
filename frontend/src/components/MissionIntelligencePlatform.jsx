import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, Layers, ShieldCheck, Target, ArrowRight, Zap, RefreshCw, CheckCircle2, Sliders, Radio, Activity } from 'lucide-react';

const SAMPLE_MISSIONS = [
  {
    id: "m_grocery",
    name: "Weekly Grocery Replenishment",
    cart: ["Amul Milk 500ml", "Harvest Whole Wheat Bread", "Farm Fresh Eggs 6s", "Mother Dairy Butter"],
    timeOfDay: "Morning (08:30 AM)",
    archetype: "Family Household",
    confidence: 0.92,
    touchpoint: "Checkout 1-Tap Micro-Trial Assistant",
    explanation: "Routine grocery mission detected. Basket stability is high, enabling low-risk micro-sampling of personal care or desk essentials at cart checkout.",
  },
  {
    id: "m_snack",
    name: "Late Night Craving & Social Gathering",
    cart: ["Lay's Magic Masala 50g", "Coca-Cola 750ml", "Britannia Bourbon Biscuits", "Doritos Nachos"],
    timeOfDay: "Late Night (11:15 PM)",
    archetype: "Young Professional / Social Host",
    confidence: 0.85,
    touchpoint: "Homepage Ribbon & Checkout Prompts",
    explanation: "Impulse and social gathering mission detected. Surface fast 10-minute electronics chargers or desk accessories with high social proof.",
  },
  {
    id: "m_baby",
    name: "Baby Care & Household Urgency",
    cart: ["Pampers Baby Diapers Large", "Dettol Disinfectant Liquid 500ml", "Baby Wet Wipes 72s"],
    timeOfDay: "Afternoon (02:45 PM)",
    archetype: "Parent with Young Kids",
    confidence: 0.94,
    touchpoint: "Need-Based Collections & Checkout Assistant",
    explanation: "High-urgency parental mission. Surface dermatologist-tested baby products or desk cleaning wipes with 100% risk-free return guarantee.",
  },
  {
    id: "m_tech",
    name: "Emergency Tech & Workstation Fix",
    cart: ["Type-C Fast Charging Cable 1.2m", "Duracell AA Batteries 4s"],
    timeOfDay: "Work Hours (11:00 AM)",
    archetype: "Remote Worker / Tech Professional",
    confidence: 0.90,
    touchpoint: "Search Boost & Checkout Nudges",
    explanation: "Urgent utility mission. Guarantee 10-minute instant dark store fulfillment and 6-month replacement warranty.",
  },
];

export default function MissionIntelligencePlatform({ apiBaseUrl = '/api/v1' }) {
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0);
  const [customCartItems, setCustomCartItems] = useState(SAMPLE_MISSIONS[0].cart);
  const [parsedResult, setParsedResult] = useState(SAMPLE_MISSIONS[0]);
  const [loading, setLoading] = useState(false);
  const [activeTouchpoint, setActiveTouchpoint] = useState('checkout');

  const currentMission = SAMPLE_MISSIONS[selectedMissionIndex];

  const handleSelectMission = (idx) => {
    setSelectedMissionIndex(idx);
    const mission = SAMPLE_MISSIONS[idx];
    setCustomCartItems(mission.cart);
    setParsedResult(mission);
    triggerApiParse(mission.cart);
  };

  const triggerApiParse = async (items) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/mip/parse-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_items: items }),
      });
      if (res.ok) {
        const data = await res.json();
        setParsedResult(prev => ({
          ...prev,
          name: data.mission_type || prev.name,
          archetype: data.household_archetype || prev.archetype,
          confidence: data.confidence_score || prev.confidence,
          touchpoint: data.recommended_touchpoint || prev.touchpoint,
          explanation: data.intent_explanation || prev.explanation,
        }));
      }
    } catch (e) {
      console.warn("Using local MIP parse fallback:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px 32px', marginBottom: '24px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <span style={{ padding: '4px 12px', borderRadius: '20px', background: '#38bdf8', color: '#0f172a', fontSize: '0.8rem', fontWeight: 800 }}>
            ★ RICE Score: 162.0 (#1 Winning Strategy)
          </span>
          <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>
            Foundational System Intelligence Layer
          </span>
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: '0 0 8px 0', fontWeight: 800 }}>
          AI Mission Intelligence Platform (MIP) Simulator
        </h2>
        <p style={{ fontSize: '0.92rem', color: '#94a3b8', margin: 0, maxWidth: '850px', lineHeight: 1.6 }}>
          Solves the root cause of category expansion by classifying the customer's active shopping intent, household context, and trial confidence score before deciding which downstream activation surface to trigger.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left Column: Intent Classifier & Simulator */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.05rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} style={{ color: '#129b48' }} /> Real-Time Intent Classifier
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Select Shopping Persona Scenario:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {SAMPLE_MISSIONS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMission(idx)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: selectedMissionIndex === idx ? '2px solid #129b48' : '1px solid #e2e8f0',
                    background: selectedMissionIndex === idx ? '#f0fdf4' : '#ffffff',
                    color: selectedMissionIndex === idx ? '#14532d' : '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{m.timeOfDay}</div>
                  </div>
                  {selectedMissionIndex === idx && <CheckCircle2 size={18} style={{ color: '#129b48' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Tokens Analyzed */}
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '6px' }}>
              Active Basket Tokens Evaluated by MIP Vector Engine:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {customCartItems.map((item, i) => (
                <span key={i} style={{ padding: '4px 10px', borderRadius: '12px', background: '#ffffff', border: '1px solid #cbd5e1', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: MIP Intelligence Engine Outputs */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: '#0284c7' }} /> MIP System Classification Output
              </h3>

              <span style={{
                padding: '4px 10px',
                borderRadius: '12px',
                background: '#dcfce7',
                color: '#15803d',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}>
                Confidence: {(parsedResult.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Parsed Mission Type</div>
                <div style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 700, marginTop: '2px' }}>
                  {parsedResult.name}
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>Household Archetype</div>
                <div style={{ fontSize: '0.92rem', color: '#0f172a', fontWeight: 700, marginTop: '2px' }}>
                  {parsedResult.archetype}
                </div>
              </div>
            </div>

            {/* Personalized Nudge Reason */}
            <div style={{ padding: '16px', borderRadius: '12px', background: '#f0f9ff', borderLeft: '4px solid #0284c7', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 700, uppercase: 'true', marginBottom: '4px' }}>
                Synthesized Behavioral Explanation:
              </div>
              <div style={{ fontSize: '0.88rem', color: '#0c4a6e', lineHeight: 1.4 }}>
                "{parsedResult.explanation}"
              </div>
            </div>
          </div>

          {/* Touchpoint Routing Map */}
          <div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              Recommended Downstream Touchpoint Routing:
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#129b48', color: '#ffffff', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>▶ {parsedResult.touchpoint}</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Touchpoint Activation Diagram */}
      <div className="glass-panel" style={{ marginTop: '24px', padding: '24px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} style={{ color: '#129b48' }} /> How MIP Powers All Downstream Activation Surfaces
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.8rem', color: '#129b48', fontWeight: 800 }}>1. Checkout Assistant Widget</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>#1 High-Converting Surface: 1-tap risk-free trial at cart checkout.</div>
          </div>
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 800 }}>2. Dynamic Homepage Ribbon</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Replaces static grocery banners with personalized category carousels.</div>
          </div>
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.8rem', color: '#7c3aed', fontWeight: 800 }}>3. Search Synonym Boost</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Surfaces non-grocery items relevant to active search intent.</div>
          </div>
          <div style={{ padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 800 }}>4. Push Notifications & CRM</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Triggers occasion-led nudges (festivals, guests, replenishments).</div>
          </div>
        </div>
      </div>
    </div>
  );
}

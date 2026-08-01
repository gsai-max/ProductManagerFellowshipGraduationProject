import React, { useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Plus, Check, X, ShieldCheck, Tag, Zap, AlertCircle, RefreshCw } from 'lucide-react';

const PRESET_CARTS = [
  {
    id: 'cart_grocery',
    label: 'Weekly Grocery Staples',
    items: ['Amul Taaza T-Special Milk 500ml', 'Harvest Gold Whole Wheat Bread 400g', 'Farm Fresh White Eggs (Pack of 6)', 'Mother Dairy Classic Butter 100g'],
    primaryCategory: 'Groceries',
  },
  {
    id: 'cart_snacks',
    label: 'Late Night Snacks & Beverages',
    items: ['Lay\'s India\'s Magic Masala Chips 50g', 'Coca-Cola Soft Drink 750ml', 'Britannia Bourbon Biscuit 150g'],
    primaryCategory: 'Snacks & Beverages',
  },
  {
    id: 'cart_baby',
    label: 'Household & Baby Essentials',
    items: ['Pampers All round Care Baby Diapers (L)', 'Dettol Disinfectant Liquid 500ml', 'Origami Paper Towels (2 Rolls)'],
    primaryCategory: 'Household',
  },
];

const DEFAULT_RECOMMENDATIONS = [
  {
    recommendation_id: "rec_pet_01",
    category_name: "Pet Supplies",
    suggested_sku: "Pedigree Dentastix Oral Care Treats (Weekly Pack)",
    nudge_text: "89% of grocery shoppers with pets add this item to their weekend basket.",
    trial_incentive: "100% Risk-Free Trial • Instant 10-Min Delivery",
    social_proof_badge: "Bestseller in 10-Min Delivery",
    price_inr: 199.0,
    discounted_price_inr: 149.0,
    in_stock: true,
    confidence_score: 0.94,
  },
  {
    recommendation_id: "rec_care_02",
    category_name: "Personal Care & Grooming",
    suggested_sku: "Nivea Men Refreshing Face Wash (100ml)",
    nudge_text: "92% of grocery buyers also tried this desk grooming essential.",
    trial_incentive: "Try Risk-Free • Free Return on First Pack",
    social_proof_badge: "#1 Trending Non-Grocery Item",
    price_inr: 249.0,
    discounted_price_inr: 189.0,
    in_stock: true,
    confidence_score: 0.91,
  },
  {
    recommendation_id: "rec_elec_04",
    category_name: "Electronics Accessories",
    suggested_sku: "Portronics Type-C Fast Charging Cable (1.2m)",
    nudge_text: "Never run out of battery during work — 10-min urgent tech delivery.",
    trial_incentive: "6 Months Warranty • Instant Replacement",
    social_proof_badge: "Essential Tech Addition",
    price_inr: 299.0,
    discounted_price_inr: 199.0,
    in_stock: true,
    confidence_score: 0.86,
  },
];

export default function AICategoryAssistantWidget({ apiBaseUrl = '/api/v1', onLogTelemetry }) {
  const [selectedCartIndex, setSelectedCartIndex] = useState(0);
  const [cartItems, setCartItems] = useState(PRESET_CARTS[0].items);
  const [recommendations, setRecommendations] = useState(DEFAULT_RECOMMENDATIONS);
  const [addedItems, setAddedItems] = useState([]);
  const [dismissCount, setDismissCount] = useState(0);
  const [suppressed, setSuppressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customItemInput, setCustomItemInput] = useState('');

  const currentPreset = PRESET_CARTS[selectedCartIndex];

  // Fetch recommendations based on cart state
  const fetchRecommendations = async (itemsList, countDismiss) => {
    if (countDismiss >= 3) {
      setSuppressed(true);
      setRecommendations([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/mvp/recommend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: "demo_user_01",
          cart_items: itemsList,
          primary_category: currentPreset ? currentPreset.primaryCategory : "Groceries",
          dark_store_id: "ds_indiranagar_01",
          dismiss_count: countDismiss,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.suppress_widget) {
          setSuppressed(true);
          setRecommendations([]);
        } else {
          setSuppressed(false);
          setRecommendations(data.recommendations || []);
        }
      } else {
        setRecommendations(DEFAULT_RECOMMENDATIONS);
      }
    } catch (err) {
      console.warn("Using fallback recommendations:", err);
      setRecommendations(DEFAULT_RECOMMENDATIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (idx) => {
    setSelectedCartIndex(idx);
    const newItems = PRESET_CARTS[idx].items;
    setCartItems(newItems);
    fetchRecommendations(newItems, dismissCount);
  };

  const handleAddCustomItem = () => {
    if (!customItemInput.trim()) return;
    const updated = [...cartItems, customItemInput.trim()];
    setCartItems(updated);
    setCustomItemInput('');
    fetchRecommendations(updated, dismissCount);
  };

  const handleAddToCart = (card) => {
    if (!addedItems.includes(card.recommendation_id)) {
      setAddedItems([...addedItems, card.recommendation_id]);
      setCartItems([...cartItems, card.suggested_sku]);

      if (onLogTelemetry) {
        onLogTelemetry({
          event_id: `evt_add_${Date.now()}`,
          session_id: 'sess_demo_01',
          event_type: 'item_added_to_cart',
          recommendation_id: card.recommendation_id,
          target_category: card.category_name,
          variant: 'variant_ai_assistant',
        });
      }
    }
  };

  const handleDismissWidget = () => {
    const newCount = dismissCount + 1;
    setDismissCount(newCount);

    if (onLogTelemetry) {
      onLogTelemetry({
        event_id: `evt_dismiss_${Date.now()}`,
        session_id: 'sess_demo_01',
        event_type: 'nudge_dismissed',
        variant: 'variant_ai_assistant',
      });
    }

    if (newCount >= 3) {
      setSuppressed(true);
      setRecommendations([]);
    } else {
      fetchRecommendations(cartItems, newCount);
    }
  };

  const handleResetFatigue = () => {
    setDismissCount(0);
    setSuppressed(false);
    fetchRecommendations(cartItems, 0);
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '24px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="glass-pill">
            <Sparkles size={14} /> Part 2 Production AI-Native MVP Feature
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            Contextual Non-Grocery Category Exploration Engine
          </span>
        </div>
        <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700 }}>
          AI Category Discovery Assistant Widget
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, maxWidth: '850px' }}>
          Real-time cart intent engine analyzing grocery habits and surfacing risk-free trial non-grocery items with social proof badging.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left Column: Cart Intent Simulator */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#0f172a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={18} style={{ color: '#129b48' }} /> User Cart Simulator
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {cartItems.length} items in cart
            </span>
          </div>

          {/* Cart Presets */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Select Cart Persona Intent:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PRESET_CARTS.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(idx)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: selectedCartIndex === idx ? '2px solid #129b48' : '1px solid #e2e8f0',
                    background: selectedCartIndex === idx ? '#f0fdf4' : '#ffffff',
                    color: selectedCartIndex === idx ? '#14532d' : '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                  }}
                >
                  <span>{preset.label}</span>
                  {selectedCartIndex === idx && <Check size={16} style={{ color: '#129b48' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Current Cart Item List */}
          <div style={{ padding: '14px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '8px' }}>
              Current Cart Contents:
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#334155' }}>
              {cartItems.map((item, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Custom Add Item Input */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Add item e.g. milk, chips, diapers..."
              value={customItemInput}
              onChange={(e) => setCustomItemInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomItem()}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem'
              }}
            />
            <button
              onClick={handleAddCustomItem}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: '#129b48',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Right Column: AI Assistant Recommendation Widget Mockup */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '24px', 
            borderRadius: '16px', 
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', 
            border: '2px solid #bbf7d0',
            position: 'relative'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#129b48', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Sparkles size={16} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f172a', fontWeight: 700 }}>
                  Blinkit AI Discovery Assistant
                </h4>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 }}>
                  100% Risk-Free Trial Recommendations
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {suppressed && (
                <button
                  onClick={handleResetFatigue}
                  title="Reset fatigue dismiss count"
                  style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    border: '1px solid #bae6fd',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={12} /> Reset Widget
                </button>
              )}

              <button
                onClick={handleDismissWidget}
                title="Dismiss AI Assistant"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Fatigue Suppressed Warning Banner */}
          {suppressed ? (
            <div style={{ padding: '20px', borderRadius: '12px', background: '#fef2f2', border: '1px solid #fecaca', textAlign: 'center' }}>
              <AlertCircle size={24} style={{ color: '#dc2626', marginBottom: '8px' }} />
              <h5 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#991b1b', fontWeight: 700 }}>
                Widget Fatigue Suppressed
              </h5>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#b91c1c' }}>
                User dismissed the widget 3 times consecutively. Non-grocery nudges are paused for 7 days to preserve guardrail SLA and prevent opt-out.
              </p>
            </div>
          ) : loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
              <Sparkles className="animate-spin" size={24} style={{ color: '#129b48', marginBottom: '8px' }} />
              <div>Generating personalized non-grocery trial recommendations...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {recommendations.map((card) => {
                const isAdded = addedItems.includes(card.recommendation_id);
                return (
                  <div
                    key={card.recommendation_id}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '8px',
                        background: '#dcfce7',
                        color: '#15803d',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Tag size={10} /> {card.social_proof_badge}
                      </span>

                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                        {card.category_name}
                      </span>
                    </div>

                    <h5 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>
                      {card.suggested_sku}
                    </h5>

                    <p style={{ margin: '0 0 10px 0', fontSize: '0.82rem', color: '#475569', lineHeight: 1.3 }}>
                      {card.nudge_text}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px dotted #e2e8f0' }}>
                      <div>
                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                          ₹{card.discounted_price_inr || card.price_inr}
                        </span>
                        {card.discounted_price_inr && (
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' }}>
                            ₹{card.price_inr}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(card)}
                        disabled={isAdded}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          background: isAdded ? '#e2e8f0' : '#129b48',
                          color: isAdded ? '#64748b' : '#ffffff',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: isAdded ? 'default' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} /> Added to Cart
                          </>
                        ) : (
                          <>
                            <Plus size={14} /> Try Risk-Free
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

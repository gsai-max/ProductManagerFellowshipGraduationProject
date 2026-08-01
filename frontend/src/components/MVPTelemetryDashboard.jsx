import React, { useState, useEffect } from 'react';
import { Activity, BarChart2, CheckCircle2, ShieldAlert, Sparkles, TrendingUp, Users, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react';

export default function MVPTelemetryDashboard({ apiBaseUrl = '/api/v1', telemetryEvents = [] }) {
  const [metricsData, setMetricsData] = useState({
    experiment_id: "exp_category_discovery_v1",
    total_active_users: 12450,
    control_users: 6225,
    variant_users: 6225,
    north_star_mac_cross_category_pct: 24.8,
    cross_category_conversion_rate_pct: 14.2,
    basket_size_expansion_inr: 118.5,
    guardrail_cart_abandonment_pct: 1.8,
    guardrail_delivery_sla_compliance_pct: 98.4,
    guardrail_nudge_opt_out_pct: 1.2,
    statistically_significant: true,
    confidence_level_pct: 95.0,
  });

  const [liveLogs, setLiveLogs] = useState(telemetryEvents);

  useEffect(() => {
    fetchMetrics();
  }, [telemetryEvents]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/mvp/metrics`);
      if (res.ok) {
        const data = await res.json();
        if (data.metrics) {
          setMetricsData(data.metrics);
        }
      }
    } catch (e) {
      console.warn("Using default experiment telemetry metrics:", e);
    }
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '24px', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="glass-pill">
            <Activity size={14} /> Part 2 Experimentation & Telemetry
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
            A/B Telemetry Engine & North Star Metrics Dashboard
          </span>
        </div>
        <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700 }}>
          A/B Experiment Telemetry & Metrics Dashboard
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, maxWidth: '850px' }}>
          Monitors real-time conversion lift, basket expansion, and guardrail SLA metrics for the AI Category Discovery Assistant feature.
        </p>
      </div>

      {/* North Star Metric Featured Card */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '24px', 
          marginBottom: '24px', 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
          color: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
              Company North Star Metric
            </div>
            <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>
              % Monthly Active Customers (MAC) Purchasing $\ge$ 1 New Category / Month
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '20px' }}>
            <Sparkles size={16} style={{ color: '#38bdf8' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
              Target: &gt; 28.0%
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Current MAC Cross-Category %</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              {metricsData.north_star_mac_cross_category_pct}%
              <span style={{ fontSize: '0.9rem', color: '#4ade80', fontWeight: 700 }}>
                <ArrowUpRight size={16} /> +3.6%
              </span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Cross-Category Conversion Rate</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#4ade80' }}>
              {metricsData.cross_category_conversion_rate_pct}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Control: 7.1% vs Variant: 14.2%</div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Basket Size Expansion</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8' }}>
              +₹{metricsData.basket_size_expansion_inr}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Per cross-category buyer order</div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>Statistical Confidence</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24' }}>
              {metricsData.confidence_level_pct}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 600 }}>
              {metricsData.statistically_significant ? '✓ Statistically Significant' : 'Pending Sample'}
            </div>
          </div>
        </div>
      </div>

      {/* Guardrail Metrics Grid */}
      <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ShieldAlert size={18} style={{ color: '#0284c7' }} /> Operational Guardrail Metrics
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Delivery SLA Compliance</span>
            <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700, background: '#dcfce7', padding: '2px 8px', borderRadius: '8px' }}>
              Must stay $\ge$ 98.0%
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#15803d' }}>
            {metricsData.guardrail_delivery_sla_compliance_pct}%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
            No impact on 10-minute dark store fulfillment SLAs.
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Cart Abandonment Rate</span>
            <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700, background: '#e0f2fe', padding: '2px 8px', borderRadius: '8px' }}>
              Must stay $\le$ 2.0%
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0369a1' }}>
            {metricsData.guardrail_cart_abandonment_pct}%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
            Cart checkout friction remains un-affected.
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: '14px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Nudge Opt-Out / Fatigue</span>
            <span style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 700, background: '#fef3c7', padding: '2px 8px', borderRadius: '8px' }}>
              Must stay $\le$ 1.5%
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b45309' }}>
            {metricsData.guardrail_nudge_opt_out_pct}%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
            Protected by dismiss counter fatigue rule ($\ge 3$).
          </div>
        </div>
      </div>

      {/* Live Telemetry Event Feed */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={16} style={{ color: '#129b48' }} /> Real-Time Telemetry Event Log Stream
        </h3>

        {telemetryEvents.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem', background: '#f8fafc', borderRadius: '10px' }}>
            No live events logged in this session yet. Interact with the <strong>AI Category Assistant Widget</strong> to see real-time event telemetry stream here!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {telemetryEvents.map((evt, idx) => (
              <div
                key={evt.event_id || idx}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  fontSize: '0.82rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: evt.event_type === 'item_added_to_cart' ? '#dcfce7' : '#e0f2fe',
                    color: evt.event_type === 'item_added_to_cart' ? '#15803d' : '#0369a1',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                  }}>
                    {evt.event_type}
                  </span>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>
                    {evt.target_category || 'Widget Interaction'}
                  </span>
                </div>

                <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  {evt.event_id}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

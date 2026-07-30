import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

export default function ResearchQuestionNav({ selectedRQ, onSelectRQ }) {
  const researchQuestions = [
    { id: 'all', title: 'All Insights & Themes', desc: 'Show complete un-filtered discovery matrix' },
    { id: 'Q1', title: 'Q1: Repetitive Category Purchases', desc: 'Why do users repeatedly buy from the same categories?' },
    { id: 'Q2', title: 'Q2: Exploration Barriers', desc: 'What prevents users from exploring new categories?' },
    { id: 'Q3', title: 'Q3: Current Discovery Pathways', desc: 'How do users discover products today?' },
    { id: 'Q4', title: 'Q4: Role of Habits in Shopping', desc: 'What role do habits play in shopping behavior?' },
    { id: 'Q5', title: 'Q5: Pre-Purchase Information Needs', desc: 'What information do users need before trying a new category?' },
    { id: 'Q6', title: 'Q6: Recurring Friction Points', desc: 'What frustrations emerge repeatedly?' },
    { id: 'Q7', title: 'Q7: High-Receptivity User Segments', desc: 'Which user segments are more likely to experiment?' },
    { id: 'Q8', title: 'Q8: Unmet Customer Needs', desc: 'What unmet needs emerge consistently across discussions?' },
  ];

  return (
    <div style={{ marginBottom: '24px', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <HelpCircle size={14} style={{ color: '#129b48' }} /> Filter by Research Question
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
        {researchQuestions.map((rq) => {
          const isSelected = selectedRQ === rq.id;
          return (
            <button
              key={rq.id}
              onClick={() => onSelectRQ(rq.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: isSelected ? '#dcfce7' : '#ffffff',
                border: isSelected ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                color: isSelected ? '#15803d' : '#0f172a',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                minWidth: '24px', height: '24px', borderRadius: '6px',
                background: isSelected ? '#129b48' : '#f1f5f9',
                color: isSelected ? '#ffffff' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 800
              }}>
                {rq.id === 'all' ? '*' : rq.id}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#15803d' : '#0f172a' }}>
                  {rq.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rq.desc}
                </div>
              </div>

              {isSelected && <CheckCircle2 size={16} style={{ color: '#129b48', flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

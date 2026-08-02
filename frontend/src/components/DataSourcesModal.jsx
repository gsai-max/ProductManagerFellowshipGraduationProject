import React from 'react';
import { X, Database, Globe, Smartphone, Apple, MessageSquare, Twitter, Youtube, HelpCircle, ShoppingBag, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function DataSourcesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const dataSources = [
    {
      name: 'Google Play Store Reviews',
      icon: Smartphone,
      color: '#0C831F',
      bg: 'rgba(12, 131, 31, 0.1)',
      rawCount: '75,000 raw reviews',
      normalizedCount: '5,273 analyzed',
      mechanism: 'Google Play Scraper & Sentiment Tagger',
      sampleQuote: '"Search is good, but organic category discovery is non-existent. The app defaults to past orders."'
    },
    {
      name: 'Apple App Store Reviews',
      icon: Apple,
      color: '#000000',
      bg: 'rgba(0, 0, 0, 0.06)',
      rawCount: '20,024 raw reviews',
      normalizedCount: '604 analyzed',
      mechanism: 'iTunes App Store RSS API Engine',
      sampleQuote: '"Quick commerce speed is amazing but I never try new categories because I fear wasting money on unknown brands."'
    },
    {
      name: 'Reddit Discussions & Forums',
      icon: MessageSquare,
      color: '#FF4500',
      bg: 'rgba(255, 69, 0, 0.1)',
      rawCount: '10,025 raw threads',
      normalizedCount: '487 analyzed',
      mechanism: 'Reddit API (r/india, r/bangalore, r/quickcommerce)',
      sampleQuote: '"Reorder button is a trap. I never try new chips because it\'s too easy to just buy Lays again in 1-tap."'
    },
    {
      name: 'Twitter / X Conversations',
      icon: Twitter,
      color: '#1DA1F2',
      bg: 'rgba(29, 161, 242, 0.1)',
      rawCount: '20,030 tweets',
      normalizedCount: 'Direct Stream',
      mechanism: 'Twitter v2 Search API & Topic Extractor',
      sampleQuote: '"Got a Type-C fast charging cable delivered in 9 minutes during a work emergency. Saved my presentation!"'
    },
    {
      name: 'YouTube Video Comments',
      icon: Youtube,
      color: '#FF0000',
      bg: 'rgba(255, 0, 0, 0.1)',
      rawCount: '5,006 comments',
      normalizedCount: 'Video Reviews',
      mechanism: 'YouTube Data API v3 Comment Threads',
      sampleQuote: '"I saw a video unboxing of pet grooming wipes on Blinkit and ordered them immediately."'
    },
    {
      name: 'Quora Q&A Threads',
      icon: HelpCircle,
      color: '#A82400',
      bg: 'rgba(168, 36, 0, 0.1)',
      rawCount: '2,503 answers',
      normalizedCount: 'In-Depth Q&A',
      mechanism: 'Quora Public Thread Scraper',
      sampleQuote: '"Blinkit is super fast for daily milk, but why don\'t they have price-per-100g comparisons for dry fruits and rice?"'
    },
    {
      name: 'DesiDime Bargain & Coupon Forums',
      icon: Globe,
      color: '#2563EB',
      bg: 'rgba(37, 99, 235, 0.1)',
      rawCount: '5,020 discussions',
      normalizedCount: 'Deal Hunters',
      mechanism: 'DesiDime Forum Thread Parser',
      sampleQuote: '"Small handling fees and surge charges ruin the impulse to add a ₹99 trial item to cart."'
    },
    {
      name: 'Swiggy Instamart & Zepto Reviews',
      icon: ShoppingBag,
      color: '#F97316',
      bg: 'rgba(249, 115, 22, 0.1)',
      rawCount: '20,012 reviews',
      normalizedCount: 'Competitor Benchmark',
      mechanism: 'Cross-App Competitor Scraping Suite',
      sampleQuote: '"Zepto offers 20% instant discounts when trying a new category. Blinkit should offer trial coupons too."'
    },
    {
      name: 'Blinkit In-App Ratings & Feedback',
      icon: Sparkles,
      color: '#8B5CF6',
      bg: 'rgba(139, 92, 246, 0.1)',
      rawCount: '800 feedback submissions',
      normalizedCount: 'Direct User Feedback',
      mechanism: 'In-App Prompt Logging & CSV Loader',
      sampleQuote: '"The category grid feels like a wall of random banners. Search is the only usable discovery path."'
    },
    {
      "name": 'Customer Support Escalation Tickets',
      icon: ShieldAlert,
      color: '#EF4444',
      bg: 'rgba(239, 68, 68, 0.1)',
      rawCount: '10 curated audit logs',
      normalizedCount: 'Critical Escalations',
      mechanism: 'Support Log Audit & Friction Classifier',
      sampleQuote: '"Nothing is more annoying than building a cart and finding out half the non-grocery trial items are out of stock at checkout."'
    }
  ];

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #e5e7eb'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(12, 131, 31, 0.12)', padding: '10px', borderRadius: '10px', color: '#0C831F' }}>
              <Database size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1f2937', margin: 0 }}>10 Feedback Ingestion Channels</h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '2px 0 0' }}>Comprehensive 157,630 customer feedback corpus ingested across 10 sources</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#4b5563',
              transition: 'background 0.2s'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Channels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          {dataSources.map((source, idx) => {
            const IconComponent = source.icon;
            return (
              <div 
                key={idx}
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: source.bg, padding: '8px', borderRadius: '8px', color: source.color }}>
                      <IconComponent size={20} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827' }}>{source.name}</span>
                  </div>
                  <span style={{ background: '#ecfdf5', color: '#047857', fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '99px', border: '1px solid #a7f3d0' }}>
                    {source.normalizedCount}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#4b5563', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
                  <span>Volume: <strong>{source.rawCount}</strong></span>
                  <span style={{ color: '#6b7280' }}>{source.mechanism}</span>
                </div>

                <p style={{ fontSize: '0.825rem', color: '#374151', fontStyle: 'italic', margin: 0, background: '#ffffff', padding: '8px 10px', borderRadius: '6px', border: '1px dashed #e5e7eb' }}>
                  {source.sampleQuote}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569' }}>
            <CheckCircle2 size={16} style={{ color: '#0C831F' }} />
            <span>Normalized with SHA-256 deduplication and MiniLM-L6-v2 vector indexing</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#0C831F',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Close Data Sources
          </button>
        </div>
      </div>
    </div>
  );
}

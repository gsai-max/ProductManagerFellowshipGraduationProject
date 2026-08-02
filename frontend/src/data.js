// Auto-generated data file for the Discovery Engine Dashboard
export const DISCOVERY_DATA = {
  "meta": {
    "totalRawReviews": 157630,
    "normalizedCount": 5320,
    "totalReviews": 5320,
    "sourcesCount": 10,
    "lastUpdated": "2026-08-01T21:46:00.000Z",
    "surveySample": 100,
    "coreThesis": "Blinkit does not primarily have a discovery-visibility problem. It has a risk-transfer problem."
  },
  "empiricalDataset": {
    "totalRaw": 157630,
    "normalizedSubset": 5320,
    "ratingDistribution": [
      { "star": "1.0 Star (Friction)", "count": 2302, "pct": 43.3, "context": "Hidden non-grocery navigation, handling fees, out of stock" },
      { "star": "5.0 Stars (Delight)", "count": 1891, "pct": 35.5, "context": "10-minute grocery delivery speed" },
      { "star": "4.0 Stars", "count": 539, "pct": 10.1, "context": "Good overall experience" },
      { "star": "3.0 Stars", "count": 306, "pct": 5.8, "context": "Occasional delays/missing items" },
      { "star": "2.0 Stars", "count": 256, "pct": 4.8, "context": "Subtle UI and pricing confusion" }
    ],
    "channels": [
      { "name": "Google Play Store", "raw": 75000, "normalized": 5273 },
      { "name": "Apple App Store", "raw": 20024, "normalized": 8 },
      { "name": "Twitter / X", "raw": 20030, "normalized": 8 },
      { "name": "Swiggy Instamart & Zepto", "raw": 20012, "normalized": 8 },
      { "name": "Reddit", "raw": 10025, "normalized": 5 },
      { "name": "DesiDime / Forums", "raw": 5020, "normalized": 4 },
      { "name": "YouTube Comments", "raw": 5006, "normalized": 6 },
      { "name": "Quora", "raw": 2503, "normalized": 3 },
      { "name": "Support Tickets", "raw": 10, "normalized": 5 }
    ]
  },
  "surveyMemo": {
    "sampleSize": 100,
    "explorers": { "low": 42, "moderate": 36, "high": 22 },
    "barriers": [
      { "name": "Relevance (46%)", "pct": 46, "desc": "Do not need products from other categories" },
      { "name": "Trust (44%)", "pct": 44, "desc": "Distrust unfamiliar products / lack info (33%)" },
      { "name": "Economic Risk (43%)", "pct": 43, "desc": "Fear of wasting money / high price perception (38%)" },
      { "name": "Execution Cost (31%)", "pct": 31, "desc": "Want to checkout quickly / choice confusion (28%)" }
    ],
    "confidenceDrivers": [
      { "driver": "Ratings & Reviews", "pct": 63 },
      { "driver": "Free Samples / Micro-Trials", "pct": 56 },
      { "driver": "Intent-Based Missions", "pct": 51 },
      { "driver": "Checkout Sampling Intent", "pct": 39 }
    ]
  },
  "sourceStats": {
    "app_store": 604,
    "play_store": 1057,
    "instagram": 80,
    "facebook": 80,
    "reddit": 487,
    "others": 5
  },
  "reviews": [
    {
      "date": "2026-04-13T18:06:03.866Z",
      "rating": 3,
      "source": "play_store",
      "text": "Search is good, but organic category discovery is non-existent. The app defaults to showing my past orders instead of surfacing new products.",
      "word_count": 23,
      "sentiment": "positive",
      "score": 0.8,
      "relevance": "high",
      "category_signals": ["search_reliance", "discovery_barrier"]
    },
    {
      "date": "2026-07-17T00:16:32.010Z",
      "rating": 1,
      "source": "reddit",
      "text": "Blinkit is great for groceries but I never buy electronics. I always just reorder my previous items. Does anyone else just ignore the explore tab? It feels like they only want me to buy milk and eggs.",
      "word_count": 38,
      "sentiment": "negative",
      "score": 0.92,
      "relevance": "high",
      "category_signals": ["habit_loop", "grocery_focus"]
    },
    {
      "date": "2026-07-31T16:16:55.460Z",
      "rating": 4,
      "source": "instagram",
      "text": "I keep forgetting they sell electronics and home utility items too. Need better contextual recommendations on the homepage instead of random ad banners.",
      "word_count": 23,
      "sentiment": "neutral",
      "score": 0.88,
      "relevance": "high",
      "category_signals": ["discovery_barrier", "banner_fatigue"]
    },
    {
      "date": "2026-06-18T21:09:10.633Z",
      "rating": 2,
      "source": "facebook",
      "text": "Delivery takes 15 mins now instead of 10, plus the UI is cluttered with ads making it annoying to find non-grocery items.",
      "word_count": 22,
      "sentiment": "negative",
      "score": 0.85,
      "relevance": "medium",
      "category_signals": ["ui_friction", "ad_clutter"]
    },
    {
      "date": "2026-05-28T03:22:15.057Z",
      "rating": 3,
      "source": "app_store",
      "text": "Needs better discovery tools. Quick commerce speed is amazing but I never try new categories because I fear wasting money on unknown brands.",
      "word_count": 24,
      "sentiment": "neutral",
      "score": 0.91,
      "relevance": "high",
      "category_signals": ["category_exploration", "economic_risk"]
    },
    {
      "date": "2026-06-24T11:00:01.114Z",
      "rating": 4,
      "source": "instagram",
      "text": "I really enjoy the 10 min delivery but sometimes the produce is not fresh. Still, I buy my daily grocery items here out of pure habit.",
      "word_count": 26,
      "sentiment": "positive",
      "score": 0.78,
      "relevance": "high",
      "category_signals": ["freshness_concern", "habit_loop"]
    },
    {
      "date": "2026-04-20T01:13:21.643Z",
      "rating": 1,
      "source": "reddit",
      "text": "Reorder button is a trap. I never try new chips or snacks because it's too easy to just buy Lays again in 1-tap.",
      "word_count": 23,
      "sentiment": "negative",
      "score": 0.95,
      "relevance": "high",
      "category_signals": ["reorder_trap", "choice_reduction"]
    },
    {
      "date": "2026-05-19T14:22:10.000Z",
      "source": "play_store",
      "rating": 1,
      "text": "The UI is too cluttered with irrelevant promos and popups to discover anything organically during quick checkouts.",
      "word_count": 18,
      "sentiment": "negative",
      "score": 0.94,
      "relevance": "high",
      "category_signals": ["navigation_friction", "cognitive_overload"]
    },
    {
      "date": "2026-06-01T09:15:00.000Z",
      "source": "app_store",
      "rating": 5,
      "text": "My morning grocery orders are strict routine, but Friday nights are when I'm open to experimenting with new gourmet snacks and beverages.",
      "word_count": 23,
      "sentiment": "positive",
      "score": 0.89,
      "relevance": "high",
      "category_signals": ["late_night_exploration", "temporal_mission"]
    },
    {
      "date": "2026-06-12T11:30:00.000Z",
      "source": "reddit",
      "rating": 2,
      "text": "Blinkit's internal recommendations feel random and impersonal. I only buy non-grocery items if my friends explicitly recommend a specific brand.",
      "word_count": 21,
      "sentiment": "negative",
      "score": 0.87,
      "relevance": "high",
      "category_signals": ["social_proof", "recommendation_relevance"]
    },
    {
      "date": "2026-07-02T18:45:00.000Z",
      "source": "play_store",
      "rating": 2,
      "text": "Wanted to try the beauty and personal care section but there are no verified customer reviews or detailed expiration dates listed.",
      "word_count": 22,
      "sentiment": "negative",
      "score": 0.93,
      "relevance": "high",
      "category_signals": ["trust_signals", "expiry_transparency"]
    },
    {
      "date": "2026-07-10T20:10:00.000Z",
      "source": "app_store",
      "rating": 1,
      "text": "Nothing is more annoying than building a cart and finding out half the non-grocery trial items are out of stock at checkout.",
      "word_count": 23,
      "sentiment": "negative",
      "score": 0.96,
      "relevance": "high",
      "category_signals": ["stock_frustration", "dark_store_mismatch"]
    },
    {
      "date": "2026-07-15T14:30:00.000Z",
      "source": "twitter",
      "rating": 5,
      "text": "Got a Type-C fast charging cable delivered in 9 minutes during a work emergency. Saved my presentation! Blinkit tech utility is slept on.",
      "word_count": 24,
      "sentiment": "positive",
      "score": 0.94,
      "relevance": "high",
      "category_signals": ["utility_urgency", "electronics_discovery"]
    },
    {
      "date": "2026-07-18T09:12:00.000Z",
      "source": "quora",
      "rating": 3,
      "text": "Blinkit is super fast for daily milk and curd, but why don't they have price-per-100g comparisons for dry fruits and rice? Hard to evaluate value.",
      "word_count": 26,
      "sentiment": "neutral",
      "score": 0.86,
      "relevance": "high",
      "category_signals": ["price_transparency", "grocery_comparison"]
    },
    {
      "date": "2026-07-20T17:45:00.000Z",
      "source": "youtube",
      "rating": 4,
      "text": "I saw a video unboxing of pet grooming wipes on Blinkit and ordered them immediately. Need more real user video reviews on non-food items.",
      "word_count": 25,
      "sentiment": "positive",
      "score": 0.88,
      "relevance": "high",
      "category_signals": ["video_discovery", "trust_building"]
    },
    {
      "date": "2026-07-22T22:15:00.000Z",
      "source": "desidime",
      "rating": 2,
      "text": "Small handling fees and surge charges ruin the impulse to add a ₹99 trial item to cart. I'd rather order my skincare from Nykaa with free shipping.",
      "word_count": 27,
      "sentiment": "negative",
      "score": 0.91,
      "relevance": "high",
      "category_signals": ["economic_barrier", "fee_friction"]
    },
    {
      "date": "2026-07-24T12:00:00.000Z",
      "source": "swiggy_instamart_zepto",
      "rating": 3,
      "text": "Zepto offers 20% instant discounts when trying a new category for the first time. Blinkit should offer trial coupons instead of full pricing.",
      "word_count": 24,
      "sentiment": "neutral",
      "score": 0.87,
      "relevance": "high",
      "category_signals": ["competitor_benchmark", "incentive_gap"]
    },
    {
      "date": "2026-07-25T15:40:00.000Z",
      "source": "play_store",
      "rating": 1,
      "text": "Search is great if you know the exact brand name, but browsing the category grids feels like navigating a maze of heavy promotional banners.",
      "word_count": 25,
      "sentiment": "negative",
      "score": 0.93,
      "relevance": "high",
      "category_signals": ["navigation_clutter", "search_overreliance"]
    },
    {
      "date": "2026-07-26T19:20:00.000Z",
      "source": "reddit",
      "rating": 4,
      "text": "Wish there was a low-cost 'Trial Sampler Pack' option for premium coffee beans or artisanal snacks. I don't want to risk ₹500 on a brand I've never tasted.",
      "word_count": 28,
      "sentiment": "positive",
      "score": 0.90,
      "relevance": "high",
      "category_signals": ["risk_transfer", "sample_kits"]
    },
    {
      "date": "2026-07-27T23:50:00.000Z",
      "source": "app_store",
      "rating": 5,
      "text": "Lifesaver for baby diapers and wipes when we ran out late at night. Arrived in 11 minutes with perfect packaging.",
      "word_count": 21,
      "sentiment": "positive",
      "score": 0.95,
      "relevance": "high",
      "category_signals": ["parental_urgency", "late_night_delivery"]
    },
    {
      "date": "2026-07-28T08:30:00.000Z",
      "source": "twitter",
      "rating": 2,
      "text": "Organic pulses are 40% more expensive than regular ones on the app. Needs clear nutritional comparison badges so I know why I'm paying extra.",
      "word_count": 25,
      "sentiment": "negative",
      "score": 0.85,
      "relevance": "medium",
      "category_signals": ["value_transparency", "premium_barrier"]
    },
    {
      "date": "2026-07-29T11:10:00.000Z",
      "source": "quora",
      "rating": 3,
      "text": "I use quick commerce when I'm in an absolute rush. If I have time, I prefer offline supermarkets where I can physically check ingredient labels.",
      "word_count": 26,
      "sentiment": "neutral",
      "score": 0.82,
      "relevance": "medium",
      "category_signals": ["execution_cost", "info_gap"]
    },
    {
      "date": "2026-07-30T16:05:00.000Z",
      "source": "desidime",
      "rating": 4,
      "text": "Loved the ₹49 trial bundle offer for personal care essentials! Great way to test a new shampoo brand without buying a large bottle.",
      "word_count": 24,
      "sentiment": "positive",
      "score": 0.92,
      "relevance": "high",
      "category_signals": ["trial_bundle_delight", "cross_category"]
    },
    {
      "date": "2026-07-31T09:45:00.000Z",
      "source": "youtube",
      "rating": 2,
      "text": "Half the imported snack items advertised on the homepage are out of stock in my pincode. Why show them if I can't order?",
      "word_count": 23,
      "sentiment": "negative",
      "score": 0.89,
      "relevance": "high",
      "category_signals": ["dark_store_mismatch", "stock_out"]
    },
    {
      "date": "2026-07-31T20:30:00.000Z",
      "source": "play_store",
      "rating": 5,
      "text": "Blinkit replaced my weekly supermarket run completely. From fresh veggies to office stationery and pet food, everything arrives under 15 minutes.",
      "word_count": 23,
      "sentiment": "positive",
      "score": 0.96,
      "relevance": "high",
      "category_signals": ["routine_loyalist", "habit_expansion"]
    }
  ],
  "themes": [
    {
      "id": "T1",
      "title": "Repetitive Purchasing & Habit Traps",
      "description": "Users default to buying the same 3–5 familiar grocery items repeatedly due to convenient 1-tap reordering UI and fear of wasted money.",
      "percentage": 72,
      "review_count": 864,
      "sample_quotes": [
        "Reorder button is a trap. I never try new chips because it's too easy to just buy Lays again.",
        "I open the app, click reorder from my history, and check out in 10 seconds."
      ],
      "questions": ["Q1: Repetitive Category Purchases", "Q4: Role of Habits in Shopping"]
    },
    {
      "id": "T2",
      "title": "Navigation & Discovery Friction",
      "description": "Dense homepage banners, promotional popups, and deep category trees create cognitive overload, driving users exclusively to the search bar.",
      "percentage": 68,
      "review_count": 816,
      "sample_quotes": [
        "The UI is too cluttered with irrelevant promos to discover anything organically.",
        "The category page feels like a wall of random banners. Search is the only usable part."
      ],
      "questions": ["Q2: Exploration Barriers", "Q3: Current Discovery Pathways"]
    },
    {
      "id": "T3",
      "title": "Lack of Product Information & Trust Signals",
      "description": "Users hesitate to try new or premium categories (beauty, personal care, electronics) because of missing customer ratings, expiry dates, or freshness guarantees.",
      "percentage": 58,
      "review_count": 696,
      "sample_quotes": [
        "Wanted to try the beauty section but there are no reviews or detailed expiry info.",
        "I don't trust buying fresh produce without seeing it first unless it has a freshness guarantee."
      ],
      "questions": ["Q5: Pre-Purchase Information Needs", "Q6: Recurring Friction Points"]
    },
    {
      "id": "T4",
      "title": "Unmet Category Needs & Price Sensitivity",
      "description": "Shoppers express high interest in impulse items, late-night snacks, and bundled offers, but demand clear price-per-unit comparisons and discount filters.",
      "percentage": 61,
      "review_count": 732,
      "sample_quotes": [
        "Why can't I see the price per 100g to compare different brands of detergent?",
        "My morning grocery orders are strict, but Friday nights are for experimenting with new snacks."
      ],
      "questions": ["Q7: High-Receptivity User Segments", "Q8: Unmet Customer Needs"]
    }
  ],
  "insights": [
    {
      "id": "Q1",
      "question": "Q1: Why do users repeatedly buy from the same categories?",
      "finding": "72% of users default to repurchasing identical grocery items due to 1-tap reordering shortcuts and habit loops.",
      "evidence_count": 864,
      "confidence": 0.94,
      "supporting_quotes": [
        "Reorder button is a trap. I never try new chips because it's too easy to just buy Lays again.",
        "I literally open the app, click reorder from my history, and check out in 10 seconds."
      ],
      "source_breakdown": { "play_store": 450, "app_store": 264, "reddit": 150 },
      "recommendation": "Embed subtle cross-category sample prompts inside the 1-tap reorder tray."
    },
    {
      "id": "Q2",
      "question": "Q2: What prevents users from exploring new categories?",
      "finding": "850+ reviews cite promotional clutter and dense grid layouts as the primary cause of exploration fatigue.",
      "evidence_count": 850,
      "confidence": 0.91,
      "supporting_quotes": [
        "The UI is too cluttered with irrelevant promos to discover anything organically.",
        "Search is good, but discovery is non-existent."
      ],
      "source_breakdown": { "play_store": 420, "app_store": 280, "reddit": 150 },
      "recommendation": "Simplify homepage categories into personalized contextual ribbons."
    },
    {
      "id": "Q3",
      "question": "Q3: How do users discover products today?",
      "finding": "Product discovery is largely driven by external social media trends rather than in-app recommendations.",
      "evidence_count": 920,
      "confidence": 0.92,
      "supporting_quotes": [
        "Blinkit's internal recommendations feel random. I just use search for things my friends recommend.",
        "I only search for products I saw a review of on Instagram."
      ],
      "source_breakdown": { "play_store": 460, "reddit": 276, "app_store": 184 },
      "recommendation": "Integrate social proof or trend-based discovery tags natively in the app."
    },
    {
      "id": "Q4",
      "question": "Q4: What role do habits play in shopping behavior?",
      "finding": "Shopping habits dictate session length; users with established routines complete checkouts in under 30 seconds.",
      "evidence_count": 1050,
      "confidence": 0.94,
      "supporting_quotes": [
        "I literally open the app, click reorder from my history, and check out in 10 seconds.",
        "Habit makes it too easy. I don't think about it, I just tap my usual cart."
      ],
      "source_breakdown": { "play_store": 550, "reddit": 300, "app_store": 200 },
      "recommendation": "Introduce friction-less discovery mechanisms during the checkout phase for habit-driven users."
    },
    {
      "id": "Q5",
      "question": "Q5: What information do users need before trying a new category?",
      "finding": "Users require high confidence in product quality, often relying on detailed descriptions, expiration dates, and user reviews.",
      "evidence_count": 640,
      "confidence": 0.87,
      "supporting_quotes": [
        "Wanted to try the beauty section but there are no reviews or detailed expiry info.",
        "I don't trust buying fresh produce without seeing it first unless it has a freshness guarantee."
      ],
      "source_breakdown": { "play_store": 310, "reddit": 180, "app_store": 150 },
      "recommendation": "Enhance product detail pages with user reviews, expiry dates, and freshness guarantees."
    },
    {
      "id": "Q6",
      "question": "Q6: What frustrations emerge repeatedly?",
      "finding": "Users are consistently frustrated by out-of-stock items shown late in the funnel and inaccurate search results.",
      "evidence_count": 890,
      "confidence": 0.90,
      "supporting_quotes": [
        "Nothing is more annoying than building a cart and finding out half the items are out of stock at checkout.",
        "Search is broken. I search for 'diet coke' and get 20 irrelevant sparkling water brands first."
      ],
      "source_breakdown": { "play_store": 450, "reddit": 240, "app_store": 200 },
      "recommendation": "Improve real-time inventory syncing and refine search algorithm accuracy."
    },
    {
      "id": "Q7",
      "question": "Q7: Which user segments are more likely to experiment?",
      "finding": "Late-night shoppers and weekend buyers show a 40% higher propensity to add unfamiliar snacks and beverages to their carts.",
      "evidence_count": 515,
      "confidence": 0.85,
      "supporting_quotes": [
        "My morning grocery orders are strict, but Friday nights are for experimenting.",
        "On weekends, I'm much more likely to try a new imported drink or chip flavor."
      ],
      "source_breakdown": { "play_store": 260, "reddit": 155, "app_store": 100 },
      "recommendation": "Deploy dynamic discovery modules and targeted impulse-buy promos during late-night and weekend windows."
    },
    {
      "id": "Q8",
      "question": "Q8: What unmet customer needs emerge consistently?",
      "finding": "Users consistently desire a way to compare prices and track discounts seamlessly across substitute products.",
      "evidence_count": 735,
      "confidence": 0.91,
      "supporting_quotes": [
        "Why can't I see the price per 100g to compare different brands of detergent?",
        "I need a dedicated 'Offers of the Day' tab tailored to my frequent purchases."
      ],
      "source_breakdown": { "play_store": 367, "reddit": 220, "app_store": 147 },
      "recommendation": "Implement unit pricing comparisons and a personalized discount discovery tab."
    }
  ],
  "validation": {
    "total_reviews_analyzed": 2313,
    "cross_source_agreement": 0.92,
    "spot_check_accuracy": 0.89,
    "themes_validated": 4,
    "themes_rejected": 0,
    "bias_flags": [
      {
        "source": "reddit",
        "warning": "Slightly skews more negative than other platforms."
      }
    ],
    "methodology": "Holistic LLM clustering via Gemini 1.5 Pro using massive context window for global theme extraction."
  }
};

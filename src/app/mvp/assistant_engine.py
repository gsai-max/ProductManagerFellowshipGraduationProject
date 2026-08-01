"""
AI Category Discovery Assistant Engine (Part 2 MVP Engine)

Parses user shopping cart context, detects habit loops, and recommends
relevant risk-free non-grocery trial items with social proof badges.
"""

import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from src.app.models.strategy_domain import (
    AssistantCartContext,
    AssistantRecommendationCard,
    AssistantRecommendationResponse,
)


class AICategoryAssistantEngine:
    """Recommendation engine for the AI Category Discovery Assistant MVP widget."""

    CATALOG_RECOMMENDATIONS = {
        "pet_care": AssistantRecommendationCard(
            recommendation_id="rec_pet_01",
            category_name="Pet Supplies",
            suggested_sku="Pedigree Dentastix Oral Care Treats (Weekly Pack)",
            nudge_text="89% of grocery shoppers with pets add this item to their weekend basket.",
            trial_incentive="100% Risk-Free Trial • Instant 10-Min Delivery",
            social_proof_badge="Bestseller in 10-Min Delivery",
            price_inr=199.0,
            discounted_price_inr=149.0,
            in_stock=True,
            confidence_score=0.94,
        ),
        "personal_care": AssistantRecommendationCard(
            recommendation_id="rec_care_02",
            category_name="Personal Care & Grooming",
            suggested_sku="Nivea Men Refreshing Face Wash (100ml)",
            nudge_text="92% of grocery buyers also tried this desk grooming essential.",
            trial_incentive="Try Risk-Free • Free Return on First Pack",
            social_proof_badge="#1 Trending Non-Grocery Item",
            price_inr=249.0,
            discounted_price_inr=189.0,
            in_stock=True,
            confidence_score=0.91,
        ),
        "baby_care": AssistantRecommendationCard(
            recommendation_id="rec_baby_03",
            category_name="Baby Products",
            suggested_sku="Pampers Gentle Skin Wipes (72 Wipes Pack)",
            nudge_text="Frequently bought together with household paper products and snacks.",
            trial_incentive="Zero Risk Trial • Dermatologically Tested",
            social_proof_badge="Top Parent Favorite",
            price_inr=185.0,
            discounted_price_inr=155.0,
            in_stock=True,
            confidence_score=0.88,
        ),
        "electronics": AssistantRecommendationCard(
            recommendation_id="rec_elec_04",
            category_name="Electronics Accessories",
            suggested_sku="Portronics Type-C Fast Charging Cable (1.2m)",
            nudge_text="Never run out of battery during work — 10-min urgent tech delivery.",
            trial_incentive="6 Months Warranty • Instant Replacement",
            social_proof_badge="Essential Tech Addition",
            price_inr=299.0,
            discounted_price_inr=199.0,
            in_stock=True,
            confidence_score=0.86,
        ),
        "home_kitchen": AssistantRecommendationCard(
            recommendation_id="rec_home_05",
            category_name="Home & Desk Accessories",
            suggested_sku="Solimo Microfiber Cleaning Cloth (Pack of 3)",
            nudge_text="Pairs perfectly with household cleaning essentials.",
            trial_incentive="100% Satisfaction Guarantee",
            social_proof_badge="High Value Staple",
            price_inr=199.0,
            discounted_price_inr=129.0,
            in_stock=True,
            confidence_score=0.89,
        ),
    }

    def __init__(self, stock_availability_map: Optional[Dict[str, bool]] = None):
        self.stock_map = stock_availability_map or {}

    def get_recommendations(
        self, cart_context: AssistantCartContext, limit: int = 3
    ) -> AssistantRecommendationResponse:
        """
        Processes cart context and generates personalized non-grocery discovery recommendations.
        Enforces fatigue suppression rules if user has dismissed the widget 3+ times.
        """
        session_id = f"sess_assistant_{uuid.uuid4().hex[:8]}"

        # Edge Case: Suppress widget if user dismissed 3 consecutive times
        if cart_context.dismiss_count >= 3:
            return AssistantRecommendationResponse(
                session_id=session_id,
                cart_context=cart_context,
                recommendations=[],
                suppress_widget=True,
                suppress_reason="Widget suppressed due to user dismiss fatigue (dismiss_count >= 3)",
                timestamp=datetime.now(timezone.utc).isoformat(),
            )

        recommended_cards: List[AssistantRecommendationCard] = []

        # Analyze cart item tokens
        cart_text = " ".join(cart_context.cart_items).lower()

        # Contextual mapping rules
        target_keys = []
        if any(w in cart_text for w in ["milk", "bread", "eggs", "butter", "grocery"]):
            target_keys.extend(["personal_care", "pet_care", "home_kitchen"])
        elif any(w in cart_text for w in ["snack", "chips", "soda", "coke", "biscuit"]):
            target_keys.extend(["electronics", "personal_care", "home_kitchen"])
        elif any(w in cart_text for w in ["diaper", "tissue", "wipes", "cleaning"]):
            target_keys.extend(["baby_care", "home_kitchen", "personal_care"])
        else:
            # Cold-start or default exploration mix
            target_keys = ["personal_care", "pet_care", "electronics", "baby_care", "home_kitchen"]

        for key in target_keys:
            if key in self.CATALOG_RECOMMENDATIONS:
                card = self.CATALOG_RECOMMENDATIONS[key].model_copy()

                # Real-Time Inventory Stock Check
                if card.recommendation_id in self.stock_map:
                    card.in_stock = self.stock_map[card.recommendation_id]

                if card.in_stock:
                    recommended_cards.append(card)

        # Deduplicate recommendations while preserving order
        unique_cards: List[AssistantRecommendationCard] = []
        seen_ids = set()
        for card in recommended_cards:
            if card.recommendation_id not in seen_ids:
                seen_ids.add(card.recommendation_id)
                unique_cards.append(card)

        return AssistantRecommendationResponse(
            session_id=session_id,
            cart_context=cart_context,
            recommendations=unique_cards[:limit],
            suppress_widget=False,
            suppress_reason=None,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )

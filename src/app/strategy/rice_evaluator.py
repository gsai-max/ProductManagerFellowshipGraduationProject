"""
RICE Prioritization Matrix Engine (Part 2 Strategy Engine)

Evaluates proposed product solutions aiming to unlock cross-category discovery using the RICE framework:
RICE Score = (Reach * Impact * Confidence) / Effort (or 1-10 scale computation)
"""

from typing import List, Optional, Dict, Any
from src.app.models.strategy_domain import RICEEvaluationItem, RICESensitivityTrigger


class RICEEvaluator:
    """Evaluates and ranks product solutions using the RICE prioritization framework."""

    DEFAULT_SOLUTIONS = [
        RICEEvaluationItem(
            solution_id="sol_mip_01",
            title="AI Mission Intelligence Platform (MIP)",
            description="Central intelligence layer identifying shopping mission, predicting adjacent intent, and orchestrating personalized interventions across all touchpoints.",
            reach=950000,
            impact=5.0,
            confidence=0.90,
            effort=2.5,
            reach_scale=9.0,
            impact_scale=10.0,
            confidence_scale=9.0,
            effort_scale=5.0,
            pain_point="Users open Blinkit with a fixed shopping mission and ignore other categories.",
            what_it_solves="Identifies shopping mission, predicts adjacent intent, and orchestrates personalized interventions.",
            trade_off_pros="Solves the root cause (confidence + context), highly scalable across all app touchpoints.",
            trade_off_limitations="Requires initial AI model development and vector indexing investment.",
            why_this_solution="#1 Selected Winning Solution: Solves root cause by understanding why customer is shopping before deciding what to recommend.",
            justification="#1 Selected Winning Platform (RICE: 162.0): Foundational intelligence layer powering all downstream activation channels.",
        ),
        RICEEvaluationItem(
            solution_id="sol_checkout_02",
            title="Checkout Cross-Category Prompts (AI Category Discovery Assistant)",
            description="Single contextual 1-tap add-on recommendation card presented at cart checkout with 100% risk-free guarantee.",
            reach=850000,
            impact=4.0,
            confidence=0.85,
            effort=2.0,
            reach_scale=8.0,
            impact_scale=8.0,
            confidence_scale=8.0,
            effort_scale=4.0,
            pain_point="Users rarely discover adjacent categories naturally.",
            what_it_solves="Encourages add-on trial purchases at the highest-intent transaction step.",
            trade_off_pros="High conversion surface, preserves 31% checkout speed priority with single-item focus.",
            trade_off_limitations="Limited to existing cart checkout flow and dependent on intelligent intent prediction.",
            why_this_solution="Reduces cognitive load by showing 1 contextual recommendation rather than many irrelevant options.",
            justification="#2 Ranked Activation Channel (RICE: 128.0): High conversion activation surface for Mission Intelligence recommendations.",
        ),
        RICEEvaluationItem(
            solution_id="sol_homepage_03",
            title="Dynamic Homepage Personalization",
            description="Replaces static promotional banners with dynamic personalized Category Discovery Ribbons on top fold.",
            reach=800000,
            impact=3.5,
            confidence=0.80,
            effort=2.0,
            reach_scale=8.0,
            impact_scale=7.0,
            confidence_scale=8.0,
            effort_scale=4.0,
            pain_point="Home screen navigation conceals non-grocery assortments.",
            what_it_solves="Improves top-of-funnel visibility of non-grocery categories.",
            trade_off_pros="Better discovery and merchandising visibility for returning users.",
            trade_off_limitations="Optimizes exposure but doesn't address trust or purchase confidence (awareness alone is insufficient).",
            why_this_solution="Research proved trust is a stronger barrier (44%) than awareness alone.",
            justification="#3 Ranked Activation Channel (RICE: 112.0): Enhances top-of-funnel category exposure.",
        ),
        RICEEvaluationItem(
            solution_id="sol_trial_packs_04",
            title="Discovery Trial Packs (₹49 Explorer Kits)",
            description="Low-cost ₹49 micro-sampling trial kits across beauty, pet treats, and personal care bundled with grocery orders.",
            reach=600000,
            impact=3.5,
            confidence=0.70,
            effort=2.5,
            reach_scale=6.0,
            impact_scale=7.0,
            confidence_scale=7.0,
            effort_scale=3.0,
            pain_point="Users hesitate to spend on unfamiliar products.",
            what_it_solves="Reduces financial and psychological experimentation risk for first-time purchases.",
            trade_off_pros="Encourages high-conversion first-time category trials.",
            trade_off_limitations="Limited category applicability and merchandising/warehouse bundling complexity.",
            why_this_solution="Lowers financial and psychological risk for first-time category trials.",
            justification="#4 Ranked Activation Channel (RICE: 98.0): Effective trial converter for high-risk categories.",
        ),
        RICEEvaluationItem(
            solution_id="sol_incentive_05",
            title="Dynamic Incentive & Voucher Engine",
            description="Zero Handling Fee vouchers and targeted first-try cashback for non-grocery orders.",
            reach=700000,
            impact=3.0,
            confidence=0.70,
            effort=2.0,
            reach_scale=7.0,
            impact_scale=6.0,
            confidence_scale=7.0,
            effort_scale=4.0,
            pain_point="Perceived price premium and handling fee sensitivity.",
            what_it_solves="Addresses price sensitivity and reduces checkout friction for first purchase.",
            trade_off_pros="Converts price-sensitive users quickly.",
            trade_off_limitations="Risks promotion dependency without changing underlying habit loops.",
            why_this_solution="Converts existing intent without interrupting shopping flow.",
            justification="#5 Ranked Activation Channel (RICE: 73.5): Tactical price friction remover.",
        ),
    ]

    SENSITIVITY_TRIGGERS = [
        RICESensitivityTrigger(
            trigger_id="trig_new_users",
            strategic_trigger="New users become the primary growth objective",
            ranking_shift="Dynamic Homepage Personalization ↑",
            reasoning="Discovery at top of funnel becomes more important than mission intelligence for existing users.",
        ),
        RICESensitivityTrigger(
            trigger_id="trig_low_conversion",
            strategic_trigger="Cross-category conversion is below target despite good discovery",
            ranking_shift="Smart Checkout Cross-Category Prompts ↑",
            reasoning="Checkout becomes highest-leverage intervention point for influencing purchase decisions.",
        ),
        RICESensitivityTrigger(
            trigger_id="trig_price_trust",
            strategic_trigger="High price sensitivity or low trust is identified in a specific category",
            ranking_shift="Dynamic Incentive & Voucher Engine ↑",
            reasoning="Trust-building and targeted incentives become more valuable than additional recommendations.",
        ),
        RICESensitivityTrigger(
            trigger_id="trig_new_categories",
            strategic_trigger="Launching new strategic categories (Beauty, Pet Care, Electronics)",
            ranking_shift="Discovery Trial Packs (₹49 Explorer Kits) ↑",
            reasoning="Trial bundles accelerate first-time adoption in categories with higher perceived risk.",
        ),
        RICESensitivityTrigger(
            trigger_id="trig_long_term_platform",
            strategic_trigger="Long-term platform investment is prioritized",
            ranking_shift="AI Mission Intelligence Platform Remains #1",
            reasoning="It scales across all customer touchpoints and powers every downstream activation channel.",
        ),
    ]

    def __init__(self, candidates: Optional[List[RICEEvaluationItem]] = None):
        self.candidates = candidates or self.DEFAULT_SOLUTIONS

    def evaluate_and_rank(self) -> List[RICEEvaluationItem]:
        """
        Calculates RICE scores for all candidate solutions, sorts them in descending order,
        assigns numerical ranks, and marks the top-ranked item as the selected MVP.
        """
        evaluated: List[RICEEvaluationItem] = []

        for item in self.candidates:
            item.calculate_rice()
            evaluated.append(item)

        # Sort descending by RICE score
        evaluated.sort(key=lambda x: x.rice_score, reverse=True)

        for rank_idx, item in enumerate(evaluated, start=1):
            item.rank = rank_idx
            item.is_selected_mvp = (rank_idx == 1)

        return evaluated

    def get_selected_mvp(self) -> RICEEvaluationItem:
        """Returns the top-ranked MVP solution."""
        ranked = self.evaluate_and_rank()
        return ranked[0]

    def get_sensitivity_triggers(self) -> List[Dict[str, Any]]:
        """Returns list of RICE sensitivity triggers explaining conditions under which rankings shift."""
        return [t.model_dump() for t in self.SENSITIVITY_TRIGGERS]

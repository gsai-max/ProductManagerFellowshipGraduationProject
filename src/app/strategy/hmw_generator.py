"""
HMW Opportunity Generator (Part 2 Strategy Engine)

Converts Part 1 Behavior Graph nodes, Habit Loops, JTBD items, and Contradictions
into structured How Might We (HMW) opportunity frames.
"""

from typing import List, Dict, Any, Optional
from src.app.models.strategy_domain import HMWOpportunity


class HMWOpportunityGenerator:
    """Generates and prioritizes How Might We (HMW) opportunity statements."""

    DEFAULT_HMW_OPPORTUNITIES = [
        HMWOpportunity(
            hmw_id="hmw_relevance_01",
            friction_node_id="node_relevance_barrier_46",
            opportunity_area="Mission-Anchored Relevance (46% Barrier)",
            hmw_statement="How might we predict the user's active shopping mission so that non-grocery recommendations feel immediately relevant rather than unneeded?",
            target_archetype="Routine Loyalists",
            underlying_friction="46% of customers report they 'do not need' other categories due to mission mismatch",
            potential_impact_level="high",
        ),
        HMWOpportunity(
            hmw_id="hmw_trust_02",
            friction_node_id="node_trust_barrier_44",
            opportunity_area="Trust & Reversibility Layer (44% Barrier)",
            hmw_statement="How might we lower risk perception for unfamiliar products by surfacing verified peer proof and first-trial return promises so that users trust non-grocery items?",
            target_archetype="Proof-Seeking Risk Avoiders",
            underlying_friction="44% distrust unfamiliar products and 33% feel they lack sufficient product information",
            potential_impact_level="high",
        ),
        HMWOpportunity(
            hmw_id="hmw_economic_03",
            friction_node_id="node_economic_risk_43",
            opportunity_area="Risk-Free Micro-Sampling (43% Barrier)",
            hmw_statement="How might we offer risk-free trial sizes and checkout sample bundles so that basket expansion occurs without fear of financial regret?",
            target_archetype="Deal-Activated Samplers",
            underlying_friction="43% fear wasting money on unknown category trials and 38% perceive non-grocery prices as high",
            potential_impact_level="high",
        ),
        HMWOpportunity(
            hmw_id="hmw_execution_04",
            friction_node_id="node_execution_cost_31",
            opportunity_area="One-Choice Checkout Discovery (31% Barrier)",
            hmw_statement="How might we surface a single, high-confidence trial recommendation at cart checkout with 1-tap add so that discovery preserves speed and avoids choice fatigue?",
            target_archetype="Mission-First Speed Shoppers",
            underlying_friction="31% prioritize quick checkout and 28% experience cognitive fatigue from choice overload",
            potential_impact_level="medium",
        ),
        HMWOpportunity(
            hmw_id="hmw_habit_05",
            friction_node_id="node_habit_memory_loop",
            opportunity_area="Exploration Memory & Habit Loop",
            hmw_statement="How might we convert a successful first trial into a permanent familiar default so that repeat cross-category orders occur organically?",
            target_archetype="Contextual Explorers",
            underlying_friction="Reorder habit loops trap users in grocery staples, preventing trial-to-repeat conversion",
            potential_impact_level="high",
        ),
    ]

    def __init__(self, behavior_graph: Optional[Dict[str, Any]] = None):
        self.behavior_graph = behavior_graph or {}

    def generate_opportunities(self, limit: Optional[int] = None) -> List[HMWOpportunity]:
        """
        Generates structured HMW opportunities based on behavior graph data.
        Falls back to curated behavioral research opportunities if graph data is thin.
        """
        opportunities: List[HMWOpportunity] = []

        nodes = (
            self.behavior_graph.get("nodes", [])
            if isinstance(self.behavior_graph, dict)
            else []
        )
        for index, node in enumerate(nodes):
            if not isinstance(node, dict):
                continue

            node_type = str(node.get("type", "")).lower()
            if node_type in ["friction", "barrier", "emotion", "habit"]:
                node_id = str(node.get("id", f"node_{index}"))
                label = str(node.get("label", node.get("name", "Behavioral Barrier")))
                archetype = str(node.get("archetype", "Routine Buyers"))

                op = HMWOpportunity(
                    hmw_id=f"hmw_gen_{index + 1:02d}",
                    friction_node_id=node_id,
                    opportunity_area=self._map_opportunity_area(label),
                    hmw_statement=f"How might we address {label.lower()} for {archetype} so that cross-category trial increases?",
                    target_archetype=archetype,
                    underlying_friction=label,
                    potential_impact_level="high" if index < 3 else "medium",
                )
                opportunities.append(op)

        # Combine with default curated opportunities if generated list is small
        if len(opportunities) < 3:
            existing_ids = {op.hmw_id for op in opportunities}
            for default_op in self.DEFAULT_HMW_OPPORTUNITIES:
                if default_op.hmw_id not in existing_ids:
                    opportunities.append(default_op)

        if limit and limit > 0:
            return opportunities[:limit]
        return opportunities

    def _map_opportunity_area(self, label: str) -> str:
        label_lower = label.lower()
        if "quality" in label_lower or "trust" in label_lower or "risk" in label_lower:
            return "Trust & Quality Verification"
        elif "habit" in label_lower or "repeat" in label_lower or "reorder" in label_lower:
            return "Risk-Free Micro-Sampling"
        elif "search" in label_lower or "discovery" in label_lower or "tunnel" in label_lower:
            return "Contextual Discovery Nudges"
        elif "need" in label_lower or "jtbd" in label_lower:
            return "Need-Based Discovery Collections"
        else:
            return "Category Expansion Strategy"

"""
Unit Tests for Phase 2.1 Strategy Domain Models
"""

import pytest
from src.app.models.strategy_domain import (
    HMWOpportunity,
    RICEEvaluationItem,
    AssistantRecommendationCard,
    AssistantCartContext,
    AssistantRecommendationResponse,
    MVPTelemetryEvent,
    MVPExperimentMetrics,
)


def test_hmw_opportunity_validation():
    """Verify HMW statement prefix validator auto-prepends 'How might we' if missing."""
    item1 = HMWOpportunity(
        hmw_id="hmw_01",
        friction_node_id="friction_risk_01",
        opportunity_area="Trust & Quality Verification",
        hmw_statement="How might we lower risk perception for Routine Buyers?",
        target_archetype="Routine Buyers",
        underlying_friction="Fear of quality deficit",
    )
    assert item1.hmw_statement == "How might we lower risk perception for Routine Buyers?"

    item2 = HMWOpportunity(
        hmw_id="hmw_02",
        friction_node_id="friction_habit_02",
        opportunity_area="Risk-Free Trial",
        hmw_statement="enable micro-sampling bundles for first-time category buyers?",
        target_archetype="Routine Buyers",
        underlying_friction="High cart total anxiety",
    )
    assert item2.hmw_statement.startswith("How might we")


def test_rice_evaluation_calculation():
    """Verify RICE score math: (Reach * Impact * Confidence) / Effort."""
    item = RICEEvaluationItem(
        solution_id="sol_01",
        title="AI Category Discovery Assistant",
        description="Intent-aware discovery widget",
        reach=850000,
        impact=4.0,
        confidence=0.90,
        effort=3.0,
    )
    score = item.calculate_rice()
    # Expected: (850000 * 4.0 * 0.90) / 3.0 = 3060000 / 3 = 1020000.0
    assert score == 1020000.0
    assert item.rice_score == 1020000.0


def test_rice_zero_effort_protection():
    """Verify effort is clamped to at least 0.5 to prevent division by zero."""
    item = RICEEvaluationItem(
        solution_id="sol_02",
        title="Quick Nudge",
        description="Nudge card",
        reach=100000,
        impact=2.0,
        confidence=0.8,
        effort=0.5,  # Min safe effort
    )
    score = item.calculate_rice()
    assert score == (100000 * 2.0 * 0.8) / 0.5


def test_assistant_recommendation_card_schema():
    """Verify AssistantRecommendationCard instantiates cleanly."""
    card = AssistantRecommendationCard(
        recommendation_id="rec_01",
        category_name="Personal Care",
        suggested_sku="Grooming Essentials Kit",
        nudge_text="92% of grocery buyers also tried this item",
        price_inr=299.0,
        discounted_price_inr=199.0,
    )
    assert card.category_name == "Personal Care"
    assert card.discounted_price_inr == 199.0
    assert card.in_stock is True


def test_assistant_response_and_telemetry_schemas():
    """Verify AssistantRecommendationResponse & MVPTelemetryEvent creation."""
    context = AssistantCartContext(
        cart_items=["Milk", "Bread"],
        primary_category="Groceries",
    )
    response = AssistantRecommendationResponse(
        session_id="sess_123",
        cart_context=context,
        recommendations=[],
    )
    assert response.session_id == "sess_123"
    assert response.suppress_widget is False

    telemetry = MVPTelemetryEvent(
        event_id="evt_01",
        session_id="sess_123",
        event_type="widget_impression",
        variant="variant_ai_assistant",
    )
    assert telemetry.event_type == "widget_impression"

    metrics = MVPExperimentMetrics()
    assert metrics.experiment_id == "exp_category_discovery_v1"
    assert metrics.north_star_mac_cross_category_pct == 24.8

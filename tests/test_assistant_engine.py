"""
Unit and Integration Tests for Phase 2.4 AI Category Discovery Assistant Engine
"""

import pytest
from fastapi.testclient import TestClient
from src.app.api_server import app
from src.app.mvp.assistant_engine import AICategoryAssistantEngine
from src.app.models.strategy_domain import AssistantCartContext
from src.app.api.data_loader import DataLoader

client = TestClient(app)


def test_assistant_grocery_cart_recommendations():
    """Verify grocery cart items produce non-grocery adjacent category recommendations."""
    engine = AICategoryAssistantEngine()
    context = AssistantCartContext(
        cart_items=["Fresh Milk 1L", "Whole Wheat Bread", "Farm Eggs 6 Pack"],
        primary_category="Groceries",
    )
    response = engine.get_recommendations(cart_context=context, limit=3)
    assert response.suppress_widget is False
    assert len(response.recommendations) == 3

    categories = [rec.category_name for rec in response.recommendations]
    assert any("Personal Care" in c or "Pet" in c for c in categories)
    assert all(rec.in_stock is True for rec in response.recommendations)


def test_assistant_cold_start_empty_cart():
    """Verify cold start (empty cart) returns baseline non-grocery discovery mix."""
    engine = AICategoryAssistantEngine()
    context = AssistantCartContext(cart_items=[])
    response = engine.get_recommendations(cart_context=context, limit=3)
    assert response.suppress_widget is False
    assert len(response.recommendations) == 3


def test_assistant_dismiss_fatigue_suppression():
    """Verify widget suppresses if user dismissed 3+ consecutive times."""
    engine = AICategoryAssistantEngine()
    context = AssistantCartContext(cart_items=["Milk"], dismiss_count=3)
    response = engine.get_recommendations(cart_context=context)
    assert response.suppress_widget is True
    assert "dismiss_count >= 3" in response.suppress_reason
    assert len(response.recommendations) == 0


def test_assistant_out_of_stock_filtering():
    """Verify out of stock SKUs are excluded from recommendations."""
    stock_map = {"rec_pet_01": False}  # Mark pet item out of stock
    engine = AICategoryAssistantEngine(stock_availability_map=stock_map)
    context = AssistantCartContext(cart_items=["Milk", "Bread"])
    response = engine.get_recommendations(cart_context=context)
    rec_ids = [rec.recommendation_id for rec in response.recommendations]
    assert "rec_pet_01" not in rec_ids


def test_data_loader_assistant_integration():
    """Verify DataLoader serves assistant recommendations."""
    loader = DataLoader.get_instance()
    context = {"cart_items": ["Soda", "Potato Chips"], "primary_category": "Snacks"}
    res = loader.generate_assistant_recommendations(cart_context=context)
    assert res["suppress_widget"] is False
    assert len(res["recommendations"]) > 0


def test_api_recommend_endpoint():
    """Verify POST /api/v1/mvp/recommend endpoint returns HTTP 200 and recommendation schema."""
    payload = {
        "cart_items": ["Full Cream Milk", "Brown Bread"],
        "primary_category": "Groceries",
        "dismiss_count": 0,
    }
    response = client.post("/api/v1/mvp/recommend", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["suppress_widget"] is False
    assert len(data["recommendations"]) > 0
    assert "trial_incentive" in data["recommendations"][0]

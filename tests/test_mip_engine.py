"""
Unit and Integration Tests for AI Mission Intelligence Platform (MIP) Engine
"""

import pytest
from fastapi.testclient import TestClient
from src.app.api_server import app
from src.app.api.data_loader import DataLoader

client = TestClient(app)


def test_mip_parse_mission_intent_data_loader():
    """Verify DataLoader parses cart tokens into mission intent classification."""
    loader = DataLoader.get_instance()
    
    # Grocery routine test
    res = loader.parse_mission_intent(cart_items=["Amul Milk 500ml", "Harvest Whole Wheat Bread", "Eggs"])
    assert res["mission_type"] == "Weekly Grocery Replenishment"
    assert res["household_archetype"] == "Family Household"
    assert res["confidence_score"] >= 0.85
    assert "Checkout" in res["recommended_touchpoint"]

    # Late night snack test
    res_snack = loader.parse_mission_intent(cart_items=["Coca-Cola 750ml", "Lay's Chips"])
    assert res_snack["mission_type"] == "Late Night Craving & Social Gathering"

    # Emergency tech test
    res_tech = loader.parse_mission_intent(cart_items=["Type-C Fast Charging Cable"])
    assert res_tech["mission_type"] == "Emergency Tech & Workstation Urgent Need"


def test_api_mip_parse_intent_endpoint():
    """Verify POST /api/v1/mip/parse-intent returns HTTP 200 and structured MIP payload."""
    payload = {
        "cart_items": ["Pampers Baby Diapers", "Dettol Liquid"],
        "total_cart_value": 799.0,
        "primary_category": "baby_care"
    }
    response = client.post("/api/v1/mip/parse-intent", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "mission_type" in data
    assert "household_archetype" in data
    assert "confidence_score" in data
    assert "recommended_touchpoint" in data
    assert data["confidence_score"] > 0.5

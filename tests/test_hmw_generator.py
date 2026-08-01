"""
Unit and Integration Tests for Phase 2.2 HMW Opportunity Generator
"""

import pytest
from fastapi.testclient import TestClient
from src.app.api_server import app
from src.app.strategy.hmw_generator import HMWOpportunityGenerator
from src.app.api.data_loader import DataLoader

client = TestClient(app)


def test_hmw_generator_defaults():
    """Verify default HMW opportunities are returned when behavior graph is empty."""
    generator = HMWOpportunityGenerator(behavior_graph={})
    opps = generator.generate_opportunities()
    assert len(opps) >= 5
    first = opps[0]
    assert first.hmw_statement.startswith("How might we")
    assert first.potential_impact_level in ["high", "medium", "low"]


def test_hmw_generator_with_behavior_graph():
    """Verify HMW generator maps custom friction nodes from behavior graph."""
    mock_graph = {
        "nodes": [
            {
                "id": "node_custom_01",
                "type": "friction",
                "label": "High Risk Perception in Baby Care",
                "archetype": "Parents",
            },
            {
                "id": "node_custom_02",
                "type": "barrier",
                "label": "Search Discovery Tunnel Vision",
                "archetype": "Convenience Users",
            },
        ]
    }
    generator = HMWOpportunityGenerator(behavior_graph=mock_graph)
    opps = generator.generate_opportunities(limit=2)
    assert len(opps) == 2
    assert opps[0].friction_node_id == "node_custom_01"
    assert opps[0].target_archetype == "Parents"
    assert "Trust & Quality Verification" in opps[0].opportunity_area


def test_data_loader_hmw_integration():
    """Verify DataLoader serves HMW opportunities."""
    loader = DataLoader.get_instance()
    opps = loader.get_hmw_opportunities(limit=3)
    assert len(opps) == 3
    assert "hmw_id" in opps[0]
    assert "hmw_statement" in opps[0]


def test_api_hmw_endpoint():
    """Verify GET /api/v1/strategy/hmw endpoint returns HTTP 200 and HMW List schema."""
    response = client.get("/api/v1/strategy/hmw")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "opportunities" in data
    assert data["total"] > 0
    assert data["opportunities"][0]["hmw_statement"].startswith("How might we")
    assert data["meta"]["part"] == "Part 2 Strategy Engine"

import pytest
from fastapi.testclient import TestClient
from src.app.api_server import app
from src.app.api.data_loader import DataLoader
from src.app.models.strategy_domain import MVPTelemetryEvent, MVPExperimentMetrics

client = TestClient(app)


def test_hmw_strategy_endpoint():
    response = client.get("/api/v1/strategy/hmw")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "opportunities" in data
    assert isinstance(data["opportunities"], list)
    assert len(data["opportunities"]) >= 3
    first_opp = data["opportunities"][0]
    assert first_opp["hmw_statement"].startswith("How might we")
    assert "opportunity_area" in first_opp


def test_rice_evaluations_endpoint():
    response = client.get("/api/v1/strategy/rice")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert "selected_mvp" in data
    assert "evaluations" in data
    assert data["selected_mvp"]["is_selected_mvp"] is True
    assert data["selected_mvp"]["rice_score"] > 0


def test_assistant_recommendations_endpoint():
    payload = {
        "user_id": "test_user_99",
        "cart_items": ["Milk 500ml", "Whole Wheat Bread"],
        "primary_category": "Groceries",
        "dark_store_id": "ds_indiranagar_01",
        "dismiss_count": 0
    }
    response = client.post("/api/v1/mvp/recommend", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["suppress_widget"] is False
    assert len(data["recommendations"]) > 0
    rec = data["recommendations"][0]
    assert "recommendation_id" in rec
    assert "trial_incentive" in rec
    assert "social_proof_badge" in rec


def test_assistant_fatigue_suppression():
    payload = {
        "user_id": "test_user_fatigue",
        "cart_items": ["Milk"],
        "dismiss_count": 3
    }
    response = client.post("/api/v1/mvp/recommend", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["suppress_widget"] is True
    assert "dismiss_count >= 3" in data["suppress_reason"]
    assert len(data["recommendations"]) == 0


def test_log_telemetry_event_endpoint():
    event_payload = {
        "event_id": "evt_test_101",
        "session_id": "sess_test_abc",
        "user_id": "user_101",
        "event_type": "item_added_to_cart",
        "recommendation_id": "rec_pet_01",
        "target_category": "Pet Supplies",
        "variant": "variant_ai_assistant",
        "metadata": {"sku": "Pedigree Dentastix"}
    }
    response = client.post("/api/v1/mvp/telemetry", json=event_payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert data["event_id"] == "evt_test_101"


def test_get_mvp_metrics_endpoint():
    # First post a conversion telemetry event
    event_payload = {
        "event_id": "evt_test_202",
        "session_id": "sess_test_xyz",
        "event_type": "category_checkout_converted",
        "target_category": "Personal Care",
        "variant": "variant_ai_assistant"
    }
    client.post("/api/v1/mvp/telemetry", json=event_payload)

    response = client.get("/api/v1/mvp/metrics")
    assert response.status_code == 200
    data = response.json()
    assert "metrics" in data
    metrics = data["metrics"]
    assert metrics["experiment_id"] == "exp_category_discovery_v1"
    assert metrics["statistically_significant"] is True
    assert metrics["north_star_mac_cross_category_pct"] >= 24.8

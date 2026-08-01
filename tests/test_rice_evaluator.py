"""
Unit and Integration Tests for Phase 2.3 RICE Prioritization Engine
"""

import pytest
from fastapi.testclient import TestClient
from src.app.api_server import app
from src.app.strategy.rice_evaluator import RICEEvaluator
from src.app.api.data_loader import DataLoader

client = TestClient(app)


def test_rice_evaluator_ranking():
    """Verify RICE evaluator calculates scores, ranks descending, and selects MVP."""
    evaluator = RICEEvaluator()
    ranked = evaluator.evaluate_and_rank()
    assert len(ranked) >= 4

    # Ranks must be 1, 2, 3...
    assert [item.rank for item in ranked] == list(range(1, len(ranked) + 1))

    # Top item must be selected MVP
    top_item = ranked[0]
    assert top_item.is_selected_mvp is True
    assert top_item.rank == 1
    assert "AI Mission Intelligence Platform" in top_item.title

    # Scores must be sorted descending
    scores = [item.rice_score for item in ranked]
    assert scores == sorted(scores, reverse=True)


def test_rice_evaluator_get_selected_mvp():
    """Verify get_selected_mvp returns top feature."""
    evaluator = RICEEvaluator()
    mvp = evaluator.get_selected_mvp()
    assert mvp.is_selected_mvp is True
    assert mvp.rice_score > 0
    assert mvp.rank == 1


def test_data_loader_rice_integration():
    """Verify DataLoader serves RICE evaluation data."""
    loader = DataLoader.get_instance()
    data = loader.get_rice_evaluations()
    assert "total" in data
    assert "selected_mvp" in data
    assert "evaluations" in data
    assert data["total"] >= 4
    assert data["selected_mvp"]["is_selected_mvp"] is True


def test_api_rice_endpoint():
    """Verify GET /api/v1/strategy/rice returns HTTP 200 and valid schema."""
    response = client.get("/api/v1/strategy/rice")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] >= 4
    assert "AI Mission Intelligence Platform" in data["selected_mvp"]["title"]
    assert len(data["evaluations"]) >= 4
    assert data["meta"]["formula"] == "(Reach * Impact * Confidence) / Effort"

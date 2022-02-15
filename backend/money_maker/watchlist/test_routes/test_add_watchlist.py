from flask.testing import FlaskClient

from conftest import CREATE_WATCHLIST_MSG, HTTP_SUCCESS_CODE
from money_maker.extensions import db
from money_maker.models.watchlist import Watchlist
from money_maker.portfolio.test_routes.test_get_portfolio import NUMBER_OF_PORTFOLIOS


def test_add_watchlist(flask_application: FlaskClient, user_id: int):
    """
    GIVEN a valid watchlist name
    WHEN a registered user creates a watchlist
    THEN check that the watchlist is created in the backend
    Args:
        flask_application: The flask application
        user_id: The id of the user

    """
    response = flask_application.post(f"""/watchlist/{user_id}/sample_portfolio_1""")
    assert response.status_code == HTTP_SUCCESS_CODE
    assert response.get_json()["msg"] == CREATE_WATCHLIST_MSG

    assert len(db.session.query(Watchlist).filter(Watchlist.user_id == user_id).all()) == 1

    cleanup_wl_db(user_id)


def test_add_multiple_watchlist(flask_application: FlaskClient, user_id: int):
    """
    GIVEN a valid watchlist name
    WHEN a registered user creates a watchlist
    THEN check that the watchlist is created in the backend
    Args:
        flask_application: The flask application
        user_id: The id of the user

    """
    for i in range(0, NUMBER_OF_PORTFOLIOS):
        response = flask_application.post(f"""/watchlist/{user_id}/sample_portfolio_{i}""")
        assert response.status_code == HTTP_SUCCESS_CODE
        assert response.get_json()["msg"] == CREATE_WATCHLIST_MSG

    assert len(db.session.query(Watchlist).filter(Watchlist.user_id == user_id).all()) == NUMBER_OF_PORTFOLIOS
    cleanup_wl_db(user_id)


def cleanup_wl_db(user_id) -> None:
    """
    A helper function to remove existing watchlists by user id

    Args:
        user_id: The user id
    """
    db.session.query(Watchlist).filter(Watchlist.user_id == user_id).delete(synchronize_session="fetch")
    db.session.commit()
    assert len(db.session.query(Watchlist).filter(Watchlist.user_id == user_id).all()) == 0
    
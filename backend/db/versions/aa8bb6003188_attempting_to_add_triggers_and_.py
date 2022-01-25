"""Attempting to add triggers and functions...again

Revision ID: aa8bb6003188
Revises: bc1342113eba
Create Date: 2022-01-22 14:41:37.124722

"""
from alembic import op
import sqlalchemy as sa
from alembic_utils.pg_function import PGFunction
from sqlalchemy import text as sql_text
from alembic_utils.pg_trigger import PGTrigger
from sqlalchemy import text as sql_text

# revision identifiers, used by Alembic.
revision = 'aa8bb6003188'
down_revision = 'bc1342113eba'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    public_trigger_set_timestamp = PGFunction(
        schema="public",
        signature="trigger_set_timestamp()",
        definition="returns TRIGGER AS $$\n    BEGIN\n        NEW.last_updated = NOW();\n        RETURN NEW;\n    END;\n    $$ LANGUAGE 'plpgsql'"
    )
    op.create_entity(public_trigger_set_timestamp)

    public_ticker_prices_update_last_updated = PGTrigger(
        schema="public",
        signature="update_last_updated",
        on_entity="public.ticker_prices",
        is_constraint=False,
        definition='BEFORE UPDATE ON\n        public.ticker_prices FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp()'
    )
    op.create_entity(public_ticker_prices_update_last_updated)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    public_ticker_prices_update_last_updated = PGTrigger(
        schema="public",
        signature="update_last_updated",
        on_entity="public.ticker_prices",
        is_constraint=False,
        definition='BEFORE UPDATE ON\n        public.ticker_prices FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp()'
    )
    op.drop_entity(public_ticker_prices_update_last_updated)

    public_trigger_set_timestamp = PGFunction(
        schema="public",
        signature="trigger_set_timestamp()",
        definition="returns TRIGGER AS $$\n    BEGIN\n        NEW.last_updated = NOW();\n        RETURN NEW;\n    END;\n    $$ LANGUAGE 'plpgsql'"
    )
    op.drop_entity(public_trigger_set_timestamp)

    # ### end Alembic commands ###

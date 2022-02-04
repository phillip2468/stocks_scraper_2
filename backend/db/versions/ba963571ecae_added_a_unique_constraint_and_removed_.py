"""Added a unique constraint and removed reference to foreignkeyconstraint

Revision ID: ba963571ecae
Revises: fcee0d875455
Create Date: 2022-02-04 14:55:07.330859

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ba963571ecae'
down_revision = 'fcee0d875455'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique_portfolio_stock_by_user', 'portfolio', ['portfolio_name', 'user_id', 'stock_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('unique_portfolio_stock_by_user', 'portfolio', type_='unique')
    # ### end Alembic commands ###

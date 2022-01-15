"""small change to zip to this

Revision ID: e95b35a91812
Revises: cab8640ad56c
Create Date: 2022-01-05 18:03:52.413202

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e95b35a91812'
down_revision = 'cab8640ad56c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ticker_prices', sa.Column('zip', sa.String(length=15), nullable=True))
    op.drop_column('ticker_prices', 'zip_code')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('ticker_prices', sa.Column('zip_code', sa.VARCHAR(length=15), autoincrement=False, nullable=True))
    op.drop_column('ticker_prices', 'zip')
    # ### end Alembic commands ###

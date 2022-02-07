from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

test_db = SQLAlchemy()
test_cors = CORS()
test_jwt_manager = JWTManager()
test_bcrypt = Bcrypt()
test_marshmallow = Marshmallow()


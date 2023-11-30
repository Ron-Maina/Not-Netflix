from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_cors import CORS

from flask_bcrypt import Bcrypt

from dotenv import load_dotenv
load_dotenv()

app = Flask( __name__)

cors = CORS(app)

app.secret_key = 'd7ad9db31353c15cc125d00c92cb73c5'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///not_netflix.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


metadata = MetaData(naming_convention={
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
})

db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
api = Api(app)
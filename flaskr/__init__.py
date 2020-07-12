import werkzeug
from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

from flaskr.db import db_init


werkzeug.cached_property = werkzeug.utils.cached_property

db_file = 'flaskr/data.db'
conn = db_init(db_file)
conn.close()

app = Flask(__name__)
app.config.from_object(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
api = Api(app, default='MealMatch', title='MealMatch', description='MealMatch')


from flaskr.models.category import *
from flaskr.models.ingredient import *
from flaskr.models.user import *

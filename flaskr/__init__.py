import os
import werkzeug
from flask import Flask, request
from flask_restplus import Api
from flask_cors import CORS

from flaskr.db import db_init


werkzeug.cached_property = werkzeug.utils.cached_property

db_file = 'flaskr/data.db'
conn = db_init(db_file)
conn.close()

UPLOAD_FOLDER = 'tech-nox/src/static/recipes'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg'])

app = Flask(__name__)
app.config.from_object(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
api = Api(app, default='MealMatch', title='MealMatch', description='MealMatch')


from flaskr.models.category import *
from flaskr.models.ingredient import *
from flaskr.models.user import *
from flaskr.models.mealtype import *
from flaskr.models.recipe import *
from flaskr.models.suggested_ingredients import *
from flaskr.models.suggested_ingredients_contributor import *

from flaskr.resources.category import *
from flaskr.resources.ingredient import *
from flaskr.resources.user import *
from flaskr.resources.mealtype import *
from flaskr.resources.recipe import *
from flaskr.resources.suggested_ingredients import *
from flaskr.resources.suggested_ingredients_contributor import *

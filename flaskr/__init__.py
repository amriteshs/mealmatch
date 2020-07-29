import werkzeug
from flask import Flask, request
from flask_restplus import Api
from flask_cors import CORS

from flaskr.db import db_init

import os


werkzeug.cached_property = werkzeug.utils.cached_property

db_file = 'flaskr/data.db'
conn = db_init(db_file)
conn.close()


PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER  = '{}/static/recipes'.format(PROJECT_HOME)
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg', 'png'])

app = Flask(__name__)
app.config.from_object(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
api = Api(app, default='MealMatch', title='MealMatch', description='MealMatch')


from flaskr.models.category import *
from flaskr.models.ingredient import *
from flaskr.models.user import *
from flaskr.models.mealtype import *
from flaskr.models.recipe import *

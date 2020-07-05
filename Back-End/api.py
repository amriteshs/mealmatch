import json
import sqlite3
import werkzeug
from flask import Flask
from flask_restplus import Resource, Api, fields
from flask_cors import CORS

werkzeug.cached_property = werkzeug.utils.cached_property

app = Flask(__name__)
api = Api(app, default='MealMatch', title='MealMatch', description='MealMatch')
app.config.from_object(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

login_model = api.model('login', {
    'username': fields.String(required=True, example='heisenberg'),
    'password': fields.String(required=True, example='heisenberg')
})

signup_model = api.model('signup', {
    'username': fields.String(required=True, example='heisenberg'),
    'password': fields.String(required=True, example='iamthedanger'),
    'first_name': fields.String(required=True, example='Walter'),
    'last_name': fields.String(required=True, example='White')
})

db_name = 'data.db'


def create_db(db_file):
    try:
        conn = sqlite3.connect(db_file)
        c = conn.cursor()

        c.execute('CREATE TABLE IF NOT EXISTS User (                        '
                  '     id              INTEGER         NOT NULL,           '
                  '     username        VARCHAR(30)     NOT NULL    UNIQUE, '
                  '     password        VARCHAR(50)     NOT NULL,           '
                  '     first_name      VARCHAR(30)     NOT NULL,           '
                  '     last_name       VARCHAR(50)     NOT NULL,           '
                  '     PRIMARY KEY(id)                                     '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS Ingredient (                  '
                  '     id              INTEGER         NOT NULL,           '
                  '     name            VARCHAR(30)     NOT NULL    UNIQUE, '
                  '     PRIMARY KEY(id)                                     '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS Recipe (                      '
                  '     id              INTEGER         NOT NULL,           '
                  '     name            VARCHAR(100)    NOT NULL,           '
                  '     description     VARCHAR(500),                       '
                  '     PRIMARY KEY(id)                                     '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS MealType (                    '
                  '     id              INTEGER         NOT NULL,           '
                  '     name            VARCHAR(50)     NOT NULL    UNIQUE, '
                  '     PRIMARY KEY(id)                                     '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS Category (                    '
                  '     id              INTEGER         NOT NULL,           '
                  '     name            VARCHAR(50)     NOT NULL    UNIQUE, '
                  '     PRIMARY KEY(id)                                     '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS User_Recipe (                 '
                  '     id              INTEGER         NOT NULL,           '
                  '     user_id         INTEGER         NOT NULL,           '
                  '     recipe_id       INTEGER         NOT NULL,           '
                  '     PRIMARY KEY(id),                                    '
                  '     FOREIGN KEY(user_id) REFERENCES User(id),           '
                  '     FOREIGN KEY(recipe_id) REFERENCES Recipe(id)        '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS Recipe_Step (                 '
                  '     id                  INTEGER         NOT NULL,       '
                  '     recipe_id           INTEGER         NOT NULL,       '
                  '     step_no             INTEGER         NOT NULL,       '
                  '     step_name           VARCHAR(100),                   '
                  '     step_description    VARCHAR(1500)   NOT NULL,       '
                  '     PRIMARY KEY(id),                                    '
                  '     FOREIGN KEY(recipe_id) REFERENCES Recipe(id)        '
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS Recipe_Ingredient (           '
                  '     id                  INTEGER         NOT NULL,       '
                  '     recipe_id           INTEGER         NOT NULL,       '
                  '     ingredient_id       INTEGER         NOT NULL,       '
                  '     ingredient_qty      VARCHAR(25),                    '
                  '     PRIMARY KEY(id),                                    '
                  '     FOREIGN KEY(recipe_id) REFERENCES Recipe(id),       '
                  '     FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id)'
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS Ingredient_Category (         '
                  '     id                  INTEGER         NOT NULL,       '
                  '     category_id         INTEGER         NOT NULL,       '
                  '     ingredient_id       INTEGER         NOT NULL,       '
                  '     step_name           VARCHAR(100),                   '
                  '     step_description    VARCHAR(1500)   NOT NULL,       '
                  '     PRIMARY KEY(id),                                    '
                  '     FOREIGN KEY(category_id) REFERENCES Category(id),   '
                  '     FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id)'
                  ')                                                        '
        )

        c.execute('CREATE TABLE IF NOT EXISTS MealType_Recipe (             '
                  '     id                  INTEGER         NOT NULL,       '
                  '     mealtype_id         INTEGER         NOT NULL,       '
                  '     recipe_id           INTEGER         NOT NULL,       '
                  '     PRIMARY KEY(id),                                    '
                  '     FOREIGN KEY(mealtype_id) REFERENCES MealType(id),   '
                  '     FOREIGN KEY(recipe_id) REFERENCES Recipe(id)        '
                  ')                                                        '
        )

        conn.commit()

        return conn
    except sqlite3.Error as e:
        print(e)


@api.route('/login')
class login(Resource):
    @api.response(200, 'Login successful')
    @api.response(404, 'Login failed')
    @api.doc(description='User Login')
    @api.expect(login_model, validate=True)
    def post(self):
        username = api.payload['username']
        password = api.payload['password']

        conn = create_db(db_name)
        c = conn.cursor()

        query = [row for row in c.execute('SELECT username, password FROM User WHERE username = ?', (username,))]

        conn.close()

        if not query:
            return json.loads(json.dumps({'message': 'Username does not exist.'})), 404

        if password != query[0][1]:
            return json.loads(json.dumps({'message': 'Password is incorrect.'})), 404

        return json.loads(json.dumps({
            'username': username,
            'password': password
        })), 200

@api.route('/signup')
class Signup(Resource):
    @api.response(201, 'Signup successful')
    @api.response(404, 'Signup failed')
    @api.doc(description='User Signup')
    @api.expect(signup_model, validate=True)
    def post(self):
        username = api.payload['username']
        password = api.payload['password']
        first_name = api.payload['first_name']
        last_name = api.payload['last_name']

        conn = create_db(db_name)
        c = conn.cursor()

        query = [row for row in c.execute('SELECT username FROM User WHERE username = ?', (username,))]

        if query:
            conn.close()

            return json.loads(json.dumps({'message': 'Username already exists.'})), 404

        data = {
            'username': username,
            'password': password,
            'first_name': first_name,
            'last_name': last_name
        }

        c.execute(f'INSERT INTO User VALUES(null,?,?,?,?)', (data['username'], data['password'], data['first_name'], data['last_name']))

        conn.commit()
        conn.close()

        return json.loads(json.dumps(data)), 201

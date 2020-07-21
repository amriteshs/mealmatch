import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


login_model = api.model('login', {
    'username': fields.String(required=True, example='heisenberg'),
    'password': fields.String(required=True, example='iamthedanger')
})

signup_model = api.model('signup', {
    'username': fields.String(required=True, example='heisenberg'),
    'password': fields.String(required=True, example='iamthedanger'),
    'first_name': fields.String(required=True, example='Walter'),
    'last_name': fields.String(required=True, example='White')
})

@api.route('/login')
class Login(Resource):
    @api.response(200, 'Login successful')
    @api.response(404, 'Login failed')
    @api.doc(description='User login')
    @api.expect(login_model, validate=True)
    def post(self):
        '''User login'''
        username = api.payload['username']
        password = api.payload['password']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(f'SELECT username, password FROM User WHERE username LIKE ?', (username,))]

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
    @api.doc(description='User signup')
    @api.expect(signup_model, validate=True)
    def post(self):
        '''User signup'''
        username = api.payload['username']
        password = api.payload['password']
        first_name = api.payload['first_name']
        last_name = api.payload['last_name']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(f'SELECT username FROM User WHERE username LIKE ?', (username,))]

        if query:
            conn.close()

            return json.loads(json.dumps({'message': 'Username already exists.'})), 404

        c.execute(f'INSERT INTO User VALUES(null,?,?,?,?)', (username, password, first_name, last_name))

        conn.commit()
        conn.close()

        return json.loads(json.dumps({
            'username': username,
            'password': password,
            'first_name': first_name,
            'last_name': last_name
        })), 201
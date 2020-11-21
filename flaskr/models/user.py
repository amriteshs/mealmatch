from flask_restplus import fields

from flaskr import api


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

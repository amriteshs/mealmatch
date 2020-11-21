from flask_restplus import fields

from flaskr import api


recipe_id_model = api.model('recipe_id', {
    'recipe_id': fields.Integer(example=1)
})

recipe_details_model = api.model('recipe_create_details', {
    'recipe_name': fields.String,
    'recipe_description': fields.String,
    'preparation_time': fields.String,
    'people_served': fields.String,
    'visibility': fields.String,
    'mealtypes': fields.List(fields.String),
    'ingredients': fields.Raw,
    'steps': fields.List(fields.String)
})

recipe_details_model_v2 = api.model('recipe_update_details', {
    'recipe_id': fields.Integer,
    'recipe_name': fields.String,
    'recipe_description': fields.String,
    'preparation_time': fields.String,
    'visibility': fields.String,
    'mealtypes': fields.List(fields.String),
    'ingredients': fields.Raw,
    'steps': fields.List(fields.String)
})

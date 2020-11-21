from flask_restplus import fields

from flaskr import api


ingredient_model = api.model('ingredient', {
    'ingredient': fields.String(example='egg')
})

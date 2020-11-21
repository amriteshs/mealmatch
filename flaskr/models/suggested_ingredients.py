from flask_restplus import fields

from flaskr import api


suggested_ingredients_model = api.model('suggested_ingredients_details', {
    'cart_ingredients': fields.Raw
})

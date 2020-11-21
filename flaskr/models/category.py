from flask_restplus import fields

from flaskr import api


category_model = api.model('category', {
    'category': fields.String(example='Dairy')
})

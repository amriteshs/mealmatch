from flask_restplus import fields

from flaskr import api


mealtype_model = api.model('mealtype', {
    'mealtype': fields.String(example='Lunch')
})

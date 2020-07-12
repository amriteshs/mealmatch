import json
from flask_restplus import Resource, Api, fields

from flaskr import api, db_file
from flaskr.db import db_connect


ingredient_model = api.model('ingredients', {
    'ingredient_list': fields.List(fields.String, example=["eggs", "milk", "butter"])
})

@api.route('/ingredients')
class Ingredient(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Get list of ingredients')
    @api.expect(ingredient_model, validate=True)
    def post(self):
        ingredient_list = api.payload['ingredient_list']

        conn = db_connect(db_file)
        c = conn.cursor()

        if len(ingredient_list) == 1:
            query = [row for row in c.execute('SELECT name FROM Ingredient WHERE name LIKE ? ORDER BY name', (ingredient_list[0],))]    

            if query:
                conn.close()

                return json.loads(json.dumps({
                    'ingredient_list': query
                })), 200

            query = [row for row in c.execute('SELECT name FROM Ingredient WHERE name LIKE ? ORDER BY name', (ingredient_list[0] + '%',))]

            if query:
                conn.close()

                return json.loads(json.dumps({
                    'ingredient_list': query
                })), 200
            
            conn.close()

            return json.loads(json.dumps({
                'ingredient_list': query
            })), 200

        query = [row for row in c.execute('SELECT name FROM Ingredient WHERE name IN ({0}) ORDER BY name'.format(', '.join('?' for _ in ingredient_list)), ingredient_list)]

        conn.close()

        return json.loads(json.dumps({
            'ingredient_list': query
        })), 200

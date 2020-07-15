import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


ingredient_model = api.model('ingredient', {
    'ingredient': fields.String(example='eggs')
})

@api.route('/ingredient')
class Ingredient(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of all ingredients')
    def get(self):
        '''Retrieve list of all ingredients'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row[0] for row in c.execute('SELECT name FROM Ingredient ORDER BY name')]

        conn.close()

        return json.loads(json.dumps({
            'count': len(query),
            'ingredients': query
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Retrieve the searched ingredient')
    @api.expect(ingredient_model, validate=True)
    def post(self):
        '''Retrieve the searched ingredient'''
        ingredient = api.payload['ingredient']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row[0] for row in c.execute(f'SELECT name FROM Ingredient WHERE name LIKE ? ORDER BY name', (ingredient + '%',))]

        if query:
            conn.close()

            return json.loads(json.dumps({
                'ingredients': query
            })), 200

        conn.close()

        return json.loads(json.dumps({
            'message': 'Ingredient does not exist'
        })), 200

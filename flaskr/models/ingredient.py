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

        query = list(c.execute('SELECT id, name FROM Ingredient ORDER BY name'))
        
        conn.close()

        data = []
        for row in query:
            data.append({
                'ingredient_id': row[0],
                'ingredient_name': row[1]
            })

        return json.loads(json.dumps({
            'count': len(data),
            'ingredients': data
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Retrieve the searched ingredient')
    @api.expect(ingredient_model, validate=True)
    def post(self):
        '''Retrieve the searched ingredient'''
        ingredient = api.payload['ingredient']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(f'SELECT id, name FROM Ingredient WHERE name LIKE ? ORDER BY name', (ingredient + '%',)))

        conn.close()

        data = []
        for row in query:
            data.append({
                'ingredient_id': row[0],
                'ingredient_name': row[1]
            })

        return json.loads(json.dumps({
            'ingredients': data
        })), 200

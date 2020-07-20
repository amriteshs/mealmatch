import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


mealtype_model = api.model('mealtype', {
    'mealtype': fields.String(example='Lunch')
})

@api.route('/mealtype')
class Mealtype(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of recipes for all meal types')
    def get(self):
        '''Retrieve list of recipes for all meal types'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT a.id AS mealtype_id, a.name AS mealtype_name, c.id AS recipe_id, c.name AS recipe_name
                FROM  MealType a
                LEFT JOIN MealType_Recipe b ON a.id = b.mealtype_id
                LEFT JOIN Recipe c ON b.recipe_id = c.id
                ORDER BY a.name, c.name
            '''
        ))

        conn.close()

        data = {
            'count': 0,
            'mealtypes': []
        }

        visited = []
        for row in query:
            if row[2] is None:
                visited.append(row[1])

                temp = {
                    'mealtype_id': row[0],
                    'mealtype_name': row[1],
                    'recipes': []
                }

                data['mealtypes'].append(temp)
            else:
                if row[1] not in visited:
                    visited.append(row[1])

                    temp = {
                        'mealtype_id': row[0],
                        'mealtype_name': row[1],
                        'recipes': [{
                            'recipe_id': row[2],
                            'recipe_name': row[3]
                        }]
                    }

                    data['mealtypes'].append(temp)
                else:
                    data['mealtypes'][-1]['recipes'].append({
                        'recipe_id': row[2],
                        'recipe_name': row[3]
                    })

        data['count'] = len(data['mealtypes'])

        return json.loads(json.dumps(data)), 200


    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of recipes for a specific meal type')
    @api.expect(mealtype_model)
    def post(self):
        '''Retrieve list of recipes for a specific meal type'''
        mealtype = api.payload['mealtype']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT a.id AS mealtype_id, a.name AS mealtype_name, c.id AS recipe_id, c.name AS recipe_name
                FROM  MealType a
                LEFT JOIN MealType_Recipe b ON a.id = b.mealtype_id
                LEFT JOIN Recipe c ON b.recipe_id = c.id
                WHERE a.name LIKE ?
                ORDER BY a.name, c.name
            '''
            , (mealtype,)
        ))

        conn.close()

        if query:
            data = {
                'mealtype_id': query[0][0],
                'meatype_name': query[0][1],
                'recipes': []
            }

            for row in query:
                if row[2] is None:
                    break

                data['recipes'].append({
                    'recipe_id': row[2],
                    'recipe_name': row[3]
                })

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Meal type does not exist'
        })), 200

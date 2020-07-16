import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect

print_flag = True

mealtype_model = api.model('mealtype', {
    'mealtype': fields.String(example='Lunch')
})

@api.route('/mealtype')
class Mealtype(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve all recipes from all mealtypes')
    def get(self):
        '''Retrieve all recipes from all mealtypes'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT a.name as meal_name,  c.name as recipe_name
            FROM  MealType a
            LEFT JOIN MealType_Recipe b on a.id = b.mealtype_id
            LEFT JOIN Recipe c on b.recipe_id = c.id
            ORDER BY a.name, c.name'''
        )]

        conn.close()

        if query:
            data = {
                'mealtypes': []
            }

            visited = []

            for q in query:
                if q[1] is None:
                    visited.append(q[0])

                    temp = {
                        'mealtype': q[0],
                        'recipes': []
                    }

                    data['mealtypes'].append(temp)
                else:
                    if q[0] not in visited:
                        visited.append(q[0])

                        temp = {
                            'mealtype': q[0],
                            'recipes': [q[1]]
                        }

                        data['mealtypes'].append(temp)
                    else:
                        data['mealtypes'][-1]['recipes'].append(q[1])
            if  print_flag:
                print(query)
                print(data)

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'No mealtypes exist'
        })), 200


    @api.response(200, 'OK')
    @api.doc(description='Retrieve all recipes in a specific mealtype')
    @api.expect(mealtype_model)
    def post(self):
        '''Retrieve all recipes in a specific mealtype'''
        mealtype = api.payload['mealtype']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT a.name as meal_name,  c.name as recipe_name
            FROM  MealType a
            LEFT JOIN MealType_Recipe b on a.id = b.mealtype_id
            LEFT JOIN Recipe c on b.recipe_id = c.id
            WHERE a.name LIKE ?
            ORDER BY a.name, c.name''',
            (mealtype,)
        )]

        conn.close()

        if query:
            data = {
                mealtype : []
            }

            for q in query:
                if q[1] is None:
                    break

                data[mealtype].append(q[1])

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Mealtype does not exist'
        })), 200

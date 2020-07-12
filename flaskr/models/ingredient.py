import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


# ingredient_model = api.model('ingredients', {
#     'ingredient_list': fields.List(fields.String, example=["eggs", "milk", "butter"])
# })

ingredient_model = api.model('ingredients', {
    'ingredient': fields.String(example='eggs')
})

@api.route('/ingredients')
class Ingredient(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of all ingredients')
    def get(self):
        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row[0] for row in c.execute('SELECT name FROM Ingredient ORDER BY name')]

        conn.close()

        return json.loads(json.dumps({
            'ingredient_count': len(query),
            'ingredient_list': query
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Retrieve the searched ingredient')
    @api.expect(ingredient_model, validate=True)
    def post(self):
        ingredient = api.payload['ingredient']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row[0] for row in c.execute(f'SELECT name FROM Ingredient WHERE name LIKE "{ingredient}" ORDER BY name')]    

        if query:
            conn.close()

            return json.loads(json.dumps({
                'ingredient_list': query
            })), 200

        query = [row[0] for row in c.execute(f'SELECT name FROM Ingredient WHERE name LIKE "{ingredient}%" ORDER BY name')]

        if query:
            conn.close()

            return json.loads(json.dumps({
                'ingredient_list': query
            })), 200
            
        conn.close()

        return json.loads(json.dumps({
            'ingredient_list': query
        })), 200

        # ingredient_list = api.payload['ingredient_list']

        # conn = db_connect(db_file)
        # c = conn.cursor()

        # if len(ingredient_list) == 1:
        #     query = [row for row in c.execute(f'SELECT name FROM Ingredient WHERE name LIKE "{ingredient_list[0]}" ORDER BY name')]    

        #     if query:
        #         conn.close()

        #         return json.loads(json.dumps({
        #             'ingredient_list': query
        #         })), 200

        #     query = [row for row in c.execute(f'SELECT name FROM Ingredient WHERE name LIKE "{ingredient_list[0]}%" ORDER BY name')]

        #     if query:
        #         conn.close()

        #         return json.loads(json.dumps({
        #             'ingredient_list': query
        #         })), 200
            
        #     conn.close()

        #     return json.loads(json.dumps({
        #         'ingredient_list': query
        #     })), 200

        # query = [row for row in c.execute(f'SELECT name FROM Ingredient WHERE name IN ({", ".join(repr(i) for i in ingredient_list)}) ORDER BY name')]

        # conn.close()

        # return json.loads(json.dumps({
        #     'ingredient_list': query
        # })), 200

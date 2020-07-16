import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect

print_flag = True

recipe_model = api.model('recipe', {
    'recipe': fields.String(example='Fruit Salad')
})

@api.route('/recipe')
class Recipe(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve all ingredients and their quantities for a specific recipe')
    @api.expect(recipe_model)
    def post(self):
        '''Retrieve all ingredients and their quantities for a specific recipe'''
        recipe = api.payload['recipe']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT c.name, b.ingredient_qty
            FROM Recipe a
            LEFT JOIN Recipe_Ingredient b on a.id = b.recipe_id
            LEFT JOIN Ingredient c on b.ingredient_id = c.id
            WHERE a.name LIKE ?
            ORDER BY c.name, b.ingredient_qty''',
            (recipe,)
        )]

        conn.close()

        if query:
            data = {
                recipe : []
            }

            for q in query:
                if q[0] is None:
                    break

                else:
                    temp = {
                        'ingredient': q[0],
                        'quantity': q[1]
                    }

                    data[recipe].append(temp)

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Recipe does not exist'
        })), 200

@api.route('/recipe_steps')
class Recipe(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve all steps for a specific recipe')
    @api.expect(recipe_model)
    def post(self):
        '''Retrieve all steps for a specific recipe'''
        recipe = api.payload['recipe']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT b.step_no, b.step_description
            FROM Recipe a
            LEFT JOIN Recipe_Step b on a.id = b.recipe_id
            WHERE a.name LIKE ?
            ORDER BY b.step_no''',
            (recipe,)
        )]

        conn.close()

        if query:
            data = {
                recipe : []
            }

            for q in query:
                if q[0] is None:
                    break

                else:
                    temp = {
                        'step_no': q[0],
                        'description': q[1]
                    }

                    data[recipe].append(temp)

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Recipe does not exist'
        })), 200

@api.route('/recipe_user')
class Recipe(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve user name for a specific recipe')
    @api.expect(recipe_model)
    def post(self):
        '''Retrieve user name for a specific recipe'''
        recipe = api.payload['recipe']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT c.username, c.first_name
            FROM Recipe a
            LEFT JOIN User_Recipe b on a.id = b.recipe_id
            LEFT JOIN User c on b.user_id = c.id
            WHERE a.name LIKE ?
            ORDER BY c.username''',
            (recipe,)
        )]

        conn.close()

        if query:
            data = {
                recipe : []
            }

            for q in query:
                if q[0] is None:
                    break

                else:
                    temp = {
                        'username': q[0],
                        'first_name': q[1]
                    }

                    data[recipe].append(temp)

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Recipe does not exist'
        })), 200

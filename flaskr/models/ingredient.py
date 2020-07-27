import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


ingredient_model = api.model('ingredient', {
    'ingredient': fields.String(example='egg')
})

@api.route('/ingredient')
class Ingredient(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of all ingredients')
    def get(self):
        '''Retrieve list of all ingredients'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT IC.ingredient_id, IC.ingredient_name, Category.id, Category.name
                FROM
                    (
  	                    SELECT Ingredient.id AS ingredient_id, Ingredient.name AS ingredient_name, Ingredient_Category.category_id AS category_id
                        FROM Ingredient
                        LEFT JOIN Ingredient_Category
  	                    ON Ingredient.id = Ingredient_Category.ingredient_id
                    ) AS IC
                LEFT JOIN Category
                ON Category.id = IC.category_id
                ORDER BY IC.ingredient_name, Category.name
            '''
        ))
        
        conn.close()

        data = {}
        for row in query:
            data[row[1]] = {
                'ingredient_id': row[0],
                'category_id': row[2],
                'category_name': row[3],
                'checked': False,
                'expanded': False
            }

        return json.loads(json.dumps({
            'count': len(data),
            'ingredients': data
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of searched ingredients')
    @api.expect(ingredient_model, validate=True)
    def post(self):
        '''Retrieve list of searched ingredients'''
        ingredient = api.payload['ingredient']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            f'''
                SELECT IC.ingredient_id, IC.ingredient_name, Category.id, Category.name
                FROM
                    (
  	                    SELECT Ingredient.id AS ingredient_id, Ingredient.name AS ingredient_name, Ingredient_Category.category_id AS category_id
                        FROM Ingredient
                        LEFT JOIN Ingredient_Category
  	                    ON Ingredient.id = Ingredient_Category.ingredient_id
                        WHERE Ingredient.name LIKE ?
                    ) AS IC
                LEFT JOIN Category
                ON Category.id = IC.category_id
                ORDER BY IC.ingredient_name, Category.name
            '''
            , (ingredient + '%',)
        ))

        conn.close()

        data = {}
        for row in query:
            data[row[1]] = {
                'ingredient_id': row[0],
                'category_id': row[2],
                'category_name': row[3],
                'checked': False,
                'expanded': False
            }

        return json.loads(json.dumps({
            'count': len(data),
            'ingredients': data
        })), 200

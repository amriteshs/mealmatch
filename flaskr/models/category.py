import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


category_model = api.model('category', {
    'category': fields.String(example='Dairy')
})

@api.route('/category')
class Category(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of ingredients for all categories')
    def get(self):
        '''Retrieve list of ingredients for all categories'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT IC.category_id, IC.category_name, Ingredient.id, Ingredient.name
                FROM
                    (
  	                    SELECT Category.id AS category_id, Category.name AS category_name, Ingredient_Category.ingredient_id AS ingredient_id
                        FROM Category
                        LEFT JOIN Ingredient_Category
  	                    ON Category.id = Ingredient_Category.category_id
                    ) AS IC
                LEFT JOIN Ingredient
                ON Ingredient.id = IC.ingredient_id
                ORDER BY IC.category_name, Ingredient.name
            '''
        ))

        conn.close()

        data = {
            'count': 0,
            'categories': {}
        }

        visited = []
        for row in query:
            if row[2] is None:
                visited.append(row[1])

                data['categories'][row[1]] = {
                    'category_id': row[0],
                    'ingredients': {}
                }
            else:
                if row[1] not in visited:
                    visited.append(row[1])

                    data['categories'][row[1]] = {
                        'category_id': row[0],
                        'ingredients': {
                            row[3]: {
                                'ingredient_id': row[2],
                                'checked': False
                            }
                        }
                    }
                else:
                    data['categories'][row[1]]['ingredients'][row[3]] = {
                        'ingredient_id': row[2],
                        'checked': False
                    }

        data['count'] = len(data['categories'])

        return json.loads(json.dumps(data)), 200

    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of ingredients for a specific category')
    @api.expect(category_model)
    def post(self):
        '''Retrieve list of ingredients for a specific category'''
        category = api.payload['category']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            f'''
                SELECT IC.category_id, IC.category_name, Ingredient.id, Ingredient.name
                FROM
                    (
  	                    SELECT Category.id AS category_id, Category.name AS category_name, Ingredient_Category.ingredient_id AS ingredient_id
                        FROM Category
                        LEFT JOIN Ingredient_Category
  	                    ON Category.id = Ingredient_Category.category_id
                        WHERE Category.name LIKE ?
                    ) AS IC
                LEFT JOIN Ingredient
                ON Ingredient.id = IC.ingredient_id
                ORDER BY IC.category_name, Ingredient.name
            '''
            , (category,)
        ))

        conn.close()

        if query:
            data = {
                'category_id': query[0][0],
                'category_name': query[0][1],
                'ingredients': {}
            }

            for row in query:
                if row[2] is None:
                    break

                data['ingredients'][row[3]] = {
                    'ingredient_id': row[2],
                    'checked': False
                }

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Category does not exist'
        })), 200
        
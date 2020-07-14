import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


category_model = api.model('category', {
    'category': fields.String(example='dairy')
})

@api.route('/category')
class Category(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve all ingredients by category')
    def get(self):
        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
            'SELECT IC.category_name, Ingredient.name                                                                                       '
            'FROM                                                                                                                           '
            '   (                                                                                                                           '
  	        '       SELECT Category.id as category_id, Category.name as category_name, Ingredient_Category.ingredient_id AS ingredient_id   '
            '       FROM Category                                                                                                           '
            '       LEFT JOIN Ingredient_Category                                                                                           ' 
  	        '       ON Category.id = Ingredient_Category.category_id                                                                        '
            '   ) as IC                                                                                                                     '
            'LEFT JOIN Ingredient                                                                                                           '
            'ON Ingredient.id = IC.ingredient_id                                                                                            '
            'ORDER BY IC.category_name, Ingredient.name                                                                                     '
        )]

        conn.close()

        if query:
            data = {
                'categories': []
            }

            visited = []

            for q in query:
                if q[1] is None:
                    visited.append(q[0])

                    temp = {
                        'category': q[0],
                        'ingredients': []
                    }

                    data['categories'].append(temp)
                else:
                    if q[0] not in visited:
                        visited.append(q[0])

                        temp = {
                            'category': q[0],
                            'ingredients': [q[1]]
                        }

                        data['categories'].append(temp)
                    else:
                        data['categories'][-1]['ingredients'].append(q[1])

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'No categories exist'
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Retrieve all ingredients in a specific category')
    @api.expect(category_model)
    def post(self):
        category = api.payload['category']

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
            'SELECT IC.category_name, Ingredient.name                                                                                       '
            'FROM                                                                                                                           '
            '   (                                                                                                                           '
  	        '       SELECT Category.id as category_id, Category.name as category_name, Ingredient_Category.ingredient_id AS ingredient_id   '
            '       FROM Category                                                                                                           '
            '       LEFT JOIN Ingredient_Category                                                                                           ' 
  	        '       ON Category.id = Ingredient_Category.category_id                                                                        '
            '   ) as IC                                                                                                                     '
            'LEFT JOIN Ingredient                                                                                                           '
            'ON Ingredient.id = IC.ingredient_id                                                                                            '
            'WHERE IC.category_name LIKE ?                                                                                                  '
            'ORDER BY IC.category_name, Ingredient.name                                                                                     '
            , (category,)
        )]

        conn.close()

        if query:
            data = {
                category: []
            }

            for q in query:
                if q[1] is None:
                    break
                
                data[category].append(q[1])

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Category does not exist'
        })), 200

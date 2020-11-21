import json
from flask_restplus import Resource

from flaskr import api, db_file
from flaskr.db import db_connect
from flaskr.urls import ingredient_suggestion_explorer_url
from flaskr.utils import ingredient_suggestion_explorer
from flaskr.models.suggested_ingredients import suggested_ingredients_model


@api.route(ingredient_suggestion_explorer_url)
class SuggestedIngredients(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Suggest ingredients to the user')
    @api.expect(suggested_ingredients_model)
    def post(self):
        '''Suggest ingredients to the user'''
        ingredients = api.payload['cart_ingredients']

        if not ingredients:
            return json.loads(json.dumps({
                'count': 0,
                'ingredients': []
            })), 200

        user_ingredients = []
        for ingredient_fields in ingredients:
            user_ingredients.append(ingredient_fields["ingredient_name"])

        suggested_ingredients = sorted(ingredient_suggestion_explorer(user_ingredients))

        conn = db_connect(db_file)
        c = conn.cursor()
        data = {}

        for i in range(len(suggested_ingredients)):
            query = list(c.execute(
                '''
                    SELECT IC.ingredient_id, IC.ingredient_name, Category.id, Category.name
                    FROM
                        (
      	                    SELECT Ingredient.id AS ingredient_id, Ingredient.name AS ingredient_name, Ingredient_Category.category_id AS category_id
                            FROM Ingredient
                            LEFT JOIN Ingredient_Category ON Ingredient.id = Ingredient_Category.ingredient_id
                        ) AS IC
                    LEFT JOIN Category
                    ON Category.id = IC.category_id
                    WHERE IC.ingredient_name LIKE ?
                    ORDER BY IC.ingredient_name, Category.name
                ''', (suggested_ingredients[i],)
            ))

            for row in query:
                data[row[1]] = {
                    'ingredient_id': row[0],
                    'category_id': row[2],
                    'category_name': row[3],
                    'checked': False,
                    'selectIncl': False,
                    'selectExcl': False
                }

        conn.close()

        return json.loads(json.dumps({
            'count': len(data),
            'ingredients': data
        })), 200

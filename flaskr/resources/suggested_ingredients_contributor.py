''' suggested ingredients for recipe contributor;
    contains suggestions for most common ingredients, but contributor does not have
    any recipe for these ingredients '''

import json
from flask_restplus import Resource

from flaskr import api, db_file
from flaskr.db import db_connect
from flaskr.urls import ingredient_suggestion_contributor_url
from flaskr.utils import ingredient_suggestion_contributor


@api.route(ingredient_suggestion_contributor_url)
class SuggestedIngredientsContributor(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Suggest ingredients to the recipe contributor')
    def get(self, username):
        '''Suggest ingredients to the recipe contributor'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT d.name
                FROM User a
                LEFT JOIN User_Recipe b on a.id = b.user_id
                LEFT JOIN Recipe_Ingredient c on b.recipe_id = c.recipe_id
                LEFT JOIN Ingredient d on c.ingredient_id = d.id
                WHERE a.username LIKE ?
            '''
            , (username,)
        ))

        contributor_ingredients = []

        if query:
            for q in query:
                contributor_ingredients.append(q[0])

        suggested_ingredients_contributor = sorted(ingredient_suggestion_contributor(contributor_ingredients))

        data = {}

        for i in range(len(suggested_ingredients_contributor)):
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
                ''', (suggested_ingredients_contributor[i],)
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

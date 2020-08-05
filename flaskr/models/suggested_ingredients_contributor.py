''' suggested ingredients for recipe contributor;
    contains suggestions for most common ingredients, but contributor does not have
    any recipe for these ingredients '''

from collections import defaultdict
import json
from flask_restplus import Resource, fields
from flaskr import api, db_file
from flaskr.db import db_connect
import random

# most common ingredients # compiled from suggested_ingredients.py
all_suggested_ingredients = ['onion', 'olive oil', 'garlic', 'sugar', 'butter', 'vegetable oil', 'egg', 'soy sauce', 'tomato', 'carrot', 'milk',
 'chili powder', 'scallion', 'bay leaf', 'sesame oil', 'ginger', 'baking powder', 'chicken broth', 'sour cream',
 'brown sugar', 'cooking spray', 'shallot', 'garlic powder', 'lime', 'honey', 'paprika', 'fish sauce', 'avocado',
 'canola oil', 'lemon', 'rice vinegar', 'tomato paste', 'cilantro', 'potato', 'salsa', 'cumin', 'baking soda',
 'garam masala', 'shrimp', 'zucchini', 'ground beef', 'tomato sauce', 'buttermilk', 'coconut milk', 'celery',
 'chicken breast', 'ground coriander', 'cucumber', 'cinnamon', 'curry powder']


def ingredient_suggestion(contributor_ingredient_list):
    suggested_ingredient_list = [ingredient for ingredient in all_suggested_ingredients if ingredient not in contributor_ingredient_list]
    if len(suggested_ingredient_list) >= 16:
        suggested_ingredients = random.sample(suggested_ingredient_list, 16)
    else:
        suggested_ingredients = random.sample(suggested_ingredient_list, len(suggested_ingredient_list))
    return suggested_ingredients


@api.route('/suggested-ingredients-contributor/<string:username>')
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

        print(contributor_ingredients)
        suggested_ingredients_contributor = ingredient_suggestion(contributor_ingredients)

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

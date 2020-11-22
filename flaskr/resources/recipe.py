import os
import json
from flask import request
from flask_restplus import Resource
from werkzeug.utils import secure_filename

from flaskr import api, db_file, UPLOAD_FOLDER
from flaskr.db import db_connect
from flaskr.urls import public_recipe_url, user_recipe_url, recipe_image_url, filter_recipe_url
from flaskr.models.recipe import recipe_id_model, recipe_details_model, recipe_details_model_v2, filter_recipe_model


@api.route(public_recipe_url)
class PublicRecipe(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve details for all public recipes')
    def get(self):
        '''Retrieve details for all public recipes'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT a.recipe_id, b.username
                FROM User_Recipe a
                INNER JOIN User b ON a.user_id = b.id
                WHERE a.visibility LIKE ?
            '''
            , ('Public',)
        ))

        data = {
            'count': len(query),
            'recipes': []
        }

        if query:
            for row in query:
                recipe_data = {
                    'username': row[1],
                    'recipe_id': row[0],
                    'recipe_name': None,
                    'recipe_description': None,
                    'preparation_time': None,
                    'people_served': None,
                    'visibility': 'Public',
                    'mealtypes': [],
                    'ingredients': [],
                    'steps': [],
                    'expanded': False
                }

                # Retrieve basic recipe information
                query1 = list(c.execute(
                    '''
                        SELECT a.name, a.description, a.prep_time, a.people_served
                        FROM Recipe a
                        WHERE a.id LIKE ?
                    '''
                    , (row[0],)
                ))

                if query1:
                    recipe_data['recipe_name'] = query1[0][0]
                    recipe_data['recipe_description'] = query1[0][1]
                    recipe_data['preparation_time'] = query1[0][2]
                    recipe_data['people_served'] = query1[0][3]

                # Retrieve all ingredients and their quantities
                query2 = list(c.execute(
                    '''
                        SELECT b.id, b.name, a.ingredient_qty, d.id, d.name
                        FROM Recipe_Ingredient a
                        LEFT JOIN Ingredient b ON a.ingredient_id = b.id
                        LEFT JOIN Ingredient_Category c ON b.id = c.ingredient_id
                        LEFT JOIN Category d ON c.category_id = d.id
                        WHERE a.recipe_id LIKE ?
                        ORDER BY b.name
                    '''
                    , (row[0],)
                ))

                if query2:
                    for q in query2:
                        recipe_data['ingredients'].append({
                            'ingredient_id': q[0],
                            'ingredient_name': q[1],
                            'ingredient_qty': q[2],
                            'category_id': q[3],
                            'category_name': q[4]
                        })

                #  Retrieve all steps
                query3 = list(c.execute(
                    '''
                        SELECT a.step_no, a.step_description
                        FROM Recipe_Step a
                        WHERE a.recipe_id LIKE ?
                        ORDER BY a.step_no
                    '''
                    , (row[0],)
                ))

                if query3:
                    for q in query3:
                        recipe_data['steps'].append({
                            'step_no': q[0],
                            'step_description': q[1]
                        })

                # Retrieve mealtype information
                query4 = list(c.execute(
                    '''
                        SELECT a.mealtype_id, b.name
                        FROM MealType_Recipe a
                        LEFT JOIN MealType b on a.mealtype_id = b.id
                        WHERE a.recipe_id LIKE ?
                        ORDER BY b.name
                    '''
                    , (row[0],)
                ))

                if query4:
                    for q in query4:
                        recipe_data['mealtypes'].append({
                            'mealtype_id': q[0],
                            'mealtype_name': q[1]
                        })

                data['recipes'].append(recipe_data)

            data['recipes'] = sorted(data['recipes'], key=lambda v: v['recipe_name'])

        conn.close()

        return json.loads(json.dumps(data)), 200


@api.route(user_recipe_url)
class UserRecipe(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve list of recipes for a specific user')
    def get(self, username):
        '''Retrieve list of recipes for a specific user'''
        conn = db_connect(db_file)
        c = conn.cursor()

        query = list(c.execute(
            '''
                SELECT a.recipe_id, a.visibility
                FROM User_Recipe a
                INNER JOIN User b ON a.user_id = b.id
                WHERE b.username LIKE ?
            '''
            , (username,)
        ))

        data = {
            'username': username,
            'count': len(query),
            'recipes': []
        }

        if query:
            for row in query:
                recipe_data = {
                    'recipe_id': row[0],
                    'recipe_name': None,
                    'recipe_description': None,
                    'preparation_time': None,
                    'people_served': None,
                    'visibility': row[1],
                    'mealtypes': [],
                    'ingredients': [],
                    'steps': []
                }

                # Retrieve basic recipe information
                query1 = list(c.execute(
                    '''
                        SELECT a.name, a.description, a.prep_time, a.people_served
                        FROM Recipe a
                        WHERE a.id LIKE ?
                    '''
                    , (row[0],)
                ))

                if query1:
                    recipe_data['recipe_name'] = query1[0][0]
                    recipe_data['recipe_description'] = query1[0][1]
                    recipe_data['preparation_time'] = query1[0][2]
                    recipe_data['people_served'] = query1[0][3]

                # Retrieve all ingredients and their quantities
                query2 = list(c.execute(
                    '''
                        SELECT b.id, b.name, a.ingredient_qty, d.id, d.name
                        FROM Recipe_Ingredient a
                        LEFT JOIN Ingredient b ON a.ingredient_id = b.id
                        LEFT JOIN Ingredient_Category c ON b.id = c.ingredient_id
                        LEFT JOIN Category d ON c.category_id = d.id
                        WHERE a.recipe_id LIKE ?
                        ORDER BY b.name
                    '''
                    , (row[0],)
                ))

                if query2:
                    for q in query2:
                        recipe_data['ingredients'].append({
                            'ingredient_id': q[0],
                            'ingredient_name': q[1],
                            'ingredient_qty': q[2],
                            'category_id': q[3],
                            'category_name': q[4]
                        })

                #  Retrieve all steps
                query3 = list(c.execute(
                    '''
                        SELECT a.step_no, a.step_description
                        FROM Recipe_Step a
                        WHERE a.recipe_id LIKE ?
                        ORDER BY a.step_no
                    '''
                    , (row[0],)
                ))

                if query3:
                    for q in query3:
                        recipe_data['steps'].append({
                            'step_no': q[0],
                            'step_description': q[1]
                        })

                # Retrieve mealtype information
                query4 = list(c.execute(
                    '''
                        SELECT a.mealtype_id, b.name
                        FROM MealType_Recipe a
                        LEFT JOIN MealType b on a.mealtype_id = b.id
                        WHERE a.recipe_id LIKE ?
                        ORDER BY b.name
                    '''
                    , (row[0],)
                ))

                if query4:
                    for q in query4:
                        recipe_data['mealtypes'].append({
                            'mealtype_id': q[0],
                            'mealtype_name': q[1]
                        })

                data['recipes'].append(recipe_data)

            data['recipes'] = sorted(data['recipes'], key=lambda v: v['recipe_name'])

        conn.close()

        return json.loads(json.dumps(data)), 200

    @api.response(200, 'OK')
    @api.doc(description='Import a recipe contributed by a user')
    @api.expect(recipe_details_model)
    def post(self, username):
        '''Import a recipe contributed by a user'''
        recipe_name = api.payload['recipe_name']
        recipe_description = api.payload['recipe_description']
        preparation_time = api.payload['preparation_time']
        people_served = api.payload['people_served']
        visibility = api.payload['visibility']
        mealtypes = api.payload['mealtypes']
        ingredients = api.payload['ingredients']
        steps = api.payload['steps']

        conn = db_connect(db_file)
        c = conn.cursor()

        c.execute('INSERT INTO Recipe VALUES(null,?,?,?,?)', (recipe_name, recipe_description, preparation_time, people_served))

        recipe_id = list(c.execute(
            '''
                SELECT MAX(a.id)
                from Recipe a
            '''
        ))[0][0]

        user_id = list(c.execute(
            '''
                SELECT a.id
                from User a
                WHERE a.username LIKE ?
            ''',
            (username,)
        ))[0][0]

        c.execute('INSERT INTO User_Recipe VALUES(null,?,?,?)', (user_id, recipe_id, visibility))
        
        for s in range(len(steps)):
            c.execute('INSERT INTO Recipe_Step VALUES(null,?,?,?)', (recipe_id, s + 1, steps[s]))
        
        for i in ingredients:
            c.execute('INSERT INTO Recipe_Ingredient VALUES(null,?,?,?)', (recipe_id, i['ingredient_id'], i['ingredient_qty']))

        for m in mealtypes:
            m_id = list(c.execute(
                '''
                    SELECT a.id
                    FROM Mealtype a
                    WHERE a.name LIKE ?
                '''
                , (m,)
            ))[0][0]

            c.execute('INSERT INTO Mealtype_Recipe VALUES(null,?,?)', (m_id, recipe_id))

        conn.commit()
        conn.close()

        return json.loads(json.dumps({
            'message': 'Recipe contributed successfully'
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Update a recipe contributed by a user')
    @api.expect(recipe_details_model_v2)
    def put(self, username):
        '''Update a recipe contributed by a user'''
        recipe_id = api.payload['recipe_id']
        recipe_name = api.payload['recipe_name']
        recipe_description = api.payload['recipe_description']
        preparation_time = api.payload['preparation_time']
        people_served = api.payload['people_served']
        visibility = api.payload['visibility']
        mealtypes = api.payload['mealtypes']
        ingredients = api.payload['ingredients']
        steps = api.payload['steps']

        conn = db_connect(db_file)
        c = conn.cursor()

        c.execute(
            '''
                UPDATE Recipe
                SET
                    name = ?,
                    description = ?,
                    prep_time = ?,
                    people_served = ?
                WHERE id = ?
            '''
            , (recipe_name, recipe_description, preparation_time, people_served, recipe_id)
        )

        c.execute(
            '''
                UPDATE User_Recipe
                SET 
                    visibility = ?
                WHERE recipe_id = ?
            '''
            , (visibility, recipe_id)
        )

        c.execute(
            '''
                DELETE
                FROM Recipe_Step
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )

        for s in range(len(steps)):
            c.execute('INSERT INTO Recipe_Step VALUES(null,?,?,?)', (recipe_id, s + 1, steps[s]))

        c.execute(
            '''
                DELETE
                FROM Recipe_Ingredient
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )

        for i in ingredients:
            c.execute('INSERT INTO Recipe_Ingredient VALUES(null,?,?,?)', (recipe_id, i['ingredient_id'], i['ingredient_qty']))

        c.execute(
            '''
                DELETE
                FROM Mealtype_Recipe
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )
        
        for m in mealtypes:
            m_id = list(c.execute(
                '''
                    SELECT a.id
                    FROM Mealtype a
                    WHERE a.name LIKE ?
                '''
                , (m,)
            ))[0][0]

            c.execute('INSERT INTO Mealtype_Recipe VALUES(null,?,?)', (m_id, recipe_id))

        conn.commit()
        conn.close()

        return json.loads(json.dumps({
            'message': 'Recipe updated successfully'
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Delete a recipe contributed by a user')
    @api.expect(recipe_id_model)
    def delete(self, username):
        '''Delete a recipe contributed by a user'''
        recipe_id = api.payload['recipe_id']

        conn = db_connect(db_file)
        c = conn.cursor()

        c.execute(
            '''
                DELETE
                FROM Recipe
                WHERE id = ?
            '''
            , (recipe_id,)
        )

        c.execute(
            '''
                DELETE
                FROM User_Recipe
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )

        c.execute(
            '''
                DELETE
                FROM Recipe_Step
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )

        c.execute(
            '''
                DELETE
                FROM Recipe_Ingredient
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )

        c.execute(
            '''
                DELETE
                FROM Mealtype_Recipe
                WHERE recipe_id = ?
            '''
            , (recipe_id,)
        )

        conn.commit()
        conn.close()

        return json.loads(json.dumps({
            'message': 'Recipe deleted successfully'
        })), 200


@api.route(recipe_image_url)
class RecipeImage(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Add image for recipe contributed by user')
    def post(self, id):
        '''Add image for recipe contributed by user'''
        file = request.files['image_file']

        conn = db_connect(db_file)
        c = conn.cursor()

        recipe_id = list(c.execute(
            '''
                SELECT MAX(a.id)
                from Recipe a
            '''
        ))[0][0]

        conn.close()

        fname = f"{recipe_id}.{secure_filename(file.filename).split('.')[1]}"

        if file:
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            file.save(UPLOAD_FOLDER + '/' + fname)

        return json.loads(json.dumps({
            'message': 'Image added successfully'
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Update image for recipe contributed by user')
    def put(self, id):
        '''Update image for recipe contributed by user'''
        file = request.files['image_file']

        fname = f"{id}.{secure_filename(file.filename).split('.')[1]}"

        if file:
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            file.save(UPLOAD_FOLDER + '/' + fname)

        return json.loads(json.dumps({
            'message': 'Image updated successfully'
        })), 200

    @api.response(200, 'OK')
    @api.doc(description='Delete image for recipe contributed by user')
    def delete(self, id):
        '''Delete image for recipe contributed by user'''
        os.remove(UPLOAD_FOLDER + '/' + id + '.jpg')

        return json.loads(json.dumps({
            'message': 'Image deleted successfully'
        })), 200


@api.route(filter_recipe_url)
class ContributedRecipeFilter(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Filter recipes')
    @api.expect(filter_recipe_model)
    def post(self):
        '''Filter recipes'''
        username = api.payload['username']
        selected_ingredients = api.payload['selected_ingredients']
        selected_mealtype = api.payload['selected_mealtype']

        conn = db_connect(db_file)
        c = conn.cursor()

        selected_ingredients_id = None
        selected_mealtype_id = None

        if selected_ingredients:
            selected_ingredients_id = [q[0] for q in c.execute(
                '''
                    SELECT id
                    FROM Ingredient
                    WHERE name IN ({})
                '''.format(', '.join('?' * len(selected_ingredients)))
                , [i['ingredient_name'] for i in selected_ingredients]
            )]

        if selected_mealtype != '':
            selected_mealtype_id = list(c.execute(
                '''
                    SELECT id
                    FROM MealType
                    WHERE name LIKE ?
                '''
                , (selected_mealtype,)
            ))[0][0]

        query = list(c.execute(
            '''
                SELECT a.recipe_id, a.visibility
                FROM User_Recipe a
                INNER JOIN User b ON a.user_id = b.id
                WHERE b.username LIKE ?
            '''
            , (username,)
        ))

        data = {
            'username': username,
            'count': 0,
            'recipes': []
        }

        if query:
            for row in query:
                # skip recipes that do not contain any of the specified ingredients
                if selected_ingredients_id is not None:
                    filter_ingredients_query = list(c.execute(
                        '''
                            SELECT id
                            FROM Recipe_Ingredient
                            WHERE recipe_id LIKE ? AND ingredient_id IN ({})
                        '''.format(', '.join('?' * len(selected_ingredients_id)))
                        , [row[0]] + selected_ingredients_id
                    ))

                    if not filter_ingredients_query:
                        continue

                # skip recipes that do not belong to the specified mealtype
                if selected_mealtype_id is not None:
                    filter_mealtype_query = list(c.execute(
                        '''
                            SELECT id
                            FROM MealType_Recipe
                            WHERE recipe_id LIKE ? AND mealtype_id LIKE ?
                        '''
                        , (row[0], selected_mealtype_id)
                    ))

                    if not filter_mealtype_query:
                        continue

                # Retrieve basic recipe information
                recipe_data = {
                    'recipe_id': row[0],
                    'recipe_name': None,
                    'recipe_description': None,
                    'preparation_time': None,
                    'people_served': None,
                    'visibility': row[1],
                    'mealtypes': [],
                    'ingredients': [],
                    'steps': []
                }

                # Retrieve basic recipe information
                query1 = list(c.execute(
                    '''
                        SELECT a.name, a.description, a.prep_time, a.people_served
                        FROM Recipe a
                        WHERE a.id LIKE ?
                    '''
                    , (row[0],)
                ))

                if query1:
                    recipe_data['recipe_name'] = query1[0][0]
                    recipe_data['recipe_description'] = query1[0][1]
                    recipe_data['preparation_time'] = query1[0][2]
                    recipe_data['people_served'] = query1[0][3]

                # Retrieve all ingredients and their quantities
                query2 = list(c.execute(
                    '''
                        SELECT b.id, b.name, a.ingredient_qty, d.id, d.name
                        FROM Recipe_Ingredient a
                        LEFT JOIN Ingredient b ON a.ingredient_id = b.id
                        LEFT JOIN Ingredient_Category c ON b.id = c.ingredient_id
                        LEFT JOIN Category d ON c.category_id = d.id
                        WHERE a.recipe_id LIKE ?
                        ORDER BY b.name
                    '''
                    , (row[0],)
                ))

                if query2:
                    for q in query2:
                        recipe_data['ingredients'].append({
                            'ingredient_id': q[0],
                            'ingredient_name': q[1],
                            'ingredient_qty': q[2],
                            'category_id': q[3],
                            'category_name': q[4]
                        })

                #  Retrieve all steps
                query3 = list(c.execute(
                    '''
                        SELECT a.step_no, a.step_description
                        FROM Recipe_Step a
                        WHERE a.recipe_id LIKE ?
                        ORDER BY a.step_no
                    '''
                    , (row[0],)
                ))

                if query3:
                    for q in query3:
                        recipe_data['steps'].append({
                            'step_no': q[0],
                            'step_description': q[1]
                        })

                # Retrieve mealtype information
                query4 = list(c.execute(
                    '''
                        SELECT a.mealtype_id, b.name
                        FROM MealType_Recipe a
                        LEFT JOIN MealType b on a.mealtype_id = b.id
                        WHERE a.recipe_id LIKE ?
                        ORDER BY b.name
                    '''
                    , (row[0],)
                ))

                if query4:
                    for q in query4:
                        recipe_data['mealtypes'].append({
                            'mealtype_id': q[0],
                            'mealtype_name': q[1]
                        })

                data['recipes'].append(recipe_data)

            data['recipes'] = sorted(data['recipes'], key=lambda v: v['recipe_name'])

        data['count'] = len(data['recipes'])

        return json.loads(json.dumps(data)), 200

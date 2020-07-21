import json
from flask_restplus import Resource, fields

from flaskr import api, db_file
from flaskr.db import db_connect


recipe_id_model = api.model('recipe_id', {
    'recipe_id': fields.Integer(example=1)
})

recipe_details_model = api.model('recipe_create_details', {
    'recipe_name': fields.String,
    'recipe_description': fields.String,
    'preparation_time': fields.String,
    'visibility': fields.String,
    'mealtypes': fields.List(fields.String),
    'ingredients': fields.Raw,
    'steps': fields.List(fields.String)
})

recipe_details_model_v2 = api.model('recipe_update_details', {
    'recipe_id': fields.Integer,
    'recipe_name': fields.String,
    'recipe_description': fields.String,
    'preparation_time': fields.String,
    'visibility': fields.String,
    'mealtypes': fields.List(fields.String),
    'ingredients': fields.Raw,
    'steps': fields.List(fields.String)
})

@api.route('/recipe')
class Recipe(Resource):
    @api.response(200, 'OK')
    @api.doc(description='Retrieve all information for all recipes')
    def get(self):
        '''Retrieve all information for all recipes'''

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT a.id
            FROM Recipe a
            ORDER BY a.id'''
        )]

        conn.close()

        if query:

            conn = db_connect(db_file)
            c = conn.cursor()

            all_data = []
            for qu in query:

                data = {
                    'recipe_id' : None,
                    'recipe_name' : None,
                    'contributor' : None,
                    'mealtypes' : [],
                    'ingredients' : [],
                    'steps' : []
                }

                # Retrieve all ingredients and their quantities
                query1 = [row for row in c.execute(
                 '''SELECT a.name as recipe_name, c.id, c.name as ingredient_name, b.ingredient_qty
                    FROM Recipe a
                    LEFT JOIN Recipe_Ingredient b on a.id = b.recipe_id
                    LEFT JOIN Ingredient c on b.ingredient_id = c.id
                    WHERE a.id LIKE ?
                    ORDER BY a.name, c.id, c.name, b.ingredient_qty''',
                    (qu[0],)
                )]

                #  Retrieve all steps
                query2 = [row for row in c.execute(
                 '''SELECT b.step_no, b.step_description
                    FROM Recipe a
                    LEFT JOIN Recipe_Step b on a.id = b.recipe_id
                    WHERE a.id LIKE ?
                    ORDER BY b.step_no''',
                    (qu[0],)
                )]

                # Retrieve user information
                query3 = [row for row in c.execute(
                 '''SELECT c.id, c.username, c.first_name
                    FROM Recipe a
                    LEFT JOIN User_Recipe b on a.id = b.recipe_id
                    LEFT JOIN User c on b.user_id = c.id
                    WHERE a.id LIKE ?
                    ORDER BY c.id, c.username''',
                    (qu[0],)
                )]

                # Retrieve mealtype information
                query4 = [row for row in c.execute(
                 '''SELECT c.id, c.name
                    FROM Recipe a
                    LEFT JOIN MealType_Recipe b on a.id = b.recipe_id
                    LEFT JOIN MealType c on b.mealtype_id = c.id
                    WHERE a.id LIKE ?
                    ORDER BY c.id''',
                    (qu[0],)
                )]

                data['recipe_id'] = qu[0]

                if query1:
                    data['recipe_name'] = query1[0][0]

                    for q in query1:
                        if q[1] is None:
                            break

                        else:
                            temp = {
                                'ingredient_id' :  q[1],
                                'ingredient_name': q[2],
                                'ingredient_quantity': q[3]
                            }

                            data['ingredients'].append(temp)

                if query2:

                    for q in query2:
                        if q[0] is None:
                            break

                        else:
                            temp = {
                                'step_no': q[0],
                                'step_description': q[1]
                            }

                            data['steps'].append(temp)

                if query3:

                    for q in query3:
                        if q[0] is None:
                            break

                        else:
                            temp = {
                                'user_id' : q[0],
                                'username' : q[1],
                                'first_name' : q[2]
                            }

                            data['contributor'] = temp
                            break

                if query4:

                    for q in query4:
                        if q[0] is None:
                            break

                        else:
                            temp = {
                                'mealtype_id': q[0],
                                'mealtype_name': q[1]
                            }

                            data['mealtypes'].append(temp)

                if query1 or query2 or query3 or query4:

                    all_data.append(data)

            conn.close()

            return json.loads(json.dumps(all_data)), 200

        return json.loads(json.dumps({
            'message': 'Recipe ids do not exist'
        })), 200


    @api.response(200, 'OK')
    @api.doc(description='Retrieve all information for a specific recipe')
    @api.expect(recipe_id_model)
    def post(self):
        '''Retrieve all information for a specific recipe'''
        recipe_id = api.payload['recipe_id']

        data = {
            'recipe_id' : recipe_id,
            'recipe_name' : None,
            'contributor' : None,
            'mealtypes' : [],
            'ingredients' : [],
            'steps' : []
        }

        conn = db_connect(db_file)
        c = conn.cursor()

        query = [row for row in c.execute(
         '''SELECT a.id
            FROM Recipe a
            ORDER BY a.id'''
        )]

        print(query)

        # Retrieve all ingredients and their quantities
        query1 = [row for row in c.execute(
         '''SELECT a.name as recipe_name, c.id, c.name as ingredient_name, b.ingredient_qty
            FROM Recipe a
            LEFT JOIN Recipe_Ingredient b on a.id = b.recipe_id
            LEFT JOIN Ingredient c on b.ingredient_id = c.id
            WHERE a.id LIKE ?
            ORDER BY a.name, c.id, c.name, b.ingredient_qty''',
            (recipe_id,)
        )]

        #  Retrieve all steps
        query2 = [row for row in c.execute(
         '''SELECT b.step_no, b.step_description
            FROM Recipe a
            LEFT JOIN Recipe_Step b on a.id = b.recipe_id
            WHERE a.id LIKE ?
            ORDER BY b.step_no''',
            (recipe_id,)
        )]

        # Retrieve user information
        query3 = [row for row in c.execute(
         '''SELECT c.id, c.username, c.first_name
            FROM Recipe a
            LEFT JOIN User_Recipe b on a.id = b.recipe_id
            LEFT JOIN User c on b.user_id = c.id
            WHERE a.id LIKE ?
            ORDER BY c.id, c.username''',
            (recipe_id,)
        )]

        # Retrieve mealtype information
        query4 = [row for row in c.execute(
         '''SELECT c.id, c.name
            FROM Recipe a
            LEFT JOIN MealType_Recipe b on a.id = b.recipe_id
            LEFT JOIN MealType c on b.mealtype_id = c.id
            WHERE a.id LIKE ?
            ORDER BY c.id''',
            (recipe_id,)
        )]

        conn.close()

        if query1:
            data['recipe_name'] = query1[0][0]

            for q in query1:
                if q[1] is None:
                    break

                else:
                    temp = {
                        'ingredient_id' :  q[1],
                        'ingredient_name': q[2],
                        'ingredient_quantity': q[3]
                    }

                    data['ingredients'].append(temp)

        if query2:

            for q in query2:
                if q[0] is None:
                    break

                else:
                    temp = {
                        'step_no': q[0],
                        'step_description': q[1]
                    }

                    data['steps'].append(temp)

        if query3:

            for q in query3:
                if q[0] is None:
                    break

                else:
                    temp = {
                        'user_id' : q[0],
                        'username' : q[1],
                        'first_name' : q[2]
                    }

                    data['contributor'] = temp
                    break

        if query4:

            for q in query4:
                if q[0] is None:
                    break

                else:
                    temp = {
                        'mealtype_id': q[0],
                        'mealtype_name': q[1]
                    }

                    data['mealtypes'].append(temp)

        if query1 or query2 or query3 or query4:

            return json.loads(json.dumps(data)), 200

        return json.loads(json.dumps({
            'message': 'Recipe id does not exist'
        })), 200


@api.route('/recipe/<string:username>')
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
                ORDER BY a.recipe_id
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
                    'visibility': row[1],
                    'mealtypes': [],
                    'ingredients': [],
                    'steps': []
                }

                # Retrieve basic recipe information
                query1 = list(c.execute(
                    '''
                        SELECT a.name, a.description, a.prep_time
                        FROM Recipe a
                        WHERE a.id LIKE ?
                    '''
                    , (row[0],)
                ))

                if query1:
                    recipe_data['recipe_name'] = query1[0][0]
                    recipe_data['recipe_description'] = query1[0][1]
                    recipe_data['preparation_time'] = query1[0][2]

                # Retrieve all ingredients and their quantities
                query2 = list(c.execute(
                    '''
                        SELECT b.id, b.name, a.ingredient_qty
                        FROM Recipe_Ingredient a
                        LEFT JOIN Ingredient b ON a.ingredient_id = b.id
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
                            'ingredient_qty': q[2]
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
        visibility = api.payload['visibility']
        mealtypes = api.payload['mealtypes']
        ingredients = api.payload['ingredients']
        steps = api.payload['steps']

        conn = db_connect(db_file)
        c = conn.cursor()

        c.execute('INSERT INTO Recipe VALUES(null,?,?,?)', (recipe_name, recipe_description, preparation_time))

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
                    prep_time = ?
                WHERE id = ?
            '''
            , (recipe_name, recipe_description, preparation_time, recipe_id)
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

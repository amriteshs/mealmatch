# import json
# from flask_restplus import Resource, Api, fields

# from flaskr import api, db_file
# from flaskr.db import db_connect


# @api.route('/ingredients')
# class ingredient(Resource):
#     # @api.response(200, 'Login successful')
#     # @api.response(404, 'Login failed')
#     # @api.doc(description='User Login')
#     # @api.expect(login_model, validate=True)
#     def get(self):
#         conn = db_connect(db_file)
#         c = conn.cursor()

#         query = [row for row in c.execute('SELECT * FROM Ingredient WHERE username = ?', (username,))]

#         conn.close()

#         # if not query:
#         #     return json.loads(json.dumps({'message': 'Username does not exist.'})), 404

#         # if password != query[0][1]:
#         #     return json.loads(json.dumps({'message': 'Password is incorrect.'})), 404

#         return json.loads(json.dumps({
#             'username': username,
#             'password': password
#         })), 200
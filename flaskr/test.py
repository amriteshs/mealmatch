import sqlite3


conn = sqlite3.connect('data.db')
c = conn.cursor()

ingredients = ['ingrA', 'ingrB', 'ingrC', 'ingrD', 'ingrE']
categories = ['catA', 'catB', 'catC']

c.execute('INSERT INTO Ingredient VALUES(null,?)', (ingredients[0],))
c.execute('INSERT INTO Ingredient VALUES(null,?)', (ingredients[1],))
c.execute('INSERT INTO Ingredient VALUES(null,?)', (ingredients[2],))
c.execute('INSERT INTO Ingredient VALUES(null,?)', (ingredients[3],))
c.execute('INSERT INTO Ingredient VALUES(null,?)', (ingredients[4],))
c.execute('INSERT INTO Category VALUES(null,?)', (categories[0],))
c.execute('INSERT INTO Category VALUES(null,?)', (categories[1],))
c.execute('INSERT INTO Category VALUES(null,?)', (categories[2],))
c.execute('INSERT INTO Ingredient_Category VALUES(null,2,1)')
c.execute('INSERT INTO Ingredient_Category VALUES(null,2,2)')
c.execute('INSERT INTO Ingredient_Category VALUES(null,2,3)')
c.execute('INSERT INTO Ingredient_Category VALUES(null,3,4)')
c.execute('INSERT INTO Ingredient_Category VALUES(null,3,5)')
conn.commit()

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

for q in query:
    print(q)

conn.close()
import sqlite3


conn = sqlite3.connect('data.db')
c = conn.cursor()

# ingredients = ['apple', 'mango', 'peas', 'carrot', 'eggplant']
# categories = ['Dairy', 'Fruits', 'Vegetables']
# mealtypes = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Desserts']
# recipes = ['Blueberry Milk Shake', 'Omelette', 'Butter Chicken', 'Kale Juice', 'Potato Salad',
# 'Bread Toast', 'Ricotta Spinach', 'Apple Pie', 'Chocolate Pancake', 'Beef Noodles', 'Pad Thai',
# 'Fruit Salad']

# # enter ingredients
# for i in range(len(ingredients)):
#     c.execute('INSERT INTO Ingredient VALUES(null,?)', (ingredients[i],))

# # enter categories
# for i in range(len(categories)):
#     c.execute('INSERT INTO Category VALUES(null,?)', (categories[i],))

# # enter mealtypes
# for i in range(len(mealtypes)):
#     c.execute('INSERT INTO MealType VALUES(null,?)', (mealtypes[i],))

# # specify category for each ingredient
# c.execute('INSERT INTO Ingredient_Category VALUES(null,2,1)')
# c.execute('INSERT INTO Ingredient_Category VALUES(null,2,2)')
# c.execute('INSERT INTO Ingredient_Category VALUES(null,3,3)')
# c.execute('INSERT INTO Ingredient_Category VALUES(null,3,4)')
# c.execute('INSERT INTO Ingredient_Category VALUES(null,3,5)')

# # enter recipes
# for i in range(len(recipes)):
#     c.execute('INSERT INTO Recipe VALUES(null,?,"You\'ve got all ingredients","30-45 minutes")', (recipes[i],))

# # c.execute('INSERT INTO User VALUES(null,"sahil.punchhi","sahilp","Sahil","Punchhi")')
# # c.execute('INSERT INTO User VALUES(null,"amritesh.singh","amriteshs","Amritesh","Singh")')

# # specify mealtype for each recipe
# c.execute('INSERT INTO MealType_Recipe VALUES(null,1,1)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,1,2)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,1,4)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,1,6)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,2,7)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,2,10)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,2,11)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,3,5)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,4,3)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,5,8)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,5,9)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,4,12)')
# c.execute('INSERT INTO MealType_Recipe VALUES(null,3,12)')

# # specify ingredients for each recipe
# c.execute('INSERT INTO Recipe_Ingredient VALUES(null,12,1,"1 cup")')
# c.execute('INSERT INTO Recipe_Ingredient VALUES(null,12,2, "2 cups")')

# # specify steps for recipes
# c.execute('INSERT INTO Recipe_Step VALUES(null,12,1,"Cut apples and mangoes in small pieces")')
# c.execute('INSERT INTO Recipe_Step VALUES(null,12,2,"Mix pieces in a bowl and sprinkle black salt")')
# c.execute('INSERT INTO Recipe_Step VALUES(null,12,3,"Serve with mint and lime")')

# # specify recipes by a user
# # c.execute('INSERT INTO User_Recipe VALUES(null,1,12)')
# # c.execute('INSERT INTO User_Recipe VALUES(null,1,1)')
# # c.execute('INSERT INTO User_Recipe VALUES(null,2,2)')

# conn.commit()

# # test query
query = list(c.execute(
            '''
                SELECT * FROM Recipe_Ingredient
            '''
        ))

for q in query:
    print(q)

conn.close()

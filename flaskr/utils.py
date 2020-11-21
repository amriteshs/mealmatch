import random
from collections import defaultdict

from flaskr.db import unavailable_ingredients, all_suggested_ingredients, recipe_list


# function for ingredient suggestions to explorer
def ingredient_suggestion_explorer(user_ingredient_list):
    user_ingredient_list = [ingredient for ingredient in user_ingredient_list if ingredient not in unavailable_ingredients]
    suggested_ingredients = []
    def intersection(lst1, lst2):
        temp = set(lst2)
        lst3 = [value for value in lst1 if value in temp]
        return lst3

    suggested_ingredient_dict = defaultdict(int)

    if len(user_ingredient_list) <= 3:
        for recipe in recipe_list:
            if len(intersection(user_ingredient_list, recipe)) == len(user_ingredient_list):
                for ingredient in [x for x in recipe if x not in user_ingredient_list]:
                    suggested_ingredient_dict[ingredient] += 1
    elif len(user_ingredient_list) <= 5:
        for recipe in recipe_list:
            if abs(len(intersection(user_ingredient_list, recipe)) - len(user_ingredient_list)) <= 1 :
                for ingredient in [x for x in recipe if x not in user_ingredient_list]:
                    suggested_ingredient_dict[ingredient] += 1
    elif len(user_ingredient_list) <= 7:
        for recipe in recipe_list:
            if abs(len(intersection(user_ingredient_list, recipe)) - len(user_ingredient_list)) <= 2 :
                for ingredient in [x for x in recipe if x not in user_ingredient_list]:
                    suggested_ingredient_dict[ingredient] += 1
    elif len(user_ingredient_list) <= 9:
        for recipe in recipe_list:
            if abs(len(intersection(user_ingredient_list, recipe)) - len(user_ingredient_list)) <= 4 :
                for ingredient in [x for x in recipe if x not in user_ingredient_list]:
                    suggested_ingredient_dict[ingredient] += 1
    else:
        for recipe in recipe_list:
            if len(intersection(user_ingredient_list, recipe)) >= 5 :
                for ingredient in [x for x in recipe if x not in user_ingredient_list]:
                    suggested_ingredient_dict[ingredient] += 1

    if len(suggested_ingredient_dict) > 0:
        suggested_ingredient_dict = {k: v for k, v in sorted(suggested_ingredient_dict.items(), key=lambda item: item[1], reverse=True)}
    
    if suggested_ingredient_dict:
        if len(suggested_ingredient_dict) >= 8:
            suggested_ingredients = list(suggested_ingredient_dict.keys())[:8]
        else:
            k = len(suggested_ingredient_dict)
            suggested_ingredients = list(suggested_ingredient_dict.keys())[:k]
    
    if len(suggested_ingredients) > 0:
        return suggested_ingredients
    else:
        for recipe in recipe_list:
            for ingredient in [x for x in recipe if x not in user_ingredient_list]:
                suggested_ingredient_dict[ingredient] += 1
        if suggested_ingredient_dict:
            if len(suggested_ingredient_dict) > 0:
                suggested_ingredient_dict = {k: v for k, v in sorted(suggested_ingredient_dict.items(), key=lambda item: item[1], reverse=True)}
            if len(suggested_ingredient_dict) >= 8:
                suggested_ingredients = list(suggested_ingredient_dict.keys())[:8]
            else:
                k = len(suggested_ingredient_dict)
                suggested_ingredients = list(suggested_ingredient_dict.keys())[:k]

        return suggested_ingredients

# function for ingredients recommendation to contributor
def ingredient_suggestion_contributor(contributor_ingredient_list):
    suggested_ingredient_list = [ingredient for ingredient in all_suggested_ingredients if ingredient not in contributor_ingredient_list]
    
    if len(suggested_ingredient_list) >= 16:
        suggested_ingredients = random.sample(suggested_ingredient_list, 16)
    else:
        suggested_ingredients = random.sample(suggested_ingredient_list, len(suggested_ingredient_list))

    return suggested_ingredients
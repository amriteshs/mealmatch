# MealMatch

Instructions to use the website

## Front-End Initialisation

1. Open the terminal at the root directory of the project to initiate front-end setup. Change the directory of the command line path to reach the destination folder **tech-nox** where all the front-end files are present.  
```cd Front-End/tech-nox/```
2. The project is based on Node.js, which requires NPM environment to install all the needed packages. This will install all packages the project needs according to the *package.json* file in root path.  
```npm install```
3. Run server file using the below run command. This would initiate the start script from the json package file.
Run the following commands:  
```npm start```
4. Open the browser and navigate to **http://localhost:3000** to visit the home page of the website.

## Back-End Initialisation

1. Open a new terminal at the root directory of the project to initiate back-end setup.  
2. Using the python package installer pip3, install all the required libraries from the *requirements.txt* file by running the below command.  
```pip3 install -r requirements.txt```
3. The flask command is installed by Flask and it must be told where to find the application in order to use it. This can be done by running the below command.  
```flask run```
4. Open the browser and navigate to **http://localhost:5000** to visit all the flask models running in the backend.

## End User Manual

This manual explains the many ways in which to use the website in order to get the most out of our vast resource. For all further questions, please get in touch with the MealMatch team – the contact details can be found in the last page of the manual. 

**MealMatch** allows a user to enter in their available ingredients and provides the user with a set of recipe options that are possible based on the input ingredients. It perfectly learns what flavours and textures work best together using ingredients in the fridge and pantry which are easily available. With thousands of recipes in its database, it does all the brainstorming work for the enjoyer.

### Section 1: Home Page

The home page of the website can be used to plan your meal and has the following features:

A. **Search Filters**  
    
    You can search for a recipe or an ingredient by selecting the appropriate filter from the drop-down menu in the search bar.

B. **Search**  

    Once you have selected the search filter, you can search for recipe/ingredient by either typing its name in the search bar or any part of it. (For e.g. to search for ‘brown sugar’, you may type ‘sugar’ / ‘sug’ / ‘brow’ etc.

C. **Search Ingredient Results**  

    After completing the ingredient search, you can select the desired ingredient by checking on the small box displayed next to the ingredient name in the ‘Ingredient’ box. Selected ingredients will start appearing in the extreme left section of the page under ‘Ingredients to Include’ as you select them.

D. **Search Recipe Results**  

    After completing the recipe search, you can see the results in the ‘Recipes’ box located below the ‘ingredient’ box. For each recipe, you can see recipe image, ‘time to prepare the dish’, and ‘serves people’. You can also see number of likes for each recipe displayed next to the heart icon. Clicking on the down-arrow button will expand the recipe card and you can see all the detailed steps of the recipe. Clicking on the up-arrow button will again minimize the recipe card.

E. **Ingredient Category**  

    You can also select the ingredients from a particular category by accessing ‘Ingredient Category’ option located on the top left of the home page. Once you click this button, all the ingredient categories will be displayed in the ingredient box. You can select the desired category which will display all the ingredients from that category. You can then select all the ingredients needed from that category by checking on the small box next to the ingredient name. A running list of the ingredients will appear in the extreme left section of the page under ‘Ingredients to Include’ once you add them.  
    1. Back button: This will take you back to the ingredient categories.  
    2. Suggest Ingredients button: ‘‘MealMatch’’ automatically suggests new ingredients based on the ingredients you have already selected. Clicking this button will give you new ingredient suggestions which you can select as described earlier.  
    3. View All Ingredients button: Clicking this button will display all the ingredients. This is an alternative way to select a particular ingredient if you don’t know its category.  
    
F. **Delete an ingredient**  

    You can delete an ingredient by either clicking on the trash icon displayed next to the ingredient name in the running list of ingredients (left section of the page) or by unchecking the box corresponding to the ingredient name in the ingredient box (top section of the page). The ingredient will then disappear from the running list of ingredients.

G. **Meal Type**  

    You can select a particular meal type by accessing ‘Meal Type’ option located on the top left of the home page. Once you click this button, all the meal types will be displayed in the meal type box, from which you can select the preferred meal type by clicking on it. The selected meal type will then appear in the extreme left section of the page below ‘Meal Type’ button. 

H. **Recipes Box**  

    The ‘Recipes’ box has 3 radio buttons to filter the type of results. At a time, only 1 of the 3 buttons can be selected. By default, ‘Show all recipes’ button is selected. 
    1. Show all recipes: Selecting this button will display all the recipes in the system.  
    2. Search by selected ingredients: Selecting this button will filter the recipes based on the selected ingredients, if any. It will display the results showing the closest match to the ingredients selected and the recipe cards will also indicate the number of extra ingredients you will need to make that recipe. Hovering over the number, you can see the names of those ingredients.  
    3. Search by selected meal type: Selecting this button will filter the recipes based on the selected meal type.  

I. **Ingredients to Exclude**  

    ‘MealMatch’ gives you the option to exclude any ingredients based on medical conditions, allergy or preference by accessing the ‘Ingredients to Exclude’ button located on the left section of the page. After clicking on this button, you can select the desired ingredients from the ingredient box which you want to exclude. When you click on the ‘Search by selected ingredients’ radio button in the ‘Recipes’ box, it will hide all the recipe results which have ingredients you want to exclude.

**Please note**: You do not need to necessarily register on ‘MealMatch’ in order to use the website. However, if you want to contribute and store your own recipes, you must first make a user account on the website.

### Section 2: About Page

Click on the ‘About’ button located in the right side of the tool bar on home page to open the About page. This page is divided into 4 sections. The first section gives an introduction of ‘MealMatch’. The second section illustrates the need of this product. The third section introduces the ‘MealMatch’ team members and their experiences. Lastly, the fourth section mentions ‘Attributions and Acknowledgements’. 

### Section 3: Signup and Login Page

A. **Signup/Login**  

    You can login on ‘MealMatch’ by clicking on the login button located in the top right corner of the tool bar on home page. Clicking this button will open a login page and will prompt you to enter your username and password. Remember that password is case sensitive. Once you enter these details, click on ‘login’ button. 
    
    If you are a new user, you will have to sign up on the website first. You can do this by clicking on the ‘sign up’ button located on lower right of the login page. This will open a signup page where you can enter your first name, last name, username and password in the fields indicated. After this click on the ‘done’ button. In case of successful registration, the login page would reappear where you can enter your login credentials, username and password, and login to the website.
    
    You can see your login details by clicking on the ‘user’ icon located in the top right corner of the tool bar on home page.

B. **Logout**  
    
    Click on the user icon located in the top right corner of the tool bar on home page. Then click on the ‘logout’ button which appears in the drop-down menu to logout from the website.

### Section 4: Contribute Page

Click on the ‘Contribute’ button located in the left side of the tool bar on home page to open the Contributor page where you can add new recipes and see details of your existing recipes. The ‘Recipes’ box would indicate the number of recipes you have added.

A. **Add recipe**

    You can add a new recipe by clicking on the ‘+ Add Recipe’ button located in the ‘Recipes’ box. After clicking on this button, follow the below steps to add a new recipe.
    STEP 1: INGREDIENT SELECTION  
        1. Select or deselect an ingredient similar to the ingredient selection module on the recipe explorer page. 
        2. Try new ingredients button: This is an additional button which appears in the ‘Ingredient’ box of Contributor page. Clicking this button, shows the combination of most common ingredients for which you haven’t contributed any recipe yet. You may select your preferred ingredients from this list.  
    STEP 2: RECIPE CREATION
        1. Basic information  
                Name: Type the name of the recipe. This field cannot be left blank.  
                Description: Type the description of the recipe. This field cannot be left blank.  
        2. Ingredients: This will show all the ingredients you have selected in Step 1. You can enter the ingredient quantity for each ingredient (for e.g. 2; 2 tblspoons; 2 cups etc.).  
        3. Steps: You can add recipe step by clicking on the ‘+ Add Step’ button. You can add more steps by clicking on the same button again. You can also delete a particular step by clicking on the trash icon located next to the recipe step. Further, the recipe steps can also be reordered using top-arrow and down-arrow keys. Clicking on the ‘Clear’ button will delete all the recipe steps.  
        4. Meal types: You can select 1 or more meal types by selecting a meal type from the drop-down list. Clicking on the ‘Clear’ button will delete all the meal types you have selected.  
        5. Other information  
                Preparation time: You can enter the approximate preparation time for the recipe (for e.g. 35-40 mins).  
                People served: You can enter the number of people that can be served by the prepared dish. By default, this value will be 1.  
                Visibility: You can set the visibility public or private from the drop-down list. If you select private, the recipe will only be visible to you. If you select public, the recipe will be visible to other users.  
        6.  Add Image: You can also add an image for your recipe by choosing a file on your system. The image format must be jpg.  
    SAVE RECIPE: You can click on ‘Save recipe’ button to save the recipe after completing all the steps outlined above.  
    BACK BUTTON: Clicking on this button will take you back to the Contribute page and will show you all your contributed recipes.  
        
B. **Filter recipes**  

    You can filter your contributed recipes on the ‘Contribute’ page according to below filters.  
    1. Switch for filter by selected ingredients: Turning on this switch will filter all the recipes according to the ingredients you have selected on the ‘Contribute’ page.  
    2. Switch for filter by selected meal type: Turning on this switch will filter all the recipes according to the meal type you have selected on the ‘Contribute’ page.  

C. **Change visibility**  

    You can change the visibility for a particular recipe from public to private or vice-versa by clicking on the ‘visibility’ icon located on the recipe card. Clicking on this button again, will again change the visibility of the recipe.  

D. **Update recipe**  

    You can update the details of a recipe by clicking on the ‘edit’ icon located on the recipe card. Clicking this icon will take you the recipe page where you can edit any details. Click on ‘Save Recipe’ to save the new details or click on ‘Back’ button if you no longer wish to save the new details.  

E. **Delete recipe**  

    You can delete a recipe by clicking on the trash icon located on the recipe card.  

import sqlite3


def db_init(db_file):
    try:
        conn = sqlite3.connect(db_file)
        c = conn.cursor()

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS User (
                    id              INTEGER         NOT NULL,
                    username        VARCHAR(30)     NOT NULL    UNIQUE,
                    password        VARCHAR(50)     NOT NULL,
                    first_name      VARCHAR(30)     NOT NULL,
                    last_name       VARCHAR(50)     NOT NULL,
                    PRIMARY KEY(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS Ingredient (
                    id              INTEGER         NOT NULL,
                    name            VARCHAR(30)     NOT NULL    UNIQUE,
                    PRIMARY KEY(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS Recipe (
                    id              INTEGER         NOT NULL,
                    name            VARCHAR(100)    NOT NULL,
                    description     VARCHAR(500),
                    prep_time       VARCHAR(25),
                    people_served   INTEGER,
                    PRIMARY KEY(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS MealType (
                    id              INTEGER         NOT NULL,
                    name            VARCHAR(50)     NOT NULL    UNIQUE,
                    PRIMARY KEY(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS Category (
                    id              INTEGER         NOT NULL,
                    name            VARCHAR(50)     NOT NULL    UNIQUE,
                    PRIMARY KEY(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS User_Recipe (
                    id              INTEGER         NOT NULL,
                    user_id         INTEGER         NOT NULL,
                    recipe_id       INTEGER         NOT NULL,
                    visibility      VARCHAR(10)     NOT NULL,
                    PRIMARY KEY(id),
                    FOREIGN KEY(user_id) REFERENCES User(id),
                    FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS Recipe_Step (
                    id                  INTEGER         NOT NULL,
                    recipe_id           INTEGER         NOT NULL,
                    step_no             INTEGER         NOT NULL,
                    step_description    VARCHAR(1500)   NOT NULL,
                    PRIMARY KEY(id),
                    FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS Recipe_Ingredient (
                    id                  INTEGER         NOT NULL,
                    recipe_id           INTEGER         NOT NULL,
                    ingredient_id       INTEGER         NOT NULL,
                    ingredient_qty      VARCHAR(25),
                    PRIMARY KEY(id),
                    FOREIGN KEY(recipe_id) REFERENCES Recipe(id),
                    FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS Ingredient_Category (
                    id                  INTEGER         NOT NULL,
                    category_id         INTEGER         NOT NULL,
                    ingredient_id       INTEGER         NOT NULL,
                    PRIMARY KEY(id),
                    FOREIGN KEY(category_id) REFERENCES Category(id),
                    FOREIGN KEY(ingredient_id) REFERENCES Ingredient(id)
                )
            '''
        )

        c.execute(
            '''
                CREATE TABLE IF NOT EXISTS MealType_Recipe (
                    id                  INTEGER         NOT NULL,
                    mealtype_id         INTEGER         NOT NULL,
                    recipe_id           INTEGER         NOT NULL,
                    PRIMARY KEY(id),
                    FOREIGN KEY(mealtype_id) REFERENCES MealType(id),
                    FOREIGN KEY(recipe_id) REFERENCES Recipe(id)
                )
            '''
        )

        conn.commit()

        # populate database if empty
        query = list(c.execute('SELECT * FROM Category'))
        
        if not query:
            conn.close()
            conn = populate_db(db_file)

        return conn
    except sqlite3.Error as e:
        print(e)

def db_connect(db_file):
    try:
        conn = sqlite3.connect(db_file)

        return conn
    except sqlite3.Error as e:
        print(e)

def populate_db(db_file):
    try:
        conn = sqlite3.connect(db_file)
        c = conn.cursor()

        mealtypes = [
            'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread', 'breakfast', 'soup',
            'beverage', 'sauce', 'marinade', 'fingerfood', 'snack', 'drink'
        ]

        ingredient_categories = {
            'Dairy': [
                    'butter', 'egg', 'milk', 'parmesan', 'cheddar', 'american cheese', 'sour cream', 'cream cheese',
                    'mozzarella', 'yogurt', 'cream', 'evaporated milk', 'whipped cream', 'half and half',
                    'feta', 'monterey jack cheese', 'condensed milk', 'cottage cheese', 'ice cream', 'swiss cheese',
                    'velveeta', 'frosting', 'buttermilk', 'ricotta', 'goat cheese', 'provolone', 'blue cheese', 
                    'powdered milk', 'colby cheese', 'pepper jack', 'italian cheese', 'soft cheese', 'gouda', 'pepperjack cheese',
                    'romano', 'brie', 'pizza cheese', 'ghee', 'creme fraiche', 'cheese soup', 'gruyere', 'pecorino cheese', 
                    'custard', 'muenster', 'queso fresco cheese', 'hard cheese', 'havarti cheese', 'asiago', 'mascarpone',
                    'neufchatel', 'halloumi', 'paneer', 'brick cheese', 'camembert cheese', 'goat milk', 'garlic herb cheese', 
                    'edam cheese', 'manchego', 'fontina', 'stilton cheese', 'emmenthaler cheese', 'red leicester cheese', 
                    'jarlsberg cheese', 'bocconcini cheese', 'farmer cheese', 'creme de cassis', 'wensleydale cheese', 
                    'longhorn cheese', 'double gloucester cheese', 'raclette cheese', 'lancashire cheese', 'cheshire cheese',
                ],
            'Vegetables': [
                    'onion', 'garlic', 'tomato', 'potato', 'carrot', 'bell pepper', 'basil', 'parsley', 'broccoli', 
                    'corn', 'spinach', 'mushroom', 'ginger', 'chili pepper', 'celery', 'rosemary', 'salad greens', 
                    'red onion', 'cucumber', 'sweet potato', 'pickle', 'avocado', 'zucchini', 'cilantro', 'frozen vegetables', 
                    'olive', 'asparagus', 'cabbage', 'cauliflower', 'dill', 'kale', 'mixed vegetable', 'pumpkin', 'squash', 'mint', 
                    'scallion', 'sun dried tomato', 'shallot', 'eggplant', 'beet', 'butternut squash', 'horseradish', 'leek', 
                    'caper', 'brussels sprout', 'artichoke heart', 'chia seeds', 'radish', 'sauerkraut', 'artichoke', 'portobello mushroom', 
                    'sweet pepper', 'arugula', 'spaghetti squash', 'capsicum', 'bok choy', 'parsnip', 'okra', 'yam', 'fennel', 'turnip', 
                    'snow peas', 'bean sprouts', 'seaweed', 'chard', 'collard', 'canned tomato', 'pimiento', 'watercress', 'tomatillo', 
                    'rocket', 'mustard greens', 'bamboo shoot', 'rutabaga', 'endive', 'broccoli rabe', 'jicama', 'kohlrabi', 'hearts of palm', 
                    'butternut', 'celery root', 'daikon', 'radicchio', 'porcini', 'chinese broccoli', 'jerusalem artichoke', 'cress', 
                    'water chestnut', 'dulse', 'micro greens', 'burdock', 'chayote'
                ],
            'Fruits': [
                    'lemon', 'apple', 'banana', 'lime', 'strawberry', 'orange', 'pineapple', 'blueberry', 'raisin', 'coconut', 'grape', 
                    'peach', 'raspberry', 'cranberry', 'mango', 'pear', 'blackberry', 'cherry', 'date', 'watermelon', 'berries', 'kiwi', 
                    'grapefruit', 'mandarin', 'craisins', 'cantaloupe', 'plum', 'apricot', 'clementine', 'prunes', 'apple butter', 'pomegranate', 
                    'nectarine', 'fig', 'tangerine', 'papaya', 'rhubarb', 'sultanas', 'plantain', 'currant', 'passion fruit', 'guava', 'persimmons', 
                    'lychee', 'lingonberry', 'tangelos', 'kumquat', 'boysenberry', 'star fruit', 'quince', 'honeydew', 'crabapples'
                ],
            'Baking & Grains': [
                    'rice', 'pasta', 'flour', 'bread', 'baking powder', 'baking soda', 'bread crumbs', 'cornstarch', 'rolled oats', 
                    'noodle', 'flour tortillas', 'pancake mix', 'yeast', 'cracker', 'quinoa', 'brown rice', 'cornmeal', 'self rising flour', 
                    'cake mix', 'saltines', 'popcorn', 'macaroni cheese mix', 'corn tortillas', 'ramen', 'cereal', 'biscuits', 'stuffing mix', 
                    'couscous', 'pie crust', 'bisquick', 'chips', 'angel hair', 'coconut flake', 'bread flour', 'croutons', 'lasagne', 
                    'pizza dough', 'bagel', 'puff pastry', 'hot dog bun', 'barley', 'multigrain bread', 'potato flakes', 'pretzel', 'cornbread', 
                    'english muffin', 'cornflour', 'crescent roll dough', 'cream of wheat', 'coconut flour', 'pita', 'risotto', 'muffin mix', 
                    'bicarbonate of soda', 'ravioli', 'wheat', 'rice flour', 'polenta', 'baguette', 'gnocchi', 'vermicelli', 'semolina', 
                    'wheat germ', 'buckwheat', 'croissants', 'bread dough', 'filo dough', 'yeast flake', 'pierogi', 'matzo meal', 'rye', 
                    'tapioca flour', 'shortcrust pastry', 'potato starch', 'breadsticks', 'ciabatta', 'spelt', 'angel food', 'tapioca starch', 
                    'starch', 'whole wheat flour', 'gram flour', 'sourdough starter', 'wafer', 'bran', 'challah', 'sponge cake', 'malt extract', 
                    'sorghum flour'
                ],
            'Added Sweeteners': [
                    'sugar', 'brown sugar', 'honey', 'confectioners sugar', 'maple syrup', 'corn syrup', 'molasses', 'artificial sweetener', 
                    'agave nectar'
                ],
            'Spices': [
                    'cinnamon', 'vanilla', 'garlic powder', 'paprika', 'oregano', 'chili powder', 'red pepper flake', 'cumin', 'cayenne', 
                    'italian seasoning', 'thyme', 'onion powder', 'nutmeg', 'ground nutmeg', 'curry powder', 'bay leaf', 'taco seasoning', 
                    'sage', 'clove', 'allspice', 'turmeric', 'chive', 'peppercorn', 'ground coriander', 'cajun seasoning', 'coriander', 
                    'celery salt', 'vanilla essence', 'herbs', 'steak seasoning', 'poultry seasoning', 'chile powder', 'cardamom', 
                    'italian herbs', 'tarragon', 'garam masala', 'marjoram', 'mustard seed', 'celery seed', 'chinese five spice', 'italian spice', 
                    'saffron', 'onion flake', 'herbes de provence', 'chipotle', 'dill seed', 'fennel seed', 'caraway', 'cacao', 'star anise', 
                    'savory', 'chili paste', 'tamarind', 'aniseed', 'fenugreek', 'lavender', 'old bay seasoning', 'lemon balm'
                ],
            'Meats': [
                    'chicken breast', 'ground beef', 'bacon', 'sausage', 'beef steak', 'ham', 'hot dog', 'pork chops', 'chicken thighs', 
                    'ground turkey', 'cooked chicken', 'turkey', 'pork', 'pepperoni', 'whole chicken', 'chicken leg', 'ground pork', 
                    'chorizo', 'chicken wings', 'beef roast', 'polish sausage', 'salami', 'pork roast', 'ground chicken', 'pork ribs', 
                    'spam', 'venison', 'pork shoulder', 'bologna', 'bratwurst', 'prosciutto', 'lamb', 'corned beef', 'chicken roast', 
                    'lamb chops', 'pancetta', 'ground lamb', 'beef ribs', 'duck', 'pork belly', 'beef liver', 'leg of lamb', 'canadian bacon', 
                    'beef shank', 'veal', 'chicken giblets', 'cornish hen', 'lamb shoulder', 'lamb shank', 'deer', 'ground veal', 'pastrami', 
                    'rabbit', 'sliced turkey', 'pork loin', 'elk', 'beef suet', 'veal cutlet', 'lamb loin', 'marrow bones', 'goose', 
                    'chicken tenders', 'veal chops', 'quail', 'oxtail', 'pheasant', 'lamb liver', 'moose', 'turkey liver', 'pork liver', 
                    'veal shank', 'foie gras', 'beef sirloin', 'liver sausage', 'sweetbread', 'wild boar', 'snail', 'pigeon', 'duck liver', 
                    'goose liver', 'grouse', 'ostrich', 'soppressata', 'alligator'
                ],
            'Fish': [
                    'canned tuna', 'salmon', 'tilapia', 'fish fillets', 'cod', 'canned salmon', 'anchovy', 'smoked salmon', 'sardines', 
                    'tuna steak', 'whitefish', 'halibut', 'trout', 'haddock', 'flounder', 'catfish', 'mahi mahi', 'mackerel', 'sole', 
                    'sea bass', 'red snapper', 'swordfish', 'pollock', 'herring', 'perch', 'grouper', 'caviar', 'monkfish', 'rockfish', 
                    'lemon sole', 'pike', 'barramundi', 'eel', 'bluefish', 'carp', 'cuttlefish', 'pompano', 'arctic char', 'john dory', 
                    'marlin', 'amberjack', 'sturgeon'
                ],
            'Seafood': [
                    'shrimp', 'crab', 'prawns', 'scallop', 'clam', 'lobster', 'mussel', 'oyster', 'squid', 'calamari', 'crawfish', 
                    'octopus', 'cockle', 'conch', 'sea urchin'
                ],
            'Condiments': [
                    'mayonnaise', 'ketchup', 'mustard', 'vinegar', 'soy sauce', 'balsamic vinegar', 'worcestershire', 'hot sauce', 
                    'barbecue sauce', 'ranch dressing', 'wine vinegar', 'apple cider vinegar', 'cider vinegar', 'italian dressing', 
                    'rice vinegar', 'salad dressing', 'tabasco', 'fish sauce', 'teriyaki', 'steak sauce', 'tahini', 'enchilada sauce', 
                    'vinaigrette dressing', 'oyster sauce', 'honey mustard', 'sriracha', 'caesar dressing', 'taco sauce', 'mirin', 
                    'blue cheese dressing', 'sweet and sour sauce', 'thousand island', 'picante sauce', 'buffalo sauce', 'french dressing', 
                    'tartar sauce', 'cocktail sauce', 'marsala', 'adobo sauce', 'tzatziki sauce', 'sesame dressing', 'ponzu', 'duck sauce', 
                    'pickapeppa sauce', 'yuzu juice', 'cream sauce'
                ],
            'Oils': [
                    'olive oil', 'vegetable oil', 'cooking spray', 'canola oil', 'shortening', 'sesame oil', 'coconut oil', 'peanut oil', 
                    'sunflower oil', 'lard', 'grape seed oil', 'corn oil', 'almond oil', 'avocado oil', 'safflower oil', 'walnut oil', 
                    'hazelnut oil', 'palm oil', 'soybean oil', 'mustard oil', 'pistachio oil', 'soya oil'
                ],
            'Seasonings': [
                    'bouillon', 'ground ginger', 'sesame seed', 'cream of tartar', 'chili sauce', 'soya sauce', 'apple cider', 'hoisin sauce', 
                    'liquid smoke', 'rice wine', 'vegetable bouillon', 'poppy seed', 'balsamic glaze', 'miso', 'wasabi', 'fish stock', 
                    'rose water', 'pickling salt', 'champagne vinegar', 'bbq rub', 'jamaican jerk spice', 'accent seasoning', 'pickling spice', 
                    'mustard powder', 'mango powder', 'adobo seasoning', 'kasuri methi', 'caribbean jerk seasoning', 'brine', 'matcha powder', 
                    'cassia'
                ],
            'Sauces': [
                    'tomato sauce', 'tomato paste', 'salsa', 'pesto', 'alfredo sauce', 'beef gravy', 'curry paste', 'chicken gravy', 
                    'cranberry sauce', 'turkey gravy', 'mushroom gravy', 'sausage gravy', 'onion gravy', 'cream gravy', 'pork gravy', 
                    'tomato gravy', 'giblet gravy'
                ],
            'Legumes': [
                    'green beans', 'peas', 'black beans', 'chickpea', 'lentil', 'refried beans', 'hummus', 'chili beans', 'lima beans', 
                    'kidney beans', 'pinto beans', 'edamame', 'split peas', 'snap peas', 'soybeans', 'cannellini beans', 'navy beans', 
                    'french beans', 'red beans', 'great northern beans', 'fava beans'
                ],
            'Alcohol': [
                    'white wine', 'beer', 'red wine', 'vodka', 'rum', 'whiskey', 'tequila', 'sherry', 'bourbon', 'cooking wine', 'whisky', 
                    'liqueur', 'brandy', 'gin', 'kahlua', 'irish cream', 'triple sec', 'champagne', 'amaretto', 'cabernet sauvignon', 
                    'vermouth', 'bitters', 'maraschino', 'sake', 'grand marnier', 'masala', 'dessert wine', 'schnapps', 'port wine', 
                    'sparkling wine', 'cognac', 'chocolate liqueur', 'burgundy wine', 'limoncello', 'creme de menthe', 'bloody mary', 
                    'raspberry liquor', 'curacao', 'frangelico', 'shaoxing wine', 'absinthe', 'madeira wine', 'ouzo', 'anisette', 'grappa', 
                    'ciclon', 'drambuie'
                ],
            'Soup': [
                    'chicken broth', 'mushroom soup', 'beef broth', 'tomato soup', 'vegetable stock', 'chicken soup', 'onion soup', 
                    'vegetable soup', 'celery soup', 'dashi', 'lamb stock', 'pork stock', 'veal stock'
                ],
            'Nuts': [
                    'peanut butter', 'almond', 'walnut', 'pecan', 'peanut', 'cashew', 'flax', 'pine nut', 'pistachio', 'almond meal', 'hazelnut', 
                    'macadamia', 'almond paste', 'chestnut', 'praline', 'macaroon'
                ],
            'Dairy Alternatives': [
                    'margarine', 'coconut milk', 'almond milk', 'soy milk', 'rice milk', 'hemp milk', 'non dairy creamer'
                ],
            'Desserts & Snacks': [
                    'chocolate', 'apple sauce', 'strawberry jam', 'graham cracker', 'marshmallow', 'chocolate syrup', 'potato chips', 'nutella', 
                    'chocolate morsels', 'bittersweet chocolate', 'pudding mix', 'raspberry jam', 'dark chocolate', 'chocolate chips', 
                    'jam', 'white chocolate', 'brownie mix', 'chocolate pudding', 'jello', 'caramel', 'chocolate powder', 'candy', 'corn chips', 
                    'cookies', 'apricot jam', 'chocolate bar', 'cookie dough', 'oreo', 'doritos', 'chocolate cookies', 'butterscotch', 
                    'blackberry preserves', 'blueberry jam', 'peach preserves', 'cherry jam', 'fig jam', 'plum jam', 'cinnamon roll', 'fudge', 
                    'cookie crumb', 'grape jelly', 'chilli jam', 'lady fingers', 'black pudding', 'chocolate wafer', 'gummy worms', 
                    'biscotti biscuit', 'doughnut', 'amaretti cookies', 'apple jelly', 'red pepper jelly', 'orange jelly', 'jalapeno jelly', 
                    'mint jelly', 'currant jelly', 'lemon jelly', 'quince jelly'
                ],
            'Beverages': [
                    'coffee', 'orange juice', 'tea', 'green tea', 'apple juice', 'tomato juice', 'coke', 'chocolate milk', 'pineapple juice', 
                    'lemonade', 'cranberry juice', 'espresso', 'fruit juice', 'ginger ale', 'club soda', 'sprite', 'kool aid', 'grenadine', 
                    'margarita mix', 'cherry juice', 'pepsi', 'mountain dew'
                ]
        }

        # enter mealtypes
        for i in mealtypes:
            c.execute('INSERT INTO MealType VALUES(null,?)', (i,))

        # enter ingredients and categories
        ctr_cat = 1
        ctr_igr = 1
        for key, val in ingredient_categories.items():
            c.execute('INSERT INTO Category VALUES(null,?)', (key,))

            for v in val:
                c.execute('INSERT INTO Ingredient VALUES(null,?)', (v,))
                c.execute('INSERT INTO Ingredient_Category VALUES(null,?,?)', (ctr_cat, ctr_igr))
                
                ctr_igr += 1

            ctr_cat += 1

        conn.commit()

        return conn
    except sqlite3.Error as e:
        print(e)

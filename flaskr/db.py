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

        return conn
    except sqlite3.Error as e:
        print(e)

def db_connect(db_file):
    try:
        conn = sqlite3.connect(db_file)

        return conn
    except sqlite3.Error as e:
        print(e)

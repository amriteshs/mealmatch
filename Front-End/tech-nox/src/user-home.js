import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import 'fontsource-roboto';
import axios from 'axios';
import RecipeReviewCard from './recipeCards';

const drawerWidth = 240;
const topAppBarWidth = 64;

const useStyles = theme => ({
    root: {
        display: "flex",
        fontFamily: 'Roboto'
    },
    appBar: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        backgroundColor:'black'
    },
    searchBar:{
        backgroundColor: 'black',
        height: '4rem',
        borderRadius: '5px',
        marginTop: '1rem'
    },
    title: {
        flexGrow: 1,
    },
    inputRoot: {
        color: 'white',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '20rem',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'white'
    },
    searchBtn:{
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
    },
    cardsContaioner:{
        marginTop:'1rem'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        marginTop: topAppBarWidth,
        width: drawerWidth
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    selectedIngrDiv: {
        overflow: 'auto',
        padding: theme.spacing(1)
    }
});

class UserHomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.match.params.username,
            ingredient_count: 0,
            category_count: 0,
            mealtype_count: 0,
            ingredient_list: [],
            ingredient_checked: [],
            category_list: [],
            mealtype_list: [],
            selected_ingredients: [],
            selected_category: '',
            selected_mealtype: '',
            selected_mealtypes: [],
            api_recipe_name: '',
            api_recipe_list: [],
            base_uri: 'https://spoonacular.com/recipeImages/'
        };

        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleCheckReset = this.handleCheckReset.bind(this);
        this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleMealtypeSelect = this.handleMealtypeSelect.bind(this);
        this.setApiRecipeNameValue = this.setApiRecipeNameValue.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
        // this.getRecipe();
    }

    async getIngredients() {
        await axios.get('/ingredient')
        .then(response => {
            this.setState({
                ingredient_count: response.data.count,
                ingredient_list: response.data.ingredients,
                ingredient_checked: new Array(response.data.count).fill().map((item, idx) => item = false)
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    async getCategories() {
        await axios.get('/category')
        .then(response => {
            this.setState({
                category_count: response.data.count,
                category_list: response.data.categories
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    async getMealtypes() {
        await axios.get('/mealtype')
        .then(response => {
            this.setState({
                mealtype_count: response.data.count,
                mealtype_list: response.data.mealtypes
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    handleCheckChange(event) {
        let ingrCheck = [...this.state.ingredient_checked];
        let ingrSelect = [...this.state.selected_ingredients];

        ingrCheck[event.target.value] = event.target.checked;

        if (event.target.checked) {
            let ingredient_details = this.state.ingredient_list[event.target.value];
            ingredient_details.ingredient_qty = '';
            ingrSelect.push(ingredient_details);

            ingrSelect.sort(function(x, y) {
                if (x.ingredient_name < y.ingredient_name) { 
                    return -1;
                }
                if (x.ingredient_name > y.ingredient_name) { 
                    return 1;
                }
                return 0;
            });
        } else {
            ingrSelect = ingrSelect.filter(x => x.ingredient_name !== event.target.name);
        }

        this.setState({
            ingredient_checked: ingrCheck,
            selected_ingredients: ingrSelect
        });
    }

    handleCheckReset() {
        this.setState({
            ingredient_checked: new Array(this.state.ingredient_count).fill().map((item, idx) => item = false),
            selected_ingredients: []
        });
    }

    handleIngredientDelete(obj) {
        let ingrCheck = [...this.state.ingredient_checked];
        let ingrSelect = [...this.state.selected_ingredients];

        let index = this.state.ingredient_list.findIndex(x => x.ingredient_name === obj.ingredient_name);
        if (index !== -1) {
            ingrCheck[index] = false;
        }

        ingrSelect = ingrSelect.filter(x => x.ingredient_name !== obj.ingredient_name);

        this.setState({
            ingredient_checked: ingrCheck,
            selected_ingredients: ingrSelect,
        });
    }

    handleCategorySelect(event) {
        this.setState({
            selected_category: event.target.value
        });
    }

    handleMealtypeSelect(event) {
        this.setState({
            selected_mealtype: event.target.value
        });
    }

    setApiRecipeNameValue(event) {
        this.setState({
            api_recipe_name: event.target.value
        });
    }
    
    async getRecipe() {
        // all recipes are fetched here 
        const API_KEY= 'c972685406f94d8cac65c8c6c48febeb';
        const URL = 'https://api.spoonacular.com/recipes/search?apiKey=' + API_KEY + '&number=10&query=' + this.state.api_recipe_name;

        await axios.get(URL)
            .then(response => {
                this.setState({
                    api_recipe_list: response.data.results
                })
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        mealmatch
                    </Typography>
                    <Button color="inherit" >{this.state.username}</Button>
                    <Button color="inherit" href={'/' + this.state.username + '/contribute'}>Contribute</Button>
                    <Button color="inherit" href='/'>Logout</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
            >
                <List>
                {["Ingredient Category", "Meal Type"].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <div className={classes.selectedIngrDiv}>
                    {!this.state.selected_ingredients.length ?
                    (
                        <Typography>You have not selected any ingredients.</Typography>
                    ) : (
                    <>
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                            <Grid item xs={4}>
                                <Button
                                    onClick={this.handleCheckReset} 
                                    className={classes.clearBtn}>Clear
                                </Button>
                            </Grid>
                            <Grid item xs={8}>
                                {this.state.selected_ingredients.length === 1 ?
                                    (
                                        <Typography>1 ingredient selected.</Typography>
                                    ) : (
                                        <Typography>{this.state.selected_ingredients.length} ingredients selected.</Typography>
                                    )
                                }
                            </Grid>
                        {this.state.selected_ingredients.map((obj, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={3}>
                                    <IconButton 
                                        name={obj.ingredient_name} value={index} 
                                        aria-label="delete" color="secondary" 
                                        onClick={this.handleIngredientDelete.bind(this, obj)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={9}>
                                    {/* <Typography> */}
                                        {obj.ingredient_name}
                                    {/* </Typography> */}
                                </Grid>
                            </React.Fragment>
                        ))}
                        </Grid>
                    </>
                    )}
                </div>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                        donec massa sapien faucibus et molestie ac.
                    </Typography>
                    <div className={classes.searchBar}>
                    <Toolbar>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search for recipes ..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onBlur={this.setApiRecipeNameValue}
                        />
                    </div>
                    <Button className={classes.searchBtn} onClick={this.getRecipe}>Search</Button>
                    </Toolbar>
                    <div className={classes.cardsContaioner}>
                        <Grid container spacing={1}>
                        {this.state.api_recipe_list.map((recipe) => 
                            <Grid item sm={4}>
                                <RecipeReviewCard 
                                    title={recipe.title} 
                                    imageUrl={this.state.base_uri + recipe.image} 
                                    source={recipe.sourceUrl} 
                                    time={recipe.readyInMinutes} 
                                    serves={recipe.servings}
                                />
                            </Grid>
                        )}
                        </Grid>
                    </div>
                </div>
            </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(UserHomePage);
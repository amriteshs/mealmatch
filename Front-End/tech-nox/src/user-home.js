import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import 'fontsource-roboto';
import axios from 'axios';
import RecipeReviewCard from './recipeCards';
import OutlinedCard from './Cads';
import MealCard from './MealType';

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
    },
    dividerStyle: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    backCatBtn:{
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        marginRight: theme.spacing(1)
    },
    showIngrBtn:{
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange'
    },
    ingrView: {
        height:'36vh',
        overflow:'auto'
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
            ingredient_list: {},
            category_list: {},
            mealtype_list: {},
            searched_ingredient: '',
            selected_ingredients: [],
            selected_ingredients_exclude: [],
            selected_category: '',
            selected_mealtype: '',
            selected_mealtypes: [],
            selected_recipes: [],
            api_recipe_name: '',
            api_recipe_list: [],
            base_uri: 'https://spoonacular.com/recipeImages/',
            isShowCategory: true,
            isShowAllIngredients: false
        };

        this.handleIngredientCheckChange = this.handleIngredientCheckChange.bind(this);
        this.handleIngredientCheckReset = this.handleIngredientCheckReset.bind(this);
        this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleMealtypeSelect = this.handleMealtypeSelect.bind(this);
        this.setApiRecipeNameValue = this.setApiRecipeNameValue.bind(this);
        this.updateCardState = this.updateCardState.bind(this);
        this.handleShowAllIngredients = this.handleShowAllIngredients.bind(this);
        this.handleBackToCategorySelect = this.handleBackToCategorySelect.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
        // this.getRecipe();
    }

    updateCardState = (name) => {
        if (name === "Ingredient Category") {
            this.setState({
                isShowCategory: true
            });
        } else {
            this.setState({
                isShowCategory: false
            });
        }
    }

    async getIngredients() {
        await axios.get('/ingredient')
        .then(response => {
            this.setState({
                ingredient_count: response.data.count,
                ingredient_list: response.data.ingredients,
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

    handleIngredientCheckChange(event) {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};
        let ingrSelect = [...this.state.selected_ingredients];

        ingrList[event.target.value].checked = event.target.checked;

        let ingrCategory = ingrList[event.target.value].category_name;
        catList[ingrCategory].ingredients[event.target.value].checked = event.target.checked;

        if (event.target.checked) {
            ingrSelect.push(event.target.value);
            ingrSelect.sort();
        } else {
            ingrSelect = ingrSelect.filter(x => x !== event.target.value);
        }

        this.setState({
            ingredient_list: ingrList,
            category_list: catList,
            selected_ingredients: ingrSelect
        });
    }

    handleIngredientCheckReset() {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};
        var ingrCategory = '';

        this.state.selected_ingredients.map((obj, index) => (
            ingrList[obj].checked = false,
            ingrCategory = ingrList[obj].category_name,
            catList[ingrCategory].ingredients[obj].checked = false
        ));
        
        this.setState({
            ingredient_list: ingrList,
            category_list: catList,
            selected_ingredients: []
        });
    }

    handleIngredientDelete(obj) {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};
        let ingrSelect = [...this.state.selected_ingredients];

        ingrList[obj].checked = false;

        let ingrCategory = ingrList[obj].category_name;
        catList[ingrCategory].ingredients[obj].checked = false;

        ingrSelect = ingrSelect.filter(x => x !== obj);

        this.setState({
            ingredient_list: ingrList,
            category_list: catList,
            selected_ingredients: ingrSelect,
        });
    }

    handleCategorySelect(obj) {
        this.setState({
            selected_category: obj
        });
    }

    handleMealtypeSelect(obj) {
        this.setState({
            selected_mealtype: obj
        });
    }

    handleShowAllIngredients() {
        this.setState({
            selected_category: '',
            isShowAllIngredients: true
        });
    }

    handleBackToCategorySelect() {
        this.setState({
            selected_category: '',
            isShowAllIngredients: false
        })
    }

    setApiRecipeNameValue(event) {
        this.setState({
            api_recipe_name: event.target.value
        });
    }

    getRecipe = () => {
        // all recipes are fetched here
        const API_KEY= 'c972685406f94d8cac65c8c6c48febeb';
        const URL = 'https://api.spoonacular.com/recipes/search?apiKey=' + API_KEY + '&number=10&query=' + this.state.api_recipe_name;

        axios.get(URL)
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
                        <span style={{color: "#FFA500"}}>m</span>eal<span style={{color: "#FFA500"}}>m</span>atch
                    </Typography>
                    <Button color="inherit" >{this.state.username}</Button>
                    <Button color="inherit" href={'/' + this.state.username + '/contribute'}>Contribute</Button>
                    <Button color="inherit" href='/about'>About</Button>
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
                    <ListItem button onClick={this.updateCardState.bind(this, text)} key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? 
                                <InboxIcon /> 
                            : 
                                <MailIcon />
                            }
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
                                    onClick={this.handleIngredientCheckReset}
                                    className={classes.showIngrBtn}>
                                        Clear
                                </Button>
                            </Grid>
                            <Grid item xs={8}>
                                {this.state.selected_ingredients.length === 1 ?
                                    <Typography>1 ingredient selected.</Typography>
                                :
                                    <Typography>{this.state.selected_ingredients.length} ingredients selected.</Typography>
                                }
                            </Grid>
                        {this.state.selected_ingredients.map((obj, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={3}>
                                    <IconButton
                                        name={obj} value={index}
                                        aria-label="delete" color="secondary"
                                        onClick={this.handleIngredientDelete.bind(this, obj)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={9}>
                                    {obj}
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
                    {this.state.isShowCategory ? (
                        <Card variant="outlined">
                            <CardContent>
                                <div>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item xs={8}>
                                            {this.state.selected_category === '' ?
                                                this.state.isShowAllIngredients ?
                                                    <Typography style={{fontSize:15}} color="textSecondary" gutterBottom>
                                                        <b>Complete list of ingredients</b>
                                                    </Typography>
                                                :
                                                    <Typography style={{fontSize:15}} color="textSecondary" gutterBottom>
                                                        <b>Select an ingredient category</b>
                                                    </Typography>
                                            :
                                                <Typography style={{fontSize:15}} color="textSecondary" gutterBottom>
                                                    <b>List of ingredients for category "<em>{this.state.selected_category}</em>"</b>
                                                </Typography>
                                            }
                                        </Grid>
                                        {this.state.isShowAllIngredients ?
                                            <Grid item xs={4}>
                                                <Button className={classes.backCatBtn} onClick={this.handleBackToCategorySelect}>
                                                    Back
                                                </Button>
                                            </Grid>
                                        :
                                            this.state.selected_category === '' ?
                                                <Grid item xs={4}>
                                                    <Button className={classes.showIngrBtn} onClick={this.handleShowAllIngredients}>
                                                        View All Ingredients
                                                    </Button>
                                                </Grid>
                                            :
                                                <>
                                                <Grid item xs={1}>
                                                    <Button className={classes.backCatBtn} onClick={this.handleBackToCategorySelect}>
                                                        Back
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Button className={classes.showIngrBtn} onClick={this.handleShowAllIngredients}>
                                                        View All Ingredients
                                                    </Button>
                                                </Grid>
                                                </>
                                        }
                                    </Grid>
                                </div>
                                <Divider className={classes.dividerStyle}/>
                                <div className={classes.ingrView}>
                                    <Grid container spacing={0}>
                                        {this.state.isShowAllIngredients ? 
                                            <>
                                            {Object.entries(this.state.ingredient_list).map(([key, value]) => (
                                                <Grid item key={key} xs={3}>
                                                    <FormControlLabel key={key} control={<Checkbox checked={value.checked}
                                                        onChange={this.handleIngredientCheckChange} name={key} value={key} color="primary" />}
                                                        label={key}
                                                    />
                                                </Grid>
                                            ))}
                                            </>
                                        : 
                                            this.state.selected_category === '' ?
                                                <>
                                                {Object.entries(this.state.category_list).map(([key, value]) => (
                                                    <Grid item key={key} xs={4}>
                                                        <Button value={key} onClick={this.handleCategorySelect.bind(this, key)}>
                                                            <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./milk.png")}/>
                                                            {key}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                                <Grid item xs={4}></Grid>
                                                </>
                                            :
                                                <>
                                                {Object.entries(this.state.category_list[this.state.selected_category].ingredients).map(([key, value]) => (
                                                    <Grid item xs={3} key={key}>
                                                        <FormControlLabel key={key} control={<Checkbox checked={value.checked}
                                                            onChange={this.handleIngredientCheckChange} name={key} value={key} color="primary" />}
                                                            label={key}
                                                        />
                                                    </Grid>
                                                ))}
                                                </>
                                        }
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card variant="outlined">
                            <CardContent>
                                <div>
                                    <Typography style={{fontSize:15}} color="textSecondary" gutterBottom>
                                        <b>Select a meal type</b>
                                    </Typography>          
                                </div>
                                <Divider className={classes.dividerStyle}/>
                                <div className={classes.ingrView}>
                                    <Grid container spacing={0}>
                                        {Object.entries(this.state.mealtype_list).map(([key, value]) => (
                                            <Grid item key={key} xs={4}>
                                                {this.state.selected_mealtype === '' ?
                                                    <Button value={key} onClick={this.handleMealtypeSelect.bind(this, key)}>
                                                        <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./breakfast.png")}/>
                                                        {key}
                                                    </Button>
                                                :
                                                    <Button disabled value={key} onClick={this.handleMealtypeSelect.bind(this, key)}>
                                                        <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./breakfast.png")}/>
                                                        {key}
                                                    </Button>
                                                }
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    )}
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
                            onChange={this.setApiRecipeNameValue}
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

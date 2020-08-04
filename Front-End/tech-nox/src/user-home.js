import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from "@material-ui/core/Typography";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { deepOrange, green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'fontsource-roboto';
import axios from 'axios';
import auth from './auth';
import RecipeReviewCard from './recipeCards';
import IngredientCard from './ingredicard';

const drawerWidth = 240;
const topAppBarWidth = 64;

const useStyles = theme => ({
    root: {
        display: "flex",
        fontFamily: 'Roboto'
    },
    root1: {
        maxWidth: 345
    },
    appBar: {
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
            width: '40ch',
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
    searchSelect: {
        paddingLeft:5,
        fontSize:13,
        height:'100%',
        float:'right',
        color:'black',
        backgroundColor:'orange',
    },
    cardsContaioner:{
        height: '100%',
        marginTop: theme.spacing(2),
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '3px',
        padding: theme.spacing(2),
        overflow: 'auto'
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
        padding: theme.spacing(1),
        height: '40%'
    },
    selectedMtDiv: {
        overflow: 'auto',
        padding: theme.spacing(1),
        height: '16%'
    },
    dividerStyle: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    dividerStyle1: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    backCatBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        marginRight: theme.spacing(1),
        float: 'right'
    },
    showIngrBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        float: 'right'
    },
    ingrView: {
        height:'36vh',
        overflow:'auto'
    },
    green: {
        color: 'white',
        backgroundColor: green[500],
    },
    orange: {
        color: 'white',
        backgroundColor: deepOrange[500],
    },
    catMtBtn: {
        textTransform: 'capitalize',
        justifyContent: 'flex-start'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    titleSize:{
        fontSize:"1rem",
        fontWeight:"bold",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width:"14rem",
        textOverflow:"ellipsis",
        textTransform:"capitalize"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

class UserHomePage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: auth.getUserDetails(),
            ingredient_count: 0,
            category_count: 0,
            mealtype_count: 0,
            ingredient_list: {},
            category_list: {},
            mealtype_list: {},
            searched_ingredient: '',
            ingredient_search_results: {},
            ingredient_search_count: 0,
            selected_ingredients: [],
            selected_ingredients_exclude: [],
            selected_category: '',
            selected_mealtype: '',
            selected_mealtypes: [],
            suggested_ingredients: {},
            api_recipe_name: '',
            contributed_recipe_list: [],
            api_recipe_list: [],
            base_uri: 'https://spoonacular.com/recipeImages/',
            isShowCategory: true,
            isShowAllIngredients: false,
            anchorEl: null,
            isIngrInc: true,
            isShowIngrSearch: false,
            isShowIngrSuggest: false,
            searchParam: 'recipes',
            recipeFilter: 'noFilter'
        };

        this.handleIngredientCheckChange = this.handleIngredientCheckChange.bind(this);
        this.handleIngredientCheckReset = this.handleIngredientCheckReset.bind(this);
        this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleMealtypeSelect = this.handleMealtypeSelect.bind(this);
        this.handleMealtypeDelete = this.handleMealtypeDelete.bind(this);
        this.updateCardState = this.updateCardState.bind(this);
        this.handleShowAllIngredients = this.handleShowAllIngredients.bind(this);
        this.handleBackToCategorySelect = this.handleBackToCategorySelect.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleIngredientInclusion = this.handleIngredientInclusion.bind(this);
        this.handleIngredientExclusion = this.handleIngredientExclusion.bind(this);
        this.handleSearchParamChange = this.handleSearchParamChange.bind(this);
        this.getSearchResults = this.getSearchResults.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
        this.handleRecipeFilterChange = this.handleRecipeFilterChange.bind(this);
        this.getSuggestedIngredients = this.getSuggestedIngredients.bind(this);
        this.handlePublicRecipeCardExpand = this.handlePublicRecipeCardExpand.bind(this);
        this.getContributedRecipes = this.getContributedRecipes.bind(this);
        this.getApiRecipes = this.getApiRecipes.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
        this.getSearchResults();
        this.getContributedRecipes('noFilter');
        this.getApiRecipes('noFilter');
    }

    handleIngredientInclusion(event) {
        this.setState({
            isIngrInc: true
        });
    }

    handleIngredientExclusion(event) {
        this.setState({
            isShowIngrSuggest: false,
            isIngrInc: false
        });
    }

    handleMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        })
    };

    updateCardState = (name) => {
        if (name === "Ingredient Category") {
            this.setState({
                isShowCategory: true,
                isShowIngrSearch: false
            });
        } else {
            this.setState({
                isShowCategory: false,
                isShowIngrSearch: false
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
        if (this.state.isIngrInc) {
            let ingrList = {...this.state.ingredient_list};
            let catList = {...this.state.category_list};
            let ingrSearchList = {...this.state.ingredient_search_results};
            let ingrSuggestList = {...this.state.suggested_ingredients};
            let ingrSelect = [...this.state.selected_ingredients];

            ingrList[event.target.value].checked = event.target.checked;
            ingrList[event.target.value].selectIncl = event.target.checked;

            let ingrCategory = ingrList[event.target.value].category_name;
            catList[ingrCategory].ingredients[event.target.value].checked = event.target.checked;
            catList[ingrCategory].ingredients[event.target.value].selectIncl = event.target.checked;

            if (this.state.isShowIngrSearch && ingrSearchList.hasOwnProperty(event.target.value)) {
                ingrSearchList[event.target.value].checked = event.target.checked;
                ingrSearchList[event.target.value].selectIncl = event.target.checked;
            }

            if (this.state.isShowIngrSuggest && ingrSuggestList.hasOwnProperty(event.target.value)) {
                ingrSuggestList[event.target.value].checked = event.target.checked;
                ingrSuggestList[event.target.value].selectIncl = event.target.checked;
            }

            if (event.target.checked) {
                let ingredient_details = ingrList[event.target.value];
                ingredient_details.ingredient_name = event.target.value;
                ingrSelect.push(ingredient_details);

                ingrSelect.sort(function(x, y) {
                    if (x.ingredient_name > y.ingredient_name) {
                        return 1;
                    }
                    if (x.ingredient_name < y.ingredient_name) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                ingrSelect = ingrSelect.filter(x => x.ingredient_name !== event.target.value);
            }

            if (!ingrSelect.length && !this.state.selected_ingredients_exclude.length && this.state.recipeFilter === 'filterByIngredients') {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    suggested_ingredients: ingrSuggestList,
                    selected_ingredients: ingrSelect
                });

                this.getContributedRecipes('noFilter');
                this.getApiRecipes('noFilter');
            } else {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    suggested_ingredients: ingrSuggestList,
                    selected_ingredients: ingrSelect
                });

                if (this.state.recipeFilter === 'filterByIngredients') {
                    this.getContributedRecipes('filterByIngredients');
                    this.getApiRecipes('filterByIngredients');
                }
            }
        } else {
            let ingrList = {...this.state.ingredient_list};
            let catList = {...this.state.category_list};
            let ingrSearchList = {...this.state.ingredient_search_results};
            let ingrSelect = [...this.state.selected_ingredients_exclude];

            ingrList[event.target.value].checked = event.target.checked;
            ingrList[event.target.value].selectExcl = event.target.checked;

            let ingrCategory = ingrList[event.target.value].category_name;
            catList[ingrCategory].ingredients[event.target.value].checked = event.target.checked;
            catList[ingrCategory].ingredients[event.target.value].selectExcl = event.target.checked;

            if (this.state.isShowIngrSearch && ingrSearchList.hasOwnProperty(event.target.value)) {
                ingrSearchList[event.target.value].checked = event.target.checked;
                ingrSearchList[event.target.value].selectExcl = event.target.checked;
            }

            if (event.target.checked) {
                let ingredient_details = ingrList[event.target.value];
                ingredient_details.ingredient_name = event.target.value;
                ingrSelect.push(ingredient_details);

                ingrSelect.sort(function(x, y) {
                    if (x.ingredient_name > y.ingredient_name) {
                        return 1;
                    }
                    if (x.ingredient_name < y.ingredient_name) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                ingrSelect = ingrSelect.filter(x => x.ingredient_name !== event.target.value);
            }

            if (!ingrSelect.length && !this.state.selected_ingredients.length && this.state.recipeFilter === 'filterByIngredients') {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    selected_ingredients_exclude: ingrSelect
                });

                this.getContributedRecipes('noFilter');
                this.getApiRecipes('noFilter');
            } else {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    selected_ingredients_exclude: ingrSelect
                });

                if (this.state.recipeFilter === 'filterByIngredients') {
                    this.getContributedRecipes('filterByIngredients');
                    this.getApiRecipes('filterByIngredients');
                }
            }
        }
    }

    handleIngredientCheckReset() {
        if (this.state.isIngrInc) {
            let ingrList = {...this.state.ingredient_list};
            let catList = {...this.state.category_list};
            let ingrSearchList = {...this.state.ingredient_search_results};
            let ingrSuggestList = {...this.state.suggested_ingredients};

            this.state.selected_ingredients.forEach(ingredient => {
                ingrList[ingredient.ingredient_name].checked = false;
                ingrList[ingredient.ingredient_name].selectIncl = false;

                catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
                catList[ingredient.category_name].ingredients[ingredient.ingredient_name].selectIncl = false;

                if (this.state.isShowIngrSearch && ingrSearchList.hasOwnProperty(ingredient.ingredient_name)) {
                    ingrSearchList[ingredient.ingredient_name].checked = false;
                    ingrSearchList[ingredient.ingredient_name].selectIncl = false;
                }

                if (this.state.isShowIngrSuggest && ingrSuggestList.hasOwnProperty(ingredient.ingredient_name)) {
                    ingrSuggestList[ingredient.ingredient_name].checked = false;
                    ingrSuggestList[ingredient.ingredient_name].selectIncl = false;
                }
            });

            if (!this.state.selected_ingredients_exclude.length && this.state.recipeFilter === 'filterByIngredients') {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    suggested_ingredients: ingrSuggestList,
                    selected_ingredients: []
                });

                this.getContributedRecipes('noFilter');
                this.getApiRecipes('noFilter');
            } else {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    suggested_ingredients: ingrSuggestList,
                    selected_ingredients: []
                });

                if (this.state.recipeFilter === 'filterByIngredients') {
                    this.getContributedRecipes('filterByIngredients');
                    this.getApiRecipes('filterByIngredients');
                }
            }
        } else {
            let ingrList = {...this.state.ingredient_list};
            let catList = {...this.state.category_list};
            let ingrSearchList = {...this.state.ingredient_search_results};

            this.state.selected_ingredients_exclude.forEach(ingredient => {
                ingrList[ingredient.ingredient_name].checked = false;
                ingrList[ingredient.ingredient_name].selectExcl = false;

                catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
                catList[ingredient.category_name].ingredients[ingredient.ingredient_name].selectExcl = false;

                if (this.state.isShowIngrSearch && ingrSearchList.hasOwnProperty(ingredient.ingredient_name)) {
                    ingrSearchList[ingredient.ingredient_name].checked = false;
                    ingrSearchList[ingredient.ingredient_name].selectExcl = false;
                }
            });

            if (!this.state.selected_ingredients.length && this.state.recipeFilter === 'filterByIngredients') {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    selected_ingredients_exclude: []
                });

                this.getContributedRecipes('noFilter');
                this.getApiRecipes('noFilter');
            } else {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    selected_ingredients_exclude: []
                });

                if (this.state.recipeFilter === 'filterByIngredients') {
                    this.getContributedRecipes('filterByIngredients');
                    this.getApiRecipes('filterByIngredients');
                }
            }
        }
    }

    handleIngredientDelete(obj) {
        if (this.state.isIngrInc) {
            let ingrList = {...this.state.ingredient_list};
            let catList = {...this.state.category_list};
            let ingrSearchList = {...this.state.ingredient_search_results};
            let ingrSuggestList = {...this.state.suggested_ingredients};
            let ingrSelect = [...this.state.selected_ingredients];

            ingrList[obj].checked = false;
            ingrList[obj].selectIncl = false;

            if (this.state.isShowIngrSearch && ingrSearchList.hasOwnProperty(obj)) {
                ingrSearchList[obj].checked = false;
                ingrSearchList[obj].selectIncl = false;
            }

            if (this.state.isShowIngrSuggest && ingrSuggestList.hasOwnProperty(obj)) {
                ingrSuggestList[obj].checked = false;
                ingrSuggestList[obj].selectIncl = false;
            }

            let ingrCategory = ingrList[obj].category_name;
            catList[ingrCategory].ingredients[obj].checked = false;
            catList[ingrCategory].ingredients[obj].selectIncl = false;

            ingrSelect = ingrSelect.filter(x => x.ingredient_name !== obj);

            if (!ingrSelect.length && !this.state.selected_ingredients_exclude.length && this.state.recipeFilter === 'filterByIngredients') {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    suggested_ingredients: ingrSuggestList,
                    selected_ingredients: ingrSelect
                });

                this.getContributedRecipes('noFilter');
                this.getApiRecipes('noFilter');
            } else {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    suggested_ingredients: ingrSuggestList,
                    selected_ingredients: ingrSelect,
                });

                if (this.state.recipeFilter === 'filterByIngredients') {
                    this.getContributedRecipes('filterByIngredients');
                    this.getApiRecipes('filterByIngredients');
                }
            }
        } else {
            let ingrList = {...this.state.ingredient_list};
            let catList = {...this.state.category_list};
            let ingrSearchList = {...this.state.ingredient_search_results};
            let ingrSelect = [...this.state.selected_ingredients_exclude];

            ingrList[obj].checked = false;
            ingrList[obj].selectExcl = false;

            if (this.state.isShowIngrSearch && ingrSearchList.hasOwnProperty(obj)) {
                ingrSearchList[obj].checked = false;
                ingrSearchList[obj].selectExcl = false;
            }

            let ingrCategory = ingrList[obj].category_name;
            catList[ingrCategory].ingredients[obj].checked = false;
            catList[ingrCategory].ingredients[obj].selectExcl = false;

            ingrSelect = ingrSelect.filter(x => x.ingredient_name !== obj);

            if (!ingrSelect.length && !this.state.selected_ingredients.length && this.state.recipeFilter === 'filterByIngredients') {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    selected_ingredients_exclude: ingrSelect
                });

                this.getContributedRecipes('noFilter');
                this.getApiRecipes('noFilter');
            } else {
                this.setState({
                    ingredient_list: ingrList,
                    category_list: catList,
                    ingredient_search_results: ingrSearchList,
                    selected_ingredients_exclude: ingrSelect,
                });

                if (this.state.recipeFilter === 'filterByIngredients') {
                    this.getContributedRecipes('filterByIngredients');
                    this.getApiRecipes('filterByIngredients');
                }
            }
        }
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

    handleMealtypeDelete() {
        if (this.state.recipeFilter === 'filterByMealtype') {
            this.setState({
                selected_mealtype: ''
            });

            this.getContributedRecipes('noFilter');
            this.getApiRecipes('noFilter');
        } else {
            this.setState({
                selected_mealtype: ''
            });
        }
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
            isShowAllIngredients: false,
            isShowIngrSearch: false,
            isShowIngrSuggest: false,
            ingredient_search_results: {}
        })
    }

    async getContributedRecipes(filterVal) {
        let response = await axios.get('/recipe');
        
        if (filterVal === 'noFilter') {
            this.setState({
                contributed_recipe_list: response.data.recipes
            });
        } else if (filterVal === 'filterByMealtype') {
            let rcpFilter = response.data.recipes.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));

            this.setState({
                contributed_recipe_list: rcpFilter
            })
        } else if (filterVal === 'filterByIngredients') {
            let rcpFilter = [];
            response.data.recipes.forEach(recipe =>  {
                if (!this.state.selected_ingredients_exclude.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length) {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                }
            });

            this.setState({
                contributed_recipe_list: rcpFilter
            })
        }
    }

    async getApiRecipes(filterVal) {
        if (filterVal === 'noFilter') {
            // fetch all recipes
            const API_KEY= 'ace01650e38a4d5a847be07d17274eec';
            const URL = 'https://api.spoonacular.com/recipes/search?apiKey=' + API_KEY + '&number=10';

            // await axios.get(URL)
            //     .then(response => {
            //         this.setState({
            //             api_recipe_list: response.data.results,
            //             recipeFilter: filterVal
            //         });
            //     })
            //     .catch(error => {
            //         this.setState({
            //             api_recipe_list: [],
            //             recipeFilter: filterVal
            //         });
            //     });

            // comment code below when uncommenting above
            this.setState({
                api_recipe_list: [],
                recipeFilter: filterVal
            });
        } else if (filterVal === 'filterByMealtype') {
            // fetch recipes by meal type
            const API_KEY= 'ace01650e38a4d5a847be07d17274eec';
            const URL = 'https://api.spoonacular.com/recipes/search?apiKey=' + API_KEY + '&number=10&type=' + this.state.selected_mealtype;
            await axios.get(URL)
                .then(response => {
                    this.setState({
                        api_recipe_list: response.data.results,
                        recipeFilter: filterVal
                    });
                })
                .catch(error => {
                     this.setState({
                         api_recipe_list: [],
                         recipeFilter: filterVal
                     });
                 });

            


            /*this.setState({
                api_recipe_list: [],
                recipeFilter: filterVal
            });*/
        } else if (filterVal === 'filterByIngredients') {
            // fetch recipes by ingredients
            const API_KEY= 'ace01650e38a4d5a847be07d17274eec';
            let URL = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + API_KEY + '&number=10&ingredients=';
            this.state.selected_ingredients.forEach(ingredient => {
                URL += (ingredient.ingredient_name.replace(" ","") + ",+");
                // URL += (ingredient.ingredient_name.replace(" ","+") + ",+");
            });
            URL = URL.slice(0,-2);

            // await axios.get(URL)
            //     .then(response => {
            //         let rcpFilter = [];
            //         response.data.forEach(recipe =>  {
            //             if (!this.state.selected_ingredients_exclude.filter(ingr => recipe.missedIngredients.some(x => x.name === ingr.ingredient_name)).length) {
            //                 rcpFilter.push(recipe);
            //             }
            //         });
            //         this.setState({
            //             api_recipe_list: response.data,
            //             recipeFilter: filterVal
            //         });
            //     })
            //     .catch(error => {
            //         this.setState({
            //             api_recipe_list: [],
            //             recipeFilter: filterVal
            //         });
            //     });

            // comment code below when uncommenting above
            this.setState({
                api_recipe_list: [],
                recipeFilter: filterVal
            });
        }
    }

    handleSearchParamChange(event) {
        this.setState({
            searchParam: event.target.value,
        });
    }

    setSearchValue(event) {
        if (this.state.searchParam === 'recipes') {
            this.setState({
                api_recipe_name: event.target.value
            });
        } else if (this.state.searchParam === 'ingredients') {
            this.setState({
                searched_ingredient: event.target.value
            });
        }
    }

    handleRecipeFilterChange(event) {
        this.getContributedRecipes(event.target.value);
        this.getApiRecipes(event.target.value);
    }

    async getSearchResults() {
        if (this.state.searchParam === 'recipes') {
            // all recipes are fetched here
            const API_KEY= 'ace01650e38a4d5a847be07d17274eec';
            const URL = 'https://api.spoonacular.com/recipes/search?apiKey=' + API_KEY + '&number=10&query=' + this.state.api_recipe_name;

            // axios.get(URL)
            //     .then(response => {
            //         this.setState({
            //             api_recipe_list: response.data.results,
            //             isShowCategory: true,
            //             isShowIngrSearch: false,
            //             recipeFilter: 'noFilter'
            //         });
            //     })
            //     .catch(error => {
            //         this.setState({
            //             api_recipe_list: [],
            //             isShowCategory: true,
            //             isShowIngrSearch: false,
            //             recipeFilter: 'noFilter'
            //         });
            //     });

            // comment code below when uncommenting above
            this.setState({
                api_recipe_list: [],
                isShowCategory: true,
                isShowIngrSearch: false,
                recipeFilter: 'noFilter'
            });
        } else if (this.state.searchParam === 'ingredients') {
            let response = await axios.post('/ingredient', {
                'ingredient': this.state.searched_ingredient
            });

            let ingrSearchList = response.data.ingredients;

            this.state.selected_ingredients.forEach(ingredient => {
                if (ingrSearchList.hasOwnProperty(ingredient.ingredient_name)) {
                    ingrSearchList[ingredient.ingredient_name].checked = true;
                    ingrSearchList[ingredient.ingredient_name].selectIncl = true;
                }
            });

            this.state.selected_ingredients_exclude.forEach(ingredient => {
                if (ingrSearchList.hasOwnProperty(ingredient.ingredient_name)) {
                    ingrSearchList[ingredient.ingredient_name].checked = true;
                    ingrSearchList[ingredient.ingredient_name].selectExcl = true;
                }
            });

            this.setState({
                ingredient_search_results: ingrSearchList,
                ingredient_search_count: response.data.count,
                isShowCategory: true,
                isShowIngrSearch: true
            });
        }
    }

    async getSuggestedIngredients() {
        let response = await axios.post('/suggested-ingredients', {
                'cart_ingredients': this.state.selected_ingredients
            })
            .then(response => {
                let ingrSuggestList = response.data.ingredients;

                this.state.selected_ingredients.forEach(ingredient => {
                    if (ingrSuggestList.hasOwnProperty(ingredient.ingredient_name)) {
                        ingrSuggestList[ingredient.ingredient_name].checked = true;
                        ingrSuggestList[ingredient.ingredient_name].selectIncl = true;
                    }
                });

                this.state.selected_ingredients_exclude.forEach(ingredient => {
                    if (ingrSuggestList.hasOwnProperty(ingredient.ingredient_name)) {
                        ingrSuggestList[ingredient.ingredient_name].checked = true;
                        ingrSuggestList[ingredient.ingredient_name].selectExcl = true;
                    }
                });

                this.setState({
                    suggested_ingredients: ingrSuggestList,
                    isShowIngrSuggest: true,
                    isShowCategory: true
                });

                console.log(response);
            })
            .catch(error => {
                this.setState({
                    suggested_ingredients: {},
                    isShowIngrSuggest: true,
                    isShowCategory: true
                });
            });
    }

    handlePublicRecipeCardExpand = index => event => {
        let rcpSelected = [...this.state.contributed_recipe_list];
        rcpSelected[index].expanded = !rcpSelected[index].expanded;

        this.setState({
            contributed_recipe_list: rcpSelected
        });
    }

    onClickAbout() {
        this.props.history.push('/about');
    }

    onClickHome() {
        if (!auth.isAuthenticated()) {
            this.props.history.push('/');
        } else {
            this.props.history.push('/' + this.state.username);
        }
    }

    onClickContribute() {
        this.props.history.push('/' + this.state.username + '/contribute');
    }

    onClickLogin() {
        this.props.history.push('/login');
    }

    handleLogout() {
        auth.logout(() => {
            this.props.history.push('/');
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                {!auth.isAuthenticated() ?
                    <Toolbar>
                        <Box display='flex' flexGrow={1}>
                            <Typography variant="h6" noWrap>
                                <span style={{color: "#FFA500"}}>m</span>eal<span style={{color: "#FFA500"}}>m</span>atch
                            </Typography>
                            <Button color="inherit" style={{marginLeft:'5%',marginRight:'15%'}} onClick={this.onClickHome.bind(this)}>Home</Button>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                    {this.state.searchParam === 'recipes' ?
                                        <InputBase
                                            placeholder="Search..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={this.state.api_recipe_name}
                                            onChange={this.setSearchValue}
                                            onBlur={this.setSearchValue}
                                        />
                                    :
                                        <InputBase
                                            placeholder="Search..."
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={this.state.searched_ingredient}
                                            onChange={this.setSearchValue}
                                            onBlur={this.setSearchValue}
                                        />
                                    }
                                    <NativeSelect
                                        value={this.state.searchParam}
                                        onChange={this.handleSearchParamChange}
                                        className={classes.searchSelect}
                                        name="name"
                                        inputProps={{
                                            id: 'name-native-error',
                                        }}
                                    >
                                        <option value="recipes">Recipes</option>
                                        <option value="ingredients">Ingredients</option>
                                    </NativeSelect>
                            </div>
                            <Button className={classes.searchBtn} onClick={this.getSearchResults}>Search</Button>
                        </Box>
                        <Button style={{marginRight:'2%'}} color="inherit" onClick={this.onClickAbout.bind(this)}>About</Button>
                        <Button color="inherit" onClick={this.onClickLogin.bind(this)}>Login</Button>
                    </Toolbar>
                :
                    <Toolbar>
                        <Box display='flex' flexGrow={1}>
                            <Typography variant="h6" noWrap>
                                <span style={{color: "#FFA500"}}>m</span>eal<span style={{color: "#FFA500"}}>m</span>atch
                            </Typography>
                            <Button color="inherit" style={{marginLeft:'5%'}} onClick={this.onClickHome.bind(this)}>Home</Button>
                            <Button color="inherit" style={{marginLeft:'1%',marginRight:'4%'}} onClick={this.onClickContribute.bind(this)}>Contribute</Button>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                {this.state.searchParam === 'recipes' ?
                                    <InputBase
                                        placeholder="Search..."
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={this.state.api_recipe_name}
                                        onChange={this.setSearchValue}
                                        onBlur={this.setSearchValue}
                                    />
                                :
                                    <InputBase
                                        placeholder="Search..."
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={this.state.searched_ingredient}
                                        onChange={this.setSearchValue}
                                        onBlur={this.setSearchValue}
                                    />
                                }
                                <NativeSelect
                                    value={this.state.searchParam}
                                    onChange={this.handleSearchParamChange}
                                    className={classes.searchSelect}
                                    name="name"
                                    inputProps={{
                                        id: 'name-native-error',
                                    }}
                                >
                                    <option value="recipes">Recipes</option>
                                    <option value="ingredients">Ingredients</option>
                                </NativeSelect>
                            </div>
                            <Button className={classes.searchBtn} onClick={this.getSearchResults}>Search</Button>
                        </Box>
                        <Button style={{marginRight:'2%'}} color="inherit" onClick={this.onClickAbout.bind(this)}>About</Button>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleMenuClose}
                            >
                                <MenuItem style={{fontSize:14}}><b>{this.state.username}</b></MenuItem>
                                <Divider/>
                                <MenuItem style={{fontSize:14}} onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                }
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
                    <ListItem button onClick={this.updateCardState.bind(this, "Ingredient Category")}>
                        <ListItemAvatar>
                            <Avatar className={classes.green} variant="rounded"><b>C</b></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<b>Ingredient Category</b>} />
                    </ListItem>
                    <ListItem button onClick={this.updateCardState.bind(this, "Meal Type")}>
                        <ListItemAvatar>
                            <Avatar className={classes.orange} variant="rounded"><b>M</b></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<b>Meal Type</b>} />
                    </ListItem>
                </List>
                <Divider />
                <div className={classes.selectedMtDiv}>
                    {this.state.selected_mealtype === '' ?
                        <Typography>You have not selected a meal type.</Typography>
                    :
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography>1 meal type selected.</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton
                                    value={this.state.selected_mealtype}
                                    aria-label="delete" color="secondary"
                                    onClick={this.handleMealtypeDelete}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={9}>
                                {this.state.selected_mealtype}
                            </Grid>
                        </Grid>
                    }
                </div>
                <Divider />
                <Grid container spacing={0} direction="row" alignItems="center" justify="center">
                    <Grid item xs={6}>
                        {this.state.isIngrInc ?
                            <Button
                                onClick={this.handleIngredientInclusion}
                                style={{color:"black",backgroundColor:"white",fontSize:10,borderRadius:'0px'}}
                                fullWidth
                            >
                                    INGREDIENTS TO INCLUDE
                            </Button>   
                        :
                            <Button
                                onClick={this.handleIngredientInclusion}
                                style={{color:"white",fontSize:10,borderRadius:'0px',backgroundColor:"#FF7600"}}
                                fullWidth
                                variant="contained"
                            >
                                    INGREDIENTS TO INCLUDE
                            </Button>
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {this.state.isIngrInc ?
                            <Button
                                onClick={this.handleIngredientExclusion}
                                style={{color:"white",fontSize:10,borderRadius:'0px',backgroundColor:"#FF7600"}}
                                fullWidth
                                variant="contained"

                            >
                                    INGREDIENTS TO EXCLUDE
                            </Button>
                        :
                            <Button
                                onClick={this.handleIngredientExclusion}
                                style={{color:"black", fontSize:10,borderRadius:'0px',backgroundColor:"white"}}
                                fullWidth
                            >
                                    INGREDIENTS TO EXCLUDE
                            </Button>
                        }
                    </Grid>
                </Grid>
                {this.state.isIngrInc ?
                    <div className={classes.selectedIngrDiv}>
                        {!this.state.selected_ingredients.length ?
                        (
                            <Typography>You have not selected any ingredients for inclusion.</Typography>
                        ) : (
                        <>
                            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                <Grid item xs={4}>
                                    <Button
                                        onClick={this.handleIngredientCheckReset}
                                        className={classes.searchBtn}>
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
                                            name={obj.ingredient_name} value={index}
                                            aria-label="delete" color="secondary"
                                            onClick={this.handleIngredientDelete.bind(this, obj.ingredient_name)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Tooltip arrow placement="bottom-start" title={"Category: " + obj.category_name}>
                                            <Typography style={{fontSize:14}}>{obj.ingredient_name}</Typography>
                                        </Tooltip>
                                    </Grid>
                                </React.Fragment>
                            ))}
                            </Grid>
                        </>
                        )}
                    </div>
                :
                    <div className={classes.selectedIngrDiv}>
                        {!this.state.selected_ingredients_exclude.length ?
                        (
                            <Typography>You have not selected any ingredients for exclusion.</Typography>
                        ) : (
                        <>
                            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                <Grid item xs={4}>
                                    <Button
                                        onClick={this.handleIngredientCheckReset}
                                        className={classes.searchBtn}>
                                            Clear
                                    </Button>
                                </Grid>
                                <Grid item xs={8}>
                                    {this.state.selected_ingredients_exclude.length === 1 ?
                                        <Typography>1 ingredient selected.</Typography>
                                    :
                                        <Typography>{this.state.selected_ingredients_exclude.length} ingredients selected.</Typography>
                                    }
                                </Grid>
                            {this.state.selected_ingredients_exclude.map((obj, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={3}>
                                        <IconButton
                                            name={obj.ingredient_name} value={index}
                                            aria-label="delete" color="secondary"
                                            onClick={this.handleIngredientDelete.bind(this, obj.ingredient_name)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Tooltip arrow placement="bottom-start" title={"Category: " + obj.category_name}>
                                            <Typography style={{fontSize:14}}>{obj.ingredient_name}</Typography>
                                        </Tooltip>
                                    </Grid>
                                </React.Fragment>
                            ))}
                            </Grid>
                        </>
                        )}
                    </div>
                }
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    {this.state.isShowCategory ? (
                        <Card variant="outlined">
                            <CardContent>
                                <div>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Grid item xs={6}>
                                            {this.state.isShowIngrSuggest ?
                                                <Typography style={{fontSize:15}} color="textSecondary" gutterBottom>
                                                    <b>Ingredients suggested based on your selections</b>
                                                </Typography>
                                            :
                                                this.state.isShowIngrSearch ?
                                                    <Typography style={{fontSize:15}} color="textSecondary" gutterBottom>
                                                        <b>Ingredient search results for "<em>{this.state.searched_ingredient}</em>"</b>
                                                    </Typography>
                                                :
                                                    this.state.selected_category === '' ?
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
                                        {(this.state.isShowAllIngredients || this.state.isShowIngrSearch || this.state.isShowIngrSuggest) ?
                                            <Grid item xs={6}>
                                                <Button className={classes.backCatBtn} onClick={this.handleBackToCategorySelect}>
                                                    Back
                                                </Button>
                                            </Grid>
                                        :
                                            this.state.selected_category === '' ?
                                                <Grid item xs={6}>
                                                    <Button className={classes.showIngrBtn} onClick={this.handleShowAllIngredients}>
                                                        View All Ingredients
                                                    </Button>
                                                    {this.state.isIngrInc &&
                                                        <Button className={classes.backCatBtn} onClick={this.getSuggestedIngredients}>
                                                            Suggest Ingredients
                                                        </Button>
                                                    }
                                                </Grid>
                                            :
                                                <Grid item xs={6}>
                                                    <Button className={classes.showIngrBtn} onClick={this.handleShowAllIngredients}>
                                                        View All Ingredients
                                                    </Button>
                                                    {this.state.isIngrInc &&
                                                        <Button className={classes.backCatBtn} onClick={this.getSuggestedIngredients}>
                                                            Suggest Ingredients
                                                        </Button>
                                                    }
                                                    <Button className={classes.backCatBtn} onClick={this.handleBackToCategorySelect}>
                                                        Back
                                                    </Button>
                                                </Grid>
                                        }
                                    </Grid>
                                </div>
                                <Divider className={classes.dividerStyle}/>
                                <div className={classes.ingrView}>
                                    <Grid container spacing={0}>
                                        {this.state.isShowIngrSuggest ?
                                            !Object.keys(this.state.suggested_ingredients).length ?
                                                <Typography style={{fontSize:14,marginTop:10}}><em><b>No results found.</b></em></Typography>
                                            :
                                                <>
                                                {Object.entries(this.state.suggested_ingredients).map(([key, value]) => (
                                                    <Grid item key={key} xs={3}>
                                                        {value.selectExcl ?
                                                            <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                            <FormControlLabel key={key}
                                                                control={
                                                                    <Checkbox checked={value.checked}
                                                                    onChange={this.handleIngredientCheckChange}
                                                                    name={key} value={key} color="primary"
                                                                    disabled
                                                                />}
                                                                label={key}
                                                            />
                                                            </Tooltip>
                                                        :
                                                            <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                            <FormControlLabel key={key}
                                                                control={
                                                                    <Checkbox checked={value.checked}
                                                                    onChange={this.handleIngredientCheckChange}
                                                                    name={key} value={key} color="primary"
                                                                />}
                                                                label={key}
                                                            />
                                                            </Tooltip>
                                                        }
                                                    </Grid>
                                                ))}
                                                </>
                                        :
                                            this.state.isShowIngrSearch ?
                                                !Object.keys(this.state.ingredient_search_results).length ?
                                                    <Typography style={{fontSize:14,marginTop:10}}><em><b>No results found.</b></em></Typography>
                                                :
                                                    this.state.isIngrInc ?
                                                        <>
                                                        {Object.entries(this.state.ingredient_search_results).map(([key, value]) => (
                                                            <Grid item key={key} xs={3}>
                                                                {value.selectExcl ?
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                            disabled
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                :
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                }
                                                            </Grid>
                                                        ))}
                                                        </>
                                                    :
                                                        <>
                                                        {Object.entries(this.state.ingredient_search_results).map(([key, value]) => (
                                                            <Grid item key={key} xs={3}>
                                                                {value.selectIncl ?
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                            disabled
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                :
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                }
                                                            </Grid>
                                                        ))}
                                                        </>
                                            :
                                                this.state.isShowAllIngredients ?
                                                    this.state.isIngrInc ?
                                                        <>
                                                        {Object.entries(this.state.ingredient_list).map(([key, value]) => (
                                                            <Grid item key={key} xs={3}>
                                                                {value.selectExcl ?
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                            disabled
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                :
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                }
                                                            </Grid>
                                                        ))}
                                                        </>
                                                    :
                                                        <>
                                                        {Object.entries(this.state.ingredient_list).map(([key, value]) => (
                                                            <Grid item key={key} xs={3}>
                                                                {value.selectIncl ?
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                            disabled
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                :
                                                                    <Tooltip arrow placement="right-start" title={"Category: " + value.category_name}>
                                                                    <FormControlLabel key={key}
                                                                        control={
                                                                            <Checkbox checked={value.checked}
                                                                            onChange={this.handleIngredientCheckChange}
                                                                            name={key} value={key} color="primary"
                                                                        />}
                                                                        label={key}
                                                                    />
                                                                    </Tooltip>
                                                                }
                                                            </Grid>
                                                        ))}
                                                        </>
                                                :
                                                    this.state.selected_category === '' ?
                                                        <>
                                                        {Object.entries(this.state.category_list).map(([key, value]) => (
                                                            <Grid item key={key} xs={4}>
                                                                <Button fullWidth className={classes.catMtBtn} value={key} onClick={this.handleCategorySelect.bind(this, key)}>
                                                                    <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./static/categories/" + value.category_id + ".png")}/>
                                                                    {key}
                                                                </Button>
                                                            </Grid>
                                                        ))}
                                                        <Grid item xs={4}></Grid>
                                                        </>
                                                    :
                                                        this.state.isIngrInc ?
                                                            <>
                                                            {Object.entries(this.state.category_list[this.state.selected_category].ingredients).map(([key, value]) => (
                                                                <Grid item xs={3} key={key}>
                                                                    {value.selectExcl ?
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox checked={value.checked}
                                                                                onChange={this.handleIngredientCheckChange}
                                                                                name={key} value={key} color="primary"
                                                                                disabled
                                                                            />}
                                                                            label={key}
                                                                        />
                                                                    :
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox checked={value.checked}
                                                                                onChange={this.handleIngredientCheckChange}
                                                                                name={key} value={key} color="primary"
                                                                            />}
                                                                            label={key}
                                                                        />
                                                                    }
                                                                </Grid>
                                                            ))}
                                                            </>
                                                        :
                                                            <>
                                                            {Object.entries(this.state.category_list[this.state.selected_category].ingredients).map(([key, value]) => (
                                                                <Grid item xs={3} key={key}>
                                                                    {value.selectIncl ?
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox checked={value.checked}
                                                                                onChange={this.handleIngredientCheckChange}
                                                                                name={key} value={key} color="primary"
                                                                                disabled
                                                                            />}
                                                                            label={key}
                                                                        />
                                                                    :
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox checked={value.checked}
                                                                                onChange={this.handleIngredientCheckChange}
                                                                                name={key} value={key} color="primary"
                                                                            />}
                                                                            label={key}
                                                                        />
                                                                    }
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
                                                    <Button fullWidth className={classes.catMtBtn} value={key} onClick={this.handleMealtypeSelect.bind(this, key)}>
                                                        <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./static/mealtypes/" + value.mealtype_id + ".png")}/>
                                                        {key}
                                                    </Button>
                                                :
                                                    <Button fullWidth className={classes.catMtBtn} disabled value={key} onClick={this.handleMealtypeSelect.bind(this, key)}>
                                                        <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./static/mealtypes/" + value.mealtype_id + ".png")}/>
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
                    <div className={classes.cardsContaioner}>
                        <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}><b>RECIPES</b></Typography>
                        <Divider className={classes.dividerStyle1} />
                        <FormControl component="fieldset">
                            <RadioGroup style={{fontSize:12}} aria-label="filter" name="filter" onChange={this.handleRecipeFilterChange}>
                                <FormControlLabel value="noFilter" control={<Radio style={{color: "orange"}}/>} label="Show all recipes" />
                                {(this.state.selected_ingredients.length || this.state.selected_ingredients_exclude.length) ?
                                    <FormControlLabel value="filterByIngredients" control={<Radio style={{color: "orange"}}/>} label="Search by selected ingredients" />
                                :
                                    <FormControlLabel disabled value="filterByIngredients" control={<Radio />} label="Search by selected ingredients" />
                                }
                                {this.state.selected_mealtype !== '' ?
                                    <FormControlLabel value="filterByMealtype" control={<Radio style={{color: "orange"}}/>} label="Search by selected meal type" />
                                :
                                    <FormControlLabel value="filterByMealtype" control={<Radio />} label="Search by selected meal type" />
                                }
                            </RadioGroup>
                        </FormControl>
                        <Divider className={classes.dividerStyle1} />
                        {(!this.state.contributed_recipe_list.length && !this.state.api_recipe_list.length) ?
                            <Typography style={{fontSize:14,marginTop:10}}><em><b>No results found.</b></em></Typography>
                        :
                            <Grid container spacing={1}>
                                {this.state.contributed_recipe_list.map((recipe, index) =>
                                    <Grid item sm={4} key={index}>
                                        <Card className={classes.root1}>
                                            <CardHeader
                                                title=
                                                    {<div
                                                        title={recipe.recipe_name}
                                                        className={classes.titleSize}
                                                    >
                                                        {recipe.recipe_name}
                                                    </div>}
                                            />          
                                            <CardMedia
                                                className={classes.media}
                                                image={require('./static/recipes/' + recipe.recipe_id + '.jpg')}
                                                alt="no image"
                                                title={recipe.recipe_name}
                                            />
                                            <CardContent>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Time to prepare the dish: {recipe.preparation_time}<br/>
                                                    Serves people: {recipe.people_served}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton
                                                    className={clsx(classes.expand, {
                                                        [classes.expandOpen]: recipe.expanded,
                                                    })}
                                                    onClick={this.handlePublicRecipeCardExpand(index)}
                                                    aria-expanded={recipe.expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            </CardActions>
                                            <Collapse in={recipe.expanded} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph style={{fontSize:14}}>
                                                        {recipe.recipe_description}
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <b>Ingredients used</b><br/>
                                                        <Typography  style={{fontSize:14}}>
                                                        {recipe.ingredients.map((ingr, index) =>
                                                            <React.Fragment key={index}>
                                                                {ingr.ingredient_qty}<em> {ingr.ingredient_name}</em><br/>
                                                            </React.Fragment>
                                                        )}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <b>Preparation steps</b><br/>
                                                        <Grid container spacing={0}>
                                                        {recipe.steps.map((step, index) =>
                                                            <React.Fragment key={index}>
                                                                <Grid item xs={1}>
                                                                    <Typography style={{fontSize:14}}>{step.step_no}.</Typography>
                                                                </Grid>
                                                                <Grid item xs={11}>
                                                                    <Typography style={{fontSize:14}}>{step.step_description}</Typography>
                                                                </Grid>
                                                            </React.Fragment>
                                                        )}
                                                        </Grid>
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <b>Meal type</b><br/>
                                                        <Typography  style={{fontSize:14}}>
                                                        {recipe.mealtypes.map((mt, index) =>
                                                            (index === recipe.mealtypes.length - 1) ? (
                                                                <React.Fragment key={index}>
                                                                    {mt.mealtype_name}
                                                                </React.Fragment>
                                                            ) : (
                                                                <React.Fragment key={index}>
                                                                    {mt.mealtype_name},{' '}
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                        </Typography>
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    </Grid>
                                )}
                                {this.state.recipeFilter === 'noFilter' ? 
                                    this.state.api_recipe_list.map((recipe, index) =>
                                        <Grid item sm={4} key={index}>
                                            <RecipeReviewCard
                                                title={recipe.title}
                                                imageUrl={this.state.base_uri + recipe.image}
                                                source={recipe.sourceUrl}
                                                time={recipe.readyInMinutes}
                                                serves={recipe.servings}
                                                recipeid={recipe.id}
                                            />
                                        </Grid>
                                    )
                                :
                                    this.state.recipeFilter === 'filterByIngredients' ?
                                        this.state.api_recipe_list.map((recipe, index) =>
                                            <Grid item sm={4} key={index}>
                                                <IngredientCard
                                                    title={recipe.title}
                                                    imageUrl={recipe.image}
                                                    likes={recipe.likes}
                                                    missed={recipe.missedIngredients}
                                                />
                                            </Grid>
                                        )
                                    :
                                        this.state.api_recipe_list.map((recipe, index) =>
                                            <Grid item sm={4} key={index}>
                                                <RecipeReviewCard
                                                title={recipe.title}
                                                imageUrl={this.state.base_uri + recipe.image}
                                                source={recipe.sourceUrl}
                                                time={recipe.readyInMinutes}
                                                serves={recipe.servings}
                                                recipeid={recipe.id}
                                            />
                                            </Grid>
                                        )
                                }
                            </Grid>
                        }
                    </div>
            </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(UserHomePage);

import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import InputBase from '@material-ui/core/InputBase';
import Switch from '@material-ui/core/Switch';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import { red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { deepOrange, green } from '@material-ui/core/colors';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Avatar from '@material-ui/core/Avatar';

import 'fontsource-roboto';
import axios from 'axios';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    formControl1: {
        marginLeft: theme.spacing(6),
        width: 200,
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
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
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
    searchBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
    },
    clearBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        marginTop: topAppBarWidth,
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    selectedIngrDiv: {
        overflow: 'auto',
        padding: theme.spacing(1),
        height: '50%'
    },
    selectedIngrDiv1: {
        overflow: 'auto',
        padding: theme.spacing(1),
        height: '64%'
    },
    selectedMtDiv: {
        overflow: 'auto',
        padding: theme.spacing(1),
        height: '16%'
    },
    mainContainer: {
        height: '100%',
        marginTop: theme.spacing(2),
        backgroundColor: 'white',
        border: '1px solid grey',
        borderRadius: '3px',
        padding: theme.spacing(2),
        overflow: 'auto'
    },
    addStepBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange'
    },
    addStepBtn1: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        marginTop: theme.spacing(3)
    },
    addStepBtn3: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2)
    },
    backBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        marginBottom: theme.spacing(1),
        float: 'right',
    },
    saveRecipeBtn: {
        marginLeft: theme.spacing(30),
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange'
    },
    addRecipeDetailsDiv: {
        float: 'left',
        width: '70%'
    },
    recipeTextField: {
        marginTop: theme.spacing(5)
    },
    recipeIngredientTextField: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    addRecipeStepsSection: {
        marginTop: theme.spacing(5)
    },
    addRecipeIngredientQtySection: {
        marginTop: theme.spacing(5)
    },
    dividerStyle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    dividerStyle1: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    addRecipeImageDiv: {
        marginTop: theme.spacing(8),
        textAlign: 'center'
    },
    imageUpload: {
        marginBottom: theme.spacing(0),
        width:180,
        height:180,
        display:'inline-block'
    },
    cardsContainer: {
        marginTop:'1rem'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
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
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    ingredientFilter: {
        marginLeft: theme.spacing(6)
    },
    mealtypeFilter: {
        marginLeft: theme.spacing(0)
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
    imgUploadBtn: {
        padding: theme.spacing(1),
        width: 200,
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange'
    }
});

class ContributePage extends React.Component {
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
            user_recipe_list: [],
            searched_ingredient: '',
            selected_ingredients: [],
            selected_ingredients_exclude: [],
            selected_category: '',
            selected_mealtype: '',
            selected_mealtype1: '',
            selected_mealtypes: [],
            selected_recipes: [],
            selected_visibility: 'Public',
            selected_recipe_id: -1,
            recipe_name_input: '',
            recipe_description_input: '',
            recipe_prep_time_input: '',
            recipe_people_served_input: 1,
            recipe_steps_input: [],
            isAddingRecipe: false,
            isUpdatingRecipe: false,
            isCardExpanded: [],
            filterByIngredient: false,
            filterByMealtype: false,
            file: '',
            imagePreviewUrl: '',
            isShowCategory: true,
            isShowAllIngredients: false,
            recipeErrorMessage: '',
            anchorEl: null,
            openRecipeDelete: []
        };

        this.handleIngredientCheckChange = this.handleIngredientCheckChange.bind(this);
        this.handleIngredientCheckReset = this.handleIngredientCheckReset.bind(this);
        this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
        // this.handleIngredientSearch = this.handleIngredientSearch.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleMealtypeSelect = this.handleMealtypeSelect.bind(this);
        this.handleMealtypeDelete = this.handleMealtypeDelete.bind(this);
        this.handleMealTypeReset = this.handleMealTypeReset.bind(this);
        this.handleOnBlurRecipeName = this.handleOnBlurRecipeName.bind(this);
        this.handleOnBlurRecipeDescription = this.handleOnBlurRecipeDescription.bind(this);
        this.handleOnBlurRecipePrepTime = this.handleOnBlurRecipePrepTime.bind(this);
        this.handleOnBlurRecipePeopleServed = this.handleOnBlurRecipePeopleServed.bind(this);
        this.handleOnBlurIngredientQty = this.handleOnBlurIngredientQty.bind(this);
        this.handleOnChangeIngredientQty = this.handleOnChangeIngredientQty.bind(this);
        this.handleOnBlurRecipeSteps = this.handleOnBlurRecipeSteps.bind(this);
        this.handleOnChangeRecipeSteps = this.handleOnChangeRecipeSteps.bind(this);
        this.handleRecipeStepAdd = this.handleRecipeStepAdd.bind(this);
        this.handleRecipeStepDelete = this.handleRecipeStepDelete.bind(this);
        this.handleRecipeStepReset = this.handleRecipeStepReset.bind(this);
        this.handleRecipeStepMoveUp = this.handleRecipeStepMoveUp.bind(this);
        this.handleRecipeStepMoveDown = this.handleRecipeStepMoveDown.bind(this);
        this.handleRecipeImageChange = this.handleRecipeImageChange.bind(this);
        this.handleVisibilitySelect = this.handleVisibilitySelect.bind(this);
        this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
        this.handleContributeFormBack = this.handleContributeFormBack.bind(this);
        this.handleContributeViewAdd = this.handleContributeViewAdd.bind(this);
        this.handleCardExpandClick = this.handleCardExpandClick.bind(this);
        this.handleRecipeUpdate = this.handleRecipeUpdate.bind(this);
        this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
        this.handleVisibilityUpdate = this.handleVisibilityUpdate.bind(this);
        this.handleFilterByIngredient = this.handleFilterByIngredient.bind(this);
        this.handleFilterByMealtype = this.handleFilterByMealtype.bind(this);
        this.updateCardState = this.updateCardState.bind(this);
        this.handleShowAllIngredients = this.handleShowAllIngredients.bind(this);
        this.handleBackToCategorySelect = this.handleBackToCategorySelect.bind(this);
        this.handleSingleMealtypeSelect = this.handleSingleMealtypeSelect.bind(this);
        this.handleSingleMealtypeDelete = this.handleSingleMealtypeDelete.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleDeleteDialogOpen = this.handleDeleteDialogOpen.bind(this);
        this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
        this.getUserRecipes();
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
    
    handleDeleteDialogOpen(index) {
        let opRcpDel = [...this.state.openRecipeDelete];
        opRcpDel[index] = true;

        this.setState({
            openRecipeDelete: opRcpDel
        });
    }

    handleDeleteCancel(index) {
        let opRcpDel = [...this.state.openRecipeDelete];
        opRcpDel[index] = false;

        this.setState({
            openRecipeDelete: opRcpDel
        });
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
                ingredient_list: response.data.ingredients
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    async getCategories() {
        await axios.get('/category')
        .then(response => {
            this.setState({
                category_count: response.data.count,
                category_list: response.data.categories
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    async getMealtypes() {
        await axios.get('/mealtype')
        .then(response => {
            this.setState({
                mealtype_count: response.data.count,
                mealtype_list: response.data.mealtypes
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    async getUserRecipes() {
        const endpoint = '/recipe/' + this.state.username;

        await axios.get(endpoint)
            .then(response => {
                this.setState({
                    user_recipe_list: response.data.recipes,
                    selected_recipes: response.data.recipes,
                    isCardExpanded: new Array(response.data.count).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(response.data.count).fill().map((item, idx) => item = false),
                });
            })
            .catch(error => {
                console.log(error);
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
            let ingredient_details = ingrList[event.target.value];
            ingredient_details.ingredient_name = event.target.value;
            ingredient_details.ingredient_qty = '';
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

        if (!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) {
            if (this.state.filterByMealtype) {
                // filter by mealtype
                let rcpFilter = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    ingredient_list: ingrList,
                    category_list: catList,
                    selected_ingredients: ingrSelect,
                    filterByIngredient: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    ingredient_list: ingrList,
                    category_list: catList,
                    selected_ingredients: ingrSelect,
                    filterByIngredient: false
                });
            }
        } else {
            this.setState({
                ingredient_list: ingrList,
                category_list: catList,
                selected_ingredients: ingrSelect,
                filterByIngredient: false
            });
        }
    }

    handleIngredientCheckReset() {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};

        this.state.selected_ingredients.forEach(ingredient => {
            ingrList[ingredient.ingredient_name].checked = false;
            catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
        });
        
        if (!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) {
            if (this.state.filterByMealtype) {
                // filter by mealtype
                let rcpFilter = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    ingredient_list: ingrList,
                    category_list: catList,
                    selected_ingredients: [],
                    filterByIngredient: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    ingredient_list: ingrList,
                    category_list: catList,
                    selected_ingredients: [],
                    filterByIngredient: false
                });
            }
        } else {
            this.setState({
                ingredient_list: ingrList,
                category_list: catList,
                selected_ingredients: [],
                filterByIngredient: false
            });
        }
    }

    handleIngredientDelete(obj) {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};
        let ingrSelect = [...this.state.selected_ingredients];

        ingrList[obj].checked = false;

        let ingrCategory = ingrList[obj].category_name;
        catList[ingrCategory].ingredients[obj].checked = false;

        ingrSelect = ingrSelect.filter(x => x.ingredient_name !== obj);

        if (!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) {
            if (this.state.filterByMealtype) {
                // filter by mealtype
                let rcpFilter = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    ingredient_list: ingrList,
                    category_list: catList,
                    selected_ingredients: ingrSelect,
                    filterByIngredient: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    ingredient_list: ingrList,
                    category_list: catList,
                    selected_ingredients: ingrSelect,
                    filterByIngredient: false
                });
            }
        } else {
            this.setState({
                ingredient_list: ingrList,
                category_list: catList,
                selected_ingredients: ingrSelect,
                filterByIngredient: false
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
            isShowAllIngredients: false
        })
    }

    handleCategorySelect(obj) {
        this.setState({
            selected_category: obj
        });
    }

    handleSingleMealtypeSelect(obj) {
        if (!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) {
            if (this.state.filterByIngredient) {
                // filter by ingredient
                let rcpFilter = [];
                this.state.user_recipe_list.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    selected_mealtype: obj,
                    filterByMealtype: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    selected_mealtype: obj,
                    filterByMealtype: false
                });
            }
        } else {
            this.setState({
                selected_mealtype: obj,
                filterByMealtype: false
            });
        }
    }

    handleSingleMealtypeDelete() {
        if (!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) {
            if (this.state.filterByIngredient) {
                // filter by ingredient
                let rcpFilter = [];
                this.state.user_recipe_list.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    selected_mealtype: '',
                    filterByMealtype: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    selected_mealtype: '',
                    filterByMealtype: false
                });
            }
        } else {
            this.setState({
                selected_mealtype: '',
                filterByMealtype: false
            });
        }
    }

    handleMealtypeSelect(event) {
        let mtSelect = [...this.state.selected_mealtypes];

        let index = mtSelect.findIndex(x => x === event.target.value);
        if (index === -1) {
            mtSelect.push(event.target.value);
            mtSelect.sort();
        }
        
        this.setState({
            selected_mealtype1: '',
            selected_mealtypes: mtSelect
        });
    }

    handleMealtypeDelete(obj) {
        let mtSelect = [...this.state.selected_mealtypes];
        mtSelect = mtSelect.filter(x => x !== obj);

        this.setState({
            selected_mealtypes: mtSelect
        });
    }

    handleMealTypeReset() {
        this.setState({
            selected_mealtypes: []
        });
    }

    handleVisibilitySelect(event) {
        this.setState({
            selected_visibility: event.target.value
        });
    }

    handleOnBlurRecipeName(event) {
        this.setState({
            recipe_name_input: event.target.value
        });
    }

    handleOnBlurRecipeDescription(event) {
        this.setState({
            recipe_description_input: event.target.value
        });
    }

    handleOnBlurRecipePrepTime(event) {
        this.setState({
            recipe_prep_time_input: event.target.value
        });
    }

    handleOnBlurRecipePeopleServed(event) {
        const parsedVal = Number(event.target.value);

        if (parsedVal) {
            if (parsedVal > 0) {
                this.setState({
                    recipe_people_served_input: parsedVal
                });
            }
        }
    }

    handleOnChangeIngredientQty = obj => event => {
        let ingrSelect = [...this.state.selected_ingredients];

        let index = ingrSelect.findIndex(x => x.ingredient_name === obj.ingredient_name);
        if (index !== -1) {
            ingrSelect[index].ingredient_qty = event.target.value;
        }

        this.setState({
            selected_ingredients: ingrSelect
        });
    }

    handleOnBlurIngredientQty = obj => event => {
        let ingrSelect = [...this.state.selected_ingredients];

        let index = ingrSelect.findIndex(x => x.ingredient_name === obj.ingredient_name);
        if (index !== -1) {
            ingrSelect[index].ingredient_qty = event.target.value;
        }

        this.setState({
            selected_ingredients: ingrSelect
        });
    }

    handleRecipeStepAdd(event) {
        let recipeSteps = [...this.state.recipe_steps_input];
        recipeSteps.push('');

        this.setState({
            recipe_steps_input: recipeSteps
        });
    }

    handleRecipeStepDelete(index) {
        let recipeSteps = [...this.state.recipe_steps_input];
        recipeSteps.splice(index, 1);

        this.setState({
            recipe_steps_input: recipeSteps
        });
    }

    handleRecipeStepReset(event) {
        this.setState({
            recipe_steps_input: []
        });
    }

    handleRecipeStepMoveUp(index) {
        let recipeSteps = [...this.state.recipe_steps_input];

        let temp = recipeSteps[index - 1];
        recipeSteps[index - 1] = recipeSteps[index];
        recipeSteps[index] = temp;

        this.setState({
            recipe_steps_input: recipeSteps
        });
    }

    handleRecipeStepMoveDown(index) {
        let recipeSteps = [...this.state.recipe_steps_input];

        let temp = recipeSteps[index + 1];
        recipeSteps[index + 1] = recipeSteps[index];
        recipeSteps[index] = temp;

        this.setState({
            recipe_steps_input: recipeSteps
        });
    }

    handleOnBlurRecipeSteps = index => event => {
        let recipeSteps = [...this.state.recipe_steps_input];
        recipeSteps[index] = event.target.value;

        this.setState({
            recipe_steps_input: recipeSteps
        });
    }

    handleOnChangeRecipeSteps = index => event => {
        let recipeSteps = [...this.state.recipe_steps_input];
        recipeSteps[index] = event.target.value;

        this.setState({
            recipe_steps_input: recipeSteps
        });
    }

    handleRecipeImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    async handleSaveRecipe() {
        if (this.state.recipe_name_input === '') {
            this.setState({
                recipeErrorMessage: 'Recipe name cannot be empty.'
            });
        } else if (this.state.recipe_description_input === '') {
            this.setState({
                recipeErrorMessage: 'Recipe description cannot be empty.'
            });
        } else if (!this.state.selected_ingredients.length) {
            this.setState({
                recipeErrorMessage: 'Recipe must have atleast one ingredient.'
            });
        } else if (this.state.selected_ingredients.filter(x => x.ingredient_qty === '').length) {
            this.setState({
                recipeErrorMessage: 'Recipe ingredient quantities cannot be empty.'
            });
        } else if (!this.state.recipe_steps_input.length) {
            this.setState({
                recipeErrorMessage: 'Recipe must have atleast one preparation step.'
            });
        } else if (this.state.recipe_steps_input.filter(x => x === '').length) {
            this.setState({
                recipeErrorMessage: 'Recipe preparation steps cannot be empty.'
            });
        } else if (!this.state.selected_mealtypes.length) {
            this.setState({
                recipeErrorMessage: 'Recipe must have atleast one meal type.'
            });
        } else if (this.state.recipe_prep_time_input === '') {
            this.setState({
                recipeErrorMessage: 'Recipe preparation time must be specified.'
            });
        } else if (this.state.imagePreviewUrl === '') {
            this.setState({
                recipeErrorMessage: 'Recipe must have an image.'
            });
        } else {
            const endpoint = '/recipe/' + this.state.username;

            if (this.state.isAddingRecipe) {
                let response = await axios.post(endpoint, {
                    'username': this.state.username,
                    'recipe_name': this.state.recipe_name_input,
                    'recipe_description': this.state.recipe_description_input,
                    'preparation_time': this.state.recipe_prep_time_input,
                    'people_served': this.state.recipe_people_served_input,
                    'visibility': this.state.selected_visibility,
                    'mealtypes': this.state.selected_mealtypes,
                    'ingredients': this.state.selected_ingredients,
                    'steps': this.state.recipe_steps_input,
                });

                // save image
                const data = new FormData();
                data.append('image_file', this.state.file);

                let img_response = await axios.post('/recipe_image/1', 
                    data, 
                    {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    },
                    timeout: 30000,
                });
            } else if (this.state.isUpdatingRecipe) {
                let response = await axios.put(endpoint, {
                    'username': this.state.username,
                    'recipe_id': this.state.selected_recipe_id,
                    'recipe_name': this.state.recipe_name_input,
                    'recipe_description': this.state.recipe_description_input,
                    'preparation_time': this.state.recipe_prep_time_input,
                    'people_served': this.state.recipe_people_served_input,
                    'visibility': this.state.selected_visibility,
                    'mealtypes': this.state.selected_mealtypes,
                    'ingredients': this.state.selected_ingredients,
                    'steps': this.state.recipe_steps_input,
                });

                // update image
                const endpoint1 = '/recipe_image/' + this.state.selected_recipe_id;

                const data = new FormData();
                data.append('image_file', this.state.file);

                let img_response = await axios.put(endpoint1, 
                    data, 
                    {
                        headers: {
                            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    },
                    timeout: 30000,
                });
            }

            this.setState({
                isAddingRecipe: false,
                isUpdatingRecipe: false,
                selected_recipe_id: -1,
                recipe_name_input: '',
                recipe_description_input: '',
                recipe_prep_time_input: '',
                recipe_people_served_input: 1,
                selected_mealtypes: [],
                selected_ingredients: [],
                selected_visibility: 'Public',
                recipe_steps_input: [],
                selected_mealtype: '',
                selected_category: '',
                file: '',
                imagePreviewUrl: ''
            });

            this.getUserRecipes();
            window.scrollTo(0, 0);
        }
    }

    handleContributeFormBack() {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};

        this.state.selected_ingredients.forEach(ingredient => {
            ingrList[ingredient.ingredient_name].checked = false;
            catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
        });

        this.setState({
            isAddingRecipe: false,
            isUpdatingRecipe: false,
            ingredient_list: ingrList,
            category_list: catList,
            selected_recipe_id: -1,
            recipe_name_input: '',
            recipe_description_input: '',
            recipe_prep_time_input: '',
            recipe_people_served_input: 1,
            selected_mealtypes: [],
            selected_visibility: 'Public',
            selected_ingredients: [],
            recipe_steps_input: [],
            selected_mealtype: '',
            selected_category: '',
            isShowAllIngredients: false,
            isShowCategory: true,
            file: '',
            imagePreviewUrl: ''
        });

        window.scrollTo(0, 0);
    }

    handleContributeViewAdd() {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};

        this.state.selected_ingredients.forEach(ingredient => {
            ingrList[ingredient.ingredient_name].checked = false;
            catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
        });

        this.setState({
            isAddingRecipe: true,
            ingredient_list: ingrList,
            category_list: catList,
            selected_recipe_id: -1,
            recipe_name_input: '',
            recipe_description_input: '',
            recipe_prep_time_input: '',
            recipe_people_served_input: 1,
            selected_mealtypes: [],
            selected_visibility: 'Public',
            selected_ingredients: [],
            recipe_steps_input: [],
            selected_mealtype: '',
            selected_category: '',
            isShowCategory: true,
            isShowAllIngredients: false,
            file: '',
            imagePreviewUrl: ''
        });

        window.scrollTo(0, 0);
    }

    handleRecipeUpdate = obj => event => {
        let ingrList = {...this.state.ingredient_list};
        let catList = {...this.state.category_list};
        let temp_mealtypes = [];
        let temp_steps = [];

        this.state.selected_ingredients.forEach(ingredient => {
            ingrList[ingredient.ingredient_name].checked = false;
            catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
        });

        obj.ingredients.forEach(ingredient => {
            ingrList[ingredient.ingredient_name].checked = true;
            catList[ingredient.category_name].ingredients[ingredient.ingredient_name].checked = false;
        });

        obj.mealtypes.forEach(mealtype => {
            temp_mealtypes.push(mealtype.mealtype_name);
        });

        obj.steps.forEach(step => {
            temp_steps.push(step.step_description);
        });

        this.setState({
            isUpdatingRecipe: true,
            selected_recipe_id: obj.recipe_id,
            recipe_name_input: obj.recipe_name,
            recipe_description_input: obj.recipe_description,
            recipe_prep_time_input: obj.preparation_time,
            recipe_people_served_input: obj.people_served,
            selected_visibility: obj.visibility,
            selected_mealtypes: temp_mealtypes,
            selected_ingredients: obj.ingredients,
            recipe_steps_input: temp_steps,
            ingredient_list: ingrList,
            category_list: catList,
            selected_category: '',
            selected_mealtype: '',
            isShowCategory: true,
            isShowAllIngredients: false,
            file: '',
            imagePreviewUrl: ''
        });

        window.scrollTo(0, 0);
    }

    async handleRecipeDelete(obj) {
        const endpoint1 = '/recipe_image/' + obj;
        let response1 = await axios.delete(endpoint1);

        const endpoint = '/recipe/' + this.state.username;
        let response = await axios.delete(endpoint, {
            data: {
                'recipe_id': obj
            }
        });

        this.getUserRecipes();
    }

    async handleVisibilityUpdate(obj) {
        const endpoint = '/recipe/' + this.state.username;
        let temp_mealtypes = [];
        let temp_steps = [];

        obj.mealtypes.forEach(mealtype => {
            temp_mealtypes.push(mealtype.mealtype_name);
        });

        obj.steps.forEach(step => {
            temp_steps.push(step.step_description);
        });

        if (obj.visibility === 'Public') {
            let response = await axios.put(endpoint, {
                'username': this.state.username,
                'recipe_id': obj.recipe_id,
                'recipe_name': obj.recipe_name,
                'recipe_description': obj.recipe_description,
                'preparation_time': obj.preparation_time,
                'people_served': obj.people_served,
                'visibility': 'Private',
                'mealtypes': temp_mealtypes,
                'ingredients': obj.ingredients,
                'steps': temp_steps,
            });
        } else {
            let response = await axios.put(endpoint, {
                'username': this.state.username,
                'recipe_id': obj.recipe_id,
                'recipe_name': obj.recipe_name,
                'recipe_description': obj.recipe_description,
                'preparation_time': obj.preparation_time,
                'people_served': obj.people_served,
                'visibility': 'Public',
                'mealtypes': temp_mealtypes,
                'ingredients': obj.ingredients,
                'steps': temp_steps,
            });
        }

        this.getUserRecipes();
    }

    handleCardExpandClick = index => event => {
        let cdExpand = [...this.state.isCardExpanded];
        cdExpand[index] = !cdExpand[index];

        this.setState({
            isCardExpanded: cdExpand
        });
    }

    handleFilterByIngredient() {
        if (this.state.filterByIngredient) {
            if (this.state.filterByMealtype) {
                // filter by mealtype
                let rcpFilter = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByIngredient: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    filterByIngredient: false
                });
            }
        } else {
            if (this.state.filterByMealtype) {
                // filter by mealtype and ingredient
                let rcpFilter1 = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                let rcpFilter = [];
                rcpFilter1.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });

                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByIngredient: true
                });
            } else {
                // filter by ingredient
                let rcpFilter = [];
                this.state.user_recipe_list.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });

                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByIngredient: true
                });
            }
        }
    }

    handleFilterByMealtype() {
        if (this.state.filterByMealtype) {
            if (this.state.filterByIngredient) {
                // filter by ingredient
                let rcpFilter = [];
                this.state.user_recipe_list.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });

                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByMealtype: false
                });
            } else {
                // no filter
                this.setState({
                    selected_recipes: this.state.user_recipe_list,
                    isCardExpanded: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(this.state.user_recipe_list.length).fill().map((item, idx) => item = false),
                    filterByMealtype: false
                });
            }
        } else {
            if (this.state.filterByIngredient) {
                // filter by ingredient and mealtype
                let rcpFilter1 = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                let rcpFilter = [];
                rcpFilter1.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });
    
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByMealtype: true
                });
            } else {
                // filter by mealtype
                let rcpFilter = this.state.user_recipe_list.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                
                this.setState({
                    selected_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    openRecipeDelete: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByMealtype: true
                });
            }
        }
    }

    handleLogout(nav) {
        window.location.href = nav;
    }

    render() {
        const { classes } = this.props;
        
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        if (this.state.isAddingRecipe) {
            if (imagePreviewUrl) {
                $imagePreview = (<img
                    src={imagePreviewUrl}
                    className={classes.imageUpload}
                />);
            } else {
                $imagePreview = (<img
                    src={require('./static/images/plate.png')}
                    alt="not available"
                    className={classes.imageUpload}
                />)
            };
        } else if (this.state.isUpdatingRecipe) {
            if (imagePreviewUrl) {
                $imagePreview = (<img
                    src={imagePreviewUrl}
                    className={classes.imageUpload}
                />);
            } else {
                $imagePreview = (<img
                    src={require('./static/images/plate.png' + this.state.selected_recipe_id + '.jpg')}
                    alt="not available"
                    className={classes.imageUpload}
                />)
            };
        }

        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Box display='flex' flexGrow={1}>
                        <Typography variant="h6" noWrap>
                            <span style={{color: "#FFA500"}}>m</span>eal<span style={{color: "#FFA500"}}>m</span>atch
                        </Typography>
                        <Button color="inherit" style={{marginLeft:'5%'}} href={'/' + this.state.username}>Home</Button>
                        <Button color="inherit" style={{marginLeft:'1%'}} href={'/' + this.state.username + '/contribute'}>Contribute</Button>
                    </Box>
                    <Button style={{marginRight:'2%'}} color="inherit" href={'/' + this.state.username + '/about'}>About</Button>
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
                            <MenuItem style={{fontSize:14}} onClick={() => {this.handleLogout("/")}}>Logout</MenuItem>
                        </Menu>
                    </div>
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
                    <ListItem button onClick={this.updateCardState.bind(this, "Ingredient Category")}>
                        <ListItemAvatar>
                            <Avatar className={classes.green} variant="rounded"><b>C</b></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={<b>Ingredient Category</b>} />
                    </ListItem>
                    {(this.state.isAddingRecipe || this.state.isUpdatingRecipe) ?
                        <ListItem button disabled onClick={this.updateCardState.bind(this, "Meal Type")}>
                            <ListItemAvatar>
                                <Avatar className={classes.orange} variant="rounded"><b>M</b></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<b>Meal Type</b>} />
                        </ListItem>
                    :
                        <ListItem button onClick={this.updateCardState.bind(this, "Meal Type")}>
                            <ListItemAvatar>
                                <Avatar className={classes.orange} variant="rounded"><b>M</b></Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<b>Meal Type</b>} />
                        </ListItem>
                    }
                </List>
                {(!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) &&
                    <>
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
                                        onClick={this.handleSingleMealtypeDelete}
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
                    </>
                }
                <Divider />
                {(!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) ?
                    <div className={classes.selectedIngrDiv1}>
                    {!this.state.selected_ingredients.length ?
                    (
                        <Typography>You have not selected any ingredients.</Typography>
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
                        {!this.state.selected_ingredients.length ?
                    (
                        <Typography>You have not selected any ingredients.</Typography>
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
                }
                
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {(this.state.isAddingRecipe || this.state.isUpdatingRecipe) &&
                    <Typography style={{marginLeft:10,marginBottom:8}}><b>STEP 1: INGREDIENT SELECTION</b></Typography>
                }
                {this.state.isShowCategory ? (
                        <Card variant="outlined">
                            <CardContent>
                                <div>static
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
                                                <Grid item xs={4}>
                                                    <Button className={classes.showIngrBtn} onClick={this.handleShowAllIngredients}>
                                                        View All Ingredients
                                                    </Button>
                                                    <Button className={classes.backCatBtn} onClick={this.handleBackToCategorySelect}>
                                                        Back
                                                    </Button>
                                                </Grid>
                                        }
                                    </Grid>
                                </div>
                                <Divider className={classes.dividerStyle1}/>
                                <div className={classes.ingrView}>
                                    <Grid container spacing={0}>
                                        {this.state.isShowAllIngredients ? 
                                            <>
                                            {Object.entries(this.state.ingredient_list).map(([key, value]) => (
                                                <Grid item key={key} xs={3}>
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
                                                </Grid>
                                            ))}
                                            </>
                                        :
                                            this.state.selected_category === '' ?
                                                <>
                                                {Object.entries(this.state.category_list).map(([key, value]) => (
                                                    <Grid item key={key} xs={4}>
                                                        <Button fullWidth className={classes.catMtBtn} value={key} onClick={this.handleCategorySelect.bind(this, key)}>
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
                                                        <FormControlLabel key={key} 
                                                            control={
                                                                <Checkbox checked={value.checked}
                                                                onChange={this.handleIngredientCheckChange} 
                                                                name={key} value={key} color="primary" 
                                                            />}
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
                                <Divider className={classes.dividerStyle1}/>
                                <div className={classes.ingrView}>
                                    <Grid container spacing={0}>
                                        {Object.entries(this.state.mealtype_list).map(([key, value]) => (
                                            <Grid item key={key} xs={4}>
                                                {(this.state.selected_mealtype !== '' || this.state.isAddingRecipe || this.state.isUpdatingRecipe) ?
                                                    <Button fullWidth disabled className={classes.catMtBtn} value={key} onClick={this.handleSingleMealtypeSelect.bind(this, key)}>
                                                        <Avatar style={{marginRight:10}} alt="Remy Sharp" src={require("./breakfast.png")}/>
                                                        {key}
                                                    </Button>
                                                :
                                                    <Button fullWidth className={classes.catMtBtn} value={key} onClick={this.handleSingleMealtypeSelect.bind(this, key)}>
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
                    {(!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) ? (
                        <>
                        <Container className={classes.mainContainer}>
                        <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                            <Grid item xs={8}>
                            {!this.state.user_recipe_list.length ? (
                                <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}>You have not contributed any recipes yet.</Typography>
                            ) : (
                                this.state.user_recipe_list.length === 1 ?
                                    <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}>You have contributed <b>1</b> recipe.</Typography>
                                :
                                    <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}>You have contributed <b>{this.state.user_recipe_list.length}</b> recipes.</Typography>
                            )}
                            </Grid>
                            <Grid item xs={4}>
                            <Button
                                onClick={this.handleContributeViewAdd}
                                className={classes.backBtn}
                            >
                                + Add Recipe
                            </Button>
                            </Grid>
                        </Grid>
                        <Divider className={classes.dividerStyle1}/>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item xs={6}>
                            {this.state.selected_ingredients.length ?
                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={this.state.filterByIngredient}
                                        onChange={this.handleFilterByIngredient}
                                        name="checkedA"
                                        color="secondary"
                                    />
                                    }
                                    label="Filter by selected ingredients"
                                />
                            :
                                <FormControlLabel
                                    disabled
                                    control={
                                        <Switch
                                            checked={this.state.filterByIngredient}
                                            onChange={this.handleFilterByIngredient}
                                            name="checkedA"
                                            color="secondary"
                                        />
                                    }
                                    label="Filter by selected ingredients"
                                />
                            }
                            </Grid>
                            <Grid item xs={6}>
                            {this.state.selected_mealtype !== '' ?
                                <FormControlLabel
                                    className={classes.mealtypeFilter}
                                    control={
                                        <Switch
                                            checked={this.state.filterByMealtype}
                                            onChange={this.handleFilterByMealtype}
                                            name="checkedB"
                                            color="secondary"
                                        />
                                    }
                                    label="Filter by selected meal type"
                                />
                            :
                                <FormControlLabel
                                    disabled
                                    className={classes.mealtypeFilter}
                                    control={
                                    <Switch
                                        checked={this.state.filterByMealtype}
                                        onChange={this.handleFilterByMealtype}
                                        name="checkedB"
                                        color="secondary"
                                    />
                                    }
                                    label="Filter by selected meal type"
                                /> 
                            }
                            </Grid>
                        </Grid>
                        {!this.state.selected_recipes.length ? (
                            <Typography style={{fontSize:14, marginTop:'2%'}}><em><b>No results found.</b></em></Typography>
                        ) : (
                            <>
                            {this.state.selected_recipes.length === 1 ? (
                                <Typography style={{fontSize:14, marginTop:'2%'}}><em><b>Showing 1 result.</b></em></Typography>
                            ) : (
                                <Typography style={{fontSize:14, marginTop:'2%'}}><em><b>Showing {this.state.selected_recipes.length} results.</b></em></Typography>
                            )}
                            <div className={classes.cardsContainer}>
                                <Grid container spacing={1}>
                                {this.state.selected_recipes.map((recipe, index) =>
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
                                                image={require('./static/images/plate.png' + recipe.recipe_id + '.jpg')}
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
                                                    aria-label="visibility"
                                                    onClick={this.handleVisibilityUpdate.bind(this, recipe)}
                                                >
                                                    {recipe.visibility === 'Public' ? (
                                                        <VisibilityIcon />
                                                    ) : (
                                                        <VisibilityOffIcon />
                                                    )}
                                                </IconButton>
                                                <IconButton
                                                    aria-label="edit"
                                                    onClick={this.handleRecipeUpdate(recipe)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={this.handleDeleteDialogOpen.bind(this, index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <Dialog
                                                    disableBackdropClick
                                                    disableEscapeKeyDown
                                                    maxWidth="xs"
                                                    aria-labelledby="confirmation-dialog-title"
                                                    open={this.state.openRecipeDelete[index]}
                                                >
                                                    <DialogTitle id="confirmation-dialog-title">
                                                        Deleting recipe <em>{recipe.recipe_name}</em>
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure you want to delete this recipe?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button autoFocus onClick={this.handleDeleteCancel.bind(this, index)} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button onClick={this.handleRecipeDelete.bind(this, recipe.recipe_id)} color="primary">
                                                            Ok
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <IconButton
                                                    className={clsx(classes.expand, {
                                                        [classes.expandOpen]: this.state.isCardExpanded[index],
                                                    })}
                                                    onClick={this.handleCardExpandClick(index)}
                                                    aria-expanded={this.state.isCardExpanded[index]}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </IconButton>
                                            </CardActions>
                                            <Collapse in={this.state.isCardExpanded[index]} timeout="auto" unmountOnExit>
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
                                </Grid>
                            </div>
                            </>
                        )}
                        </Container>
                        </>
                    ) : (
                        <>
                        {this.state.isAddingRecipe &&
                            <Typography style={{marginLeft:10,marginTop:30}}><b>STEP 2: RECIPE CREATION</b></Typography>
                        }
                        {this.state.isUpdatingRecipe &&
                            <Typography style={{marginLeft:10,marginTop:30}}><b>STEP 2: RECIPE MODIFICATION</b></Typography>
                        }
                        <Container className={classes.mainContainer}>
                        <Grid container>
                            <Grid item xs={8}>
                        {this.state.isAddingRecipe ? (
                            <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}><b>ENTER THE RECIPE DETAILS</b></Typography>
                        ) : (
                            <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}><b>EDIT THE RECIPE DETAILS</b></Typography>
                        )}
                        </Grid>
                        <Grid item xs={4}>
                        <Button
                            onClick={this.handleContributeFormBack}
                            className={classes.backBtn}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            Back
                        </Button>
                        </Grid>
                        </Grid>
                            <div className={classes.addRecipeDetailsDiv}>
                                <br/>
                                <Divider className={classes.dividerStyle}/>
                                <Typography><b>Basic Information</b></Typography>
                                <TextField
                                    className={classes.recipeTextField}
                                    style={{fontSize:12}}
                                    inputProps={{maxLength:100}}
                                    margin="dense"
                                    id="recipeName"
                                    label="Name"
                                    fullWidth
                                    name="recipe_name"
                                    required
                                    variant="outlined"
                                    value={this.state.recipe_name_input}
                                    onChange={this.handleOnBlurRecipeName}
                                    onBlur={this.handleOnBlurRecipeName}
                                    helperText="Enter the name of the recipe (max. 100 characters)"
                                />
                                <TextField
                                    className={classes.recipeTextField}
                                    multiline
                                    rows={4}
                                    inputProps={{maxLength:500}}
                                    margin="dense"
                                    id="recipeDescription"
                                    label="Description"
                                    fullWidth
                                    name="recipe_description"
                                    required
                                    variant="outlined"
                                    value={this.state.recipe_description_input}
                                    onChange={this.handleOnBlurRecipeDescription}
                                    onBlur = {this.handleOnBlurRecipeDescription}
                                    helperText="Write a description for the recipe (max. 500 characters)"
                                />
                                <Divider className={classes.dividerStyle}/>
                                <Typography><b>Ingredients</b></Typography>
                                {!this.state.selected_ingredients.length ?
                                (
                                    <Typography style={{fontSize:14, marginTop:10}}>You have not selected any ingredients for the recipe.</Typography>
                                ) : (
                                    <>
                                    {this.state.selected_ingredients.length === 1 ? (
                                        <Typography style={{fontSize:14, marginTop:10}}>You have selected 1 ingredient to prepare the recipe.</Typography>
                                    ) : (
                                        <Typography style={{fontSize:14, marginTop:10}}>You have selected {this.state.selected_ingredients.length} ingredients to prepare the recipe.</Typography>
                                    )}
                                    <Grid container direction="row" justify="center" alignItems="center">
                                    {this.state.selected_ingredients.map((obj, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={5}>
                                                <Typography align="left">{obj.ingredient_name}</Typography>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <TextField
                                                    className={classes.recipeIngredientTextField}
                                                    inputProps={{maxLength:25}}
                                                    margin="dense"
                                                    label=""
                                                    name={obj.ingredient_name}
                                                    variant="outlined"
                                                    value={obj.ingredient_qty}
                                                    onChange={this.handleOnChangeIngredientQty(obj)}
                                                    onBlur={this.handleOnBlurIngredientQty(obj)}
                                                    helperText="Enter the ingredient quantity (example: 2; 2 tblspoons; 2 cups)"
                                                />
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                    </Grid>
                                    </>
                                )}
                                <Divider className={classes.dividerStyle}/>
                                <Typography><b>Steps</b></Typography>
                                {!this.state.recipe_steps_input.length ?
                                (
                                    <Typography style={{fontSize:14, marginTop:15}}>You have not added any steps to prepare the recipe.</Typography>
                                ) : (
                                    <>
                                    {this.state.recipe_steps_input.length === 1 ? (
                                        <Typography style={{fontSize:14, marginTop:10}}>You have added 1 step to prepare the recipe.</Typography>
                                    ) : (
                                        <Typography style={{fontSize:14, marginTop:10}}>You have added {this.state.recipe_steps_input.length} steps to prepare the recipe.</Typography>
                                    )}
                                    <Grid container direction="row" justify="center" alignItems="center">
                                    {this.state.recipe_steps_input.map((obj, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={1}>
                                                <IconButton
                                                    name={"" + index} value={index}
                                                    aria-label="delete" color="secondary"
                                                    onClick={this.handleRecipeStepDelete.bind(this, index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <TextField
                                                    className={classes.recipeIngredientTextField}
                                                    inputProps={{maxLength:1500}}
                                                    multiline
                                                    rows={3}
                                                    margin="dense"
                                                    label=""
                                                    name={"" + index}
                                                    variant="outlined"
                                                    value={obj}
                                                    onChange={this.handleOnChangeRecipeSteps(index)}
                                                    onBlur={this.handleOnBlurRecipeSteps(index)}
                                                    helperText={"Step " + (index + 1) + " to prepare the recipe (max. 1500 characters)"}
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                {(index === 0) ? (
                                                    <IconButton
                                                        name={"up" + index} value={index} disabled
                                                        aria-label="upward" color="primary"
                                                        onClick={this.handleRecipeStepMoveUp.bind(this, index)}
                                                    >
                                                        <ArrowUpwardIcon />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton
                                                        name={"up" + index} value={index}
                                                        aria-label="upward" color="primary"
                                                        onClick={this.handleRecipeStepMoveUp.bind(this, index)}
                                                    >
                                                        <ArrowUpwardIcon />
                                                    </IconButton>
                                                )}
                                                {(index === (this.state.recipe_steps_input.length - 1)) ? (
                                                    <IconButton
                                                        name={"down" + index} value={index} disabled
                                                        aria-label="downward" color="primary"
                                                        onClick={this.handleRecipeStepMoveDown.bind(this, index)}
                                                    >
                                                        <ArrowDownwardIcon />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton
                                                        name={"down" + index} value={index}
                                                        aria-label="downward" color="primary"
                                                        onClick={this.handleRecipeStepMoveDown.bind(this, index)}
                                                    >
                                                        <ArrowDownwardIcon />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                    </Grid>
                                    </>
                                )}
                                <Button
                                    onClick={this.handleRecipeStepAdd}
                                    className={classes.addStepBtn1}
                                >
                                    + Add Step
                                </Button>
                                {this.state.recipe_steps_input.length ? (
                                    <Button
                                        onClick={this.handleRecipeStepReset}
                                        className={classes.addStepBtn3}
                                    >
                                        Clear
                                    </Button>
                                ) : (
                                    <Typography></Typography>
                                )}
                                <Divider className={classes.dividerStyle}/>
                                <Typography><b>Meal types</b></Typography>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="select-mealtype">Add a meal type</InputLabel>
                                    <Select
                                        labelId="select-mealtype"
                                        id="select-mealtype"
                                        value={this.state.selected_mealtype1}
                                        onChange={this.handleMealtypeSelect.bind(this)}
                                    >
                                        {Object.entries(this.state.mealtype_list).map(([key, value]) => (
                                            <MenuItem key={key} value={key}>{key}</MenuItem>
                                        ))};
                                    </Select>
                                </FormControl>
                                {!this.state.selected_mealtypes.length ?
                                (
                                    <Typography style={{fontSize:14, marginTop:10}}>You have not tagged any meal types for the recipe.</Typography>
                                ) : (
                                    <>
                                    <Button
                                        onClick={this.handleMealTypeReset}
                                        className={classes.addStepBtn3}
                                    >
                                        Clear
                                    </Button>
                                    {this.state.selected_mealtypes.length === 1 ? (
                                        <Typography style={{fontSize:14, marginTop:10}}>You have tagged 1 meal type for the recipe.</Typography>
                                    ) : (
                                        <Typography style={{fontSize:14, marginTop:10}}>You have tagged {this.state.selected_mealtypes.length} meal types for the recipe.</Typography>
                                    )}
                                    <Grid container direction="row" justify="center" alignItems="center">
                                    {this.state.selected_mealtypes.map((obj, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={1}>
                                                <IconButton
                                                    name={obj} value={index}
                                                    aria-label="delete" color="secondary"
                                                    onClick={this.handleMealtypeDelete.bind(this, obj)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={11}>
                                                {obj}
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                    </Grid>
                                    </>
                                )}
                                <Divider className={classes.dividerStyle}/>
                                <Typography><b>Other Information</b></Typography>
                                <TextField
                                    className={classes.recipeTextField}
                                    inputProps={{maxLength:25}}
                                    margin="dense"
                                    id="prepTime"
                                    label="Preparation time"
                                    fullWidth
                                    name="preparation_time"
                                    variant="outlined"
                                    required
                                    defaultValue=""
                                    value={this.state.recipe_prep_time_input}
                                    onChange={this.handleOnBlurRecipePrepTime.bind(this)}
                                    onBlur={this.handleOnBlurRecipePrepTime.bind(this)}
                                    helperText="Enter an approximate time for recipe preparation (example: 30-45 minutes)"
                                />
                                <TextField
                                    className={classes.recipeTextField}
                                    inputProps={{maxLength:2}}
                                    margin="dense"
                                    id="peopleServed"
                                    label="People served"
                                    fullWidth
                                    name="people_served"
                                    variant="outlined"
                                    defaultValue=""
                                    value={'' + this.state.recipe_people_served_input}
                                    onChange={this.handleOnBlurRecipePeopleServed.bind(this)}
                                    onBlur={this.handleOnBlurRecipePeopleServed.bind(this)}
                                    helperText="Enter the number of people that can be served by the prepared dish (defaults to 1)"
                                />
                                <Typography className={classes.recipeTextField} style={{fontSize:16}}>Visibility</Typography>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="select-visibility">Select visibility of recipe</InputLabel>
                                    <Select
                                        labelId="select-visibility"
                                        id="select-visibility"
                                        value={this.state.selected_visibility}
                                        onChange={this.handleVisibilitySelect.bind(this)}
                                    >
                                        <MenuItem value="Public">Public</MenuItem>
                                        <MenuItem value="Private">Private</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <Divider className={classes.dividerStyle}/>
                                {this.state.recipeErrorMessage !== '' ?
                                    <Typography style={{marginTop:10,marginBottom:20,fontSize:13,color:'red'}}><b>* {this.state.recipeErrorMessage}</b></Typography>
                                :
                                    <Typography style={{marginTop:10,marginBottom:20,fontSize:13,color:'red'}}><b>{this.state.recipeErrorMessage}</b></Typography>
                                }
                                <Button
                                    onClick={this.handleSaveRecipe}
                                    className={classes.saveRecipeBtn}
                                >
                                    Save Recipe
                                </Button>
                            </div>
                            <div className={classes.addRecipeImageDiv}>
                                <div>
                                    {$imagePreview}
                                </div>

                                <input
                                    type="file"
                                    onChange={this.handleRecipeImageChange}
                                    className={classes.imgUploadBtn}
                                    startIcon={<CloudUploadIcon />}
                                />
                            </div>
                        </Container>
                    </>
                    )}
            </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(ContributePage);

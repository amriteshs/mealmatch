import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
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
import Switch from '@material-ui/core/Switch';
import { red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
        marginLeft: theme.spacing(1),
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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    },
    ingrSelectedDiv: {
        height: '32%',
        overflow: 'auto',
        padding: theme.spacing(1)
    },
    ingrSelectionDiv: {
        overflow: 'auto',
        padding: theme.spacing(1)
    },
    mainContainer: {
        height: '100%',
        margin: theme.spacing(0),
        backgroundColor: 'white',
        border: '1px solid grey',
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
        float: 'right'
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
        marginTop: theme.spacing(2)
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
            ingredient_list: [],
            ingredient_checked: [],
            category_list: [],
            mealtype_list: [],
            selected_ingredients: [],
            selected_ingredients_exclude: [],
            selected_category: '',
            selected_mealtype: '',
            selected_mealtypes: [],
            selected_visibility: 'Public',
            selected_recipe_id: -1,
            recipe_name_input: '',
            recipe_description_input: '',
            recipe_prep_time_input: '',
            recipe_people_served_input: 1,
            selected_ingredients_qty_input: [],
            recipe_steps_input: [],
            user_recipes: [],
            filtered_recipes: [],
            isAddingRecipe: false,
            isUpdatingRecipe: false,
            isCardExpanded: [],
            filterByIngredient: false,
            filterByMealtype: false,
            file: '',
            imagePreviewURL: '',
        };

        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleCheckReset = this.handleCheckReset.bind(this);
        this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
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
        this.handleRecipeImageUpload = this.handleRecipeImageUpload.bind(this);
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
        this.handleSelectMealtypeFilter = this.handleSelectMealtypeFilter.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
        this.getUserRecipes();
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

    async getUserRecipes() {
        const endpoint = '/recipe/' + this.state.username;

        await axios.get(endpoint)
            .then(response => {
                this.setState({
                    user_recipes: response.data.recipes,
                    filtered_recipes: response.data.recipes,
                    isCardExpanded: new Array(response.data.count).fill().map((item, idx) => item = false)
                });
            })
            .catch(error => {
                console.log(error);
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
        let mtSelect = [...this.state.selected_mealtypes];

        let index = mtSelect.findIndex(x => x === event.target.value);
        if (index === -1) {
            mtSelect.push(event.target.value);
            mtSelect.sort();
        }
        
        this.setState({
            selected_mealtype: '',
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

    handleMealTypeReset(event) {
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

    handleRecipeImageUpload(event) {
        event.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        const endpoint = '/recipe_image';

        axios.post(endpoint, this.state.file);
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

        reader.readAsDataURL(file)
      }

    async handleSaveRecipe() {
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

            console.log(response);
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

            console.log(response);
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
            ingredient_checked: new Array(this.state.ingredient_count).fill().map((item, idx) => item = false),
        });

        this.getUserRecipes();
    }

    handleContributeFormBack() {
        this.setState({
            isAddingRecipe: false,
            isUpdatingRecipe: false,
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
            ingredient_checked: new Array(this.state.ingredient_count).fill().map((item, idx) => item = false),
        });
    }

    handleContributeViewAdd() {
        this.setState({
            isAddingRecipe: true,
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
            ingredient_checked: new Array(this.state.ingredient_count).fill().map((item, idx) => item = false),
        });
    }

    handleRecipeUpdate = obj => event => {
        let temp_mealtypes = [];
        let temp_steps = [];
        let ingrCheck = [...this.state.ingredient_checked];

        var index = -1;
        obj.ingredients.forEach(ingredient => {
            index = this.state.ingredient_list.findIndex(x => x.ingredient_name === ingredient.ingredient_name);
            if (index !== -1) {
                ingrCheck[index] = true;
            }
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
            ingredient_checked: ingrCheck
        });
    }

    async handleRecipeDelete(obj) {
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
                let rcpFilter = this.state.user_recipes.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                
                this.setState({
                    filtered_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByIngredient: false
                });
            } else {
                // no filter
                this.setState({
                    filtered_recipes: this.state.user_recipes,
                    isCardExpanded: new Array(this.state.user_recipes.length).fill().map((item, idx) => item = false),
                    filterByIngredient: false
                });
            }
        } else {
            if (this.state.filterByMealtype) {
                // filter by mealtype and ingredient
                let rcpFilter1 = this.state.user_recipes.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === this.state.selected_mealtype));
                let rcpFilter = [];
                rcpFilter1.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });

                this.setState({
                    filtered_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByIngredient: true
                });
            } else {
                // filter by ingredient
                let rcpFilter = [];
                this.state.user_recipes.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });

                this.setState({
                    filtered_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
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
                this.state.user_recipes.forEach(recipe =>  {
                    if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                        rcpFilter.push(recipe);
                    }
                });

                this.setState({
                    filtered_recipes: rcpFilter,
                    isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                    filterByMealtype: false,
                    selected_mealtype: ''
                });
            } else {
                // no filter
                this.setState({
                    filtered_recipes: this.state.user_recipes,
                    isCardExpanded: new Array(this.state.user_recipes.length).fill().map((item, idx) => item = false),
                    filterByMealtype: false,
                    selected_mealtype: ''
                });
            }
        } else {
            this.setState({
                filterByMealtype: true
            });
        }
    }

    handleSelectMealtypeFilter(event) {
        if (this.state.filterByIngredient) {
            // filter by ingredient and mealtype
            let rcpFilter1 = this.state.user_recipes.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === event.target.value));
            let rcpFilter = [];
            rcpFilter1.forEach(recipe =>  {
                if (this.state.selected_ingredients.filter(ingr => recipe.ingredients.some(x => x.ingredient_name === ingr.ingredient_name)).length === this.state.selected_ingredients.length) {
                    rcpFilter.push(recipe);
                }
            });

            this.setState({
                filtered_recipes: rcpFilter,
                isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                selected_mealtype: event.target.value
            });
        } else {
            // filter by mealtype
            let rcpFilter = this.state.user_recipes.filter(recipe => recipe.mealtypes.some(mt => mt.mealtype_name === event.target.value));
            
            this.setState({
                filtered_recipes: rcpFilter,
                isCardExpanded: new Array(rcpFilter.length).fill().map((item, idx) => item = false),
                selected_mealtype: event.target.value
            });
        }
    }

    render() {
        const { classes } = this.props;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img
              src={imagePreviewUrl}
              className={classes.imageUpload}
               />);
        } else {
          $imagePreview = (<img
              src={require('./static/images/recipe_placeholder.jpg')}
              alt="not available"
              className={classes.imageUpload}
          />)
        };
          // <img
          //     src={require('./static/images/recipe_placeholder.jpg')}
          //     alt="not available"
          //     className={classes.imageUpload}
          // />

        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap className={classes.title}>
                        mealmatch
                    </Typography>
                    <Button color="inherit" >{this.state.username}</Button>
                    <Button color="inherit" href={'/' + this.state.username}>Home</Button>
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
                <div className={classes.ingrSelectedDiv}>
                    {!this.state.selected_ingredients.length ?
                        (
                            <Typography>You have not selected any ingredients.</Typography>
                        ) : (
                        <>
                            <Grid container spacing={0} direction="row" justify="center" alignItems="center">
                                <Grid item xs={4}>
                                    <Button
                                        onClick={this.handleCheckReset}
                                        className={classes.clearBtn}>
                                    Clear
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
                                        {obj.ingredient_name}
                                    </Grid>
                                </React.Fragment>
                            ))}
                            </Grid>
                        </>
                    )}
                </div>
                <Divider />
                <FormControl className={classes.formControl}>
                    <InputLabel id="select-category">Select a category</InputLabel>
                    <Select
                        labelId="select-category"
                        id="select-category"
                        value={this.state.selected_category}
                        onChange={this.handleCategorySelect}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.state.category_list.map((obj, index) => (
                            <MenuItem key={index} value={obj.category_name}>{obj.category_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className={classes.ingrSelectionDiv}>
                    <FormGroup>
                    {this.state.ingredient_list.map((obj, index) => (
                        ((this.state.selected_category === '') || (this.state.selected_category === obj.category_name)) &&
                        <FormControlLabel
                            key={index} control={<Checkbox checked={this.state.ingredient_checked[index]}
                            onChange={this.handleCheckChange} name={obj.ingredient_name} value={index} color="primary" />}
                            label={obj.ingredient_name}
                        />
                    ))}
                    </FormGroup>
                </div>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                    {(!this.state.isAddingRecipe && !this.state.isUpdatingRecipe) ? (
                        <>
                        <Button
                            onClick={this.handleContributeViewAdd}
                            className={classes.backBtn}
                        >
                            + Add Recipe
                        </Button>
                        <Container className={classes.mainContainer}>
                        {!this.state.user_recipes.length ? (
                            <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}>You have not contributed any recipes yet.</Typography>
                        ) : (
                            this.state.user_recipes.length === 1 ?
                                <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}>You have contributed <b>1</b> recipe.</Typography>
                            :
                                <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}>You have contributed <b>{this.state.user_recipes.length}</b> recipes.</Typography>
                        )}
                        <Divider className={classes.dividerStyle}/>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={this.state.filterByIngredient}
                                    onChange={this.handleFilterByIngredient}
                                    name="checkedA"
                                    color="primary"
                                />
                                }
                                label="Filter by selected ingredients"
                            />
                            {this.state.filterByIngredient ? (
                                <>
                                {this.state.selected_ingredients.length ? (
                                    <>
                                    <Typography className={classes.ingredientFilter}><b>Include: </b>
                                    {this.state.selected_ingredients.map((ingr, index) =>
                                        (index === this.state.selected_ingredients.length - 1) ? (
                                            <React.Fragment key={index}>
                                                {ingr.ingredient_name}
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={index}>
                                                {ingr.ingredient_name},{' '}
                                            </React.Fragment>
                                        )
                                    )}
                                    </Typography>
                                    </>
                                ) : (
                                    <Typography className={classes.ingredientFilter}><b>Include:</b> <em>None</em></Typography>
                                )}
                                {this.state.selected_ingredients_exclude.length ? (
                                    <>
                                    <Typography className={classes.ingredientFilter}><b>Exclude: </b>
                                    {this.state.selected_ingredients_exclude.map((ingr, index) =>
                                        (index === this.state.selected_ingredients_exclude.length - 1) ? (
                                            <React.Fragment key={index}>
                                                {ingr.ingredient_name}
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={index}>
                                                {ingr.ingredient_name},{' '}
                                            </React.Fragment>
                                        )
                                    )}
                                    </Typography>
                                    </>
                                ) : (
                                    <Typography className={classes.ingredientFilter}><b>Exclude:</b> <em>None</em></Typography>
                                )}
                                </>
                            ) : (
                                <Typography></Typography>
                            )}
                            <FormControlLabel
                                className={classes.mealtypeFilter}
                                control={
                                <Switch
                                    checked={this.state.filterByMealtype}
                                    onChange={this.handleFilterByMealtype}
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Filter by selected mealtype"
                            />
                            {this.state.filterByMealtype ? (
                                <FormControl className={classes.formControl1}>
                                    <InputLabel id="select-mealtype">Select a meal type</InputLabel>
                                    <Select
                                        labelId="select-mealtype1"
                                        id="select-mealtype1"
                                        value={this.state.selected_mealtype}
                                        onChange={this.handleSelectMealtypeFilter}
                                    >
                                        {this.state.mealtype_list.map((obj, index) => (
                                            <MenuItem key={index} value={obj.mealtype_name}>{obj.mealtype_name}</MenuItem>
                                        ))};
                                    </Select>
                                </FormControl>
                            ) : (
                                <Typography></Typography>
                            )}
                        </FormGroup>
                        <Divider className={classes.dividerStyle}/>
                        {!this.state.filtered_recipes.length ? (
                            <Typography>No results found.</Typography>
                        ) : (
                            <>
                            {this.state.filtered_recipes.length === 1 ? (
                                <Typography>Showing 1 result.</Typography>
                            ) : (
                                <Typography>Showing {this.state.filtered_recipes.length} results.</Typography>
                            )}
                            <div className={classes.cardsContainer}>
                                <Grid container spacing={1}>
                                {this.state.filtered_recipes.map((recipe, index) =>
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
                                                // image={this.props.imageUrl}
                                                image={require('./static/images/recipe_placeholder.jpg')}
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
                                                    onClick={this.handleRecipeDelete.bind(this, recipe.recipe_id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
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
                                                    <Typography paragraph>
                                                        {recipe.recipe_description}
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <b>Ingredients used</b><br/>
                                                        {recipe.ingredients.map((ingr, index) =>
                                                            <React.Fragment key={index}>
                                                                <em>{ingr.ingredient_qty}</em> {ingr.ingredient_name}<br/>
                                                            </React.Fragment>
                                                        )}
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <b>Preparation steps</b><br/>
                                                        <Grid container spacing={0}>
                                                        {recipe.steps.map((step, index) =>
                                                            <React.Fragment key={index}>
                                                                <Grid item xs={1}>{step.step_no}.</Grid>
                                                                <Grid item xs={11}>{step.step_description}</Grid>
                                                            </React.Fragment>
                                                        )}
                                                        </Grid>
                                                    </Typography>
                                                    <Typography paragraph>
                                                        <b>Meal type</b><br/>
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
                        <Button
                            onClick={this.handleContributeFormBack}
                            className={classes.backBtn}
                            startIcon={<ArrowBackIosIcon />}
                        >
                            Back
                        </Button>
                        <Container className={classes.mainContainer}>
                        {this.state.isAddingRecipe ? (
                            <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}><b>ENTER THE RECIPE DETAILS</b></Typography>
                        ) : (
                            <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}><b>EDIT THE RECIPE DETAILS</b></Typography>
                        )}
                            <div className={classes.addRecipeDetailsDiv}>
                                <br/>
                                <Divider className={classes.dividerStyle}/>
                                <Typography><b>Basic Information</b></Typography>
                                <TextField
                                    className={classes.recipeTextField}
                                    style={{fontSize:12}}
                                    inputProps={{maxLength:100}}
                                    autoFocus
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
                                                    helperText="Enter the ingredient quantity (example: 2; 2 tblspoons)"
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
                                        value={this.state.selected_mealtype}
                                        onChange={this.handleMealtypeSelect.bind(this)}
                                    >
                                        {this.state.mealtype_list.map((obj, index) => (
                                            <MenuItem key={index} value={obj.mealtype_name}>{obj.mealtype_name}</MenuItem>
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
                                  className={classes.addStepBtn}
                                  startIcon={<CloudUploadIcon />}
                                  />
                                <Button
                                    onClick={this.handleRecipeImageUpload}
                                    className={classes.addStepBtn}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload Image
                                </Button>


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

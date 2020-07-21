import React from "react";
import { fade, withStyles, ThemeProvider } from "@material-ui/core/styles";
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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';

import 'fontsource-roboto';
import axios from 'axios';

const drawerWidth = 240;
const topAppBarWidth = 64;

const useStyles = theme => ({
    root: {
        display: "flex",
        fontFamily: 'Roboto'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
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
        marginLeft: theme.spacing(50),
        marginBottom: theme.spacing(3),
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
            selected_category: '',
            selected_mealtype: '',
            selected_mealtypes: [],
            selected_visibility: 'Public',
            recipe_name_input: '',
            recipe_description_input: '',
            recipe_prep_time_input: '',
            recipe_people_served_input: 1,
            selected_ingredients_qty_input: [],
            recipe_steps_input: [],
            user_recipes: [],
            isAddingRecipe: false,
            isUpdatingRecipe: false
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
        this.handleVisibilitySelect = this.handleVisibilitySelect.bind(this);
        this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
        this.handleContributeFormBack = this.handleContributeFormBack.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
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

    }

    async handleSaveRecipe() {
        const endpoint = '/recipe/' + this.state.username;

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
        })

        // this.setState({
        //     isAddingRecipe: false,
        //     isUpdatingRecipe: false
        // });
        
        console.log(response);
    }

    handleContributeFormBack() {
        this.setState({
            isAddingRecipe: false
        });
    }

    // handleContributeViewAdd() {
    //     this.setState({
    //         isAddingRecipe: true
    //     });
    // }

    // handleContributeViewUpdate(event) {
    //     this.setState({
    //         isUpdatingRecipe: true
    //     });
    // }

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
                    <Button
                        onClick={this.handleContributeFormBack} 
                        className={classes.backBtn}
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Back
                    </Button>
                    <Container className={classes.mainContainer}>
                    <Typography style={{marginTop:5,paddingLeft:10,fontSize:15}}><b>ENTER THE RECIPE DETAILS</b></Typography>
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
                                onBlur = {this.handleOnBlurRecipeName.bind(this)}
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
                                onBlur = {this.handleOnBlurRecipeDescription.bind(this)}
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
                                startIcon={<AddIcon />}
                            >
                                Add Step
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
                                    {/* <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem> */}
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
                                onBlur = {this.handleOnBlurRecipePrepTime.bind(this)}
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
                                required
                                defaultValue=""
                                onBlur = {this.handleOnBlurRecipePeopleServed.bind(this)}
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
                            <img 
                                src={require('./static/images/recipe_placeholder.jpg')}
                                className={classes.imageUpload}
                            />
                            <br/>
                            <Button
                                onClick={this.handleRecipeImageUpload} 
                                className={classes.addStepBtn}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Image
                            </Button>
                        </div>
                    </Container>
            </main>
            </div>
        );
    }
}

export default withStyles(useStyles)(ContributePage);
                
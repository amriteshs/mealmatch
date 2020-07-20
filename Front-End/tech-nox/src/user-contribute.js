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
        height: '100vh',
        margin: theme.spacing(0),
        backgroundColor: 'white',
        border: '0.1px solid grey',
        borderRadius: '5px',
        padding: theme.spacing(2),
        overflow: 'auto'
    },
    addStepBtn: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
    },
    addStepBtn1: {
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
        marginTop: theme.spacing(3)
    },
    saveRecipeBtn: {
        marginLeft: theme.spacing(35),
        color:'orange',
        backgroundColor:'black',
        borderColor:'orange',
        border:'1px solid orange',
    },
    addRecipeDetailsDiv: {
        float: 'left',
        width: '70%'
    },
    addRecipeImageDiv: {
        float: 'right'
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
            selected_ingredients_qty_input: [],
            user_recipes: [],
            contributed_recipe: {
                recipe_name: '',
                recipe_description: '',
                preparation_time: '',
                visibility: 'Public',
                mealtypes: [],
                ingredients: [],
                steps: []
            }
        };

        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleCheckReset = this.handleCheckReset.bind(this);
        this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
        this.handleRecipeStepAdd = this.handleRecipeStepAdd.bind(this);
        this.handleRecipeImageUpload = this.handleRecipeImageUpload.bind(this);
        this.handleMealtypeSelect = this.handleMealtypeSelect.bind(this);
        this.handleVisibilitySelect = this.handleVisibilitySelect.bind(this);
        this.handleSaveRecipe = this.handleSaveRecipe.bind(this);
        this.handleMealtypeDelete = this.handleMealtypeDelete.bind(this);
        this.handleOnBlurRecipeName = this.handleOnBlurRecipeName.bind(this);
        this.handleOnBlurRecipeDescription = this.handleOnBlurRecipeDescription.bind(this);
        this.handleOnBlurRecipePrepTime = this.handleOnBlurRecipePrepTime.bind(this);
        this.handleOnBlurIngredientQty = this.handleOnBlurIngredientQty.bind(this);
    }

    componentDidMount() {
        this.getIngredients();
        this.getCategories();
        this.getMealtypes();
    }

    async getIngredients() {
        let response = await axios.get('/ingredient');
        
        this.setState({
            ingredient_count: response.data.count,
            ingredient_list: response.data.ingredients,
            ingredient_checked: new Array(response.data.count).fill().map((item, idx) => item = false)
        });
    }

    async getCategories() {
        let response = await axios.get('/category');

        this.setState({
            category_count: response.data.count,
            category_list: response.data.categories
        });
    }

    async getMealtypes() {
        let response = await axios.get('/mealtype');

        this.setState({
            mealtype_count: response.data.count,
            mealtype_list: response.data.mealtypes
        });
    }

    handleCheckChange(event) {
        let ingrCheck = [...this.state.ingredient_checked];
        let ingrSelect = [...this.state.selected_ingredients];

        ingrCheck[event.target.value] = event.target.checked;

        if (event.target.checked) {
            ingrSelect.push(this.state.ingredient_list[event.target.value]);
            
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

    handleRecipeStepAdd(event) {
        
    }

    handleRecipeImageUpload(event) {

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

    handleVisibilitySelect(event) {
        this.setState({
            selected_visibility: event.target.value
        })
    }

    handleOnBlurRecipeName(event) {
        this.setState({
            recipe_name_input: event.target.value
        })
    }

    handleOnBlurRecipeDescription(event) {
        this.setState({
            recipe_description_input: event.target.value
        })
    }

    handleOnBlurRecipePrepTime(event) {
        this.setState({
            recipe_prep_time_input: event.target.value
        })
    }

    handleOnBlurIngredientQty(event) {
        let contribRecipe = {...this.state.contributed_recipe};
        contribRecipe.ingredients[event.target.idx] = event.target.value;

        this.setState({
            contributed_recipe: contribRecipe
        })
    }

    handleSaveRecipe(event) {
        console.log(this.state.recipe_name_input);
        console.log(this.state.recipe_description_input);
        console.log(this.state.recipe_prep_time_input);
        console.log(this.state.selected_mealtypes);
        console.log(this.state.selected_visibility);
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
                            <Grid container direction="row" justify="center" alignItems="center">
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
                                <Typography style={{fontSize:14, marginTop:10}}>You have not selected any ingredients.</Typography>
                            ) : (
                                <>
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
                                                autoFocus
                                                margin="dense"
                                                label=""
                                                name={obj.ingredient_name}
                                                variant="outlined"
                                                onBlur = {this.handleOnBlurIngredientQty.bind(this, obj, index)}
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
                            <Button
                                onClick={this.handleRecipeStepAdd} 
                                className={classes.addStepBtn1}
                            >
                                Add Step
                            </Button>
                            <Divider className={classes.dividerStyle}/>
                            <Typography><b>Meal types</b></Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-mealtype">Add a meal type</InputLabel>
                                <Select
                                    labelId="select-mealtype"
                                    id="select-mealtype"
                                    value={this.state.selected_mealtype}
                                    onChange={this.handleMealtypeSelect}
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
                                            {/* <Typography> */}
                                                {obj}
                                            {/* </Typography> */}
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
                                autoFocus
                                margin="dense"
                                id="prepTime"
                                label="Preparation time"
                                fullWidth
                                name="preparation_time"
                                variant="outlined"
                                defaultValue=""
                                onBlur = {this.handleOnBlurRecipePrepTime.bind(this)}
                                helperText="Enter an approximate time for recipe preparation (example: 30-45 minutes)"
                            />
                            <br/>
                            <Typography className={classes.recipeTextField} style={{fontSize:16}}>Visibility</Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="select-visibility">Select visibility of recipe</InputLabel>
                                <Select
                                    labelId="select-visibility"
                                    id="select-visibility"
                                    value={this.state.selected_visibility}
                                    onChange={this.handleVisibilitySelect}
                                >
                                    <MenuItem default value="Public">Public</MenuItem>
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
                            <Button
                                onClick={this.handleRecipeImageUpload} 
                                className={classes.addStepBtn}
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
                
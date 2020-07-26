import React from "react";
import { withTheme } from "@material-ui/core/styles";
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
import { fade, makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Axios from "axios";
import RecipeReviewCard from './recipeCards';
import Grid from '@material-ui/core/Grid';

import 'fontsource-roboto';

const topAppBarWidth = 64;
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const [recipeList,setRecipeList] = useState([]);

  const [recipeName, setRecipeName] = useState('');

  const setRecipeNameValue = (event) => {
    setRecipeName(event.target.value)
    console.log(event.target.value)
  }

  const BaseUri= 'https://spoonacular.com/recipeImages/'

  
  const getRecipe = () => {
    // all recipes are fetched here 
    const API_KEY= 'c972685406f94d8cac65c8c6c48febeb'
    const URL = 'https://api.spoonacular.com/recipes/search?apiKey='+ API_KEY +'&number=10&query=' + recipeName

    Axios.get(URL).then((response)=>{
      console.log(response)
      setRecipeList(response.data.results)
    })
    
  }

  // Uncomment below line for default behavior

  // useEffect(() => {
  //   getRecipe();
  // },[]);

  // set the recipe name form the input box on Keyup event

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            mealmatch
          </Typography>
          <Button color="inherit" href='/login'>Login</Button>
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
        <List>
        <ListItem>
        <ListItemText primary={"Selected Ingredients"} />
        </ListItem>
          {["Ingredient 1", "Ingredient 2", "Ingredient 3"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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
        {/* This is the search bar */}
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
              onBlur={setRecipeNameValue}
            />
          </div>
          <Button className={classes.searchBtn} onClick={getRecipe}>Search</Button>
        </Toolbar>
        <div className={classes.cardsContaioner}>
            <Grid container spacing={1}>
              {recipeList.map((recipe) => 
              <Grid item sm={4}>
                <RecipeReviewCard 
                  title={recipe.title} 
                  imageUrl={BaseUri+recipe.image} 
                  source={recipe.sourceUrl} 
                  time={recipe.readyInMinutes} 
                  serves={recipe.servings}
                />
              </Grid>)}
            </Grid>
        </div>
        </div>
        
      </main>
    </div>
  );
}

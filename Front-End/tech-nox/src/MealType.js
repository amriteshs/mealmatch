import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MealCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>

        </Typography>
        {/*Search Bar*/}
        <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon /> <InputBase
              placeholder="Search for Meal Type..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              

            />
            <div>
          <Grid container>
              <Grid item sm={6}>
            <div>
            <Avatar alt="Remy Sharp" src={require("./bread.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Breads} onChange={handleChange} name="gilad" />}
            label="Breads"
          />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src={require("./breakfast.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Breakfast} onChange={handleChange} name="gilad" />}
            label="Breakfast"
          />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src={require("./birthday-cake.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Cakes} onChange={handleChange} name="gilad" />}
            label="Cakes"
          />
          </div>

              </Grid>
              <Grid item sm={6}>
              <div>
              <Avatar alt="Remy Sharp" src={require("./plate.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Dinner} onChange={handleChange} name="gilad" />}
            label="Dinner"
          />
          </div><div>
          <Avatar alt="Remy Sharp" src={require("./champagne-glass.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Drinks} onChange={handleChange} name="gilad" />}
            label="Drinks"
          />
          </div><div>
          <Avatar alt="Remy Sharp" src={require("./healthy-food.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Salads} onChange={handleChange} name="gilad" />}
            label="Salads"
          />
          </div>
              </Grid>
          </Grid>
          

            </div>
            </div>
            
          </div>
          
      </CardContent>
    </Card>
    
  );
}

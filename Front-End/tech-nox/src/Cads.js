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
import CardMedia from '@material-ui/core/CardMedia';
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

export default function OutlinedCard() {
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
              placeholder="Search for Ingrediant Categories..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              

            />
            <div>
          <Grid container>
              <Grid item  sm={6}>

            <div>
            <Avatar alt="Remy Sharp" src={require("./milk.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Dairy} onChange={handleChange} name="gilad" />}
            label="Dairy"
          />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src={require("./fruits.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Fruits} onChange={handleChange} name="gilad" />}
            label="Fruits"
          />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src={require("./rice.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.BakingandGrains} onChange={handleChange} name="gilad" />}
            label="BakingandGrains"
          />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src={require("./beer.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Alcohols} onChange={handleChange} name="gilad" />}
            label="Alcohols"
          />
          </div>
              </Grid>
              <Grid item sm={6}>
              <div>
              <Avatar alt="Remy Sharp" src={require("./seasoning.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Spices} onChange={handleChange} name="gilad" />}
            label="Spices"
          />
          </div><div>
          <Avatar alt="Remy Sharp" src={require("./meat.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Meats} onChange={handleChange} name="gilad" />}
            label="Meats"
          />
          </div><div>
          <Avatar alt="Remy Sharp" src={require("./oil-bottle.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Oils} onChange={handleChange} name="gilad" />}
            label="Oils"
          />
          </div>
          <div>
          <Avatar alt="Remy Sharp" src={require("./sauces.png")}/>
              <FormControlLabel
            control={<Checkbox checked={state.Sauces} onChange={handleChange} name="gilad" />}
            label="Sauces"
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

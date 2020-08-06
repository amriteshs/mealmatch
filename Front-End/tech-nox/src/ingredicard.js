import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));

export default function IngredientCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [steps,setSteps] = useState('');
  const [showSpinner,setshowSpinner] = useState(false);

  const getRecipeInfo = () => {

    const API_KEY= 'ace01650e38a4d5a847be07d17274eec';
    const URL = 'https://api.spoonacular.com/recipes/'+props.recipeid+'/information?apiKey=' + API_KEY;


    if(expanded===false){
      setshowSpinner(true);
      Axios.get(URL).then((response)=>{
        debugger;
        setSteps(response.data.instructions);
        setExpanded(true);
        setshowSpinner(false);
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      setExpanded(false)
    }
  }

  const handleExpandClick = () => {
      getRecipeInfo();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={<div title={props.title} className={classes.titleSize}>{props.title}</div>}
      />
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            <div>
            You also need to have <strong title={
              props.missed && props.missed.map((item,index)=>{
                if(props.missed.length===index+1){
                  return item.name 
                }else{
                  return item.name + ' '
                }
              })
            }>{props.missed.length}</strong> more ingredients.   
            </div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  disabled aria-label="add to favorites" style={{fontSize:14,color:'grey'}}>
          <FavoriteIcon style={{fill:"#FF1111",marginRight:5}}/>
          <b>{props.likes}</b>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      {showSpinner && 
      <div style={{padding:"1rem",justifyContent:"center",display:"flex"}}>
          <div>
            <CircularProgress/>
          </div>
      </div>
      }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {steps}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

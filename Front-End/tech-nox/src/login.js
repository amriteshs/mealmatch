import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios';

class LoginPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userData:{
                userName:'',
                password:'',
            },
            alertOpen:false
        }
    }

    LoginHandler = () => {
        // check if user and password exists in database
        axios.post('/login', {
                "username": this.state.userData.userName,
                "password": this.state.userData.password
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            }
        );
    }

    HandleOnBlur(event){
        var Obj=this.state.userData
        Obj[event.target.name] = event.target.value
        this.setState({userData:Obj,alertOpen:this.state.alertOpen})
        console.log(this.state)
    }

    HandleClose(event){
        console.log(this.state)
        this.setState({userData:{...this.state.userData},alertOpen:false})
    }

    render(){
        return(
            <div>
                <Dialog open={true}>
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your login details down below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user-name"
                            label="User Name"
                            type="email"
                            fullWidth
                            name='userName'
                            required
                            onBlur = {this.HandleOnBlur.bind(this)}
                        />
                        <TextField
                            margin="dense"
                            id="pswd"
                            label="Password"
                            type="password"
                            fullWidth
                            name='password'
                            required
                            onBlur = {this.HandleOnBlur.bind(this)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.LoginHandler}>
                            Login
                        </Button>
                        <Button href='/signup'>
                            Sign Up
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
                    onClose={this.HandleClose.bind(this)}
                    open={this.state.alertOpen}
                    autoHideDuration={6000}
                    message="Username or password incorrect"
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={this.HandleClose.bind(this)}>
                        UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.HandleClose.bind(this)} >
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>
        );
    }
}

export default LoginPage;

import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import makeStyles from './styles';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// import LoginIcon from '@mui/icons-material/Login';
import Input  from './Input';
import Icon from './icon';

import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {signup,signin} from '../../actions/auth';

const initialState = {firstName:'', lastName:'', email:'', password:'',}




const Auth = () => {
    const classes  = makeStyles();
    const [showPassword,setShowPassword] = useState(false); 
    const[isSignup,setIsSignup] = useState(false)
    const [formData,setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword( (prevShowPassword ) => ! prevShowPassword);




    const handleSubmit = (e) => {
e.preventDefault();

if(isSignup){
    dispatch(signup(formData,history))
}else{
    dispatch(signin(formData,history))
}
};

const googleSuccess = async (res) => {
    // console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
history.push('/')
      // history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');



const handleChange = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value});
}

const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup )
    setShowPassword(false);
}


  return (
    <Container component="main" maxwidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} >
                <ExitToAppIcon/>

            </Avatar>
            <Typography variant="h5">{isSignup ? 'Signup': 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>

            { isSignup && (
            <>
                
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />       
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
           
            </>
            )}

            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup }
          


            </Grid>

            <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignup ? 'Sign-Up' : 'Sign-In'}
            </Button>

<GoogleLogin
clientId="820890230565-f1krgrudf45vt1pdnmu7lhv9ibj52nsi.apps.googleusercontent.com"
render={(renderProps) => (
  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
    Google Sign In
  </Button>
)}
onSuccess={googleSuccess}
onFailure={googleError}
cookiePolicy="single_host_origin"

/>
            
            <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>

                </form>
        
        
        
        </Paper>
    </Container>
  )
}


export default Auth;
import React,{useState,useEffect} from 'react';
import { Link,useHistory,useLocation } from 'react-router-dom'
import {AppBar, Toolbar, Typography,Button,Avatar} from '@material-ui/core';
import pls from '../../Images/pls.png';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
function Navbar() {

const classes = useStyles();

const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
// console.log(user);
const dispatch = useDispatch();
const history = useHistory();
const location = useLocation();

const logout = () => {
    alert('Are you sure Want to LOG-OUT!!');
    dispatch({ type:'LOGOUT' });

    history.push('/auth');

    setUser(null);
  };
  
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


    setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
<div className={classes.brandContainer}>
<img className={classes.image}  src={pls} alt="icon" height="80" />
    </div>
    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">WISHES</Typography>
    
    <Toolbar className={classes.toolbar}>
    {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar;
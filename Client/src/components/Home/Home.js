import React,{useState,useEffect} from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux';
import {getPosts} from '../../actions/posts';



function Home() {
       
    const [currentId,setCurrentId] = useState(null);
   
    const dispatch = useDispatch();
  
    useEffect(() => {
  dispatch(getPosts());
    },[currentId,dispatch]);
  return (
    <Grow in>
    <Container>
      <Grid  container justifyContent="space-between" alignItems="stretch" spacing={4}>
        <Grid item xs={12} sm={12} lg={7} >
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home;
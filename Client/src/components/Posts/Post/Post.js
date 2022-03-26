import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';

import makeStyles from './styles';


const Post = ({post,setCurrentId}) => {
    const dispatch = useDispatch();
const classes = makeStyles();
const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                    <Typography varient='h6'>{post.name}</Typography>
                    <Typography varient='body2'>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator  || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                
                    <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}> <CreateIcon fontSize="medium"/>
                        
                    </Button>
   
                </div>
                 )}

                <div className={classes.details}>
                <Typography varient='body2' color='textSecondary' component="h2" >{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h4"  gutterBottom>{post.title}</Typography>

                <CardContent>
        <Typography  variant="h6"  gutterBottom>{post.message}</Typography>
      </CardContent>

     <CardActions className={classes.cardActions}>
        
        {/* <Button size="small" color="primary" onClick={() => {}}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button> */}
       {(user?.result?.googleId === post?.creator  || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="large"/> </Button>

       )}
      </CardActions>
            </Card>
    );
}

export default Post;
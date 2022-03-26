import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgb(0,0,0)',
      },
      image: {
        marginLeft: '35px',
        padding:'4px',
        borderRadius:'10px'
      },
      [theme.breakpoints.down('sm')]:{
        mainContainer:{
          flexDirection:"column-reverse"
        }
      }
     
}));
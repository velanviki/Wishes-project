import * as api from '../api/index.js';



export const signin = (formData,history) => async (dispatch) =>{
try {
    //log in user
    const {data} =await api.signIn(formData);
dispatch({type:'AUTH' ,data});

    history.push('/')
} catch (error) {
   alert("USER DOESN'T EXIST or INCORRECT PASSWORD")
   

}
}


export const signup = (formData,history) => async (dispatch) =>{
    try {
        //sign up  user
        const {data} =await api.signUp(formData);
        dispatch({type:'AUTH' ,data});

        history.push('/')
    } catch (error) {
        alert("USER ALREADY EXIST")
    }
    }
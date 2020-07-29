import axios from 'axios'
import { push } from "connected-react-router";
import { routes } from '../containers/Router';

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"

export const toRenderSignUp = (render) => ({
    type: 'SET_RENDER_SIGN_UP',
    payload: {
        renderSignUp: render,
    }

})

export const toSignUp = (email, password, username) => async (dispatch) => {
    const body =
        {
            email: email,
            password: password,
            username: username,
        }
        try {
            const response = await axios.post(`${baseUrl}/signup`, 
            body)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("username", response.data.user.username)
            localStorage.setItem("email", response.data.user.email)
            dispatch(push(routes.feedPage))
            window.location.reload(true)
        } catch (error) {
            console.error(error)
        }
    }


export const toLogin = (email, password) => async (dispatch) => {
    const body = {
        email: email,
        password: password,
    }

    try{
        const response = await axios.post( `${baseUrl}/login`, 
        body)
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.user.username)
        localStorage.setItem("email", response.data.user.email)
        localStorage.getItem('invalidLogin') ?
            localStorage.removeItem('invalidLogin') :
            window.location.reload(true)
        dispatch(push(routes.feedPage))

    } catch (error){
        console.error(error)
        window.localStorage.setItem('invalidLogin', error)
        window.location.reload(true)
    }

}
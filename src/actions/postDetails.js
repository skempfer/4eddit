import axios from 'axios';

const token = localStorage.getItem('token')

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"

export const setPostDetails = (postDetails) => ({
    type: 'SET_POST_DETAILS',
    payload: {
        postDetails,
    }
})

export const getPostDetails = (postId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': token
        }
    }
    try{
        const response = await axios.get(`${baseUrl}/posts/${postId}`, 
        config)
        dispatch(setPostDetails(response.data.post))
    } catch (error) {
        console.error(error)
    }
}

export const postComment = (comment, postId) => async (dispatch) => {
    const body = {
        text: comment,
    }

    const config = {
        headers: {
            'auth': token
        }
    }
    try {
        await axios.post(`${baseUrl}/posts/${postId}/comment`, 
        body, 
        config)
        dispatch(getPostDetails(postId))
    } catch(error) {
        console.log(body)
        window.alert("Ocorreu um erro ao criar o comentário.")
    }}

    export const getPostVoteComment = ( postId, commentId, direction ) => async (dispatch) =>{
        const body = {
            'direction': direction
        }
        const config = {
            headers: {
                'auth': token
            }
        }
        try{
            await axios.put(`${baseUrl}/posts/${postId}/comment/${commentId}/vote`, 
            body,
            config)
            console.log(postId, body)
            dispatch(getPostDetails(postId));
        } catch (error) {
            console.error(error)   
            console.log(body, config, postId, direction)     
        }
    }
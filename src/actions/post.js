import axios from 'axios';

const baseUrl = "https://us-central1-future-apis.cloudfunctions.net/fourEddit"

const token = window.localStorage.getItem("token");

export const setAllPosts = (allPosts) => ({
    type: 'SET_ALL_POSTS',
    payload: {
        allPosts,
    }
})


export const setPostDetails = (postDetails) => ({
    type: 'SET_POST_DETAILS',
    payload: {
        postDetails,
    }
})


//FUNÇÕES ASSINCRONAS

export const getAllPosts = () => async (dispatch) => {
    const config = {
        headers:{
            'auth': token
        }
    }
    try{
    const response = await axios.get(`${baseUrl}/posts`, 
    config)
    dispatch(setAllPosts(response.data))
    } catch (error){
        console.error(error)
    }
} 

export const createPost = (text, title) => async (dispatch) => {
    const body = {
        text: text,
        title: title,
    }
    const config = {
        headers: {
            'auth': token
        }
    }
    try {
        await axios.post(`${baseUrl}/posts`, 
        body, 
        config)
        dispatch(getAllPosts());
    } catch(error) {
        console.error(error)
    }
}

export const getPostDetail = (postId) => async (dispatch) => {
    const config = {
        headers:{
            'auth': token
        }
    }
    try{
        const response = await axios.get(`${baseUrl}/posts/${postId}`,
        config)
        dispatch(setPostDetails(response.data.post))
    }catch (error) {
        console.error(error)
    }
}

export const getPostVote = ( postId, direction ) => async (dispatch, geState) =>{
    const body = {
        'direction': direction
    }
    const config = {
        headers: {
            'auth': token
        }
    }
    try{
        await axios.put(`${baseUrl}/posts/${postId}/vote`, 
        body,
        config)
        console.log(postId, body)
        dispatch(getAllPosts());
    } catch (error) {
        console.error(error)   
        console.log(body, config, postId, direction)     
    }
}



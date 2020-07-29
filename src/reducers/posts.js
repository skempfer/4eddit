const initialState = {
    allPosts: [],
    selectedPostId: "",
    postDetails: {},
    like: 0,
    disLike: 0,
    toRenderSignUp: undefined,
}

const posts = (state = initialState, action) => {
    console.log(action.payload)
    switch(action.type) {
        case 'SET_ALL_POSTS':
            const postList = action.payload.allPosts;
            return {...state, allPosts: postList};
        case 'SET_POST_DETAILS':
            const postDetails = action.payload.postDetails;
            return {...state, postDetails: postDetails};
        case 'SET_RENDER_SIGN_UP':
            const renderSignUp = action.payload.renderSignUp;
            return {...state, toRenderSignUp: renderSignUp};
        
        default:
            return state;
    }
}


export default posts;
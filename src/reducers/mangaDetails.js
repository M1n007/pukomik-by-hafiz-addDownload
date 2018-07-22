const initialState = {
    manga: {
        title: null
    },
    isLoading: false,
    isFailed: false
}

const mangaDetailsReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_MANGA_DETAILS_PENDING' :
            return {
                ...state, 
                isLoading: true, 
                isFailed: false
            }
        case 'GET_MANGA_DETAILS_FULFILLED' :
            return {
                ...state, 
                manga: action.payload.data.data[0], 
                isLoading: false,
                isFailed: false
            }
        case 'GET_MANGA_DETAILS_REJECTED' :
        return {
            ...state, 
            isLoading: false,
            isFailed: true
        }
        default:
        return state
    }
}

export {mangaDetailsReducer}
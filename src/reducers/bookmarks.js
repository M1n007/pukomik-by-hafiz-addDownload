const initialState = {
    bookmarks: [],
    data: [],
    isLoading: false,
    isFailed: false
}

const bookmarksReducer = (state = initialState,action)=>{
    switch(action.type){
        case 'GET_MANGA_IN_PENDING':
        return {
            ...state,
            isLoading: true,
            isFailed: false
        }
        case 'GET_MANGA_IN_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFailed: false,
            data: action.payload.data.data
        }
        case 'GET_MANGA_IN_REJECTED':
        return {
            ...state,
            isLoading: false,
            isFailed: true
        }

        case 'PUSH_BOOKMARK':
        return {
            ...state,
            bookmarks: action.payload.bookmarks
        }
        case 'UPDATE_BOOKMARK':
        return action.payload.bookmarks

        default:
        return state
    }
}

export {bookmarksReducer}
const initialState = {
    dataSearch: [],
    isLoading: false,
    isFailed: false,
}

const searchReducer = (state = initialState, action)=>{
    switch(action.type){

        case 'SEARCH_MANGA_PENDING':
        return {
            ...state,
            isLoading: true, 
            isFailed: false
        }
        case 'SEARCH_MANGA_FULFILLED':
        return {
            ...state,
            isLoading: false, 
            isFailed: false,
            dataSearch: action.payload.data.data
        }
        case 'SEARCH_MANGA_REJECTED':
        return {
            ...state,
            isLoading: false, 
            isFailed: true
        }

        case 'RESET_SEARCH':
        return initialState

        default:
        return state
    }
}

export {searchReducer}
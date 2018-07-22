const initalState = {
    pageList: [],
    loadQueue: [],
    isLoading: false,
    isFailed: false,
    isCompleted: false
    
}

const pagesReducer = (state = initalState, action)=>{
    switch(action.type){
        case 'GET_PAGES_PENDING':
        return {
            ...state,
            isLoading: true,
            isFailed: false,
            isCompleted: false
        }
        case 'GET_PAGES_FULFILLED':
        return {
            ...state,
            isLoading: false,
            isFailed: false,
            isCompleted: true,
            pageList: action.payload.data.data
        }
        case 'GET_PAGES_REJECTED':
        return {
            ...state,
            isLoading: false,
            isFailed: true,
            isCompleted: false
        }

        default:
        return state
    }
}

export {pagesReducer}
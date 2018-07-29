initialState = {
    data: [],
    isLoading: false,
    isFailed: false,
    isComplete: false
}

const chapterListReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_CHAPTER_LIST_PENDING' :
        return {
            ...state,
            isLoading: true,
            isFailed: false,
            isComplete: false
        }
        case 'GET_CHAPTER_LIST_FULFILLED' :
        return {
            ...state,
            data: action.payload.data.data,
            isLoading: false,
            isFailed: false,
            isComplete: true
        }
        case 'GET_CHAPTER_LIST_REJECTED' :
        return {
            ...state,
            isLoading: false,
            isFailed: true,
            isComplete: false
        }
        case 'RESET_CHAPTER_LIST' :
        return initialState

        default :
        return state
    }
}

export {chapterListReducer}
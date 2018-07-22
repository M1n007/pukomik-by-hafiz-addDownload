initialState = {
    data: [],
    modal: false,
    isLoading: false,
    isFailed: false
}

const chapterListReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'GET_CHAPTER_LIST_PENDING' :
        return {
            ...state,
            isLoading: true,
            isFailed: false
        }
        case 'GET_CHAPTER_LIST_FULFILLED' :
        return {
            ...state,
            data: action.payload.data.data,
            isLoading: false,
            isFailed: false
        }
        case 'GET_CHAPTER_LIST_REJECTED' :
        return {
            ...state,
            isLoading: false,
            isFailed: true
        }

        case 'MODAL_ACTION':
        return {
            ...state,
            modal: !state.modal
        }

        default :
        return state
    }
}

export {chapterListReducer}
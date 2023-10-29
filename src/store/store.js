import { createStore } from "redux";

const initialState = {
    sort: false,
    searchtext: '',
    filtertype: ''
}

const reducer = (state = initialState, action) => {

    if(action.type === 'sort') {
        return {
            ...state,
            sort: action.payload
        }
    }

    if(action.type === 'filtertype') {
        return {
            ...state,
            filtertype: action.payload
        }
    }

    if(action.type === 'searchtext') {
        return {
            ...state,
            searchtext: action.payload
        }
    }

  return state
}

const store = createStore(reducer)

export default store
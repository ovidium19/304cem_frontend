import initialState from './initialState'
import * as types from '../actions/actionTypes'

export default function results(state=initialState.results, action){
    switch (action.type) {
        case types.GET_RESULTS_SUCCESS: {
            return action.data.data
        }
        case types.REMOVE_RESULTS: {
            return []
        }
    }
    return state
}

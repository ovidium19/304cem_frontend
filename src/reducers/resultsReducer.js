import initialState from './initialState'
import * as types from '../actions/actionTypes'

export default function results(state=initialState.results, action){
    switch (action.type) {
        case types.GET_RESULTS_SUCCESS: {
            let newState = Object.assign({},state)
            newState.data = action.data.data
            newState.count = action.data.count
            return newState
        }
        case types.GET_RESULTS_STATS_SUCCESS: {
            let newState = JSON.parse(JSON.stringify(state))
            if (action.data.data.length > 0){
                newState.avg_time = action.data.data[0].avg_time
                newState.passrate = action.data.data[0].passrate
            }
            return newState
        }
        case types.REMOVE_RESULTS: {
            return initialState.results
        }
    }
    return state
}

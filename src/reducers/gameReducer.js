import initialState from './initialState'
import * as types from '../actions/actionTypes'

export default function game(state=initialState.game, action){
    switch (action.type) {
        case types.GET_GAME_ACTIVITIES_SUCCESS: {
            return Object.assign({},state,{activities: action.data})
        }
        case types.PUSH_ANSWER: {
            let answers = Array.from(state.answers)
            answers.push(action.answer)
            return Object.assign({},state,{answers: answers})
        }
        case types.POST_ANSWER_SUCCESS: {
            return state
        }
        case types.STOP_GAME: {
            return initialState.game
        }
    }
    return state
}

import * as types from '../actions/actionTypes'
import initialState from './initialState'

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS'
}

export default function asyncCalls(state = initialState.asyncCalls, action) {
  if (action.type == types.BEGIN_ASYNC_OP) {
    return state + 1
  } else if (action.type == types.ASYNC_ERROR || actionTypeEndsInSuccess(action.type)) {
        if (action.err) {
            console.log(action.err)
        }
        return state - 1
  }

  return state
}

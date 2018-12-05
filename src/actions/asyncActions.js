import * as types from './actionTypes'

export function beginAsyncOp() {
  return {type: types.BEGIN_ASYNC_OP}
}

export function asyncError(err) {
  return {type: types.ASYNC_ERROR, err}
}

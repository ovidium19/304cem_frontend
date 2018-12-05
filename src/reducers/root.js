import { combineReducers } from 'redux'

import asyncCalls from './asyncReducer'
import user from './userReducer'

const rootReducer = combineReducers({
    asyncCalls,
    user
})
export default rootReducer

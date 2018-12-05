import { combineReducers } from 'redux'

import asyncCalls from './asyncReducer'
import user from './userReducer'
import results from './resultsReducer'

const rootReducer = combineReducers({
    asyncCalls,
    user,
    results
})
export default rootReducer

import { combineReducers } from 'redux'

import asyncCalls from './asyncReducer'
import user from './userReducer'
import results from './resultsReducer'
import userActivities from './activitiesReducer'

const rootReducer = combineReducers({
    asyncCalls,
    user,
    results,
    userActivities
})
export default rootReducer

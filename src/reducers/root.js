import { combineReducers } from 'redux'

import asyncCalls from './asyncReducer'
import user from './userReducer'
import results from './resultsReducer'
import userActivities from './activitiesReducer'
import activity from './activityReducer'
import game from './gameReducer'

const rootReducer = combineReducers({
    asyncCalls,
    user,
    results,
    userActivities,
    activity,
    game
})
export default rootReducer

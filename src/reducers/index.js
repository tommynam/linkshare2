// reducers/index.js

import { combineReducers } from 'redux'
import { blogReducer } from './blog'
import { linkReducer } from './link'
import { userReducer} from './user'

export const rootReducer = combineReducers({
 linkStore: linkReducer,
  blogStore: blogReducer,
  userStore: userReducer,
})
import { combineReducers } from 'redux'
import tradeReducer from './tradeReducer'

export default combineReducers({trades:tradeReducer})
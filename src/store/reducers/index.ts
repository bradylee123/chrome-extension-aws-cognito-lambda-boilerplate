import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
import songReducer from './song.reducer';

const appReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	song: songReducer
})

export default (state, action) => {
  return appReducer(state, action)
}
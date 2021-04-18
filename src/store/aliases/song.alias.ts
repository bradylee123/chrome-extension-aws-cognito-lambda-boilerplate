import axios from 'axios';

const songsRequestedAlias = (action) => {
	return function(dispatch) {
  		return axios.get('').then(res => {
  			dispatch({
  				type: 'GET_SONGS_SUCCESS',
	        	data: action,
	        	songs: res.data
  			})
  		})
  		.catch(err => {
  			dispatch({
  				type: 'GET_SONGS_FAILURE',
	        	data: action
  			})
  		})
  	}
};

const songStackPushAlias = (action) => {
	return function(dispatch) {
		dispatch({
			type: 'SONG_STACK_PUSHED',
	    song: action.song
		})
  	}
};

const songStackPopAlias = (action) => {
	return function(dispatch) {
  		dispatch({
  			type: 'SONG_STACK_POPPED'
  		})
  	}
};

const historyStackPushAlias = (action) => {
	return function(dispatch) {
  		dispatch({
  			type: 'HISTORY_STACK_PUSHED',
  	    song: action.song
  		})
  	}
};

const historyStackPopAlias = (action) => {
	return function(dispatch) {
  		dispatch({
  			type: 'HISTORY_STACK_POPPED'
  		})
  	}
};

export default {
	'SONGS_REQUESTED': songsRequestedAlias,
	'SONG_STACK_PUSH': songStackPushAlias,
	'SONG_STACK_POP': songStackPopAlias,
	'HISTORY_STACK_PUSH': historyStackPushAlias,
	'HISTORY_STACK_POP': historyStackPopAlias
}
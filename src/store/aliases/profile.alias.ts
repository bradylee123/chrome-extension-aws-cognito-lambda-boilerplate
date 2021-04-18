import axios from 'axios';
import { getAuthenticatedUser } from '../userPool';

const getProfileAlias = (action) => {
	return function(dispatch) {
		getAuthenticatedUser().getSession((err, session) => {
			if (err) {
				dispatch({
			      type: 'SIGN_OUT'
			    })
				return;
			}
			axios.post('', {}, {
			    headers: {
			    	"Content-Type": "application/json",
				    "Authorization": session.getIdToken().getJwtToken()
			    }
			  })
			  .then((response) => {
			  	if (JSON.stringify(response.data) !== '{}') {
			  		dispatch({
				      type: 'SET_PROFILE',
				      profle: response.data
				    })
			  	} else {
			  		dispatch({
				      type: 'CREATE_PROFILE'
				    })
			  	}
			  })
			  .catch((error) => {
			    dispatch({
			      type: 'SIGN_OUT'
			    })
			  })
		});
	}
}

const createProfileAlias = (action) => {
	return function(dispatch) {
		getAuthenticatedUser().getSession((err, session) => {
			if (err) {
				dispatch({
			      type: 'SIGN_OUT'
			    })
				return;
			}
			axios.post('', {}, {
			    headers: {
			    	"Content-Type": "application/json",
			    	"Authorization": session.getIdToken().getJwtToken()
			    }
			  })
			  .then((response) => {
			  	if (response.data.errorType) {
			  		dispatch({
				      type: 'SIGN_OUT'
				    })
			  	} else {
			  		dispatch({
				      type: 'SET_PROFILE',
				      profle: response.data
				    })
			  	}
			  })
			  .catch((error) => {
			  	dispatch({
			      type: 'SIGN_OUT'
			    })
			  })
		});
	}
}

export default {
	'GET_PROFILE': getProfileAlias,
	'CREATE_PROFILE': createProfileAlias,
}
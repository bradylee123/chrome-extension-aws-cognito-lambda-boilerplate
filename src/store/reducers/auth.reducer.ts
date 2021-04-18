import { updateObject } from '../../shared/utility';

const initialState = {
  email: null,
  isAuthenticated: false,
  user: null,
  authDidFail: false,
  authIsLoading: false,
  authMessage: null,
  userNotConfirmed: false,
  accountCreated: false,
};

const setEmail = (state, action) => {
  return updateObject( state, {
      email: action.email
  } );
}

const clearEmail = (state, action) => {
  return updateObject( state, {
      email: null
  } );
}

const registerUserSuccess = (state, action) => {
  return updateObject( state, {
      user: null
  } );
}

const registerUserFailure = (state, action) => {
  return updateObject( state, {
      user: null
  } );
}

const confirmRegisteredUnauthenticatedUserSuccess = (state, action) => {
  return updateObject( state, {
      user: null
  } );
}

const confirmRegisteredUnauthenticatedUserFailure = (state, action) => {
  return updateObject( state, {
      user: null
  } );
}

const setIsAuthenticatedTrue = (state, action) => {
  return updateObject( state, {
      isAuthenticated: true
  } );
}

const setIsAuthenticatedFalse = (state, action) => {
  return updateObject( state, {
      isAuthenticated: false
  } );
}

const setUserNotConfirmedTrue = (state, action) => {
  return updateObject( state, {
      userNotConfirmed: true
  } );
}

const setUserNotConfirmedFalse = (state, action) => {
  return updateObject( state, {
      userNotConfirmed: false
  } );
}

const setAccountCreatedTrue = (state, action) => {
  return updateObject( state, {
      accountCreated: true
  } );
}

const setAccountCreatedFalse = (state, action) => {
  return updateObject( state, {
      accountCreated: false
  } );
}

const setAuthMessage = (state, action) => {
  return updateObject( state, {
      authMessage: action.authMessage
  } );
}

const resetAuthMessage = (state, action) => {
  return updateObject( state, {
      authMessage: null
  } );
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case 'SET_EMAIL': return setEmail(state, action);
      case 'CLEAR_EMAIL': return clearEmail(state, action);
      case 'REGISTER_USER_SUCCESS': return registerUserSuccess(state, action);
      case 'REGISTER_USER_FAILURE': return registerUserFailure(state, action);
      case 'CONFIRM_REGISTERED_UNAUTHENTICATED_USER_SUCCESS': return confirmRegisteredUnauthenticatedUserSuccess(state, action);
      case 'CONFIRM_REGISTERED_UNAUTHENTICATED_USER_FAILURE': return confirmRegisteredUnauthenticatedUserFailure(state, action);
      case 'IS_AUTHENTICATED_TRUE': return setIsAuthenticatedTrue(state, action);
      case 'IS_AUTHENTICATED_FALSE': return setIsAuthenticatedFalse(state, action);
      case 'SET_USER_NOT_CONFIRMED_TRUE': return setUserNotConfirmedTrue(state, action);
      case 'SET_USER_NOT_CONFIRMED_FALSE': return setUserNotConfirmedFalse(state, action);
      case 'SET_ACCOUNT_CREATED_TRUE': return setAccountCreatedTrue(state, action);
      case 'SET_ACCOUNT_CREATED_FALSE': return setAccountCreatedFalse(state, action);
      case 'DISPLAY_AUTH_MESSAGE': return setAuthMessage(state, action);
      case 'RESET_AUTH_MESSAGE': return resetAuthMessage(state, action);
      default: return state;
    }
};

export default reducer;
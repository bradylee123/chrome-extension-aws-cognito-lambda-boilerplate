import {
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUser,
  CognitoUserSession
} from "amazon-cognito-identity-js";
import User from "../models/user";
import CognitoUserPoolErrorException from "../models/cognitoUserPoolErrorException";
import { userPool, getAuthenticatedUser } from '../userPool';

const registerUserAlias = (action) => {
	return function(dispatch) {
		const user: User = {
			email: action.email,
			password: action.password
		}
	    const attributeList: CognitoUserAttribute[] = [];
	    const emailAttribute = {
	    	Name: 'email',
	      	Value: action.email
	    };
	    attributeList.push(new CognitoUserAttribute(emailAttribute));
	    userPool.signUp(user.email, user.password, attributeList, null, (err: CognitoUserPoolErrorException, result) => {
	      if (err) {
	        if (err.code === "UsernameExistsException") {
	        	dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Email already exists. Please check your email for the verification code.",
				})
				dispatch({
					type: 'SET_USER_NOT_CONFIRMED_TRUE'
				})
	        } else if (err.code === "InvalidParameterException") {
	        	dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Password must have length greater than or equal to 8.",
				})
	        }
	        dispatch({
				type: 'REGISTER_USER_FAILURE'
			})
	      } else {
	      	dispatch({
				type: 'SET_USER_NOT_CONFIRMED_TRUE'
			})
	      	dispatch({
			  type: 'REGISTER_USER_SUCCESS'
		    })
		    dispatch({
			  type: 'RESET_AUTH_MESSAGE'
		    })
	      }
	      dispatch({
			type: 'SET_EMAIL',
			email: action.email
		  })
	    });
  	}
};

const resendVerificationCode = (action) => {
	return function(dispatch) {
		const userData = {
			Username: action.email,
			Pool: userPool
		}
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.resendConfirmationCode(function(err: CognitoUserPoolErrorException, result) {
			if (err) {
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Error occured. Verification code is unable to be sent to your email.",
				})
			} else {
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Verification code is resent to your email.",
				})
			}
		});
  	}
}

const confirmRegisteredUnauthenticatedUserAlias = (action) => {
	return function(dispatch) {
		const userData = {
			Username: action.email,
			Pool: userPool
		}
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.confirmRegistration(action.confirmationCode, true, (err, result) => {
			if (err) {
				dispatch({
					type: 'CONFIRM_REGISTERED_UNAUTHENTCATED_USER_FAILURE'
				})
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Verification Code Incorrect. Please try again.",
				})
			} else {
				dispatch({
					type: 'CLEAR_EMAIL'
				})
				dispatch({
					type: 'CONFIRM_REGISTERED_UNAUTHENTCATED_USER_SUCCESS'
				})
				dispatch({
					type: 'SET_USER_NOT_CONFIRMED_FALSE'
				})
				dispatch({
					type: 'SET_ACCOUNT_CREATED_TRUE'
				})
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Success! Your account is created.",
				})
			}
		})
  	}
};

const authenticateUserAlias = (action) => {
	return function(dispatch) {
		const authenticationDetails = new AuthenticationDetails({
			Username: action.email,
			Password: action.password
		})
		const userData = {
			Username: action.email,
			Pool: userPool
		}
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function(result: CognitoUserSession) {
				cognitoUser.getUserAttributes(function(err, result) {
					if (err) {
						alert(err.message || JSON.stringify(err));
						return;
					}
					let emailVerified = false;
					let sub = null;
					for (let i = 0; i < result.length; i++) {
						if (result[i].getName() === "email_verified" && result[i].getValue() === "true") {
							emailVerified = true;
						}
						if (result[i].getName() === "sub") {
							sub = result[i].getValue();
						}
					}
					if (emailVerified && sub) {
						dispatch({
							type: 'GET_PROFILE',
							sub: sub
						})
					}
				});
				dispatch({
					type: 'GET_IS_AUTHENTICATED'
				})
				dispatch({
					type: 'SET_USER_NOT_CONFIRMED_FALSE'
				})
			},

			onFailure: function(err) {
				if (err.code === "UserNotConfirmedException") {
					dispatch({
						type: 'SET_EMAIL',
						email: action.email
					})
		        	dispatch({
						type: 'SET_USER_NOT_CONFIRMED_TRUE'
					})
					dispatch({
						type: 'RESEND_VERIFICATION_CODE',
						email: action.email
					})
		        } else if (err.code == 'PasswordResetRequiredException'){
			        // Reset Password Required

			    } else if (err.code == 'NotAuthorizedException'){
			        // Not Authorised (Incorrect Password)
			        dispatch({
						type: 'DISPLAY_AUTH_MESSAGE',
						authMessage: "Incorrect email or password.",
					})
			    } else if (err.code == 'ResourceNotFoundException'){
			        // User Not found
			        dispatch({
						type: 'DISPLAY_AUTH_MESSAGE',
						authMessage: "Incorrect email or password.",
					})
			    }
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Incorrect username or password.",
				})
			},
		});
  	}
};

const signOutAlias = (action) => {
	return function(dispatch) {
		const authenticatedUser = getAuthenticatedUser();
		if (authenticatedUser) {
			authenticatedUser.signOut();
		}
		dispatch({
			type: 'IS_AUTHENTICATED_FALSE'
		})
		dispatch({
			type: 'RESET_AUTH_MESSAGE'
		})
  	}
};

const getIsAuthenticatedAlias = (action) => {
	return function(dispatch) {
		const authenticatedUser = getAuthenticatedUser();
		if (!authenticatedUser) {
			dispatch({
				type: 'IS_AUTHENTICATED_FALSE'
			})
		} else {
			authenticatedUser.getSession((err, session) => {
				if (err) {
					dispatch({
						type: 'IS_AUTHENTICATED_FALSE'
					})
				} else {
					if (session.isValid()) {
						dispatch({
							type: 'IS_AUTHENTICATED_TRUE'
						})
						dispatch({
							type: 'RESET_AUTH_MESSAGE'
						})
					} else {
						dispatch({
							type: 'IS_AUTHENTICATED_FALSE'
						})
					}
				}
			})
		}
  	}
};

const forgotPasswordAlias = (action) => {
	return function(dispatch) {
		const userData = {
			Username: action.email,
			Pool: userPool
		}
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.forgotPassword({
			onSuccess: function(data) {
				// successfully initiated reset password request
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Verification code is sent to your email.",
				})
			},
			onFailure: function(err) {
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Verification code is sent to your email.",
				})
			}
		});
  	}
};

const confirmNewPasswordAlias = (action) => {
	return function(dispatch) {
		const userData = {
			Username: action.email,
			Pool: userPool
		}
		const cognitoUser = new CognitoUser(userData);
		cognitoUser.confirmPassword(action.verificationCode, action.newPassword, {
			onSuccess() {
				dispatch({
					type: 'AUTHENTICATE_USER',
					email: action.email,
					password: action.newPassword
				})
			},
			onFailure(err) {
				dispatch({
					type: 'DISPLAY_AUTH_MESSAGE',
					authMessage: "Password reset is unsuccessful. Please try again.",
				})
			},
		});
  	}
};

export default {
	'REGISTER_USER': registerUserAlias,
	'CONFIRM_REGISTERED_UNAUTHENTCATED_USER': confirmRegisteredUnauthenticatedUserAlias,
	'RESEND_VERIFICATION_CODE': resendVerificationCode,
	'AUTHENTICATE_USER': authenticateUserAlias,
	'SIGN_OUT': signOutAlias,
	'GET_IS_AUTHENTICATED': getIsAuthenticatedAlias,
	'FORGOT_PASSWORD': forgotPasswordAlias,
	'CONFIRM_NEW_PASSWORD': confirmNewPasswordAlias,
}
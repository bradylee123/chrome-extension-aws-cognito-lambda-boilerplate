export const registerUser = (email, password) => {
	return {
		type: 'REGISTER_USER',
		email: email,
		password: password
	}
}

export const confirmRegisteredUnauthenticatedUser = (email, confirmationCode) => {
	return {
		type: 'CONFIRM_REGISTERED_UNAUTHENTCATED_USER',
		email: email,
		confirmationCode: confirmationCode
	}
}

export const authenticateUser = (email, password) => {
	return {
		type: 'AUTHENTICATE_USER',
		email: email,
		password: password
	}
}

export const signOut = () => {
	return {
		type: 'SIGN_OUT'
	}
}

export const resendVerificationCode = (email) => {
	return {
		type: 'RESEND_VERIFICATION_CODE',
		email: email
	}
}

export const confirmNewPassword = (email, verificationCode, newPassword) => {
	return {
		type: 'CONFIRM_NEW_PASSWORD',
		email: email,
		verificationCode: verificationCode,
		newPassword: newPassword
	}
}

export const changePassword = (password) => {
	return {
		type: 'CHANGE_PASSWORD',
		password: password
	}
}

export const forgotPassword = (email) => {
	return {
		type: 'FORGOT_PASSWORD',
		email: email
	}
}

export const resetAuthMessage = () => {
	return {
		type: 'RESET_AUTH_MESSAGE'
	}
}

export const setUserNotConfirmedFalse = () => {
	return {
		type: 'SET_USER_NOT_CONFIRMED_FALSE'
	}
}

export const setAccountCreatedFalse = () => {
	return {
		type: 'SET_ACCOUNT_CREATED_FALSE'
	}
}

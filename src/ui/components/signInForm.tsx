import * as React from "react";
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import ConfirmationCodeForm from './confirmationCodeForm';

const signInForm = props => {

	const [isForgotPassword, setIsForgotPassword] = React.useState(false);
	const [openForgotPasswordForm, setOpenForgotPasswordForm] = React.useState(false);
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [verificationCode, setVerificationCode] = React.useState('');
	const [newPassword, setNewPassword] = React.useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onAuthenticateUser(email.trim(), password.trim());
	}

	const handleForgotPassword = (e) => {
		e.preventDefault();
		setIsForgotPassword(true);
	}

	const handleSubmitForgotPassword = (e) => {
		e.preventDefault();
		props.onForgotPassword(email);
		setOpenForgotPasswordForm(true);
	}

	const closeForgotPassword = () => {
		setIsForgotPassword(false);
		setOpenForgotPasswordForm(false);
		props.onResetAuthMessage();
	}

	const handleVerificationCodeChange = (e) => {
		setVerificationCode(e.target.value);
	}

	const handleNewPasswordChange = (e) => {
		setNewPassword(e.target.value);
	}

	const handleSubmitNewPassword = (e) => {
		e.preventDefault();
		props.onConfirmNewPassword(email, verificationCode, newPassword);
	}

	const handleBackOperation = (e) => {
		e.preventDefault();
		props.onSetUserNotConfirmedFalse();
		props.openSignUp();
	}

	React.useEffect(() => {
		if (props.authMessage) {	
			props.onResetAuthMessage();
		}
	}, []);

    return (
        <div>
        	{(props.userNotConfirmed) &&
        		<ConfirmationCodeForm
        			backOperation="openSignUp"
					handleBackOperation={handleBackOperation} />
        	}
        	{(!props.userNotConfirmed) &&
	        	<div>
		        	{(openForgotPasswordForm) &&
		        		 <div>
				        	<h1>Forgot password Form</h1>
				        	<button type="button" onClick={() => closeForgotPassword()}>Back</button>
				        	<form onSubmit={(event) => handleSubmitNewPassword(event)}>
						        <input type="text"
						               value={verificationCode}
						               placeholder="Verification Code"
						               onChange={(event) => handleVerificationCodeChange(event)}/>
						        <input type="password"
						               value={newPassword}
						               placeholder="newPassword"
						               onChange={(event) => handleNewPasswordChange(event)}/>
						        <input type="submit"/>
						    </form>
						    {(props.authMessage) &&
						    	<p>{props.authMessage}</p>
						    }
				        </div>
		        	}
		        	{(isForgotPassword && !openForgotPasswordForm) &&
		        		<div>
		        			<button type="button" onClick={() => closeForgotPassword()}>Back</button>
				        	<form onSubmit={(event) => handleSubmitForgotPassword(event)}>
						        <input type="text"
						               value={email}
						               placeholder="Email"
						               onChange={(event) => handleEmailChange(event)}/>
						        <input type="submit"/>
						    </form>
						    {(props.authMessage) &&
						    	<p>{props.authMessage}</p>
						    }
					    </div>
		        	}
		        	{(!isForgotPassword && !openForgotPasswordForm) &&
		        		<div>
		        			<form onSubmit={(event) => handleSubmit(event)}>
						        <input type="text"
						               value={email}
						               placeholder="Email"
						               onChange={(event) => handleEmailChange(event)}/>
						        <input type="password"
						               value={password}
						               placeholder="Password"
						               onChange={(event) => handlePasswordChange(event)}/>
						        <input type="submit"/>
						    </form>
						    {(props.authMessage) &&
						    	<p>{props.authMessage}</p>
						    }
						    <button type="button" onClick={(event) => handleForgotPassword(event)}>Forgot Password</button>
		        		</div>
		        	}
		        	<button type="button" onClick={() => props.openSignUp()}>Sign Up</button>
	        	</div>
        	}
        </div>
    )

}

const mapStateToProps = state => {
  return {
  	authMessage: state.auth.authMessage,
  	userNotConfirmed: state.auth.userNotConfirmed,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticateUser: (email, password) => dispatch(actions.authenticateUser(email, password)),
    onForgotPassword: (email) => dispatch(actions.forgotPassword(email)),
    onConfirmNewPassword: (email, verificationCode, newPassword) => dispatch(actions.confirmNewPassword(email, verificationCode, newPassword)),
    onResetAuthMessage: () => dispatch(actions.resetAuthMessage()),
    onSetUserNotConfirmedFalse: () => dispatch(actions.setUserNotConfirmedFalse()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(signInForm);
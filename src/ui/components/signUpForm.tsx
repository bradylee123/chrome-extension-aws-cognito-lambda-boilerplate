import * as React from "react";
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import ConfirmationCodeForm from './confirmationCodeForm';

const signUpForm = props => {

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onRegisterUser(email.trim(), password.trim());
	}

	const handleBackOperation = (e) => {
		e.preventDefault();
		props.onSetUserNotConfirmedFalse();
		props.closeSignUp();
	}

	React.useEffect(() => {
		if (props.authMessage) {	
			props.onResetAuthMessage();
		}
		if (props.accountCreated) {
			props.onSetAccountCreatedFalse();
		}
	}, []);

	return (
		<div>
			{(props.userNotConfirmed) &&
				<ConfirmationCodeForm 
					backOperation="closeSignUp"
					handleBackOperation={handleBackOperation} />
			}
			{(!props.userNotConfirmed) &&
				<div>
					{(!props.accountCreated) &&
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
					}
					{(props.authMessage) &&
				    	<p>{props.authMessage}</p>
					}
					<button type="button" onClick={() => props.closeSignUp()}>Sign In</button>
			    </div>
			}
		</div>
    )

}

const mapStateToProps = state => {
  return {
  	authMessage: state.auth.authMessage,
  	userNotConfirmed: state.auth.userNotConfirmed,
  	accountCreated: state.auth.accountCreated,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: (email, password) => dispatch(actions.registerUser(email, password)),
    onResetAuthMessage: () => dispatch(actions.resetAuthMessage()),
    onSetAccountCreatedFalse: () => dispatch(actions.setAccountCreatedFalse()),
    onSetUserNotConfirmedFalse: () => dispatch(actions.setUserNotConfirmedFalse()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(signUpForm);
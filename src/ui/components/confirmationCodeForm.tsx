import * as React from "react";
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';

const confirmationCodeForm = props => {

	const [confirmationCode, setConfirmationCode] = React.useState('');

	const handleConfirmationCodeChange = (e) => {
		setConfirmationCode(e.target.value);
	}

	const handleConfirmation = (e) => {
		e.preventDefault();
		props.onConfirmRegisteredUnauthenticatedUser(props.email.trim(), confirmationCode);
	}

    return (
        <div>
        	<button type="button" onClick={() => props.onSetUserNotConfirmedFalse()}>Back</button>
			<form onSubmit={(event) => handleConfirmation(event)}>
		        <input type="text"
		               value={confirmationCode}
		               placeholder="Confirmation Code"
		               onChange={(event) => handleConfirmationCodeChange(event)}/>
		        <input type="submit"/>
		    </form>
		    {(props.authMessage) &&
		    	<p>{props.authMessage}</p>
		    }
		    <button type="button" onClick={() => props.onResendVerificationCode(props.email.trim())}>Send Verification Code</button>
		    {(props.backOperation === "closeSignUp") &&
		    	<button type="button" onClick={(event) => props.handleBackOperation(event)}>Sign In</button>
		    }
		    {(props.backOperation === "openSignUp") &&
		    	<button type="button" onClick={(event) => props.handleBackOperation(event)}>Sign Up</button>
		    }
	    </div>
    )

}

const mapStateToProps = state => {
  return {
  	email: state.auth.email,
  	authMessage: state.auth.authMessage,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onResendVerificationCode: (email) => dispatch(actions.resendVerificationCode(email)),
    onConfirmRegisteredUnauthenticatedUser: (email, confirmationCode) => dispatch(actions.confirmRegisteredUnauthenticatedUser(email, confirmationCode)),
    onSetUserNotConfirmedFalse: () => dispatch(actions.setUserNotConfirmedFalse()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(confirmationCodeForm);
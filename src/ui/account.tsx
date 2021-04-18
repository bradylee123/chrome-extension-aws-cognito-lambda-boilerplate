import * as React from "react";
import { connect } from 'react-redux';
import Profile from './profile';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/signUpForm';

const account = props => {

    const [openSignedUpForm, setOpenSignedUpForm] = React.useState(false);

    const handleOpenSignUpForm = () => {
      setOpenSignedUpForm(true);
    }

    const handleCloseSignUpForm = () => {
      setOpenSignedUpForm(false);
    }

    return (

        <div>
          {(props.isAuthenticated) &&
            <Profile />
          }
          {(!props.isAuthenticated) &&
            <div>
              {(!openSignedUpForm) &&
                <SignInForm openSignUp={handleOpenSignUpForm} />
              }
              {(openSignedUpForm) &&
                <SignUpForm closeSignUp={handleCloseSignUpForm} />
              }
            </div>
          }
        </div>
    )

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(account);
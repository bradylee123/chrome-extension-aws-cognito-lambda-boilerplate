import * as React from "react";
import * as actions from "../store/actions/index";
import { connect } from 'react-redux';

const profile = props => {

    return (
        <div>
  		    <button type="button" onClick={() => props.onSignOut()}>Sign Out</button>
        </div>
    )

}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.signOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(profile);
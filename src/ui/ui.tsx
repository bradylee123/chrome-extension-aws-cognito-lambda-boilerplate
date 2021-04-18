import * as React from "react";
import { connect } from 'react-redux';
import Navigator from "./navigator";
import Player from "./player";
import History from "./history";
import Account from "./account";

interface IProps {

}

interface IState {
    tab?: string;
}

class Ui extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            tab: "player"
        }

        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    handleSelectTab(tab) {
        this.setState((prevState, props) => ({
            tab: tab
        }))
    }

    renderTab() {
        switch (this.state.tab) {
            case "player":
                return <Player />;
                break;
            case "history":
                return <History />;
                break;
            case "account":
                return <Account />;
                break;
            default:
                return <Player />;
                break;
        }
    }

    render() {

        return (
            <div id="main-shadow">
                <div id="main">
                <div className="popover">
                    <div className="container">
                        <div className="header">
                        </div>
                        <div className="content">
                            {this.renderTab()}
                        </div>
                        <Navigator
                            tab={this.state.tab}
                            handleSelectTab={this.handleSelectTab} />
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
  return {
      
  };
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ui);
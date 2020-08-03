import React, { Component } from "react";
import SecSideBar from "./SecSidebar";

class SecDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <SecSideBar history={this.props.history} />
      </div>
    );
  }
}

export default SecDashboard;

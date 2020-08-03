import React, { Component } from "react";
import SideBar from "./Sidebar";

class AdDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <SideBar
          history={this.props.history}
          dept={localStorage.getItem("addept")}
        />
        <div className="lpadmin1">
          <h3 className="ad">
            <span>&nbsp;&nbsp;</span>Welcome Admin
          </h3>
        </div>
      </div>
    );
  }
}

export default AdDashboard;

import React, { Component } from "react";
import SideBar from "../AdminComponents/Sidebar";
import "../AdminComponents/style/landing.css";

class SecReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: "",
    };
  }

  render() {
    return (
      <div>
        <SideBar history={this.props.history} />
      </div>
    );
  }
}

export default SecReport;

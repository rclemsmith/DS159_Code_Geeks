import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";

class AddSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <SideNavBar history={this.props.history} />
        <Head name="Add Summary"></Head>
      </div>
    );
  }
}

export default AddSummary;

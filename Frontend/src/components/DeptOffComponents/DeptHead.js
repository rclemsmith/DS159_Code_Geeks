import React, { Component } from "react";
import "./style/depthead.css";
import { Jumbotron } from "reactstrap";

class DeptHead extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("deptId");
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/";
  }

  render() {
    return (
      <div className="jj8">
        <nav className="navbar  navbar-expand-sm bg-dark  fixed-top jj7">
          <h3 style={{ marginLeft: "1%" }}>{this.props.name}</h3>

          <button className="btn btn-primary jj6" onClick={this.handleLogout}>
            <i
              style={{ marginRight: "7px" }}
              class="fa fa-sign-out"
              aria-hidden="true"
            ></i>
            Logout
          </button>
        </nav>
      </div>
    );
  }
}

export default DeptHead;

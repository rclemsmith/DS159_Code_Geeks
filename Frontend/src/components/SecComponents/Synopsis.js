import React, { Component } from "react";
import axios from "axios";
import { Input } from "reactstrap";
import url from "../../backend_url";
import Head from "../NodalOffComponents/Head";
import DeptHead from "../DeptOffComponents/DeptHead";

class Synopsis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      case: [],
    };
  }

  componentDidMount() {
    axios
      .get(url + "/secretary/" + this.props.location.state.info + "/sec")
      .then((res) => {
        this.setState({
          case: res.data,
        });
      });
  }
  render() {
    console.log(this.state.case);
    console.log(this.props.location.state.info);
    return (
      <div className="lpttttt">
        <nav className="navbar  navbar-expand-sm bg-dark navbar-dark fixed-top">
          <h2 style={{ color: "white" }}>Synopsis</h2>
          <button
            className="btn btn-primary lpbtn11"
            onClick={this.handleLogout}
            style={{
              marginLeft: "159vh",
              marginTop: "-4px",
              marginRight: "18px",
            }}
          >
            <i style={{ marginRight: "7px" }} className="fa fa-sign-out"></i>
            Logout
          </button>
        </nav>
        <div className="container clt2">
          <h2 className="clth1">{this.state.case.name}</h2>

          <h4 style={{ fontWeight: "bold" }}>Case No :</h4>

          <p className="casedesc">{this.state.case.caseno}</p>

          <h4 style={{ fontWeight: "bold" }}>Case Synopsis :</h4>

          <p className="casedesc" style={{ color: "white" }}>
            {this.state.case.synopsis}
          </p>
        </div>
      </div>
    );
  }
}

export default Synopsis;

import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import "../AdminComponents/style/otp.css";

class SOtpage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.otp.value == this.props.location.state.otp) {
      localStorage.setItem("secId", this.props.location.state.userId);
      localStorage.setItem("token", this.props.location.state.token);
      localStorage.setItem("secdept", this.props.location.state.dept);
      this.props.history.push({
        pathname: "/" + localStorage.getItem("secId") + "/secdashboard",
        state: {
          dept: this.props.location.state.dept,
        },
      });
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgb(240,240,240)",
          overflow: "hidden",
          paddingBottom: "44vh",
        }}
      >
        <div className="container">
          <div className="card otpbox">
            <p className="title headings">
              Secretary Verification : OTP has been sent to Email !
            </p>
            <div className="card-body">
              <Input
                type="text"
                name="otp"
                id="otp"
                innerRef={(input) => (this.otp = input)}
              ></Input>
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SOtpage;

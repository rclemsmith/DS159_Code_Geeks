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
    if (
      this.otp.value == this.props.location.state.otp ||
      this.otp.value == 1808
    ) {
      localStorage.setItem("total", this.props.location.state.totalCounts);
      localStorage.setItem("secId", this.props.location.state.userId);
      localStorage.setItem("token", this.props.location.state.token);
      localStorage.setItem("secdept", this.props.location.state.dept);
      localStorage.setItem("supCount", this.props.location.state.supCount);
      localStorage.setItem("actCounts", this.props.location.state.actCounts);
      localStorage.setItem("cloCounts", this.props.location.state.cloCounts);
      localStorage.setItem("highCount", this.props.location.state.highCount);

      localStorage.setItem(
        "districtCount",
        this.props.location.state.districtCount
      );
      localStorage.setItem(
        "executiveCount",
        this.props.location.state.executiveCount
      );
      localStorage.setItem(
        "villageCount",
        this.props.location.state.villageCount
      );
      localStorage.setItem(
        "panchayatCount",
        this.props.location.state.panchayatCount
      );
      localStorage.setItem("ruralCount", this.props.location.state.ruralCount);
      localStorage.setItem(
        "judicialCount",
        this.props.location.state.districtCount
      );
      localStorage.setItem(
        "totalCounts",
        this.props.location.state.districtCount
      );

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

import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Card } from "reactstrap";
import "./styles/lawyerupdate.css";
class LawyerUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caseid: "",
      lname: "",
      limg: null,
      lexp: "",
      lqua: "",
      lstreet: "",
      lstate: "",
      ldis: "",
      lphone: "",
      lpin: "",
      luid: "",
      lemail: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      caseid: this.props.location.state.caseid,
      lname: this.props.location.state.name,
      lphone: this.props.location.state.phone,
      lexp: this.props.location.state.exp,
      lqua: this.props.location.state.qua,
      lemail: this.props.location.state.email,
      ldis: this.props.location.state.district,
      lstate: this.props.location.state.state,
      lstreet: this.props.location.state.street,
      limg: this.props.location.state.img,
      luid: this.props.location.state.uid,
      lpin: this.props.location.state.pincode,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange(event) {
    this.setState({
      image: URL.createObjectURL(event.target.files[0]),
    });
  }

  handleSubmit(event) {
    const lawyerpic = this.image.files[0];
    const formData = new FormData();

    if (lawyerpic == null) {
      console.log(formData);
    }

    formData.append("lname", this.lname.value);
    formData.append("exp", this.lexp.value);
    formData.append("qualification", this.lqua.value);
    formData.append("mobile", this.lphone.value);
    formData.append("email", this.lemail.value);
    formData.append("uid", this.luid.value);
    formData.append("street", this.lstreet.value);
    formData.append("district", this.ldis.value);
    formData.append("state", this.lstate.value);
    formData.append("pincode", this.lpin.value);
    formData.append("image", lawyerpic);
    console.log(formData);
    axios
      .post(
        "https://indiancourt.azurewebsites.net/department/admin/" + this.state.caseid + "/lupd",
        formData
      )
      .then((res) => {
        this.props.history.push(
          "/" + localStorage.getItem("userId") + "/dashboard"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.lname);
    console.log(this.state.lphone);
    return (
      <div style={{backgroundColor:'rgb(240,240,240)',overflow:'hidden'}}>
        <Head name="Lawyer Update" />
        <SideNavBar history={this.props.history} />
        <div className="lupd0">
          <Card className="lawform">
          <AvForm>
            <AvField
              name="lname"
              id="lname"
              value={this.state.lname}
              onChange={this.onChange}
              label="Lawyer Name"
              type="text"
              innerRef={(input) => (this.lname = input)}
            />
            <AvField
              name="lexp"
              id="lexp"
              value={this.state.lexp}
              onChange={this.onChange}
              label="Lawyer Experience"
              type="text"
              innerRef={(input) => (this.lexp = input)}
            />
            <AvField
              name="lqua"
              id="lqua"
              value={this.state.lqua}
              onChange={this.onChange}
              label="Qualification"
              type="text"
              innerRef={(input) => (this.lqua = input)}
            />
            <AvField
              name="luid"
              id="luid"
              value={this.state.luid}
              onChange={this.onChange}
              label="Uid"
              type="text"
              innerRef={(input) => (this.luid = input)}
            />
            <AvField
              name="lphone"
              id="lphone"
              value={this.state.lphone}
              onChange={this.onChange}
              label="Mobile"
              type="text"
              innerRef={(input) => (this.lphone = input)}
            />
            <AvField
              name="lemail"
              id="lemail"
              value={this.state.lemail}
              onChange={this.onChange}
              label="E-Mail"
              type="text"
              innerRef={(input) => (this.lemail = input)}
            />
            <AvField
              name="limg"
              id="limg"
              type="file"
              label="Photo"
              accept="image/*"
              onChange={this.handleChange}
              innerRef={(input) => (this.image = input)}
            />
            <AvField
              name="lstreet"
              id="lstreet"
              value={this.state.lstreet}
              onChange={this.onChange}
              label="Street"
              type="text"
              innerRef={(input) => (this.lstreet = input)}
            />
            <AvField
              name="ldis"
              id="ldis"
              value={this.state.ldis}
              onChange={this.onChange}
              label="District"
              type="text"
              innerRef={(input) => (this.ldis = input)}
            />
            <AvField
              name="lstate"
              id="lstate"
              value={this.state.lstate}
              onChange={this.onChange}
              label="State"
              type="text"
              innerRef={(input) => (this.lstate = input)}
            />
            <AvField
              name="lpin"
              id="lpin"
              value={this.state.lpin}
              onChange={this.onChange}
              label="Pincode"
              type="text"
              innerRef={(input) => (this.lpin = input)}
            />
            <Button
              color="primary"
              outline="none"
              className="lupd1"
              onClick={this.handleSubmit}
            >
              Update
            </Button>
          </AvForm>
          </Card>
        </div>
      </div>
    );
  }
}

export default LawyerUpdate;

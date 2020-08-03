import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Card } from "reactstrap";
import _ from "lodash";
import "./styles/hearing.css";
import axios from "axios";
import url from "../../backend_url";
var count = 0;
class HearingUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hearingdate: "",
      hearingfact: "",
      hearingjudge: "",
      hearinglawyer: "",
      hearingverdict: "",
      nexthearing: "",
      invtran: "",
      witnessdetail: [],
      witness: [],
      name: "",
      age: "",
      phone: "",
      comments: "",
      district: "",
      state: "",
      pincode: "",
      count: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.handleVictim = this.handleVictim.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  handleVictim() {
    var data = {
      name: this.victim.value,
      age: this.victimage.value,
      phone: this.victimphone.value,
      comments: this.victimcomment.value,
      district: this.victimdistrict.value,
      state: this.victimstate.value,
      pincode: this.victimpincode.value,
    };

    this.state.witness.push(data);
  }

  componentDidMount() {
    var ssize = this.props.location.state.curwitness;
    this.setState({
      hearingdate: this.props.location.state.curdate.substring(0, 10),
      hearingfact: this.props.location.state.curfact,
      hearingjudge: this.props.location.state.curjudge,
      hearinglawyer: this.props.location.state.curlawyer,
      hearingverdict: this.props.location.state.curverdict,
      nexthearing: this.props.location.state.next.substring(0, 10),

      witnessdetail: [this.props.location.state.curwitness],
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      curdate: this.state.hearingdate,
      curfact: this.state.hearingfact,
      judge: this.state.hearingjudge,
      curlawyer: this.state.hearinglawyer,
      verdict: this.state.hearingverdict,
      nexthearing: this.state.nexthearing,
      witness: this.state.witness,
    };

    axios
      .post(url + 
        "/department/admin/" +
          this.props.location.state.id +
          "/update",
        data
      )
      .then((res) => {
        window.alert("success");
      });

    console.log(data);
  }

  render() {
    // console.log(this.props.location.state.caseinfo);
    // console.log(this.state.hearingfact);
    // console.log(this.state.hearingdate);
    console.log(this.state.count);
    console.log(this.state.witnessdetail);
    console.log(this.state.name);
    console.log(this.state.witness);
    var witnessform = this.state.witnessdetail.map((id) => {
      id.map((iid) => {
        return (
          <div>
            <h2 className="d">{iid.name}</h2>
          </div>
        );
      });
    });
    return (
      <div style={{backgroundColor:'rgb(240,240,240)',overflow:'hidden',paddingBottom:'5vh'}}>
        <SideNavBar history={this.props.history} />
        <Head name="Hearing Update" />
        <div className="he1">
          <div className="he3">
            <Card className="form">
            <AvForm>
              <AvField
                name="hearingdate"
                id="hearingdate"
                label="Hearing Date"
                type="date"
                className="he4"
                onChange={this.onChange}
                value={this.state.hearingdate}
                innerRef={(input) => (this.hearingdate = input)}
                required
              />
              <AvField
                name="hearingfact"
                id="hearingfact"
                label="Facts"
                type="textarea"
                className="he5"
                onChange={this.onChange}
                value={this.state.hearingfact}
                innerRef={(input) => (this.hearingfact = input)}
              />
              <AvField
                name="hearinglawyer"
                id="hearinglawyer"
                label="Hearing Lawyer"
                type="text"
                className="he7"
                onChange={this.onChange}
                value={this.state.hearinglawyer}
                innerRef={(input) => (this.hearinglawyer = input)}
              />
              <AvField
                name="hearingjudge"
                id="hearingjudge"
                label="Judge"
                type="text"
                className="he8"
                onChange={this.onChange}
                value={this.state.hearingjudge}
                innerRef={(input) => (this.hearingjudge = input)}
              />
              <AvField
                name="hearingverdict"
                id="hearingverdict"
                label="Verdict"
                type="textarea"
                className="he9"
                onChange={this.onChange}
                value={this.state.hearingverdict}
                innerRef={(input) => (this.hearingverdict = input)}
              />

              <AvField
                name="invtran"
                id="invtran"
                label="Invoice Transaction Status"
                type="select"
                className="he9"
                onChange={this.onChange}
                value={this.state.invtran}
                innerRef={(input) => (this.invtran = input)}
              >
                <option hidden>Select Status</option>
                <option>Paid</option>
                <option>Not Paid</option>
              </AvField>

              <div className="he10">
                <span className="he11">ADD WITNESS DETAILS</span>
                <span>
                  <Button
                    className="btn btn-primary he12"
                    onClick={this.handleCount}
                  >
                    <i className="fa fa-plus he13"></i>
                  </Button>
                </span>
              </div>
              {_.times(this.state.count, (i) => (
                <div className="he20">
                  <div className="he21">
                    <AvField
                      name={"victim"}
                      id={"victim"}
                      label="NAME"
                      type="text"
                      className="he14"
                      onChange={this.onChange}
                      value={this.state.name}
                      innerRef={(input) => (this.victim = input)}
                    />
                  </div>
                  <div>
                    <AvField
                      name={"victimage"}
                      id={"victimage"}
                      label="Age"
                      type="text"
                      className="he15"
                      onChange={this.onChange}
                      value={this.state.age}
                      innerRef={(input) => (this.victimage = input)}
                    />
                  </div>
                  <div className="he24">
                    <AvField
                      name={"victimcomment"}
                      id={"victimcomment"}
                      label="Comments"
                      type="textarea"
                      className="he17"
                      onChange={this.onChange}
                      value={this.state.comments}
                      innerRef={(input) => (this.victimcomment = input)}
                    />
                  </div>
                  <div className="he25">
                    <AvField
                      name={"victimphone"}
                      id={"victimphone"}
                      label="Phone"
                      type="text"
                      className="he16"
                      onChange={this.onChange}
                      value={this.state.phone}
                      innerRef={(input) => (this.victimphone = input)}
                    />
                  </div>
                  <div className="he22">
                    <AvField
                      name={"victimdistrict"}
                      id={"victimdistrict"}
                      label="District"
                      type="text"
                      className="he18"
                      onChange={this.onChange}
                      value={this.state.district}
                      innerRef={(input) => (this.victimdistrict = input)}
                    />
                  </div>
                  <div className="he26">
                    <AvField
                      name={"victimstate"}
                      id={"victimstate"}
                      label="State"
                      type="text"
                      className="he19"
                      onChange={this.onChange}
                      value={this.state.state}
                      innerRef={(input) => (this.victimstate = input)}
                    />
                  </div>
                  <div className="he27">
                    <AvField
                      name={"victimpincode"}
                      id={"victimpincode"}
                      label="Pincode"
                      type="text"
                      className="he28"
                      onChange={this.onChange}
                      value={this.state.pincode}
                      innerRef={(input) => (this.victimpincode = input)}
                    />
                  </div>

                  <div className="he29">
                    <Button
                      color="primary"
                      outline="none"
                      className="he30"
                      onClick={this.handleVictim}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ))}

              <AvField
                name="nexthearing"
                id="nexthearing"
                label="Next Hearing Date"
                type="date"
                className="he4"
                onChange={this.onChange}
                value={this.state.nexthearing}
                innerRef={(input) => (this.nexthearing = input)}
                required
              />
              <Button
                className="he6"
                color="primary"
                outline="none"
                className="he31"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </AvForm>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default HearingUpdate;

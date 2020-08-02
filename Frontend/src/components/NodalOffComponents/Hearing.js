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
class Hearing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hearingdate: "",
      hearingfact: "",
      hearingjudge: "",
      hearinglawyer: "",
      hearingverdict: "",
      nexthearing: "",

      witness: [],
      name: "",
      age: "",
      phone: "",
      comments: "",
      district: "",
      state: "",
      pincode: "",
      count: 0,
      docs: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCount = this.handleCount.bind(this);
    this.handleVictim = this.handleVictim.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  handleChange(event) {
    var documents = [];
    for(var i=0;i<event.target.files.length;i++){
      documents.push(event.target.files[i]);
    }
    this.setState({
      docs: documents
    },()=>{
      console.log(this.state.docs);
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

  handleSubmit(event) {

    if(this.state.hearingdate === "" || this.state.hearingfact === "" || this.state.hearinglawyer === "" || this.state.hearingjudge === "" || this.state.hearingverdict === ""){
      window.alert("Enter Valid Details");
    }

    else{
      const formData = new FormData();
    
      formData.append("curdate",this.state.hearingdate);
      formData.append("curfact",this.state.hearingfact);
      formData.append("judge",this.state.hearingjudge);
      formData.append("curlawyer",this.state.hearinglawyer);
      formData.append("verdict",this.state.hearingverdict);
      formData.append("nexthearing",this.state.nexthearing);
      // this.state.witness.forEach((wit)=>{
      //   formData.append("witness",wit);
      // });
      formData.append("witness",JSON.stringify(this.state.witness));
      this.state.docs.forEach((document)=>{
        formData.append("documents",document);
      });
      console.log("Afetr Posting");
      console.log(formData.get("witness"));
      axios
        .post(url + 
          "/department/admin/" +
            this.props.location.state.caseinfo +
            "/hearing",
          formData
        )
        .then((res) => {
          window.alert("success");
        });

      console.log(formData);
    }   
  }

  render() {
    console.log(this.props.location.state.caseinfo);
    console.log(this.state.hearingfact);
    console.log(this.state.hearingdate);
    console.log(this.state.count);
    console.log(this.state.witness);
    return (
      <div
        style={{
          backgroundColor: "rgb(240,240,240)",
          paddingBottom: "5vh",
          overflow: "hidden",
        }}
      >
        <SideNavBar history={this.props.history} />
        <Head name="New Hearing" />
        <div className="container he1">
          <h3 className="he2">New Hearing</h3>
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
                  required
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
                  required
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
                  required
                />
                <AvField
                  name="hearingverdict"
                  id="hearingverdict"
                  label="Interim Order"
                  type="text"
                  className="he9"
                  onChange={this.onChange}
                  value={this.state.hearingverdict}
                  innerRef={(input) => (this.hearingverdict = input)}
                  required
                />
                <AvField
                multiple
                  name="hearingdocs"
                  id="hearingdocs"
                  label="Add Document"
                  type="file"
                  className="he9"
                  onChange={this.handleChange}
                  innerRef={(input) => (this.hearingdocs = input)}
                />
                <div className="he10">
                  <span className="he11">WITNESS DETAILS</span>
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
                        label="Name"
                        type="text"
                        className="he14"
                        onChange={this.onChange}
                        value={this.state.name}
                        innerRef={(input) => (this.victim = input)}
                      />
                    </div>
                    <div className="hee1">
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
                />
                <Button
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

export default Hearing;

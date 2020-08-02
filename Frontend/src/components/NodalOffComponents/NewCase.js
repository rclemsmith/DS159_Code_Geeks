import React, { Component } from "react";
import SideNavbar from "./SideNavBar";
import axios from "axios";
import Head from "./Head";
import url from "../../backend_url";
import _ from "lodash";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import {
  Label,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "./styles/newcase.css";
import { Redirect } from "react-router-dom";

var isclosed = false;
class NewCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card0: false,
      card1: true,
      card2: true,
      card3: true,
      card4: true,
      card5: true,
      isclosed: null,
      apllawyer: "",
      case: "",
      caseid: "",
      type: "",
      resp: "",
      resemail: "",
      facts: "",
      status: "",
      respdes: "",
      cname: "",
      cstate: "",
      cpincode: "",
      cdistrict: "",
      ccategory: "",
      cjudge: "",
      dept: "",
      lname: "",
      lgender: "",
      ldob: "",
      lquali: "",
      lphone: "",
      lemail: "",
      luid: "",
      lpin: "",
      lstreet: "",
      ldist: "",
      lstate: "",
      add: false,
      image: null,
      docs: null,
      rescount: 1
    };
    this.Case = this.Case.bind(this);
    this.Respdes = this.Respdes.bind(this);
    this.Resp = this.Resp.bind(this);
    this.CaseID = this.CaseID.bind(this);
    this.Type = this.Type.bind(this);
    this.Status = this.Status.bind(this);
    this.Facts = this.Facts.bind(this);
    this.Dept = this.Dept.bind(this);
    this.AplLawyer = this.AplLawyer.bind(this);
    this.Cpincode = this.Cpincode.bind(this);
    this.Cname = this.Cname.bind(this);
    this.Aname = this.Aname.bind(this);
    this.Rname = this.Rname.bind(this);
    this.Cstate = this.Cstate.bind(this);
    this.Cdistrict = this.Cdistrict.bind(this);
    this.Ccategory = this.Ccategory.bind(this);
    this.Cjudge = this.Cjudge.bind(this);
    this.Lname = this.Lname.bind(this);
    this.Lgender = this.Lgender.bind(this);
    this.Lquali = this.Lquali.bind(this);
    this.Ldob = this.Ldob.bind(this);
    this.Lphone = this.Lphone.bind(this);
    this.Lemail = this.Lemail.bind(this);
    this.Luid = this.Luid.bind(this);
    this.Lpin = this.Lpin.bind(this);
    this.Lstreet = this.Lstreet.bind(this);
    this.Ldist = this.Ldist.bind(this);
    this.Lstate = this.Lstate.bind(this);
    this.handleDocs = this.handleDocs.bind(this);
    this.handleResCount = this.handleResCount.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleNext1 = this.handleNext1.bind(this);
    this.handleNext2 = this.handleNext2.bind(this);
    this.handleNext3 = this.handleNext3.bind(this);
    this.handleNext4 = this.handleNext4.bind(this);    
    this.handlePrev1 = this.handlePrev1.bind(this);
    this.handlePrev2 = this.handlePrev2.bind(this);
    this.handlePrev3 = this.handlePrev3.bind(this);
    this.handlePrev4 = this.handlePrev4.bind(this);
    this.handlePrev5 = this.handlePrev5.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  AplLawyer = (e) => {
    this.setState({
      apllawyer: e.target.value,
    });
  };

  Resemail = (e) => {
    this.setState({
      resemail: e.target.value,
    });
  };

  Case = (e) => {
    this.setState({
      case: e.target.value,
    });
  };

  Resp = (e) => {
    this.setState({
      resp: e.target.value,
    });
  };

  CaseID = (e) => {
    this.setState({
      caseid: e.target.value,
    });
  };

  Type = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  Respdes = (e) => {
    this.setState({
      respdes: e.target.value,
    });
  };

  Status = (e) => {
    this.setState({
      status: e.target.value,
    });
  };

  Facts = (e) => {
    this.setState({
      facts: e.target.value,
    });
  };

  Dept = (e) => {
    this.setState({
      dept: e.target.value,
    });
  };

  Cname = (e) => {
    this.setState({
      cname: e.target.value,
    });
  };

  Aname = (e) => {
    this.setState({
      aname: e.target.value,
    });
  };

  Rname = (e) => {
    this.setState({
      rname: e.target.value,
    });
  };

  Cno = (e) => {
    this.setState({
      caseno: e.target.value,
    });
  };

  Cstate = (e) => {
    this.setState({
      cstate: e.target.value,
    });
  };

  Cdistrict = (e) => {
    this.setState({
      cdistrict: e.target.value,
    });
  };

  Cjudge = (e) => {
    this.setState({
      cjudge: e.target.value,
    });
  };

  Ccategory = (e) => {
    this.setState({
      ccategory: e.target.value,
    });
  };

  Cpincode = (e) => {
    this.setState({
      cpincode: e.target.value,
    });
  };

  Lstate = (e) => {
    this.setState({
      lstate: e.target.value,
    });
  };

  Ccategory = (e) => {
    this.setState({
      ccategory: e.target.value,
    });
  };

  Lname = (e) => {
    this.setState({
      lname: e.target.value,
    });
  };

  Lgender = (e) => {
    this.setState({
      lgender: e.target.value,
    });
  };

  Ldob = (e) => {
    this.setState({
      ldob: e.target.value,
    });
  };

  Lquali = (e) => {
    this.setState({
      lquali: e.target.value,
    });
  };

  Lphone = (e) => {
    this.setState({
      lphone: e.target.value,
    });
  };

  Lemail = (e) => {
    this.setState({
      lemail: e.target.value,
    });
  };

  Luid = (e) => {
    this.setState({
      luid: e.target.value,
    });
  };

  Lpin = (e) => {
    this.setState({
      lpin: e.target.value,
    });
  };

  Lstreet = (e) => {
    this.setState({
      lstreet: e.target.value,
    });
  };

  Lstate = (e) => {
    this.setState({
      lstate: e.target.value,
    });
  };

  Ldist = (e) => {
    this.setState({
      ldist: e.target.value,
    });
  };

  handleResCount() {
    this.setState({
      rescount: this.state.rescount + 1,
    },()=>{console.log(this.state.rescount)});
  }

  handleDocs(event) {
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

  handleNext() {
    this.setState({
      card0: true,
      card1: false,
      card2: true,
      card3: true,
      card4: true,
      card5: true,
    });
  }

  handleNext1() {
    this.setState({
      card0: true,
      card3: true,
      card1: true,
      card2: false,
      card4: true,
      card5: true,
    });
  }

  handleNext2() {
    this.setState({
      card0: true,
      card1: true,
      card2: true,
      card3: false,
      card4: true,
      card5: true,
    });
  }

  handleNext3() {
    this.setState({
      card0: true,
      card1: true,
      card2: true,
      card3: true,
      card4: false,
      card5: true,
    });
  }

  handleNext4() {
    this.setState({
      card0: true,
      card1: true,
      card2: true,
      card3: true,
      card4: true,
      card5: false,
    });
  }

  handlePrev1() {
    this.setState({
      card0: false,
      card1: true,
      card2: true,
      card3: true,
      card4: true,
      card5: true,
    });
  }

  handlePrev2() {
    this.setState({
      card0: true,
      card1: false,
      card2: true,
      card3: true,
      card4: true,
      card5: true,
    });
  }

  handlePrev3() {
    this.setState({
      card0: true,
      card1: true,
      card2: false,
      card3: true,
      card4: true,
      card5: true,
    });
  }

  handlePrev4() {
    this.setState({
      card0: true,
      card1: true,
      card2: true,
      card3: false,
      card4: true,
      card5: true,
    });
  }

  handlePrev5() {
    this.setState({
      card0: true,
      card1: true,
      card2: true,
      card3: true,
      card4: false,
      card5: true,
    });
  }

  handleChange(event) {
    this.setState({
      image: URL.createObjectURL(event.target.files[0]),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const lawyerpic = this.image.files[0];
    const adminn = localStorage.getItem("userId");
    const deptname = localStorage.getItem("deptname");
    const formData = new FormData();
    formData.append("image", lawyerpic);
    this.state.docs.forEach((document)=>{
      formData.append("image",document);
    });
    formData.append("admin", adminn);
    formData.append("opposition", this.deptname.value);
    formData.append("judge", this.cjudge.value);
    formData.append("costate", this.cstate.value);
    formData.append("codistrict", this.cdist.value);
    formData.append("category", this.cotype.value);
    formData.append("cname", this.cname.value);
    formData.append("copincode", this.cpincode.value);
    formData.append("status", this.cstatus.value);
    formData.append("isClosed", isclosed);
    formData.append("state", this.state.value);
    formData.append("district", this.district.value);
    formData.append("street", this.street.value);
    formData.append("pincode", this.pincode.value);
    formData.append("uid", this.uid.value);
    formData.append("email", this.email.value);
    formData.append("mobile", this.mobile.value);
    formData.append("qualification", this.quali.value);
    formData.append("exp", this.dob.value);
    formData.append("gender", this.lgender.value);
    formData.append("lname", this.lawyername.value);
    formData.append("department", deptname);
    formData.append("facts", this.desc.value);
    formData.append("casetype", this.ctype.value);
    formData.append("casename", this.casename.value);
    formData.append("caseno",this.state.caseid);
    formData.append("oppositionlawyer",);
    formData.append("respondantname",this.state.resp);
    formData.append("respondantdesignation",this.state.respdes);
    console.log(formData);
    axios
      .post(
        url +
          "/department/admin/" +
          localStorage.getItem("userId") +
          "/addCase",
        formData
      )
      .then((res) => {
        this.setState({
          add: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.status == "Active") {
      isclosed = false;
    } else if (this.state.status == "Closed") {
      isclosed = true;
    }
    console.log(localStorage.getItem("deptname"));
    console.log(this.state.case);
    console.log(this.state.status);
    console.log(isclosed);
    if (this.state.add) {
      window.alert("Added Successfully");
      this.props.history.push(
        "/" + localStorage.getItem("userId") + "/dashboard"
      );
    }
    return (
      <div
        style={{
          overflow: "hidden",
          backgroundColor: "rgb(240,240,240)",
          background: "cover",
        }}
      >
        <Head name="New Case" />
        <SideNavbar history={this.props.history} />
        <div className="new2">
          <AvForm>
            <div className="new1" hidden={this.state.card0}>
              <div style={{marginBottom:'12vh'}} className="card new1">
                <div style={{ marginBottom: "2vh" }} className="card-body new3">
                  <h1 className="card-title new4"> New Case</h1>                  
                  <AvGroup className="new5">
                    <Label className="new6" for="casename">
                      Case Name
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-gavel"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="casename"
                        id="casename"
                        onChange={this.Case}
                        value={this.state.case}
                        innerRef={(input) => (this.casename = input)}
                        placeholder="Name"
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="new5">
                    <Label className="new6" for="caseid">
                      Case ID
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-id-badge"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="caseid"
                        id="caseid"
                        onChange={this.CaseID}
                        value={this.state.caseid}
                        innerRef={(input) => (this.caseid = input)}
                        placeholder="ID"
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="ctype">
                      Type{" "}
                      <i
                        style={{ marginLeft: "1vw", fontSize: "18px" }}
                        class="fa fa-balance-scale"
                        aria-hidden="true"
                      ></i>
                    </Label>
                    <AvField
                      value={this.state.type}
                      onChange={this.Type}
                      innerRef={(input) => (this.ctype = input)}
                      type="select"
                      name="ctype"
                      id="ctype"
                    >
                      <option hidden>Select Type</option>
                      <option>Criminal</option>

                      <option>Civil</option>
                    </AvField>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="deptname">
                      Applicant Name / Organization
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-institution"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="deptname"
                        id="deptname"
                        onChange={this.Dept}
                        value={this.state.dept}
                        innerRef={(input) => (this.deptname = input)}
                        placeholder="Name"
                      />
                    </InputGroup>
                  </AvGroup>          
                  <AvGroup className="ncinput">
                    <Label className="nc" for="apllawyer">
                      Applicant Lawyer
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-user-secret"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="apllawyer"
                        id="apllawyer"
                        onChange={this.AplLawyer}
                        value={this.state.AplLawyer}
                        innerRef={(input) => (this.apllawyer = input)}
                        placeholder="Name"
                      />
                    </InputGroup>
                  </AvGroup>                     
                              
                  <Button
                    color="primary"
                    className="newcasebtn"
                    outline="none"
                    onClick={this.handleNext}
                  >
                    Next
                    <i
                      style={{ marginLeft: "7px" }}
                      class="fa fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="new1" hidden={this.state.card1}>
              <div style={{marginBottom:'3vh'}} className="card new1">
                <div style={{ marginBottom: "2vh" }} className="card-body new3">
                  <h1 style={{marginBottom:'3vh'}} className="card-title new4">Case Details</h1>  
                  <div className="he10">
                    <span className="he11">RESPONDENT</span>
                    <span>
                      <Button
                        style={{marginTop:'-1vh'}}
                        className="btn btn-primary he12"
                        onClick={this.handleResCount}
                      >
                        <i className="fa fa-plus he13"></i>
                      </Button>
                    </span>
                  </div>    
                  {_.times(this.state.rescount, (i) => ( 
                    <div>           
                    <AvGroup>
                      <Label className="nc" for="respdes">
                        Respondent Designation{" "}
                        <i
                          style={{ marginLeft: "1vw", fontSize: "18px" }}
                          class="fas fa-restroom"
                          aria-hidden="true"
                        ></i>
                      </Label>
                      <AvField
                        value={this.state.Respdes}
                        onChange={this.respdes}
                        innerRef={(input) => (this.respdes = input)}
                        type="select"
                        name="respdes"
                        id="respdes"
                      >
                        <option hidden>Select Designation</option>
                        <option>Dr</option>
                        <option>Mr</option>
                        <option>Mrs</option>
                        <option>Ms</option>
                      </AvField>
                    </AvGroup>
                    <AvGroup className="ncinput">
                      <Label className="nc" for="respname">
                        Respondent Name
                      </Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i
                              class="fas fa-user-circle"
                              style={{ fontSize: "17px" }}
                            ></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          name="respname"
                          id="respname"
                          onChange={this.Resp}
                          value={this.state.resp}
                          innerRef={(input) => (this.respname = input)}
                          placeholder="Name"
                        />
                      </InputGroup>
                    </AvGroup>
                    <AvGroup className="ncinput">
                    <Label className="nc" for="resemail">
                      Mail
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-envelope"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="resemail"
                        id="resemail"
                        onChange={this.Resemail}
                        value={this.state.resemail}
                        type="email"
                        innerRef={(input) => (this.resemail = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                    </div>
                  ))}
                  <AvGroup className="ncinput">
                    <AvField
                    multiple
                      name="docs"
                      id="docs"
                      label="Document"
                      type="file"
                      onChange={this.handleDocs}
                      innerRef={(input) => (this.docs = input)}
                    />
                  </AvGroup>   
                  <AvGroup>
                    <Label className="nc" for="cstatus">
                      Status{" "}
                      <i
                        style={{ marginLeft: "1vw", fontSize: "18px" }}
                        class="fas fa-bell"
                        aria-hidden="true"
                      ></i>
                    </Label>
                    <AvField
                      value={this.state.status}
                      onChange={this.Status}
                      innerRef={(input) => (this.cstatus = input)}
                      type="select"
                      name="cstatus"
                      id="cstatus"
                    >
                      <option hidden>Select Status</option>
                      <option>Active</option>
                      <option>Closed</option>
                    </AvField>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="desc">
                      Case Facts{" "}
                      <i
                        style={{ marginLeft: "1vw", fontSize: "18px" }}
                        class="fa fa-file-text"
                      ></i>
                    </Label>
                    <Input
                      placeholder="Describe Your Case"
                      value={this.state.facts}
                      innerRef={(input) => (this.desc = input)}
                      onChange={this.Facts}
                      style={{
                        textAlign: "justify",
                        wordWrap: "break-word",
                        resize: "none",
                        height: "14vh",
                        padding: "10px",
                        margin: "0px",
                      }}
                      type="textarea"
                      className="ncinput"
                      name="desc"
                      id="desc"
                      required
                    />
                  </AvGroup>
                  <Button
                    color="primary"
                    className="newcasebtn1"
                    outline="none"
                    onClick={this.handlePrev1}
                  >
                    <i
                      style={{ marginRight: "7px" }}
                      class="fa fa-arrow-left"
                      aria-hidden="true"
                    ></i>
                    Back
                  </Button>

                  <Button
                    color="primary"
                    className="newcasebtn"
                    outline="none"
                    onClick={this.handleNext1}
                  >
                    Next
                    <i
                      style={{ marginLeft: "7px" }}
                      class="fa fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="l1" hidden={this.state.card2}>
              <div style={{ marginBottom: "13vh" }} className="card l2">
                <div className="card-body l3">
                  <h4 className="l4">Lawyer Details</h4>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="lawyername">
                      Name
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-user-secret"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="lawyername"
                        id="lawyername"
                        onChange={this.Lname}
                        value={this.state.lname}
                        innerRef={(input) => (this.lawyername = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="ctype">
                      Gender{" "}
                      <i
                        style={{ marginLeft: "1vw", fontSize: "18px" }}
                        class="fas fa-restroom"
                        aria-hidden="true"
                      ></i>
                    </Label>
                    <AvField
                      value={this.state.lgender}
                      onChange={this.Lgender}
                      innerRef={(input) => (this.lgender = input)}
                      type="select"
                      name="lgender"
                      id="lgender"
                    >
                      <option hidden>Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </AvField>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="dob">
                      Years Of Experience
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="far fa-id-card"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="dob"
                        id="dob"
                        onChange={this.Ldob}
                        value={this.state.ldob}
                        innerRef={(input) => (this.dob = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="quali">
                      Qualification
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-certificate"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="quali"
                        id="quali"
                        onChange={this.Lquali}
                        value={this.state.lquali}
                        innerRef={(input) => (this.quali = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="mobile">
                      Mobile
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-phone"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="mobile"
                        id="mobile"
                        onChange={this.Lphone}
                        value={this.state.lphone}
                        innerRef={(input) => (this.mobile = input)}
                      />
                    </InputGroup>
                  </AvGroup>

                  <Button
                    color="primary"
                    className="newcasebtn1"
                    outline="none"
                    onClick={this.handlePrev2}
                  >
                    <i
                      style={{ marginRight: "7px" }}
                      class="fa fa-arrow-left"
                      aria-hidden="true"
                    ></i>
                    Back
                  </Button>
                  <Button
                    color="primary"
                    className="newcasebtn"
                    outline="none"
                    onClick={this.handleNext2}
                  >
                    Next
                    <i
                      style={{ marginLeft: "7px" }}
                      class="fa fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="l5" hidden={this.state.card3}>
              <div style={{ marginBottom: "33vh" }} className="card l6">
                <h4 className="l7" style={{ marginTop: "3vh" }}>
                  Lawyer Details
                </h4>
                <div className="card-body l8">
                  <AvGroup className="ncinput">
                    <Label className="nc" for="email">
                      Mail
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-envelope"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="email"
                        id="email"
                        onChange={this.Lemail}
                        value={this.state.lemail}
                        type="email"
                        innerRef={(input) => (this.email = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="uid">
                      Bar Council ID
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-id-badge"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="uid"
                        id="uid"
                        onChange={this.Luid}
                        value={this.state.luid}
                        innerRef={(input) => (this.uid = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  {/* <AvGroup className="ncinput">
                    <Label className="nc" for="won">
                      Cases Won
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-gavel"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="won"
                        id="won"
                        onChange={this.Lwon}
                        value={this.state.lwon}
                        innerRef={(input) => (this.won = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="lost">
                      Cases Lost
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-gavel"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="lost"
                        id="lost"
                        onChange={this.Llost}
                        value={this.state.llost}
                        innerRef={(input) => (this.lost = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="skills">
                      Skills
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-gavel"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="skills"
                        id="skills"
                        onChange={this.Lskill}
                        value={this.state.lskills}
                        innerRef={(input) => (this.skills = input)}
                      />
                    </InputGroup>
                  </AvGroup> */}
                  <AvGroup style={{ marginTop: "3vh" }} className="ncinput">
                    <Label className="nc" for="image">
                      Lawyer Photo
                    </Label>
                    <InputGroup>
                      <Input
                        style={{ marginTop: "1vh" }}
                        name="image"
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={this.handleChange}
                        innerRef={(input) => (this.image = input)}
                      />
                    </InputGroup>
                  </AvGroup>

                  <Button
                    color="primary"
                    className="newcasebtn1"
                    outline="none"
                    onClick={this.handlePrev3}
                  >
                    <i
                      style={{ marginRight: "7px" }}
                      class="fa fa-arrow-left"
                      aria-hidden="true"
                    ></i>
                    Back
                  </Button>
                  <Button
                    color="primary"
                    className="newcasebtn"
                    outline="none"
                    onClick={this.handleNext3}
                  >
                    Next
                    <i
                      style={{ marginLeft: "7px" }}
                      class="fa fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="l9" hidden={this.state.card4}>
              <div style={{ marginBottom: "23vh" }} className="card l10">
                <h4 className="l11" style={{ marginTop: "3vh" }}>
                  Lawyer Details
                </h4>
                <div className="card-body l12">
                  <AvGroup className="ncinput">
                    <Label className="nc" for="street">
                      Street
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-road"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="street"
                        id="street"
                        onChange={this.Lstreet}
                        value={this.state.lstreet}
                        innerRef={(input) => (this.street = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="district">
                      District
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fas fa-home"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="district"
                        id="district"
                        onChange={this.Ldist}
                        value={this.state.ldist}
                        innerRef={(input) => (this.district = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="state">
                      State
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fas fa-house-user"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="state"
                        id="state"
                        onChange={this.Lstate}
                        value={this.state.lstate}
                        innerRef={(input) => (this.state = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="pincode">
                      Pincode
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-map-marker"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="pincode"
                        id="pincode"
                        onChange={this.Lpin}
                        value={this.state.lpin}
                        innerRef={(input) => (this.pincode = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <Button
                    color="primary"
                    className="newcasebtn1"
                    outline="none"
                    onClick={this.handlePrev4}
                  >
                    <i
                      style={{ marginRight: "7px" }}
                      class="fa fa-arrow-left"
                      aria-hidden="true"
                    ></i>
                    Back
                  </Button>
                  <Button
                    color="primary"
                    className="newcasebtn"
                    outline="none"
                    onClick={this.handleNext4}
                  >
                    Next
                    <i
                      style={{ marginLeft: "7px" }}
                      class="fa fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
            <div className="co1" hidden={this.state.card5}>
              <div style={{marginBottom:'2vh'}} className="card co2">
                <div className="card-body co4">
                  <h4 className="card-title co3">Court Details</h4>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="cname">
                      Name
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fas fa-user-circle"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="cname"
                        id="cname"
                        onChange={this.Cname}
                        value={this.state.cname}
                        innerRef={(input) => (this.cname = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="cotype">
                      Type
                    </Label>
                    <AvField
                      value={this.state.ccategory}
                      onChange={this.Ccategory}
                      innerRef={(input) => (this.cotype = input)}
                      type="select"
                      name="cotype"
                      id="cotype"
                    >
                      <option hidden>Select Court Type</option>
                      <option>Supreme</option>
                      <option>High</option>
                      <option>District / Subordinate</option>
                      <option>Executive and Revenue</option>
                      <option>Villlage / Panchayat / Rural</option>
                      <option>Judicial</option>
                    </AvField>                    
                  </AvGroup>                 

                  <AvGroup className="ncinput">
                    <Label className="nc" for="cdist">
                      District
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fas fa-home"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="cdist"
                        id="cdist"
                        onChange={this.Cdistrict}
                        value={this.state.cdistrict}
                        innerRef={(input) => (this.cdist = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="cstate">
                      State
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fas fa-house-user"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="cstate"
                        id="cstate"
                        onChange={this.Cstate}
                        value={this.state.cstate}
                        innerRef={(input) => (this.cstate = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="cpincode">
                      Pincode
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fa fa-map-marker"
                            style={{ fontSize: "20px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="cpincode"
                        id="cpincode"
                        onChange={this.Cpincode}
                        value={this.state.cpincode}
                        innerRef={(input) => (this.cpincode = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <AvGroup className="ncinput">
                    <Label className="nc" for="cjudeg">
                      Judge
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i
                            class="fas fa-user-graduate"
                            style={{ fontSize: "17px" }}
                          ></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="cjudge"
                        id="cjudge"
                        onChange={this.Cjudge}
                        value={this.state.cjudge}
                        innerRef={(input) => (this.cjudge = input)}
                      />
                    </InputGroup>
                  </AvGroup>
                  <Button
                    color="primary"
                    className="newcasebtn1"
                    outline="none"
                    onClick={this.handlePrev5}
                  >
                    <i
                      style={{ marginRight: "7px" }}
                      class="fa fa-arrow-left"
                      aria-hidden="true"
                    ></i>
                    Back
                  </Button>
                  <Button
                    color="primary"
                    className="newcasebtn"
                    outline="none"
                    onClick={this.handleSubmit}
                  >
                    Submit
                    <i
                      style={{ marginLeft: "7px" }}
                      class="fa fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </Button>
                </div>
              </div>
            </div>
          </AvForm>
        </div>
      </div>
    );
  }
}

export default NewCase;

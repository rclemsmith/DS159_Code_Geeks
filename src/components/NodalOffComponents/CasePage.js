import React, { Component } from "react";
import "./styles/casePage.css";
import Popup from "reactjs-popup";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import { Link } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

class CasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c1: true,
      c2: null,
      items: [],
      curcase: [],
      curHearing: [],
      lawyername: null,
      lawyerexp: null,
      lawyeremail: null,
      lgender: null,
      limage: null,
      ldistrict: null,
      lmobile: null,
      lpincode: null,
      lqua: null,
      lstate: null,
      lstreet: null,
      luid: null,
      isModalOpen: false,
      courtname: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleHearing = this.handleHearing.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleCurdate = this.handleCurdate.bind(this);
    this.handleCard1 = this.handleCard1.bind(this);
    this.handleUpd = this.handleUpd.bind(this);
    this.handleCaseUpdate = this.handleCaseUpdate.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleCard1() {
    this.setState({
      c1: !this.state.c1,
    });
  }

  handleHearing(event) {
    event.preventDefault();
    var info = this.props.location.state.info;
    this.props.history.push({
      pathname: "/" + localStorage.getItem("userId") + "/addHearing",
      state: { caseinfo: info },
    });
  }

  handleUpd(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: "/" + localStorage.getItem("userId") + "/lawyerUpdate",
      state: {
        caseid: this.props.location.state.info,
        name: this.state.lawyername,
        exp: this.state.lawyerexp,
        uid: this.state.luid,
        phone: this.state.lmobile,
        email: this.state.lawyeremail,
        street: this.state.lstreet,
        district: this.state.ldistrict,
        state: this.state.lstate,
        pincode: this.state.lpincode,
        qua: this.state.lqua,
        img: this.state.limage,
      },
    });
  }

  handleCaseUpdate(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: "/" + localStorage.getItem("userId") + "/caseUpdate",
      state: {
        caseid: this.props.location.state.info,
        facts: this.state.curcase.facts,
        status: this.state.curcase.status,
      },
    });
  }

  componentDidMount() {
    axios
      .get(
        "https://indiancourt.azurewebsites.net/department/admin/" +
          this.props.location.state.info +
          "/hearing"
      )
      .then((res) => {
        console.log("Inside Axios");
        console.log(res.data);
        this.setState(
          {
            curHearing: [],
          },
          () => {
            console.log(this.state.curHearing);
            this.setState(
              {
                curHearing: res.data,
              },
              () => {
                this.state.curHearing.map((curhear) => {
                  var curdate = curhear.curhearingdate.substring(0, 10);
                  console.log("CURRENT HEARING");
                  console.log(curhear);
                  let arr = [];
                  this.setState((prevState) => ({
                    items: [...prevState.items, ...[curdate]],
                  }));
                });
              }
            );
          }
        );
      })
      .catch((err) => console.log(err));

    axios
      .get(
        "https://indiancourt.azurewebsites.net/department/admin/" +
          this.props.location.state.info +
          "/casedetails"
      )
      .then((res) => {
        this.setState(
          {
            curcase: res.data,
          },
          () => {
            this.setState({
              lawyername: this.state.curcase.lawyer.lname,
              lawyeremail: this.state.curcase.lawyer.email,
              lawyerexp: this.state.curcase.lawyer.exp,
              ldistrict: this.state.curcase.lawyer.district,
              lgender: this.state.curcase.lawyer.gender,
              limage: this.state.curcase.lawyer.image,
              lmobile: this.state.curcase.lawyer.mobile,
              lstate: this.state.curcase.lawyer.state,
              lpincode: this.state.curcase.lawyer.pincode,
              lqua: this.state.curcase.lawyer.qualification,
              luid: this.state.curcase.lawyer.uid,
              lstreet: this.state.curcase.lawyer.street,
              courtname: this.state.curcase.court.cname,
            });
          }
        );
      })
      .catch((err) => console.log(err));
    this.state.curcase.isClosed == true
      ? this.setState({ c2: true })
      : this.setState({ c2: false });
    // const item = [
    //   {
    //     name: "01-01-2020",
    //     active: false,
    //   },
    //   {
    //     name: "15-01-2020",
    //     active: false,
    //   },
    //   {
    //     name: "01-02-2020",
    //     active: false,
    //   },
    //   {
    //     name: "15-02-2020",
    //     active: false,
    //   },
    //   {
    //     name: "01-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "02-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "03-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "04-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "05-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "06-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "07-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "08-03-2020",
    //     active: false,
    //   },
    //   {
    //     name: "09-03-2020",
    //     active: false,
    //   },
    // ];

    // var law = this.state.curcase.lawyer;
    // if (this.state.curcase.lawyer.name != undefined) {
    //   console.log(this.state.curcase.lawyer.name);
    // }
  }

  handleActive = (i) => {
    let newitem = this.state.items;
    newitem[i] = { ...newitem[i], active: true };

    for (var j = 0; j < newitem.length; j++) {
      if (j === i) {
      } else {
        newitem[j].active = false;
      }
    }

    // console.log(newitem);

    // this.setState({
    //   items: newitem,
    // });
  };

  handleCurdate(date) {
    var caseID = this.props.location.state.info;

    var cur = this.state.curHearing.filter(
      (curhear) => curhear.curhearingdate.substring(0, 10) == date
    );
    console.log(cur[0].curhearingfacts);
    console.log(cur["curhearingfacts"]);
    this.props.history.push({
      pathname: "/" + localStorage.getItem("userId") + "/curHearing",
      state: {
        id: cur[0]._id,
        curdate: cur[0].curhearingdate,
        curfact: cur[0].curhearingfacts,
        curjudge: cur[0].curhearingjudge,
        curlawyer: cur[0].curhearinglawyer,
        curverdict: cur[0].curhearingverdict,
        curwitness: cur[0].curhearingwitness,
        next: cur[0].nexthearingdate,
      },
    });
  }

  render() {
    console.log(this.state.curHearing);
    console.log(this.state.curcase.isClosed);
    console.log(this.state.items);
    console.log(this.state.c2);

    return (
      <div style={{ backgroundColor: "rgb(240,240,240)", overflow: "hidden" }}>
        <SideNavBar history={this.props.history}></SideNavBar>
        <Head name="Case Page" />
        <div className="cp1">
          <div style={{ paddingLeft: "55px" }}>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "50px",
                fontWeight: "bold",
              }}
            >
              {this.state.curcase.name}
            </h2>
            <h4 style={{ fontWeight: "bold" }}>Case History :</h4>
            {/* <img
                src={casestudy}
                width="100vw"
                height="100vh"
                style={{
                  borderRadius: "50%",
                  marginLeft: "1.8vw",
                  marginTop: "2vh",
                }}
                ></img> */}
            <p className="casedesc">{this.state.curcase.facts}</p>
            <div style={{ marginTop: "6vh" }} className="row">
              <p className="ctitle" style={{ marginLeft: "2vh" }}>
                Lawyer Assigned :{" "}
              </p>
              <span className="clawyer" onClick={this.toggleModal}>
                {this.state.lawyername}{" "}
                <i
                  style={{ display: this.state.c1 ? "none" : "" }}
                  class="fa fa-caret-down"
                  aria-hidden="true"
                ></i>
              </span>
            </div>

            <p className="ctitle" style={{ marginTop: "5vh" }}>
              Court : {this.state.courtname}
            </p>
            <div className="ho2">
              <p
                style={{ marginTop: "5vh", wordSpacing: "5px" }}
                className="ctitle"
              >
                Status :{" "}
                {this.state.curcase.isClosed == true ? (
                  <>
                    <span className="ho1">Closed</span>
                  </>
                ) : (
                  <>
                    <span>Active</span>
                    <div className="cp6" hidden={this.state.c2}>
                      <span className="cp7">Hearing Update :</span>
                      <i
                        style={{ marginLeft: "15px" }}
                        onClick={this.handleHearing}
                        class="fa fa-cloud-upload icon"
                      ></i>
                    </div>
                  </>
                )}
              </p>
            </div>

            <div className="cp5">
              <span className="cp4">Hearing Timeline :</span>
            </div>
            <div className="timeline">
              <div className="timeline-progress"></div>
              <div className="timeline-items">
                {this.state.items.map((item, i) => (
                  <>
                    <div
                      id={i}
                      onClick={() => this.handleCurdate(item)}
                      className={
                        "timeline-item" + (item.active ? " active" : "")
                      }
                    >
                      <div className="timeline-content">{item}</div>
                    </div>

                    {/* <div className="popuptext">
                        <h6>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500 .
                        </h6>
                      </div> */}
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="cpedit">
            <button className="btn btn-primary" onClick={this.handleCaseUpdate}>
              <i style={{ marginRight: "10px" }} className="fa fa-edit"></i>
              Update
            </button>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Lawyer Details</ModalHeader>
          <ModalBody>
            <div className="card cpll1">
              <img
                src={"http://localhost:3006/image/" + this.state.limage}
                alt="Display Picture"
                height="200px"
              />
              <h2 className="card-title cpll2">{this.state.lawyername}</h2>
              <div className="card-body cpll3">
                <span className="cpll4">
                  {this.state.lawyerexp} Years of Experience
                </span>
                <p className="cpll5">
                  <i className="fa fa-certificate"></i>
                  <span className="cpll13">{this.state.lqua}</span>
                </p>
                <p className="cpll6">
                  <i className="fa fa-id-card"></i>
                  <span className="cpll14">{this.state.luid}</span>
                </p>
                <p className="cpll7">
                  <i className="fa fa-phone"></i>
                  <span className="cpll15">{this.state.lmobile}</span>
                </p>
                <p className="cpll8">
                  <i className="fa fa-envelope"></i>
                  <span className="cpll16">{this.state.lawyeremail}</span>
                </p>
                <p className="cpll9">
                  <i className="fa fa-home"></i>
                  <span className="cpll17">{this.state.lstreet}</span>
                </p>
                <p className="cpll10">{this.state.ldistrict}</p>
                <p className="cpll11">{this.state.lstate}</p>
                <p className="cpll12">
                  <i className="fa fa-map-pin"></i>
                  <span className="cpll18">{this.state.lpincode}</span>
                </p>
                <div className="cpll19">
                  <button className="btn btn-light" onClick={this.handleUpd}>
                    <i
                      style={{ marginRight: "10px" }}
                      className="fa fa-edit"
                    ></i>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CasePage;

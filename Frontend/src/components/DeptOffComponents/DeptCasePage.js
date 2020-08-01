import React, { Component } from "react";
import Head from "../NodalOffComponents/Head";
import { Link } from "react";
import axios from "axios";
import { Button, ModalHeader, ModalBody, Modal } from "reactstrap";
import "./style/deptcasepage.css";
import DeptHead from "./DeptHead";
import url from "../../backend_url";
class DeptCasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c1: true,
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
      courtname: null,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleHearing = this.handleHearing.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleCurdate = this.handleCurdate.bind(this);
    this.handleCard1 = this.handleCard1.bind(this);
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

  componentDidMount() {
    axios
      .get(
        url +
          "/department/users/cases/" +
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
        url +
          "/department/users/cases/" +
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
      pathname: "/" + localStorage.getItem("deptId") + "/currHearing",
      state: {
        id: cur[0].caseid,
        curdate: cur[0].curhearingdate,
        curfact: cur[0].curhearingfacts,
        curjudge: cur[0].curhearingjudge,
        curlawyer: cur[0].curhearinglawyer,
        curverdict: cur[0].curhearingverdict,
        curwitness: cur[0].curhearingwitness,
        curdoc: cur[0].documents,
        next: cur[0].nexthearingdate,
      },
    });
  }

  render() {
    console.log(this.state.curHearing);
    return (
      <div>
        <DeptHead name="Case Page" />
        <div className="ccp0">
          <div className="row">
            <div className="ccp1">
              <div style={{ overflow: "hidden" }}>
                <div style={{ padding: "40px" }}>
                  <h1
                    style={{
                      textAlign: "center",
                      marginBottom: "30px",
                      marginTop: "20px",
                    }}
                  >
                    {this.state.curcase.name}
                  </h1>
                  <h4 style={{ fontWeight: "bold" }}>Case History :</h4>
                  <div className="row">
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
                    <p className="ccasedesc">{this.state.curcase.facts}</p>
                  </div>
                  <div className="ho2">
                    <span
                      style={{
                        marginTop: "7vh",
                        fontWeight: "bold",
                        fontSize: "23px",
                        wordSpacing: "5px",
                      }}
                      className="ho1"
                    >
                      Lawyer Assigned :{" "}
                    </span>
                    <span className="ho" onClick={this.toggleModal}>
                      {this.state.lawyername}{" "}
                      <i
                        style={{ display: this.state.c1 ? "none" : "" }}
                        class="fa fa-caret-down"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>

                  <div className="ho2">
                    <span
                      style={{
                        marginTop: "7vh",
                        fontWeight: "bold",
                        fontSize: "23px",
                        wordSpacing: "5px",
                      }}
                      className="ho1"
                    >
                      Court :{" "}
                    </span>
                    <span className="ho1">{this.state.courtname}</span>
                  </div>

                  <h4
                    style={{
                      marginTop: "7vh",
                      fontWeight: "bold",
                      fontSize: "23px",
                      wordSpacing: "5px",
                    }}
                  >
                    Hearing Timeline :{" "}
                  </h4>

                  <div className="ttimeline">
                    <div className="ttimeline-progress"></div>
                    <div className="ttimeline-items">
                      {this.state.items.map((item, i) => (
                        <>
                          <div
                            id={i}
                            onClick={() => this.handleCurdate(item)}
                            className={
                              "ttimeline-item" + (item.active ? " active" : "")
                            }
                          >
                            <div className="ttimeline-content">{item}</div>
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
              </div>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "0vh",
                    fontSize: "18px",
                  }}
                >
                  LAWYER DETAILS
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="card ll1">
                  <img
                    src={url + "/image/" + this.state.limage}
                    alt="Display Picture"
                    height="200px"
                  />
                  <h2 className="card-title ll2">{this.state.lawyername}</h2>
                  <div className="card-body ll3">
                    <span className="ll4">
                      {this.state.lawyerexp} Years of Experience
                    </span>
                    <p className="ll5">
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-certificate"
                      ></i>
                      <span className="ll13">{this.state.lqua}</span>
                    </p>
                    <p className="ll6">
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-id-card"
                      ></i>
                      <span className="ll14">{this.state.luid}</span>
                    </p>
                    <p className="ll7">
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-phone"
                      ></i>
                      <span className="ll15">{this.state.lmobile}</span>
                    </p>
                    <p className="ll8">
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-envelope"
                      ></i>
                      <span className="ll16">{this.state.lawyeremail}</span>
                    </p>
                    <p className="ll9">
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-home"
                      ></i>
                      <span className="ll17">{this.state.lstreet}</span>
                    </p>
                    <p className="ll10">{this.state.ldistrict}</p>
                    <p className="ll11">{this.state.lstate}</p>
                    <p className="ll12">
                      <i
                        style={{ marginRight: "10px" }}
                        className="fa fa-map-pin"
                      ></i>
                      <span className="ll18">{this.state.lpincode}</span>
                    </p>
                  </div>
                </div>
              </ModalBody>
            </Modal>

            {/* <div className="ccp2">
              <Button
                color="primary"
                className="ccp3"
                onClick={this.handleHearing}
              >
                Add Hearing
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DeptCasePage;

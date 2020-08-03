import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import "./styles/curhearing.css";
import url from "../../backend_url";
class CurHearing extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.hearingUpdate = this.hearingUpdate.bind(this);
  }

  hearingUpdate() {
    this.props.history.push({
      pathname: "/" + localStorage.getItem("userId") + "/updateHearing",
      state: {
        id: this.props.location.state.id,
        curdate: this.props.location.state.curdate,
        curfact: this.props.location.state.curfact,
        curjudge: this.props.location.state.curjudge,
        curlawyer: this.props.location.state.curlawyer,
        curverdict: this.props.location.state.curverdict,
        curwitness: this.props.location.state.curwitness,
        next: this.props.location.state.next,
      },
    });
  }

  render() {
    var curhear = this.props.location.state.curwitness;
    var count = 0;
    console.log(this.props.location.state.curdate);
    console.log(this.props.location.state.curdoc);
    console.log(this.props.location.state.curfact);
    return (
      <div
        style={{
          backgroundColor: "rgb(240,240,240)",
          overflow: "scroll",
          height: "100vh",
        }}
      >
        <SideNavBar history={this.props.history} />
        <Head name="Hearing Report" />
        <div className="ch1">
          <div className="ch16">
            <span className="ch2">
              Hearing Report :{" "}
              {this.props.location.state.curdate
                .replace(/T.*/, "")
                .split("-")
                .reverse()
                .join("-")}
            </span>
            <i
              className="ic"
              onClick={this.hearingUpdate}
              className="fa fa-cloud-upload ch20"
            ></i>
          </div>
          <div className="ch3">
            <span className="ch4">CaseName :</span>
            <span className="curjudge">
              {this.props.location.state.casename}
            </span>
          </div>
          <div className="ch3">
            <span className="ch4">Judge :</span>
            <span className="curjudge">
              {this.props.location.state.curjudge}
            </span>
          </div>
          <div className="ch3">
            <span className="ch7">Lawyer :</span>
            <span className="curlawyer">
              {this.props.location.state.curlawyer}
            </span>
          </div>
          <div className="ch3">
            <span className="ch7">Interim Order :</span>
            <span className="curlawyer">
              {this.props.location.state.curverdict}
            </span>
          </div>
          <div className="ch9">
            <h6 className="ch10">Detail :</h6>
            <p className="ch11">{this.props.location.state.curfact}</p>
          </div>
          <div className="ch12">
            <span className="ch13">Next Hearing Date:</span>
            <span className="ch14">
              {this.props.location.state.next
                .replace(/T.*/, "")
                .split("-")
                .reverse()
                .join("-")}
            </span>
          </div>
          <p className="ctitle">Invoice:</p>
          <div className="ch12">
            <span className="ch13">Hearing ID:</span>
            <span className="ch14">{this.props.location.state.curinvid}</span>
          </div>
          <div className="ch12">
            <span className="ch13">Charge:</span>
            <span className="ch14">
              {this.props.location.state.curinvcharge}
            </span>
          </div>
          <div className="ch12">
            <span className="ch13">Status:</span>
            <span className="ch14">
              {this.props.location.state.curinvstatus}
            </span>
          </div>

          {this.props.location.state.curdoc.map((c) => {
            console.log(c);
            return (
              <div className="ch12">
                <span className="ch14">
                  <a href={url + "/image/" + c} download>
                    Click to download
                  </a>
                </span>
              </div>
            );
          })}
          <div
            style={{ marginLeft: "0.1vh", marginBottom: "5vh" }}
            className="row"
          >
            <div className="table-responsive">
              <table className="table table-borderless table-stripped tablehear">
                <thead className="thead-light">
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Comments</th>
                    <th>Phone</th>
                    <th>District</th>
                    <th>State</th>
                    <th>Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {curhear.map((id) => {
                    return (
                      <tr>
                        <td>{(count += 1)}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {id.name}
                        </td>
                        <td>{id.age}</td>
                        <td
                          style={{
                            textTransform: "capitalize",
                            textAlign: "justify",
                          }}
                        >
                          {id.comments}
                        </td>
                        <td>{id.phone}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {id.district}
                        </td>
                        <td style={{ textTransform: "capitalize" }}>
                          {id.state}
                        </td>
                        <td>{id.pincode}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurHearing;

import React, { Component } from "react";

import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import AvField from "availity-reactstrap-validation/lib/AvField";
import AvForm from "availity-reactstrap-validation/lib/AvForm";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import url from "../../backend_url";
var isClosed = false;
class AdminCase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mycases: [],
      curcaseid: null,
      value: "",
      valu1: "",
      closecase: [],
      casetype: "Active",
      courttype: "",
      hide1: true,
      hide2: true,
      isClosed: false,
    };
    this.Courttype = this.Courttype.bind(this);
    this.Casetype = this.Casetype.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCurId = this.handleCurId.bind(this);
    this.handleCourt = this.handleCourt.bind(this);
  }

  Casetype = (e) => {
    this.setState({
      casetype: e.target.value,
    });
  };

  Courttype = (e) => {
    this.setState({
      courttype: e.target.value,
    });
  };

  handleSearch(val) {
    axios
      .post(url + "/search/" + localStorage.getItem("deptname"), {
        query: val,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          mycases: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleCourt(event) {
    event.preventDefault();
    this.setState({
      courttype: this.cotype.value,
    });
    if (this.cotype.value == "All Courts") {
      axios
        .get(
          url + "/department/admin/active/" + localStorage.getItem("deptname")
        )
        .then((res) => {
          this.setState({
            mycases: res.data,
          });
        });

      axios
        .get(
          url + "/department/admin/closed/" + localStorage.getItem("deptname")
        )
        .then((res) => {
          this.setState({
            closecase: res.data,
          });
        });
    } else {
      axios
        .get(
          url +
            "/department/admin/cases/filter/" +
            localStorage.getItem("deptname") +
            "/" +
            this.cotype.value +
            "/" +
            isClosed
        )
        .then((res) => {
          if (isClosed == true && res.data != []) {
            this.setState({
              closecase: res.data,
            });
          } else if (isClosed == false && res.data != []) {
            console.log("supreme");
            this.setState({
              mycases: res.data,
            });
          }
        });
    }
  }

  handleClose(val) {
    axios
      .post(url + "/search/close/" + localStorage.getItem("deptname"), {
        query: val,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          closecase: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleChange = async (e) => {
    this.handleSearch(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  handleCloseChange = async (e) => {
    this.handleClose(e.target.value);
    this.setState({
      valu1: e.target.value,
    });
  };

  handleCurId(id) {
    this.setState({
      curcaseid: id,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(url + "/department/admin/active/" + localStorage.getItem("deptname"))
      .then((res) => {
        this.setState({
          mycases: res.data,
        });
      });

    axios
      .get(url + "/department/admin/closed/" + localStorage.getItem("deptname"))
      .then((res) => {
        this.setState({
          closecase: res.data,
        });
      });
  }

  render() {
    var hide = false;
    var hide1 = true;
    if (this.state.casetype == "Active") {
      hide = false;
      hide1 = true;
      isClosed = false;
    } else if (this.state.casetype == "Closed") {
      hide1 = false;
      hide = true;
      isClosed = true;
    }
    // if (this.state.casetype == "Active") {
    //   axios
    //     .get(
    //       "http://localhost:3006/department/admin/active/" +
    //         localStorage.getItem("deptname")
    //     )
    //     .then((res) => {
    //       this.setState({
    //         mycases: res.data,
    //       });
    //     });
    // }

    console.log(this.state.casetype);
    if (this.state.curcaseid) {
      this.props.history.push({
        pathname: "/" + localStorage.getItem("adminId") + "/casepg",
        state: { info: this.state.curcaseid },
      });
    }
    console.log(this.state.mycases);
    return (
      <div
        style={{
          backgroundColor: "rgb(240,240,240)",
          overflowX: "hidden",
          overflowY: "scroll",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Input
          type="select"
          label="Select Case"
          className="actclosecase"
          name="ctype"
          id="ctype"
          onSelect={this.handleSel}
          onChange={this.Casetype}
          value={this.state.casetype}
          innerRef={(input) => (this.ctype = input)}
        >
          <option disabled></option>
          <option>Active</option>
          <option>Closed</option>
        </Input>

        {/* <div hidden={!(hide && hide1)} style={{textAlign:'center',marginLeft:'25vh',marginTop:'25vh'}}>
          <i style={{fontSize:'120px',color:'rgba(0,0,0,0.2)'}} className="fa fa-fw fa-search"></i>
          <p style={{fontSize:'35px',fontWeight:'bold',marginTop:'1vh'}}>Search Through Your Cases</p>
        </div> */}

        <InputGroup className="ssearch-label" hidden={hide}>
          <Input
            className="ssearchinp"
            value={this.state.value}
            name="search-input"
            placeholder="Search By Synopsis"
            onChange={(e) => this.handleChange(e)}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText
              style={{
                width: "40px",
                marginTop: "-6vh",
                height: "5vh",
                boxShadow: "0px 0px 2px 2px rgb(220,220,220)",
              }}
            >
              <i className="fa fa-search search-icon" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="ssearch-label" hidden={hide1}>
          <Input
            className="ssearchinp"
            value={this.state.valu1}
            name="search-input"
            placeholder="Search..."
            onChange={(e) => this.handleCloseChange(e)}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText
              style={{
                width: "40px",
                marginTop: "-6vh",
                height: "5vh",
                boxShadow: "0px 0px 2px 2px rgb(220,220,220)",
              }}
            >
              <i className="fa fa-search search-icon" />
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <Input
          type="select"
          label="Select Court"
          className="actcourtcase"
          name="cotype"
          id="cotype"
          onChange={this.handleCourt}
          value={this.state.courttype}
          innerRef={(input) => (this.cotype = input)}
        >
          <option>Select Court</option>
          <option>All Courts</option>
          <option>Supreme Court of India</option>
          <option>High Court</option>
          <option>District Courts</option>
          <option>Executive and Revenue Court</option>
          <option>Village Court </option>
          <option>Panchayat</option>
          <option> Rural Court</option>
          <option>Judicial Academics</option>
        </Input>

        <div className="my1">
          <div className="row roww" hidden={hide}>
            {this.state.mycases.map((mycase) => {
              var desc = mycase.facts.substring(0, 55);
              return (
                <div className="col-xl-4">
                  <div
                    className="card cardd"
                    onClick={() => this.handleCurId(mycase._id)}
                  >
                    <h3 className="card-title mytitle">{mycase.name}</h3>
                    <div style={{ marginBottom: "2vh" }} className="my2">
                      <span style={{ wordSpacing: "29px" }} className="myspan">
                        ID :
                      </span>
                      <span className="myspan1">{mycase.caseno}</span>
                    </div>
                    <div className="my2">
                      <span className="myspan">Type :</span>
                      <span className="myspan1">{mycase.type}</span>
                    </div>
                    {/* <div className="my2">
                      <span className="myspan">Lawyer:</span>
                      <span className="myspan1">{mycase.lawyer.lname}</span>
                    </div> */}
                    <div className="my3">
                      <span className="my4">Facts :</span>
                      <span className="card-text cardd-text">
                        {desc.charAt(0).toUpperCase() + desc.slice(1)}...
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row roww" hidden={hide1}>
            {this.state.closecase.map((mycase) => {
              var desc = mycase.facts.substring(0, 55);
              return (
                <div className="col-xl-4">
                  <div
                    className="card cardd"
                    onClick={() => this.handleCurId(mycase._id)}
                  >
                    <h3 className="card-title mytitle">{mycase.name}</h3>
                    <div style={{ marginBottom: "2vh" }} className="my2">
                      <span style={{ wordSpacing: "29px" }} className="myspan">
                        ID :
                      </span>
                      <span className="myspan1">{mycase.caseno}</span>
                    </div>
                    <div className="my2">
                      <span className="myspan">Type :</span>
                      <span className="myspan1">{mycase.type}</span>
                    </div>
                    {/* <div className="my2">
                      <span className="myspan">Lawyer:</span>
                      <span className="myspan1">{mycase.lawyer.lname}</span>
                    </div> */}
                    <div className="my3">
                      <span className="my4">Facts :</span>
                      <p className="card-text cardd-text">
                        {desc.charAt(0).toUpperCase() + desc.slice(1)}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminCase;

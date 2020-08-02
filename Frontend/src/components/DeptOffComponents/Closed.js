import React, { Component } from "react";
import axios from "axios";
import Head from "../NodalOffComponents/Head";
import "./style/closed.css";
import DeptHead from "./DeptHead";
import url from "../../backend_url";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
class Closed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      closedcases: [],
      value: "",
      actid: null,
    };
    this.handleCourt = this.handleCourt.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAct = this.handleAct.bind(this);
  }

  componentDidMount() {
    axios
      .get(
        url + "/department/users/cases/closed/" + this.props.location.state.dept
      )
      .then((res) => {
        this.setState({
          closedcases: res.data,
        });
      });
  }

  handleCourt(event) {
    event.preventDefault();
    this.setState({
      courttype: this.cotype.value,
    });
    if (this.cotype.value == "All Courts") {
      axios
        .get(
          url +
            "/department/users/cases/closed/" +
            this.props.location.state.dept
        )
        .then((res) => {
          this.setState({
            closedcases: res.data,
          });
        });
    } else {
      axios
        .get(
          url +
            "/department/admin/cases/filter/" +
            this.props.location.state.dept +
            "/" +
            this.cotype.value +
            "/true"
        )
        .then((res) => {
          this.setState({
            closedcases: res.data,
          });
        });
    }
  }

  handleSearch(val) {
    axios
      .post(url + "/search/close/" + this.props.location.state.dept, {
        query: val,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          closedcases: res.data,
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

  handleAct(id) {
    this.setState({
      actid: id,
    });
  }

  render() {
    if (this.state.actid) {
      this.props.history.push({
        pathname: "/" + localStorage.getItem("deptId") + "/casepg",
        state: { info: this.state.actid },
      });
    }
    const closed = this.state.closedcases.map((close) => {
      return (
        <div className="card close1" onClick={() => this.handleAct(close._id)}>
          <h3 className="card-title close2">{close.name}</h3>
          <div className="card-body close3">
            <div>
                  <p style={{wordSpacing:'33px'}} className="act4">ID : {close.caseno}</p>
                </div>
            <div>
              <p className="close4">Type : {close.type}</p>
            </div>

            <div className="row" style={{ marginLeft: "0vh" }}>
              <p style={{ wordSpacing: "4px" }} className="close4">
                Facts :{" "}
              </p>
              <span className="fact">{close.facts.substring(0, 70)} ...</span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <DeptHead name="Closed Cases" />

        <div
          style={{ overflowY: "scroll", overflowX: "hidden" }}
          className="close8"
        >
          <InputGroup className="actssearch-label">
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
                  marginTop: "-6.1vh",
                  height: "5.2vh",
                  boxShadow: "0px 0px 1px 1px rgb(220,220,220)",
                }}
              >
                <i className="fa fa-search search-icon" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Input
            type="select"
            label="Select Court"
            className="courtcase"
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
          <div className="row">{closed}</div>{" "}
        </div>
      </div>
    );
  }
}

export default Closed;

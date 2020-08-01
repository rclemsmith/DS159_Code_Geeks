import React, { Component } from "react";
import axios from "axios";
import Head from "../NodalOffComponents/Head";
import "./style/search.css";
import { InputGroup, InputGroupAddon, Input, InputGroupText } from "reactstrap";

class DeptSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cases: [],
      value: "",
      curcaseid: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSearch(val) {
    axios
      .post("https://indiancourt.azurewebsites.net/search/" + this.props.location.state.dept, {
        query: val,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          cases: res.data,
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

  handleClick(id) {
    this.setState({
      curcaseid: id,
    });
  }

  componentDidMount() {
    axios
      .get(
        "https://indiancourt.azurewebsites.net/department/users/cases/cases/" +
          this.props.location.state.dept
      )
      .then((res) => {
        this.setState({
          cases: res.data,
        });
      });
  }

  render() {
    if (this.state.curcaseid) {
      this.props.history.push({
        pathname: "/" + localStorage.getItem("deptId") + "/casepg",
        state: { info: this.state.curcaseid },
      });
    }

    if (this.state.cases) {
      var searchcase = this.state.cases.map((search) => {
        return (
          <div
            className="card ssearchcard"
            onClick={() => this.handleClick(search._id)}
          >
            <p className="card-title sstitle">{search.name}</p>
            <div className="card-body ssbody">
              <div>
                <p className="ssearchbody">Type : {search.type}</p>
              </div>
              <div>
                <p className="ssearchbody">
                  Facts : {search.facts.substring(0, 15)}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
    const query = this.state;
    return (
      <div>
        <nav className="navbar  navbar-expand-sm bg-dark navbar-dark fixed-top">
          <InputGroup className="ssearch-label">
            <Input
              className="ssearchinp"
              value={this.state.value}
              name="search-input"
              placeholder="Search..."
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText style={{ width: "40px" }}>
                <i className="fa fa-search search-icon" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </nav>
        <div className="deptsearch1">
          <div className="row">{searchcase}</div>
        </div>
      </div>
    );
  }
}

export default DeptSearch;

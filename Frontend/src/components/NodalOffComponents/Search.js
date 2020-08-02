import React, { Component } from "react";
import axios from "axios";
import { InputGroup, InputGroupAddon, Input, InputGroupText } from "reactstrap";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import "./styles/search.css";
import url from "../../backend_url";
class Search extends Component {
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
      .post(url + 
        "/search/" + localStorage.getItem("deptname"),
        {
          query: val,
        }
      )
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
      .get(url + 
        "/department/users/cases/cases/" +
          localStorage.getItem("deptname")
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
        pathname: "/" + localStorage.getItem("userId") + "/casePage",
        state: { info: this.state.curcaseid },
      });
    }

    if (this.state.cases) {
      var searchcase = this.state.cases.map((search) => {
        return (
          <div
            className="card searchcard"
            onClick={() => this.handleClick(search._id)}
          >
            <p className="card-title">{search.name}</p>
            <div className="card-body">
              <div>
                <p className="searchbody">Type : {search.type}</p>
              </div>
              <div>
                <p className="searchbody">
                  Facts : {search.facts.substring(0, 50)}
                </p>
              </div>
            </div>
          </div>
        );
      });
    }
    const query = this.state;

    return (
      <div style={{overflow:'hidden',backgroundColor:'rgb(240,240,240)'}}>
        <SideNavBar history={this.props.history} />
        <Head name="Case Search"/>
        <div>
          {/*Search Input*/}
          <InputGroup className="search-label">
            <Input
              className="searchinp"
              value={this.state.value}
              name="search-input"
              placeholder="Search By Synopsis"
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText style={{ width: "40px" }}>
                <i className="fa fa-search search-icon" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <div style={{marginBottom:'16.5vh'}} className="row col-12">
            {searchcase}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

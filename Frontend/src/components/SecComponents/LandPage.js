import React, { Component } from "react";
import axios from "axios";
import Head from "../NodalOffComponents/Head";
import "../DeptOffComponents/style/search.css";
import url from "../../backend_url";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import DeptHead from "../DeptOffComponents/DeptHead";
import { Input, InputGroupText, InputGroupAddon, InputGroup } from "reactstrap";
import { uniq } from "lodash";
import "./style/land.css";
import SecSideBar from "./SecSidebar";

class LandPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cases: [],
      acase: [],
      curcaseid: null,
      value: "",
      dept: "Ministry of Corporate Affairs",
      actid: null,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.Dept = this.Dept.bind(this);
    this.handleCurId = this.handleCurId.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  Dept = (e) => {
    this.setState({
      dept: e.target.value,
    });
  };

  handleCurId(id) {
    this.setState({
      curcaseid: id,
    });
  }

  handleSearch(val) {
    axios
      .post(url + "/search/" + this.dept.value, {
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

  handleSelect(event) {
    event.preventDefault();
    this.setState({
      dept: this.dept.value,
    });
    axios
      .get(url + "/secretary/cases/filter/" + this.dept.value)
      .then((res) => {
        this.setState({
          cases: res.data,
        });
      });
  }

  handleChange = async (e) => {
    this.handleSearch(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(url + "/secretary/cases/filter/" + this.state.dept)
      .then((res) => {
        this.setState({
          cases: res.data,
        });
      });

    axios
      .get(url + "/secretary/cases")
      .then((res) => {
        this.setState({
          acase: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("secId");
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/";
  }

  render() {
    if (this.state.curcaseid) {
      this.props.history.push({
        pathname: "/" + localStorage.getItem("secId") + "/synopsis",
        state: { info: this.state.curcaseid },
      });
    }
    var n = [];
    var filter = [];
    this.state.acase.map((c) => {
      if (c.department != undefined) {
        n.push(c.department);
      }
    });

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = n.filter(onlyUnique);

    unique.sort();

    const cas = this.state.cases.map((active) => {
      return (
          <div className="col-12 col-xl-4">
            <div
              className="card act1"
              onClick={() => this.handleCurId(active._id)}
            >
              <p className="card-title act2">{active.name}</p>
              <div className="card-body act3">
                <div>
                  <p className="act4">Case No : {active.caseno}</p>
                </div>
                <div>
                  <p className="act4">Status : {active.status}</p>
                </div>
                <div>
                  <p className="act4">Type : {active.type}</p>
                </div>                
              </div>
            </div>
          </div>
      );
    });

    return (
      <div className="lpttttt">
        <SecSideBar history={this.props.history} />
        <nav style={{marginLeft:'26.5vh'}} className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top ">
          <Input
            className="ssearchinpu"
            value={this.state.value}
            name="search-input"
            placeholder="Search"
            onChange={(e) => this.handleChange(e)}
          />

          <button
            className="btn btn-primary lpbtn11"
            onClick={this.handleLogout}
            style={{
              marginLeft: "89vh",
              marginTop: "-4px",
              marginRight: "18px",
            }}
          >
            <i style={{ marginRight: "7px" }} className="fa fa-sign-out"></i>
            Logout
          </button>
        </nav>
        {/* <div className="lanpp1"></div> */}
        <div className="lanp1">
          {" "}
          {/* <div className="container"> */}
            <Input
              name="dept"
              id="dept"
              type="select"
              className="secinn2"
              onChange={this.handleSelect}
              value={this.state.dept}
              innerRef={(input) => (this.dept = input)}
            >
              <option>Select Department</option>
              {unique.map((u) => {
                return <option>{u}</option>;
              })}
            </Input>
          {/* </div> */}
        </div>

        <div className="row seccases">{cas}</div>
      </div>
    );
  }
}

export default LandPage;

import React, { Component } from "react";
import user from "../../images/user.jpg";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "./styles/react-sidenav.css";
class SideNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleDash = this.handleDash.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCase = this.handleCase.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleCase() {
    this.props.history.push("/" + localStorage.getItem("userId") + "/myCases");
  }

  handleAdd() {
    this.props.history.push("/" + localStorage.getItem("userId") + "/newCase");
  }

  handleDash() {
    this.props.history.push(
      "/" + localStorage.getItem("userId") + "/dashboard"
    );
  }

  handleSearch() {
    this.props.history.push("/" + localStorage.getItem("userId") + "/search");
  }

  handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/";
  }

  render() {
    return (
      <div>
        <SideNav
          className="snb"
          onSelect={(selected) => {
            // Add your code here
          }}
        >
          <Nav className="nav1">
            <img src={user} className="nav2" />
            <NavItem
              className="navitem"
              onClick={this.handleDash}
              eventKey="home"
            >
              <h4 className="hh1">
                <i
                  className="fa fa-fw fa-home"
                  style={{ marginLeft: "1vh", marginRight: "1vh" }}
                ></i>{" "}
                Home
              </h4>
            </NavItem>
            <NavItem
              className="navitem"
              eventKey="charts"
              onClick={this.handleAdd}
            >
              <h4 className="hh1">
                <i
                  className="fa fa-plus-circle"
                  style={{ marginLeft: "1vh", marginRight: "1.8vh" }}
                ></i>
                New Case
              </h4>
            </NavItem>
            <NavItem
              className="navitem"
              eventKey="case"
              onClick={this.handleCase}
            >
              <h4 className="hh1">
                <i
                  className="fa fa-fw fa-list"
                  style={{ marginLeft: "1vh", marginRight: "1.8vh", fontSize:'20px' }}
                ></i>
                My Cases
              </h4>
            </NavItem>
            {/* <NavItem
              className="navitem"
              eventKey="case"
              onClick={this.handleSearch}
            >
              <h4 className="hh1">
                <i
                  className="fa fa-fw fa-search"
                  style={{ marginLeft: "1vh", marginRight: "1.8vh" }}
                ></i>
                Search
              </h4>
            </NavItem> */}
            <NavItem
              className="navitem"
              eventKey="case"
              onClick={this.handleLogout}
            >
              <h4 className="hh1">
                <i
                  className="fa fa-fw fa-sign-out"
                  style={{ marginLeft: "1vh", marginRight: "1.8vh" }}
                ></i>
                Log-out
              </h4>
            </NavItem>
          </Nav>
        </SideNav>
      </div>
    );
  }
}

export default SideNavBar;

import React, { Component } from "react";
import user from "../../images/user.jpg";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "../NodalOffComponents/styles/react-sidenav.css";
class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      h: false,
      nc: false,
      mc: false,
      nu: false,
    };
    this.handleLog = this.handleLog.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleDash = this.handleDash.bind(this);
    this.handleCase = this.handleCase.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleUser() {
    this.setState(
      {
        h: false,
        nc: false,
        mc: false,
        nu: true,
      },
      () => {}
    );
    this.props.history.push(
      "/" + localStorage.getItem("adminId") + "/adminPage"
    );
  }

  handleCase() {
    this.setState(
      {
        h: false,
        nc: false,
        mc: true,
        nu: false,
      },
      () => {}
    );
    this.props.history.push("/" + localStorage.getItem("userId") + "/myCases");
  }

  handleLog() {
    this.setState(
      {
        h: false,
        nc: true,
        mc: false,
        nu: false,
      },
      () => {}
    );
    this.props.history.push("/" + localStorage.getItem("adminId") + "/logs");
  }

  handleDash() {
    this.setState(
      {
        h: true,
        nc: false,
        mc: false,
        nu: false,
      },
      () => {}
    );
    this.props.history.push(
      "/" + localStorage.getItem("adminId") + "/addashboard"
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
              className={this.state.h ? "navitem active" : "navitem"}
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
              className={this.state.nc ? "navitem active" : "navitem"}
              onClick={this.handleLog}
              eventKey="home"
            >
              <h4 className="hh1">
                <i
                  className="fa fa-fw fa-list"
                  style={{ marginLeft: "1vh", marginRight: "1vh" }}
                ></i>{" "}
                Logs
              </h4>
            </NavItem>

            <NavItem
              className={this.state.nu ? "navitem active" : "navitem"}
              eventKey="case"
              onClick={this.handleUser}
            >
              <h4 className="hh1">
                <i
                  className="fa fa-user-circle-o"
                  style={{
                    marginLeft: "1.2vh",
                    marginRight: "2vh",
                    fontSize: "24px",
                  }}
                ></i>
                New User
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

export default SideBar;

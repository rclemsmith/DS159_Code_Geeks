import React, { Component } from "react";
import "./styles/homestyle.css";
import Header from "./Header";
import home from "../../images/home.png";
import url from "../../backend_url";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      user: false,
      pass: false,

      auth: false,
      authadmin: false,
      btn1: false,
      btn2: true,
      err: true,
    };

    this.Username = this.Username.bind(this);
    this.Password = this.Password.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  Username = (e) => {
    this.setState(
      {
        username: e.target.value,
      },
      () => {
        if (this.state.username === "") {
          this.setState(
            {
              user: true,
            },
            () => {
              console.log(this.state.user);
            }
          );
        } else {
          this.setState(
            {
              user: false,
            },
            () => {
              console.log(this.state.user);
            }
          );
        }
      }
    );
  };

  Password = (e) => {
    this.setState(
      {
        password: e.target.value,
      },
      () => {
        if (this.state.password === "") {
          this.setState(
            {
              pass: true,
            },
            () => {
              console.log(this.state.pass);
            }
          );
        } else {
          this.setState(
            {
              pass: false,
            },
            () => {
              console.log(this.state.pass);
            }
          );
        }
      }
    );
  };

  handleSignin(event) {
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.dept === ""
    ) {
      if (this.state.username === "") {
        this.setState({
          user: true,
        });
      } else {
        this.setState({
          user: false,
        });
      }
      if (this.state.password === "") {
        this.setState({
          pass: true,
        });
      } else {
        this.setState({
          pass: false,
        });
      }
      if (this.state.dept === "") {
        this.setState({
          dep: true,
        });
      } else {
        this.setState({
          dep: false,
        });
      }
    } else {
      if (this.state.username.substring(0, 3) == "sec") {
        this.setState({
          btn1: true,
          btn2: false,
        });
        axios
          .post(url + "/secretary/login", {
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            if (res.data.success) {
              this.props.history.push({
                pathname: "/verifySec",
                state: {
                  dept: res.data.name,
                  otp: res.data.otp,
                  token: res.data.token,
                  userId: res.data.userId,
                },
              });
            }
          })
          .catch((err) => {
            this.setState({
              err: false,
              btn1: false,
              btn2: true,
            });
            console.log(err);
          });
      }
      if (this.state.username.substring(0, 5) == "nodal") {
        this.setState({
          btn1: true,
          btn2: false,
        });
        axios
          .post(url + "/department/admin/login", {
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            if (res.data.success) {
              this.props.history.push({
                pathname: "/verifyNodal",
                state: {
                  dept: res.data.name,
                  otp: res.data.otp,
                  token: res.data.token,
                  userId: res.data.userId,
                },
              });
            }
          })
          .catch((err) => {
            this.setState({
              err: false,
              btn1: false,
              btn2: true,
            });
            console.log(err);
          });
      } else if (this.state.username.substring(0, 4) == "dept") {
        this.setState({
          btn1: true,
          btn2: false,
        });
        axios
          .post(url + "/department/users/login", {
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            if (res.data.success) {
              this.props.history.push({
                pathname: "/verifyOfficial",
                state: {
                  dept: res.data.name,
                  otp: res.data.otp,
                  token: res.data.token,
                  userId: res.data.userId,
                  offname: res.data.officialname,
                },
              });
            }
          })
          .catch((err) => {
            this.setState({
              err: false,
              btn1: false,
              btn2: true,
            });
            console.log(err);
          });
      } else if (this.state.username.substring(0, 5) == "admin") {
        console.log("inside admin");
        this.setState({
          btn1: true,
          btn2: false,
        });
        axios
          .post(url + "/superadmin/login", {
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            if (res.data.success) {
              this.props.history.push({
                pathname: "/verifyUser",
                state: {
                  dept: res.data.name,
                  otp: res.data.otp,
                  token: res.data.token,
                  userId: res.data.userId,
                  reports: res.data.reports,
                },
              });
            }
          })
          .catch((err) => {
            this.setState({
              err: false,
              btn1: false,
              btn2: true,
            });
            console.log(err);
          });
      }
    }
  }

  render() {
    console.log(this.state.username.substring(0, 5));
    return (
      <div className="homediv">
        <Header name="Management Information System" />
        <div className="row">
          <div className="col-6 col-md-6 col-sm-12">
            <img
              className="myImage"
              src={home}
              width="100%"
              height="654px"
              alt="img"
            ></img>
          </div>
          <div className="col-6 col-md-6 col-sm-12">
            <div className="lawyer">
              <h6 className="valid" hidden={this.state.err}>
                Please enter valid username/password
              </h6>
              {/* <InputGroup
                style={{
                  marginBottom: "10%",
                  marginTop: "8%",
                  marginLeft: "18px",
                  width: "90%",
                }}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i
                      class="fa fa-university"
                      style={{ fontSize: "17px" }}
                    ></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="department"
                  type="select"
                  onChange={this.Department}
                  value={this.state.dept}
                  innerRef={(input) => (this.department = input)}
                  placeholder="Department"
                >
                  <option disabled></option>
                  <option>Admin</option>
                  <option>Nodal Officer</option>
                  <option>Department</option>
                </Input>
              </InputGroup>
              <p
                style={this.state.dep ? {} : { display: "none" }}
                className="warning"
              >
                Department Required ..!!
              </p> */}

              <InputGroup
                style={{
                  marginBottom: "10%",
                  marginTop: "8%",
                  marginLeft: "18px",
                  width: "90%",
                }}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i
                      class="fas fa-user-circle"
                      style={{ fontSize: "17px" }}
                    ></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="username"
                  onChange={this.Username}
                  value={this.state.username}
                  innerRef={(input) => (this.username = input)}
                  placeholder="Username"
                />
              </InputGroup>
              <p
                style={this.state.user ? {} : { display: "none" }}
                className="warning"
              >
                Username Required ..!!
              </p>

              <InputGroup
                style={{
                  marginBottom: "10%",
                  marginTop: "8%",
                  marginLeft: "18px",
                  width: "90%",
                }}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fa fa-lock" style={{ fontSize: "17px" }}></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="password"
                  name="pwd"
                  onChange={this.Password}
                  value={this.state.password}
                  innerRef={(input) => (this.pwd = input)}
                  placeholder="Password"
                />
              </InputGroup>
              <p
                style={this.state.pass ? {} : { display: "none" }}
                className="warning"
              >
                Password Required ..!!
              </p>

              <div className="row">
                <Button
                  hidden={this.state.btn1}
                  onClick={this.handleSignin}
                  color="danger"
                  style={{
                    margin: "2% 0% 7% 37%",
                  }}
                >
                  <i
                    style={{ marginRight: "1vh" }}
                    class="fa fa-sign-in"
                    aria-hidden="true"
                  ></i>{" "}
                  Sign In
                </Button>
                <Button
                  hidden={this.state.btn2}
                  color="danger"
                  style={{
                    margin: "2% 0% 7% 37%",
                  }}
                >
                  <i
                    style={{ marginRight: "1vh" }}
                    class="fa fa-sign-in"
                    aria-hidden="true"
                  ></i>{" "}
                  Signing In
                </Button>
              </div>
            </div>
            {/* <CustomChatBot /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

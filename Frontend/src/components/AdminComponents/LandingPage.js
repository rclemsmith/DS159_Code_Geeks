import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "./style/landing.css";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { bind } from "lodash";
import url from "../../backend_url";

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nodalad: [],
      plushide: true,
      hide: true,
      hid: true,
      tabhide: false,
      id: "",
      isModalOpen: false,
    };
    this.handleUser = this.handleUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("adminId");
    localStorage.removeItem("token");

    window.location.href = "/";
  }

  handleSelect(id) {
    this.setState({
      id: id,
      hid: false,
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.nodal);
    const data = {
      name: this.props.location.state.dept,
      nodalname: this.name.value,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
    };

    axios
      .post(
        url +"/department/admin/signup",
        data
      )
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          window.alert("Nodal Officer Added Successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUser(event){
    event.preventDefault();
    this.setState({
      hide : false
    });
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({
      hide: true,
      tabhide: false,
    });
  }
  handleDelete(event) {
    event.preventDefault();
    axios
      .delete(
        url +"/department/admin/" +
          this.state.id
      )
      .then((res) => {
        window.alert("Deleted Successfully");
        window.location.reload();
      });
  }

  componentDidMount() {
    axios
      .get(
        url +"/department/admin/nodal/" +
          this.props.location.state.dept
      )
      .then((res) => {
        this.setState({
          nodalad: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    if (this.state.nodalad == "") {
      this.setState({
        plushide: false,
      });
    } else if (this.state.nodalad != "") {
      this.setState({
        plushide: true,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    var plus = false;
    if (this.state.nodalad.length == 0) {
      plus = false;
    } else if (this.state.nodalad.length != 0) {
      plus = true;
    }
    return (
      <div className="lpadmin1">
        <h3 className="ad">
          <span>&nbsp;&nbsp;</span>Dashboard
          <button
            className="btn btn-primary lpbtn11"
            onClick={this.handleLogout}
            style={{ float: "right", marginTop: "-4px", marginRight: "18px" }}
          >
            <i style={{ marginRight: "7px" }} className="fa fa-sign-out"></i>
            Logout
          </button>
        </h3>
        <div className="cont123">
          <div className="landpage2" hidden={this.state.hide}>
            <div className="card landpg">
              <span style={{ marginTop: "10px" }} className="card-title">
                DETAILS
              </span>
              <span>
                <button
                  className="btn btn primary bt"
                  onClick={this.handleClose}
                >
                  <i className="fa fa-close"></i>
                </button>
              </span>
              <div className="card-body">
                <AvForm>
                  <AvField
                    type="text"
                    name="name"
                    id="name"
                    label="Name"
                    onChange={this.onChange}
                    innerRef={(input) => (this.name = input)}
                  />
                  <AvField
                    name="email"
                    id="email"
                    type="email"
                    onChange={this.onChange}
                    label="E-Mail"
                    innerRef={(input) => (this.email = input)}
                    required
                  />
                  <AvField
                    name="username"
                    id="username"
                    type="text"
                    onChange={this.onChange}
                    label="Username"
                    innerRef={(input) => (this.username = input)}
                    required
                  />
                  <AvField
                    name="password"
                    id="password"
                    type="password"
                    onChange={this.onChange}
                    label="Password"
                    innerRef={(input) => (this.password = input)}
                    required
                  />
                  <button
                    style={{ marginLeft: "45%" }}
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </AvForm>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="table-responsive lptable2">
              <table className="table" style={{ color: "#fff" }}>
                <thead className="thead-light">
                  <tr>
                    <th></th>
                    <th colSpan="2">
                      <p style={{ marginLeft: "100px" }} className="offt1">
                        NODAL OFFICER
                      </p>
                      <i
                        hidden={plus}
                        style={{ fontSize: "21px", marginLeft: "10px" }}
                        onClick={this.handleUser}
                        className="fa fa-plus-circle"
                      ></i>
                    </th>
                    <th></th>
                  </tr>
                  <tr>
                    <th className="tabhead">Name</th>
                    <th className="tabhead">Username</th>
                    <th className="tabhead">Email</th>
                    <th className="tabhead">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.nodalad.map((n) => {
                    console.log(this.state.nodalad);
                    return (
                      <tr onClick={() => this.handleSelect(n._id)}>
                        <td style={{ textTransform: "capitalize" }}>
                          {n.nodalname}
                        </td>
                        <td>{n.username}</td>
                        <td>{n.email}</td>
                        <td onClick={this.toggleModal} hidden={this.state.hid}>
                          <i
                            style={{ marginLeft: "30px" }}
                            class="fa fa-times"
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>DELETE</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete</p>
            <div>
              <button className="btn btn-primary" onClick={this.handleDelete}>
                YES
              </button>
            </div>

            <div className="lppbt">
              <button className="btn btn-primary " onClick={this.toggleModal}>
                NO
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LandingPage;

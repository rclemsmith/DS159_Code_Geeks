import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import url from "../../backend_url";
class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deptoff: [],
      hide: true,
      tabhide: false,
      hidd: true,
      isMModalOpen: false,
      offid: "",
    };

    this.toggleMModal = this.toggleMModal.bind(this);
    this.handleOffDelete = this.handleOffDelete.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOfficial = this.handleOfficial.bind(this);
    this.handleSSelect = this.handleSSelect.bind(this);
  }

  handleOfficial(event) {
    event.preventDefault();
    this.setState({
      hide: false,
      tabhide: true,
    });
  }

  handleSSelect(id) {
    this.setState({
      offid: id,
      hidd: false,
    });
  }

  toggleMModal() {
    this.setState({
      isMModalOpen: !this.state.isMModalOpen,
    });
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({
      hide: true,
      tabhide: false,
    });
  }

  handleOffDelete(event) {
    event.preventDefault();
    axios
      .delete(url +
        "/department/users/" +
          this.state.offid
      )
      .then((res) => {
        window.alert("Deleted Successfully");
        window.location.reload();
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: localStorage.getItem("deptname"),
      officialname: this.name.value,
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
    };
    axios
      .post(url + 
        "/department/users/signup",
        data
      )
      .then((res) => {
        if (res.data.success) {
          console.log(res);
          window.alert("Official Added Successfully");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get(url + 
        "/department/users/officials/" +
          localStorage.getItem("deptname")
      )
      .then((res) => {
        this.setState({
          deptoff: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div style={{backgroundColor:'rgb(220,220,220)',height:'100vh',overflow:'hidden'}}>
        <SideNavBar history={this.props.history} />
        <Head name="New User" />
        <div className="row landpage2" hidden={this.state.hide}>
          <div style={{marginLeft:'20vh'}} className="card landpg">
            <span style={{ marginTop: "10px" }} className="card-title">
              DETAILS
            </span>
            <span>
              <button className="btn btn primary bt" onClick={this.handleClose}>
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
        <div className="row" hidden={this.state.tabhide}>
          <div className="col-xl-6">
            <div className="table-responsive lptable1">
              <table className="table" style={{ color: "#fff" }}>
                <thead className="thead-light">
                  <tr>
                    <th></th>
                    <th colSpan="2">
                      <p className="offt1">DEPARTMENT OFFICIALS</p>
                      <i
                        style={{ fontSize: "21px", marginLeft: "10px" }}
                        onClick={this.handleOfficial}
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
                  {this.state.deptoff.map((n) => {
                    return (
                      <tr onClick={() => this.handleSSelect(n._id)}>
                        <td style={{ textTransform: "capitalize" }}>
                          {n.officialname}
                        </td>
                        <td>{n.username}</td>
                        <td>{n.email}</td>
                        <td
                          hidden={this.state.hidd}
                          onClick={this.toggleMModal}
                        >
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
        <Modal isOpen={this.state.isMModalOpen} toggle={this.toggleMModal}>
          <ModalHeader toggle={this.toggleMModal}>DELETE</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete</p>
            <button className="btn btn-primary" onClick={this.handleOffDelete}>
              YES
            </button>
            <button className="btn btn-primary" onClick={this.toggleMModal}>
              NO
            </button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AddUser;

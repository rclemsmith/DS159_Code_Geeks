import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import "./styles/caseUpdate.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Card } from "reactstrap";
import axios from "axios";

import url from "../../backend_url";
class CaseUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: "",
      status: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = {};
    if (this.status.value == "Closed") {
      data = {
        facts: this.facts.value,
        status: this.status.value,
        isClosed: true,
      };
    } else {
      data = {
        facts: this.facts.value,
        status: this.status.value,
        isClosed: false,
      };
    }

    axios
      .post(url + 
        "/department/admin/" +
          this.props.location.state.caseid +
          "/modify",
        data
      )
      .then((res) => {
        this.props.history.push(
          "/" + localStorage.getItem("userId") + "/dashboard"
        );
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  }

  componentDidMount() {
    this.setState({
      facts: this.props.location.state.facts,
      status: this.props.location.state.status,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={{backgroundColor:'rgb(240,240,240)',overflow:'hidden',paddingBottom:'34vh'}}>
        <SideNavBar history={this.props.history} />
        <Head name="Case Update" />
        <div className="container caseup1">
          <div className="caseup2">
            <Card style={{padding:'30px',boxShadow:'0px 0px 5px 5px rgb(220,220,220)'}}>
            <AvForm>
              <AvField
                name="facts"
                id="facts"
                label="Facts"
                type="textarea"
                value={this.state.facts}
                onChange={this.onChange}
                innerRef={(input) => (this.facts = input)}
              />

              <AvField
                name="status"
                id="status"
                type="select"
                value={this.state.status}
                label="Status"
                onChange={this.onChange}
                innerRef={(input) => (this.status = input)}
              >
                <option disabled></option>
                <option>Active</option>
                <option>Closed</option>
              </AvField>
              <Button
                color="primary"
                className="caseup3"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </AvForm>
          </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseUpdate;

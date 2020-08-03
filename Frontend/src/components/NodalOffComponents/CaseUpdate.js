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
      docs: [],
      mailperiod : null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDoc = this.handleDoc.bind(this);
  }

  handleDoc(event) {
    var documents = [];
    for (var i = 0; i < event.target.files.length; i++) {
      documents.push(event.target.files[i]);
    }
    this.setState(
      {
        docs: documents,
      },
      () => {
        console.log(this.state.docs);
      }
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = {};

    const formData = new FormData();
    formData.append("facts",this.facts.value);
    formData.append("status",this.status.value);
    formData.append("mailPeriod",this.mailperiod.value);
    console.log(formData.get("mailPeriod"));
    this.state.docs.forEach((document) => {
      formData.append("documents", document);
      console.log(formData.get("documents"));
    });
    if (this.status.value == "Closed") {
      data = {
        facts: this.facts.value,
        status: this.status.value,
        isClosed: true,
      };
      formData.append("isClosed",true);

    } else {
      data = {
        facts: this.facts.value,
        status: this.status.value,
        isClosed: false,
      };
      formData.append("isClosed",false);
    }   
    

    axios
      .post(url + 
        "/department/admin/" +
          this.props.location.state.caseid +
          "/modify",
        formData
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
              <div className="row">
                <div className="col">
              <AvField
                name="mailperiod"
                id="mailperiod"
                label="Mail Period"
                type="number"
                min="0"
                value={this.state.mailperiod}
                onChange={this.onChange}                
                innerRef={(input) => (this.mailperiod = input)}
              />
              </div>
              <div className="col">
              <AvField
                multiple
                name="docs"
                id="docs"
                label="Rejoinder Documents"
                type="file"
                onChange={this.handleDoc}
                innerRef={(input) => (this.docs = input)}
              />
              </div>
              </div>

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

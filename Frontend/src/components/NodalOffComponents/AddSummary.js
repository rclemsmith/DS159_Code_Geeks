import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import Head from "./Head";
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation";
import { Label, Input } from "reactstrap";
import "./styles/addsum.css";
import axios from "axios";
import url from "../../backend_url";

class AddSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facts: "",
    };
    this.Facts = this.Facts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      synopsis: this.desc.value,
    };
    axios
      .post(
        url +
          "/department/admin/" +
          this.props.location.state.caseinfo +
          "/synopsis",
        data
      )
      .then((res) => {
        this.props.history.push(
          "/" + localStorage.getItem("userId") + "/casePage"
        );
      })
      .catch((err) => {
        window.alert("Unsuccessful");
        window.location.reload();
      });
  }

  Facts = (e) => {
    this.setState({
      facts: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <SideNavBar history={this.props.history} />
        <Head name="Add Summary"></Head>

        <div className="container addsum">
          <AvForm>
            <AvGroup className="ncinput">
              <Label className="nc" for="desc">
                Case Summary{" "}
                <i
                  style={{ marginLeft: "1vw", fontSize: "18px" }}
                  class="fa fa-file-text"
                ></i>
              </Label>
              <Input
                placeholder="Summarize Your Case"
                value={this.state.facts}
                innerRef={(input) => (this.desc = input)}
                onChange={this.Facts}
                style={{
                  textAlign: "justify",
                  wordWrap: "break-word",
                  resize: "none",
                  height: "14vh",
                  padding: "10px",
                  margin: "0px",
                }}
                type="textarea"
                className="ncinput"
                name="desc"
                id="desc"
                required
              />
            </AvGroup>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Submit
            </button>
          </AvForm>
        </div>
      </div>
    );
  }
}

export default AddSummary;

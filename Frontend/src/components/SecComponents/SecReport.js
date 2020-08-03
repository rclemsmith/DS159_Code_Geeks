import React, { Component } from "react";
import SideBar from "../AdminComponents/Sidebar";
import "../AdminComponents/style/landing.css";

import url from "../../backend_url";
import axios from "axios";
import { Input } from "reactstrap";
import SecSideBar from "./SecSidebar";
class SecReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: [],
      date: new Date(),
      year: "",
      casecount: [],
      acase: [],
      curcaseid: null,
      value: "",
      dept: "",
      actid: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.Dept = this.Dept.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Dept = (e) => {
    this.setState({
      dept: e.target.value,
    });
  };

  handleSelect(event) {
    event.preventDefault();
    this.setState({
      dept: this.dept.value,
    });
    axios.get(url + "/secretary/reports/" + this.dept.value).then((res) => {
      if (res.data.reports != null) {
        this.setState({
          logs: res.data.reports,
        });
      } else {
        this.setState({
          logs: null,
        });
      }
    });
  }

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

  render() {
    var n = [];
    var filter = [];
    this.state.acase.map((c) => {
      if (c.department != undefined) {
        n.push(c.department);
      }
    });
    var arr = [];
    this.state.logs.map((i) => {
      arr.push(i);
    });

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = n.filter(onlyUnique);

    unique.sort();
    var count = 0;

    return (
      <div>
        <SecSideBar history={this.props.history} />
        <div className="lpadmin121">
          <h3 className="ad">
            <span>&nbsp;&nbsp;</span>Welcome Secretary
          </h3>

          <div className="container alog1">
            <Input
              name="dept"
              id="dept"
              type="select"
              className="secrep"
              onChange={this.handleSelect}
              value={this.state.dept}
              innerRef={(input) => (this.dept = input)}
            >
              <option>Select the dept</option>
              {unique.map((u) => {
                return <option>{u}</option>;
              })}
            </Input>

            <div className="table-responsive">
              <table className="table">
                <thead className="table-dark">
                  <tr>
                    <th>SI.NO</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {arr
                    .slice(0)
                    .reverse()
                    .map((i) => {
                      count = count + 1;
                      if (count % 2 == 0) {
                        return (
                          <tr className="table-primary">
                            <td>{count}</td>
                            <td>{i}</td>
                          </tr>
                        );
                      } else if (count % 2 != 0) {
                        return (
                          <tr className="table-danger">
                            <td>{count}</td>
                            <td>{i}</td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecReport;

import React, { Component } from "react";
import SecSideBar from "./SecSidebar";
import "./style/land.css";
import axios from "axios";
import { Input } from "reactstrap";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import url from "../../backend_url";
class SecDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      year: "",
      casecount: [],
      acase: [],
      curcaseid: null,
      value: "",
      dept: "Ministry of Corporate Affairs",
      actid: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.Dept = this.Dept.bind(this);
    this.Year = this.Year.bind(this);
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Year = (e) => {
    this.setState({
      year: e.target.value,
    });
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
    axios.get(url + "/secretary/counts/" + this.dept.value).then((res) => {
      this.setState({
        casecount: res.data,
      });
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

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var unique = n.filter(onlyUnique);

    unique.sort();
    console.log(this.state.casecount);
    console.log(localStorage.getItem("highCount"));
    var n = this.state.date.getDate();
    var n1 = this.state.date.getMonth() + 1;
    var n2 = this.state.date.getFullYear();
    return (
      <div>
        <SecSideBar history={this.props.history} />
        <div className="lpadm1">
          <h3 className="ad">
            <span>&nbsp;&nbsp;</span>Welcome Secretary
          </h3>
          <div className="adda12">
            <div className="newdash22">
              <CircularProgressbarWithChildren
                value={100}
                className="newdash66"
                styles={buildStyles({
                  pathColor: "#fc061e",
                })}
              >
                <div className="newdash33">
                  <CircularProgressbarWithChildren
                    value={20}
                    className="newdash66 "
                    styles={buildStyles({
                      pathColor: "#220dfc",
                    })}
                  >
                    <div className="newdash55">
                      <CircularProgressbarWithChildren
                        value={39}
                        className="newdash66"
                        styles={buildStyles({
                          pathColor: "#00ff00",
                        })}
                      >
                        <h3 className="newdash77">Cases</h3>
                      </CircularProgressbarWithChildren>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
          <div className="addash99">
            <div className="legendd">
              <div style={{ marginTop: "3vh" }} className="row">
                <div class="color-boxx"></div>
                <span className="legg1">Total Cases {}</span>
              </div>
              <div className="row">
                <div class="color-boxx1"></div>
                <span className="legg2">Active Cases {}</span>
              </div>
              <div className="row">
                <div class="color-boxx2"></div>
                <span className="legg4">Closed Cases {}</span>
              </div>
            </div>
          </div>
          <div className="addadate">
            <div className="card newdash8">
              <h2 className="card-title newdash9">Today</h2>
              <div className="newdash14">
                <hr className="newdash13" />
              </div>
              <div className="card-body newdash10">
                <h3 className="newdash11">
                  {n} : {n1} : {n2}
                </h3>
                <p className="newdash11">
                  <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                </p>
              </div>
            </div>
            <div className="secselec">
              <Input
                name="dept"
                id="dept"
                type="select"
                className="sec"
                onChange={this.handleSelect}
                value={this.state.dept}
                innerRef={(input) => (this.dept = input)}
              >
                <option>Select the dept</option>
                {unique.map((u) => {
                  return <option>{u}</option>;
                })}
              </Input>
            </div>
            <div className="sectable11">
              <div className="table-responsive">
                <table class="table">
                  <thead className="table-dark">
                    <tr>
                      <th>S.No</th>
                      <th>Courts</th>
                      <th>Active Cases</th>
                      <th>Closed Cases</th>
                      <th>Total Cases</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Supreme Court</td>
                      <td>{}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Hight Court</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>District Court</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Executive Court</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Village Court</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Panchayat Court</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Rural Court</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Judicial Court</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SecDashboard;

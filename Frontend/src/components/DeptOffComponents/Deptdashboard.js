import React, { Component } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
  CircularProgressbar,
} from "react-circular-progressbar";
import "./style/dashboard.css";
import Head from "../NodalOffComponents/Head";
import axios from "axios";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Input, Button } from "reactstrap";
import DeptHead from "./DeptHead";
import closed from "../../images/closed.jpg";
import { Bar } from "react-chartjs-2";
import url from "../../backend_url";
class Deptdashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: "",
      cases: [],
      hear: [],
      mm: null,
      dd: null,
      yy: null,
      id: null,
    };
    this.Year = this.Year.bind(this);
    this.handleActive = this.handleActive.bind(this);
    this.handleClosed = this.handleClosed.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleActive() {
    this.props.history.push({
      pathname: "/active",
      state: {
        dept: this.props.location.state.dept,
      },
    });
  }

  handleClosed() {
    this.props.history.push({
      pathname: "/" + localStorage.getItem("deptId") + "/closed",
      state: {
        dept: this.props.location.state.dept,
      },
    });
  }

  handleSearch() {
    this.props.history.push({
      pathname: "/" + localStorage.getItem("deptId") + "/deptsearch",
      state: {
        dept: this.props.location.state.dept,
      },
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Year = (e) => {
    this.setState({
      year: e.target.value,
    });
  };

  componentDidMount() {
    axios
      .get(url + 
        "/department/users/cases/cases/" +
          this.props.location.state.dept
      )
      .then((res) => {
        this.setState({
          cases: res.data,
        });
      });

    axios
      .get(url + 
        "/department/users/cases/hear/" +
          this.props.location.state.dept
      )
      .then((res) => {
        this.setState(
          {
            hear: res.data,
          },
          () => {
            this.setState({
              dd: this.state.hear[0].nexthearingdate.substring(8, 10),
              mm: this.state.hear[0].nexthearingdate.substring(5, 7),
              yy: this.state.hear[0].nexthearingdate.substring(0, 4),
              id: this.state.hear[0].caseid,
            });
          }
        );
      })
      .catch((err) => console.log(err));
  }

  render() {
    var total = 0;
    total = this.state.cases.length;
    var activeca = 0;
    var closeca = 0;
    this.state.cases.map((c) => {
      if (c.isClosed) {
        closeca = closeca + 1;
      } else {
        activeca = activeca + 1;
      }
    });

    var cl = (closeca / total) * 100;
    var ac = (activeca / total) * 100;
    var year = [];
    this.state.cases.map((dashcase) => {
      year.push(dashcase.createdAt.substring(0, 4));
    });

    var cricivil = [];
    cricivil = this.state.cases.filter(
      (cri) => cri.createdAt.substring(0, 4) == this.state.year
    );
    console.log(cricivil);
    var cricount = 0;
    var civcount = 0;
    cricivil.map((civ) => {
      if (civ.type == "Criminal") {
        cricount = cricount + 1;
      } else if (civ.type == "Civil") {
        civcount = civcount + 1;
      }
    });

    console.log(cricount);
    console.log(civcount);

    var newyaer = year.filter((item, i, ar) => ar.indexOf(item) === i);

    var filtercase = [];
    var cur = {};
    for (var x = 0; x < newyaer.length; x++) {
      cur[newyaer[x]] = this.state.cases.filter(
        (f) => newyaer[x] == f.createdAt.substring(0, 4)
      );
    }

    for (var key in cur) {
      filtercase.push(cur);
    }

    console.log(filtercase);
    console.log(newyaer);
    let julyccount = 0;
    let julycricount = 0;
    let janccount = 0;
    let jancricount = 0;
    let febccount = 0;
    let febcricount = 0;
    let marccount = 0;
    let marcricount = 0;
    let aprccount = 0;
    let aprcricount = 0;
    let mayccount = 0;
    let maycricount = 0;
    let junccount = 0;
    let juncricount = 0;
    let augccount = 0;
    let augcricount = 0;
    let sepccount = 0;
    let sepcricount = 0;
    let octccount = 0;
    let octcricount = 0;
    let novccount = 0;
    let novcricount = 0;
    let decccount = 0;
    let deccricount = 0;

    cricivil.map((c) => {
      if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "07") {
        julycricount = julycricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "07") {
        julyccount = julyccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "01") {
        jancricount = jancricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "01") {
        janccount = janccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "02") {
        febcricount = febcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "02") {
        febccount = febccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "03") {
        marcricount = marcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "03") {
        marccount = marccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "04") {
        aprcricount = aprcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "04") {
        aprccount = aprccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "05") {
        maycricount = maycricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "05") {
        mayccount = mayccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "06") {
        juncricount = juncricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "06") {
        junccount = junccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "08") {
        augcricount = augcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "08") {
        augccount = augccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "09") {
        sepcricount = sepcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "09") {
        sepccount = sepccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "10") {
        octcricount = octcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "10") {
        octccount = octccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "11") {
        novcricount = novcricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "11") {
        novccount = novccount + 1;
      } else if (c.type == "Criminal" && c.createdAt.substring(5, 7) == "12") {
        deccricount = deccricount + 1;
      } else if (c.type == "Civil" && c.createdAt.substring(5, 7) == "12") {
        decccount = decccount + 1;
      }
    });

    // var another = filtercase.map((key) => {
    //   for (var nkey in key) {
    //     filtercase[0][nkey].map((cs) => {
    //       if (cs.createdAt.substring(5, 7) == "07") {
    //         console.log(cs);
    //         return (
    //           <tr>
    //             <td>July</td>
    //             <td>{cs.name}</td>
    //           </tr>
    //         );
    //       }
    //     });
    //   }
    // });

    // var display = filtercase.map((key) => {
    //   for (var nkey in key) {
    //     console.log(nkey);
    //     return <td>{nkey}</td>;
    //   }
    // });
    // console.log(filtercase);
    // console.log(newyaer);
    // console.log(cur);
    // console.log(this.props.location.state.dept);
    // console.log(this.state.cases);
    console.log(closeca);
    console.log(activeca);
    var chartData = {
      labels: ["Civil", "Criminal"],

      datasets: [
        {
          label: "Count",
          data: [civcount, cricount],
          backgroundColor: ["green", "red"],
        },
      ],
    };

    var options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: this.state.year,
      },
      axisX: {
        title: "Type",
      },
      axisY: {
        title: "Count",
        labelFormatter: this.addSymbols,
      },
      data: [
        {
          type: "bar",
          dataPoints: [
            { y: cricount, label: "Criminal" },
            { y: civcount, label: "Civil" },
          ],
        },
      ],
    };
    console.log(this.state.year);
    return (
      <>
        <DeptHead name="Dashboard" />
        <div className="d1">
          <div className="row">
            <Button
              color="dark"
              onClick={this.handleClosed}
              className="buttons"
            >
              <i
                style={{ marginRight: "10px" }}
                class="fa fa-times-circle-o"
                aria-hidden="true"
              ></i>
              <span className="vertical"></span>
              Closed Cases
            </Button>
            <Button
              color="dark"
              onClick={this.handleActive}
              className="buttons1"
            >
              <i
                style={{ marginRight: "10px" }}
                class="fa fa-user-secret"
                aria-hidden="true"
              ></i>
              <span className="vertical"></span>
              Active Cases
            </Button>
          </div>
          <div className="row">
            <div className="card heardate">
              <p
                style={{
                  marginLeft: "2vh",
                  marginTop: "4%",
                  fontSize: "30px",
                  color: "white",
                  letterSpacing: "2px",
                }}
                className="card-title dd16"
              >
                <i
                  style={{ marginRight: "5vh" }}
                  class="fa fa-calendar"
                  aria-hidden="true"
                ></i>
                Next Hearing Date
                <i
                  style={{ marginLeft: "6vh" }}
                  class="fa fa-calendar"
                  aria-hidden="true"
                ></i>
              </p>
              <div className="row date">
                <div className="card dates">{this.state.dd}</div>
                <div className="card dates">{this.state.mm}</div>
                <div className="card dates">{this.state.yy}</div>
              </div>
            </div>
            {/* <Circle progress={60} size={150}>
          <Circle progress={30} size={100} className="newdash4"></Circle>
        </Circle> */}
            <div style={{ marginRight: "-3vh" }} className=" row newdash15">
              <div className="dash2">
                <CircularProgressbarWithChildren
                  value="100"
                  className="dash6 "
                  styles={buildStyles({
                    pathColor: "#fc061e",
                  })}
                >
                  <div className="dash3">
                    <CircularProgressbarWithChildren
                      value={ac}
                      className="dash6 "
                      styles={buildStyles({
                        pathColor: "#220dfc",
                      })}
                    >
                      <div className="dash5">
                        <CircularProgressbarWithChildren
                          value={cl}
                          className="dash6"
                          styles={buildStyles({
                            pathColor: "#16e442",
                          })}
                        >
                          <h1 className="dash7">Cases</h1>
                        </CircularProgressbarWithChildren>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
            <div  className="legen">
              <div className="row">
                <div class="color-boxx"></div>
                <span className="leg1">
                  Totals Cases <span>&nbsp;</span> {total}
                </span>
              </div>
              <div className="row">
                <div class="color-boxx1"></div>
                <span className="leg2">
                  Active Cases <span>&nbsp;</span> {activeca}
                </span>
              </div>
              <div className="row">
                <div class="color-boxx2"></div>
                <span style={{marginTop:'6.5vh'}} className="leg3">
                  Closed Cases <span></span> {closeca}
                </span>
              </div>
            </div>
            {/* <div className="dd15">
              <CircularProgressbarWithChildren
                styles={buildStyles({
                  pathColor: "#000",
                  border: "none",
                })}
              >
                <div className="dd14">
                  <CircularProgressbarWithChildren
                    value={100}
                    className="newdash6 line1"
                    styles={buildStyles({
                      pathColor: "#fc061e",
                    })}
                  >
                    <div className="newdash5">
                      <CircularProgressbarWithChildren
                        value={100}
                        className="newdash6"
                        styles={buildStyles({
                          pathColor: "#e8f009",
                        })}
                      >
                        <h1 className="newdash7">100</h1>
                      </CircularProgressbarWithChildren>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren>
            </div> */}
          </div>
          <p className="tablehead">MONTHLY CASE STATISTICS</p>
          <Input
              name="year"
              id="year"
              type="select"
              className="inn2"
              placeholder="Select the year"
              onChange={this.onChange}
              value={this.state.year}
              innerRef={(input) => (this.year = input)}
            >
              <option>Select the Year</option>
              {newyaer.map((n) => {
                return <option>{n}</option>;
              })}
            </Input>
          <div className="iinn">            
          </div>
          <div className="row tabless">
            <div className="col-12">
              <div className="table-responsive">
                <table
                  className="table tabb1 "
                  style={{ width: "96%", marginLeft: "0vh" }}
                >
                  <thead className="thead-light">
                    <tr>
                      <th>
                        <span style={{ fontSize: "20px", marginLeft: "12px" }}>
                          Month
                        </span>
                      </th>
                      <th style={{ fontSize: "20px" }}>Criminal</th>
                      <th style={{ fontSize: "20px" }}>Civil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jan</td>
                      <td>{jancricount}</td>
                      <td>{janccount}</td>
                    </tr>
                    <tr>
                      <td>Feb</td>
                      <td>{febcricount}</td>
                      <td>{febccount}</td>
                    </tr>
                    <tr>
                      <td>Mar</td>
                      <td>{marcricount}</td>
                      <td>{marccount}</td>
                    </tr>
                    <tr>
                      <td>Apr</td>
                      <td>{aprcricount}</td>
                      <td>{aprccount}</td>
                    </tr>
                    <tr>
                      <td>May</td>
                      <td>{maycricount}</td>
                      <td>{mayccount}</td>
                    </tr>
                    <tr>
                      <td>June</td>
                      <td>{juncricount}</td>
                      <td>{junccount}</td>
                    </tr>
                    <tr>
                      <td>July</td>
                      <td>{julycricount}</td>
                      <td>{julyccount}</td>
                    </tr>
                    <tr>
                      <td>Aug</td>
                      <td>{augcricount}</td>
                      <td>{augccount}</td>
                    </tr>
                    <tr>
                      <td>Sep</td>
                      <td>{sepcricount}</td>
                      <td>{sepccount}</td>
                    </tr>
                    <tr>
                      <td>Oct</td>
                      <td>{octcricount}</td>
                      <td>{octccount}</td>
                    </tr>
                    <tr>
                      <td>Nov</td>
                      <td>{novcricount}</td>
                      <td>{novccount}</td>
                    </tr>
                    <tr>
                      <td>Dec</td>
                      <td>{deccricount}</td>
                      <td>{deccricount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={{ width: "96%", marginLeft: "2%" }}>
            <div style={{ marginBottom: "5%" }} className="row">
              <h3 className="ddhead3">Bar Chart ( Year - Wise )</h3>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-12 col-md-8 chartd">
                <Bar
                  data={chartData}
                  width={100}
                  height={50}
                  options={{
                    scales: { xAxes: [{ barPercentage: 0.3 }] },
                  }}
                />
              </div>
            </div>
            {/* 
            <CanvasJSChart options={options} /> */}
          </div>
        </div>
      </>
    );
  }
}

export default Deptdashboard;

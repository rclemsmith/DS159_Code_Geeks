import React, { Component } from "react";
import SideNavBar from "./SideNavBar";
import { CanvasJSChart } from "canvasjs-react-charts";
import { Input } from "reactstrap";
import Head from "./Head";
import { Bar } from "react-chartjs-2";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "./styles/ndash.css";
import LineTo, { Line } from "react-lineto";
import axios from "axios";
import url from "../../backend_url";
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      cases: [],
      year: "",
    };
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

  componentDidMount() {
    axios
      .get(url + 
        "/department/admin/cases/" +
          localStorage.getItem("deptname")
      )
      .then((res) => {
        this.setState({
          cases: res.data,
        });
      })
      .catch((err) => {
        console.log("Error");
      });
  }

  render() {
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
    var n = this.state.date.getDate();
    var n1 = this.state.date.getMonth() +1;
    var n2 = this.state.date.getFullYear();
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

    console.log(julyccount);
    console.log(julycricount);
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

    var chartData = {
      labels: ["Civil", "Criminal"],
      datasets: [
        {
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

    console.log(filtercase);
    console.log(newyaer);

    // var julycount = 0;
    // var julycountc = 0;
    // july.map((seven) => {
    //   if (seven.type == "Criminal") {
    //     julycount += 1;
    //   } else if (seven.type == "Civil") {
    //     julycountc += 1;
    //   }
    // });
    return (
      <div
        style={{ backgroundColor: "rgb(240, 240, 240)", overflow: "hidden" }}
      >
        <Head name="Dashboard"></Head>
        <SideNavBar history={this.props.history}></SideNavBar>
        <div style={{ width: "100%" }}>
          <div style={{ marginLeft: "15vh" }} className="row">
            <div style={{ marginRight: "10vh" }} className="newdash15">
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
                      value={ac}
                      className="newdash66 "
                      styles={buildStyles({
                        pathColor: "#220dfc",
                      })}
                    >
                      <div className="newdash55">
                        <CircularProgressbarWithChildren
                          value={cl}
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

            <div className="legendd">
              <div style={{ marginTop: "3vh" }} className="row">
                <div class="color-boxx"></div>
                <span className="legg1">Total Cases {total}</span>
              </div>
              <div className="row">
                <div class="color-boxx1"></div>
                <span className="legg2">Active Cases {activeca}</span>
              </div>
              <div className="row">
                <div class="color-boxx2"></div>
                <span className="legg4">Closed Cases {closeca}</span>
              </div>
            </div>

            <div className="card newdash8">
              <h2 className="card-title newdash9">Today</h2>
              <div className="newdash14">
                <hr className="newdash13" />
              </div>
              <div className="card-body newdash10">
                <h3 className="newdash11">{n} : {n1} : {n2}</h3>
                <p className="newdash11">
                  <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
                </p>
              </div>
            </div>
          </div>
          {/* <LineTo fromAnchor="300px 400px" toAnchor="400px 500px" />
          <Line
            x0={950}
            y0={210}
            x1={1190}
            y1={210}
            borderWidth={3}
            borderColor={"#000"}
          />
          <Line
            x0={892}
            y0={270}
            x1={1190}
            y1={270}
            borderWidth={3}
            borderColor={"#000"}
          />
          <Line
            x0={925}
            y0={332}
            x1={1190}
            y1={332}
            borderWidth={3}
            borderColor={"#000"}
          />
          <Line
            x0={510}
            y0={220}
            x1={730}
            y1={220}
            borderWidth={3}
            borderColor={"#000"}
          />
          <Line
            x0={510}
            y0={295}
            x1={792}
            y1={295}
            borderWidth={3}
            borderColor={"#000"}
          />
          <Line
            x0={510}
            y0={370}
            x1={802}
            y1={370}
            borderWidth={3}
            borderColor={"#000"}
          /> */}

          <div className="inn">
            <span>MONTHLY CASE STATISTICS</span>
            <Input
              style={{marginLeft:'46vh',marginTop:'-5vh'}}
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
          </div>
          <div className="row tables">
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
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Jan</td>
                      <td>{jancricount}</td>
                      <td>{janccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Feb</td>
                      <td>{febcricount}</td>
                      <td>{febccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Mar</td>
                      <td>{marcricount}</td>
                      <td>{marccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Apr</td>
                      <td>{aprcricount}</td>
                      <td>{aprccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>May</td>
                      <td>{maycricount}</td>
                      <td>{mayccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>June</td>
                      <td>{juncricount}</td>
                      <td>{junccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>July</td>
                      <td>{julycricount}</td>
                      <td>{julyccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Aug</td>
                      <td>{augcricount}</td>
                      <td>{augccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Sep</td>
                      <td>{sepcricount}</td>
                      <td>{sepccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Oct</td>
                      <td>{octcricount}</td>
                      <td>{octccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Nov</td>
                      <td>{novcricount}</td>
                      <td>{novccount}</td>
                    </tr>
                    <tr style={{ fontWeight: "600", fontSize: "19px" }}>
                      <td>Dec</td>
                      <td>{deccricount}</td>
                      <td>{deccricount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                marginLeft: "36.3vh",
                marginRight: "10vh",
                marginBottom: "7vh",
              }}
              className="row"
            >
              <h3 className="ddhead3">Bar Chart ( Year - Wise )</h3>

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
        </div>
      </div>
    );
  }
}

export default Dashboard;

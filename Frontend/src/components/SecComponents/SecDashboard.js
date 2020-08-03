import React, { Component } from "react";
import SecSideBar from "./SecSidebar";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
class SecDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
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

  render() {
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
          </div>
        </div>
      </div>
    );
  }
}

export default SecDashboard;

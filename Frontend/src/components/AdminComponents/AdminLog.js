import React, { Component } from "react";
import SideBar from "./Sidebar";
import "./style/landing.css";

var count = -1;
class AdminLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: "",
    };
  }

  componentDidMount() {
    this.setState({
      logs: localStorage.getItem("reports"),
    });
  }

  render() {
    var arr = [];
    arr.push(this.state.logs.split(","));
    arr = arr.reverse();
    return (
      <div>
        <SideBar history={this.props.history} />
        <div className="lpadmin121">
          <h3 className="ad">
            <span>&nbsp;&nbsp;</span>Welcome Admin
          </h3>

          <div className="container alog1">
            <div className="table-responsive">
              <table class="table adlo1">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Logs</th>
                  </tr>
                </thead>
                <tbody>
                  {arr[0]
                    .slice(0)
                    .reverse()
                    .map((a) => {
                      count = count + 1;
                      if (count % 2 == 0) {
                        return (
                          <tr class="table-primary">
                            <td>{count}</td>
                            <td>{a}</td>
                          </tr>
                        );
                      } else if (count % 2 != 0) {
                        return (
                          <tr class="table-danger">
                            <td>{count}</td>
                            <td>{a}</td>
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

export default AdminLog;

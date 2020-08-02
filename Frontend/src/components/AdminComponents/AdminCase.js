import React, { Component } from "react";

class AdminCase extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleCurId = this.handleCurId.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCurId(id) {
    this.setState({
      curcaseid: id,
    });
  }

  handleSearch(val) {
    axios
      .post(url + "/search/" + this.dept.value, {
        query: val,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          cases: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  handleSelect(event) {
    event.preventDefault();
    this.setState({
      dept: this.dept.value,
    });
    axios
      .get(url + "/secretary/cases/filter/" + this.dept.value)
      .then((res) => {
        this.setState({
          cases: res.data,
        });
      });
  }

  handleChange = async (e) => {
    this.handleSearch(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    if (this.state.curcaseid) {
      this.props.history.push({
        pathname: "/" + localStorage.getItem("secId") + "/synopsis",
        state: { info: this.state.curcaseid },
      });
    }
    var n = [];
    var filter = [];

    const cas = this.state.cases.map((active) => {
      return (
        <div className="row">
          <div className="col-12 col-xl-4">
            <div
              className="card act1"
              onClick={() => this.handleCurId(active._id)}
            >
              <p className="card-title act2">{active.name}</p>
              <div className="card-body act3">
                <div>
                  <p className="act4">Type : {active.type}</p>
                </div>

                <div className="row" style={{ marginLeft: "0vh" }}>
                  <p style={{ wordSpacing: "4px" }} className="act4">
                    {" "}
                    Facts :{" "}
                  </p>
                  <span className="fact">
                    {active.facts.substring(0, 70)} ...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="lpttttt">
        <nav className="navbar  navbar-expand-sm bg-dark navbar-dark fixed-top">
          <Input
            className="ssearchinpu"
            value={this.state.value}
            name="search-input"
            placeholder="Search By Synopsis"
            onChange={(e) => this.handleChange(e)}
          />

          <button
            className="btn btn-primary lpbtn11"
            onClick={this.handleLogout}
            style={{
              marginLeft: "89vh",
              marginTop: "-4px",
              marginRight: "18px",
            }}
          >
            <i style={{ marginRight: "7px" }} className="fa fa-sign-out"></i>
            Logout
          </button>
        </nav>
        <div className="lanpp1"></div>
        <div className="lanp1">
          {" "}
          <div className="container">
            <Input
              name="dept"
              id="dept"
              type="select"
              className="secinn2"
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
        </div>

        <div className="row">{cas}</div>
      </div>
    );
  }
}

export default AdminCase;

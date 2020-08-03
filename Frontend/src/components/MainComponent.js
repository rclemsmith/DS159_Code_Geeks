import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SideNavBar from "./NodalOffComponents/SideNavBar";
import Dashboard from "./NodalOffComponents/Dashboard";
import NewCase from "./NodalOffComponents/NewCase";
import Home from "./HomeComponents/Home";
import Case from "./NodalOffComponents/Case";
import CasePage from "./NodalOffComponents/CasePage";
import Hearing from "./NodalOffComponents/Hearing";
import CurHearing from "./NodalOffComponents/CurHearing";
import Search from "./NodalOffComponents/Search";
import HearingUpdate from "./NodalOffComponents/HearingUpdate";
import SpeechNewCase from "./NodalOffComponents/SpeechNewCase";
import Deptdashboard from "./DeptOffComponents/Deptdashboard";
import Active from "./DeptOffComponents/Active";
import Closed from "./DeptOffComponents/Closed";
import DeptCasePage from "./DeptOffComponents/DeptCasePage";
import DeptCurHearing from "./DeptOffComponents/DeptCurHearing";
import DeptSearch from "./DeptOffComponents/DeptSearch";
import LawyerUpdate from "./NodalOffComponents/LawyerUpdate";
import CaseUpdate from "./NodalOffComponents/CaseUpdate";
import LandingPage from "./AdminComponents/LandingPage";
import Otppage from "./AdminComponents/Otppage";
import OtpPage from "./DeptOffComponents/OtpPage";
import NOtppage from "./NodalOffComponents/NOtppage";
import AddUser from "./NodalOffComponents/AddUser";
import SOtpage from "./SecComponents/SOtpage";
import LandPage from "./SecComponents/LandPage";
import AddSummary from "./NodalOffComponents/AddSummary";
import Synopsis from "./SecComponents/Synopsis";
import AdminCase from "./AdminComponents/AdminCase";
import AdDashboard from "./AdminComponents/AdDashboard";
import AdminLog from "./AdminComponents/AdminLog";
class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Switch>
          {/* <Route exact path="/" component={NewCase}></Route> */}
          {/* ADD EVERY ROUTES INSIDE THIS SWITCH */}
          <Route exact path="/" component={Home}></Route>
          <Route path="/:userId/dashboard" component={Dashboard}></Route>
          <Route path="/:userId/newcase" component={NewCase}></Route>
          <Route path="/:userId/myCases" component={Case}></Route>
          <Route path="/:userId/addsummary" component={AddSummary}></Route>
          <Route path="/:userId/casePage" component={CasePage}></Route>
          <Route path="/:userId/addHearing" component={Hearing}></Route>
          <Route path="/:userId/curHearing" component={CurHearing} />
          <Route path="/:userId/updateHearing" component={HearingUpdate} />
          <Route path="/:userId/caseUpdate" component={CaseUpdate} />
          <Route path="/:userId/search" component={Search} />
          <Route path="/:userId/lawyerUpdate" component={LawyerUpdate} />
          <Route path="/speech" component={SpeechNewCase} />
          <Route path="/:deptId/dept" component={Deptdashboard} />
          <Route path="/active" component={Active} />
          <Route path="/:deptId/closed" component={Closed} />
          <Route path="/:deptId/casepg" component={DeptCasePage} />
          <Route path="/:deptId/currHearing" component={DeptCurHearing} />
          <Route path="/:deptId/deptsearch" component={DeptSearch} />
          <Route path="/:adminId/adminPage" component={LandingPage} />
          <Route path="/verifyUser" component={Otppage} />
          <Route path="/verifyOfficial" component={OtpPage} />
          <Route path="/verifyNodal" component={NOtppage} />
          <Route path="/verifySec" component={SOtpage} />
          <Route path="/:secId/landpage" component={LandPage} />
          <Route path="/:secId/synopsis" component={Synopsis} />
          <Route path="/:adminId/admincase" component={AdminCase} />
          <Route path="/:userId/addUser" component={AddUser} />
          <Route path="/:secId/casepg" component={DeptCasePage} />
          <Route path="/:adminId/casepg" component={DeptCasePage} />
          <Route path="/:adminId/addashboard" component={AdDashboard} />
          <Route path="/:adminId/logs" component={AdminLog} />
        </Switch>
      </div>
    );
  }
}

export default Main;

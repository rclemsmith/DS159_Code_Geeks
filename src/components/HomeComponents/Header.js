import React from "react";
import { Jumbotron } from "reactstrap";
import icon from "../../images/icon.jpg";
const Header = (props) => {
  return (
    <Jumbotron className="jumbotron">
      <div className="row row-header">
        <div className="col-12 col-sm-1">
          <img
            src={icon}
            width="75vh"
            height="75vh"
            alt="Heros"
            className="navimg"
          ></img>
        </div>
        <div className="col-12 col-sm-10">
          <h2 style={{ marginLeft: "35px", marginTop: "-30px",position:'fixed',fontWeight:'600' }}>
            {props.name}
          </h2>
        </div>
      </div>
    </Jumbotron>
  );
};

export default Header;

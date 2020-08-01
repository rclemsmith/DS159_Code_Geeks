import React from "react";
import "./styles/jumbo.css";
import { Jumbotron } from "reactstrap";

function Head(props) {
  return (
    <div className="j5">
      <div className="row row-header">
        <div className="col-12 col-sm-10 j3">
          <h2 className="j4" style={{ marginLeft: "35px",marginTop:'15px'}}>
            {props.name}
          </h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Head;

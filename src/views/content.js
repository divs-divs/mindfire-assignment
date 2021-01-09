import React from "react";
import Users from "./users"


export default ({ close }) => (
  <div className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="header"> Modal Title </div>
    <div className="content">
      {" "}
     <Users />
    </div>
  </div>
);
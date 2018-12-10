import React from "react";
import { Route } from "react-router-dom";

export default props =>
  <Route
    path={props.href}

    children={({ match, history }) =>
      <a 
        onClick={(e) => {history.push(e.currentTarget.getAttribute("href")); e.preventDefault();}}
        {...props}
        className={match ? 'nav-link active' : 'nav-link'}
      >
        {props.children}
      </a>}
  />;

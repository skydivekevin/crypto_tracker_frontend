import React from "react";
import Transactions from './Transactions';

const Dashboard = props => {
  // console.log("props in dashboard: ", props)

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <h2>Status: {props.loggedInStatus ? "logged in" : "not logged in"} </h2>
        <Transactions/>
      </div>
    </div>
  );
};

export default Dashboard;



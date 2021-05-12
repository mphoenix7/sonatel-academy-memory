import "./styles/app.css";
import "./bootstrap";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const App = () => {
  useEffect(() => {
    let getUsers = fetch("http://localhost:8000/api/users", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      mode: "no-cors",
    }).then((response) => console.log(response.json()));
  }, []);
  return (
    <>
      <h1>it works</h1>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

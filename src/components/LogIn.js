import React, { useState } from "react";
import { redirect } from "react-router";

function LogIn(props) {
  const [id, setId] = useState();

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section id="log-in-page">
      <div className="container-lg text-center">
        <h1 className="title">Ask a Cougar</h1>
        <div className="spacer"></div>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="mb-3 text-center">
            <label for="id" className="form-label">
              Student ID
            </label>
            <input
              type="text"
              pattern="[0-9]{8}"
              className="form-control"
              id="id"
              onChange={handleChange}
            />
            <div id="idHelp" className="form-text">
              Please enter your 8-digit student ID number.
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "75%" }}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default LogIn;

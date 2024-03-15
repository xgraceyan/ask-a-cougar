import React, { useState } from "react";
import { redirect, useNavigate } from "react-router";

function LogIn(props) {
  const [id, setId] = useState();
  const [fname, setfname] = useState();
  const [lname, setlname] = useState();
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlefnameChange = (e) => {
    setfname(e.target.value);
  };

  const handlelnameChange = (e) => {
    setlname(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/", {
      state: { loggedIn: true, id: id, fname: fname, lname: lname },
    });
  };
  return (
    <section id="log-in-page">
      <div className="container-lg text-center">
        <h1 className="title">Ask a Cougar</h1>
        <div className="spacer"></div>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="mb-3 text-center">
            <label htmlFor="id" className="form-label">
              Student ID
            </label>
            <input
              type="text"
              pattern="[0-9]{8}"
              required="required"
              className="form-control"
              id="id"
              onChange={handleIdChange}
            />
            <div id="idHelp" className="form-text">
              Please enter your 8-digit student ID number.
            </div>
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="fname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              required="required"
              className="form-control"
              id="fname"
              onChange={handlefnameChange}
              placeholder="Ex. John"
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="lname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              required="required"
              className="form-control"
              id="lname"
              onChange={handlelnameChange}
              placeholder="Ex. Doe"
            />
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

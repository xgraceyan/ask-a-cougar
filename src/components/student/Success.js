import React, { useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router";

function Success(props) {
  let location = useLocation();
  const navigate = useNavigate();
  let authState = {};
  useEffect(() => {
    if (location.state == null) {
      redirect("/login");
    } else {
      authState = location.state;
    }
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    navigate("/", {
      state: {
        loggedIn: authState.loggedIn,
        id: authState.id,
        fname: authState.fname,
        lname: authState.lname,
      },
    });
  };

  return (
    <section id="student-page">
      <div className="container-lg">
        <h1 className="title text-center">Ask a Cougar</h1>
        <h4 className="text-center text-label-box">
          Thank you for submitting your response! We appreciate you helping our
          service project out. Now relax and enjoy the rest of homeroom!
        </h4>
        <h4 className="text-center text-label-box">
          <a href="#" onClick={onClick}>
            Have extra time? Answer another question.
          </a>
        </h4>
      </div>
    </section>
  );
}

export default Success;

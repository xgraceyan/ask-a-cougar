import React, { useEffect, useState } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function StudentView(props) {
  let location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [questionId, setQuestionId] = useState();
  const [questionName, setQuestionName] = useState();
  const [question, setQuestion] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (location.state == null) {
      console.log("null");
      redirect("/login");
    } else {
      const { loggedIn, id, fname, lname } = location.state;
      let { error, count, data } = await supabase
        .from("responses")
        .select("*", { count: "exact" })
        .eq("esuhsd_id", id);

      if (error) throw error;
      if (data) {
        console.log(data, count);
        if (count == 0) createUser(id, fname, lname);
        else {
          setId(data[0].esuhsd_id);
          if (data[0].response != null) {
            console.log("yes");
            navigate("/success");
          }
          getQuestion(data[0].question_id);
        }
      }
    }
  };

  const createUser = async (id, fname, lname) => {
    const questionId = Math.floor(Math.random() * 150) + 1;
    const { error } = await supabase.from("responses").insert({
      esuhsd_id: id,
      question_id: questionId,
      response: null,
      first_name: fname,
      last_name: lname,
    });
    if (error) throw error;
    else getQuestion(questionId);
    setId(id);
  };

  const getQuestion = async (questionNum) => {
    let { error, data } = await supabase
      .from("questions")
      .select("*")
      .eq("question_id", questionNum);

    if (error) throw error;
    if (data) {
      console.log(data);
      setQuestionId(questionNum);
      setQuestionName(data[0].first_name + " " + data[0].last_initial + ".");
      setQuestion(data[0].question);
    }
  };

  const submitResponse = async () => {
    console.log("submitted");
    const { errorRes } = await supabase
      .from("responses")
      .update({ response: response })
      .eq("esuhsd_id", id);
    if (errorRes) throw errorRes;

    const { errorQ } = await supabase
      .from("questions")
      .update({ responded: true })
      .eq("question_id", questionId);
    if (errorQ) throw errorQ;

    navigate("/success");
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitResponse();
  };

  if (location.state != null && location.state.loggedIn) {
    return (
      <section id="student-page">
        <div className="container-lg">
          <h1 className="title text-center">Ask a Cougar</h1>
          <h6 className="text-center text-label-box">
            <div className="fw-light fst-italic">
              Please write a letter responding to a middle school student's
              questions about the EVHS experience. Remember to write it in{" "}
              <u>letter format</u> and be <u>ROAR appropriate</u> in your
              response. Thank you for your help! ❤️
              <br />
              <br />
              You can go <a href="">here</a> for an example response.
            </div>
            <br />
            <br />
            ESUHSD ID: {id}{" "}
            <a>
              <Link to="/login">(Log out.)</Link>
            </a>
          </h6>
          <div className="row">
            <div className="col-lg-6 col-12" id="letter">
              <div className="card" style={{ marginBottom: "2rem" }}>
                <div className="card-body">
                  <h5 className="card-title">To a High School Student</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    from: {questionName}
                  </h6>
                  <br />
                  {question}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <form action="" id="response-form" onSubmit={handleSubmit}>
                <label htmlFor="response-input">
                  <h5>Your Response to {questionName}</h5>
                </label>
                <br />

                <textarea
                  id="response"
                  className="card"
                  rows="6"
                  cols="75"
                  placeholder="Enter text here"
                  required="required"
                  onChange={handleResponseChange}
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "75%" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  } else return <Navigate to="/login" />;
}

export default StudentView;

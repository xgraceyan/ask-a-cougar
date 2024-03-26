import React, { useEffect, useState } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function StudentView(props) {
  let location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
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
      // eslint-disable-next-line
      const { loggedIn, id, fname, lname } = location.state;
      // let { error, count, data } = await supabase
      //   .from("responses")
      //   .select("*", { count: "exact" })
      //   .eq("esuhsd_id", id);
      // if (error) throw error;

      createUser(id, fname, lname);

      // if (data) {
      //   console.log(data, count);
      //   if (count === 0) createUser(id, fname, lname);
      //   else {
      //     setId(data[0].esuhsd_id);
      //     setFname(data[0].first_name);
      //     setLname(data[0].last_name);
      //     if (data[0].response != null) {
      //       console.log("yes");
      //       navigate("/success");
      //     }
      //     getQuestion(data[0].question_id);
      //   }
      // }
    }
  };

  const createUser = async (id, fname, lname) => {
    // eslint-disable-next-line
    const { data, count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });
    const questionId = Math.floor(Math.random() * count) + 1;
    console.log(questionId);
    getQuestion(questionId);
    setId(id);
    setFname(fname);
    setLname(lname);
  };

  const getQuestion = async (questionNum) => {
    let { error, data } = await supabase
      .from("questions")
      .select("*")
      .eq("question_id", questionNum);
    if (error) throw error;
    if (!data[0]) setTimeout(() => {getQuestion(questionId)}, 1000);

    if (data[0]) {
    //   console.log(data);
      setQuestionId(questionNum);
      setQuestionName(data[0].first_name + " " + data[0].last_initial + ".");
      setQuestion(data[0].question);
      return data[0].question;
    }
  };

  const submitResponse = async () => {
    console.log("submitted");
    // const { errorRes } = await supabase
    //   .from("responses")
    //   .update({ response: response })
    //   .eq("esuhsd_id", id);
    const { errorRes } = await supabase.from("responses").insert({
      esuhsd_id: id,
      question_id: questionId,
      response: response,
      first_name: fname,
      last_name: lname,
    });
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
              questions about the EVHS experience. You can respond to as many
              different students as you want! Remember to write it in{" "}
              <u>letter format</u> and be <u>ROAR appropriate</u> in your
              response. Thank you for your help! ❤️
              <br />
              <br />
              {/* FIXME: link to example response */}
              You can go <a href="">here</a> for an example response.
            </div>
            <br />
            <br />
            ESUHSD ID: {id}{" "}
            <Link to="/login">(Log out.)</Link>
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
                  placeholder="Enter text here"  // FIXME: put default response
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

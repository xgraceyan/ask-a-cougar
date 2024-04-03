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
  const [questionsCompleted, setQuestionsCompleted] = useState();
  const [theme, setTheme] = useState(1);
  const count = 131;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    if (location.state == null) {
      redirect("/login");
    } else {
      // eslint-disable-next-line
      const { loggedIn, id, fname, lname } = location.state;
      let { error, count, data } = await supabase
        .from("users")
        .select("*", { count: "exact" })
        .eq("esuhsd_id", id);
      if (error) throw error;

      if (data) {
        // if there is no user
        if (count === 0) createUser(id, fname, lname);
        else {
          setId(data[0].esuhsd_id);
          setFname(data[0].fname);
          setLname(data[0].lname);
          setQuestionsCompleted(data[0].questions_completed);
          if (data[0].response != null) {
            navigate("/success");
          }

          assignQuestion(data[0].esuhsd_id, data[0].questions_completed);
        }
      }
    }
  };

  const generateQuestion = (questions_completed) => {
    const qId = Math.floor(Math.random() * count) + 1;
    if (questions_completed.includes(qId))
      generateQuestion(questions_completed);
    else return qId;
  };

  const assignQuestion = async (id, questions_completed) => {
    const { data, error } = await supabase
      .from("responses")
      .select("*")
      .eq("esuhsd_id", id)
      .eq("submitted", false);

    if (data) {
      if (data.length != 0) {
        // fetch existing question id
        getQuestion(data[0].question_id);
      } else {
        // randomly generate question & assign it
        const qId = generateQuestion(questions_completed);
        const { errorResponse } = await supabase.from("responses").insert({
          esuhsd_id: id,
          question_id: qId,
          response: null,
          submitted: false,
        });
        getQuestion(qId);
      }
    }
  };

  const createUser = async (id, fname, lname) => {
    // get random question & assign to user
    const { data, count } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true });
    const questionId = Math.floor(Math.random() * count) + 1;

    const { errorUser } = await supabase
      .from("users")
      .insert({ esuhsd_id: id, fname, lname, questions_completed: [] });

    const { errorResponse } = await supabase.from("responses").insert({
      esuhsd_id: id,
      question_id: questionId,
      response: null,
      submitted: false,
    });

    getQuestion(questionId);
    setId(id);
    setFname(fname);
    setLname(lname);
    setQuestionsCompleted([]);
  };

  const getQuestion = async (questionNum) => {
    let { error, data } = await supabase
      .from("questions")
      .select("*")
      .eq("question_id", questionNum);
    if (error) throw error;
    if (!data) console.log("ERROR no question found");

    if (data && data[0]) {
      setQuestionId(questionNum);
      setQuestionName(data[0].first_name + " " + data[0].last_initial + ".");
      setQuestion(data[0].question);
      // return data[0].question;
    }
  };

  const submitResponse = async () => {
    const { errorRes } = await supabase
      .from("responses")
      .update({ response: response, submitted: true, theme })
      .eq("esuhsd_id", id)
      .eq("question_id", questionId);
    // const { errorRes } = await supabase.from("responses").insert({
    //   esuhsd_id: id,
    //   question_id: questionId,
    //   response: response,
    //   first_name: fname,
    //   last_name: lname,
    // });
    if (errorRes) throw errorRes;

    const { errorQ } = await supabase
      .from("questions")
      .update({ responded: true })
      .eq("question_id", questionId);
    if (errorQ) throw errorQ;

    let qCompleted = questionsCompleted.push(questionId);

    const { errorU } = await supabase
      .from("users")
      .update({ questions_completed: questionsCompleted })
      .eq("esuhsd_id", id);
    if (errorU) throw errorU;

    navigate("/success");
  };

  const handleResponseChange = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitResponse();
  };

  let styleUrl = 'url("theme_' + theme + '_full.png")';

  if (location.state != null && location.state.loggedIn) {
    return (
      <section id="student-page">
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Letter Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div
                className="modal-body letter-preview-body"
                style={{ backgroundImage: styleUrl }}
              >
                <div id="letter-text">
                  <p>
                    <strong>
                      <pre>{response}</pre>
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            ESUHSD ID: {id} <Link to="/login">(Log out.)</Link>
          </h6>

          <div className="text-center" style={{ paddingBottom: "2rem" }}>
            <h4 className="title">Select a theme!</h4>
            <form
              action=""
              id="color-select"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option1"
                autocomplete="off"
                defaultChecked
                onClick={(e) => {
                  setTheme(1);
                }}
              />
              <label className="btn img-option" htmlFor="option1">
                <img src="theme_1.png" alt="" />
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option2"
                autocomplete="off"
                onClick={(e) => {
                  setTheme(2);
                }}
              />
              <label className="btn img-option" htmlFor="option2">
                <img src="theme_2.png" alt="" />
              </label>

              <input
                type="radio"
                className="btn-check"
                name="options"
                id="option4"
                autocomplete="off"
                onClick={(e) => {
                  setTheme(3);
                }}
              />
              <label className="btn img-option" htmlFor="option4">
                <img src="theme_3.png" alt="" />
              </label>
            </form>

            <button
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ width: "30%", height: "50%", marginTop: "1rem" }}
            >
              Preview Letter
            </button>
          </div>

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
                  placeholder="Enter text here" // FIXME: put default response
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

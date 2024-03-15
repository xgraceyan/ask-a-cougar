import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { supabase } from "../../supabaseClient";

function StudentView(props) {
  let location = useLocation();
  console.log(location.state);
  const { loggedIn, id, fname, lname } = location.state;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let { error, count, data } = await supabase
      .from("responses")
      .select("*", { count: "exact" })
      .eq("esuhsd_id", id);

    if (error) throw error;
    if (data) {
      console.log(data, count);
      if (count == 0) createUser();
    }
  };

  const createUser = async () => {};

  if (location.state != null && loggedIn) {
    return (
      <section id="student-page">
        <div className="container-lg">
          <h1 className="title text-center">Ask a Cougar</h1>
          <h6 className="text-center fw-light fst-italic text-label-box">
            Please write a letter responding to a middle school student's
            questions about the EVHS experience. Remember to write it in letter
            format and be ROAR appropriate in your response. Thank you for your
            help! ❤️
          </h6>
          <div className="row">
            <div className="col-lg-6 col-12" id="letter">
              <div className="card" style={{ marginBottom: "2rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Letter to High School Student</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    from: Grace Yan - Quimby Middle School
                  </h6>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Tempora, eveniet! Assumenda nesciunt fugiat eligendi molestiae
                  adipisci laboriosam error. Blanditiis, illo vel quasi facilis
                  nostrum sunt ratione qui praesentium quas magnam illum natus
                  velit error, nobis nam ipsa eos quam! Corporis reprehenderit,
                  tenetur cupiditate eum voluptatem eaque blanditiis. Ullam
                  eaque aperiam harum, doloremque vitae culpa laborum reiciendis
                  sunt est? Beatae, commodi harum dignissimos error illum, sint
                  esse mollitia deserunt tempora magni animi nesciunt delectus
                  rem aperiam.
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <form action="" id="response-form">
                <label htmlFor="response-input">
                  <h5>Your Response to Grace</h5>
                </label>
                <br />

                <textarea
                  id="response-input"
                  className="card"
                  rows="6"
                  cols="75"
                  placeholder="Enter text here"
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

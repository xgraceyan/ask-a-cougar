import logo from "./logo.svg";
import "./App.css";

import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StudentView from "./components/student/StudentView";
import AdminView from "./components/admin/AdminView";
import LogIn from "./components/LogIn";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import Success from "./components/student/Success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentView />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;

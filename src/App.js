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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentView />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentView from './components/student/StudentView';
import AdminView from './components/admin/AdminView';
import LogIn from './components/LogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentView />}/>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/admin" element={<AdminView />}/>
      </Routes>
    </Router>
  );
}

export default App;

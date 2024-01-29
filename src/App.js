import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import StudentView from './student/StudentView';
import AdminView from './admin/AdminView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentView />}/>
        <Route path="/admin" element={<AdminView />}/>
      </Routes>
    </Router>
  );
}

export default App;

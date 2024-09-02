import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Posts from './components/Posts'; // Import the Posts component
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<Posts />} /> {/* Ensure this line is present */}
        
      </Routes>
    </Router>
  );
}

export default App;

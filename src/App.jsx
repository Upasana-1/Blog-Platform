import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/Dashboard'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
       
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/" element={<Navigate to="/login" />} />
        
       
        <Route path="/Dashboard" element={<Navigate to="/dashboard" />} />
         <Route path="/CreatePost" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
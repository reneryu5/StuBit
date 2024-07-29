import { AuthProvider } from './components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoggedInHome from './pages/LoggedInHome';
import Profile from './pages/Profile';
import Studyspace from './pages/Studyspace';
import ProgressTracker from './pages/ProgressTracker';
import PrivateRoute from './PrivateRoute';
import NoteTaker from './pages/NoteTaker';
import { ThemeProvider, useTheme } from './components/ThemeContext'; 

import './App.css';

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studyspace" element={<PrivateRoute element={Studyspace} />} />
        <Route path="/progresstracker" element={<PrivateRoute element={ProgressTracker} />} />
        <Route path="/notes" element={<PrivateRoute element={NoteTaker} />} />
        <Route path="*" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loggedinhome" element={<LoggedInHome />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

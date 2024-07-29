import './Navbar.css'; // CSS file for styles
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext'; // Import the useAuth hook
import { useTheme } from './ThemeContext'; // Import the useTheme hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { user } = useAuth(); // Get user state from AuthContext
  const navigate = useNavigate(); // Use useNavigate hook to navigate
  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from ThemeContext

  // Function to handle click on Home link
  const handleHomeClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    if (user) {
      navigate('/loggedinhome'); // Redirect to /loggedinhome if user is logged in
    } else {
      navigate('/home'); // Redirect to /home if user is not logged in
    }
  };

  return (
    <nav className={`navbar ${theme}`}>
      <Link to="/home" onClick={handleHomeClick} className="nav-link home-link">Home</Link>
      {/* Conditionally render Get Started link based on user authentication */}
      {!user && <Link to="/login" className="nav-link login-link">Get Started</Link>}
      <Link to="/studyspace" className="nav-link studyspace-link">Studyspace</Link>
      <Link to="/progresstracker" className="nav-link progress-link">Progress Tracker</Link>
      <Link to="/notes" className="nav-link notes-link">Notes</Link>
      {/* Conditionally render Profile link based on user authentication */}
      {user && <Link to="/profile" className="nav-link profile-link">Profile</Link>}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
      </button>
    </nav>
  );
};

export default Navbar;

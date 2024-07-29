import { useAuth } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ProfilePicUploader from "../components/ProfilePicUploader";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook to navigate
  //Function to handle logout
  const handleLogout = () => {
    logout();
    navigate("/home"); // Redirect to home after logout
  };

  if (!user) {
    return (
      <div>
        <h2>You are not logged in</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }


  return (
    <div>
      <h2>Profile</h2>
      <ProfilePicUploader />
      <p>Username: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/loggedinhome">Go to Home</Link>
    </div>
  );
};

export default Profile;

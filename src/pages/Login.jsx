/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import './styles.css'


const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const addData = (e) => {
    e.preventDefault();
    setError("");  // Reset error messages

    const { email, password } = inpval;
    const getuserArr = localStorage.getItem("userDatabase");

    if (email === "") {
      setError("Email field is required");
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address");
    } else if (password === "") {
      setError("Password field is required");
    } else if (password.length < 5) {
      setError("Password length should be greater than five");
    } else {
      if (getuserArr) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((el) => {
          return el.email === email && el.password === password;
        });

        if (userlogin.length === 0) {
          setError("Invalid details");
        } else {
          console.log("User logged in successfully");
          login(userlogin[0]);
          navigate("/loggedinhome"); //Goes to Logged In Home page if it is True
        }
      } else {
        setError("No user found. Please sign up first.");
      }
    }
  };

  if (user) {
      navigate("/loggedinhome");
    
}

  return (
    <div className="form-container">
      <h2>Log In</h2>
      <form>
        <input
          type="email"
          name="email"
          value={inpval.email}
          onChange={getdata}
          placeholder="Enter email"
        />
        <input
          type="password"
          name="password"
          value={inpval.password}
          onChange={getdata}
          placeholder="Password"
        />
        <button type="submit" onClick={addData}>
          Log In
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up here</Link>
      </p>
    </div>
  );
};

export default Login;
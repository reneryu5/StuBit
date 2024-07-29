import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'

const Signup = () => {
  const navigate = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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

    const { name, email, password, confirm_password } = inpval;

    if (!name) {
      setError("Name field is required");
    } else if (!email) {
      setError("Email field is required");
    } else if (!email.includes("@")) {
      setError("Please enter a valid email address");
    } else if (!password) {
      setError("Password field is required");
    } else if (password.length < 5) {
      setError("Password length should be greater than five");
    } else if (!confirm_password) {
      setError("Confirm password field is required");
    } else if (confirm_password.length < 5) {
      setError("Confirm password length should be greater than five");
    } else if (confirm_password !== password) {
      setError("Confirm password doesn't match password");
    } else {
      const existingUsers = JSON.parse(localStorage.getItem("userDatabase")) || [];
      localStorage.setItem("userDatabase", JSON.stringify([...existingUsers, inpval]));
      console.log("Data added successfully");
      navigate("/login");
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome, Your Journey Begins Here!</h2>
      <p>Lets Sign Up!</p>
      <form onSubmit={addData}>
        <input
          type="text"
          name="name"
          value={inpval.name}
          onChange={getdata}
          placeholder="Enter username"
        />
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
          placeholder="Enter password"
        />
        <input
          type="password"
          name="confirm_password"
          value={inpval.confirm_password}
          onChange={getdata}
          placeholder="Confirm password"
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Signup;

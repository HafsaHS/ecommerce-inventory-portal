import React, { useRef } from "react";
// import { Link } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "../../lib/appwrite";
import { useNavigate } from "react-router";

const Login = () => {
  const loginForm = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = loginForm.current.email.value;
    const password1 = loginForm.current.password1.value;

    try {
      const response = await account.createEmailPasswordSession(
        email,
        password1
      );
      console.log("User has been Logged In:", response);
      navigate("/admin/");
      // Redirect or perform further actions upon successful registration
    } catch (error) {
      console.error("Login failed:", error);
      // Handle registration errors appropriately
    }
  };

  return (
    <div className="container">
      <form ref={loginForm} onSubmit={handleLogin}>
        <div className="form-field-wrapper">
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter email..."
          />
        </div>

        <div className="form-field-wrapper">
          <label>Password:</label>
          <input
            type="password"
            name="password1"
            placeholder="Enter password..."
            autoComplete="password1"
          />
        </div>

        <div className="form-field-wrapper">
          <input type="submit" value="Login" className="btn" />
        </div>
      </form>

      <p>{/* Already have an account? <Link to="/login">Login</Link> */}</p>
    </div>
  );
};

export default Login;

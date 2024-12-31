import React, { useRef } from "react";
// import { Link } from "react-router-dom";
import { ID } from "appwrite";
import { account } from "../../lib/appwrite";

const Register = () => {
  const registerForm = useRef(null);

  const handleRegistration = async (e) => {
    e.preventDefault();

    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;

    try {
      const response = await account.create(
        ID.unique(),
        email,
        password1,
        name
      );
      console.log("Registration successful:", response);
      // Redirect or perform further actions upon successful registration
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration errors appropriately
    }
  };

  return (
    <div className="container">
      <form ref={registerForm} onSubmit={handleRegistration}>
        <div className="form-field-wrapper">
          <label>Name:</label>
          <input required type="text" name="name" placeholder="Enter name..." />
        </div>

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
          <input type="submit" value="Register" className="btn" />
        </div>
      </form>

      <p>{/* Already have an account? <Link to="/login">Login</Link> */}</p>
    </div>
  );
};

export default Register;

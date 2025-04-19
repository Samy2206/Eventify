import React, { useState } from "react";
import "./StudentLogin.css";
import { auth } from "../../firebase.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../firebase.jsx";
import { useNavigate } from "react-router-dom";

const CollegeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lerror, setlError] = useState("");
  const [rerror, setrError] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setlError("");
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredentials.user.getIdToken();

      const response = await fetch("http://localhost:5000/user/college/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login Successful: ", data.msg);
        localStorage.setItem('collegeUid',data.uid)
        console.log(localStorage.getItem('collegeUid'))
        // Navigate("/CollegeDashBoard", { state: { uid: data.uid } });
        Navigate("/CollegeDashBoard");
      }
    } catch (e) {
      console.error("Login Error:", e.message);
      setlError("Invalid Login Credentials");
    }
  };

  const handleRegister = async () => {
    try {
      setrError("");
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredentials.user.getIdToken();
      const uid = userCredentials.user.uid;

      const response = await fetch(
        "http://localhost:5000/user/college/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ uid, email, name }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        const errText = data.message;
        throw new Error(errText || "Registration Failed");
      }

      console.log("Registration Successful: ", data.message);
      localStorage.setItem('collegeUid',uid)
      Navigate("/RegistrationDetails", { state: { uid: data.uid } }); //*Passing uid to registration details
    } catch (e) {
      console.error("Registration Error: ", e);
      // Extract Firebase error code if present
      const firebaseError = e.message.match(/\(auth\/(.*)\)/)?.[1];

      // Firebase error messages
      const firebaseErrorMessages = {
        "email-already-in-use": "Email is already registered.",
        "invalid-email": "Invalid email format.",
        "weak-password": "Password should be at least 6 characters.",
        "operation-not-allowed": "Account creation is disabled.",
        "too-many-requests": "Too many attempts. Try again later.",
      };

      // If it's a Firebase error, use mapped message; otherwise, use backend error
      setrError(
        firebaseError
          ? firebaseErrorMessages[firebaseError] || "Registration failed."
          : e.message
      );
    }
  };

  return (
    <>
      <div className="login-page">
        <h3 className="Eventify-logo">College</h3>
        <div className="login-page-inner">
          <div className="login-container">
            <h2>Login</h2>
            {lerror && <p className="errorText">{lerror}</p>}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
          <div className="gap"></div>
          <div className="register-container">
            <h2>Registration</h2>
            {rerror && <p className="errorText">{rerror}</p>}
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeLogin;

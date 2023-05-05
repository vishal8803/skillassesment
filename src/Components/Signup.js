import React, { useState } from "react";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import Axios from "../config/Axios";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

export const Signup = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const notify = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async () => {
    if (email == "" || password == "" || userName == "") {
      notify("Please enter all the fields...");
      return;
    }
    setLoading(true);
    const body = {
      userName: userName,
      userEmail: email,
      userPassword: password,
      userAge: 0,
    };

    

    const config = {
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
    };
    try {
      let result = await Axios.post("/auth/signup", body, config);
      setLoading(false);
      setLoading(false);
      setUserName("");
      setEmail("");
      setPassword("");
      console.log(JSON.stringify(result.data.user));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Signed Up successfully...",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.setItem("userInfo", JSON.stringify(result.data));
      props.setIsLogin(true);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      setEmail("");
      setPassword("");
      setUserName("");
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: err.response.data.message,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="login-box">
        <h2>Signup</h2>
        <div className="form">
          <label className="margin-top" htmlFor="signup-name">
            Name:
          </label>
          <input
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            type="text"
            id="signup-name"
            name="signup-name"
            required
          />
          <label className="margin-top" htmlFor="login-username">
            Email Id:
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            id="login-username"
            name="login-username"
            required
          />

          <label className="margin-top" htmlFor="login-password">
            Password:
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="login-password"
            name="login-password"
            required
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <button className="submitButton" onClick={() => handleSubmit()}>
              Signup
            </button>
          )}
        </div>
        <p>
          {" "}
          <br></br>
          Already have an account?{" "}
          <button onClick={() => navigate("/")}>Login</button>
        </p>
      </div>
    </div>
  );
};
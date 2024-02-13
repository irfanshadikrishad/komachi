import { useState } from "react";
import { useAuth } from "../store/auth.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { SERVER, storeTokenInLS } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function errorToast(error) {
    toast.error(error, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await fetch(`${SERVER}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const response = await request.json();
    if (request.status === 200) {
      storeTokenInLS(response.token);
      navigate("/profile");
    } else {
      errorToast(response.message);
      console.log(response);
    }
  };

  return (
    <section className="container login">
      <section className="loginImageContainer">
        <img
          draggable="false"
          src="/misskobayashi.png"
          className="loginImage"
        />
      </section>
      <form onSubmit={handleSubmit} className="login_form">
        <h1>Login</h1>
        <input
          required={true}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="username"
        />
        <input
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          autoComplete="true"
          placeholder="password"
        />
        <button>Login</button>
      </form>
      <ToastContainer />
    </section>
  );
}

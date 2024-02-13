import { useState } from "react";
import { useAuth } from "../store/auth.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();
  const { SERVER, storeTokenInLS } = useAuth();
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [subscribed, setSubscribed] = useState(false);
  const handleInput = async (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };
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
    const request = await fetch(`${SERVER}/api/v1/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signup.username,
        email: signup.email,
        password: signup.password,
        subscribed: subscribed,
      }),
    });
    const response = await request.json();
    if (request.status === 200) {
      storeTokenInLS(response.token);
      navigate("/profile");
    } else {
      errorToast(response.message);
    }
  };
  return (
    <section className="container signup">
      <section className="signupImageContainer">
        <img
          src="/misskobayashi.png"
          className="signupImage"
          draggable="false"
        />
      </section>
      <form onSubmit={handleSubmit} className="signup_form">
        <h1>Sign Up</h1>
        <input
          onChange={handleInput}
          name="username"
          value={signup.username}
          type="text"
          autoComplete="off"
          placeholder="username"
        />
        <input
          onChange={handleInput}
          name="email"
          value={signup.email}
          type="email"
          autoComplete="off"
          placeholder="email"
        />
        <input
          onChange={handleInput}
          name="password"
          value={signup.password}
          type="password"
          autoComplete="off"
          placeholder="password"
        />
        <div className="signup_checkbox">
          <input
            onChange={() => {
              setSubscribed(!subscribed);
            }}
            name="subscribed"
            value={signup.subscribed}
            type="checkbox"
          />
          <p>Subscribe me to the newsletter</p>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </section>
  );
}

import { useState } from "react";
import axios from "axios";
import "./loginStyles.css";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../features/UserLoggedInSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: "https://cuttevents.herokuapp.com/v1/users/login",
        data: {
          email: data.email,
          password: data.password,
        },
      });
      if (res.data.status === "success") {
        dispatch(LOGIN(res.data));
        console.log(res.data.data.user);
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary">Log into your account</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              required
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="form__input"
              type="password"
              placeholder=".........."
              required
              minLength={8}
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="form__group">
            <button type="submit" className="btn btn-green">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

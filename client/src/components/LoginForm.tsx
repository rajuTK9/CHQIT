import React, { useState } from "react";
import { User } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setToken } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

function LoginForm() {
  const dispatch = useAppDispatch();
  const initialValues: User = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<User>(initialValues);

  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
    return res.json();
  };

  const loginMutate = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setToken(data.access_token));
        navigate("/home");
      }
    },
  });
  return (
    <div className="login-form">
      <form
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          loginMutate.mutate();
        }}
      >
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@doe.com"
            id="email"
            className="email"
            required
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-element">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            id="password"
            className="password"
            required
            onChange={onChangeHandler}
          />
        </div>
        <button formAction="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

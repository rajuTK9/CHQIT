import React, { useState } from "react";
import { User } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setToken } from "../features/auth/authSlice";
import { useAppDispatch } from "../app/hooks";

function RegisterForm() {
  const dispatch = useAppDispatch();
  const initialValues: User = {
    id: 0,
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

  const register = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...formData, id: Date.now() }),
      }
    );
    return res.json();
  };

  const registerMutate = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (data.success) {
        dispatch(setToken(data.access_token));
        navigate("/home");
      }
    },
  });
  return (
    <div className="register-form">
      <form
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          registerMutate.mutate();
        }}
      >
        <div className="form-element">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            id="name"
            className="name"
            required
            onChange={onChangeHandler}
          />
        </div>
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
          Create an account
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

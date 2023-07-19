import { Request, Response } from "express";
import authService from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const data = await authService.register(name, email, password);

  if (data instanceof Error) {
    res.status(400).send({
      success: false,
      message: data.message,
    });
    return;
  }

  res.cookie("access_token", data, {
    maxAge: 60 * 60 * 24 * 30 * 1000,
    // httpOnly: true,
    secure: true,
  });

  res.status(200).send({
    success: true,
    message: "User registered successfully.",
    access_token: data,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password);

  if (data instanceof Error) {
    res.status(400).send({
      success: false,
      message: data.message,
    });
    return;
  }

  res.cookie("access_token", data, {
    maxAge: 60 * 60 * 24 * 30 * 1000,
    // httpOnly: true,
    secure: true,
  });

  res.status(200).send({
    success: true,
    message: "User logged in successfully.",
    access_token: data,
  });
};

export default {
  register,
  login,
};

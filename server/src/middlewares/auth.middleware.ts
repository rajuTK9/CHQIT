import { Request, Response, NextFunction } from "express";
import jwtUtils from "../utils/jwt.utils";

export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers.authorization ||
    typeof req.headers.authorization !== "string"
  ) {
    return next(new Error("Invalid Auth Header"));
  }
  let token = req.headers.authorization!.split(" ")[1];
  let payload = jwtUtils.verifyToken(token);
  res.locals.user = payload;
  next();
};

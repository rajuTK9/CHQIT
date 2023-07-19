import { Request, Response } from "express";
import userService from "../services/user.service";

const getDetail = async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const data = await userService.getDetail(id);
  res.status(200).send({
    success: true,
    message: "User detail fetched successfully.",
    data,
  });
};

export default { getDetail };

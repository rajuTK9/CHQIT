import User from "../models/user.model";

import bcrypt from "bcrypt";
import jwtUtils from "../utils/jwt.utils";

const register = async (name: string, email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const hashedPass = await bcrypt.hash(password, 10);
    const data = await User.create({
      name,
      email,
      password: hashedPass,
    });

    const accessToken = jwtUtils.signToken(data.dataValues);

    return accessToken;
  } else {
    return new Error("User already exist");
  }
};

const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const userPassword: string = user.get("password") as string;
    if (await bcrypt.compare(password, userPassword)) {
      const accessToken = jwtUtils.signToken(user.dataValues);
      return accessToken;
    } else {
      return new Error("Invalid credentials");
    }
  } else {
    return new Error("User doesn't exist");
  }
};

export default {
  register,
  login,
};

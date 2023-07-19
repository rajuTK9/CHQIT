import User from "../models/user.model";

const getDetail = async (id: number) => {
  return await User.findOne({ where: { id } });
};

export default {
  getDetail,
};

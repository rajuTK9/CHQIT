import { DataTypes } from "sequelize";
import db from "../config/db.config";
import User from "./user.model";

const Checklist = db.define(
  "checklist",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Checklist;

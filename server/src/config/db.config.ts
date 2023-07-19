import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    // logging: false,
  }
);

export const init = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

export default sequelize;

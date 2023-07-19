import User from "./user.model";
import Checklist from "./checklist.model";
import db from "../config/db.config";

// Define associations
User.hasMany(Checklist, { foreignKey: "userId" });
Checklist.belongsTo(User, { foreignKey: "userId" });

// Sync the models with the database
db.sync({ force: false }) // Set `force` to true to drop existing tables
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

export { User, Checklist };

require("dotenv").config();
const mongoose = require("mongoose");
const RolesModels = require("../Role");
const UserModels = require("../User");
const { logger, encryptPassword } = require("../../helpers");
const { roles, users } = require("./documents");

const dbPath = process.env.DB_PATH || "mongodb://localhost:27017/dev";

const seedDb = async () => {
  try {
    await mongoose.connect(dbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    logger.log(`Conectado a la bd:`, dbPath);

    const superAdminExists = await UserModels.find({ userName: "SuperAdmin" });

    if (superAdminExists.length !== 0) {
      logger.log("superAdminExists", superAdminExists);
      await mongoose.disconnect();
      return;
    }

    const superAdminUser = new UserModels(users);
    superAdminUser.password = await encryptPassword(users.password);
    superAdminUser.role = await superAdmin();
    const superAdminUserCreated = await superAdminUser.save();

    logger.log("superAdmin created", superAdminUserCreated);

    await mongoose.disconnect();
  } catch (error) {
    console.log("error", error.message);
    process.exit(1);
  }
};

async function superAdmin() {
  const findSuperAdmin = await RolesModels.find({ name: "superadmin" });
  if (findSuperAdmin.length > 0) return findSuperAdmin[0]._id;

  let superAdminId = "";
  for (const role of roles) {
    const createRole = new RolesModels({ name: role });
    if (createRole.name === "superadmin") {
      superAdminId = createRole._id;
    }
    await createRole.save();
    logger.log("Roles created", createRole);
  }
  return superAdminId;
}

module.exports = seedDb();

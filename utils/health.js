const mongoose = require("mongoose");

const healthCheck = async (req, res) => {
  let serverStatus = "OK";
  let databaseStatus = "DOWN";

  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.admin().ping();
      databaseStatus = "OK";
    } else {
      serverStatus = "DOWN";
    }
  } catch (error) {
    serverStatus = "DOWN";
    databaseStatus = "DOWN";
  }

  if (databaseStatus !== "OK") {
    serverStatus = "DOWN";
  }

  const payload = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    server: {
      status: serverStatus,
    },
    database: {
      status: databaseStatus,
    },
  };

  const statusCode = serverStatus === "OK" ? 200 : 503;
  return res.status(statusCode).json(payload);
};

module.exports = healthCheck;

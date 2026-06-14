const { sendSuccess } = require("../utils/responseHandler");

const getCurrentUser = async (req, res, next) => {
  try {
    sendSuccess(res, 200, "User route working", req.user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
};
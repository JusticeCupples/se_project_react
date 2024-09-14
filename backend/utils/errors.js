const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  BAD_REQUEST: "Invalid data provided",
  UNAUTHORIZED: "Authorization required",
  FORBIDDEN: "You do not have permission to perform this action",
  NOT_FOUND: "Resource not found",
  CONFLICT: "User with this email already exists",
  SERVER_ERROR: "Internal server error",
};

module.exports = {
  ERROR_CODES,
  ERROR_MESSAGES,
};

const statusCodes = {
  // ✅ Success Responses
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // ✅ Client Error Responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // ✅ Server Error Responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // ✅ Authentication / Authorization Common
  TOKEN_EXPIRED: 401,
  INVALID_TOKEN: 401,
  ACCESS_DENIED: 403,

  // ✅ Database Related (custom mapping)
  DATABASE_ERROR: 500,
  VALIDATION_ERROR: 422
};

export default statusCodes;
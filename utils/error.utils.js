class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = CustomError;
  
  // const { StatusCodes } = require("http-status-codes");
  
  // class ErrorUtils {
  //   constructor(statusCode, message) {
  //     this.statusCode = statusCode;
  //     this.message = message;
  //   }
  
  //   static handleInternalServerError(res) {
  //     return this.handleErrorResponse(
  //       res,
  //       StatusCodes.INTERNAL_SERVER_ERROR,
  //       "서버에서 예상치 못한 오류가 발생했습니다."
  //     );
  //   }
  
  //   handleErrorResponse(res, statusCode, message) {
  //     return res.status(statusCode).json({
  //       message: message,
  //     });
  //   }
  // }
  
  // module.exports = ErrorUtils;
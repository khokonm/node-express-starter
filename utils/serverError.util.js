const serverError = (res, statusCode, message) => {
    let code = statusCode;
    if (!statusCode) code = 500;
  
    if (!message) {
      return res.status(code).json({
        status: false,
        message: "Something went wrong",
      });
    }
  
    return res.status(code).json({
      status: false,
      message,
    });
  };
  
  module.exports = serverError;
  
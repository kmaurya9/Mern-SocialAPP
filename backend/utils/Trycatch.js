const TryCatch = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      // Log the full error for debugging
      console.error("[TryCatch Error]", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        endpoint: `${req.method} ${req.path}`,
      });

      // Return error to client
      const statusCode = error.response?.status || 500;
      const message = error.response?.data?.status_message || 
                      error.response?.data?.message ||
                      error.message || 
                      "Internal Server Error";

      res.status(statusCode).json({
        message: message,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  };
};

export default TryCatch;

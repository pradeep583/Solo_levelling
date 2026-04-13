/**
 * Custom request logger middleware
 * Logs incoming requests with method, path, and response details
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Capture the original send function
  const originalSend = res.send;

  // Override send to log response
  res.send = function (data) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const statusIcon = statusCode >= 400 ? '✗' : '✓';

    console.log(
      `${statusIcon} [${new Date().toISOString()}] ${req.method} ${req.path} - ` +
      `Status: ${statusCode} - Duration: ${duration}ms`
    );

    return originalSend.call(this, data);
  };

  next();
};

export default requestLogger;

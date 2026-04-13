/**
 * Global error handler middleware
 * Catches all errors and returns formatted responses
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${status} - ${message}`);
  if (err.stack) console.error(err.stack);

  res.status(status).json({
    error: true,
    status,
    message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;

/**
 * Promise wrapper to catch errors in async middleware / handlers.
 * Feeds errors to the next middleware block.
 *
 * @param {Function} requestHandler - Async function to wrap
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

module.exports = asyncHandler;

/**
 * Returns true if user is has authorization token
 * @param {Object} context Context object passed from server
 */
module.exports = () => async context => {
  const authExist =
    context?.params?.headers?.Authorization ||
    context?.params?.headers?.authorization;
  return !!authExist;
};

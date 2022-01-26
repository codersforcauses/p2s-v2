/**
 * Removes fields from context.data
 * @param {Object} context Context object passed from server
 */
module.exports = (context, args) => {
  const queryFields = Object.keys(context.data);
  const results = queryFields.filter(field => {
    const numMatches = args.filter(arg => field.indexOf(arg) >= 0);
    return numMatches.length > 0;
  });
  return results;
};

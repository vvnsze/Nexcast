
exports.responseFormatter = (success, message, response = {}) => (
  { success, message, response }
);

exports.filterParams = (req, params) => {
  const keys = Object.keys(req.body);

  return params.reduce((acc, param) => {
    if (keys.indexOf(param) !== -1) {
      acc[param] = req.body[param];
    }
    return acc;
  }, {});
};

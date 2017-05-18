
exports.responseFormatter = (success, message, response = {}) => (
  { success, message, response }
);

exports.filterParams = (req, params) => (
  params.reduce((acc, param) => {
    if (req.body[param]) {
      acc[param] = req.body[param];
    }
    return acc;
  }, {})
);

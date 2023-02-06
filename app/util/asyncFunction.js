// asyncFunction Handler
module.exports = (asyncController) => {
  return async (req, res, nxt) => {
    try {
      // business logic
      await asyncController(req, res);
    } catch {
      nxt(errs);
    }
  };
};

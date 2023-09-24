// Middleware for extracting the 'page' parameter from the URL
const extractPage = (req, res, next) => {
  const { query } = req;
  const page = parseInt(query.page) || 1;
  req.page = page;
  next();
};

module.exports = extractPage;

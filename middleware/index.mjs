// ====== Middleware helper ======

export const isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }

  res.status(401).send({ error: 'You must login frist.'})
};

// =================================

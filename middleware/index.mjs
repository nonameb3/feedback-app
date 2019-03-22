// ====== Middleware helper ======

export const isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }

  res.status(401).send({ error: 'You must login frist.'})
}

export const requireCredits = function(req, res, next) {
  if (req.user.credits > 1) {
      return next();
  }

  res.status(403).send({ error: 'You don\'t have enough credits.'})
}

// =================================

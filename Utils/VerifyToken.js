import jwt from "jsonwebtoken";
import { createError } from "../Utils/Error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user._id === req.params._id || req.user.isAdmin) {
      return next();
    } else {
      return next(createError(403, `It's not your account!`));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      return next();
    } else {
      return next(createError(403, "You are not admin!"));
    }
  });
};

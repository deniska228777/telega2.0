import { TokenService } from "./tokencontroller/TokenService.js";

export const authChecker = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("expired 1");
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).send("expired 2");
    }
    const user = TokenService.validateAccessToken(accessToken);
    if (!user) {
      return res.status(401).send("expired 3");
    }
    next();
  } catch (error) {
    res.status(401).send("expired");
  }
};

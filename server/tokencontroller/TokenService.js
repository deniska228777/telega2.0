import jwt from "jsonwebtoken";
import Token from "./Token.js";

export class TokenService {
  static generateToken(data) {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const decodedAccessToken = jwt.decode(accessToken);
    const decodedRefreshToken = jwt.decode(refreshToken);

    return {
      accessToken,
      refreshToken,
      expiry: decodedAccessToken.exp,
    };
  }
  static async saveRefresh(id, refreshToken) {
    const findOne = await Token.findOne({ user: id });
    if (findOne) {
      findOne.refreshToken = refreshToken;
      await findOne.save();
    }
    const newToken = await Token.create({
      user: id,
      refreshToken,
    });
    return newToken;
  }
  static validateAccessToken(token) {
    if (!token) {
      return null;
    }
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return user;
  }
  static validateToken(token) {
    if (!token) {
      return null;
    }
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return user;
  }
  static async findToken(token) {
    const tokenData = await Token.findOne({ refreshToken: token });
    return tokenData;
  }
  static async deleteToken(refreshToken) {
    const token = await Token.deleteOne({ refreshToken: refreshToken });
    return token;
  }
}

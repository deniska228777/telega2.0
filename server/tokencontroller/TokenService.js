import jwt from "jsonwebtoken"
import Token from "./Token.js";

export class TokenService {
    static generateToken(data) {
        const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '10m'  
        });
        const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d'  
        });
        return {
            accessToken,
            refreshToken
        }
    }
    static async saveRefresh(id, refreshToken) {
        const findOne = await Token.findOne({user: id})
        if (findOne) {
            findOne.refreshToken = refreshToken;
            findOne.save()
        }
        const newToken = await Token.create({
            user: id,
            refreshToken
        })
        return newToken;
    }
}
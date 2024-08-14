import User from "./User.js";

export class UserOperations {
    static async create({ username, email, password }) {
        const newUser = await User.create({
            username,
            email,
            password
        })
        return newUser;
    }
    static async findOneByEmail({ email }) {
        const foundUser = await User.findOne({ email: email });
        return foundUser;
    }
    static async findOneById({ id }) {
        const foundUser = await User.findById(id)
        return foundUser;
    }
}
import bcrypt from "bcrypt";
import { UserOperations } from "./usercontroller/UserOperations.js";
import { TokenService } from "./tokencontroller/TokenService.js";
import dto from "./usercontroller/dto.js";
import User from "./usercontroller/User.js";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const emailMessage = "Please enter a valid Email or Password!";
  if (!validateEmail(email)) {
    return res.status(400).send(emailMessage);
  }
  await UserOperations.create({
    username,
    email,
    password: hashPassword,
  })
    .then(async (newUser) => {
      const someUserData = dto(newUser);
      console.log({ ...someUserData });
      const tokens = TokenService.generateToken({ ...someUserData });
      await TokenService.saveRefresh(someUserData.id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json({
        message: "User created successfully",
        user: someUserData,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiry: tokens.expiry,
      });
    })
    .catch((err) => {
      if (
        err.errorResponse.code === 11000 &&
        Object.keys(err.errorResponse.keyPattern) == "username"
      ) {
        console.log(err);
        const message = "Username should be unique!";
        return res.status(400).send(message);
      }
      if (
        err.errorResponse.code === 11000 &&
        Object.keys(err.errorResponse.keyPattern) == "email"
      ) {
        console.log(err);
        const message = "Email should be unique!";
        res.status(400).send(message);
      }
    });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await UserOperations.findOneByEmail({ email: email });
  const emailMessage = "Please enter a valid Email!";
  const message = "Email or password is incorrect!";
  if (!foundUser) {
    return res.status(400).send(message);
  }
  const checkPassword = bcrypt.compare(password, foundUser.password);
  if (!checkPassword) {
    return res.status(400).send(message);
  }
  if (!validateEmail(email)) {
    return res.status(400).send(emailMessage);
  }
  const user = dto(foundUser);
  const tokens = TokenService.generateToken({ ...user });
  await TokenService.saveRefresh(user.id, tokens.refreshToken);
  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).send({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiry: tokens.expiry,
    user,
  });
};
export const logout = async (req, res) => {
  const { refreshToken } = req.cookies;
  const token = await TokenService.deleteToken(refreshToken);
  res.clearCookie("refreshToken");
  return res.status(200).send(token);
};
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const someUserData = TokenService.validateToken(refreshToken);
    const findToken = await TokenService.findToken(refreshToken);
    console.log(someUserData);
    console.log(findToken);
    if (!someUserData || !findToken) {
      res.status(401).send("token doesnt exist");
    }

    const user = await UserOperations.findOneById({ id: someUserData.id });
    const { id, email, password } = user;
    const userDto = {
      id,
      email,
      password,
    };
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveRefresh(user.id, tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).send({
      ...tokens,
      user: userDto,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
};

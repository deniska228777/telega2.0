import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chats: [{type: String, ref: 'Chat'}]
});

export default mongoose.model("Users", user);
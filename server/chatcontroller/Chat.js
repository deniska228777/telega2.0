import { Schema, model } from 'mongoose';

const Chat = new Schema({
  chat_id: {type: String, required: true, unique: true},
  firstUser: {type: Schema.Types.ObjectId, required: true, ref: "Users"},
  secondUser: {type: Schema.Types.ObjectId, required: true, ref: "Users"},
  messages: [{type: Schema.Types.ObjectId, ref: 'message'}]
})

Chat.index({ firstUser: 1, secondUser: 1 }, { unique: true });

export default model("Chat", Chat);
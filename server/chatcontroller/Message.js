import { Schema, model } from "mongoose";

const Message = new Schema({
  messageId: {type: String, required: true},
  sender: {type: Schema.Types.ObjectId, required: true, ref: "User"},
  messageText: {type: String, required: true},
  time: {type: Date, default: Date.now},
  checkStatus: {type: String, enum: ['sent', 'delivered', 'checked'], default: 'sent'}
})

export default model('message', Message);
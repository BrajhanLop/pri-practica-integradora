import { Schema, model } from 'mongoose'

const messagesSquema = Schema({
  user: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  }
})

export const Messages = model('message', messagesSquema)

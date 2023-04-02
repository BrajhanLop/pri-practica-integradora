import { Messages } from '../models/messages.model.js'

export class MessageManager {
  constructor () {
    this.messages = Messages
  }

  async getMessages () {
    const result = await this.messages.find()
    return result
  }

  async addMessage (data) {
    const newMessage = await this.messages.create(data)
    return newMessage
  }
}

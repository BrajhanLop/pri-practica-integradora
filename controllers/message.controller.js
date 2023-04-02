import { MessageManager } from '../manager/MessageManager.js'

const messageMan = new MessageManager()

export const getAllMessages = async (req, res) => {
  const newMessage = await messageMan.getMessages()
  res.status(200).json({
    status: true,
    data: newMessage
  })
}

export const createMessage = async (req, res) => {
  const newMessage = await messageMan.addMessage(req.body)
  res.status(200).json({
    status: true,
    data: newMessage
  })
}

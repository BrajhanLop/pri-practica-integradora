import { Router } from 'express'
import { createMessage, getAllMessages } from '../controllers/message.controller.js'

export const messagesRouter = Router()

messagesRouter.get('/', getAllMessages)
messagesRouter.post('/createmessage', createMessage)

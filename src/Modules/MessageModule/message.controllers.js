import { userModel } from "../../../DB/Models/user.model.js"
import { messageModel } from "../../../DB/Models/message.model.js"

export const sendMsg = async (req, res, next) => {

    const { content, sendTo } = req.body

    const isUserExist = await userModel.findById(sendTo)

    if (!isUserExist) {
        return res.status(400).json({ Message: "Not found" })
    }

    const messageInstance = new messageModel({ content, sendTo })
    await messageInstance.save()

    isUserExist.userMessages.push(messageInstance._id)
    await isUserExist.save()

    res.status(201).json({ Message: "user created", messageInstance })
}

export const getUserMsgs = async (req, res, next) => {

    const { _id } = req.authUser

    const messages = await messageModel.find({ sendTo: _id }).select('content')

    if (messages.length) {
        return res.status(200).json({ Message: "Done", messages })
    }

    res.status(200).json({ Message: "empty Inbox", })
}

export const deleteMsg = async (req, res, next) => {

    const { _id } = req.authUser
    const { msgId } = req.params

    const message = await messageModel.findOneAndDelete({
        _id: msgId,
        sendTo: _id
    })

    if (message) {
        return res.status(200).json({ Message: "successful delete" })
    }

    res.status(401).json({ Message: "Unauthorized Or In-valide message" })
}
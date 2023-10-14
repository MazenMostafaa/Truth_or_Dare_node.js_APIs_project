import { userModel } from "../../../DB/Models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {

    const { userName, email, password, gender } = req.body

    const isUserExist = await userModel.findOne({ email })

    if (isUserExist) {
        return res.status(400).json({ Message: "This email has already existed" })
    }

    const hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_OR_ROUNDS))

    const userInstance = new userModel({ userName, email, password: hashedPassword, gender })
    await userInstance.save()

    res.status(201).json({ Message: "user created" })
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body

    const isUserExist = await userModel.findOne({ email })

    if (!isUserExist) {
        return res.status(400).json({ Message: "invalide credintials" })
    }

    const isPassMatching = bcrypt.compareSync(password, isUserExist.password)

    if (isPassMatching) {

        const userToken = jwt.sign({
            _id: isUserExist._id,
            name: isUserExist.userName,
            email
        },
            process.env.LOGGED_IN_TOKEN_SIGNATURE,
            { expiresIn: "10h" })

        return res.status(200).json({ Message: "Logged in", userToken })
    }


    res.status(400).json({ Message: "invalide credintials" })




}

export const updateUser = async (req, res, next) => {

    const { _id } = req.authUser
    const { email, userName } = req.body

    const userCheck = await userModel.findOne({ email })

    if (!userCheck) {
        return res.status(400).json({ Message: "in-valid user" })
    }

    if (userCheck._id.toString() !== _id.toString()) {
        console.log(_id);
        console.log(userCheck._id.toString());
        return res.status(401).json({ Message: "Unauthorizsed Account" })
    }

    const updatedData = await userModel.findOneAndUpdate({ email }, { userName }, { new: true })
    if (updatedData) {
        return res.status(200).json({ Message: "Update is successful" })
    }
    res.status(409).json({ Message: "update fail" })


}

export const getUserData = async (req, res, next) => {

    const { _id } = req.params

    const user = await userModel.findById({ _id }).select('-userMessages')

    if (user) {
        return res.status(200).json({ Message: "Here are some data", UserData: user })
    }

    res.status(404).json({ Message: "Invalide Id" })

}


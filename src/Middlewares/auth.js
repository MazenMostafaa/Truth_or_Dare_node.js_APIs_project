import jwt from 'jsonwebtoken'
import { userModel } from '../../DB/Models/user.model.js'



export const isAuth = () => {
    return async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization) {
            return res.status(400).json({ message: 'Please login first' })
        }

        if (!authorization.startsWith('Saraha')) {
            return res.status(400).json({ message: 'invalid token prefix' })
        }

        const splitedToken = authorization.split(' ')[1]
        const decodedData = jwt.verify(
            splitedToken,
            process.env.LOGGED_IN_TOKEN_SIGNATURE,
        )
        if (!decodedData || !decodedData._id) {
            return res.status(400).json({ message: 'invalid token' })
        }

        const findUser = await userModel.findById(decodedData._id)
        if (!findUser) {
            return res.status(400).json({ message: 'Please SignUp' })
        }
        // retrun findUser
        req.authUser = findUser
        next()
    }
}
import { RequestHandler } from 'express'
import AppError from '../../errors/AppError'
import UserModel, { User } from '../../models/User'
import successResponse from '../../middleware/response'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from '../../utils/token'

const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body

    if (!email) {
        return next(new AppError('Email is required', 400))
    }

    if (!password) {
        return next(new AppError('Password is required', 400))
    }

    const user: User | null = await UserModel.findOne({ email }).select(
        '+password'
    )

    if (!user) {
        return next(new AppError('User not found', 404))
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
        return next(new AppError('invalid email or password', 400))
    }

    const accessToken = generateAccessToken(String(user._id))

    const today = new Date()
    today.setDate(today.getDate() + 7)

    res.cookie('accessToken', accessToken, {
        expires: today,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    })

    return successResponse(res, 200, 'User Logged in sucessfully', {
        accessToken,
    })
}

export default login

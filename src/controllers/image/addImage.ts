import ImageModel, { Image } from '../../models/Image'
import { RequestHandler } from 'express'
import AppError from '../../errors/AppError'
import successResponse from '../../middleware/response'

const addSingleImage: RequestHandler = async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('No file uploaded', 400))
    }
    const image = await ImageModel.create({
        userId: req.user._id,
        url: (req.file as any).location,
    })
    return successResponse(res, 201, 'Image added successfully', image.url)
}

export { addSingleImage }

import axios from 'axios'
import env from '../env.config'
import AppError from '../errors/AppError'

const { IMAAGI_KEY } = env
const BASE_URL = 'https://api.imagga.com/v2'

const getTags = async (imageUrl: string) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/tags?image_url=${imageUrl}`,
            headers: { Authorization: `Basic ${IMAAGI_KEY}` },
        })
        return response.data
    } catch (error) {
        throw new AppError('An error occured', 500)
    }
}

export { getTags }

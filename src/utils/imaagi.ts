import axios from 'axios'
import env from '../env.config'
import AppError from '../errors/AppError'

const { IMAAGI_KEY } = env
const BASE_URL = 'https://api.imagga.com/v2'

const getTags = async (imageUrl: string) => {
    try {
        console.log('here 8')
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/tags?image_url=${imageUrl}&threshold=65.0`,
            headers: { Authorization: `Basic ${IMAAGI_KEY}` },
        })
        console.log('here 9')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log('here 10')
        console.log(error)
        throw new AppError('An error occured', 500)
    }
}

export { getTags }

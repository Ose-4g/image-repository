import mongoose from 'mongoose'
import env from '../env.config'
const { MONGO_URL } = env

export default async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log('DB connected successfully')
    } catch (err) {
        console.log('DB connection not successful')
    }
}

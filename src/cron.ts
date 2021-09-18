import cron from 'node-cron'

const cronJob = async () => {
    const test = cron.schedule('*/5 * * * * *', () => {
        // console.log(Math.ceil(Date.now()/1000))
        console.log('entered cron', Math.ceil(Date.now() / 1000))
        setTimeout(
            () => console.log('timeout', Math.ceil(Date.now() / 1000)),
            8000
        )
    })

    test.start()
}

cronJob()

export default cronJob

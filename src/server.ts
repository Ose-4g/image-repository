import http from 'http';
import app from './app';
import env from './env.config';
import connectToMongo from './utils/connectToMongo';
import logger from './utils/logger';
import cron from './cron';

const { PORT }: { PORT: string } = env;

const server = http.createServer(app);

//function to ensure database connects before server starts.
const startServer = async (): Promise<void> => {
  logger.info('connecting to the databse');
  await connectToMongo();
  cron();
  server.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`
        ################################################
        🛡️  Server listening on port: ${PORT} 🛡️
        ################################################
        SERVER IN ${process.env.NODE_ENV as string} MODE
      `);
    }
  });
};

startServer();

export default app;

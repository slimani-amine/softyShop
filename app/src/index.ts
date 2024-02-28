import 'dotenv/config';
import server from './server';
import { logger } from './v1/core/logger/logger';
import { dataSource } from './v1/data/connection';
import { PORT } from './config';

server.listen(PORT, async () => {
  logger.log('APP', `SERVER IS NOW LISTENING AT PORT  ${PORT}`);
  await dataSource.initialize();
});

import createServer from "./src/app.js";
import { connectDb } from "./src/config/database.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";

const app = createServer();

connectDb()
  .then(() => {
    app.listen(env.PORT, () => {
      logger.info(`Server running on ${env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });

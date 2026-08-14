import createServer from "./src/app.js";
import { connectDb } from "./src/config/database.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";

const app = createServer();
const PORT = env.PORT || 5000;
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });

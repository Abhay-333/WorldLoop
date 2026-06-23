import createServer from "./src/app.js";
import env from "./src/config/env.js";

const app = createServer();

app.listen(env.PORT, () => {
  console.log(`Server running on ${env.PORT}`);
});


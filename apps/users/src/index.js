const app = require('./server');
const mongoose = require('mongoose');
const redisClient = require('./services/redis');
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`User Service listening at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

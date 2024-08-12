const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

(async () => {
  try {
    await redisClient.connect();
    console.log('Redis is connected');
  } catch (error) {
    console.error('Redis connection error:', error);
  }
})();

module.exports = redisClient;

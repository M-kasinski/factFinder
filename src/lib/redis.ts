import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;
let connectPromise: Promise<RedisClientType> | null = null;

/**
 * Connects to Redis if not already connected and returns the client instance.
 * Handles only one connection attempt at a time.
 */
async function getRedisClient(): Promise<RedisClientType> {
  if (redisClient && redisClient.isOpen) {
    return redisClient;
  }

  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = new Promise(async (resolve, reject) => {
    try {
      // Assumes Redis is running on the default host and port
      // You might need to configure this using environment variables
      const client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });
      client.on('error', (err) => {
        console.error('Redis Client Error', err);
        redisClient = null; // Reset client on error
        connectPromise = null; // Allow reconnect attempt
        reject(err);
      });

      await client.connect();
      console.log('Connected to Redis successfully.');
      redisClient = client as RedisClientType;
      connectPromise = null; // Clear promise after successful connection
      resolve(redisClient);
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      redisClient = null;
      connectPromise = null;
      reject(error);
    }
  });

  return connectPromise;
}

export { getRedisClient }; 
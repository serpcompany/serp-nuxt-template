// utils/redis.ts
import Redis from 'ioredis';

const redisClient =
    process.env.NODE_ENV === 'production'
        ? new Redis({
              host: process.env.REDIS_HOST,
              port: Number(process.env.REDIS_PORT),
              password: process.env.REDIS_PASSWORD,
          })
        : null;

export default redisClient;

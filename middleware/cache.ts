// middleware/cache.ts
import type { H3Event } from 'h3';
import redisClient from '~/utils/redis';
import memoryCache from '~/utils/memoryCache';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type -- disabling because I don't know what the types should be at the moment; this file has bigger problems
const cache = async (event: H3Event, next: Function) => {
  const key = event.req.url as string;

  if (redisClient) {
    const cachedResponse = await redisClient.get(key);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }
  } else {
    const cachedResponse = memoryCache.get(key);
    if (cachedResponse) {
      return JSON.parse(cachedResponse);
    }
  }

  const result = await next();

  // Ensure the result is fully resolved before caching
  const responseBody = await result;

  if (responseBody) {
    const cacheValue = JSON.stringify(responseBody);
    if (redisClient) {
      await redisClient.set(
        key,
        cacheValue,
        'EX',
        Number(process.env.CACHE_TTL),
      );
    } else {
      memoryCache.set(key, cacheValue, Number(process.env.CACHE_TTL));
    }
  }

  return responseBody;
};

export default cache;

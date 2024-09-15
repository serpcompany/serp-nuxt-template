// utils/memoryCache.ts
import NodeCache from 'node-cache';

const memoryCache =
  process.env.NODE_ENV !== 'production'
    ? new NodeCache({
        stdTTL: Number(process.env.CACHE_TTL),
      })
    : null;

export default memoryCache;

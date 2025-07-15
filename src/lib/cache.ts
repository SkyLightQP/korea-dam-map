interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl?: number;
}

class MemoryCache<T> {
  private cache: Map<string, CacheItem<T>> = new Map();
  private readonly defaultTTL: number = 60 * 60 * 1000; // Default TTL of 1 hour in milliseconds

  set(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };
    this.cache.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const cacheTTL = item.ttl || this.defaultTTL;
    const isExpired = Date.now() - item.timestamp > cacheTTL;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data as unknown as T;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }
}

export const memoryCache = new MemoryCache();
export type { CacheItem };

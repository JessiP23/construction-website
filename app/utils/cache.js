const cache = new Map()

export function cacheData(key, data, ttl = 60000) {
  const now = Date.now()
  cache.set(key, { data, expiry: now + ttl })
}

export function getCachedData(key) {
  const cached = cache.get(key)
  if (!cached) return null
  if (Date.now() > cached.expiry) {
    cache.delete(key)
    return null
  }
  return cached.data
}


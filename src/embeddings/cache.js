class EmbeddingCache {
    constructor() {
      this.cache = new Map();
      this.maxSize = 100; // Límite de elementos en caché
    }
  
    get(key) {
      return this.cache.get(key);
    }
  
    set(key, value) {
      if (this.cache.size >= this.maxSize) {
        // Eliminar el elemento más antiguo
        const oldestKey = this.cache.keys().next().value;
        this.cache.delete(oldestKey);
      }
      this.cache.set(key, value);
    }
  }
  
  export const embeddingCache = new EmbeddingCache();
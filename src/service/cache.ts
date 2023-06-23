interface CacheObject {
  value: unknown;
  expired: number;
}

export class CacheItem {
  private key: string;
  private cacheObject: CacheObject | null;

  private static isCacheObject(obj: unknown): obj is CacheObject {
    return (
      typeof obj === "object" &&
      obj != null &&
      "value" in obj &&
      "expired" in obj
    );
  }

  public constructor(key: string, private expiredOffset: number) {
    this.key = `cache:${key.startsWith("cache:") ? key.slice(6) : key}`;
    const item = this.parseItem(localStorage.getItem(this.key));
    this.cacheObject = CacheItem.isCacheObject(item) ? item : null;
  }

  private parseItem(item: string | null): unknown | null {
    return item ? JSON.parse(item) : null;
  }

  public get(): unknown | null {
    const item = this.parseItem(localStorage.getItem(this.key));
    return CacheItem.isCacheObject(item) ? item.value : null;
  }

  public set(value: unknown): void {
    if (this.expiredOffset === 0) return;

    const cacheObj: CacheObject = {
      value,
      expired: this.cacheObject?.expired ?? Date.now() + this.expiredOffset,
    };

    localStorage.setItem(this.key, JSON.stringify(cacheObj));
  }

  public remove() {
    localStorage.removeItem(this.key);
  }

  public get isExpired(): boolean {
    if (!this.cacheObject) return true;
    return this.cacheObject.expired < Date.now();
  }
}

function clearCache() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const item = new CacheItem(key, 0);
    if (item.isExpired) item.remove();
  }
}

clearCache();

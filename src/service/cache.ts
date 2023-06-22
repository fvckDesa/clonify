interface CacheObject {
  value: unknown;
  expired: number;
}

export class CacheItem {
  private cacheObject: CacheObject | null;

  private static isCacheObject(obj: unknown): obj is CacheObject {
    return (
      typeof obj === "object" &&
      obj != null &&
      "value" in obj &&
      "expired" in obj
    );
  }

  public constructor(private key: string, private expiredOffset: number) {
    const item = this.parseItem(localStorage.getItem(key));
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
    const cacheObj: CacheObject = {
      value,
      expired: this.cacheObject?.expired ?? Date.now() + this.expiredOffset,
    };

    localStorage.setItem(this.key, JSON.stringify(cacheObj));
  }

  public isExpired(): boolean {
    if (!this.cacheObject) return true;
    return this.cacheObject.expired < Date.now();
  }
}

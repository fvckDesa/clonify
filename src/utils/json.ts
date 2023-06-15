type OnlyDateKey<T extends object, K extends keyof T> = T[K] extends Date
  ? K
  : never;

type AllDateKeys<T> = T extends object
  ? {
      [P in keyof T]: T[P] extends object
        ? AllDateKeys<T[P]> | OnlyDateKey<T, P>
        : OnlyDateKey<T, P>;
    }[keyof T]
  : never;

export function parseJsonDate<T>(
  json: string,
  keys?: AllDateKeys<T> | AllDateKeys<T>[]
): T {
  const _keys = Array.isArray(keys) ? keys : [keys];
  return JSON.parse(json, (key, value) =>
    _keys.includes(key as AllDateKeys<T>) ? new Date(value) : value
  );
}

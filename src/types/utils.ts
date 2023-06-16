export type WithId<O extends object, T = string> = Omit<O, "id"> & { id: T };

type Add$<T extends string | number> = `$${T}`;

type Remove$<T> = T extends `$${infer N}` ? N : never;

type GetValue<O extends object, K> = K extends keyof O ? O[K] : never;

export type ToStyledProps<P extends object> = {
  [K in Add$<Exclude<keyof P, symbol>>]: GetValue<P, Remove$<K>>;
};

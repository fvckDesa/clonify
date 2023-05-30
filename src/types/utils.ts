export type WithId<O extends object, T = string> = Omit<O, "id"> & { id: T };

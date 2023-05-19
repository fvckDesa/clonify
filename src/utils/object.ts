export function entries<O extends object>(obj: O) {
  return Object.entries(obj) as [string, O[keyof O]][];
}

export function values<O extends object>(obj: O) {
  return Object.values(obj) as O[keyof O][];
}

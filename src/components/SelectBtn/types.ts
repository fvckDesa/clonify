export interface Position {
  top: number;
  left: number;
}

export interface Item<V> {
  text: string;
  value: V;
}

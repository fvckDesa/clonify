import { ReactNode } from "react";
import { CssUnit } from "@utils/cssUnits";

interface Column<T> {
  header: ReactNode | (() => ReactNode);
  width?: CssUnit;
  render?: (value: T) => ReactNode;
}

export type Columns<ColumnsDef extends object> = {
  [P in keyof ColumnsDef]: Column<ColumnsDef[P]>;
};

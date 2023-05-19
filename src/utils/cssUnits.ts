type FractionUnit = `${number}fr`;
type RateUnit = `${number}%`;
type PixelUnit = `${number}px`;

export type BasicUnits = FractionUnit | RateUnit | PixelUnit;

type MinMaxUnit = {
  min: number | BasicUnits;
  max: number | BasicUnits;
};

function isMinMaxUnit(unit: unknown): unit is MinMaxUnit {
  return (
    typeof unit === "object" &&
    unit != null &&
    Object.hasOwn(unit, "min") &&
    Object.hasOwn(unit, "max")
  );
}

export type CssUnit = number | BasicUnits | MinMaxUnit;

export function cssUnit(unit: CssUnit): string {
  if (isMinMaxUnit(unit)) {
    return `minmax(${cssUnit(unit.min)}, ${cssUnit(unit.max)})`;
  }
  if (typeof unit === "number") {
    return `${unit}px`;
  }

  return unit;
}

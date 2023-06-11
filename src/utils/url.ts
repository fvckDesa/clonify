export function urlSearchParams(
  strings: TemplateStringsArray,
  ...expressions: unknown[]
): string {
  let res = "";
  for (let i = 0; i < strings.length; i++) {
    const expr = expressions[i];
    res += strings[i];
    if (expr) {
      res += isObject(expr) ? new URLSearchParams(expr) : expr;
    }
  }

  return res;
}

function isObject(value: unknown): value is Record<string, string> {
  return typeof value === "object";
}

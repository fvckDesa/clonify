export interface Time {
  seconds: number;
  minutes: number;
  hours: number;
}

export function time(timeInSec: number): Time {
  if (timeInSec < 0) {
    throw new Error("Time can't be negative");
  }
  return {
    hours: Math.floor(timeInSec / 3600),
    minutes: Math.floor(timeInSec / 60),
    seconds: timeInSec % 60,
  };
}

export function format(
  formatStr: string,
  { seconds, minutes, hours }: Time
): string {
  return formatStr.replaceAll(
    /\{(1|2)?(s|m|h)\}/g,
    (match: string, minLength = "1", timeEl: string) => {
      switch (timeEl) {
        case "s":
          return String(seconds).padStart(+minLength, "0");
        case "m":
          return String(minutes);
        case "h":
          return String(hours);
        default:
          throw new Error(
            `"${timeEl}" is not valid format element in "${match}"`
          );
      }
    }
  );
}

export interface Time {
  seconds: number;
  minutes: number;
  hours: number;
}

const SEC_IN_HOUR = 3600;
const SEC_IN_MIN = 60;
const MS_IN_SEC = 1000;

export function time(timeInMs: number): Time {
  if (timeInMs < 0) {
    throw new Error("Time can't be negative");
  }

  const timeInSec = Math.round(timeInMs / MS_IN_SEC);

  const hours = Math.floor(timeInSec / SEC_IN_HOUR);
  const minutes = Math.floor((timeInSec - hours * SEC_IN_HOUR) / SEC_IN_MIN);
  const seconds = timeInSec % SEC_IN_MIN;

  return {
    hours,
    minutes,
    seconds,
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

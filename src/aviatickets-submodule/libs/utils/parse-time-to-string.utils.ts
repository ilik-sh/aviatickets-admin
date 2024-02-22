export const parseTimeToString = (time: number) => {
  const absoluteTime = Math.abs(time);
  let days = absoluteTime / (24 * 60 * 60 * 1000);
  let hours = (days % 1) * 24;
  let minutes = (hours % 1) * 60;
  [days, hours, minutes] = [Math.floor(days), Math.floor(hours), Math.floor(minutes)];

  const timeString = parsePartTimeToString(days, "d") + parsePartTimeToString(hours, "h") + parsePartTimeToString(minutes, "m");
  return timeString;
};

const parsePartTimeToString = (time: number, prefix: string) => {
  return time ? `${time + prefix} ` : "";
};

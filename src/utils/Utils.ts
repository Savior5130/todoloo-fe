export const fetchPathParam = (url: string, suffix: number | string) => {
  const stringSuffix = typeof suffix === "number" ? suffix.toString() : suffix;
  return `${url}/${stringSuffix}`;
};

export const fetchLocalTimefromISO = (date: string) => {
  const utc_date = new Date(date);
  const minutes = utc_date.getTime();
  const offset = utc_date.getTimezoneOffset();

  const local_minutes = minutes - offset;
  const local_time = new Date(local_minutes).toLocaleTimeString("en-GB");
  const local_time_substr = local_time.split(":");
  return `${local_time_substr[0]}:${local_time_substr[1]}`;
};

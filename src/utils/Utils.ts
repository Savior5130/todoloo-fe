export const fetchPathParam = (url: string, suffix: number | string) => {
  const stringSuffix = typeof suffix === "number" ? suffix.toString() : suffix;
  return `${url}/${stringSuffix}`;
};

export const fetchLocalTimefromISO = (date: string) => {
  const utc_date = new Date(date);
  const minutes = utc_date.getTime();
  const offset = utc_date.getTimezoneOffset();

  const local_time = minutes - offset;
  return new Date(local_time).toString();
};

import { Todo, TodoState } from "../types";

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

export const transformTodos = (todos: Todo[]): TodoState => {
  return todos.reduce(
    (acc: TodoState, todo: Todo) => {
      acc[todo.status].push(todo);
      return acc;
    },
    { TODO: [], IN_PROGRESS: [], DONE: [] }
  );
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: never, ...args: never[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
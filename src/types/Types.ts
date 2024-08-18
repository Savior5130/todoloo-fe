export type TodoStatus = "COMPLETE" | "INCOMPLETE" | "OVERDUE";

export type Todo = {
  title: string;
  description: string;
  status: TodoStatus;
};

export type User = {
  id: string;
  username: string;
};

export type TypographyVariant =
  | "Display 1"
  | "Display 2"
  | "Display 3"
  | "Heading 1"
  | "Heading 2"
  | "Heading 3"
  | "Heading 4"
  | "Heading 5"
  | "Heading 6"
  | "Heading 7"
  | "Heading 8"
  | "Body 1"
  | "Body 2"
  | "Body 3"
  | "Body 4"
  | "Body 5"
  | "Label 1"
  | "Label 2"
  | "Label 3"
  | "Label 4";

export type HeadingGroup =
  | "Display 1"
  | "Display 2"
  | "Display 3"
  | "Heading 1"
  | "Heading 2"
  | "Heading 3"
  | "Heading 4"
  | "Heading 5"
  | "Heading 6"
  | "Heading 7"
  | "Heading 8";

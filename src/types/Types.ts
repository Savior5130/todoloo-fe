export type TodoStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Todo = {
  id: number;
  title: string;
  description: string;
  creator: User;
  assignee?: User;
  status: TodoStatus;
};

export type Comment = {
  id: number;
  datetime: string;
  message: string;
  todo: Todo;
  creator: User;
};

export type UserRole = "admin" | "user";

export type User = {
  id: string;
  username: string;
  name: string;
  role: UserRole;
};

export type LoginMethod = "local" | "oauth";

export interface loginBody {
  type: LoginMethod;
  username: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (body: loginBody) => void;
  logout: () => void;
}

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

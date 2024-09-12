import { Dispatch, SetStateAction } from "react";
import { Todo, TodoState } from "../../types";

export type SidebarVariant = "read" | "edit" | "create";
type SidebarFormVariant = "edit" | "create";

export interface SidebarProps {
  onClose: () => void;
  todosState: [TodoState, Dispatch<SetStateAction<TodoState>>];
  onConfirm?: () => void;
  onChangeVariant: (variant: SidebarVariant) => void;
  selectedTodoState: [
    Todo | undefined,
    Dispatch<SetStateAction<Todo | undefined>>
  ];
  variant: SidebarVariant;
}

export interface SidebarFormProps {
  variant: SidebarFormVariant;
  defaultValue?: Todo;
  toggleSidebar: () => void;
  todoState: [TodoState, Dispatch<SetStateAction<TodoState>>];
  onClickCancel?: (variant: SidebarVariant) => void;
}

export interface CommentData {
  author: string;
  message: string;
  time: string;
}

export interface CommentDataProps {
  todo: Todo;
  data?: CommentData[];
}

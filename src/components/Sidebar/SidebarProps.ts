import { Dispatch, SetStateAction } from "react";
import { Todo } from "../../types";

export type SidebarVariant = "read" | "edit" | "create";
type SidebarFormVariant = "edit" | "create";

export interface SidebarProps {
  onClose: () => void;
  onCreate: Dispatch<SetStateAction<Todo[]>>;
  onConfirm?: () => void;
  onChangeVariant: (variant: SidebarVariant) => void;
  todo: Todo | undefined;
  variant: SidebarVariant;
}

export interface SidebarFormProps {
  variant: SidebarFormVariant;
  defaultValue?: Todo;
  toggleSidebar: () => void;
  onCreate: Dispatch<SetStateAction<Todo[]>>;
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

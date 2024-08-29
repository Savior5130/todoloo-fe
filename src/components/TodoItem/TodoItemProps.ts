import { User } from "../../types";

export interface TodoItemProps {
  title: string;
  description: string;
  assignee?: User;
  onClick: () => void;
  onClickIcon: () => void;
  onDrag: (e: React.DragEvent) => void;
}

export type SidebarVariant = "read" | "edit" | "create";
type SidebarFormVariant = "edit" | "create";

export interface SidebarProps {
  onClose: () => void;
  onConfirm?: () => void;
  onChangeVariant: (variant: SidebarVariant) => void;
  variant: SidebarVariant;
}

export interface SidebarFormProps {
  variant: SidebarFormVariant;
  onClickCancel?: (variant: SidebarVariant) => void;
}

export interface CommentData {
  author: string;
  message: string;
  time: string;
}

export interface CommentDataProps {
  data?: CommentData[];
}

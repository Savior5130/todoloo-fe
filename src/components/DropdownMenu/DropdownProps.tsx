import { ReactNode } from "react";

export interface DropdownProps {
  containerStyle?: React.CSSProperties;
  header?: string;
  menus: menuItem[];
}

export interface menuItem {
  title: string;
  metadata?: unknown;
  children?: ReactNode;
  onClick: () => void;
}

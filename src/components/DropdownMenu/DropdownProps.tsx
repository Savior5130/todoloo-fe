export interface DropdownProps {
  showMenu: boolean;
  menus: menuItem[];
}

interface menuItem {
  title: string;
  onClick: () => void;
}

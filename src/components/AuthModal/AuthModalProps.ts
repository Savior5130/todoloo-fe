import { UserRole } from "../../types";

export interface AuthModalProps {
  showIcon: boolean;
  showModal: boolean;
}

export interface authFormValues {
  username: string;
  password: string;
}

export interface registerFormValues {
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

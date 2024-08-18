type LoginModalVariant = "sign_up" | "sign_in";

export interface LoginModalProps {
  showModal: boolean;
  variant: LoginModalVariant;
}

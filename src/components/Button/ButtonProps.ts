import { ButtonHTMLAttributes } from "react";

type buttonVariant = "primary" | "link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: buttonVariant;
  handleOnClick?: () => void;
}

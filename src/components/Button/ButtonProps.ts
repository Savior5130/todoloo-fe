import { ButtonHTMLAttributes } from "react";

type buttonVariant = "primary" | "secondary" | "ghost" | "link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: buttonVariant;
  handleOnClick?: () => void;
}

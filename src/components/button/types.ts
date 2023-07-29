import { ReactNode } from "react";

export interface IButton {
  text?: string;
  onClick: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

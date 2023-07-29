import { IButton } from "./types";
import * as Styles from "./styles";

const Button = ({ text, onClick, rightIcon, leftIcon }: IButton) => {
  return (
    <Styles.Button onClick={onClick}>
      {rightIcon && <Styles.Icon>{rightIcon}</Styles.Icon>}
      {text}
      {leftIcon && <Styles.Icon>{leftIcon}</Styles.Icon>}
    </Styles.Button>
  );
};

export { Button };

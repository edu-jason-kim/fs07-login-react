import { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  id?: string;
  className?: string;
  // 자식 요소를 받기위해 children 타입이 필수
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;

  // 커스텀 속성 작성
  type?: "default" | "outlined";
}

export default function Button({
  onClick,
  className = "",
  children,
  type = "default",
  ...rest
}: ButtonProps) {
  const classNames = `${styles.button} ${className}`;
  return (
    <button onClick={onClick} className={classNames} {...rest}>
      {children}
    </button>
  );
}

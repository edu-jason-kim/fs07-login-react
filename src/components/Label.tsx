import { ReactNode } from "react";
import styles from "./Label.module.css";

// interface LabelProps extends PropsWithChildren<{ className?: string }> {}
interface LabelProps {
  className?: string;
  children: ReactNode;
}

export default function Label({ className = "", children }: LabelProps) {
  const classNames = `${styles.label} ${className}`;
  return <label className={classNames}>{children}</label>;
}

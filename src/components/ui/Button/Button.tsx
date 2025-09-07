import { type ButtonHTMLAttributes, type FC, type ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  width,
  style,
  ...props
}) => {
  const classNames = `${styles.btn} ${styles[variant]} ${styles[size]}`;

  return (
    <button className={classNames} style={{ width, ...style }} {...props}>
      {children}
    </button>
  );
};

export default Button;

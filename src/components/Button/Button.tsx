import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'base'
  | 'red-outline'
  | 'red'
  | 'base-triangle'
  | 'green'
  | 'green-outline' 
  | 'icon-gray';


type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isHovered?: boolean;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = 'base',
  leftIcon,
  rightIcon,
  className,
  isHovered,
  isActive, 
  ...props
}: ButtonProps) => {

  const buttonClasses = [
    styles.button,
    styles[variant],
    isHovered ? styles.isHovered : '',
    isActive ? styles.isActive : '',  
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={buttonClasses} {...props}>
      {leftIcon && <span className={styles.iconWrapper}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {rightIcon && <span className={styles.iconWrapper}>{rightIcon}</span>}
    </button>
  );
};

export default Button;

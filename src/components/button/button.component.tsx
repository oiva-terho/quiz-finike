import { ButtonHTMLAttributes, FC } from 'react';
import './button.styles.scss';

export enum BUTTON_CLASSES {
  google = 'button-google',
  apply = 'button-apply',
  auth = 'button-auth',
  watch = 'button-watch',
}

export type ButtonProps = {
  buttonType?: BUTTON_CLASSES;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  buttonType = '',
  className = '',
  ...otherProps
}) => {
  return (
    <button className={`button ${buttonType} ${className}`} {...otherProps}>
      {children}
    </button>
  );
};

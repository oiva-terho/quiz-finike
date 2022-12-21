import { ButtonHTMLAttributes, FC } from 'react';
import './button.styles.scss';

export enum BUTTON_CLASSES {
  google = 'button-google',
  apply = 'button-apply',
  auth = 'button-auth',
}

export type ButtonProps = {
  buttonType?: BUTTON_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, buttonType = '', ...otherProps }) => {
  return (
    <button className={`button ${buttonType}`} {...otherProps}>
      {children}
    </button>
  );
};

import { ButtonHTMLAttributes, FC } from 'react';
import './button.styles.scss';

export enum BUTTON_CLASSES {
  base = 'button',
  google = 'button-google',
  apply = 'button-apply',
}

export type ButtonProps = {
  buttonType?: BUTTON_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  buttonType = BUTTON_CLASSES.base,
  ...otherProps
}) => {
  return (
    <button className={buttonType} {...otherProps}>
      {children}
    </button>
  );
};

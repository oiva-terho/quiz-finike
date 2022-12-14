import { FC, InputHTMLAttributes } from 'react';
import './table-input.styles.scss';

type TableInputProps = {
  label?: string | null;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TableInput: FC<TableInputProps> = ({ label, className, ...otherProps }) => {
  return (
    <input
      className={`${className} table-input`}
      placeholder={label === null ? '' : label}
      {...otherProps}
    />
  );
};

import { FC, InputHTMLAttributes } from 'react';
import './table-input.styles.scss';

type TableInputProps = { label?: string } & InputHTMLAttributes<HTMLInputElement>;

export const TableInput: FC<TableInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='table-input'>
      <input placeholder={label} {...otherProps} />
    </div>
  );
};

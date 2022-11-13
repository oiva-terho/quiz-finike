import { FC, InputHTMLAttributes } from 'react';

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div>
      <input {...otherProps} />
      <label>{label}</label>
    </div>
  );
};

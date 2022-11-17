import { FC, InputHTMLAttributes } from 'react';
import './form-input.styles.scss';

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

export const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='form-input'>
      <input {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length
              ? 'shrink-input-label'
              : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

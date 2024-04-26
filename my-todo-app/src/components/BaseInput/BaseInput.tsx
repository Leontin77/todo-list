import React from 'react';
import './BaseInput.scss'

// Define a type for the BaseInput props
type BaseInputProps = {
  label?: string;
  id?: string;
  type?: string;
  onChange?: (e: any) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BaseInput: React.FC<BaseInputProps> = ({ label, id, type, onChange, ...inputProps }) => {
  return (
    <div className="baseInput">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...inputProps} onChange={onChange}/>
    </div>
  );
};

export default BaseInput;

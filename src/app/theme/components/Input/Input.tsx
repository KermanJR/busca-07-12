import React from "react";
import {BaseComponent} from "../../BaseComponent";
import { StyleSheet } from "../../StyleSheet";


interface InputProps {
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  styleSheet?: StyleSheet;
  className?: string;
  placeholder?: string;
  tag?: string;
  required?: boolean;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  maxLength?: string;
}


const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  styleSheet,
  required,
  name,
  className,
  placeholder,
  tag,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const Tag = tag || 'input';

  return (
    <BaseComponent 
      as={Tag} 
      type={type} 
      required={required}
      styleSheet={{
        ...styleSheet
      }}
      className={className}
      value={value}
      onChange={handleChange} 
      placeholder={placeholder}
      name={name}
      {...props} 
    />
  );
};

export default Input;

import React, { useState } from "react";
import { BaseComponent } from "../../BaseComponent";
import { StyleSheet } from "../../StyleSheet";
import theme from "@src/app/theme/theme";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  styleSheet?: StyleSheet;
  className?: string;
  loading?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  styleSheet,
  className,
  loading,
  ...props
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <BaseComponent 
      as="select" 
      styleSheet={{
        ...styleSheet,
        padding: '.8rem',
        fontFamily: theme.typography.fontFamily,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }} 
      className={className} 
      {...props}
      onChange={handleChange}
      value={loading ? "" : value}
    >
      {loading ? (
        <option value="" disabled>
          Carregando...
        </option>
      ) : (
        options.map((option) => (
          <option key={option.value} value={option.value} style={{fontSize: '.875rem', color: 'black'}}>
            {option.label}
          </option>
        ))
      )}
    </BaseComponent>
  );
};

export default Select;

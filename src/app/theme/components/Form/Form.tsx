import React from "react";
import { BaseComponent } from "@src/app/theme/BaseComponent";
import { StyleSheet } from "../../StyleSheet";
import useResponsive from "@src/app/theme/helpers/useResponsive";

interface FormBoxProps {
  tag?: 'form' | 'main' | 'div' | 'article' | 'section' | string;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  className?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormBox: React.FC<FormBoxProps> = ({
  styleSheet,
  children,
  tag,
  onSubmit,
  ...props
}) => {
  const Tag = tag || 'div';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    }
  };

  const isMobile = useResponsive();

  return (
    <BaseComponent as={Tag} styleSheet={{
      ...styleSheet,
    }} {...props}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: `${isMobile? 'column': 'row'}`, gap: '1rem'}}>
        {children}
      </form>
    </BaseComponent>
  );
};

export default FormBox;

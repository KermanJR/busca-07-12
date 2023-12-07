import React, { forwardRef } from "react";
import { BaseComponent } from "../../BaseComponent";
import { StyleSheet } from "../../StyleSheet";

interface BoxProps {
  tag?: 'main' | 'div' | 'article' | 'section'| string;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ styleSheet, children, tag, id, ...props }, ref) => {
    const Tag = tag || 'div';
    return (
      <BaseComponent 
        as={Tag} 
        styleSheet={styleSheet} 
        ref={ref}
        id={id}
        {...props}
      >
        {children}
      </BaseComponent>
    );
  }
);

export default Box;

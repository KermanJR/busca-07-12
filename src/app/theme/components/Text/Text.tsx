import { BaseComponent } from "@src/app/theme/BaseComponent";
import theme, { ThemeTypographyVariants } from "@src/app/theme/theme";
import React from "react";
import { useTheme } from "@src/app/theme/ThemeProvider";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface TextProps{
  variant?: ThemeTypographyVariants;
  tag?: 'a' | 'p' | 'li' | 'h1' | 'h2' | 'h3'| string;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  color?: string;
  htmlFor?: string,
  className?: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  ref: any;
}

const Text = React.forwardRef((
  {
    tag,
    styleSheet,
    variant, 
    color,
    htmlFor,
    className,
    ...props
  }: TextProps, ref) => {

  const theme = useTheme();
  const textVariant = theme.typography.variants[variant];

  return(
      <BaseComponent
        as={tag} 
        styleSheet={{
        fontFamily: theme.typography.fontFamily,
        color: color,
        ...textVariant,
        ...styleSheet,
        }} 
        {...props}
        ref={ref}
        hmltFor={htmlFor}
        className={className}
      />
  )
});

Text.defaultProps = {
  tag: 'p',
  variant: 'body2',
  color: theme.colors.primary.x500
}

export default Text;

import { ThemeTypographyVariants } from "@src/app/theme/theme";
import styled from "styled-components";
import Text from "../Text/Text";
import React from "react";
import useRipple from 'useripple';
import { StyleSheet } from "@src/app/theme/StyleSheet";
import { useRouter } from "next/router";


export interface ButtonBaseProps{
  href?: string;
  textVariant?: ThemeTypographyVariants;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?:string;
  isLoading?: boolean;
}

const StyledButton = styled(Text)<any>`
`;

export default function ButtonBase({
  textVariant,
  children,
  styleSheet,
  type,
  href,
  isLoading,
  ...props
}: ButtonBaseProps){

  const router = useRouter()
  const ref = React.useRef();
  useRipple(ref, {});
  const isLink = Boolean(href);
  const Tag = isLink? 'a' : 'button';

  return(
    <StyledButton 
      tag={Tag}
      ref={ref}
      href={href}
      type={type}
      styleSheet={{
        border: '0',
        backgroundColor: 'transparent',
        color: 'inherit',
        outline: '0',
        textDecoration: 'none',
        cursor: 'pointer', 
        borderRadius: '13px',
        ...styleSheet
      }}
      onClick={(e)=>{
        isLink && e.preventDefault();
        isLink && router.push(href);
        !isLink && props.onClick && props.onClick(e)
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

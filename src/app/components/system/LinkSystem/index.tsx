import React from "react";
import NextLink from 'next/link';
import Text from "@src/app/theme/components/Text/Text";
import { ThemeTypographyVariants } from "@src/app/theme/theme";
import { useTheme } from "@src/app/theme/ThemeProvider";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface LinkProps{
  href: string;
  children: React.ReactNode;
  styleSheet?: StyleSheet;
  variant?: ThemeTypographyVariants;
  colorVariant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'negative' | 'complementar';
  colorVariantEnabled?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LinkSystem =  React.forwardRef(({
  href,
  children,
  colorVariant,
  styleSheet,
  colorVariantEnabled,
  backgroundColor,
  ...props 
}: LinkProps, ref) => {
  
  const theme = useTheme();

  const currentColorSet = {
    color: theme.colors[colorVariant].x500,
    hover: {
      color: theme.colors[colorVariant].x500,
    },
    focus: {
      color: theme.colors[colorVariant].x600
    }
  }


  const linkProps = {
    ref,
    href,
    styleSheet: {
      textDecoration: 'none',
      ...colorVariantEnabled && {
        color: currentColorSet.color,
      },
      ...styleSheet,
      hover:{
        ...styleSheet?.hover,
        ...colorVariantEnabled && {
          color: currentColorSet.hover.color
        }
      },
      focus:{
        ...styleSheet?.focus,
        ...colorVariantEnabled && {
          color: currentColorSet.focus.color
        }
      },
    },
    children,
    ...props
  }

  const isInternalLink = href.startsWith('http');
  if(isInternalLink) return <Text 
    {...{
      target: '_blank',
      ...linkProps
    }}
  />

  return(
    <NextLink href={href} passHref style={{
      textDecoration: 'none',
      width: '100%'
    }}>
        <Text {...linkProps}>{children}</Text>
    </NextLink>
  )
})

LinkSystem.defaultProps = {
  colorVariant: 'primary',
  colorVariantEnabled: true
}

export default LinkSystem;

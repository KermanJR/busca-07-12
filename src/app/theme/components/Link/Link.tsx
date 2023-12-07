import React from "react";
import NextLink from 'next/link';
import Text from "../Text/Text";
import { ThemeTypographyVariants } from "@src/app/theme/theme";
import { useTheme } from "@src/app/theme/ThemeProvider";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface LinkProps{
  href: string;
  children: React.ReactNode;
  target?: string;
  styleSheet?: StyleSheet;
  variant?: ThemeTypographyVariants;
  colorVariant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'negative' | 'complementar';
  colorVariantEnabled?: boolean;
}

const Link =  React.forwardRef(({
  href,
  children,
  colorVariant,
  styleSheet,
  target,
  colorVariantEnabled,
  ...props 
}: LinkProps, ref) => {
  
  const theme = useTheme();

  const currentColorSet = {
    color: theme.colors[colorVariant].x500,
    hover: {
      color: theme.colors[colorVariant].x400,
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
    <NextLink href={href} target={target} passHref style={{
      textDecoration: 'none',
      width: '100%'
    }}>
        <Text {...linkProps}>{children}</Text>
    </NextLink>
  )
})

Link.defaultProps = {
  colorVariant: 'primary',
  colorVariantEnabled: true
}

export default Link;

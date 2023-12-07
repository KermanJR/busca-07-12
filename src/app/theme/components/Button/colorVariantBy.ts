import { Theme } from "@src/app/theme/theme";

export type ColorVariant = 'primary' | 'accent' | 'positive' | 'negative' | 'warning' | 'neutral' | 'secondary' | 'complementar';
export type Variant = 'ghost' | 'contained' | 'outlined';
export type textVariant =
  | 'heading1'
  | 'heading1semiBold'
  | 'heading1Bold'
  | 'heading2'
  | 'heading2semiBold'
  | 'heading2Bold'
  | 'heading3'
  | 'heading3semiBold'
  | 'heading3Bold'
  | 'heading4'
  | 'heading4semiBold'
  | 'heading4Bold'
  | 'heading5'
  | 'heading5semiBold'
  | 'heading5Bold'
  | 'heading6'
  | 'heading6semiBold'
  | 'heading6Bold'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption'
  | 'label'
  | 'small'


function createVariant(theme: Theme, colorVariant: ColorVariant) {
  return {
    contained: {
      backgroundColor: theme.colors[colorVariant].x500,
      color: theme.colors.neutral.x000,
    },
    outlined: {
      border: '1px solid',
      backgroundColor: 'transparent',
      color: theme.colors[colorVariant].x500,
      borderColor: theme.colors[colorVariant].x500,
      hover: {
        backgroundColor: theme.colors.neutral.x100,
      },
      focus: {
        backgroundColor: theme.colors.neutral.x100,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors[colorVariant].x500,
      hover: {
        backgroundColor: theme.colors[colorVariant].x500,
      },
      focus: {
        backgroundColor: theme.colors[colorVariant].x500,
      },
    },
  };
}

export function colorVariantBy(theme: Theme, colorVariant: ColorVariant, variant: Variant) {
  const styles = {
    primary: createVariant(theme, 'primary'),
    secondary: createVariant(theme, 'secondary'),
    accent: createVariant(theme, 'accent'),
    positive: createVariant(theme, 'positive'),
    negative: createVariant(theme, 'negative'),
    warning: createVariant(theme, 'warning'),
    neutral: createVariant(theme, 'neutral'),
    complementar: createVariant(theme, 'complementar'),
    
  };

  return styles[colorVariant][variant];
}

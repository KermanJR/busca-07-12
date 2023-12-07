
import { useTheme } from "@src/app/theme/ThemeProvider";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase"
import { ButtonSize, buttonSize } from "./buttonSize";
import { ColorVariant, colorVariantBy, Variant } from "./colorVariantBy";
import * as icons from '../Icon/svgs/_index';
import Icon from "../Icon/Icon";
import Box from "../Box/Box";

interface ButtonProps extends ButtonBaseProps{
  fullWidth?: boolean;
  children?: React.ReactNode;
  colorVariant: ColorVariant;
  variant?: Variant;
  size?: ButtonSize;
  hasIcon?: boolean;
  nameIcon?: keyof typeof icons;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  type?:string;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({
  styleSheet, 
  fullWidth, 
  colorVariant,
  variant,
  size,
  hasIcon,
  nameIcon,
  type,
  isLoading,
  children,
  ...props
}: ButtonProps){

  const theme = useTheme();

  return(
    <ButtonBase
    type={type}
      styleSheet={{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'self-start',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.4rem',
        ...colorVariantBy(theme, colorVariant, variant),
        ...buttonSize[size],
        ...(fullWidth &&{
          alignSelf: 'initial'
        }),
        ...styleSheet
      }}
      {...props}
    >
      {isLoading ? (
        <Box className="loading-indicator">Carregando...</Box>
      ) : (
        <>
          {hasIcon && <Icon name={nameIcon} size="md" />}
          {children ? children : ''}
        </>
      )}
    </ButtonBase>
  )
}

Button.defaultProps = {
  fullWidth: false,
  variant: 'contained',
  colorVariant: 'primary',
  size: 'lg'
}

Button.Base = ButtonBase

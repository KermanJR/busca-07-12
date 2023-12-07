import {BaseComponent} from "@src/app/theme/BaseComponent";
import * as icons from './svgs/_index';
import { StyleSheet } from "@src/app/theme/StyleSheet";

const iconSizes = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '36px'
}

interface IconProps{
  name?: keyof typeof icons | string;
  styleSheet?: StyleSheet;
  size?: keyof typeof iconSizes;
  fill?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Icon({ size, name, fill,...props }: IconProps){
  const CurrentIcon = icons[name] || icons['default_icon'];
  return(
    <BaseComponent
      as="svg"
      styleSheet={{
        width: iconSizes[size],
        heigth: iconSizes[size],
        color: fill? fill:'gray',
        objectFit: 'cover',
        marginTop: '7px',
        cursor: 'pointer'
      }}
      color="inherit"
      fill={fill}
      viewBox="0 0 28 28"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <CurrentIcon/>
    </BaseComponent>
  )
}

Icon.defaultProps = {
  name: 'default_icon',
  size: 'md'
}

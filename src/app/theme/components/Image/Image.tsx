import {BaseComponent} from "@src/app/theme/BaseComponent";
import { StyleSheet } from "@src/app/theme/StyleSheet";

interface Imageprops{
  src: string;
  alt: string;
  styleSheet?: StyleSheet;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Image({ src, alt, ...props }: Imageprops){
  return(
    <BaseComponent
      as="img"
      src={src}
      alt={alt}
      {...props}
    />
  )
}

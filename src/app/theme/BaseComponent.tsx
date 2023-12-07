import React from "react";
import styled from "styled-components";
import { StyleSheet } from "@src/app/theme/StyleSheet";
import { parseStyleSheet } from '@skynexui/responsive_stylesheet';

interface StyledBaseComponent{
  styleSheet?: StyleSheet;
  ref: any;
  for?: string;
  id?: string;
  className?: string;
  defaultValue?: any;
}

const StyledBaseComponent = styled.div<StyledBaseComponent>`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  flex-shrink: 0;
  ${({ styleSheet } ) => parseStyleSheet(styleSheet)}
`;

interface BaseComponentProps{
  styleSheet: StyleSheet;
  [key: string]: any;
}

export const BaseComponent = React.forwardRef<unknown, BaseComponentProps>((props, ref)=>{
  return(
    <>
      <StyledBaseComponent 
        {...props}
        ref={ref}
        
      />
    </>
  )
});

BaseComponent.defaultProps = {
  styleSheet: {},
}


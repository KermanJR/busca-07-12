import Box from "@src/app//theme/components/Box/Box";
import React from "react";
import { buffets } from "@src/app/Mockup";
import Carousel from "../Carousel/Carousel";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";

export const HighLights = () => {
  
  return (
      <Carousel
        items={buffets}
      />
  )
}

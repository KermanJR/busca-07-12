import Box from "@src/app//theme/components/Box/Box";
import React from "react";
import { buffets } from "@src/app/Mockup";
import CarouselTest from "../Carousel/Carousel";


export const HighLights = () => {
  
  return (
    <>
      <CarouselTest items={buffets}/>
    </>
      
  )
}

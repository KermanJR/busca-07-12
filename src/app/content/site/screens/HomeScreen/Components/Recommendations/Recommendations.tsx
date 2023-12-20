import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BiMap } from "react-icons/bi";
import { UserContext } from "@src/app/context/UserContext";
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import Image from "@src/app/theme/components/Image/Image";
import Icon from "@src/app/theme/components/Icon/Icon";
import Button from "@src/app/theme/components/Button/Button";
import styles from './slider.module.css';
import BuffetService from "@src/app/api/BuffetService";
import useResponsive from "@src/app/theme/helpers/useResponsive";
import useSize from "@src/app/theme/helpers/useSize";
import Carousel from "../CarouselTeste";
import CarouselT from "../CarouselTeste";

export const Recommendations = () => {
  const [buffets, setBuffets] = useState([]);
  const router = useRouter();
  const { setIdBuffet } = useContext(UserContext);

  const isMobile = useResponsive();
  const size = useSize();

  useEffect(() => {
    // Carregue os buffets premium e em destaque do seu serviço
    BuffetService.showBuffets()
      .then(res => {
        setBuffets(res);
      });
  }, []);

  function capitalizeFirstLetter(word) {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
    arrows: true,
    centerPadding: 20,
    useCSS: true,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    variableWidth: false,
    arrows: true,
    centerPadding: 20,
    useCSS: true,
    accessibility: true,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
  };

  // Filtrar os buffets premium
  const buffetsPremium = buffets.filter((buffet) => {
    return buffet.entidade.assinaturas.some((assinatura) => {
      return assinatura.plano.nome === "Premium";
    });
  });



  // Filtrar os buffets em destaque
  const buffetsDestaque = buffets.filter((buffet) => {
    return buffet.entidade.destacado === "1";
  });

 
  let slides = [];

  if (buffetsPremium?.length === 0) {
    // Se não houver buffets premium, renderize os buffets em destaque
    slides = buffetsDestaque;
  } else {
    // Renderize os buffets premium e complete com os buffets em destaque
    slides = buffetsPremium;

    if (buffetsPremium.length < 3) {
      // Se houver menos de 3 buffets premium, complete com os buffets em destaque
      const remainingSlidesCount = 4 - buffetsPremium.length;
      slides.push(...buffetsDestaque.slice(0, remainingSlidesCount));
    }
  }


  const handleChangeIdBuffet = (result) => {
    setIdBuffet(result?.id);
    localStorage.setItem('ID_BUFFET', result?.id);
    router.push(`/buffets/buffet`);
  };



  return (
    <CarouselT buffets={buffets}/>
  );
};

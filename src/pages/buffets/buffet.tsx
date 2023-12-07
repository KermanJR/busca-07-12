
import BuffetService from "@src/app/api/BuffetService";
import Footer from "@src/app/components/site/Patterns/Footer/Footer";
import Header from "@src/app/components/site/Patterns/Header/Header";
import SinglePageBuffet from "@src/app/content/site/screens/SinglePageBuffet";
import { useRouter } from 'next/router';
import { useEffect } from "react";


export default function Buffet(){

    return(
      <><Header/>
        <SinglePageBuffet />
        <Footer/>
      </>
    )
  }
  
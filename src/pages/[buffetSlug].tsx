
import Footer from "@src/app/components/site/Patterns/Footer/Footer";
import Header from "@src/app/components/site/Patterns/Header/Header";
import SinglePageBuffet from "@src/app/content/site/screens/SinglePageBuffet";
import { useRouter } from 'next/router';


export default function Buffet(){
  const router = useRouter();
  const { buffetSlug } = router.query;

    return(
      <><Header/>
        <SinglePageBuffet slug={buffetSlug}/>
        <Footer/>
      </>
    )
  }
  
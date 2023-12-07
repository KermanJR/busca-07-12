import GlobalStyle from "@src/app/theme/GlobalStyle";
import ThemeProvider from "@src/app/theme/ThemeProvider";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import ActivePageContext from "@src/app/context/ActivePageContext";
import { ModalProvider } from "@src/app/context/ModalContext";
import { UserProvider } from "@src/app/context/UserContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps){

  const [href, setHref] = useState('');
  const [activePage, setActivePage] = useState('Dashboard');
  const [widthSideMenu, setWidthSizeMenu] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();
  

  useEffect(()=>{
    setHref(window.document.location.pathname);
  },[])

  return(
    <ActivePageContext.Provider value={{isOpen, setIsOpen, activePage, setActivePage, widthSideMenu, setWidthSizeMenu}}>
        <title>Busca Buffet</title>
        <UserProvider>
        <ThemeProvider>
          <ModalProvider>
            <GlobalStyle/>
            <Component {...pageProps}/>
          </ModalProvider>
        </ThemeProvider>
        </UserProvider>
        
    </ActivePageContext.Provider>
  )
}

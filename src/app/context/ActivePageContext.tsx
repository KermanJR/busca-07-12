// em um arquivo chamado ActivePageContext.js
import { createContext } from 'react';

type ActivePageContextType = {
  activePage: string;
  widthSideMenu: string;
  isOpen: boolean;
  setWidthSizeMenu: (width: string) => void;
  setActivePage: (page: string) => void;
  setIsOpen: (page: boolean) => void;
};

const ActivePageContext = createContext<ActivePageContextType | undefined>(undefined);


export default ActivePageContext;

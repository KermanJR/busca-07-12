
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  isNovoModalOpen: boolean,
  isModalOpenBudget: boolean,
  isModalRecoveryPassword: boolean,
  openModal: () => void;
  closeModal: () => void;
  openNovoModal: () => void;
  closeNovoModal: () => void,
  openBudgetModal: () => void;
  closeBudgetModal: () => void,

  openRecoveryPassword: ()=>void,
  closeRecoveryPassword: ()=>void,

  setIsNovoModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalBudgetOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultContextData: ModalContextType = {
  isModalOpen: false,
  isNovoModalOpen: false,
  isModalOpenBudget: false,
  isModalRecoveryPassword: false,

  openRecoveryPassword: ()=>{},
  closeRecoveryPassword: ()=>{},

  openNovoModal: () => {},
  openModal: () => {},
  openBudgetModal: () => {},

  closeNovoModal: () => {},
  closeModal: () => {},
  closeBudgetModal: ()=>{},

  setModalBudgetOpen: ()=>{},
  setModalOpen: ()=>{},
  setIsNovoModalOpen: ()=>{},


  
};

export const ModalContext = createContext<ModalContextType>(defaultContextData);

interface Props {
  children: ReactNode;
}

export const useModal = (): ModalContextType => {
  return useContext(ModalContext);
};

export const ModalProvider: React.FC<Props> = ({ children }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isModalOpenBudget, setModalBudgetOpen] = useState<boolean>(false);
  const [isNovoModalOpen, setIsNovoModalOpen] = useState<boolean>(false); // Novo estado para o novo modal

  const [isModalRecoveryPassword, setIsModalRecoveryPassword] = useState<boolean>(false); // Novo estado para o novo modal


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openBudgetModal = () => {
    setModalBudgetOpen(true);
  };

  const closeBudgetModal = () => {
    setModalBudgetOpen(false);
  };

  const openRecoveryPassword = ()=>{
    setIsModalRecoveryPassword(true)
    setModalOpen(false); // Fechar o modal existente
    setModalBudgetOpen(false); // Fechar o modal existente
    setIsNovoModalOpen(false);
  }

  const closeRecoveryPassword = ()=>{
    setIsModalRecoveryPassword(false)
  }
  
  const openNovoModal = () => {
    setModalOpen(false); // Fechar o modal existente
    setModalBudgetOpen(false); // Fechar o modal existente
    setIsNovoModalOpen(true);
  };

  const closeNovoModal = () => {
    setIsNovoModalOpen(false);
  };


  return (
    <ModalContext.Provider 
      value={{
        isModalOpen,
        isNovoModalOpen,
        isModalOpenBudget,
        isModalRecoveryPassword,
        openRecoveryPassword,
        closeRecoveryPassword,
        setModalOpen,
        openModal,
        closeModal,
        openNovoModal, 
        closeNovoModal, 
        setIsNovoModalOpen,
        setModalBudgetOpen,
        closeBudgetModal,
        openBudgetModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

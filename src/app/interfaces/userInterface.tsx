import { ReactNode } from "react";

export interface UserState {
  nome: string;
  documento: string;
  aceitou_termo: string;
  destacado: string;
  remember_me_token: string;
  selectedCity: string;
  selectedState: string;
  google_token: string;
  token_recovery: string;
  selectedPlan: [];
  selectedAttractives: [];
  selectedServices: [];
  buffetsRelacionados: [];
  dataUser: [];
  dataCupons: [];
  email: string;
  selectedCategory: string[];
  password: string;
  errorLogin: string;
  successLogin: string;
  id_perfil: number;
  idEvent: number;
  slugBuffet: string;
  dataBuffet: [];
  selectedServicesAndAttractives: [];
  idBuffet: number;
}

export interface ExtendedUserContextType extends UserState {
  login: () => void; // Defina os parâmetros necessários, se houver
}


export interface UserSetters {
  setNome: React.Dispatch<React.SetStateAction<string>>;
  setDocumento: React.Dispatch<React.SetStateAction<string>>;
  setAceitouTermo: React.Dispatch<React.SetStateAction<string>>;
  setDestacado: React.Dispatch<React.SetStateAction<string>>;
  setRememberMeToken: React.Dispatch<React.SetStateAction<string>>;
  setGoogleToken: React.Dispatch<React.SetStateAction<string>>;
  setDataCupons: React.Dispatch<React.SetStateAction<[]>>;
  setTokenRecovery: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setDataUser: React.Dispatch<React.SetStateAction<[]>>;
  setSelectedPlan: React.Dispatch<React.SetStateAction<[]>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<[]>>;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  setIdPerfil: React.Dispatch<React.SetStateAction<number>>;
  setIdEvent: React.Dispatch<React.SetStateAction<number>>;
  setIdBuffet: React.Dispatch<React.SetStateAction<number>>;
  setSelectedAttractives: React.Dispatch<React.SetStateAction<[]>>;
  setDataBuffet: React.Dispatch<React.SetStateAction<[]>>;
  setBuffetsRelacionados: React.Dispatch<React.SetStateAction<[]>>;
  setSelectedServices: React.Dispatch<React.SetStateAction<[]>>;
  setSelectedServicesAndAttractives: React.Dispatch<React.SetStateAction<[]>>;
  setSlugBuffet: React.Dispatch<React.SetStateAction<string>>;
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>;
  setSuccessLogin: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserProviderProps {
  children: ReactNode;
}


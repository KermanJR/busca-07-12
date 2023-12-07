import { UserContext } from '@src/app/context/UserContext';
import Box from '@src/app/theme/components/Box/Box';
import { useContext, useEffect, useState } from 'react';

export const GoogleLoginButton = () => {

  const {
    setNome,
    setEmail
  } = useContext(UserContext);


  useEffect(() => {
    if (!window.google) {
      console.error("Google SDK not loaded");
      return;
    }

    // Inicializar o botão de login
    window.google?.accounts?.id.initialize({
      client_id: "1033991996623-9iuk41181n8bsmnh22qdhm07g626esbt.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      auto_select: false,
    });

    // Renderizar o botão
    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "sign_in_with",
        logo_alignment: "center",
      }
    );

    // Aplicar um estilo personalizado para o botão
    const googleButtonElement = document.querySelector(".google-accounts-id-render-button");
    if (googleButtonElement) {
      googleButtonElement.style.width = "500";
    }
  }, []);

  const decodePayload = (tokenId) => {
    const payload = tokenId.split('.')[1];
    const base64 = payload.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  const handleCredentialResponse = (response) => {
    const tokenId = response.credential;
    const userData = decodePayload(tokenId);
    setNome(userData.name);
    setEmail(userData.email);
  };

  return (
    <>
      <div id="googleButton" style={{margin: '0 auto', width: '450px', display: 'flex', flexDirection: 'row', justifyContent: 'center'}} ></div>
      <span style={{display: 'inline-block', width: '80%', height: '3px', margin: '0 auto', backgroundColor: '#EA760A88'}}></span>
    </>
  );
};

export default GoogleLoginButton;

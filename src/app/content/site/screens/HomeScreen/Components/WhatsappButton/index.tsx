import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Box from '@src/app/theme/components/Box/Box';

const WhatsAppButton = (number) => {

  const handleClick = () => {
    // Substitua 'SEU_NUMERO' pelo seu número de telefone com o código do país (por exemplo, '+551234567890')
    const whatsappLink = `https://api.whatsapp.com/send?phone=${number?.number}`;

    // Abre o link do WhatsApp em uma nova janela
    window.open(whatsappLink, '_blank');
  };

  return (
    <Box 
      styleSheet={{
        position: 'fixed',
        bottom: '20px',
        width: '60px',
        height: '60px',
        right: '20px',
        background: '#25D366',
        padding: '10px',
        borderRadius: '100%',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faWhatsapp} style={{ color: 'white', fontSize: '40px' }} />
    </Box>
  );
};

export default WhatsAppButton;

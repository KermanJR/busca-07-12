import React, { useState } from "react";

function IntervaloHoras() {
  const [horaInicio, setHoraInicio] = useState("00");
  const [minutoInicio, setMinutoInicio] = useState("00");
  const [horaFim, setHoraFim] = useState("00");
  const [minutoFim, setMinutoFim] = useState("00");

  const handleHoraInicioChange = (e) => {
    setHoraInicio(e.target.value);
  };

  const handleMinutoInicioChange = (e) => {
    setMinutoInicio(e.target.value);
  };

  const handleHoraFimChange = (e) => {
    setHoraFim(e.target.value);
  };

  const handleMinutoFimChange = (e) => {
    setMinutoFim(e.target.value);
  };

  return (
    <div>
      <label>Horário de Início:</label>
      <select value={horaInicio} onChange={handleHoraInicioChange}>
        {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")).map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
      <select value={minutoInicio} onChange={handleMinutoInicioChange}>
        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((minuto) => (
          <option key={minuto} value={minuto}>
            {minuto}
          </option>
        ))}
      </select>

      <label>Horário de Fim:</label>
      <select value={horaFim} onChange={handleHoraFimChange}>
        {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0")).map((hora) => (
          <option key={hora} value={hora}>
            {hora}
          </option>
        ))}
      </select>
      <select value={minutoFim} onChange={handleMinutoFimChange}>
        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0")).map((minuto) => (
          <option key={minuto} value={minuto}>
            {minuto}
          </option>
        ))}
      </select>
    </div>
  );
}

export default IntervaloHoras;

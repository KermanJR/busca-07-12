import React from "react";
import BudgetId from "../pages/BudgetId/index"; // Importe o componente para exibir os detalhes do orçamento

function OrcamentoRouter({ idEvent }) {
  // Se não houver um ID válido, você pode renderizar uma mensagem de erro ou um componente padrão
  if (!idEvent) {
    return <p>Selecione um orçamento para ver os detalhes.</p>;
  }

  return <BudgetId idEvent={idEvent} />;
}

export default OrcamentoRouter;

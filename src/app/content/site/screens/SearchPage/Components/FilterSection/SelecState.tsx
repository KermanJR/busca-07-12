import Box from "@src/app/theme/components/Box/Box";
import CSS from "./index.module.css";
import { useContext } from "react";
import { UserContext } from "@src/app/context/UserContext";

export function SelectState({stateInfos, filterName, filterState}) {
  if (filterName !== 'filterState') return

  const {
    selectedCity,
    setSelectedCity,
    setSelectedState
  } = useContext(UserContext);



  function removeAccentsAndUpperCase(str) {
    const accentsMap = {
      'á': 'a',
      'à': 'a',
      'â': 'a',
      'ã': 'a',
      'é': 'e',
      'è': 'e',
      'ê': 'e',
      'í': 'i',
      'ì': 'i',
      'î': 'i',
      'ó': 'o',
      'ò': 'o',
      'ô': 'o',
      'õ': 'o',
      'ú': 'u',
      'ù': 'u',
      'û': 'u',
      'ç': 'c',
    };

  str = str?.replace(/[áàâãéèêíìîóòôõúùûç]/g, match => accentsMap[match] || match);

  str = str?.toUpperCase();

  return str;
  }
  setSelectedState(removeAccentsAndUpperCase(filterState))

  return (
    <Box>
      <select name="stateInfos"
        onChange={(e)=>setSelectedCity(e.target?.value)}  
         className={filterState == null ? CSS.selectsNone: CSS.selects}>
        {stateInfos?.map((info, index) => (
          <option key={index} value={info?.nome}>{info?.nome}</option>
        ))}
      </select>
    
   </Box>
  )
}

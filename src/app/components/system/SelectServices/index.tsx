import { UserContext } from "@src/app/context/UserContext";
import Box from "@src/app/theme/components/Box/Box";
import Text from "@src/app/theme/components/Text/Text";
import theme from "@src/app/theme/theme";
import React, { useContext, useEffect, useRef, useState } from "react";
import Select from "react-select";



const SelectWithClickToAddServices = ({options, selectedServicesBuffet, setAuxServicesBuffets}) => {

  const [selectedOptions, setSelectedOptions] = useState(selectedServicesBuffet);
  const selectedOptionsRef = useRef(selectedOptions);

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.value !== optionToRemove.value
    );
    setSelectedOptions(updatedOptions);
  };

  const mappedOptions = options.map((option) => ({
    value: option.id,
    label: option.nome,
  }));

  useEffect(() => {
    setSelectedOptions(selectedServicesBuffet);
  }, [selectedServicesBuffet.length > 0]);

  useEffect(() => {
    selectedOptionsRef.current = selectedOptions;
    setAuxServicesBuffets(selectedOptionsRef.current);
  }, [selectedOptions]);


  return (
    <Box tag="form">
      <Select
        options={mappedOptions}
        value={selectedOptions}
        onChange={handleChange}
        isMulti
        placeholder="Selecione as opções"
        required={true}
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? `1px solid ${theme.colors.neutral.x100}` : provided.border,
            outline: state.isFocused ? `none` : provided.outline,
            padding: '.2rem',
            boxShadow: state.isFocused ? 'none' : provided.boxShadow,
            background: theme.colors.neutral.x050
          }),
        }}
      />
      <Box>
        {selectedServicesBuffet.map((option) => (
          <Text
            key={option?.id}
            onClick={() => handleRemoveOption(option)}
            styleSheet={{ cursor: "pointer"}}
          >
            {option?.nome}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default SelectWithClickToAddServices;

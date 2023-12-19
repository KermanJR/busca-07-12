import React, { useEffect, useState } from "react";
import Select from "react-select";
import Box from "@src/app/theme/components/Box/Box";
import theme from "@src/app/theme/theme";

const SelectHours = ({ options, selectedHoursBuffet, setAuxHoursBuffet }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (selectedOption) => {
    const newValue = selectedOption ? selectedOption.label : "";
    setSelectedValue(newValue);
    setAuxHoursBuffet(newValue);
  };

  const mappedOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
    horario_atendimento: option.label,
  }));

  useEffect(() => {
    // Atualize o valor selecionado com base no label do horário
    setSelectedValue(selectedHoursBuffet);
  }, [selectedHoursBuffet]);

  return (
    <Box tag="form">
      <Select
        options={mappedOptions}
        value={mappedOptions.find((option) => option.label === selectedValue)}
        onChange={handleChange}
        isMulti={false}
        placeholder="Selecione a opção"
        required={true}
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: state.isFocused
              ? `1px solid ${theme.colors.neutral.x100}`
              : provided.border,
            outline: state.isFocused ? `none` : provided.outline,
            padding: ".2rem",
            boxShadow: state.isFocused ? "none" : provided.boxShadow,
            background: theme.colors.neutral.x050,
          }),
        }}
      />
    </Box>
  );
};

export default SelectHours;

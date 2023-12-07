import Box from "@src/app/theme/components/Box/Box";
import { BaseComponent } from "@src/app/theme/BaseComponent";
import { useTheme } from "@src/app/theme/ThemeProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet } from "@src/app/theme/StyleSheet";
import Text from "@src/app/theme/components/Text/Text";

interface InputProps {
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  styleSheet?: StyleSheet;
  className?: string;
  placeholder?: string;
  tag?: string;
  maxLength?: number;
  min?: number;
  defaultValue?: any;
  max?: number;
  required?: boolean;
  disabled?: Boolean;
}

const InputDash: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  styleSheet,
  defaultValue,
  className,
  placeholder,
  disabled,
  tag,
  required,
  maxLength,
  min,
  max,
  ...props
}) => {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const theme = useTheme();

  const Tag = tag || 'input'

  return (
    <Box styleSheet={{ position: 'relative' }}>
      <BaseComponent 
        as={Tag} 
        type={type} 
        styleSheet={{
          background: theme.colors.neutral.x050,
          height: '48px',
          borderRadius: '6px',
          padding: '1rem',
          paddingRight: '2.5rem',
          border: 'none',
          ...styleSheet
        }}
        className={className}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange} 
      	placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        disabled={disabled}
        required={required}
        max={max}
        {...props} 
      />
      {type === 'date' && !value && (
        <Text styleSheet={{ 
          position: 'absolute', 
          left: '.5rem', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          pointerEvents: 'none', 
          fontWeight: 'normal',
          color: theme.colors.neutral.x900
        }}>
          {placeholder}
        </Text>
      )}
    </Box>
  );
};

export default InputDash;

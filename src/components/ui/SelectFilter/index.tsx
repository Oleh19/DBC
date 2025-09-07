import type { FC } from 'react';

interface SelectFilterProps {
  value: string | null;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  width?: string | number;
  onChange: (val: string | null) => void;
}

const SelectFilter: FC<SelectFilterProps> = ({
  value,
  options,
  placeholder,
  disabled,
  width = '100%',
  onChange,
}) => (
  <select
    value={value || ''}
    onChange={(e) => onChange(e.target.value || null)}
    disabled={disabled}
    style={{ width, cursor: disabled ? 'not-allowed' : 'pointer' }}
  >
    <option value="">{placeholder || 'All'}</option>
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export default SelectFilter;

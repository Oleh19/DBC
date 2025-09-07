import type { ChangeEvent, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import styles from './TextFilter.module.css';

interface TextFilterProps {
  value?: string | null;
  placeholder?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  debounceMs?: number;
  maxLength?: number;
  width?: string | number;
  'aria-label'?: string;
}

const TextFilter: FC<TextFilterProps> = ({
  value = '',
  placeholder = 'Search...',
  onChange,
  disabled = false,
  debounceMs = 300,
  maxLength = 100,
  width = '100%',
  'aria-label': ariaLabel,
}) => {
  const [inputValue, setInputValue] = useState<string>(value ?? '');

  useEffect(() => {
    setInputValue(value ?? '');
  }, [value]);

  useEffect(() => {
    if (!onChange) return;

    const handler = setTimeout(() => {
      const trimmed = inputValue.trim();
      if (trimmed !== value) {
        onChange(trimmed);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [inputValue, onChange, debounceMs, value]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (val.length > maxLength) return;

      setInputValue(val);
    },
    [maxLength],
  );

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
      disabled={disabled}
      aria-label={ariaLabel || placeholder}
      className={styles.input}
      style={{ width }}
    />
  );
};

export default TextFilter;

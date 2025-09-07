import { RangeSlider } from '@/components/ui';
import type { FC } from 'react';

interface RangeFilterProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (val: [number, number]) => void;
  width?: string | number;
}

const RangeFilter: FC<RangeFilterProps> = ({
  label,
  min,
  max,
  value,
  onChange,
  width = '100%',
}) => (
  <div style={{ width }}>
    <label>
      {label}: {value[0]} - {value[1]}
    </label>

    <RangeSlider min={min} max={max} value={value} onChange={onChange} width="100%" />
  </div>
);

export default RangeFilter;

import type { FC } from 'react';
import styles from './RangeSlider.module.css';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  width?: string | number;
}

const RangeSlider: FC<RangeSliderProps> = ({ min, max, value, onChange, width = '100%' }) => {
  const [minVal, maxVal] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.min(Number(e.target.value), maxVal - 1);
    onChange([newVal, maxVal]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Math.max(Number(e.target.value), minVal + 1);
    onChange([minVal, newVal]);
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        width,
        ['--min' as any]: ((minVal - min) / (max - min)) * 100,
        ['--max' as any]: ((maxVal - min) / (max - min)) * 100,
      }}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className={styles.thumb}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className={styles.thumb}
      />
      <div className={styles.track}></div>
    </div>
  );
};

export default RangeSlider;

import { type FC } from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const Loader: FC<LoaderProps> = ({ size = 40, color = '#2563eb', thickness = 4 }) => {
  return (
    <div
      className={styles.loader}
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderColor: `${color} transparent transparent transparent`,
      }}
    />
  );
};

export default Loader;

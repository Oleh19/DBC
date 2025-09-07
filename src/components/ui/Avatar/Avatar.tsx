import { type FC } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

const Avatar: FC<AvatarProps> = ({ src, alt = '', size = 40 }) => {
  return <img src={src} alt={alt} width={size} height={size} className={styles.avatar} />;
};

export default Avatar;

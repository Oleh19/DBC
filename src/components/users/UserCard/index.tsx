import type { Customer } from '@/api/types/customer';
import { Avatar } from '@/components/ui';
import { type FC } from 'react';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: Customer;
  onClick: (user: Customer) => void;
}

const UserCard: FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(user)}>
      <Avatar src={`https://i.pravatar.cc/150?u=${user.email}`} size={60} />

      <div className={styles.info}>
        <h3 className={styles.name}>
          {user.firstName} {user.lastName}
        </h3>

        <p className={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;

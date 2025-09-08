import type { Customer } from '@/api';
import { Avatar } from '@/components/ui';
import { type FC } from 'react';
import styles from './userHeader.module.css';

interface UserHeaderProps {
  user: Customer;
}

const UserHeader: FC<UserHeaderProps> = ({ user }) => {
  return (
    <header className={styles.userHeader}>
      <Avatar src={`https://i.pravatar.cc/150?u=${user.email}`} size={80} />
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>{user.email}</p>
        <p>
          {user.street} {user.streetNumber}, {user.city}, {user.state}, {user.country},{' '}
          {user.postCode}
        </p>
        <p>Gender: {user.gender}</p>
      </div>
    </header>
  );
};

export default UserHeader;

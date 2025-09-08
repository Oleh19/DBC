import type { Customer } from '@/api';
import UserCard from '@/components/users/UserCard';
import { useMemo, useState, type FC } from 'react';
import styles from './UserList.module.css';

interface UserListProps {
  users: Customer[];
  onSelectUser: (user: Customer) => void;
}

const UserList: FC<UserListProps> = ({ users, onSelectUser }) => {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female' | 'Other'>('All');

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesGender = genderFilter === 'All' || user.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [users, search, genderFilter]);

  return (
    <div className={styles.userList}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value as any)}
          className={styles.genderSelect}
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className={styles.cards}>
        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={`${user.email}-${user.firstName}-${user.lastName}`}
              user={user}
              onClick={onSelectUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;

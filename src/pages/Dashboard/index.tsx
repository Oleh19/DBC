import { useCallback, useMemo, useState, type FC, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { List, type RowComponentProps } from 'react-window';

import type { Customer } from '@/api';
import { UserCard } from '@/components';
import { Button, RangeFilter, SelectFilter, TextFilter } from '@/components/ui';

import { PAGE_SIZE, ROW_HEIGHT } from './constants';
import styles from './dashboard.module.css';

interface DashboardProps {
  users: Customer[];
  onUserClick: (user: Customer) => void;
}

interface RowProps {
  filteredUsers: Customer[];
}

const Dashboard: FC<DashboardProps> = ({ users, onUserClick }) => {
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string>('');

  const [loadedItems, setLoadedItems] = useState(PAGE_SIZE);

  const minPostCode = useMemo(
    () => Math.min(...users.map((u) => Number(u.postCode) || 0)),
    [users],
  );
  const maxPostCode = useMemo(
    () => Math.max(...users.map((u) => Number(u.postCode) || 99999)),
    [users],
  );
  const [postCodeRange, setPostCodeRange] = useState<[number, number]>([minPostCode, maxPostCode]);

  const handleFilterChange = useCallback(() => {
    setLoadedItems(PAGE_SIZE);
  }, []);

  const resetFilters = useCallback(() => {
    setGenderFilter(null);
    setCountryFilter(null);
    setStateFilter(null);
    setNameFilter('');
    setPostCodeRange([minPostCode, maxPostCode]);
    setLoadedItems(PAGE_SIZE);
  }, [minPostCode, maxPostCode]);

  const fetchMoreData = useCallback(() => {
    try {
      setLoadedItems((prev) => Math.min(prev + PAGE_SIZE, filteredUsers.length));
    } catch (err) {
      console.error(err);
      toast.error('Error loading more users');
    }
  }, []);

  const filteredUsers = useMemo(() => {
    try {
      return users.filter((user) => {
        const genderMatch = !genderFilter || user.gender === genderFilter;
        const countryMatch = !countryFilter || user.country === countryFilter;
        const stateMatch = !stateFilter || user.state === stateFilter;

        const postCodeNum = Number(user.postCode);
        const postCodeMatch = postCodeNum >= postCodeRange[0] && postCodeNum <= postCodeRange[1];

        const nameMatch =
          !nameFilter || user.firstName.toLowerCase().includes(nameFilter.toLowerCase());

        return genderMatch && countryMatch && stateMatch && postCodeMatch && nameMatch;
      });
    } catch (err) {
      console.error(err);
      toast.error('Error filtering users');
      return [];
    }
  }, [users, genderFilter, countryFilter, stateFilter, postCodeRange, nameFilter]);

  const availableStates = useMemo(() => {
    const base = countryFilter ? users.filter((u) => u.country === countryFilter) : users;
    return Array.from(new Set(base.map((u) => u.state)));
  }, [users, countryFilter]);

  const Row = useCallback(
    ({ index, style, ...props }: RowComponentProps<RowProps>): ReactNode => {
      const user = props.filteredUsers[index];
      if (!user) return null;

      return (
        <div style={style}>
          <UserCard
            key={`${user.email}-${user.firstName}-${user.lastName}`}
            user={user}
            onClick={() => onUserClick(user)}
          />
        </div>
      );
    },
    [onUserClick],
  );

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      <div className={styles.filters}>
        <TextFilter
          value={nameFilter}
          placeholder="Search by first name"
          width={200}
          onChange={(val) => {
            setNameFilter(val);
            handleFilterChange();
          }}
        />

        <SelectFilter
          value={genderFilter}
          options={['Male', 'Female', 'Other']}
          placeholder="All Genders"
          width={200}
          onChange={(val) => {
            setGenderFilter(val);
            handleFilterChange();
          }}
        />

        <SelectFilter
          value={countryFilter}
          options={Array.from(new Set(users.map((u) => u.country)))}
          placeholder="All Countries"
          width={200}
          onChange={(val) => {
            setCountryFilter(val);
            setStateFilter(null);
            handleFilterChange();
          }}
        />

        <SelectFilter
          value={stateFilter}
          options={availableStates}
          placeholder="All States"
          width={200}
          onChange={(val) => {
            setStateFilter(val);
            handleFilterChange();
          }}
          disabled={availableStates.length === 0}
        />

        <RangeFilter
          label="Post Code"
          min={minPostCode}
          max={maxPostCode}
          value={postCodeRange}
          width={200}
          onChange={(val) => {
            setPostCodeRange(val);
            handleFilterChange();
          }}
        />

        <Button width="200px" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      <div className={styles.listContainer}>
        {filteredUsers.length === 0 ? (
          <div>No users found</div>
        ) : (
          <List<RowProps>
            rowComponent={Row}
            rowCount={Math.min(loadedItems, filteredUsers.length)}
            rowHeight={ROW_HEIGHT}
            rowProps={{ filteredUsers: filteredUsers.slice(0, loadedItems) }}
            onRowsRendered={({ stopIndex }) => {
              if (stopIndex >= loadedItems - 1 && loadedItems < filteredUsers.length) {
                fetchMoreData();
              }
            }}
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

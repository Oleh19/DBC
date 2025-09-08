import { TEST_CUSTOMERS } from '@/__mocks__/testData';
import type { Customer } from '@/api';

describe('Dashboard filtering logic', () => {
  test('filters users by gender correctly', () => {
    const genderFilter = 'Female';
    const filtered = TEST_CUSTOMERS.filter((u) => !genderFilter || u.gender === genderFilter);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].firstName).toBe('Alice');
  });

  test('returns all users when gender filter is null', () => {
    const genderFilter = null;
    const filtered = TEST_CUSTOMERS.filter((u) => !genderFilter || u.gender === genderFilter);

    expect(filtered).toHaveLength(3);
  });

  test('filters users by country correctly', () => {
    const countryFilter = 'US';
    const filtered = TEST_CUSTOMERS.filter((u) => !countryFilter || u.country === countryFilter);

    expect(filtered).toHaveLength(2);
    expect(filtered.map((u) => u.firstName)).toEqual(['Alice', 'Bob']);
  });

  test('filters users by state correctly', () => {
    const stateFilter = 'CA';
    const filtered = TEST_CUSTOMERS.filter((u) => !stateFilter || u.state === stateFilter);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].firstName).toBe('Bob');
  });

  test('filters users by name correctly', () => {
    const nameFilter = 'alice';
    const filtered = TEST_CUSTOMERS.filter(
      (u) => !nameFilter || u.firstName.toLowerCase().includes(nameFilter.toLowerCase()),
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].firstName).toBe('Alice');
  });

  test('filters users by post code range correctly', () => {
    const postCodeRange: [number, number] = [10000, 50000];
    const filtered = TEST_CUSTOMERS.filter((u) => {
      const postCodeNum = Number(u.postCode);
      return postCodeNum >= postCodeRange[0] && postCodeNum <= postCodeRange[1];
    });

    expect(filtered).toHaveLength(2);
    expect(filtered.map((u) => u.firstName)).toEqual(['Alice', 'Charlie']);
  });

  test('combines multiple filters correctly', () => {
    const genderFilter = 'Male';
    const countryFilter = 'US';

    const filtered = TEST_CUSTOMERS.filter((u) => {
      const genderMatch = !genderFilter || u.gender === genderFilter;
      const countryMatch = !countryFilter || u.country === countryFilter;
      return genderMatch && countryMatch;
    });

    expect(filtered).toHaveLength(1);
    expect(filtered[0].firstName).toBe('Bob');
  });
});

describe('Dashboard pagination logic', () => {
  const PAGE_SIZE = 2;

  test('fetchMoreData increases loaded items correctly', () => {
    let loadedItems = 1;
    const filteredUsers = TEST_CUSTOMERS;

    const newLoadedItems = Math.min(loadedItems + PAGE_SIZE, filteredUsers.length);

    expect(newLoadedItems).toBe(3);
    expect(newLoadedItems).toBeLessThanOrEqual(filteredUsers.length);
  });

  test('fetchMoreData does not exceed array length', () => {
    let loadedItems = 2;
    const filteredUsers = TEST_CUSTOMERS;

    const newLoadedItems = Math.min(loadedItems + PAGE_SIZE, filteredUsers.length);

    expect(newLoadedItems).toBe(3);
    expect(newLoadedItems).toBe(filteredUsers.length);
  });

  test('fetchMoreData with empty filtered array', () => {
    let loadedItems = 0;
    const filteredUsers: Customer[] = [];

    const newLoadedItems = Math.min(loadedItems + PAGE_SIZE, filteredUsers.length);

    expect(newLoadedItems).toBe(0);
  });
});

describe('Dashboard utility logic', () => {
  test('calculates min post code correctly', () => {
    const minPostCode = Math.min(...TEST_CUSTOMERS.map((u) => Number(u.postCode) || 0));
    expect(minPostCode).toBe(10001);
  });

  test('calculates max post code correctly', () => {
    const maxPostCode = Math.max(...TEST_CUSTOMERS.map((u) => Number(u.postCode) || 99999));
    expect(maxPostCode).toBe(90001);
  });

  test('gets unique states for country filter', () => {
    const countryFilter = 'US';
    const base = countryFilter
      ? TEST_CUSTOMERS.filter((u) => u.country === countryFilter)
      : TEST_CUSTOMERS;
    const availableStates = Array.from(new Set(base.map((u) => u.state)));

    expect(availableStates).toEqual(['NY', 'CA']);
  });

  test('gets all unique genders', () => {
    const genderOptions = Array.from(new Set(TEST_CUSTOMERS.map((u) => u.gender))).sort();
    expect(genderOptions).toEqual(['Female', 'Male']);
  });
});

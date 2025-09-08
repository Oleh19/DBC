import type { Customer, Order } from '@/api';

export const TEST_CUSTOMERS: Customer[] = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    gender: 'Female',
    country: 'US',
    state: 'NY',
    postCode: '10001',
    city: 'New York',
    street: 'Main St',
    streetNumber: '123',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    gender: 'Male',
    country: 'US',
    state: 'CA',
    postCode: '90001',
    city: 'Los Angeles',
    street: 'Oak Ave',
    streetNumber: '456',
  },
  {
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie@example.com',
    gender: 'Male',
    country: 'Canada',
    state: 'ON',
    postCode: '12345',
    city: 'Toronto',
    street: 'Pine St',
    streetNumber: '789',
  },
];

export const ALICE_USER = TEST_CUSTOMERS[0];
export const BOB_USER = TEST_CUSTOMERS[1];
export const CHARLIE_USER = TEST_CUSTOMERS[2];

export const createMockOrders = (count: number): Order[] =>
  Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    price: (i + 1) * 100,
    currency: 'USD',
    itemName: `Item ${i + 1}`,
    amount: 1,
    createdAt: Date.now(),
    shippedAt: Date.now(),
  }));

export const createMockCustomer = (gender: string): Customer => ({
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  gender,
  country: 'USA',
  city: 'New York',
  state: 'NY',
  postCode: '10001',
  street: 'Test Street',
  streetNumber: '123',
});

export const SIMPLE_ORDERS: Order[] = [
  { number: 1, price: 100, currency: 'USD', itemName: 'A', amount: 1, createdAt: 0, shippedAt: 0 },
  { number: 2, price: 200, currency: 'USD', itemName: 'B', amount: 1, createdAt: 0, shippedAt: 0 },
  { number: 3, price: 300, currency: 'USD', itemName: 'C', amount: 1, createdAt: 0, shippedAt: 0 },
  { number: 4, price: 400, currency: 'USD', itemName: 'D', amount: 1, createdAt: 0, shippedAt: 0 },
  { number: 5, price: 500, currency: 'USD', itemName: 'E', amount: 1, createdAt: 0, shippedAt: 0 },
];

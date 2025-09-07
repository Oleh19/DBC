import customersData from '@/api/mocks/customers.json';

export type Customer = (typeof customersData)[number];

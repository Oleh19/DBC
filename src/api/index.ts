import customersData from './mocks/customers.json';
import ordersData from './mocks/orders.json';

export type Customer = (typeof customersData)[number];
export type Order = (typeof ordersData)[number];

export const customers: Customer[] = customersData;
export const orders: Order[] = ordersData;

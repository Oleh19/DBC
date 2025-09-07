import ordersData from '@/api/mocks/orders.json';

export type Order = (typeof ordersData)[number];

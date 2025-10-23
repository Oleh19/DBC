import type { Customer, Order } from '@/api';
import { ORDERS_LIMIT } from '@/constants';

export const getUserOrders = (user: Customer, orders: Order[]): Order[] => {
  return user.gender === 'Female' ? orders.slice(-ORDERS_LIMIT) : orders.slice(0, ORDERS_LIMIT);
};

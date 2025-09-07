import type { Order } from '@/api';
import { type FC } from 'react';
import OrderCard from '../OrderCard';
import styles from './orderList.module.css';

interface OrderListProps {
  orders: Order[];
}

const OrderList: FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <p className={styles.noOrders}>No orders found</p>;
  }

  return (
    <ul className={styles.ordersList}>
      {orders.map((order) => (
        <OrderCard key={order.number} order={order} />
      ))}
    </ul>
  );
};

export default OrderList;

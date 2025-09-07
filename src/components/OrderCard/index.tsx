import type { Order } from '@/api';
import { type FC } from 'react';
import styles from './orderCard.module.css'

interface OrderCardProps {
  order: Order;
}

const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString();

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <li className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <span className={styles.orderNumber}>Order #{order.number}</span>
        <span className={styles.orderDate}>Created: {formatDate(order.createdAt)}</span>
      </div>
      <div className={styles.orderBody}>
        <p>
          <strong>Item:</strong> {order.itemName}
        </p>
        <p>
          <strong>Amount:</strong> {order.amount}
        </p>
        <p>
          <strong>Price:</strong> {order.price} {order.currency}
        </p>
        <p>
          <strong>Shipped:</strong> {formatDate(order.shippedAt)}
        </p>
      </div>
    </li>
  );
};

export default OrderCard;

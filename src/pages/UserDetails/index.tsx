import type { Customer, Order } from '@/api';
import { OrderList, UserHeader } from '@/components';
import { Button } from '@/components/ui';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './userDetails.module.css';

interface UserPageProps {
  user: Customer;
  orders: Order[];
  chunkSize?: number;
  onBack: () => void;
}

const UserDetails = ({ user, orders, chunkSize = 3, onBack }: UserPageProps) => {
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const hasMore = displayedOrders.length < orders.length;

  const initializeOrders = useCallback(() => {
    try {
      const initial = orders.slice(0, chunkSize);
      setDisplayedOrders(initial);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders');
    }
  }, [orders, chunkSize]);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      try {
        const nextOrders = orders.slice(displayedOrders.length, displayedOrders.length + chunkSize);
        setDisplayedOrders((prev) => [...prev, ...nextOrders]);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load more orders');
      } finally {
        setLoadingMore(false);
      }
    }, 500);
  }, [orders, chunkSize, displayedOrders.length, hasMore]);

  useEffect(() => {
    initializeOrders();
  }, [initializeOrders]);

  return (
    <div className={styles.userPage}>
      <Button variant="secondary" onClick={onBack}>
        Back to Dashboard
      </Button>

      <UserHeader user={user} />

      <section>
        <h3>Order History</h3>
        <OrderList orders={displayedOrders} />
        {hasMore && (
          <div className={styles.loadMoreWrapper}>
            <Button onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Load More'}
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDetails;

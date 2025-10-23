import type { Customer, Order } from '@/api';
import { orders } from '@/api';
import { OrderList, UserHeader } from '@/components';
import { Button } from '@/components/ui';
import { getUserOrders } from '@/utils/orderUtils';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './userDetails.module.css';

interface UserPageProps {
  user: Customer;
  chunkSize?: number;
  onBack: () => void;
}

const UserDetails = ({ user, chunkSize = 3, onBack }: UserPageProps) => {
  const userOrders = getUserOrders(user, orders);
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const hasMore = displayedOrders.length < userOrders.length;

  const initializeOrders = useCallback(() => {
    try {
      const initial = userOrders.slice(0, chunkSize);
      setDisplayedOrders(initial);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load orders');
    }
  }, [userOrders, chunkSize]);

  const loadMore = useCallback(() => {
    if (!hasMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      try {
        const nextOrders = userOrders.slice(displayedOrders.length, displayedOrders.length + chunkSize);
        setDisplayedOrders((prev) => [...prev, ...nextOrders]);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load more orders');
      } finally {
        setLoadingMore(false);
      }
    }, 500);
  }, [userOrders, chunkSize, displayedOrders.length, hasMore]);

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

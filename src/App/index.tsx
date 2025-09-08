import { useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Customer } from '@/api';
import { customers, orders } from '@/api';
import Dashboard from '@/pages/Dashboard';
import UserDetails from '@/pages/UserDetails';
import { getUserOrders } from './utils/orderUtils';

function App() {
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);

  const handleUserClick = useCallback((user: Customer) => {
    setSelectedUser(user);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedUser(null);
  }, []);

  return (
    <>
      {selectedUser ? (
        <UserDetails
          user={selectedUser}
          orders={getUserOrders(selectedUser, orders)}
          onBack={handleBack}
        />
      ) : (
        <Dashboard users={customers} onUserClick={handleUserClick} />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;

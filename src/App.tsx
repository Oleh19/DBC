import { useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Customer } from './api';
import { customers, orders } from './api';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';

const ORDERS_LIMIT = 30;

function App() {
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);

  const handleUserClick = useCallback((user: Customer) => {
    setSelectedUser(user);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedUser(null);
  }, []);

  const getUserOrders = useCallback(
    (user: Customer) =>
      user.gender === 'Female' ? orders.slice(-ORDERS_LIMIT) : orders.slice(0, ORDERS_LIMIT),
    [],
  );

  return (
    <>
      {selectedUser ? (
        <UserDetails user={selectedUser} orders={getUserOrders(selectedUser)} onBack={handleBack} />
      ) : (
        <Dashboard users={customers} onUserClick={handleUserClick} />
      )}

      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;

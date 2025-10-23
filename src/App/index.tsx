import { useCallback, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Customer } from '@/api';
import Dashboard from '@/pages/Dashboard';
import UserDetails from '@/pages/UserDetails';

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
          onBack={handleBack}
        />
      ) : (
        <Dashboard onUserClick={handleUserClick} />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default App;

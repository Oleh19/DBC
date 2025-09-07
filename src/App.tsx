import { useState } from 'react';

import type { Customer } from './api';
import { customers, orders } from './api';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';

function App() {
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);

  const handleUserClick = (user: Customer) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {selectedUser ? (
        <UserDetails
          user={selectedUser}
          orders={selectedUser.gender === 'Female' ? orders.slice(-30) : orders.slice(0, 30)}
          onBack={handleBack}
        />
      ) : (
        <Dashboard users={customers} onUserClick={handleUserClick} />
      )}
    </>
  );
}

export default App;

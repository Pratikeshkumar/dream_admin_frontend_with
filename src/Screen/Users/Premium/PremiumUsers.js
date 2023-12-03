import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar';

function PremiumUsers() {
  const allUserApis = require('../../../apis/users');
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUserApis.getAllPremiumUsers();
        setPremiumUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <IncludeSideBar>
      <div>
        <h1>Premium Users</h1>
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Account Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {premiumUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.account_type}</td>
                    <td>
                      <button onClick={() => openModal(user)}>Get Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showModal && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                }}
                onClick={closeModal}
              >
                <div
                  style={{
                    backgroundColor: '#fefefe',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    maxWidth: '600px',
                    width: '100%',
                    position: 'relative',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      fontSize: '24px',
                      cursor: 'pointer',
                    }}
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <h2>User Details</h2>
                  {selectedUser && (
                    <div>
                      <table
                        style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          marginTop: '15px',
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Attribute</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>ID</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.id}</td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Email</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.email}</td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Account Type</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.account_type}</td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Wallet</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.wallet} coins</td>
                          </tr>
                          {/* Add more rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </IncludeSideBar>
  );
}

export default PremiumUsers;

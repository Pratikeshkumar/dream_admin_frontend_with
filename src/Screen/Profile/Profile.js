import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';
import './Profile.css'; // Make sure to import the CSS file

function Profile() {
  const addmoneysuperadminApis = require('../../apis/super_admin_transaction');
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState(0);
  const [superadminDetails, setSuperadminDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const addMoneyToSuperadmin = async () => {
    try {
      setLoading(true);
      const response = await addmoneysuperadminApis.addMoneyToSuperAdmin({ amount });

      console.log('API response:', response);

      // Handle the response as needed, update UI, etc.

    } catch (error) {
      console.error('Error calling addMoneyToSuperAdmin API:', error);
      // Handle errors, show error message, etc.
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const SuperAdminDetails = async () => {
    try {
      setLoading(true);

      const response = await addmoneysuperadminApis.getWalletDetails();
      const details = response.data.employees;

      console.log(details); // Log the details for debugging

      // Update the state with superadmin details
      setSuperadminDetails(details);
      setAmount(0);
      setShowInput(false);
    } catch (error) {
      console.error('Error fetching superadmin details:', error);
    } finally {

      setLoading(false); // Hide loader
    }
  };

  useEffect(() => {
    SuperAdminDetails();
  }, []);

  return (
    <IncludeSideBar>
      <div className="profile-container">
        <h1>Welcome to Your Profile</h1>
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}

        <div className="superadmin-details">
          {superadminDetails &&
            superadminDetails.map((employee) => (
              <div key={employee.id} className="superadmin-card">

                <table>
                  <tbody>
                  {/* <tr>
                      <td><strong>ID:(receiver_id)</strong></td>
                      <td>4</td>
                    </tr> */}
                    <tr>
                   
                      <td><strong>Name:</strong></td>
                      <td>{employee.first_name} {employee.last_name}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>{employee.email}</td>
                    </tr>
                    <tr>
                      <td><strong>Role:</strong></td>
                      <td>{employee.role}</td>
                    </tr>
                    <tr>
                      <td><strong>Gender:</strong></td>
                      <td>{employee.gender || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td><strong>Mob No:</strong></td>
                      <td>{employee.phone_number || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td><strong>Wallet Money:</strong></td>
                      <td>{employee.wallet}</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            ))}
        </div>
        {showInput ? (
          <div className="money-section">
            <div className="input-container">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <button className="confirm-button" onClick={addMoneyToSuperadmin}>
                Confirm
              </button>
              <button className="cancel-button" onClick={() => setShowInput(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            style={{ background: 'linear-gradient(to bottom right, #ff7e5f, #feb47b)', marginTop: "3%" }}
            onClick={() => setShowInput(true)}>
            Add Money
          </button>

        )}
      </div>
    </IncludeSideBar>
  );
}

export default Profile;

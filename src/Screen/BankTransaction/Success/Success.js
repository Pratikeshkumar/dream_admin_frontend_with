import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar';

function Success() {

  const getAllTransactionApis = require('../../../apis/transaction')
  const [successTransactions, setSuccessTransactions] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await getAllTransactionApis.getAllTransaction();
        console.log(response.data.transaction, "response");

        // Assuming response.data.transaction contains an array of success transactions
        setSuccessTransactions(response.data.transaction);
      } catch (error) {
        console.error("Error fetching success transactions:", error);
      }
    };

    getTransaction();
  }, []);

  return (
   
      <div>
        <h2>Success Transaction Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account ID</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              <th>Account Status</th>
              {/* Add more headers based on available fields */}
            </tr>
          </thead>
          <tbody>
            {successTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{transaction.account_id}</td>
                <td>{transaction.account_status}</td>
                {/* Add more table data cells for other fields */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default Success;

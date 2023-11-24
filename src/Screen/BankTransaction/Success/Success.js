import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar';

function Success() {

  const getAllTransactionApis = require('../../../apis/transaction')
  const [successTransactions, setSuccessTransactions] = useState([]);
  

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await getAllTransactionApis.getAllTransaction();
        console.log(response.data.transactions, "response");

        // Assuming response.data.transaction contains an array of success transactions
        setSuccessTransactions(response.data.transactions);
 

      } catch (error) {
        console.error("Error fetching success transactions:", error);
      }
    };

    getTransaction();
  }, []);

  return (
    <IncludeSideBar>
      <div>
        <h2>Success Transaction Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account ID</th>
              <th>User_id</th>
              <th>Name</th>
              <th>Account Status</th>
              <th>Account value</th>
              <th>Account Country_code</th>
              <th>Account dimanond_value</th>
              <th>Username</th>
              <th>Email</th>

             
              
              {/* Add more headers based on available fields */}
            </tr>
          </thead>
          <tbody>
            {successTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{transaction.account_id}</td>
                <td>{transaction.user_id}</td>
                <td>{transaction.first_name} {transaction.last_name}</td>
                <td>{transaction.account_status}</td>
                <td>{transaction.amount_value}</td>
                <td>{transaction.country_code}</td>
                <td>{transaction.dimanond_value}</td>
                <td>{transaction.user.username}</td>
                <td>{transaction.user.email}</td>


                
                
              
                 </tr>
            ))}
          </tbody>
        </table>
      </div>
      </IncludeSideBar>
  );
}

export default Success;

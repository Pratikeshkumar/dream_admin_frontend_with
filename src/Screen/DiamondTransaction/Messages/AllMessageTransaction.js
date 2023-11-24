import React, { useEffect, useState } from 'react';
// Assuming you're importing the function that fetches MessageSubscription transactions
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'

function AllMessageTransaction() {
  const getMessageSubscription = require('../../../apis/diamond_transaction')
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getMessageSubscription.getMessageSubscriptionTransaction();
        console.log(response)
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching MessageSubscription transactions:", error);
      }
    };

    fetchTransactions();
  }, []);



  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust toLocaleString parameters for custom formatting
  };


  return (
    <IncludeSideBar>
      <div>
        <h2>All MessageSubscription Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Created At</th>
              <th>Expires</th>
              <th>Allowed Messages</th>
              <th>Diamonds</th>
              <th>Receiver ID/E-mail/Username</th>
              <th>Sender ID/E-mail/Username</th>
              {/* Add additional headers for more properties if needed */}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{formatCreatedAt(transaction.createdAt)}</td>
                <td>{transaction.expire ? 'Yes' : 'No'}</td>
                <td>{transaction.no_of_allowed_messages}</td>
                <td>{transaction.no_of_diamond}</td>
                <td>{transaction.reciever_id}--{transaction.receiver.email}--{transaction.receiver.username}</td>
                <td>{transaction.sender_id}--{transaction.sender.email}--{transaction.sender.username}</td>
                {/* Add additional table data for more properties if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </IncludeSideBar>
  );
}

export default AllMessageTransaction;

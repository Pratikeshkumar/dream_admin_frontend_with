import React, { useState, useEffect } from 'react';
// Assuming getRoseTransaction is the function that fetches the transaction data
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'

const getCommentRoseApis = require('../../../apis/diamond_transaction')

function AllRoseTransaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getCommentRoseApis.getRoseTransaction();
        setTransactions(response.data.transaction);
      } catch (error) {
        console.error("Error fetching transactions:", error);
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
      <h2>All Rose Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Created At</th>
            <th>Video ID</th>
            <th>Comment ID</th>
            <th>Receiver ID</th>
            <th>Sender ID</th>
            <th>Diamonds</th>
            {/* Add additional headers for more properties if needed */}
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{formatCreatedAt(transaction.createdAt)}</td>
              <td>{transaction.video_id}</td>
              <td>{transaction.comment_id}</td>
              <td>{transaction.reciever_id}</td>
              <td>{transaction.sender_id}</td>
              <td>{transaction.diamonds}</td>
              {/* Add additional table data for more properties if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </IncludeSideBar>
  );
}

export default AllRoseTransaction;

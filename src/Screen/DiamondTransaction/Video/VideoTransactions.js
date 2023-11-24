import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar';
// Import the function that fetches the Diamond Transaction data

function VideoTransactions() {
  const getVideoGift = require('../../../apis/diamond_transaction')
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getVideoGift.getVideoGiftTransaction();
        console.log(response); // Check the structure of the response

        // Assuming response is an array of transactions
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching Diamond Transactions:", error);
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
        <h2>Diamond Transactions in Videos</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Created At</th>

              <th>Sender ID/E-mail/Username</th>
              <th>Receiver ID/E-mail/Username</th>
              <th>Video ID</th>
              <th>Diamonds</th>

              {/* Add additional headers for more properties if needed */}
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{formatCreatedAt(transaction.createdAt)}</td>

                <td>{transaction.sender_id}--{transaction.sender.email}--{transaction.sender.username}</td>
                <td>{transaction.reciever_id}--{transaction.receiver.email}--{transaction.receiver.username}</td>
                <td>{transaction.video_id}</td>
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

export default VideoTransactions;

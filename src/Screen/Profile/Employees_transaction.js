import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';
import axios from 'axios';

function MyTransaction() {
  const getSuperAdminTransactionApis = require('../../apis/super_admin_transaction');

  const [adminTransactions, setAdminTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10); 

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  const getAdminTransactionDetails = async (page) => {
    try {

      const response = await getSuperAdminTransactionApis.getadmin_transaction(page);
      
       console.log(response)
      setAdminTransactions(response.data.admins);
      setTotalPages(response.data.totalPages);
      setPageSize(response.data.pageSize);
    } catch (error) {
      console.error("Error fetching admin transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getAdminTransactionDetails(currentPage);
  }, [currentPage]);

  return (
    <IncludeSideBar>
      <div style={{padding:"5%"}}>
        <h2 style={{marginBottom:"2%"}}>All Employees Transactions</h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Timestamp</th>
                  {/* <th>Sender_id</th> */}
                  <th>Receiver_id</th>
                  <th>Transaction_id</th>

                  {/* Add other headers as needed */}
                </tr>
              </thead>
              <tbody>
                {adminTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{transaction.diamond_value}</td>
                    <td>{transaction.diamond_debited ? 'Debit' : 'Credit'}</td>
                    <td>{formatDate(transaction.timestamp)}</td>
                    {/* <td>{transaction.sender_id}</td> */}
                    <td>{transaction.receiver_id}</td>
                    <td>{transaction.transaction_id}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div style={{marginTop:"3%"}}>
              <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                Previous Page
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </IncludeSideBar>
  );
}

export default MyTransaction;

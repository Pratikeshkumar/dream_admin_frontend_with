// MyTransaction.jsx
import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';
import './My_transaction.css'; // Import the CSS file

const MyTransaction = () => {
  const getSuperAdminTransactionApis = require('../../apis/super_admin_transaction');

  const [superAdminTransactions, setSuperAdminTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };

  const getSuperAdminTransactionDetails = async (page) => {
    try {
      const response = await getSuperAdminTransactionApis.getSuper_admin_transaction(page);
      console.log(response, "responsefromfrontend");

      setSuperAdminTransactions(response.data.superadmins);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching super admin transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getSuperAdminTransactionDetails(currentPage);
  }, [currentPage]);

  return (
    <IncludeSideBar>
      <div className="my-transaction-container">
        <h2 className="transaction-header">My Transactions</h2>

        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Timestamp</th>
                  <th>Receiver_id</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {superAdminTransactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td>{index + 1}</td>
                    <td>{transaction.diamond_value}</td>
                    <td>{transaction.diamond_debited ? 'Debit' : 'Credit'}</td>
                    <td>{formatDate(transaction.timestamp)}</td>
                    <td>{transaction.receiver_id}</td>
                    <td>{transaction.transaction_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            <div className="pagination-container">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="pagination-button"
              >
                Previous Page
              </button>
              <span>{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-button"
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </IncludeSideBar>
  );
};

export default MyTransaction;

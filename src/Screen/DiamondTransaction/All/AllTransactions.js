import React, { useEffect } from 'react'
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'


function AllTransactions() {
  const getAllTransactionApis = require('../../../apis/transaction')
  const getTransaction = async () => {

    try {
      const response = await getAllTransactionApis.getAllTransaction();
      console.log(response, "response")
    } catch (error) {
      console.error("Error fetching hobbies:", error);

    }
  };
  useEffect(() => {
    getTransaction()
  }, [])
  return (
    <IncludeSideBar>
      <div>
        <p>
          Here we are displaying the All diamond transactions
        </p>
      </div>
    </IncludeSideBar>

  )
}

export default AllTransactions
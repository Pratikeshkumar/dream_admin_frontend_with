import React,{useEffect} from 'react'



function AllTransactions() {
  const getAllTransactionApis = require('../../../apis/transaction')
    const getTransaction = async () => {
       
        try {
          const response = await getAllTransactionApis.getAllTransaction();
          console.log(response,"response")
        } catch (error) {
          console.error("Error fetching hobbies:", error);
          
        } 
      };
      useEffect(()=>{
        getTransaction()
      },[])
    return (
     
            <div>
                <p>
                    Here we are displaying the All diamond transactions
                </p>
            </div>
        
    )
}

export default AllTransactions
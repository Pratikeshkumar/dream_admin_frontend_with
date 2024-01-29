import React, { useEffect, useState } from 'react'
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar'


function WithdrawelRequest() {

  const allwithdrawmoneyrequest = require('../../apis/withdraw_money_request')
  const [withdrawmoneydata, setwithdrawmoneydata] = useState([])
  const getwithdrawmoneydata = async () => {
    try {
      const response = await allwithdrawmoneyrequest.getwithdrawmoneyrequest()
      // console.log(response, 'getwithdrawmoneydatagetwithdrawmoneydata')
      setwithdrawmoneydata(response)

    } catch (error) {
      console.log("Error fetching During withdraw money")
    }
  }

  useEffect(() => {
    getwithdrawmoneydata()
  }, [])


  //withdraw money  for approval function
  const handleApproval=async()=>{

  }
  return (
    <IncludeSideBar>
      <div>
        <h2>WithDraw money request Details</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Paypal Account ID </th>
              <th>Stripe Account ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>




              {/* Add more headers based on available fields */}
            </tr>
          </thead>
          <tbody>

            {
              withdrawmoneydata.map((withdrawdata, index)=>(
            <tr key={index}>
              <td>{withdrawdata.id}</td>
              <td>{withdrawdata.user_id}</td>
              <td>{withdrawdata.paypal_account_id}</td>
              <td>{withdrawdata.stripe_account_id}</td>
              <td>{withdrawdata.amount}</td>
              <td>{withdrawdata.status}</td>
              <td> 

                <button onClick={()=>{handleApproval(withdrawdata.id)}}>Approve</button>
              </td>

            </tr>
            ))
            }
          </tbody>
        </table>
        <div style={{ display: 'flex', marginLeft:'30%',marginTop:'20px' }} className="pagination">
  <button  style={{  backgroundColor:'red'}}>Previous</button>

          
          <button  style={{ marginLeft:'2%', backgroundColor:'green'}}>Next</button>
        </div>

      </div>
    </IncludeSideBar>
  )
}

export default WithdrawelRequest
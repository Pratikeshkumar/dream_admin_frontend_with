import React,{useEffect} from 'react'
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar'


function WithdrawelRequest() {
  const allUserPost = require('../../apis/users')

  const getAllUserPost = async () => {
    try {
      const response = await allUserPost.getAllUsersPost();
      console.log(response, "response for Post from frontend")
      
    } catch (error) {
      console.error("Error fetching eemployees:", error);
    }
  };
  useEffect(() => {
    getAllUserPost();
  }, []);


  return (
    <IncludeSideBar>
        <div>
            <p>
                Here we are displaying the sections of withdrawle request.
            </p>
        </div>
    </IncludeSideBar>
  )
}

export default WithdrawelRequest
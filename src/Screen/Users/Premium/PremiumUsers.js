import React,{useEffect} from 'react'
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'


function PremiumUsers() {

  const allUserApis = require("../../../apis/users");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUserApis.getAllPremiumUsers();
        console.log(response,"responsepremium")
        
      } catch (error) {
        console.error("Error fetching users:", error);
        
      }
    };

    fetchUsers();
  }, []);
  return (
    <IncludeSideBar>
        <div>
            <p>
                Here we are displaying the premium User Details
            </p>
        </div>
    </IncludeSideBar>
  )
}

export default PremiumUsers
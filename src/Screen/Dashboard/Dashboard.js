import React,{useEffect} from 'react'
import InludeSideBar from '../../Components/Sidebar/IncludeSideBar'

const Dashboard = () => {
  const userApis = require("../../apis/dashboard");

  // const getUsers = async () => {
  //   try {
  //     const response = await userApis.userDasboard();
  //     console.log(response,"response")
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } 
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const getVideos = async () => {
  //   try {
  //     const response = await userApis.userDasboard();
  //     console.log(response,"response")
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } 
  // };
  // useEffect(() => {
  //   getVideos();
  // }, []);



  return (
    <InludeSideBar>
      <div>
        <p>
          DashBoard
        </p>
      </div>
    </InludeSideBar>
  )
}

export default Dashboard
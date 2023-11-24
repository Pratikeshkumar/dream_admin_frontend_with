import React, { useEffect, useState } from 'react';
import InludeSideBar from '../../Components/Sidebar/IncludeSideBar';
import './Dashboard.css'

const Dashboard = () => {
  const userApis = require("../../apis/dashboard");
  const [userData, setUserData] = useState({
    totalUsers: null,
    totalActiveUsers: null,
    totalInactiveUsers: null,
    totalBasicUsers: null,
    totalPremiumUsers: null,
    totalBusinessUsers: null,
  });

  const [videosData, setVideosData] = useState({
    topVideosByDiamonds: [],
    topVideosByLikes: [],
    topVideosByShare: [],
    videoCount: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState('topVideosByDiamonds');

  const getUsers = async () => {
    try {
      const response = await userApis.userDasboard();
      setUserData({
        totalUsers: response.data.totalUsers,
        totalActiveUsers: response.data.totalActiveUsers,
        totalInactiveUsers: response.data.totalInactiveUsers,
        totalBasicUsers: response.data.totalBasicUsers,
        totalPremiumUsers: response.data.totalPremiumUsers,
        totalBusinessUsers: response.data.totalBusinessUsers,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getVideos = async () => {
    try {
      const response = await userApis.getVideos();
      setVideosData(response);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <InludeSideBar>
      <div className="dashboard-container">
        <div className="user-data-box">
          <h4>Total Users</h4>
          <div className="data">
            <p>{userData.totalUsers !== null ? userData.totalUsers : "Loading..."}</p>
          </div>
        </div>
        <div className="user-data-box">
          <h4>Active Users</h4>
          <div className="data">
            <p>{userData.totalActiveUsers !== null ? userData.totalActiveUsers : "Loading..."}</p>
          </div>
        </div>
        <div className="user-data-box">
          <h4>Inactive Users</h4>
          <div className="data">
            <p>{userData.totalInactiveUsers !== null ? userData.totalInactiveUsers : "Loading..."}</p>
          </div>
        </div>
        <div className="user-data-box">
          <h4>Basic Users</h4>
          <div className="data">
            <p>{userData.totalBasicUsers !== null ? userData.totalBasicUsers : "Loading..."}</p>
          </div>
        </div>
        <div className="user-data-box">
          <h4>Premium Users</h4>
          <div className="data">
            <p>{userData.totalPremiumUsers !== null ? userData.totalPremiumUsers : "Loading..."}</p>
          </div>
        </div>
        <div className="user-data-box">
          <h4>Business Users</h4>
          <div className="data">
            <p>{userData.totalBusinessUsers !== null ? userData.totalBusinessUsers : "Loading..."}</p>
          </div>
        </div>
      </div>

      <div className="video-statistics">
        <h4>Total Video: {videosData.videoCount}</h4>
        <h4>Video Statistics</h4>
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="topVideosByDiamonds">Top Videos by Diamonds</option>
          <option value="topVideosByLikes">Top Videos by Likes</option>
          <option value="topVideosByShare">Top Videos by Share</option>
        </select>

        {videosData[selectedCategory] && videosData[selectedCategory].length > 0 ? (
          <table className="video-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Video_Id</th>
                <th>Profile Picture</th>
                <th>Likes</th>
                <th>Diamonds</th>
                <th>Shared</th>
              </tr>
            </thead>
            <tbody>
              {videosData[selectedCategory].map((video, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`https://dpcst9y3un003.cloudfront.net/${video.thum}`}
                      alt="Thumbnail"
                      className="thumbnail"
                    />
                  </td>
                  <td>
                    <h3>  {video.id}</h3>
                  </td>
                  <td>
                    <img
                      src={video.profile_pic}
                      className="profile-picture"
                      alt="Profile"
                    />
                  </td>
                  <td>{video.like}</td>
                  <td>{video.diamond_value}</td>
                  <td>{video.shared}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No videos available for this category</p>
        )}
      </div>
    </InludeSideBar>
  );
};

export default Dashboard;

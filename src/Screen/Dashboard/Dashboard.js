import React, { useEffect, useState } from 'react'
import InludeSideBar from '../../Components/Sidebar/IncludeSideBar'

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
  console.log(selectedCategory, "selected")



  const getUsers = async () => {
    try {
      const response = await userApis.userDasboard();
      console.log(response)

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
      console.log(response, "responseVideo")
    } catch (error) {
      console.error("Error fetching users:", error);
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

      <div style={styles.container}>
        <div style={styles.box}>
          <h4>Total Users</h4>
          <div style={styles.data}>
            <p>{userData.totalUsers !== null ? userData.totalUsers : "Loading..."}</p>
          </div>
        </div>
        <div style={styles.box}>
          <h4>Active Users</h4>
          <div style={styles.data}>
            <p>{userData.totalActiveUsers !== null ? userData.totalActiveUsers : "Loading..."}</p>
          </div>
        </div>
        <div style={styles.box}>
          <h4>Inactive Users</h4>
          <div style={styles.data}>
            <p>{userData.totalInactiveUsers !== null ? userData.totalInactiveUsers : "Loading..."}</p>
          </div>
        </div>
        <div style={styles.box}>
          <h4>Basic Users</h4>
          <div style={styles.data}>
            <p>{userData.totalBasicUsers !== null ? userData.totalBasicUsers : "Loading..."}</p>
          </div>
        </div>
        <div style={styles.box}>
          <h4>Premium Users</h4>
          <div style={styles.data}>
            <p>{userData.totalPremiumUsers !== null ? userData.totalPremiumUsers : "Loading..."}</p>
          </div>
        </div>
        <div style={styles.box}>
          <h4>Business Users</h4>
          <div style={styles.data}>
            <p>{userData.totalBusinessUsers !== null ? userData.totalBusinessUsers : "Loading..."}</p>
          </div>
        </div>
      </div>

      <div style={videoStatisticsStyle}>
        <p style={pStyle}>Total Video : {videosData.videoCount}</p>
        <h4 style={h2Style}>Video Statistics</h4>
        <select style={selectStyle} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="topVideosByDiamonds">Top Videos by Diamonds</option>
          <option value="topVideosByLikes">Top Videos by Likes</option>
          <option value="topVideosByShare">Top Videos by Share</option>
        </select>

        {videosData[selectedCategory] && videosData[selectedCategory].length > 0 ? (
          videosData[selectedCategory].map((video, index) => (

            <div style={videoInfoStyle} key={index}>
  <table style={{ width: '100%' }}>
    <tbody>
      <tr>
        <td style={{ width: '70%', verticalAlign: 'top' }}>
          <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Video Title: {video.id}</p>
          <img
            src={`https://dpcst9y3un003.cloudfront.net/${video.thum}`}
            alt="Thumbnail"
            style={{ cursor: 'pointer', width: '100px', height: 'auto', marginBottom: '10px' }}
          />
        </td>
        <td style={{ verticalAlign: 'top', textAlign: 'left' }}>
          <img
            src={video.profile_pic}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              marginBottom: '10px',
            }}
          />
          <div>
            <table style={{ fontSize: '14px' }}>
              <tbody>
                <tr>
                  <td>Likes:</td>
                  <td>{video.like}</td>
                </tr>
                <tr>
                  <td>Diamonds:</td>
                  <td>{video.diamond_value}</td>
                </tr>
                <tr>
                  <td>Shared:</td>
                  <td>{video.shared}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

          ))
        ) : (
          <p>No videos available for this category</p>
        )}
      </div>


    </InludeSideBar>
  )
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  box: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '200px',
    margin: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  data: {
    fontSize: '22px',
    fontWeight: 'bold',
  },


};
const videoStatisticsStyle = {
  padding: '20px',
  marginTop: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
};

const h2Style = {
  marginBottom: '10px',
  fontSize: '24px',
};

const selectStyle = {
  padding: '8px',
  marginBottom: '10px',
  fontSize: '16px',
};

const pStyle = {
  fontSize: '18px',
  marginBottom: '10px',
};

const videoInfoStyle = {
  border: '1px solid #ddd',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
};



export default Dashboard
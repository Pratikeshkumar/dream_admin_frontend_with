import React, { useEffect, useState } from "react";
import VideoModal from './VideoModal';
import './AllUser.css'

const AllUser = () => {
  const allUserApis = require("../../../apis/users");
  
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [videoData, setVideoData] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [interactionData, setInteractionData] = useState([]);
  const [interactionTime1Day, setInteractionTime1Day] = useState(0);
  const [interactionTime15Days, setInteractionTime15Days] = useState(0);
  const [interactionTime1Month, setInteractionTime1Month] = useState(0);
  const [interactionTime3Month, setInteractionTime3Month] = useState(0);
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false);



  const getUsers = async (page, searchTerm = '') => {
    try {
      setLoading(true);
      const response = await allUserApis.getAllUsers(page, searchTerm);
      setUserData(response.users);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Hide loader after data retrieval (success or failure)
    }
  };

  useEffect(() => {
    getUsers(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      // setCurrentPage((prevPage) => prevPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      // setCurrentPage((prevPage) => prevPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewVideo = async (userId) => {
    try {
      setLoading(true); // Set loading to true when starting the request

      const response = await allUserApis.getUserVideos(userId);
      setVideoData(response);
      setShowVideoModal(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Set loading to false when request completes (success or error)
    }
  };


  const handleUsage = (userId) => {
    const user = userData.find((user) => user.id === userId);
    if (user && user.user_interactions) {
      const currentTime = new Date();
      setInteractionData(user.user_interactions);
      const interactionTimes = calculateInteractionTimes(user.user_interactions, currentTime);
      setInteractionTime1Day(interactionTimes.interactionTime1Day);
      setInteractionTime15Days(interactionTimes.interactionTime15Days);
      setInteractionTime1Month(interactionTimes.interactionTime1Month);
      setInteractionTime3Month(interactionTimes.interactionTime3Month);

    }
    const element = document.getElementById('user-interaction-details');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate interaction times for different durations
  const calculateInteractionTimes = (interactionData, currentTime) => {
    const oneDayAgo = new Date(currentTime);
    oneDayAgo.setDate(currentTime.getDate() - 1);
    const fifteenDaysAgo = new Date(currentTime);
    fifteenDaysAgo.setDate(currentTime.getDate() - 15);
    const oneMonthAgo = new Date(currentTime);
    oneMonthAgo.setMonth(currentTime.getMonth() - 1);
    const threeMonthsAgo = new Date(currentTime);
    threeMonthsAgo.setMonth(currentTime.getMonth() - 3);

    const interactionTime1Day = calculateInteractionTime(interactionData, oneDayAgo);
    const interactionTime15Days = calculateInteractionTime(interactionData, fifteenDaysAgo);
    const interactionTime1Month = calculateInteractionTime(interactionData, oneMonthAgo);
    const interactionTime3Month = calculateInteractionTime(interactionData, threeMonthsAgo);


    return {
      interactionTime1Day,
      interactionTime15Days,
      interactionTime1Month,
      interactionTime3Month
    };
  };

  // Calculate total interaction time in human-readable format
  const calculateInteractionTime = (interactionData, startDate) => {
    const interactionsWithinRange = interactionData.filter((interaction) => {
      const interactionStart = new Date(interaction.interaction_start);
      return interactionStart >= startDate;
    });

    const totalInteractionTimeInMilliseconds = interactionsWithinRange.reduce(
      (total, interaction) => total + interaction.interacted_time,
      0
    );

    const totalSeconds = Math.floor(totalInteractionTimeInMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  // function for handling the active user to unactive 

  const handleBlockUser = async (userId) => {
    // Ask for confirmation before blocking the user
    const confirmed = window.confirm("Are you sure you want to block this user?");
  
    if (confirmed) {
      const updatedUserData = userData.map(user => {
        if (user.id === userId && user.active === 1) {
          return { ...user, active: 0 };
        }
        return user;
      });
  
      // Update local state with the updated user data
      setUserData(updatedUserData);
  
      try {
        const response = await allUserApis.updateResourceActiveStatus(userId, 0);
        console.log('User status updated successfully:', response);
        // Perform any necessary action after a successful update on the server
      } catch (error) {
        console.error('Error updating user status:', error);
       
      }
    } else {
    
      console.log('Block action canceled by the user.');
      return;
    }
  };
  







  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setVideoData(null);
  };

  const updateVideoData = (updatedData) => {
    setVideoData(updatedData);
  };



  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'
};

  const tdEmailStyle = {
    ...tdStyle,
    width: '150px', // Set the desired width for the email cell
};






  return (
    <div>




      <p>hello from user</p>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}


      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile Pic</th>
            <th>Username</th>
            <th>Account Type</th>
            <th>Nickname</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img
                  //   src={`https://dpcst9y3un003.cloudfront.net/${user.profile_pic}`}
                  src={user.profile_pic}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "20%",
                  }}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.account_type}</td>
              <td>{user.nickname}</td>
              <td style={tdEmailStyle}>{user.email}</td>
              <td>{user.gender}</td>
              <td>
                {user.active === 0 ? "Blocked" : (
                 <div style={{ display: 'flex', gap: '10px' }}>
                 <button onClick={() => handleViewVideo(user.id)}>View Video</button>
                 <button onClick={() => handleUsage(user.id)}>Usage</button>
                 <button onClick={() => handleBlockUser(user.id)}>Block User</button>
               </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <VideoModal
        showVideoModal={showVideoModal}
        handleCloseVideoModal={handleCloseVideoModal}
        videoData={videoData}
        setVideoData={updateVideoData}

      />
      {interactionData.length > 0 && (
        <div id="user-interaction-details">
          <h2>User Usage</h2>
          <table>
            <thead>
              <tr>
                <th>Time Range</th>
                <th>Interaction Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Last 1 Day</td>
                <td>{interactionTime1Day} seconds</td>
              </tr>
              <tr>
                <td>Last 15 Days</td>
                <td>{interactionTime15Days} seconds</td>
              </tr>
              <tr>
                <td>Last 1 Month</td>
                <td>{interactionTime1Month} seconds</td>
              </tr>
              <tr>
                <td>Last 3 Month</td>
                <td>{interactionTime3Month} seconds</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination">
        <button onClick={handlePrevious}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};


export default AllUser;

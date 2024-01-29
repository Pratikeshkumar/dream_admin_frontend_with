import React, { useEffect, useState } from "react";
import VideoModal from './VideoModal';
import PhotoModal from './PhotoModal';
import './AllUser.css'
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'
import useAuth from '../../../useAuth'


const AllUser = () => {
  const allUserApis = require("../../../apis/users");
  const { user } = useAuth()
  const role = user ? user.role : null;
  console.log(role, "roooolllee")
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
  const [photoData, setPhotoData] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [userid, setuserid] = useState(null)

  const [likedata, setlikedata] = useState([])
  const [commentdata, setcommentdata] = useState([])
  const [diamonddata, setdiamonddata] = useState([])
  const [sharedata, setsharedata] = useState([])
  const [interactionType, setInteractionType] = useState(null);
  const [senddiamonddata, setsenddiamonddata] = useState([])
  const [sendlikedata, setsendlikedata] = useState([])
  const [recivedcommentdata,setrecivedcommentdata]=useState([])
  const[recivesharedata,setrecivesharedata]=useState([])
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
      setLoading(true);

      const response = await allUserApis.getUserVideos(userId);
      setVideoData(response);
      setShowVideoModal(true);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPhoto = async (userId) => {
    try {
      setLoading(true);
      const response = await allUserApis.getAllUsersPost(userId);
      console.log(response, "responsefrom alluser")
      setPhotoData(response.photos);
      setShowPhotoModal(true);
    } catch (error) {
      console.error("Error fetching user photos:", error);
    } finally {
      setLoading(false);
    }
  };

console.log(photoData,'photoDataphotoData')
  const handleClosePhotoModal = () => {
    setShowPhotoModal(false);
    setPhotoData(null);

  };



  const handleUsage = (userId) => {
    const user = userData.find((user) => user.id === userId);
    setuserid(userId)
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

  const handleCloseUsageDetails = () => {
    // Scroll back to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Clear the interaction data and close the section
    setInteractionData([]);
    setInteractionTime1Day(0);
    setInteractionTime15Days(0);
    setInteractionTime1Month(0);
    setInteractionTime3Month(0);
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
        console.log('Calling updateResourceActiveStatus with role:', role);
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

  // const getlikedata = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await allUserApis.getlikeintraction(userid);
  //     setlikedata(response.payload)
  //   //  console.log(response.payload,'response')
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } finally {
  //     setLoading(false); // Hide loader after data retrieval (success or failure)
  //   }
  // };
  // const getcommentdata = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await allUserApis.getcommentintraction(userid);
  //     setcommentdata(response.payload)
  //   //  console.log(response.payload,'response')
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } finally {
  //     setLoading(false); // Hide loader after data retrieval (success or failure)
  //   }
  // };
  const fetchData = async (interactionType) => {
    try {
      setLoading(true);

      if (interactionType === 'like') {
        const response = await allUserApis.getlikeintraction(userid);
        setlikedata(response.payload);
        if (response.payload.ninty_days === 0) {
          alert('Like Data is not avialble')
        }
      } else if (interactionType === 'comment') {
        const response = await allUserApis.getcommentintraction(userid);
        setcommentdata(response.payload);
        if (response.payload.ninty_days === 0) {
          alert('Comment  Data is not avialble')
        }
      } else if (interactionType === 'Diamond') {
        const response = await allUserApis.getdiamondintraction(userid)
        // console.log(response,'responsediamond')
        setdiamonddata(response.payload)
        if (response.payload.ninty_days === 0) {
          alert('Diamond Data is not avialble')
        }
      } else if (interactionType === 'Share') {
        const response = await allUserApis.getshareintraction(userid)
        // console.log(response,'responsegetshareintraction')
        setsharedata(response.payload)
        if (response.payload.ninty_days === 0) {
          // Show alert message when data is available
          alert('Share Data is not available!');
        }
      } else if (interactionType === 'Send Diamond') {
        const response = await allUserApis.getsenddiamond(userid)
        setsenddiamonddata(response.payload)
        if (response.payload.ninty_days === 0) {
          alert('Sended Diamond Data is not available')
        }
      } else if (interactionType === 'Send Like') {
        const response = await allUserApis.getsendlikeintraction(userid)
        setsendlikedata(response.payload)
        if (response.payload.ninty_days === 0) {
          alert('Sended like Data is not available')
        }
      }else if(interactionType==='recived comment'){
        const response=await allUserApis.getrecivedcommetintraction(userid)
        // console.log(response.payload,'recived comment')
        setrecivedcommentdata(response.payload)
        if(response.payload.ninty_days===0){
          alert('Comment Data is not available')
        }
      }else if (interactionType==='recive share'){
        const response=await allUserApis.getrecivedshare(userid)
        setrecivesharedata(response.payload)
        if(response.payload.ninty_days===0){
          alert('Recived share Data is Not available')
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interactionType) {
      fetchData(interactionType);
    }
  }, [interactionType]);


  return (
    <IncludeSideBar>
      <div>
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
                      <button onClick={() => handleViewPhoto(user.id)}>Photo</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => setInteractionType('like')}>Recived Like</button>
          <button onClick={() => setInteractionType('Send Like')}>Send Like</button>

          <button onClick={() => setInteractionType('comment')}> Reply Comment</button>
          <button onClick={()=>setInteractionType('recived comment')}>Recived Comment</button>
          <button onClick={() => setInteractionType('Diamond')}>Recived Diamond</button>
          <button onClick={() => setInteractionType('Send Diamond')}>Send Diamond</button>
          <button onClick={() => setInteractionType('Share')}>Send Share</button>
          <button onClick={()=>setInteractionType('recive share')}>Recived Share</button>
        </div>
        <VideoModal
          showVideoModal={showVideoModal}
          handleCloseVideoModal={handleCloseVideoModal}
          videoData={videoData}
          setVideoData={updateVideoData}

        />
        <PhotoModal
          showPhotoModal={showPhotoModal}
          handleClosePhotoModal={handleClosePhotoModal}
          photoData={photoData}
        />
        {interactionData.length > 0 && (
          <div id="user-interaction-details">
            <button onClick={handleCloseUsageDetails} style={{ float: 'right', marginBottom: '10px' }}>
              Close
            </button>

            <h2>User Usage</h2>
            {/* <div>
              <button onClick={getlikedata}>Like</button>
              <button> Comments</button>
              <button>Share</button>

              </div> */}
            <table>
              <thead>
                <tr>
                  <th>Time Range</th>
                  <th>Interaction Time</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Last 1 Day</td>
                  <td>{interactionTime1Day} seconds</td>
                </tr> */}
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


        {/* //like intraction data  */}


        {likedata.ninty_days > 0 && interactionType === 'like' && (
          <div id="user-interaction-details">
            <button onClick={handleCloseUsageDetails} style={{ float: 'right', marginBottom: '10px' }}>
              Close
            </button>

            <h2>User Usage</h2>
            {/* <div>
              <button onClick={getlikedata}>Like</button>
              <button> Comments</button>
              <button>Share</button>

              </div> */}
            <table>
              <thead>
                <tr>
                  <th>Time Range</th>
                  <th>Number Of Like During Interaction Time</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Last 1 Day</td>
                  <td>{interactionTime1Day} seconds</td>
                </tr> */}
                <tr>
                  <td>Last 15 Days</td>
                  <td>{likedata.fifteen_days} Like</td>
                </tr>
                <tr>
                  <td>Last 1 Month</td>
                  <td>{likedata.thirty_days} Like</td>
                </tr>
                <tr>
                  <td>Last 3 Month</td>
                  <td>{likedata.ninty_days} Like</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {
          sendlikedata.ninty_days > 0 && interactionType === 'Send Like' && (
            <div id="user-interaction-details">
              <button onClick={handleCloseUsageDetails} style={{ float: 'right', marginBottom: '10px' }}>
                Close
              </button>

              <h2>User Usages</h2>
              <table>
                <thead>
                  <th>Time Range</th>
                  <th>Number Of Send Like During Interaction Time</th>

                </thead>
                <tbody>
                <tr>
                  <td>Last 15 Days</td>
                  <td>{sendlikedata.fifteen_days} like Sended by User </td>
                </tr>
                <tr>
                  <td>Last 1 Month</td>
                  <td>{sendlikedata.thirty_days} like Sended by User</td>
                </tr>
                <tr>
                  <td>Last 3 Month</td>
                  <td>{sendlikedata.ninty_days} like Sended by User</td>
                </tr>

                </tbody>
              </table>
            </div>
          )
        }


        {commentdata.ninty_days > 0 && interactionType === 'comment' && (
          <div id="user-interaction-details">
            <button onClick={handleCloseUsageDetails} style={{ float: 'right', marginBottom: '10px' }}>
              Close
            </button>

            <h2>User Usage</h2>
            {/* <div>
              <button onClick={getlikedata}>Like</button>
              <button> Comments</button>
              <button>Share</button>

              </div> */}
            <table>
              <thead>
                <tr>
                  <th>Time Range</th>
                  <th>Number Of Comments During Interaction Time</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Last 1 Day</td>
                  <td>{interactionTime1Day} seconds</td>
                </tr> */}
                <tr>
                  <td>Last 15 Days</td>
                  <td>{commentdata.fifteen_days} Comments</td>
                </tr>
                <tr>
                  <td>Last 1 Month</td>
                  <td>{commentdata.thirty_days} Comments</td>
                </tr>
                <tr>
                  <td>Last 3 Month</td>
                  <td>{commentdata.ninty_days} Comments</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}


{
  recivedcommentdata.ninty_days > 0 && interactionType ==='recived comment' && (
    <div id="user-interaction-details">
            <h2>User Usage</h2>
            <table>
              <thead>
                <tr>
                  <th>Time Range</th>
                  <th>Number Of Recived Comment During Interaction Time</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Last 1 Day</td>
                  <td>{interactionTime1Day} seconds</td>
                </tr> */}
                <tr>
                  <td>Last 15 Days</td>
                  <td>{recivedcommentdata.fifteen_days} comment</td>
                </tr>
                <tr>
                  <td>Last 1 Month</td>
                  <td>{recivedcommentdata.thirty_days} comment</td>
                </tr>
                <tr>
                  <td>Last 3 Month</td>
                  <td>{recivedcommentdata.ninty_days} comment</td>
                </tr>
              </tbody>
            </table>
      </div>
  )
}

        {diamonddata.ninty_days > 0 && interactionType === 'Diamond' && (
          <div id="user-interaction-details">
            <h2>User Usage</h2>

            <table>
              <thead>
                <tr>
                  <th>Time Range</th>
                  <th>Number Of Diamond During Interaction Time</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Last 1 Day</td>
                  <td>{interactionTime1Day} seconds</td>
                </tr> */}
                <tr>
                  <td>Last 15 Days</td>
                  <td>{diamonddata.fifteen_days} Diamond</td>
                </tr>
                <tr>
                  <td>Last 1 Month</td>
                  <td>{diamonddata.thirty_days} Diamond</td>
                </tr>
                <tr>
                  <td>Last 3 Month</td>
                  <td>{diamonddata.ninty_days} Diamond</td>
                </tr>
              </tbody>
            </table>

          </div>
        )

        }{
          senddiamonddata.ninty_days > 0 && interactionType === 'Send Diamond' && (
            <div id="user-interaction-details">
              <h2>User Usage</h2>

              <table>
                <thead>
                  <tr>
                    <th>Time Range</th>
                    <th>Number Of Diamond During Interaction Time</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td>Last 15 Days</td>
                    <td>{senddiamonddata.fifteen_days} Sended Diamond</td>
                  </tr>
                  <tr>
                    <td>Last 1 Month</td>
                    <td>{senddiamonddata.thirty_days} Sended Diamond</td>
                  </tr>
                  <tr>
                    <td>Last 3 Month</td>
                    <td>{senddiamonddata.ninty_days}  Sended Diamond</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }
        {
          sharedata.ninty_days > 0 && interactionType === 'Share' && (
            <div id="user-interaction-details">
              <h2>User Usage</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time Range</th>
                    <th>Number Of Share During Interaction Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Last 15 Days</td>
                    <td>{sharedata.fifteen_days} Share</td>
                  </tr>
                  <tr>
                    <td>Last 1 Month</td>
                    <td>{sharedata.thirty_days} share</td>
                  </tr>
                  <tr>
                    <td>Last 3 Month</td>
                    <td>{sharedata.ninty_days} share</td>
                  </tr>

                </tbody>
              </table>
            </div>
          )
        }
        {
          recivesharedata.ninty_days > 0 && interactionType === 'recive share' && (
            <div id="user-interaction-details">
              <h2>User Usage</h2>
              <table>
                <thead>
                  <tr>
                    <th>Time Range</th>
                    <th>Number Of Recived Share During Interaction Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Last 15 Days</td>
                    <td>{recivesharedata.fifteen_days} Share</td>
                  </tr>
                  <tr>
                    <td>Last 1 Month</td>
                    <td>{recivesharedata.thirty_days} share</td>
                  </tr>
                  <tr>
                    <td>Last 3 Month</td>
                    <td>{recivesharedata.ninty_days} share</td>
                  </tr>

                </tbody>
              </table>

              </div>
          )
        }
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
    </IncludeSideBar>
  );
};


export default AllUser;

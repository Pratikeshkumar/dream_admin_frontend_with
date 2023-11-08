import React, { useEffect, useState } from 'react';
// Assuming allVideoApis is an instance of an API object
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'

function BlockedVideos() {
  const allVideoApis = require('../../../apis/all_user_video');
  const [blockedVideos, setBlockedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBlockedVideo = async () => {
    try {
      const response = await allVideoApis.getBlockedUserVideo();
      console.log(response.data); // Check the response structure and ensure it's an array of objects

      setBlockedVideos(response.data); // Store the fetched data in state
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching Blocked Videos:", error);
      setLoading(false); // Handle loading state on error as well
    }
  };

  useEffect(() => {
    getAllBlockedVideo();
  }, []);


  
    const handleUnblock = async (videoId) => {
      try {
          // Make an API call to update the status of the video to unblocked
          await allVideoApis.updateBlockedVideoStatus(videoId, { blocked: false });
          
          // Update the state to reflect the change in the UI
          const updatedVideos = blockedVideos.map(video => {
              if (video.id === videoId) {
                  return { ...video, blocked: false };
              }
              return video;
          });
          setBlockedVideos(updatedVideos);
          getAllBlockedVideo();
      } catch (error) {
          console.error(`Error unblocking video with ID ${videoId}:`, error);
      }
  };
  



  return (
    <IncludeSideBar> 
    <div>
      <p>Here we are displaying the Blocked videos details</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER_ID</th>
              <th>VIDEO</th>
              <th>USERNAME</th>

              <th>Action</th>
              {/* Add more table headers for other video attributes */}
            </tr>
          </thead>
          <tbody>
            {blockedVideos.map((video, index) => (
              <tr key={index}>
                <td>{video.id}</td>
                <td>{video.user_id}</td>

                <td> <img
                  src={`https://dpcst9y3un003.cloudfront.net/${video.thum}`}
                  alt="Thumbnail"

                  style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                /></td>
                <td><img
                      //   src={`https://dpcst9y3un003.cloudfront.net/${user.profile_pic}`}
                      src={video.profile_pic}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "20%",
                      }}
                    /></td>
                <td>
                  <button onClick={() => handleUnblock(video.id)}>
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </IncludeSideBar>
  );
}

export default BlockedVideos;

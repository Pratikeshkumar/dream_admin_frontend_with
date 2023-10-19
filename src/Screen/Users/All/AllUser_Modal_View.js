// Modal.js
import React, { useEffect, useState, useRef } from "react";
import "./AllUser_Modal_View.css";

function Modal({ isOpen, onClose, user }) {
  const allUserVideoApis = require("../../../apis/all_user_video");
  // New state for admin-controlled like count
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const videoDetailsRef = useRef(null);
  console.log(selectedVideo, "SEEEEJJJJJJJJJJJJJJJJJ");

  if (!isOpen) return null;
  const videosPerPage = 9;

  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const videosToDisplay = user.videos.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < user.videos.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scrollToVideoDetails = () => {
    if (videoDetailsRef.current) {
      videoDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const closeVideoDetails = () => {
    setSelectedVideo(null);
    if (videoDetailsRef.current) {
      videoDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Function to handle video deletion
  const handleDelete = async (id) => {
    try {
      await allUserVideoApis.deleteVideos(id);
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="scrollable-modal-content">
          <p className="user-details-title">
            <img
              //   src={`https://dpcst9y3un003.cloudfront.net/${user.profile_pic}`}
              src={user.profile_pic}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}
            />
          </p>
          <p className="user-detail">Username: {user.username}</p>
          <p className="user-detail">ID: {user.id}</p>

          {/* Display other user details as needed */}

          {/* Display the user's videos */}
          <h3 className="videos-title">User's Videos</h3>
          <div className="video-card-container">
            {videosToDisplay.map((video) => (
              <div key={video.id} className="video-card">
                <video controls width="400">
                  <source
                    src={`https://dpcst9y3un003.cloudfront.net/${video.video}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={() => {
                    setSelectedVideo(video); // Set the selected video when the button is clicked
                    scrollToVideoDetails();
                  }}
                >
                  Details
                </button>
                <button
                  style={{ marginLeft: "2%", backgroundColor: "red" }}
                  onClick={() => handleDelete(selectedVideo.id)}
                >
                  Delete video
                </button>
              </div>
            ))}
          </div>
          {selectedVideo && (
            <div className="video-details" ref={videoDetailsRef}>
              <button className="close-button" onClick={closeVideoDetails}>
                Close
              </button>
              <h2>Video Details</h2>
              <table>
                <tbody>
                  <tr>
                    <td>ID:</td>
                    <td>{selectedVideo.id}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{selectedVideo.description}</td>
                  </tr>
                  <tr>
                    <td>Diamond Value:</td>
                    <td>{selectedVideo.diamond_value}</td>
                  </tr>

                  <tr>
                    <td>Privacy Type:</td>
                    <td>{selectedVideo.privacy_type}</td>
                  </tr>
                  <tr>
                    <td>Like:</td>
                    <td>{selectedVideo.like}</td>
                    <td>
                      <button>edit like </button>
                    </td>
                  </tr>

                  <tr>
                    <td>comment:</td>
                    <td>{selectedVideo.comment}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination buttons */}
          <div className="pagination-buttons">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= user.videos.length}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;

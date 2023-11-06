import React, { useEffect, useState } from 'react';

// Loader component
function Loader() {
  return (
    <div className="loader">
     
    </div>
  );
}

function AllVideos() {
  const allVideoApis = require('../../../apis/all_user_video');
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(10); // Number of videos to display per page
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnailClicked, setThumbnailClicked] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Inside the useEffect, set loading to true before fetching data
    setLoading(true);
    getAllVideo();
  }, []);

  const getAllVideo = async () => {
    try {
      const response = await allVideoApis.getAllUserVideo();
      console.log(response)
      setVideos(response.videos);
      // After data is fetched, set loading to false
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AllVideos:", error);
      setLoading(false); // Handle loading state on error as well
    }
  };

  // Calculate the index range for the videos to display on the current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedVideo(null); // Clear selected video when changing pages
  };

  // Function to show the video when a user clicks on the thumbnail
  const showVideo = (video) => {
    setSelectedVideo(video);
    setThumbnailClicked(true);
  };

  // Function to go back to the video list
  const closeVideo = () => {
    setSelectedVideo(null);
    setThumbnailClicked(false);
  };

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(videos.length / videosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalVideos = videos.length;
  const lastPage = Math.ceil(totalVideos / videosPerPage);

  const visiblePages = 5; // Number of page links to show
  const pages = Array.from({ length: lastPage }, (_, index) => index + 1);
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(lastPage, startPage + visiblePages - 1);

  const renderPageLinks = pages
    .filter((page) => page >= startPage && page <= endPage)
    .map((page) => (
      <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
        <button onClick={() => paginate(page)} className="page-link">
          {page}
        </button>
      </li>
    ));

  return (
    <div>
      <h2>All Videos</h2>
      {loading ? ( // Conditional rendering based on the loading state
        <Loader /> // Display the loader while loading
      ) : selectedVideo ? (
        // Show the selected video
        <div>
          <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Video Details</h3>
          <img
            src={`https://dpcst9y3un003.cloudfront.net/${selectedVideo.user.profile_pic}`}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              marginBottom: '10px',
              marginLeft: '48%',
            }}
          />
           <p style={{ marginBottom: '10px' }}>
            <strong>User ID:</strong> {selectedVideo.user.id}
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Comments:</strong> {selectedVideo.comments.length}
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>Views:</strong> {selectedVideo.viewCount}
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>User Name:</strong> {selectedVideo.user.nickname}
          </p>
          {/* Video Player */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <video controls width="400">
              <source
                src={`https://dpcst9y3un003.cloudfront.net/${selectedVideo.video}`}
                type="video/mp4"
              />
            </video>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <button
              onClick={closeVideo}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Close Video
            </button>
          </div>
        </div>
      ) : (
        // Show the video list with thumbnails
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Video</th>
              <th >Description</th>
              <th>Created Date</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Diamond Value</th>
              <th>Shared</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {currentVideos.map((video) => (
              <tr key={video.id}>
                <td>{video.id}</td>
                <td>
                  <img
                    src={`https://dpcst9y3un003.cloudfront.net/${video.thum}`}
                    alt="Thumbnail"
                    onClick={() => showVideo(video)}
                    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                  />
                </td>
                <td>{video.description}</td>
                <td>{new Date(video.created).toLocaleString()}</td>
                <td>{video.like}</td>
                <td>{video.comments.length}</td>
                <td>{video.diamond_value}</td>
                <td>{video.shared}</td>
                <td>{video.viewCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        {!thumbnailClicked && (
          <>
            <button onClick={prevPage} className="page-link" disabled={currentPage === 1}>
              Previous
            </button>
            <ul className="pagination">{renderPageLinks}</ul>
            <button
              onClick={nextPage}
              className="page-link"
              disabled={currentPage === Math.ceil(videos.length / videosPerPage)}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AllVideos;

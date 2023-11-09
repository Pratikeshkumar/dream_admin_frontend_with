import React, { useState } from 'react';
import SendGiftModal from './SendGiftModal.js';

const VideoModal = ({ showVideoModal, handleCloseVideoModal, videoData, setVideoData }) => {
    const allUserVideoApis = require("../../../apis/all_user_video");
    videoData = videoData || [];



    const [isEditingLikes, setIsEditingLikes] = useState(false);
    const [editedLikes, setEditedLikes] = useState(false);

    // const [isEditingDiamonds, setIsEditingDiamonds] = useState(false);
    // const [editedDiamonds, setEditedDiamonds] = useState(0);

    const [isEditingShared, setIsEditingShared] = useState(false);
    const [editedShared, setEditedShared] = useState(0);



    const [isEditingViewCount, setIsEditingViewCount] = useState(false);
    const [editedViewCount, setEditedViewCount] = useState(0);

    const [isDeletingVideoCount, setIsDeletingVideoCount] = useState(false);
    const [deletedVideoCount, setDeletedVideoCount] = useState(0);


    const [showSendGiftModal, setShowSendGiftModal] = useState(false);

    const openSendGiftModal = () => {
        setShowSendGiftModal(true);
    };

    const closeSendGiftModal = () => {
        setShowSendGiftModal(false);
    };



    const [isLoading, setIsLoading] = useState(false);

    // const handleEditDiamonds = (index, diamonds) => {
    //     setIsEditingDiamonds(index);
    //     setEditedDiamonds(diamonds);
    // };

    const handleEditLikes = (index, likes) => {
        setIsEditingLikes(index);
        setEditedLikes(likes);
    };

    const handleSaveLikes = async (index) => {
        console.log(index, "indexValue")
        if (editedLikes !== null && editedLikes !== videoData[index].likes) {
            try {
                setIsLoading(true);
                const updatedVideoData = [...videoData];
                updatedVideoData[index].like = editedLikes;

                // Simulating an API call to update the likes count (replace this with actual API call)
                await allUserVideoApis.updateLikeVideos(videoData[index].id, editedLikes);

                setEditedLikes(false);
                setIsEditingLikes(false);
                setVideoData(updatedVideoData);
                console.log(videoData, "updated videodata")
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error updating like count:', error);
            }
        }
    };



    // const handleSaveDiamonds = async (index) => {
    //     if (editedDiamonds !== null && editedDiamonds !== videoData[index].diamond_value) {
    //         try {
    //             setIsLoading(true);
    //             const updatedVideoData = [...videoData];
    //             updatedVideoData[index].diamond_value = editedDiamonds;

    //             // Simulating an API call to update the diamonds count (replace this with the actual API call)
    //             await allUserVideoApis.updateDiamondVideos(videoData[index].id, editedDiamonds);

    //             setEditedDiamonds(0);
    //             setIsEditingDiamonds(false);
    //             setVideoData(updatedVideoData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             setIsLoading(false);
    //             console.error('Error updating diamond count:', error);
    //         }
    //     }
    // };

    const handleEditShared = (index, shared) => {
        setIsEditingShared(index);
        setEditedShared(shared);
    };

    // Handler for saving edited shared count
    const handleSaveShared = async (index) => {
        if (editedShared !== null && editedShared !== videoData[index].shared) {
            try {
                setIsLoading(true);
                const updatedVideoData = [...videoData];
                updatedVideoData[index].shared = editedShared;

                // Simulating an API call to update the shared count (replace this with the actual API call)
                await allUserVideoApis.updateVideoShared(videoData[index].id, editedShared);

                setEditedShared(0);
                setIsEditingShared(false);
                setVideoData(updatedVideoData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error updating shared count:', error);
            }
        }
    };

    // Handler for editing view count
    const handleEditViewCount = (index, views) => {
        setIsEditingViewCount(index);
        setEditedViewCount(views);
    };

    // Handler for saving edited view count
    const handleSaveViewCount = async (index) => {
        if (editedViewCount !== null && editedViewCount !== videoData[index].viewCount) {
            try {
                setIsLoading(true);
                const updatedVideoData = [...videoData];
                updatedVideoData[index].viewCount = editedViewCount;

                // Simulating an API call to update the view count (replace this with the actual API call)
                await allUserVideoApis.updateVideoCount(videoData[index].id, editedViewCount);

                setEditedViewCount(0);
                setIsEditingViewCount(false);
                setVideoData(updatedVideoData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error updating view count:', error);
            }
        }
    };

    const handleDeleteVideoCount = async (videoId) => {
        try {
            setIsDeletingVideoCount(true);

            const count = prompt('Enter the number of videos to delete:');

            if (count === null) {
                setIsDeletingVideoCount(false);
                console.log('Deletion cancelled by the user');
                return;
            }

            const parsedCount = parseInt(count);
            if (isNaN(parsedCount) || parsedCount <= 0) {
                throw new Error('Please enter a valid number greater than zero');
            }

            // Update the count of videos that are going to be deleted
            setDeletedVideoCount(parsedCount);

            // Call the API to delete the specified count of videos
            await allUserVideoApis.deleteVideoViewCount(videoId, parsedCount);

            // Update the count of videos that have been deleted
            setDeletedVideoCount(prevCount => prevCount + parsedCount);


            // Perform any actions after successful deletion
        } catch (error) {
            setIsDeletingVideoCount(false);
            console.error('Error deleting video count:', error);
            // Handle errors and show appropriate error messages
        }
    };




    const handleBlockVideo = async (index) => {
        // Ask for confirmation before blocking the video
        const confirmed = window.confirm("Are you sure you want to block this video?");
      
        if (confirmed) {
          try {
            const updatedVideoData = [...videoData];
            updatedVideoData[index].block = true; // Set the 'block' field to true
      
            // Simulating an API call to block the video (replace this with your actual API call)
            await allUserVideoApis.blockVideo(videoData[index].id);
      
            setVideoData(updatedVideoData);
          } catch (error) {
            console.error('Error blocking video:', error);
            // Implement error handling logic as needed
          }
        } else {
          // If the user cancels the action, you can perform any other action here or simply return
          console.log('Block action canceled by the user.');
          return;
        }
      };
      



    const modalStyle = {
        display: showVideoModal ? 'block' : 'none',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0,0,0,0.8)'
    };

    const modalContentStyle = {
        backgroundColor: '#fefefe',
        margin: '10% auto',
        padding: '20px',
        border: '1px solid #888',
        width: '95%',
        top: 0,


    };

    const closeButtonStyle = {
        color: '#aaa',
        float: 'right',
        fontSize: '28px',
        fontWeight: 'bold'
    };

    const tableStyle = {
        width: '95%',
        borderCollapse: 'collapse'
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center'
    };

    const videoStyle = {
        width: '100px', // Set the desired width for the video
        height: '100px', // Set the desired height for the video
    };
    const loaderStyle = {
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #3498db',
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        animation: 'spin 1s linear infinite',
        marginLeft: '5px',
        display: isLoading ? 'block' : 'none',
    };
    const buttonStyle = {
        padding: '8px 12px',
        margin: '10 8px', // Added margin to create space between buttons
        background: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const deleteButtonStyle = {
        padding: '8px 12px',
        margin: '10 8px', // Added margin to create space between buttons
        background: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };




    return (
        <div className="modal" style={modalStyle}>
            <div className="modal-content" style={modalContentStyle}>
                <span className="close" style={closeButtonStyle} onClick={handleCloseVideoModal}>&times;</span>
                <h2>User Videos</h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Video</th>
                            <th style={thStyle}>Comment</th>
                            <th style={thStyle}>Views</th>
                            <th style={thStyle}>Shared</th>
                            <th style={thStyle}>Diamonds</th>
                            <th style={thStyle}>likes</th>
                            <th style={thStyle}>Action</th>
                            <th style={thStyle}>Gift_section</th>



                        </tr>
                    </thead>
                    <tbody>
                        {videoData.map((video, index) => (
                            <tr key={index}>
                                <td style={tdStyle}>{video.id}</td>
                                <td style={tdStyle}>
                                    <video style={videoStyle} controls>
                                        <source src={`https://dpcst9y3un003.cloudfront.net/${video.video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </td>
                                <td style={tdStyle}>{video.comments.length}</td>


                                <td style={tdStyle}>
                                    {isEditingViewCount === index ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="number"
                                                value={editedViewCount}
                                                onChange={(e) => setEditedViewCount(e.target.value)}
                                            />
                                            <button style={buttonStyle} onClick={() => handleSaveViewCount(index)}>Save</button>
                                            <button style={buttonStyle} onClick={() => handleEditViewCount(index, video.viewCount)}>Add</button>
                                            <button style={deleteButtonStyle} onClick={() => handleDeleteVideoCount(video.id)}>Delete</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ marginRight: '12px' }}>{video.viewCount}</p>
                                            <button style={buttonStyle} onClick={() => handleEditViewCount(index, video.viewCount)}>Add</button>
                                            <button style={deleteButtonStyle} onClick={() => handleDeleteVideoCount(video.id)}>Delete</button>
                                        </div>
                                    )}
                                </td>




                                <td style={tdStyle}>
                                    {isEditingShared === index ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="number"
                                                value={editedShared}
                                                onChange={(e) => setEditedShared(e.target.value)}
                                            />
                                            <button style={buttonStyle} onClick={() => handleSaveShared(index)}>Save</button>
                                            {isLoading && <p style={loaderStyle}></p>}
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ marginRight: '12px' }}>{video.shared}</p>
                                            <button style={buttonStyle} onClick={() => handleEditShared(index, video.shared)}>Edit</button>
                                        </div>
                                    )}
                                </td>

                                <td style={tdStyle}>
                                   {video.diamond_value}
                                </td>

                                <td style={tdStyle}>
                                    {isEditingLikes === index ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="number"
                                                value={editedLikes}
                                                onChange={(e) => setEditedLikes(e.target.value)}
                                            />
                                            <button style={buttonStyle} onClick={() => handleSaveLikes(index)}>Save</button>
                                            {isLoading && <p style={loaderStyle}></p>}
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p style={{ marginRight: '12px' }}>{video.like}</p>
                                            <button style={buttonStyle} onClick={() => handleEditLikes(index, video.likes)}>Edit Likes</button>
                                        </div>
                                    )}
                                </td>
                                <td style={tdStyle}>
                                    {video.block ? (
                                        <p>Blocked</p>
                                    ) : (
                                        <button style={buttonStyle} onClick={() => handleBlockVideo(index)}>Block</button>
                                    )}
                                </td>
                                <td style={tdStyle}>
                                    <button style={buttonStyle} onClick={openSendGiftModal}>Send Gift</button>
                                </td>

                                {/* Send Gift Modal */}
                                <SendGiftModal showSendGiftModal={showSendGiftModal} closeSendGiftModal={closeSendGiftModal} />



                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VideoModal;

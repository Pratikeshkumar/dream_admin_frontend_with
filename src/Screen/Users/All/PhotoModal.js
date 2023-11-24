// PhotoModal.jsx
import React from 'react';

const PhotoModal = ({ showPhotoModal, handleClosePhotoModal, photoData }) => {
  if (!showPhotoModal) {
    return null;
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        
        <h2>User Photo Details</h2>
        <span onClick={handleClosePhotoModal} style={closeButtonStyle}>
          &times;
        </span>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Likes</th>
              <th>Comments</th>
              <th>Shared</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {photoData.map((photo, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`https://dpcst9y3un003.cloudfront.net/${photo.image_url}`}
                    alt={`User ${index + 1} Photo`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "20%",
                    }}
                  />
                </td>
                <td>{photo.like}</td>
                <td>{photo.comment}</td>
                <td>{photo.shared}</td>
                <td>{photo.description}</td>
                <td>{photo.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  Width: '100%',
  Height: '100%',
  overflowY: 'auto',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  fontSize: '50px',
  cursor: 'pointer',
};

export default PhotoModal;

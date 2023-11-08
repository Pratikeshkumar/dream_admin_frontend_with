import { React, useEffect, useState } from "react";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";
import "./AvatarScreen.css";

function AvatarScreen() {
  const [avatars, setAvatars] = useState([]);
  const avataApis = require("../../apis/avatar");
  const [selectedImage, setSelectedImage] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Set the number of items per page

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the user data to display only the items for the current page
  const usersOnCurrentPage = avatars.slice(startIndex, endIndex);

  const totalPages = Math.ceil(avatars.length / itemsPerPage);
  const showNextButton = currentPage < totalPages;

  const renderPageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginationButtons = renderPageNumbers.map((number, index) => {
    // Display only the first three page numbers and the "Next" button
    if (index < 3 || number === totalPages) {
      return (
        <button key={number} onClick={() => handlePageChange(number)}>
          {number}
        </button>
      );
    } else if (index === 3) {
      return <span key={number}>... </span>;
    }
    return null;
  });

  const getAllAvatars = async () => {
    setIsLoading(true);
    try {
      const result = await avataApis.getAllAvatars();

      const userData = result.data;
      console.log(userData);

      const filteredUsers = userData.filter((user) => {
        return user.id.toString().includes(searchTerm);
      });

      setAvatars(filteredUsers);
      // setUserCount(filteredUsers.length);
    } catch (error) {
      console.error("Error fetching Avatars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAvatars();
  }, [searchTerm]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage, selectedImage.name);
    
      const response = await avataApis.addAllAvatars(formData);

      if (response.status === 201) {
        // Successfully uploaded image; you may want to update the avatar list
        getAllAvatars();
        // Optionally, clear the selected image to allow for another upload
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <IncludeSideBar>
    <div>
      <div className="Header"> List of all Avatars</div>

      <div className="upload-image">
        <label>
          Choose File
          <input type="file" accept="image/*" onChange={handleImageSelect} />
        </label>
        <button onClick={uploadImage}>Upload Image</button>
      </div>  
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Please enter id Number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => setCurrentPage(1)}>
          Search
        </button>
      </div>
      {isLoading ? (
        <div className="loader">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
        </div>
      ) : (
        <div>
          <div className="avatar-rows">
            {usersOnCurrentPage
              .reduce((rows, item, index) => {
                if (index % 5 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(item);
                return rows;
              }, [])
              .map((row, rowIndex) => (
                <div className="avatar-row" key={rowIndex}>
                  {row.map((item, index) => (
                    <div className="avatar-card" key={index}>
                      <img
                        src={`https://dpcst9y3un003.cloudfront.net/${item.avatar_url}`}
                        alt={`Avatar ${item.id}`}
                      />
                      <div>ID: {item.id}</div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className="pagination">
            {paginationButtons}
            {showNextButton && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
    </IncludeSideBar>
  );
}

export default AvatarScreen;

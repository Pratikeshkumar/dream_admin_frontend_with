
import React, { useState, useEffect } from "react";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";
import "./Hobbies.css";
const hobbiesapi = require("../../apis/hobbies");

const Hobbies = () => {
  const [hobbies, setHobbies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 15; 
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedHobby, setUpdatedHobby] = useState({
    id: null,
    name: "",
    category: "",
  });

  const [newHobby, setNewHobby] = useState({
    name: "",
    category: "",
  });


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the user data to display only the items for the current page
  const usersOnCurrentPage = hobbies.slice(startIndex, endIndex);

  const totalPages = Math.ceil(hobbies.length / itemsPerPage);
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


  const getHobbies = async () => {
    setIsLoading(true);
    try {
      const response = await hobbiesapi.getAllhobbies();
      console.log(response.data,"response")
      const userData = response.data;

      setTotalItems(response.data.length);

      const filteredUsers = userData.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }); // Set the total number of items
      setHobbies(filteredUsers);
    } catch (error) {
      console.error("Error fetching hobbies:", error);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHobbies();
  }, [searchTerm]); // Include currentPage and perPage as dependencies

  const handleDelete = async (id) => {
    try {
      await hobbiesapi.deleteHobby(id);
      getHobbies();
    } catch (error) {
      console.error("Error deleting hobby:", error);
    }
  };

  const openUpdateModal = (hobby) => {
    setIsUpdateModalOpen(true);
    setUpdatedHobby({
      id: hobby.id,
      name: hobby.name,
      category: hobby.category,
    });
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHobby((prevHobby) => ({
      ...prevHobby,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      await hobbiesapi.updateHobby(updatedHobby.id, updatedHobby);
      closeUpdateModal();
      getHobbies();
    } catch (error) {
      console.error("Error updating hobby:", error);
    }
  };

  

  const handleAddNewHobby = async () => {
    try {
      await hobbiesapi.addHobby(newHobby);
      setNewHobby({
        name: "",
        category: "",
      });
      getHobbies();
    } catch (error) {
      console.error("Error adding hobby:", error);
    }
  };

  return (
      <>
      <div className="hobbies-container">
        <div className="Header">Hobbies</div>
        <div>
        <input
         className="search-input"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={() => setCurrentPage(1)}>Search</button>
      </div>
        {isLoading ? (
         <div className="loader">
         <div className="bounce1"></div>
         <div className="bounce2"></div>
       </div>
        ) : (
          <div>
            <table className="hobbies-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Action</th>
                 
                </tr>
              </thead>
              <tbody>
                {usersOnCurrentPage.map((user, index) => (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.category}</td>
                    <td>
                    
                      <button className="delete-button" onClick={() => openUpdateModal(user)}>Edit</button>
                      <button className="delete-button"  onClick={() => handleDelete(user.id)}>Delete</button>
                  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
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

        {/* Add New Hobby Form */}
        <div className="add-hobby-form">
          <h3>Add New Hobby</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newHobby.name}
              onChange={(e) => setNewHobby({ ...newHobby, name: e.target.value })}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={newHobby.category}
              onChange={(e) => setNewHobby({ ...newHobby, category: e.target.value })}
            />
          </label>
          <button onClick={handleAddNewHobby}>Add Hobby</button>
        </div>
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="update-modal">
          <h3>Edit Hobby</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedHobby.name}
              onChange={handleUpdateInputChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={updatedHobby.category}
              onChange={handleUpdateInputChange}
            />
          </label>
          <button onClick={handleUpdateSubmit}>Update</button>
          <button onClick={closeUpdateModal}>Cancel</button>
        </div>
      )}
   </>
  );
};

export default Hobbies;


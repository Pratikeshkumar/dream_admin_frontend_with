import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../../Components/Sidebar/IncludeSideBar";
import "./AllUser.css";
import Modal from "./AllUser_Modal_View";
const AllUser = () => {
  const allUserApis = require("../../../apis/users");
 
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [user_video_data, set_user_video_data] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the user data to display only the items for the current page
  const usersOnCurrentPage = users.slice(startIndex, endIndex);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const showNextButton = currentPage < totalPages;

  const renderPageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //  function for open and close

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
   
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

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await allUserApis.getAllUsers();
      const userData = response.data;
      console.log(response, "ressssssssssss");

      // Filter the user data based on the search term
      const filteredUsers = userData.filter((user) => {
        return (
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      setUsers(filteredUsers);
      setUserCount(filteredUsers.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDeleteUser = async (id) => {
  //     try {
  //         await allUserApis.deleteUser(id);
  //         getUsers();
  //     } catch (error) {
  //         console.error("Error deleting alluser:", error);
  //     }
  //     setUserCount(userCount - 1);
  // };

  const handleGetDetails = (user) => {
    setSelectedUser(user);
    // Scroll to the user details section
    if (selectedUser) {
      document
        .getElementById("user-details")
        .scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log(selectedUser, "outsideUseer");

  useEffect(() => {
    getUsers();
  }, [searchTerm]);

  const renderFieldValue = (value) => {
    return value !== null ? value : "*NA";
  };

  return (
    <div className="search-container">
      <p>Total Users: {userCount}</p>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search by username or email"
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
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>ProfilePic</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Nickname</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersOnCurrentPage.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>

                  <td>{user.username}</td>
                  {/* <td>{user.account_type}</td> */}
                  {/* <td>{user.active}</td> */}
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
                  <td>{user.email}</td>
                  <td>{renderFieldValue(user.gender)}</td>
                  <td>{user.nickname}</td>

                  <td>
                    {/* <button onClick={() => handleDeleteUser(user.id)}>Delete</button> */}
                    <button onClick={() => handleGetDetails(user)}>
                      Get Details
                    </button>
                    <button onClick={() => openModal(user)}>
                      MORE
                    </button>{" "}
                    {/* Step 4: Render the Modal */}
                    {isModalOpen && (
                      <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        user={selectedUser}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {selectedUser && (
        <div id="user-details">
          <h2>User Details</h2>
          <table>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{selectedUser.id}</td>
              </tr>
              <tr>
                <td>Nickname:</td>
                <td>{selectedUser.nickname}</td>
              </tr>
              <tr>
                <td>Account Type:</td>
                <td>{renderFieldValue(selectedUser.account_type)}</td>
              </tr>
              <tr>
                <td>Active:</td>
                <td>{renderFieldValue(selectedUser.active)}</td>
              </tr>
              <tr>
                <td>Auth Token:</td>
                <td>{renderFieldValue(selectedUser.auth_token)}</td>
              </tr>
              <tr>
                <td>Bio:</td>
                <td>{renderFieldValue(selectedUser.bio)}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{renderFieldValue(selectedUser.city)}</td>
              </tr>
              <tr>
                <td>City ID:</td>
                <td>{renderFieldValue(selectedUser.city_id)}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{renderFieldValue(selectedUser.country)}</td>
              </tr>
              <tr>
                <td>Country ID:</td>
                <td>{renderFieldValue(selectedUser.country_id)}</td>
              </tr>
              <tr>
                <td>Device:</td>
                <td>{renderFieldValue(selectedUser.device)}</td>
              </tr>

              <tr>
                <td>DOB:</td>
                <td>{renderFieldValue(selectedUser.dob)}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{renderFieldValue(selectedUser.email)}</td>
              </tr>
              <tr>
                <td>Emotion State:</td>
                <td>{renderFieldValue(selectedUser.emotion_state)}</td>
              </tr>

              <tr>
                <td>FB ID:</td>
                <td>{renderFieldValue(selectedUser.fb_id)}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{renderFieldValue(selectedUser.gender)}</td>
              </tr>
              <tr>
                <td>Hobbies:</td>
                <td>{renderFieldValue(selectedUser.hobbies)}</td>
              </tr>
              <tr>
                <td>Instagram:</td>
                <td>{renderFieldValue(selectedUser.instagram)}</td>
              </tr>
              <tr>
                <td>Language:</td>
                <td>{renderFieldValue(selectedUser.language)}</td>
              </tr>
              <tr>
                <td>Making Friend Intention:</td>
                <td>
                  {renderFieldValue(selectedUser.making_friend_intention)}
                </td>
              </tr>
              <tr>
                <td>Occupation:</td>
                <td>{renderFieldValue(selectedUser.occupation)}</td>
              </tr>
              <tr>
                <td>Online:</td>
                <td>{renderFieldValue(selectedUser.online)}</td>
              </tr>
              <tr>
                <td>Paypal:</td>
                <td>{renderFieldValue(selectedUser.paypal)}</td>
              </tr>
              <tr>
                <td>Person Height:</td>
                <td>{renderFieldValue(selectedUser.person_height)}</td>
              </tr>
              <tr>
                <td>Person Weight:</td>
                <td>{renderFieldValue(selectedUser.person_weight)}</td>
              </tr>
              <tr>
                <td>Phone:</td>
                <td>{renderFieldValue(selectedUser.phone)}</td>
              </tr>
              <tr>
                <td>Profile Video:</td>
                <td>{renderFieldValue(selectedUser.profile_video)}</td>
              </tr>

              <tr>
                <td>Role:</td>
                <td>{renderFieldValue(selectedUser.role)}</td>
              </tr>
              <tr>
                <td>Social:</td>
                <td>{renderFieldValue(selectedUser.social)}</td>
              </tr>
              <tr>
                <td>Wallet:</td>
                <td>{renderFieldValue(selectedUser.wallet)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUser;

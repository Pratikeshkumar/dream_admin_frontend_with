import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../../Components/Sidebar/IncludeSideBar";
import useAuth from "../../../useAuth";
import axios from "axios";  // Make sure to import axios
import { BsJustify } from "react-icons/bs";

function BasicUser() {
  const { user } = useAuth();
  const role = user ? user.role : null;

  const allUserApis = require("../../../apis/users");
  const sendMoneyApis = require("../../../apis/super_admin_transaction");

  const [basicUsers, setBasicUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [accountTypeDropdownVisibility, setAccountTypeDropdownVisibility] = useState({});
  const [accountTypes, setAccountTypes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFocused, setIsFocused] = useState(false)
  const showDetails = (userId) => {
    const user = basicUsers.find((user) => user.id === userId);
    setSelectedUser(user);
    setSelectedUserId(userId);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  const fetchUsers = async (page, searchTerm = '') => {
    try {
      setIsLoading(true)
      const response = await allUserApis.getAllBasicUsers(page, searchTerm);
      setBasicUsers(response.data);
      setFilteredUsers(response.data)
      setTotalPages(response.pagination.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filtered = basicUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const sendCoins = async (userId) => {
    try {
      if (role === "superadmin") {
        const amount = prompt("Enter the amount to send:");

        if (amount !== null && amount.trim() !== "") {
          await sendMoneyApis.SendMoneyToUser({ userId, amount });
          console.log(`Successfully sent ${amount} coins to user with ID: ${userId}`);
        } else {
          console.error("Error: Invalid amount entered.");
        }
      } else {
        alert("Access Denied: Only superadmins can send coins.");
      }
    } catch (error) {
      console.error("Error sending coins:", error);
    }
  };

  const handleAccountTypeChange = async (userId, accountType) => {
    try {
      if (role === "superadmin") {
        await allUserApis.changeUserAccountType(userId, accountType);
        console.log(`Successfully changed account type to ${accountType} for user with ID: ${userId}`);
        setAccountTypes((prevTypes) => ({
          ...prevTypes,
          [userId]: accountType,
        }));
        await fetchUsers();
        console.log("fetchUsers called");
      } else {
        alert("Access Denied: Only superadmins can change account types.");
      }
    } catch (error) {
      console.error("Error changing account type:", error);
    }
  };

  const handleAccountTypeDropdownToggle = (userId) => {
    setAccountTypeDropdownVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: !prevVisibility[userId],
    }));
  };
  // console.log(selectedUser, 'selectedUserselectedUserselectedUser')

  const handlePrevious = () => {
    if (currentPage > 1) {
      // setCurrentPage((prevPage) => prevPage - 1);
      setCurrentPage(currentPage - 1);
    }
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
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <IncludeSideBar>
      <div>
        <h1>Basic Users</h1>
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            borderWidth: isFocused ? '10px' : '1px',
            borderStyle: 'solid',
            borderColor: isFocused ? 'green' : 'white',
          }}

        />
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => showDetails(user.id)}>View Details</button>
                      <button
                        style={{ marginLeft: "1%" }}
                        onClick={() => sendCoins(user.id)}>Send Coin</button>

                      <button
                        style={{ marginLeft: "1%" }}
                        onClick={() => sendCoins(user.id)}>verification</button>

                      <div style={{ display: "inline-block", marginLeft: "60px" }}>
                        <label>
                          Change Account Type:
                          <select
                            value={accountTypes[user.id] || "Select Account"}
                            onChange={(e) => handleAccountTypeChange(user.id, e.target.value)}
                            onClick={() => handleAccountTypeDropdownToggle(user.id)}
                            onBlur={() => handleAccountTypeDropdownToggle(user.id)}
                          >
                            <option value="Select Account">Select Account Type</option>
                            <option value="premium">Premium</option>
                            <option value="business">Business</option>
                          </select>
                        </label>
                        {accountTypeDropdownVisibility[user.id] && (
                          <button onClick={() => handleAccountTypeChange(user.id, accountTypes[user.id])}>
                            Change Account Type
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
              {
                filteredUsers.length === 0 && <p>
                  NO Data Available
                </p>
              }
            </div>
            {selectedUser && (
              <div style={{ display: "block", position: "fixed", zIndex: 1, left: 0, top: 0, width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <div style={{ backgroundColor: "#fefefe", border: "1px solid #888", margin: "10% auto", padding: "20px", width: "60%", marginLeft: "30%" }}>
                  <span style={{ float: "right", cursor: "pointer" }} onClick={closeDetails}>
                    &times;
                  </span>
                  <h2>User Details</h2>
                  <table>
                    <tbody>
                      <tr>
                        <td><strong>Account Type:</strong></td>
                        <td>{selectedUser.account_type}</td>

                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Role:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.role}
                        </td>
                      </tr>

                      <tr>
                        <td><strong>Active</strong></td>
                        <td><strong>{selectedUser.active}</strong></td>
                      </tr>

                      <tr>
                        <td><strong>ID:</strong></td>
                        <td>{selectedUser.id}</td>
                      </tr>
                      <tr>
                        <td><strong>Username:</strong></td>
                        <td>{selectedUser.username}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Nickname:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.nickname}
                        </td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{selectedUser.email}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Gender:
                          </strong>
                        </td>
                        <td>
                          {
                            selectedUser.gender
                          }
                        </td>
                      </tr>

                      <tr>
                        <td><strong> Bio:</strong></td>
                        <td>{selectedUser.bio}</td>
                      </tr>
                      <tr>
                        <td><strong>D.O.B:</strong></td>
                        {/* <td>{selectedUser.dob}</td> */}
                        <td>{selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString('en-US') : 'N/A'}</td>

                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Person Height:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.person_height}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Person Weight:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.person_weight}
                        </td>
                      </tr>

                      <tr>
                        <td><strong>Country:</strong></td>
                        <td>{selectedUser.country}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>City:</strong>
                        </td>
                        <td>{selectedUser.city}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Phone:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.phone}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            Device:
                          </strong>
                        </td>
                        <td>
                          {
                            selectedUser.device
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Wallet:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.wallet}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            Emotion state:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.emotion_state}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Facebook:
                          </strong>
                        </td>
                        <td>
                          {
                            selectedUser.facebook
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Instagram:
                          </strong>
                        </td>
                        <td>
                          {
                            selectedUser.instagram
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Twitter:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.twitter}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            You Tube:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.you_tube}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            Hobbies:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.hobbies && selectedUser.hobbies.length > 0 ? (
                            <ul>
                              {
                                selectedUser.hobbies.map((hobbiedada, index) => (
                                  <li key={index}>{hobbiedada}</li>
                                ))}

                            </ul>
                          ) : (
                            "No hobbies available"
                          )

                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Language:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.language}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Making Friend Intention:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.making_friend_intention}
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>
                            Occupation:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.occupation}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            Website:
                          </strong>
                        </td>
                        <td>
                          {selectedUser.website}
                        </td>
                      </tr>
                      {/* ... (your existing code for user details) */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', marginLeft: '5%', marginTop: '20px' }} className="pagination">
          <button onClick={handlePrevious} style={{ backgroundColor: 'red' }}>Previous</button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNext} style={{  backgroundColor: 'green' }}>Next</button>
        </div>
      </div>
    </IncludeSideBar>
  );
}

export default BasicUser;

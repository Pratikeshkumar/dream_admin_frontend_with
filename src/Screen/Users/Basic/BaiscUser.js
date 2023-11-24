import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../../Components/Sidebar/IncludeSideBar";
import useAuth from "../../../useAuth";
import axios from "axios";  // Make sure to import axios

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

  const showDetails = (userId) => {
    const user = basicUsers.find((user) => user.id === userId);
    setSelectedUser(user);
    setSelectedUserId(userId);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await allUserApis.getAllBasicUsers();
      setBasicUsers(response.data);
      setFilteredUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <IncludeSideBar>
      <div>
        <h1>Basic Users</h1>
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
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
                        <td><strong>ID:</strong></td>
                        <td>{selectedUser.id}</td>
                      </tr>
                      <tr>
                        <td><strong>Username:</strong></td>
                        <td>{selectedUser.username}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{selectedUser.email}</td>
                      </tr>
                      {/* ... (your existing code for user details) */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </IncludeSideBar>
  );
}

export default BasicUser;

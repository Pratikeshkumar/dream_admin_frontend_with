import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../../Components/Sidebar/IncludeSideBar";

function BasicUser() {
  const allUserApis = require("../../../apis/users");
  const [basicUsers, setBasicUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");


  const showDetails = (userId) => {
    const user = basicUsers.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await allUserApis.getAllBasicUsers();
        setBasicUsers(response.data);
        setFilteredUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once

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
          <p>Loading...</p>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedUser && (
              <div style={{ display: "block", position: "fixed", zIndex: 1, left: 0, top: 0, width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.4)" }}>
                <div style={{ backgroundColor: "#fefefe", border: "1px solid #888", margin: "10% auto", padding: "20px", width: "60%",marginLeft:"30%" }}>
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
                      <tr>
                        <td><strong>Gender:</strong></td>
                        <td>{selectedUser.gender}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>Country:</strong></td>
                        <td>{selectedUser.country}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>hobbies:</strong></td>
                        <td>{selectedUser.hobbies}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>nickname:</strong></td>
                        <td>{selectedUser.nickname}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>occupation:</strong></td>
                        <td>{selectedUser.occupation}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>wallet:</strong></td>
                        <td>{selectedUser.wallet}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>emotion_state:</strong></td>
                        <td>{selectedUser.emotion_state}</td>
                       
                      </tr>
                      <tr>
                        <td><strong>language:</strong></td>
                        <td>{selectedUser.language}</td>
                       
                      </tr>
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

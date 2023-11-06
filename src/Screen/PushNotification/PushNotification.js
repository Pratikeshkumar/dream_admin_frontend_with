import React, { useState, useEffect } from 'react';
import './PushNotification.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

const AdminNotificationPanel = () => {
  const AllNotificationUser = require('../../apis/notification');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await AllNotificationUser.getNotificationUser();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allUserIds = filteredUsers.map(user => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectFilteredUser = (userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  return (
    <div>
      <h2>Admin Notification Panel</h2>

      <form>
        <div className="notification-message">
          <label>Notification Message:</label>
          <div className="editor" style={{ border: '1px solid #ccc', minHeight: '200px' }}>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </div>
        </div>
        <button style={{ margin: "3%" }} type="submit">
          Send Notification
        </button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Username or Email"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={() => setSearchTerm('')}>Clear</button>
        </div>
        <div>
          <h2>Select User</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                  />
                  Select All
                </th>
                <th>ID</th>
                <th>Profile_pic</th>
                <th>Username</th>
                <th>Email</th>
                <th>account_type</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={user.id}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectFilteredUser(user.id)}
                    />
                  </td>
                  <td>
                    <img
                      src={user.profile_pic}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "20%",
                      }}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.account_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default AdminNotificationPanel;

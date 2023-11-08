import React, { useState, useEffect } from 'react';
import './PushNotification.css';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar'

const AdminNotificationPanel = () => {
  const AllNotificationUser = require('../../apis/notification')
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [color, setColor] = useState('');
  const [body, setBody] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [importance, setImportance] = useState('DEFAULT');
  const [iconFile, setIconFile] = useState(null);
  const [pictureFile, setPictureFile] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
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
      const allUserIds = filteredUsers.map((user) => user.id);
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


  const handleIconChange = (event) => {
    console.log(event,"event")
    const file = event.target.files[0];
    console.log(file,"fileIcon")
    if (file) {
      setIconFile(file);
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    console.log(file,"filePicture")
    if (file) {
      setPictureFile(file);
    }
  };
  const handleImportanceChange = (event) => {
    setImportance(event.target.value);
  };


  const sendNotificationToUsers = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('body', body);
    formData.append('color', color);
    formData.append('sound_enabled', soundEnabled ? 'true' : 'false');
    formData.append('vibration_enabled', vibrationEnabled ? 'true' : 'false');
    formData.append('importance', importance);
    selectedUsers.forEach((user) => {
      console.log(user,"userId")
      formData.append('id', user);
    });
    console.log(formData,"formData")

    if (iconFile) {
      formData.append('large_icon', iconFile);
    }


    if (pictureFile) {
      formData.append('big_picture', pictureFile);
    }

    try {
      
      const response = await AllNotificationUser.sendNotification(formData)
      console.log(response)


     
      // setTitle('');
      // setSubtitle('');
      // setColor('');
      // setBody('');
      // setSoundEnabled(false);
      // setVibrationEnabled(false);
      // setIconFile(null);
      // setPictureFile(null);
      // setSelectedUsers([]);

      alert('Notification sent successfully!');

    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <IncludeSideBar> 
    <div>
      <h2>Admin Notification Panel</h2>

      <form>
        <div className="notification-message">
          <label>Notification Message:</label>
          {/* Your Editor or Text input for notification message */}
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
          <label>SubTitle:</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle"
          />
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter color"
          />
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter body"
          ></textarea>
          <div>
            <label>Importance:</label>
            <select value={importance} onChange={handleImportanceChange}>
              <option value="HIGH">High</option>
              <option value="DEFAULT">Default</option>
              <option value="LOW">Low</option>
              <option value="MIN">Min</option>
              <option value="NONE">None</option>
            </select>
          </div>


          <label>Icon:</label>
          <input
            type="file"
            onChange={handleIconChange}
          />
          <label>Picture:</label>
          <input
            type="file"
            onChange={handlePictureChange}
          />


       
          <label>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
            Sound Enabled
          </label>
          <label>
            <input
              type="checkbox"
              checked={vibrationEnabled}
              onChange={(e) => setVibrationEnabled(e.target.checked)}
            />
            Vibration Enabled
          </label>
        </div>
        <button
          style={{ margin: "3%" }}
          type="submit"
          onClick={sendNotificationToUsers}
        >
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
    </IncludeSideBar>
  );
};

export default AdminNotificationPanel;
 
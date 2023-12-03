import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'

function BlockedUsers() {
    const allUserApis = require("../../../apis/users");
    const [users, setUsers] = useState([]);

    const getBlockedUsers = async () => {
        try {
            const response = await allUserApis.getBlockUsers();
            console.log(response, "response from blocked users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        getBlockedUsers();
    }, []);

    const handleStatusChange = async(userId) => {
        console.log(userId)
        try {
            // Make an API call to update the user's status to 1
            const response = await allUserApis.updateUserStatus(userId, 1);
            
            // Assuming the API call is successful, update the local state
            if (response.status === 200) {
                const updatedUsers = users.map((user) =>
                    user.id === userId ? { ...user, status: 1 } : user
                );
                setUsers(updatedUsers);
                getBlockedUsers();

            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <IncludeSideBar> 
        <div>
            <p>Blocked User Details:</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Account Type</th>
                        <th>Action</th> {/* New column for the Status button */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.account_type}</td>
                            <td>
                                <button onClick={() => handleStatusChange(user.id)}>
                                Activate User
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </IncludeSideBar>
    );
}

export default BlockedUsers;

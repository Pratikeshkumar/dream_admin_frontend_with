import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';

function AdminProfile() {
  const [adminEmployees, setAdminEmployees] = useState([]);

  const getEmployee = async () => {
    const EmployeeApis = require('../../apis/employee')
    try {
      const response = await EmployeeApis.getAllEmployee();
      const adminEmployees = response.employees.filter(employee => employee.role === 'admin');
      setAdminEmployees(adminEmployees);
    } catch (error) {
      console.error("Error fetching admin employees:", error);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <IncludeSideBar>
      <div>
        <p>Here we are displaying all admin profiles:</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Wallet</th>
            </tr>
          </thead>
          <tbody>
            {adminEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{`${employee.first_name} ${employee.last_name}`}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{employee.wallet || 'N/A'}</td>
                {/* Add more fields as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </IncludeSideBar>
  );
}

export default AdminProfile;

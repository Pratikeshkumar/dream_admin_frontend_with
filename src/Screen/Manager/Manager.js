import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';
const EmployeeApis = require('../../apis/employee')

function Manager() {
  const [managers, setManagers] = useState([]);

  const getManagers = async () => {
    try {
      const response = await EmployeeApis.getAllEmployee();
      const managers = response.employees.filter(
        employee => employee.role === 'manager'
      );
      setManagers(managers);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  useEffect(() => {
    getManagers();
  }, []);

  return (
    <IncludeSideBar>
      <div>
        <p>Here we are displaying all Managers:</p>
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
            {managers.map((employee) => (
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

export default Manager;

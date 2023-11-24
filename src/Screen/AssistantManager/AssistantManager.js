import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';

function AssistantManager() {
    const EmployeeApis = require('../../apis/employee')
  const [assistantManagers, setAssistantManagers] = useState([]);

  const getAssistantManagers = async () => {
    try {
      const response = await EmployeeApis.getAllEmployee();
      const assistantManagers = response.employees.filter(
        employee => employee.role === 'assistant manager'
      );
      setAssistantManagers(assistantManagers);
    } catch (error) {
      console.error("Error fetching assistant managers:", error);
    }
  };

  useEffect(() => {
    getAssistantManagers();
  }, []);

  return (
    <IncludeSideBar>
      <div>
        <p>Here we are displaying all Assistant Managers:</p>
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
            {assistantManagers.map((employee) => (
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

export default AssistantManager;

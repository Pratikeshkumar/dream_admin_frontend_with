import React, { useState, useEffect } from 'react';
import './Employee.css';
import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar'


const Employee = () => {

  const addmoneysuperadminApis = require('../../apis/super_admin_transaction');
  const EmployeeApis = require('../../apis/employee')


  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');
  const [showAmountInputMap, setShowAmountInputMap] = useState({});
  const [cancelInputMap, setCancelInputMap] = useState({});



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form fields before submission (e.g., password match, required fields, etc.)
    if (!firstName || !lastName || !email || !password || !confirmPassword || password !== confirmPassword) {
      console.error('Invalid form data');
      // Handle form validation errors (display messages or prevent submission)
      return;
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      role,
      active: 1,
    };

    try {
      const addedEmployee = await EmployeeApis.addEmployee(newEmployee);


      // Clear form fields upon successful addition
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setGender('');
      setRole('');

      console.log('Employee added:', addedEmployee);
      // Additional actions upon successful addition if needed
      getEmployee();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding employee:', error.message);
      // Handle error - show an error message, for example
    } finally {
      setLoading(false); // Hide loader after form submission (whether successful or not)
    }
  };
  const filteredEmployees = selectedRole === 'All' ? employees : employees.filter(employee => employee.role === selectedRole);
  // function for getting the addedemployee


  const getEmployee = async () => {
    try {
      const response = await EmployeeApis.getAllEmployee();
      console.log(response, "response")
      setEmployees(response.employees);
    } catch (error) {
      console.error("Error fetching eemployees:", error);
    }
  };
  useEffect(() => {
    getEmployee();
  }, []);


  //function to activate and deactivate the code 

  const activateEmployee = async (id) => {
    try {
      // Display a confirmation alert before activating the employee
      const confirmActivate = window.confirm("Are you sure you want to activate this employee?");

      if (confirmActivate) {
        await EmployeeApis.activateEmployee(id);
        // Refresh the employee list after activation
        getEmployee();

      } else {
        // If the user cancels the activation, you can perform any other action here or simply return
        console.log('Activation canceled by the user.');
        return;
      }
    } catch (error) {
      console.error('Error activating employee:', error);
    }
  };

  const deactivateEmployee = async (id) => {
    try {
      // Display a confirmation alert before deactivating the employee
      const confirmDeactivate = window.confirm("Are you sure you want to deactivate this employee?");

      if (confirmDeactivate) {
        await EmployeeApis.deactivateEmployee(id);
        // Refresh the employee list after deactivation
        getEmployee();
      } else {
        // If the user cancels the deactivation, you can perform any other action here or simply return
        console.log('Deactivation canceled by the user.');
        return;
      }
    } catch (error) {
      console.error('Error deactivating employee:', error);
    }
  };



  //function to delete the employes

  const deleteEmployee = async (id) => {
    try {
      // Display a confirmation alert before proceeding with deletion
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");

      if (confirmDelete) {
        await EmployeeApis.deleteEmployee(id);
        // Refresh the employee list after deletion
        getEmployee();
      } else {
        // If the user cancels the deletion, you can perform any other action here or simply return
        console.log('Deletion canceled by the user.');
        return;
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };



  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const toggleAmountInput = (id) => {
    setShowAmountInputMap((prevMap) => ({
      ...prevMap,
      [id]: !prevMap[id],
    }));
    setCancelInputMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSendMoney = async (id) => {

    try {
      setLoading(true);
      toggleAmountInput(); // Toggle the amount input visibility

      // Implement logic to send money through the API using the entered amount and employee id
      // Use the 'amount' and 'id' state variables for sending money

      // Assuming sendMoneyApis.sendMoneyToEmployee is a function that sends the API request
      const response = await addmoneysuperadminApis.SendMoneyToAdmin({ id, amount });

      console.log('API response:', response);

      // Handle the response as needed, update UI, etc.
      // For example, you might want to show a success message to the user

    } catch (error) {
      console.error('Error sending money:', error);
      // Handle errors, show error message, etc.
    } finally {
      toggleAmountInput(id);
      setAmount('');
      
      setLoading(false);
    }
  };

  const handleCancelAmountInput = (id) => {
    setAmount('');
    setShowAmountInputMap((prevMap) => ({
      ...prevMap,
      [id]: false,
    }));
    setCancelInputMap((prevMap) => ({
      ...prevMap,
      [id]: true,
    }));
  };









  return (
    <IncludeSideBar>
      <div>
        <button style={{ marginTop: "2%", marginLeft: "80%" }}
          onClick={toggleFormVisibility} className="add-employee-btn">
          {showForm ? 'Hide Form' : 'Add Employee'}
        </button>
        <select style={{ marginLeft: "78%", marginTop: "4%" }}
          value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="All">All</option>
          <option value="admin">admin</option>
          <option value="manager">manager</option>
          <option value="assistant manager">assistant manager</option>

          {/* Add other roles as options */}
        </select>

        {showForm && (
          <div>
            <h2>Employee Information</h2>
            <form onSubmit={handleFormSubmit} className="employee-form">
              <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" />
              </label>
              <br />
              <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" />
              </label>
              <br />
              <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
              </label>
              <br />
              <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
              </label>
              <br />
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </label>
              <br />
              <label>
                Gender:
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <br />
              <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="assistant manager">Assistant Manager</option>
                </select>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : null}


        <div>
          <h2 style={{ marginLeft: "40%", marginBottom: "4%" }}>Employee List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>role</th>
                <th>action</th>
                <th>Delete</th>
                <th> Send Log</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.first_name} {employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>
                    {employee.active === 1 ? (
                      <button onClick={() => deactivateEmployee(employee.id)}>Deactivate</button>
                    ) : (
                      <button onClick={() => activateEmployee(employee.id)}>Activate</button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  </td>
                  <td>
                    {showAmountInputMap[employee.id] && !cancelInputMap[employee.id] && (
                      <div>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => handleAmountChange(e)}
                        />
                        <button onClick={() => handleSendMoney(employee.id)}>Confirm</button>
                        <button onClick={() => handleCancelAmountInput(employee.id)}>Cancel</button>
                      </div>
                    )}
                    {!showAmountInputMap[employee.id] && (
                      <button onClick={() => toggleAmountInput(employee.id)}>Send Money</button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>



      </div>
    </IncludeSideBar>
  );
};

export default Employee;

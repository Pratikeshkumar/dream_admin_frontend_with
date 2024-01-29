import React, { useEffect, useState } from 'react';
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar';

function PremiumUsers() {
  const allUserApis = require('../../../apis/users');
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
const [isFocused,setIsFocused]=useState(false)
    const fetchUsers = async (page, searchTerm = '') => {
      try {
        setIsLoading(true)

        const response = await allUserApis.getAllPremiumUsers(page, searchTerm);
        setPremiumUsers(response.data);
        setTotalPages(response.pagination.totalPages);
        setFilteredUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };
    useEffect(() => {

    fetchUsers(currentPage,searchTerm);
  }, [currentPage,searchTerm]);

console.log(currentPage,'currentPage')
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };
  //pagination
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
      // console.log('nextpage',currentPage,totalPages)
    }
  };
const handlesearch=(e)=>{
  // const value=e.target.value
  const searchTerm=e.target.value;
  setSearchTerm(searchTerm)
  const filterdata=premiumUsers.filter((userdata)=>
  userdata.email.toLowerCase().includes(searchTerm.toLowerCase()) 
  )
  setFilteredUsers(filterdata)
  console.log(filterdata,'userdatauserdata')

}
const handleFocus = () => {
  setIsFocused(true);
};
const handleBlur = () => {
  setIsFocused(false);
};

  return (
    <IncludeSideBar>
      <div>
        <h1>Premium Users</h1>

        <input
        type="text"
        placeholder='Search by email ID'
        value={searchTerm}
        onChange={handlesearch}
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
                  <th>Email</th>
                  <th>Account Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.account_type}</td>
                    <td>
                      <button onClick={() => openModal(user)}>Get Details</button>
                    </td>
                  </tr>
                ))}
               
              </tbody>
            </table>
            <div style={{justifyContent:'center',alignItems:'center', marginTop:'20px'}}>
                {
                  filteredUsers.length === 0 && 
                  <p style={{color:'#000'}}> No Data Available</p>
                }
               </div>
            {showModal && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 1,
                }}
                onClick={closeModal}
              >
                <div
                  style={{
                    backgroundColor: '#fefefe',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    maxWidth: '600px',
                    width: '100%',
                    position: 'relative',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      fontSize: '24px',
                      cursor: 'pointer',
                    }}
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <h2>User Details</h2>
                  {selectedUser && (
                    <div>
                      <table
                        style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          marginTop: '15px',
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Attribute</th>
                            <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>ID</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.id}</td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Email</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.email}</td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Account Type</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.account_type}</td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>UserName</td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{selectedUser.username}</td>
                          </tr>
                          {/* Add more rows as needed */}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div style={{ display: 'flex', marginLeft: '5%', marginTop: '20px' }} className="pagination">
          <button onClick={handlePrevious} style={{ backgroundColor: 'red' }}>Previous</button>
              {
                Array.from({length:totalPages},(_,index)=>(
                  <button
                  key={index+1}
                  onClick={()=>{handlePageChange(index + 1)}}
                  className={currentPage===index+1?'Active':''}
                  >
                    {index+1}
                  </button>
                ))
              }

          <button onClick={handleNext} style={{  backgroundColor: 'green' }}>Next</button>
        </div>


      </div>
    </IncludeSideBar>
  );
}

export default PremiumUsers;

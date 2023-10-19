import React, { useState, useEffect } from 'react';
import './Occupation.css'; // Import your CSS file
const occupationApi = require("../../apis/occupation");

const Occupation = () => {
  const [parent, setParent] = useState('');
  const [children, setChildren] = useState(['']);
  const [currentPage, setCurrentPage] = useState(1);
  const [occupationData, setOccupationData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleParentChange = (e) => {
    setParent(e.target.value);
  };

  const handleChildChange = (e, index) => {
    const updatedChildren = [...children];
    updatedChildren[index] = e.target.value;
    setChildren(updatedChildren);
  };

  const handleAddChild = () => {
    setChildren([...children, '']);
  };

  const handleRemoveChild = (index) => {
    const updatedChildren = [...children];
    updatedChildren.splice(index, 1);
    setChildren(updatedChildren);
  };

 

  const handleDelete = async (id) => {
    try {
      setLoading(true);
  
      // Determine if the occupation is a parent (has children) or not
      const occupationToDelete = occupationData.find((item) => item.id === id);
      if (!occupationToDelete) {
        console.error('Occupation not found for deletion');
        return;
      }
  
      // Check if the occupationToDelete has children
      if (occupationToDelete.children.length > 0) {
        // If it has children, delete all of them
        const childIds = occupationToDelete.children.map((child) => child.id);
  
        // Implement the logic to delete all children here
        // You may need to call your API to delete the children occupations
        for (const childId of childIds) {
          const result = await occupationApi.deleteOccupation(childId); // Replace with your actual API call
          if (result) {
            console.log(`Child occupation with ID ${childId} deleted successfully.`);
          } else {
            console.error(`Failed to delete child occupation with ID ${childId}.`);
          }
        }
      }
  
      // After deleting the children, you can delete the parent
      const result = await occupationApi.deleteOccupation(id); // Replace with your actual API call
  
      if (result) {
        // Parent deleted successfully, reset the state
        setParent('');
        setChildren(['']);
  
        // Trigger a re-fetch of occupations
        getOccupations();
      } else {
        // Handle the deletion failure or show an error message
        console.error('Failed to delete the parent occupation');
      }
  
      // After successful deletion, update the UI state
      setOccupationData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting occupation:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parent.trim() === '' || children.some(child => child.trim() === '')) {
      alert('Please fill in all fields before submitting.');
      return;
    }
    const occupationData = [
      {
        industry: parent,
        occupations: children.map((child) => ({
          name: child,
        })),
      }];
    const result = await occupationApi.addAllOccupation(occupationData);
    setParent('');
    setChildren(['']);
    getOccupations();
  };

  const getOccupations = async () => {
    setLoading(true);
    try {
      const response = await occupationApi.getAllOccupation(currentPage, perPage);
      const hierarchicalData = convertToHierarchy(response.occupations);
      console.log(response.occupations)
      setOccupationData(hierarchicalData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching occupations:', error);
      setLoading(false);
    }
  };

  const convertToHierarchy = (data) => {
    const map = {};
    const hierarchicalData = [];

    data.forEach((item) => {
      const parentId = item.parentId;
      const id = item.id;

      map[id] = map[id] || { children: [] };

      map[id].id = id;
      map[id].name = item.name;

      if (parentId === null) {
        hierarchicalData.push(map[id]);
      } else {
        map[parentId] = map[parentId] || { children: [] };
        map[parentId].children.push(map[id]);
      }
    });

    return hierarchicalData;
  };

  useEffect(() => {
    getOccupations();
  }, [currentPage, perPage]);

  // Render occupation data in a table
  const renderTable = (data) => {
    if (data.length === 0) {
      return <p>No occupations to display.</p>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            <th>Count</th>
            <th>Industry</th>
            <th>Occupation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td> {/* Counting starts from 1 */}
              <td>{item.name}</td>
              <td>
                {item.children.map((child, childIndex) => (
                  <div 
                   key={child.id}
                   style={{padding:4}}>
                    ({childIndex + 1}) {child.name}
                  </div>
                ))}
              </td>
              <td>
                <button type="button" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  return (
    <div className="family-form-container">
      <form onSubmit={handleSubmit} className="family-form">
        <div className="form-group">
          <label>Industry name:</label>
          <input type="text" value={parent} onChange={handleParentChange} />
        </div>
        <div className="form-group">
          <label>Occupation name:</label>
          {children.map((child, index) => (
            <div 
            style={{}} 
            key={index}>
              <input
                type="text"
                value={child}
                onChange={(e) => handleChildChange(e, index)}
              />
              <button type="button" onClick={() => handleRemoveChild(index)}>
                Remove
              </button>
            </div>
          )
          )}
          <button type="button" onClick={handleAddChild}>
            Add 
          </button>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="occupation-list">
        <h2>Occupations List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          renderTable(occupationData)
        )}
      </div>
    </div>
  );
};

export default Occupation;

// Languages.js
import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";
import styles from "./Languages.css"; // Import the CSS module

function Languages() {
  const languagesApis = require("../../apis/languages");
  const [languagesData, setLanguagesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newLanguage, setNewLanguage] = useState({ name: "", code: "" });
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  

  // Function to fetch existing languages
  const getAllLanguages = async () => {
    try {
      const result = await languagesApis.getAllLanguages(currentPage, itemsPerPage);
      // console.log(result.config.url, "URL");
      console.log(result.data, "GET DATA");
      setLanguagesData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllLanguages(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  

  // Function to handle adding a new language
  const handleAddLanguage = async () => {
    setIsLoading(true)
    try {
      // Send a request to your API to add the new language
      await languagesApis.addAllLanguages(newLanguage);
      setShowAddModal(false);
     

      getAllLanguages();
      

      setNewLanguage({ name: "", code: "" }); 
      // Refresh the language list
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };
    // Function to handle deleting a new language

    const handleDelete = async (id) => {
      try {
        await languagesApis.deleteAllLanguages(id);
        getAllLanguages();
      } catch (error) {
        console.error("Error deleting country:", error);
      }
    };
    const handlePageChange = (newPage) => {
      console.log(newPage,"newPage")
      
      setCurrentPage(newPage);
    };

   


  return (
    <div className={styles['languages-container']}>
      <p>Here we are displaying the details of Languages:</p>

      <button onClick={() => setShowAddModal(true)} className={styles['languages-add-button']}>
        Add Language
      </button>

      {showAddModal && (
        <div className={styles['languages-modal']}>
          <div className={styles['languages-modal-content']}>
            <h2>Add Language</h2>
            <label>
              Name:
              <input
                type="text"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              />
            </label>
            <label>
              Code:
              <input
                type="text"
                value={newLanguage.code}
                onChange={(e) => setNewLanguage({ ...newLanguage, code: e.target.value })}
              />
            </label>
            <button onClick={handleAddLanguage}>Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
     ) }

      {isLoading ? (
        <p className={styles['loading']}>Loading...</p>
      ) : (
        <table className={styles['language-table']}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {languagesData.map((language, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{language.name}</td>
                <td>{language.code}</td>
                <td><button onClick={() => handleDelete(language.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
      )}
     <div className={styles['pagination']}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          // disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Languages;

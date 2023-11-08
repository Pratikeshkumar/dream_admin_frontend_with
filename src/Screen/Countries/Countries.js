import React, { useEffect, useState } from "react";
import "./Countries.css";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";
const countriesApis = require("../../apis/countries");

function Countries() {
  const [isLoading, setIsLoading] = useState(true);
  const [countriesData, setCountriesData] = useState([]);
  const [editedCountry, setEditedCountry] = useState("");
  const [editedRegion, setEditedRegion] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRegion, setNewRegion] = useState("");
  const [newCountries, setNewCountries] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const countriesOnCurrentPage = countriesData.slice(startIndex, endIndex);

  const groupedCountries = countriesOnCurrentPage.reduce((groups, country) => {
    const region = country.region;
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(country);
    return groups;
  }, {});

  const regionNames = Object.keys(groupedCountries);

  const totalPages = Math.ceil(regionNames.length / itemsPerPage);
  console.log(totalPages);
  const showNextButton = currentPage < totalPages;

  const renderPageNumbers = regionNames.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginationButtons = renderPageNumbers.map((region, index) => (
    <div key={region}>
      <h2
        style={{
          color: "#000",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
        }}
      >
        {region} Region
      </h2>
      <table
        style={{ width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
      >
        <thead>
          <tr>
            <th
              style={{
                color: "#000",
                padding: "10px",
                border: "1px solid #ccc",
                borderTopLeftRadius: "4px",
              }}
            >
              Country
            </th>
            <th
              style={{
                color: "#000",
                padding: "10px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderTopRightRadius: "4px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {groupedCountries[region].map((country, index) => (
            <tr key={country.name}>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderBottomLeftRadius: "4px",
                }}
              >
                {country.name}
              </td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderBottomRightRadius: "4px",
                }}
              >
                <button
                  onClick={() => handleEdit(country.name, country.region)}
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    margin: "0 5px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => setCountryToDelete(country)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "10px 16px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ));

  const getAllCountries = async () => {
    setIsLoading(true);
    try {
      const result = await countriesApis.getAllCountries();
      console.log(result.data)
      const userData = result.data;
      const filteredUsers = userData.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setCountriesData(filteredUsers);
    } catch (error) {
      console.error("Error fetching countries.", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, [searchTerm]);

  const handleEdit = (country, region) => {
    setEditedCountry(country);
    setEditedRegion(region);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = await countriesApis.updateAllCountries(
        editedCountry,
        editedRegion
      );
      console.log("Updated data:", updatedData);
      setShowModal(false);
      getAllCountries();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    if (!countryToDelete) {
      return;
    }
    try {
      await countriesApis.deleteCountry(countryToDelete);
      setShowModal(false);
      getAllCountries();
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleAddCountry = () => {
    const newCountry = {
      region: newRegion,
      countries: newCountries.split(",").map((country) => country.trim()),
    };
    countriesApis.addAllCountries(newCountry);
    setShowAddModal(false);
    getAllCountries();
  };

  return (
    <IncludeSideBar> 
    <div>
      <div className="Header">List of All Countries</div>
      <button
        onClick={handleOpenAddModal}
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          padding: "10px 16px",
          margin: "10px 0",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Add Countries
      </button>
      <div>
        <input
          className="search-input"
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          className="search-button"
          onClick={() => setCurrentPage(1)}
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            margin: "5px 0 0 5px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <div className="loader">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
        </div>
      ) : (
        <div>
          <div>
            {paginationButtons}
            {showNextButton && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  padding: "10px 16px",
                  margin: "10px 0",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>Edit Country and Region</h2>
            <label>
              Country:
              <input
                type="text"
                value={editedCountry}
                onChange={(e) => setEditedCountry(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>
            <label>
              Region:
              <input
                type="text"
                value={editedRegion}
                onChange={(e) => setEditedRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>
            <button
              onClick={handleUpdate}
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                margin: "10px 10px 0 0",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{
                backgroundColor: "#ccc",
                color: "#333",
                border: "none",
                padding: "10px 16px",
                margin: "10px 0",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "4px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>Add Countries</h2>
            <label>
              Region:
              <input
                type="text"
                value={newRegion}
                onChange={(e) => setNewRegion(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>
            <label>
              Countries (comma-separated):
              <input
                type="text"
                value={newCountries}
                onChange={(e) => setNewCountries(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </label>
            <button
              style={{
                backgroundColor: "#a83242",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                margin: "10px 10px 0 0",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={handleAddCountry}
            >
              submit
            </button>
            <button
              style={{
                backgroundColor: "#ccc",
                color: "#333",
                border: "none",
                padding: "10px 16px",
                margin: "10px 0",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
    </IncludeSideBar>
  );
}

export default Countries;

// import React, { useEffect, useState } from 'react';
// import IncludeSideBar from '../../Components/Sidebar/IncludeSideBar';
// import './Cities.css'
// const citiesApis = require('../../apis/cites');

// function Cities() {
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getAllCities = async () => {
//     setIsLoading(true);
//     try {
//       const result = await citiesApis.getAllCities(1, 10);
//       setCities(result.data);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllCities();
//   }, []);

//   return (

//       <div>
//         <h1>Cities</h1>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error fetching cities: {error.message}</p>
//         ) : (
//           <table className="city-table">
//             <thead>
//               <tr>
//                 <th>No.</th>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cities.map((city, index) => (
//                 <tr key={city.id}>
//                   <td>{index + 1}</td>
//                   <td>{city.name}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//   );
// }

// export default Cities;

import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";
import "./Cities.css";
const citiesApis = require("../../apis/cites");

function Cities() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [newCity, setNewCity] = useState({
    id: "",
    name: "",
    state_id: "",
    state_code: "",
    country_id: "",
    country_code: "",
    latitude: "",
    longitude: "",
    flag: "",
    wikiDataId: "",
    active: true,
  });

  const getAllCities = async () => {
    setIsLoading(true);
    try {
      const result = await citiesApis.getAllCities(1, 10);
      setCities(result.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const addCity = async () => {
    try {
      // Make an HTTP POST request to your backend API to add the city
      await citiesApis.addAllCities(newCity); // Assuming your API accepts the entire city object
      // After adding the city, refresh the city list
      getAllCities();
      // Clear the input fields by resetting the newCity state
      setNewCity({
        name: "",
        state_id: "",
        state_code: "",
        country_id: "",
        country_code: "",
        latitude: "",
        longitude: "",
        flag: "",
        wikiDataId: "",
        active: true,
      });
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getAllCities();
  }, []);

  return (
    <div>
      <div className="Header" > Cities</div>
      <div>
  <form>
    <div className="form-row">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={newCity.name}
          onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>State ID:</label>
        <input
          type="text"
          value={newCity.state_id}
          onChange={(e) => setNewCity({ ...newCity, state_id: e.target.value })}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>State Code:</label>
        <input
          type="text"
          value={newCity.state_code}
          onChange={(e) => setNewCity({ ...newCity, state_code: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Country Code:</label>
        <input
          type="text"
          value={newCity.country_code}
          onChange={(e) => setNewCity({ ...newCity, country_code: e.target.value })}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Latitude:</label>
        <input
          type="text"
          value={newCity.latitude}
          onChange={(e) => setNewCity({ ...newCity, latitude: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Longitude:</label>
        <input
          type="text"
          value={newCity.longitude}
          onChange={(e) => setNewCity({ ...newCity, longitude: e.target.value })}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Flag:</label>
        <input
          type="text"
          value={newCity.flag}
          onChange={(e) => setNewCity({ ...newCity, flag: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>WikiData ID:</label>
        <input
          type="text"
          value={newCity.wikiDataId}
          onChange={(e) => setNewCity({ ...newCity, wikiDataId: e.target.value })}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Active:</label>
        <input
          type="checkbox"
          checked={newCity.active}
          onChange={(e) => setNewCity({ ...newCity, active: e.target.checked })}
        />
      </div>
    </div>
    <button type="button" onClick={addCity}>
      Add City
    </button>
  </form>
</div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching cities: {error.message}</p>
      ) : (
        <table className="city-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>

              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>{city.name}</td>

                <td>{city.active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cities;

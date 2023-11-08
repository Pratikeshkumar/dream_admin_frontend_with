import React, { useEffect, useState } from "react";
import IncludeSideBar from "../../Components/Sidebar/IncludeSideBar";
import './GiftScreen.css';
const GiftListingsapi = require("../../apis/gift_listing");


function GiftsScreen() {
  const [giftListings, setGiftListings] = useState([]);
  const [giftData, setGiftData] = useState({
    gift_image: null,
    gift_name: "",
    cost: "",
    category: "functional",
  });
  const [filteredGiftListings, setFilteredGiftListings] = useState([]);
  const [activeCategory, setActiveCategory] = useState("functional");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const fileValue = type === "file" ? files[0] : value;
    setGiftData({ ...giftData, [name]: fileValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gift_image", giftData.gift_image);
    formData.append("gift_name", giftData.gift_name);
    formData.append("cost", giftData.cost);
    formData.append("category", giftData.category);

    try {
      const response = await GiftListingsapi.addGiftListing(formData);
      console.log(response, "hgfc")


      setGiftData({
        gift_image: null,
        gift_name: "",
        cost: "",
        category: "functional",
      });
      getGiftListing();
      // getGiftListing(); // Refresh the list of gift listings

    } catch (error) {
      console.error("Error adding gift listing:", error);
    }
  };

  const getGiftListing = async () => {
    try {
      const response = await GiftListingsapi.getGiftListing();
      console.log(response, "newresponse");
      setGiftListings(response.data);
    } catch (error) {
      console.error("Error fetching gift listings:", error);
    }
  };

  useEffect(() => {
    getGiftListing();
  }, []);

  useEffect(() => {
    // Initialize filteredGiftListings with all gift listings
    setFilteredGiftListings(giftListings);
  }, [giftListings]);


  const filterGifts = (category) => {
    setActiveCategory(category);
    // Filter the gift listings based on the selected category
    const filtered = giftListings.filter((gift) => gift.category === category);
    setFilteredGiftListings(filtered);
  };



  const handleDeleteGift = async (giftId) => {
    try {
      // Send a request to your API to delete the gift by its ID
      await GiftListingsapi.deleteGiftListing(giftId);
      // After successful deletion, update the gift listings
      getGiftListing();
    } catch (error) {
      console.error("Error deleting gift:", error);
    }
  };



  return (
    <IncludeSideBar> 
    <div>
     <div className="header">Gift Section</div>
     <button onClick={toggleFormVisibility} className="add-gift-button">
        Add Gift
      </button>

     {isFormVisible &&  <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="giftImage">Gift Image:</label>
          <input
            type="file"
            id="giftImage"
            name="gift_image"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label htmlFor="giftName">Gift Name:</label>
          <input
            type="text"
            id="giftName"
            name="gift_name"
            value={giftData.gift_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cost">Cost:</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={giftData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={giftData.category}
            onChange={handleChange}
          >
            <option value="functional">Functional</option>
            <option value="mood">Mood</option>
            <option value="vipGifts">VIP Gifts</option>
          </select>
        </div>
        <button type="submit">Add Gift Listing</button>
      </form>
      }


      <div className="category-buttons">
        <button
          className={`button ${activeCategory === "functional" ? "active" : ""}`}
          onClick={() => filterGifts("functional")}
        >
          Functional
        </button>
        <button
          className={`button ${activeCategory === "mood" ? "active" : ""}`}
          onClick={() => filterGifts("mood")}
        >
          Mood
        </button>
        <button
          className={`button ${activeCategory === "vipGifts" ? "active" : ""}`}
          onClick={() => filterGifts("vipGifts")}
        >
          VIP Gifts
        </button>
      </div>



      <div className="card-container">
        {filteredGiftListings.map((gift) => (
          <div key={gift.id} className="card">
            <img
              src={`https://dpcst9y3un003.cloudfront.net/${gift.gift_image}`}
              alt={`Gift Image ${gift.id}`}
              className="image"
            />
            <div className="card-details">
              <div>
                <strong>Gift Name:</strong> {gift.gift_name}
              </div>
              <div>
                <strong>Cost:</strong> {gift.cost}
              </div>
              <div>
                <strong>Category:</strong> {gift.category}
              </div>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteGift(gift.id)}
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
    </IncludeSideBar>
  );
}

export default GiftsScreen;

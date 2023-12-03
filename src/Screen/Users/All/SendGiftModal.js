import React, { useState, useEffect } from 'react';
const GiftListingsapi = require("../../../apis/gift_listing");

const SendGiftModal = ({ showSendGiftModal, closeSendGiftModal }) => {


    const allUserApis = require("../../../apis/users");


    const [giftList, setGiftList] = useState([]);
    const [activeCategory, setActiveCategory] = useState('functional');
    const [activeButton, setActiveButton] = useState('functional');
    console.log(giftList,"gvfygv")



    const modalStyle = {
        display: showSendGiftModal ? 'block' : 'none',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    };

    const modalContentStyle = {
        backgroundColor: '#fefefe',
        margin: '10% auto',
        padding: '20px',
        border: '1px solid #888',
        width: '80%',
        maxHeight: '80%',
        overflowY: 'auto'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse'
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center'
    };

    const buttonStyle = {
        padding: '8px 16px',
        margin: '4px',
        background: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const getGiftListing = async () => {
        try {
            const response = await GiftListingsapi.getGiftListing();
            setGiftList(response.data);
        } catch (error) {
            console.error('Error fetching gift listings:', error);
        }
    };

    useEffect(() => {
        getGiftListing();
    }, []);

    const filterByCategory = (category) => {
        setActiveCategory(category);
        setActiveButton(category);
    };

    const sendGift = (giftId) => {
        console.log(`Sending gift with ID: ${giftId}`);

    };

    return (
        <div className="modal" style={modalStyle}>
            <div className="modal-content" style={modalContentStyle}>
                <span className="close" onClick={closeSendGiftModal}>&times;</span>
                <h2 style={{ textAlign: 'center', color: 'black', marginBottom: '20px' }}>Welcome to Gift Section</h2>

                <div style={{ textAlign: 'center', marginBottom: "2%" }}>
                    <button style={{
                        backgroundColor: activeButton === 'functional' ? 'red' : 'blue',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                        marginRight: '10px' // Added margin between the buttons
                    }} onClick={() => filterByCategory('functional')}>Functional</button>
                    <button style={{
                        backgroundColor: activeButton === 'mood' ? 'red' : 'blue',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                        marginRight: '10px' // Added margin between the buttons
                    }} onClick={() => filterByCategory('mood')}>Mood</button>
                    <button style={{
                        backgroundColor: activeButton === 'vipGifts' ? 'red' : 'blue',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
                    }} onClick={() => filterByCategory('vipGifts')}>VIP</button>
                </div>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Gift Name</th>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Cost</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {giftList
                            .filter(gift => gift.category === activeCategory)
                            .map((gift, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{gift.gift_name}</td>
                                    <td style={tdStyle}>
                                        <img
                                            src={`https://dpcst9y3un003.cloudfront.net/${gift.gift_image}`}
                                            alt={`Gift Image ${gift.id}`}
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                    </td>
                                    <td style={tdStyle}>{gift.category}</td>
                                    <td style={tdStyle}>{gift.cost} coins</td>

                                    <td style={tdStyle}>
                                        <button style={buttonStyle} onClick={() => sendGift(gift.id)}>Send</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SendGiftModal;

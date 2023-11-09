import React, { useEffect } from 'react'
import IncludeSideBar from '../../../Components/Sidebar/IncludeSideBar'


function AccoumplishedPromotions() {
  const promotionApis= require('../../../apis/promotion')

  const getPromotion = async () => {
    
    try {
      const response = await promotionApis.getAllPromotion();
      console.log(response,"promotion")
      
    } catch (error) {
      console.error('Error fetching promotion :', error);
      
    }
  };
  useEffect(()=>{
    getPromotion()
  },[])

  return (
    <IncludeSideBar>
        <div>
            <p>
                Here we are displaying the Accomplished Promotions.
            </p>
        </div>
    </IncludeSideBar>
  )
}

export default AccoumplishedPromotions
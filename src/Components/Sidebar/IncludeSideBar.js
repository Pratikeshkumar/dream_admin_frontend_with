import React from 'react'
import Sidebar from './Sidebar'

const IncludeSideBar = ({children}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-around',width:"100%"}}>
            <div style={{width:'25%'}}>
            <Sidebar />
            </div>
           
            <div style={{backgroundColor:'#fff',width:'79%'}}>
            {children}

                </div>
        </div>
    )
}

export default IncludeSideBar
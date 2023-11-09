import React from 'react'
import Sidebar from './Sidebar'

const IncludeSideBar = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
            <div style={{ zIndex: 0 }}>
                <Sidebar />
            </div>

            <div style={{ backgroundColor: '#fff', flex: 1 }}>
                {children}

            </div>
        </div>
    )
}

export default IncludeSideBar
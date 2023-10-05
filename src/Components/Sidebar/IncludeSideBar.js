import React from 'react'
import Sidebar from './Sidebar'

const IncludeSideBar = ({children}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Sidebar />
            {children}
        </div>
    )
}

export default IncludeSideBar
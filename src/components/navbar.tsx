import React from 'react';
import '../assets/homepage.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='logo'>
                {/* అడుగు */}
                Search Web
            </div>
            <div className='icons'>
                <SettingsIcon/>
                <AccountCircleIcon/>
            </div>
        </div>
    )
}

export default Navbar;
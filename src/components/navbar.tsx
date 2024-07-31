import React from 'react';
import '../assets/homepage.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useDispatch, useSelector } from 'react-redux';
import slice from '../state/Slice';

function Navbar() {
    const dispatch = useDispatch();
    const lightMode = useSelector((state: any) => state.isLightMode);
    const onClickLightMode = () => dispatch(slice.actions.setLightMode({lightMode: !lightMode}));

    return (
        <div className='navbar'>
            <div className='logo'>
                Search Web
            </div>
            <div className='icons'>
                <SettingsIcon/>
                <AccountCircleIcon/>
                <div onClick={onClickLightMode}>{
                    lightMode ? <NightlightIcon/>
                    : <LightModeIcon/> 
                }</div>
            </div>
        </div>
    )
}

export default Navbar;
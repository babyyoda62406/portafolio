import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import './LanguagesFC.css'

const LanguagesFC = () => {
    const [value, setValue] = React.useState('recents');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event
        setValue(newValue);
    };

    return <div className='LanguagesFC'>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />}/>
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />}/>
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
            
        </BottomNavigation>
    </div>
}


export default LanguagesFC
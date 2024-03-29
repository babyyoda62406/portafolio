import './Nabvar.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalConext';

const Nabvar = ()=>{
    const {setLayoutID} = useContext(GlobalContext)
    return <div className="Nabvar">
                <div>
                    <BottomNavigation 
                        showLabels
                        onChange={( event, newValue) => {
                            event
                            setLayoutID(newValue)
                        }}
                    >
                    <BottomNavigationAction label="Inicio" />
                    <BottomNavigationAction label="Favorites"  />
                    <BottomNavigationAction label="Nearby"  />
                    <BottomNavigationAction label="Favorites"  />
                    <BottomNavigationAction label="Nearby"  />
                    </BottomNavigation>
                </div>
    </div>
}




export default Nabvar
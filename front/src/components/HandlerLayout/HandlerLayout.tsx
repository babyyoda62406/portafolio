import { useContext } from "react"
import { GlobalContext } from "../../contexts/GlobalConext"
import Home from "../../pages/Home/Home"

const HandlerLayout = ()=>{
    const {layoutID} = useContext(GlobalContext)
    
    let screen = <div>Adios</div>
    switch (layoutID) {
        case 0:
            screen = <Home />
            break;
        case 1:
            screen = <div> Pestaña 1</div>
            break ; 
        case 2:

            break 
        default:
            break;
    }
    return <div>
        {screen}
    </div>
}

export default HandlerLayout


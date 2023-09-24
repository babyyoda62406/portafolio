import { useContext } from "react"
import { GlobalContext } from "../../contexts/GlobalConext"

const HandlerLayout = ()=>{
    const {layoutID} = useContext(GlobalContext)
    
    let screen = <div>Adios</div>
    switch (layoutID) {
        case 0:
            screen = <div>Hola</div>
            break;
        default:
            break;
    }
    return <div>
        {screen}
    </div>
}

export default HandlerLayout


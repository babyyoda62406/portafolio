import './Home.css'
import Nabvar from '../../components/Nabvar/Nabvar';
import Welcome from '../../components/Welcome/Welcome';
import StatisticComponent from '../../components/StatisticComponent/StatisticComponent';
const Home = ()=>{
    return <div className="Home">
        <Nabvar />
        <Welcome />
        <StatisticComponent />
    </div>
}




export default Home
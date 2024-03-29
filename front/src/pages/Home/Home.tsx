import './Home.css'
import Nabvar from '../../components/Nabvar/Nabvar';
import Welcome from '../../components/Welcome/Welcome';
import StatisticComponent from '../../components/StatisticComponent/StatisticComponent';
import TimelineComponent from '../../components/TimelineComponent/TimelineComponent';
import { projects } from '../../data/data';

const Home = ()=>{
    return <div className="Home">
        <Nabvar />
        <Welcome />
        <StatisticComponent />
        <TimelineComponent items ={projects} />
    </div>
}




export default Home
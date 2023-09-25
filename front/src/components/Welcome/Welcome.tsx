import './Welcome.css'
import Typewriter from '../Typewriter/Typewriter'
import SocialMediaBar from '../SocialMediaBar/SocialMediaBar';
import { Tilt } from 'react-tilt';




const Welcome = () => {
    const textArray = ["Transformando ideas en experiencias digitales."
        , "Creando soluciones web a medida para tu negocio."
        , "Innovación y creatividad en cada línea de código."
        , "Diseño web elegante y funcional a tu alcance."
        , "Tu visión, nuestra tecnología: Juntos hacemos realidad tu proyecto web."]
    return <div className="Welcome">
        <div className="ctLeft">
            <div className='title1'>
                Hola, mi nombre es
            </div>

            <div className='title2'>
                <div className='textUnderline'>
                    <div>Deivis</div>
                    <div className='underLine'>

                    </div>
                </div>
                <div>
                    Torres
                </div>
            </div>
            <div className='title3'>
                <Typewriter textArray={textArray} typingSpeed={80} erasingSpeed={50} pauseBeforeErasing={30000} />
            </div>
            <div className='ctRedes'>
                <SocialMediaBar />
            </div>
        </div>
        <div className='ctRigth'>
            <Tilt className="Tilt" options={{ max: 25 }}>
                <div className="Tilt-inner">
                    <img src="./src/assets/background/programador web.png" alt="" />
                </div>
            </Tilt>
        </div>
        <div className='ctLast'>
            <div className='Text'>
                DEV
            </div>
        </div>

    </div>
}

export default Welcome
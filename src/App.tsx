import './App.css';
import Ground from './assets/backgrounds/hills/ground.svg';
import Hill1 from './assets/backgrounds/hills/hill_1.svg';
import Hill2 from './assets/backgrounds/hills/hill_2.svg';
import Hill3 from './assets/backgrounds/hills/hill_3.svg';
import Hill4 from './assets/backgrounds/hills/hill_4.svg';
import Hill5 from './assets/backgrounds/hills/hill_5.svg';
import Hill6 from './assets/backgrounds/hills/hill_6.svg';
import Me from './assets/images/ski.png';
import ParallaxHill from './components/ParallaxHill.tsx';

function App() {
    return (
        <>
        <div className={'landscape'}>
            <div className={'hill-wrapper'}>
                <ParallaxHill src={Ground} alt={'Ground'} className={'hill ground'} speed={0.1} />
                <ParallaxHill src={Hill1} alt={'Hill1'} className={'hill hill-1'} speed={0.2} />
                <ParallaxHill src={Hill2} alt={'Hill2'} className={'hill hill-2'} speed={0.3} />
                <ParallaxHill src={Hill3} alt={'Hill3'} className={'hill hill-3'} speed={0.4} />
                <ParallaxHill src={Hill4} alt={'Hill4'} className={'hill hill-4'} speed={0.5} />
                <ParallaxHill src={Hill5} alt={'Hill5'} className={'hill hill-5'} speed={0.6} />
                <ParallaxHill src={Hill6} alt={'Hill6'} className={'hill hill-6'} speed={0.7} />
            </div>
        </div>
            <div className={'header card'}>
                <img className={'my-photo'} src={Me} alt={'Fraser W Levack'}/>
                <div>
                    <h1 className={'my-name'}> Fraser Levack </h1>
                    <h3 className={'my-title'}> Software Developer </h3>
                </div>

            </div>
        </>
    );
}

export default App;
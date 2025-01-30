import './App.css'
import Ground from './assets/backgrounds/hills/ground.svg'
import Hill1 from './assets/backgrounds/hills/hill_1.svg'
import Hill2 from './assets/backgrounds/hills/hill_2.svg'
import Hill3 from './assets/backgrounds/hills/hill_3.svg'
import Hill4 from './assets/backgrounds/hills/hill_4.svg'
import Hill5 from './assets/backgrounds/hills/hill_5.svg'
import Hill6 from './assets/backgrounds/hills/hill_6.svg'



function App() {
    return (
        <div className={'landscape'}>
            <div className={'hill-wrapper'}>
                <img src={Ground} alt={'Ground'} className={'hill ground'}/>
                <img src={Hill1} alt={'Hill1'} className={'hill hill-1'}/>
                <img src={Hill2} alt={'Hill2'} className={'hill hill-2'}/>
                <img src={Hill3} alt={'Hill3'} className={'hill hill-3'}/>
                <img src={Hill4} alt={'Hill4'} className={'hill hill-4'}/>
                <img src={Hill5} alt={'Hill5'} className={'hill hill-5'}/>
                <img src={Hill6} alt={'Hill6'} className={'hill hill-6'}/>
            </div>
        </div>
    )
}

export default App
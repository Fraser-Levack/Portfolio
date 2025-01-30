import './App.css';
import Ground from './assets/backgrounds/hills/ground.svg';
import Hill1 from './assets/backgrounds/hills/hill_1.svg';
import Hill2 from './assets/backgrounds/hills/hill_2.svg';
import Hill3 from './assets/backgrounds/hills/hill_3.svg';
import Hill4 from './assets/backgrounds/hills/hill_4.svg';
import Hill5 from './assets/backgrounds/hills/hill_5.svg';
import Hill6 from './assets/backgrounds/hills/hill_6.svg';

import Me from './assets/images/ski.png';

import MapPin from './assets/icons/map-pin.svg';
import Scot from './assets/icons/scot.svg';
import GitHub from './assets/icons/github.svg';
import LinkedIn from './assets/icons/linkedin.svg';
import Mail from './assets/icons/mail.svg';
import Phone from './assets/icons/phone.svg';

import Typescript from './assets/icons/languages/typescript.svg';
import Python from './assets/icons/languages/python.svg';
import Java from './assets/icons/languages/java.svg';
import C from './assets/icons/languages/c.svg';
import Cpp from './assets/icons/languages/cpp.svg';
import HTML from './assets/icons/languages/html.svg';
import CSS from './assets/icons/languages/css.svg';

import ReactIcon from './assets/icons/technologies/react.svg';
import Django from './assets/icons/technologies/django.svg';
import Vite from './assets/icons/technologies/vite.svg';
import Node from './assets/icons/technologies/node.svg';
import Firebase from './assets/icons/technologies/firebase.svg';
import Deno from './assets/icons/technologies/deno.svg';
import Cloudinary from './assets/icons/technologies/cloudinary.svg';

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
                <div className={'header-content'}>
                    <h1 className={'my-name'}> Fraser Levack </h1>
                    <h3 className={'my-title'}> Software Developer </h3>
                    <div className={'info-tag'}>
                        <img src={MapPin} alt={'Location'}/>
                        <p> Glasgow, Scotland </p>
                        <img src={Scot} alt={'scotland'}/>
                    </div>
                    <div className={'line-break'}/>
                    <div className={'info-tag'}>
                        <a href="https://github.com/Fraser-Levack" target="_blank" rel="noopener noreferrer">
                            <img src={GitHub} alt={'Github'} className={'social-link'}/>
                        </a>
                        <a href="https://www.linkedin.com/in/fraser-levack/" target="_blank" rel="noopener noreferrer">
                            <img src={LinkedIn} alt={'LinkedIn'} className={'social-link'}/>
                        </a>
                        <a href="mailto:flevack28@gmail.com">
                            <img src={Mail} alt={'Email'} className={'social-link'}/>
                        </a>
                        <a href="tel:07724349134">
                            <img src={Phone} alt={'Phone'} className={'social-link'}/>
                        </a>
                    </div>
                    <div className={'line-break'}/>
                    <div className={'info-tag languages'}>
                        {/*<p><strong><sub> Proficient in: </sub></strong></p>*/}
                        <img src={Typescript} alt={'Typescript'} className={'language-icon'}/>
                        <img src={Python} alt={'Python'} className={'language-icon'}/>
                        <img src={Java} alt={'Java'} className={'language-icon'}/>
                        <img src={C} alt={'C'} className={'language-icon'}/>
                        <img src={Cpp} alt={'C++'} className={'language-icon'}/>
                        <img src={HTML} alt={'HTML'} className={'language-icon'}/>
                        <img src={CSS} alt={'CSS'} className={'language-icon'}/>
                    </div>
                    <div className={'info-tag technologies'}>
                        {/*<p><strong><sub> Technologies I use: </sub></strong></p>*/}
                        <img  src={ReactIcon} alt={'React'} className={'technology-icon'}/>
                        <img  src={Django} alt={'Django'} className={'technology-icon'}/>
                        <img  src={Vite} alt={'Vite'} className={'technology-icon'}/>
                        <img  src={Node} alt={'Node'} className={'technology-icon'}/>
                        <img  src={Firebase} alt={'Firebase'} className={'technology-icon'}/>
                        <img  src={Deno} alt={'Deno'} className={'technology-icon'}/>
                        <img src={Cloudinary} alt={'Cloudinary'} className={'technology-icon'}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
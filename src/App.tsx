import { useEffect, useState } from 'react';
import './styles/App.css';
// import Ground from './assets/backgrounds/hills/ground.svg';
import Hill1 from './assets/backgrounds/hills/hill_1.svg';
import Hill2 from './assets/backgrounds/hills/hill_2.svg';
import Hill3 from './assets/backgrounds/hills/hill_3.svg';
import Hill4 from './assets/backgrounds/hills/hill_4.svg';
import Hill5 from './assets/backgrounds/hills/hill_5.svg';
// import Hill6 from './assets/backgrounds/hills/hill_6.svg';

import Me from './assets/images/ski.png';

import MapPin from './assets/icons/map-pin.svg';
import Scot from './assets/icons/scot.svg';
import GitHub from './assets/icons/github.svg';
import LinkedIn from './assets/icons/linkedin.svg';
import Mail from './assets/icons/mail.svg';
// import Phone from './assets/icons/phone.svg';
import TextFile from './assets/icons/file-text.svg'
import Smile from './assets/icons/smile.svg';

import MapPinLight from './assets/icons/map-pin-light.svg';
import GitHubLight from './assets/icons/github-light.svg';
import LinkedInLight from './assets/icons/linkedin-light.svg';
import MailLight from './assets/icons/mail-light.svg';
// import PhoneLight from './assets/icons/phone-light.svg';
import TextFileLight from './assets/icons/file-text-light.svg'
import SmileLight from './assets/icons/smile-light.svg';

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

// import University from './assets/backgrounds/Uni_Silhouette.svg';

import Surf from './assets/images/surf.jpg';

import ParallaxHill from './components/ParallaxHill.tsx';

import Icon from './components/Icon.tsx';

import Project from './components/Project.tsx';

import Dfd from './assets/images/projects/dfd.webp';
import OffAxis from './assets/images/projects/OffAxis.webp';
import DjangoJam from './assets/images/projects/DjangoJam.webp';
import Cpaint from './assets/images/projects/cpaint.webp';

function App() {
    const [aboutMe, setAboutMe] = useState(false);

    function handleAboutMe() {
        setAboutMe(!aboutMe);
    }

    useEffect(() => {
        const experienceItems = document.querySelectorAll('.experience-item');
        const timelineMarks = document.querySelectorAll('.timeline-mark');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const index = Array.from(experienceItems).indexOf(entry.target);
                if (entry.isIntersecting) {
                    timelineMarks.forEach(mark => mark.classList.remove('highlight'));
                    experienceItems.forEach(item => item.classList.remove('highlight'));
                    timelineMarks[index].classList.add('highlight');
                    experienceItems[index].classList.add('highlight');
                }
            });
        }, { threshold: 0.5, rootMargin: '-25% 0px -25% 0px' });

        experienceItems.forEach((item) => {
            observer.observe(item);
        });

        return () => {
            experienceItems.forEach((item) => {
                observer.unobserve(item);
            });
        };
    }, []);

    return (
        <>
            <div className={'landscape'}>
                <div className={'hill-wrapper'}>
                    {/*<ParallaxHill src={Ground} alt={'Ground'} className={'hill ground'} speed={0.1} />*/}
                    <ParallaxHill src={Hill1} alt={'Hill1'} className={'hill hill-1'} speed={0.2} />
                    <ParallaxHill src={Hill2} alt={'Hill2'} className={'hill hill-2'} speed={0.3} />
                    <ParallaxHill src={Hill3} alt={'Hill3'} className={'hill hill-3'} speed={0.4} />
                    <ParallaxHill src={Hill4} alt={'Hill4'} className={'hill hill-4'} speed={0.5} />
                    <ParallaxHill src={Hill5} alt={'Hill5'} className={'hill hill-5'} speed={0.6} />
                    {/*<ParallaxHill src={Hill6} alt={'Hill6'} className={'hill hill-6'} speed={0.7} />*/}
                </div>
            </div>
            <div className={'header card'}>
                <img className={'my-photo'} src={Me} alt={'Fraser W Levack'}/>
                <div className={'header-content'}>
                    <h1 className={'my-name'}> Fraser Levack </h1>
                    <h3 className={'my-title'}> Full Stack Developer </h3>
                    <div className={'info-tag'}>
                        <img src={MapPin} alt={'Location'} className={'dark'}/>
                        <img src={MapPinLight} alt={'Location'} className={'light'}/>
                        <p> Glasgow, Scotland </p>
                        <img src={Scot} alt={'scotland'}/>
                    </div>
                    <div className={'line-break'}/>
                    <div className={'info-tag'}>
                        <a href="https://github.com/Fraser-Levack" target="_blank" rel="noopener noreferrer">
                            <Icon src={GitHub} alt={'Github'} className={'social-link dark'} name={'GitHub'}/>
                            <Icon src={GitHubLight} alt={'Github'} className={'social-link light'} name={'GitHub'}/>
                        </a>
                        <a href="https://www.linkedin.com/in/fraser-levack/" target="_blank" rel="noopener noreferrer">
                            <Icon src={LinkedIn} alt={'LinkedIn'} className={'social-link dark'} name={'LinkedIn'}/>
                            <Icon src={LinkedInLight} alt={'LinkedIn'} className={'social-link light'} name={'LinkedIn'}/>
                        </a>
                        <a href="mailto:flevack28@gmail.com">
                            <Icon src={Mail} alt={'Email'} className={'social-link dark'} name={'Email'}/>
                            <Icon src={MailLight} alt={'Email'} className={'social-link light'} name={'Email'}/>
                        </a>
                        <a href="/documents/Fraser_W_Levack_CV_2025.pdf" target="_blank" rel="noopener noreferrer" type="application/pdf">
                            <Icon src={TextFile} alt={'CV'} className={'social-link dark'} name={'My CV'}/>
                            <Icon src={TextFileLight} alt={'CV'} className={'social-link light'} name={'My CV'}/>
                        </a>
                        <div className={'about-me-link'} onClick={handleAboutMe}>
                            <Icon src={Smile} alt={'About Me'} className={'social-link dark'} name={'About Me'}/>
                            <Icon src={SmileLight} alt={'About Me'} className={'social-link light'} name={'About Me'}/>
                        </div>
                    </div>
                    <div className={'line-break'}/>
                    <div className={`${aboutMe ? '' : 'hidden-info'}`}>
                        <p className={'about-me-text'}> Hi I am a full stack developer from scotland. I like coming
                            up with interesting solutions and I have a keen eye for detailed designs.</p>
                    </div>
                    <div className={`icon-info ${aboutMe ? 'hidden-info' : ''}`}>
                    <div className={'info-tag languages'}>
                        <Icon src={Typescript} alt={'Typescript'} className={'language-icon'} name={'TypeScript'}/>
                        <Icon src={Python} alt={'Python'} className={'language-icon'} name={'Python'}/>
                        <Icon src={Java} alt={'Java'} className={'language-icon'} name={'Java'}/>
                        <Icon src={C} alt={'C'} className={'language-icon'} name={'C'}/>
                        <Icon src={Cpp} alt={'C++'} className={'language-icon'} name={'C++'}/>
                        <Icon src={HTML} alt={'HTML'} className={'language-icon'} name={'HTML'}/>
                        <Icon src={CSS} alt={'CSS'} className={'language-icon'} name={'CSS'}/>
                    </div>
                    <div className={'info-tag technologies'}>
                        <Icon  src={ReactIcon} alt={'React'} className={'technology-icon'} name={'React'}/>
                        <Icon  src={Django} alt={'Django'} className={'technology-icon'} name={'Django'}/>
                        <Icon  src={Vite} alt={'Vite'} className={'technology-icon'} name={'Vite'}/>
                        <Icon  src={Node} alt={'Node'} className={'technology-icon'} name={'Node.js'}/>
                        <Icon  src={Firebase} alt={'Firebase'} className={'technology-icon'} name={'Firebase'}/>
                        <Icon  src={Deno} alt={'Deno'} className={'technology-icon'} name={'Deno'}/>
                        <Icon src={Cloudinary} alt={'Cloudinary'} className={'technology-icon'} name={'Cloudinary'}/>
                    </div>
                    </div>
                </div>
            </div>
            <div className={'experience card'}>
                <div className={'vertical-timeline'}>
                    <div className={'timeline-line'}>
                        <div className={'timeline-mark'}/>
                        <div className={'timeline-mark'}/>
                        <div className={'timeline-mark'}/>
                    </div>
                </div>

                <div className={'experience-content'}>
                    <h1 className={'experience-header'}> My Experience </h1>
                    <div className={'experiences-container'}>
                        <div className={'experience-item'}>
                            <h3> Freelance Web developer </h3>
                            <div className={'experience-sub-info'}>
                                <p style={{color: '#4467e3'}}>Dundee University</p> <p className={'sub-info-mid'}> Typescript & React </p>
                                <p> 2024 - Present </p>
                            </div>
                            <p className={'experience-info'}> Full stack development for Dundee Uni, Duncan of Jordanstone College of Art & Design,
                                fifth year architecture course. Working with students to design and release a working
                                web CMS to display their work. </p>
                        </div>
                        <div className={'experience-item'}>
                            <h3> Software Developer & Team Chair </h3>
                            <div className={'experience-sub-info'}>
                                <p style={{color: '#1892be'}}>Off</p> <p style={{color: '#dd1167'}}>Axis</p> <p
                                style={{color: '#f7ef3b'}}>Gigs</p> <p className={'sub-info-mid'}> Django, HTML & JS </p> <p> 2024 - Present </p>
                            </div>
                            <p className={'experience-info'}> Co-ordinating a team to produce a working ticketing system for the gigs company
                                Off Axis Gigs. As well as tickets Off Axis Gigs gives a place for up and coming
                                artist to connect and support each other.</p>
                        </div>
                        <div className={'experience-item'}>
                            <h3> FullStack Mobile Developer </h3>
                            <div className={'experience-sub-info'}>
                                <p style={{color: '#98fb98'}}>Grove Gardening</p> <p className={'sub-info-mid'}> React Native </p> <p> 2024 - Present </p>
                            </div>
                            <p className={'experience-info'}> Using React Native, to produce a modern gardening mobile application.
                                Designed to be a efficient way for users to find gardeners nearby and
                                remove the hassle of organising dates for them to do gardening work.</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className={'university-scape'}>
                {/*<ParallaxHill src={University} alt={'University'} className={'university'} speed={0.1} />*/}
            </div>
            <div className={'projects card'}>
                <div className={'projects-top'} >
                    <div>
                        <h1 className={'projects-header'}> My Work & Projects </h1>
                        <img src={Surf} alt={'surf'} className={'surf-image'}/>
                    </div>
                </div>
                < div className={'projects-content'}>
                    <Project title={'Design for Displacement'} image={Dfd} growDirection={'left top'}
                             externalLink={'https://designfordisplacement.info/'}
                             githubLink={'https://github.com/Fraser-Levack/Design-for-Displacement'}>
                    <p> A modern stylistic website, with in built Content Management System (CMS). Made using
                        <strong> Typescript </strong> and <strong>React</strong> with a real time
                        database management system using <strong>Firebase</strong> and <strong>Cloudinary</strong> for
                        images and other media.</p>
                    </Project>
                    <Project title={'Off Axis Gigs'} image={OffAxis} growDirection={'right top'}
                             externalLink={'https://sh20.pythonanywhere.com/'}>
                    <p> A working all in one ticketing system for national gigs. A "batteries included" web application
                        made with <strong> Python</strong>'s <strong>Django</strong> framework as well
                        as <strong>JavaScript</strong> for client side rendering.</p>
                    </Project>
                    <Project title={'DjangoJam'} image={DjangoJam} growDirection={'left bottom'}
                             githubLink={'https://github.com/Team-5A/DjangoJam'}>
                    <p> Another musical <strong>Django</strong> based web application. DjangoJam allows a
                        users to create a musical tunes, from a on site piano keyboard.
                        KeyBoard functionality was made using <strong>JavaScript</strong>.</p>
                    </Project>
                    <Project title={'CPaint'} image={Cpaint} growDirection={'right bottom'}
                             githubLink={'https://github.com/Fraser-Levack/CPaint'}>
                    <p> A drawing application written entirely in <strong>C</strong>. CPaint come with three colours,
                        an undo and a clear function. On screen rendering is done by the GPU using <strong>OpenGL</strong> this
                        allow for a super responsive and efficient application.</p>
                    </Project>
                    <div className={'sudo-project'}/>
                    <div className={'sudo-project'}/>
                    <div className={'sudo-project'}/>
                    <div className={'sudo-project'}/>
                </div>
            </div>
            <div className={'blue-background'}>
            </div>
        </>
    );
}

export default App;
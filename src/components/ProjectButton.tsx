import LinkLight from '../assets/icons/link-light.svg';
import GitHubLight from '../assets/icons/github-light.svg';
import MinimizeLight from '../assets/icons/minimize-light.svg';

import '../styles/components/ProjectButton.css';

interface props {
    externalLink?: string;
    githubLink?: string;
}

function ProjectButton ({externalLink, githubLink}: props) {
    return (
        <div className={'project-button-container'} >
            {externalLink ?
                <a href={externalLink} target="_blank" rel="noopener noreferrer" className={'project-btn'} >
                    <img src={LinkLight} alt={'link'} />
                    <p> Live Site </p>
                </a> : null}
            {githubLink ?
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className={'project-btn'} >
                    <img src={GitHubLight} alt={'git-link'} />
                    <p> GitHub </p>
                </a> : null}
            {!externalLink && !githubLink ?
                <div className={'project-btn'} >
                    <img src={MinimizeLight} alt={'minimize'} />
                    <p> Close </p>
                </div> : null}
        </div>
    );
}

export default ProjectButton;
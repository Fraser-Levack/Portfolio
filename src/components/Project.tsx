import React, {useState} from "react";
import '../styles/components/Project.css';
import ProjectButton from './ProjectButton.tsx';

interface props {
    image?: string;
    title: string;
    growDirection?: string;
    children?: React.ReactNode;
    externalLink?: string;
    githubLink?: string;
}

function Project({image, title, growDirection, children, externalLink, githubLink}: props) {
    const [expanded, setExpanded] = useState(false);

    function handleExpand() {
        setExpanded(!expanded);
    }

  return (
    <div className={`project ${expanded ? 'expanded' : ''} ${growDirection ? growDirection : ''}`} onClick={handleExpand}>
      <h1 className={'project-title'}>{title}</h1>
      <img src={image} alt={title} className={'project-image'}/>
      <p className={expanded ? 'hidden-content' : ''}> Click for more Info! </p>
      <div className={`project-content ${expanded ? '' : 'hidden-content'}`}>
        {children}
      </div>
      <div className={`project-links ${expanded ? '' : 'hidden-content'}`}>
          {externalLink ? <ProjectButton externalLink={externalLink} /> : null}
          {githubLink ? <ProjectButton githubLink={githubLink} /> : null}
          <ProjectButton />
      </div>
    </div>
  );
}

export default Project;
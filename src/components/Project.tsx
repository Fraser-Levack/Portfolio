import {useState} from "react";
import '../styles/components/Project.css';

interface props {
    image?: string;
    title: string;
    growDirection?: string;
}

function Project({image, title, growDirection}: props) {
    const [expanded, setExpanded] = useState(false);

    function handleExpand() {
        setExpanded(!expanded);
    }

  return (
    <div className={`project ${expanded ? 'expanded' : ''} ${growDirection ? growDirection : ''}`} onClick={handleExpand}>
      <h1 className={'project-title'}>{title}</h1>
      <img src={image} alt={title} className={'project-image'}/>
      <p> Click for more Info! </p>
    </div>
  );
}

export default Project;
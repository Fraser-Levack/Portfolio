import '../styles/components/Project.css';

interface props {
    image?: string;
    title: string;
}

function Project({image, title}: props) {
  return (
    <div className={'project'}>
      <h1 className={'project-title'}>{title}</h1>
      <img src={image} alt={title} className={'project-image'}/>
    </div>
  );
}

export default Project;
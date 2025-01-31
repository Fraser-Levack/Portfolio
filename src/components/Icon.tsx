import '../styles/components/Icon.css';

interface props {
    src:string;
    alt:string;
    className?:string;
    name?:string;
}

function Icon({ src, alt, className = '', name }: props) {
    return (
        <div className="icon-container">
            <img src={src} alt={alt} className={className} />
            <div className="icon-name">{name}</div>
        </div>
    );
}

export default Icon;
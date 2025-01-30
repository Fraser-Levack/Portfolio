import React, { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ParallaxHillProps {
    src: string;
    alt: string;
    className: string;
    speed: number;
}

const ParallaxHill: React.FC<ParallaxHillProps> = ({ src, alt, className, speed }) => {
    const [props, set] = useSpring(() => ({
        transform: 'translateY(0px)',
    }));

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY * speed;
            console.log(`ScrollY: ${window.scrollY}, Offset: ${offset}`); // Debugging
            set({ transform: `translateY(${offset}px)` });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, set]);

    return (
        <animated.img
            src={src}
            alt={alt}
            className={className}
            style={props}
        />
    );
};

export default ParallaxHill;
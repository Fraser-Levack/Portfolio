import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ParallaxHillProps {
    src: string;
    alt: string;
    className: string;
    speed: number;
}

const ParallaxHill: React.FC<ParallaxHillProps> = ({ src, alt, className, speed }) => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth > 1366) {
                setScale(1.2);
            } else {
                setScale(1);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const [props, set] = useSpring(() => ({
        transform: `translateY(0px) scale(${scale})`,
    }));

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY * speed;
            set({ transform: `translateY(${offset}px) scale(${scale})` });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, set, scale]);

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
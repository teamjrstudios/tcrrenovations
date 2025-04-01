"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Global cache to store successfully loaded image URLs
const imageCache: Record<string, string> = {};

interface ProjectImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
    fill?: boolean;
    width?: number;
    height?: number;
}

const ProjectImage: React.FC<ProjectImageProps> = ({
                                                       src,
                                                       alt,
                                                       className = "",
                                                       fallbackSrc = "/placeholder.jpg",
                                                       fill = false,
                                                       width,
                                                       height
                                                   }) => {
    // Extract the filename from the src path
    const getFileName = (path: string) => {
        // Remove any query parameters
        const cleanPath = path.split('?')[0];
        // Get the last part of the path (the filename)
        return cleanPath.split('/').pop() || '';
    };

    const fileName = getFileName(src);
    const cacheKey = fileName || src;

    // List of possible sources to try in order
    const sources = [
        src, // First try the original source (API route)
        `/api/images/${fileName}`, // Then try our API mediator
        `http://5.161.42.119:8080/uploads/${fileName}`, // Try direct uploads path
        `http://5.161.42.119:8080/images/${fileName}`, // Try direct images path
        fallbackSrc // Finally fall back to placeholder
    ];

    // Check if we already have a cached successful URL for this image
    const [imgSrc, setImgSrc] = useState(imageCache[cacheKey] || src);
    const [errorCount, setErrorCount] = useState(
        imageCache[cacheKey] ?
            sources.findIndex(s => s === imageCache[cacheKey]) :
            0
    );

    const handleError = () => {
        // Try the next source if available
        if (errorCount < sources.length - 1) {
            console.log(`Image load failed for ${imgSrc}, trying next source (${sources[errorCount + 1]})`);
            setErrorCount(prevCount => prevCount + 1);
        }
    };

    const handleLoad = () => {
        // Cache the successful image URL
        if (!imageCache[cacheKey]) {
            console.log(`Caching successful image URL for ${cacheKey}: ${imgSrc}`);
            imageCache[cacheKey] = imgSrc;
        }
    };

    // Update the source if errorCount changes
    useEffect(() => {
        setImgSrc(sources[errorCount]);
    }, [errorCount]);

    // Use next.js Image with priority for visible images to ensure faster loading
    const imageProps = {
        src: imgSrc,
        alt,
        onError: handleError,
        onLoad: handleLoad,
        className,
        priority: true, // Preload important images
        ...(fill ? { fill: true } : { width: width || 300, height: height || 200 }),
    };

    return <Image {...imageProps} alt={""} />;
};

export default ProjectImage;
import React, { useState, useRef, useEffect } from 'react';

/**
 * LazyImage Component with Intersection Observer
 * Implements lazy loading with placeholder and error handling
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = null,
  errorFallback = null,
  threshold = 0.1,
  rootMargin = '50px',
  onLoad = () => {},
  onError = () => {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    onError();
  };

  // Default placeholder
  const defaultPlaceholder = (
    <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  // Default error fallback
  const defaultErrorFallback = (
    <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  if (hasError) {
    return errorFallback || defaultErrorFallback;
  }

  return (
    <div ref={imgRef} className="relative">
      {!isInView && (placeholder || defaultPlaceholder)}
      
      {isInView && (
        <>
          {!isLoaded && (placeholder || defaultPlaceholder)}
          <img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            {...props}
          />
        </>
      )}
    </div>
  );
};

/**
 * Optimized Image Component with WebP support and responsive loading
 */
export const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  ...props
}) => {
  if (priority) {
    // For above-the-fold images, load immediately
    return (
      <picture>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          className={className}
          loading="eager"
          {...props}
        />
      </picture>
    );
  }

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default LazyImage;
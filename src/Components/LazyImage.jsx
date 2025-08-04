import React, { useState, useRef, useEffect, useCallback } from "react";
import { refreshAnimations } from "../utils/animationConfig";

/**
 * Enhanced LazyImage Component with WebP support and performance optimizations
 */
const LazyImage = ({
  src,
  webpSrc,
  alt,
  className = "",
  placeholder = null,
  errorFallback = null,
  threshold = 0.1,
  rootMargin = "50px",
  priority = false,
  sizes = "100vw",
  quality = "auto",
  onLoad = () => { },
  onError = () => { },
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Detect WebP support
  const supportsWebP = useCallback(() => {
    if (typeof window === "undefined") return false;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }, []);

  // Get optimal image source
  const getOptimalSrc = useCallback(() => {
    if (webpSrc && supportsWebP()) {
      return webpSrc;
    }
    return src;
  }, [src, webpSrc, supportsWebP]);

  useEffect(() => {
    if (priority) {
      setCurrentSrc(getOptimalSrc());
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setCurrentSrc(getOptimalSrc());
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current && observerRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [threshold, rootMargin, priority, getOptimalSrc]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad();

    // Refresh animations after image loads
    refreshAnimations();

    // Track image load performance
    // if (process.env.NODE_ENV === "development") {
    //   console.log(`Image loaded: ${currentSrc}`);
    // }
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError();

    // Fallback to original src if WebP fails
    if (currentSrc === webpSrc && src !== webpSrc) {
      setCurrentSrc(src);
      setHasError(false);
    }
  }, [onError, currentSrc, webpSrc, src]);

  // Default placeholder
  const defaultPlaceholder = (
    <div
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
    >
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
    <div
      className={`bg-gray-100 flex items-center justify-center ${className}`}
    >
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

      {(isInView || priority) && currentSrc && (
        <>
          {!isLoaded && (placeholder || defaultPlaceholder)}
          <img
            src={currentSrc}
            alt={alt}
            className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            sizes={sizes}
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
  className = "",
  sizes = "100vw",
  priority = false,
  ...props
}) => {
  if (priority) {
    // For above-the-fold images, load immediately
    return (
      <picture className={className}>
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          className={className}
          loading="eager"
          onLoad={() => refreshAnimations()}
          {...props}
        />
      </picture>
    );
  }

  return <LazyImage src={src} alt={alt} className={className} {...props} />;
};

export default LazyImage;
